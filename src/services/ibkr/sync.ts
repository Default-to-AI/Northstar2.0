import {mkdir, writeFile} from 'node:fs/promises';
import {writeFileSync as fsWriteSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {XMLParser} from 'fast-xml-parser';
import dotenv from 'dotenv';
dotenv.config();

type FlexStatementResponse = {
  FlexStatementResponse?: {
    Status?: string;
    ReferenceCode?: string;
    Url?: string;
    ErrorCode?: string;
    ErrorMessage?: string;
  };
};

type ParsedNav = {
  startingValue: number;
  endingValue: number;
  depositsWithdrawals: number;
  twr: number;
  markToMarket: number;
  fromDate: string | null;
  toDate: string | null;
};

type ParsedPosition = {
  symbol: string;
  quantity: number;
  costBasisMoney: number;
  markPrice: number;
  positionValue: number;
  unrealizedPnL: number;
  reportDate: string | null;
  currency: string;
  assetClass: string;
};

type ParsedCash = {
  startingCash: number;
  endingCash: number;
  endingSettledCash: number;
  depositsWithdrawals: number;
  dividends: number;
  netTradesSales: number;
  netTradesPurchases: number;
};

type IbkrPortfolioSnapshot = {
  syncedAt: string;
  source: 'ibkr-flex';
  nav: ParsedNav;
  cash: ParsedCash;
  positions: ParsedPosition[];
};

class SyncError extends Error {
  readonly code: string;
  readonly retryable: boolean;

  constructor(message: string, code: string, retryable = false) {
    super(message);
    this.name = 'SyncError';
    this.code = code;
    this.retryable = retryable;
  }
}

const IBKR_ENDPOINT =
  process.env.IBKR_FLEX_ENDPOINT ??
  'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService';
const IBKR_TOKEN = process.env.IBKR_FLEX_TOKEN;
const IBKR_QUERY_ID = process.env.IBKR_FLEX_QUERY_ID;
const REQUEST_TIMEOUT_MS = 20_000;
const BASE_RETRY_DELAY_MS = 3_000;
const MAX_RETRIES = 6;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.resolve(__dirname, '../../../data/ibkr-portfolio.json');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
});

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function parseNumber(value: unknown): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value !== 'string') return 0;
  const normalized = value.replace(/,/g, '').trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function isMissingEnv(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

function requireIbkrCredentials(): {token: string; queryId: string} {
  if (isMissingEnv(IBKR_TOKEN) || isMissingEnv(IBKR_QUERY_ID)) {
    throw new SyncError(
      'Missing IBKR credentials. Set IBKR_FLEX_TOKEN and IBKR_FLEX_QUERY_ID in environment.',
      'MISSING_CREDENTIALS',
      false,
    );
  }

  return {
    token: IBKR_TOKEN,
    queryId: IBKR_QUERY_ID,
  };
}

function jitteredBackoffMs(attempt: number): number {
  const jitter = Math.floor(Math.random() * 400);
  return BASE_RETRY_DELAY_MS * attempt + jitter;
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: URL): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {signal: controller.signal});
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new SyncError(
        `Request timed out after ${REQUEST_TIMEOUT_MS}ms: ${url.pathname}`,
        'TIMEOUT',
        true,
      );
    }
    throw new SyncError(
      `Network failure for ${url.pathname}: ${error instanceof Error ? error.message : String(error)}`,
      'NETWORK_ERROR',
      true,
    );
  } finally {
    clearTimeout(timeout);
  }
}

function parseFlexPayload(xml: string): FlexStatementResponse['FlexStatementResponse'] {
  const parsed = parser.parse(xml) as FlexStatementResponse;
  return parsed.FlexStatementResponse;
}

function throwIfRateLimited(xml: string): void {
  const payload = parseFlexPayload(xml);

  // Safe coercion — ErrorCode/ErrorMessage may be missing, number, or null
  const raw = payload?.ErrorCode ?? '';
  const errorCode = typeof raw === 'string' ? raw.trim() : String(raw).trim();
  const rawMsg = payload?.ErrorMessage ?? '';
  const message = typeof rawMsg === 'string' ? rawMsg.trim() : '';

  if (errorCode === '1018' || message.includes('1018')) {
    throw new SyncError(`IBKR rate-limited request (1018): ${message || 'no message'}`, 'RATE_LIMITED_1018', true);
  }

  if (errorCode) {
    console.warn('[IBKR Flex] non-1018 error code:', errorCode, message ? `| ${message}` : '');
  }
}

async function sendRequest(token: string, queryId: string): Promise<string> {
  const url = new URL(`${IBKR_ENDPOINT}/SendRequest`);
  url.searchParams.set('t', token);
  url.searchParams.set('q', queryId);
  url.searchParams.set('v', '3');

  const response = await fetchWithTimeout(url);
  const raw = await response.text();
  throwIfRateLimited(raw);

  if (!response.ok) {
    const retryable = response.status >= 500 || response.status === 429;
    throw new SyncError(
      `SendRequest failed: ${response.status} ${raw}`,
      'SEND_REQUEST_HTTP',
      retryable,
    );
  }

  const payload = parseFlexPayload(raw);
  if (!payload) {
    throw new SyncError(`SendRequest payload missing FlexStatementResponse: ${raw}`, 'SEND_REQUEST_SCHEMA', false);
  }

  if (payload.Status !== 'Success' || !payload.ReferenceCode) {
    const code = payload.ErrorCode?.trim() ?? 'SEND_REQUEST_REJECTED';
    const message = payload.ErrorMessage?.trim() ?? raw;
    const retryable = code === '1018';
    throw new SyncError(`SendRequest returned non-success (${code}): ${message}`, code, retryable);
  }

  return payload.ReferenceCode;
}

async function getStatement(token: string, referenceCode: string): Promise<string> {
  const url = new URL(`${IBKR_ENDPOINT}/GetStatement`);
  url.searchParams.set('t', token);
  url.searchParams.set('q', referenceCode);
  url.searchParams.set('v', '3');

  const response = await fetchWithTimeout(url);
  const raw = await response.text();
  throwIfRateLimited(raw);

  if (!response.ok) {
    const retryable = response.status >= 500 || response.status === 429;
    throw new SyncError(
      `GetStatement failed: ${response.status} ${raw}`,
      'GET_STATEMENT_HTTP',
      retryable,
    );
  }

  const payload = parseFlexPayload(raw);
  if (payload?.Status === 'Warn') {
    throw new SyncError('Statement not ready yet', 'STATEMENT_NOT_READY', true);
  }

  return raw;
}

function validateSnapshot(snapshot: IbkrPortfolioSnapshot): string[] {
  const errors: string[] = [];

  if (snapshot.source !== 'ibkr-flex') errors.push('source must be ibkr-flex');
  if (!snapshot.syncedAt || Number.isNaN(Date.parse(snapshot.syncedAt))) {
    errors.push('syncedAt must be a valid ISO timestamp');
  }

  const navNumbers: Array<[string, number]> = [
    ['nav.startingValue', snapshot.nav.startingValue],
    ['nav.endingValue', snapshot.nav.endingValue],
    ['nav.depositsWithdrawals', snapshot.nav.depositsWithdrawals],
    ['nav.twr', snapshot.nav.twr],
    ['nav.markToMarket', snapshot.nav.markToMarket],
    ['cash.startingCash', snapshot.cash.startingCash],
    ['cash.endingCash', snapshot.cash.endingCash],
    ['cash.endingSettledCash', snapshot.cash.endingSettledCash],
    ['cash.depositsWithdrawals', snapshot.cash.depositsWithdrawals],
    ['cash.dividends', snapshot.cash.dividends],
    ['cash.netTradesSales', snapshot.cash.netTradesSales],
    ['cash.netTradesPurchases', snapshot.cash.netTradesPurchases],
  ];

  for (const [field, value] of navNumbers) {
    if (!Number.isFinite(value)) {
      errors.push(`${field} must be finite`);
    }
  }

  if (!Array.isArray(snapshot.positions)) {
    errors.push('positions must be an array');
  }

  snapshot.positions.forEach((position, index) => {
    if (!position.symbol || typeof position.symbol !== 'string') {
      errors.push(`positions[${index}].symbol must be non-empty string`);
    }
    if (!Number.isFinite(position.quantity)) errors.push(`positions[${index}].quantity must be finite`);
    if (!Number.isFinite(position.costBasisMoney)) errors.push(`positions[${index}].costBasisMoney must be finite`);
    if (!Number.isFinite(position.markPrice)) errors.push(`positions[${index}].markPrice must be finite`);
    if (!Number.isFinite(position.positionValue)) errors.push(`positions[${index}].positionValue must be finite`);
    if (!Number.isFinite(position.unrealizedPnL)) errors.push(`positions[${index}].unrealizedPnL must be finite`);
  });

  if (snapshot.nav.fromDate === null || snapshot.nav.toDate === null) {
    errors.push('nav.fromDate and nav.toDate are required');
  }

  return errors;
}

export function parseStatement(xml: string): IbkrPortfolioSnapshot {
  const data = parser.parse(xml) as Record<string, unknown>;
  const root = (data.FlexQueryResponse as Record<string, unknown> | undefined) ?? data;
  const flexStatements = root.FlexStatements as Record<string, unknown> | undefined;
  const flexStatementsRaw = flexStatements?.FlexStatement;

  // Normalise to array — the API returns one FlexStatement per sub-account
  const statements: Record<string, unknown>[] = Array.isArray(flexStatementsRaw)
    ? flexStatementsRaw
    : flexStatementsRaw
      ? [flexStatementsRaw]
      : [];

  if (statements.length === 0) {
    throw new SyncError('Missing FlexStatements.FlexStatement payload', 'SCHEMA_ERROR', false);
  }

  // --- Aggregate NAV across all statements ---
  let totalStarting = 0, totalEnding = 0, totalMarkToMarket = 0, totalDeposits = 0;
  let fromDate: string | null = null, toDate: string | null = null;
  let twrSum = 0, twrWeightSum = 0;  // weighted-average TWR across statements

  for (const stmt of statements) {
    const nav = stmt.ChangeInNAV as Record<string, unknown> | undefined;
    if (!nav) continue;

    totalStarting   += parseNumber(nav.startingValue);
    totalEnding     += parseNumber(nav.endingValue);
    totalMarkToMarket += parseNumber(nav.mtm ?? nav.markToMarket);
    totalDeposits   += parseNumber(nav.depositsWithdrawals);

    const d = typeof nav.fromDate === 'string' ? nav.fromDate : null;
    if (d) fromDate = fromDate ?? d;
    const e = typeof nav.toDate === 'string' ? nav.toDate : null;
    if (e) toDate = e ?? toDate;

    const endVal = parseNumber(nav.endingValue);
    const twrVal = parseNumber(nav.twr ?? nav.timeWeightedReturn);
    if (endVal > 0 && twrVal !== 0) {
      twrSum += twrVal * endVal;
      twrWeightSum += endVal;
    }
  }

  const twr = twrWeightSum > 0 ? twrSum / twrWeightSum : 0;

  // --- Aggregate Cash (last CashReportCurrency entry per statement, summed) ---
  let aggCash: ParsedCash = {
    startingCash: 0, endingCash: 0, endingSettledCash: 0,
    depositsWithdrawals: 0, dividends: 0,
    netTradesSales: 0, netTradesPurchases: 0,
  };

  for (const stmt of statements) {
    const cashNode = stmt.CashReport as Record<string, unknown> | undefined;
    const cashReports = asArray(
      (cashNode?.CashReportCurrency as
        | Record<string, unknown>
        | Record<string, unknown>[]
        | undefined) ??
        (stmt.CashReport as Record<string, unknown> | Record<string, unknown>[] | undefined),
    );
    const cashReport = cashReports[cashReports.length - 1];
    if (!cashReport) continue;

    aggCash = {
      startingCash:        aggCash.startingCash        + parseNumber(cashReport.startingCash ?? 0),
      endingCash:          aggCash.endingCash          + parseNumber(cashReport.endingCash ?? 0),
      endingSettledCash:   aggCash.endingSettledCash   + parseNumber(cashReport.endingSettledCash ?? 0),
      depositsWithdrawals: aggCash.depositsWithdrawals + parseNumber(cashReport.depositWithdrawals ?? cashReport.depositsWithdrawals ?? 0),
      dividends:           aggCash.dividends           + parseNumber(cashReport.dividends ?? 0),
      netTradesSales:      aggCash.netTradesSales      + parseNumber(cashReport.netTradesSales ?? 0),
      netTradesPurchases:  aggCash.netTradesPurchases  + parseNumber(cashReport.netTradesPurchases ?? 0),
    };
  }

  // --- Merge positions by ticker symbol ---
  type AggPos = {
    symbol: string; quantity: number; costBasisMoney: number;
    markPrice: number; positionValue: number; unrealizedPnL: number;
    currency: string; assetClass: string;
  };

  const bySymbol = new Map<string, AggPos>();

  for (const stmt of statements) {
    const openPositionsNode = stmt.OpenPositions as Record<string, unknown> | undefined;
    const rawPositions = asArray(
      (openPositionsNode?.OpenPosition as Record<string, unknown> | Record<string, unknown>[] | undefined)
        ?? (stmt.OpenPosition as Record<string, unknown> | Record<string, unknown>[] | undefined),
    );

    for (const p of rawPositions) {
      const sym = String(p.symbol ?? '').trim().toUpperCase();
      if (!sym) continue;

      const qty    = parseNumber(p.position);
      const cost   = parseNumber(p.costBasisMoney);
      const mark   = parseNumber(p.markPrice);
      const pv     = parseNumber(p.positionValue);
      const pnl    = parseNumber(p.fifoPnlUnrealized ?? p.unrealizedPnl);
      const curr   = String(p.currency ?? 'USD');
      const asset  = String(p.assetCategory ?? 'Unknown');

      const existing = bySymbol.get(sym);
      if (!existing) {
        bySymbol.set(sym, { symbol: sym, quantity: qty, costBasisMoney: cost,
                            markPrice: mark, positionValue: pv, unrealizedPnL: pnl,
                            currency: curr, assetClass: asset });
      } else {
        existing.quantity       += qty;
        existing.costBasisMoney  += cost;
        existing.positionValue   += pv;
        existing.unrealizedPnL   += pnl;
        // weighted-average mark price
        const combinedVal = existing.positionValue + pv;
        if (combinedVal > 0) {
          existing.markPrice =
            (existing.markPrice * existing.positionValue + mark * pv) / combinedVal;
        } else {
          existing.markPrice = (existing.markPrice + mark) / 2;
        }
      }
    }
  }

  const positions: ParsedPosition[] = [...bySymbol.values()].map(p => ({
    symbol:            p.symbol,
    quantity:          p.quantity,
    costBasisMoney:    p.costBasisMoney,
    markPrice:         p.markPrice,
    positionValue:     p.positionValue,
    unrealizedPnL:     p.unrealizedPnL,
    reportDate:        null as string | null,
    currency:          p.currency,
    assetClass:        p.assetClass,
  }));

  // --- Build snapshot ---
  const snapshot: IbkrPortfolioSnapshot = {
    syncedAt: new Date().toISOString(),
    source: 'ibkr-flex',
    nav: {
      startingValue:      totalStarting,
      endingValue:        totalEnding,
      depositsWithdrawals: totalDeposits,
      twr,
      markToMarket: totalMarkToMarket,
      fromDate, toDate,
    },
    cash: aggCash,
    positions,
  };

  const validationErrors = validateSnapshot(snapshot);
  if (validationErrors.length > 0) {
    throw new SyncError(
      `Parsed IBKR statement failed validation: ${validationErrors.join('; ')}`,
      'VALIDATION_ERROR', false,
    );
  }

  return snapshot;
}


async function retryWithBackoff<T>(operationName: string, operation: () => Promise<T>): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await operation();
    } catch (error: unknown) {
      lastError = error;

      if (!(error instanceof SyncError) || !error.retryable || attempt === MAX_RETRIES) {
        break;
      }

      const delay = jitteredBackoffMs(attempt);
      console.warn(
        `${operationName} attempt ${attempt}/${MAX_RETRIES} failed (${error.code}); retrying in ${delay}ms`,
      );
      await sleep(delay);
    }
  }

  throw lastError;
}

export async function runSync(): Promise<void> {
  const credentials = requireIbkrCredentials();

  const referenceCode = await retryWithBackoff('SendRequest', async () =>
    sendRequest(credentials.token, credentials.queryId),
  );

  const xmlStatement = await retryWithBackoff('GetStatement', async () =>
    getStatement(credentials.token, referenceCode),
  );

  fsWriteSync('/tmp/ibkr-raw.xml', xmlStatement, 'utf8');
  const parsed = parseStatement(xmlStatement);

  await mkdir(path.dirname(OUTPUT_PATH), {recursive: true});
  await writeFile(OUTPUT_PATH, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');

  console.log(
    `IBKR sync complete: ${parsed.positions.length} positions, TWR=${parsed.nav.twr.toFixed(2)}%, output=${OUTPUT_PATH}`,
  );
}

const entrypointPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;
if (entrypointPath && import.meta.url === entrypointPath) {
  runSync().catch((error: unknown) => {
    console.error('IBKR sync failed:', error);
    process.exit(1);
  });
}
