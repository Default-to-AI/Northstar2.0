import {mkdir, writeFile} from 'node:fs/promises';
import {writeFileSync as fsWriteSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {XMLParser} from 'fast-xml-parser';
import dotenv from 'dotenv';

import type {
  IBKRCash,
  IBKRFundLine,
  IBKRInstrument,
  IBKRPerformanceRow,
  IBKRPortfolioSnapshot,
  IBKRPosition,
  IBKRTrade,
  IBKRTransfer,
} from '../../types/ibkr';

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

type FlexStatementRecord = Record<string, unknown>;

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

function asRecord(value: unknown): FlexStatementRecord {
  return typeof value === 'object' && value !== null ? (value as FlexStatementRecord) : {};
}

function parseNumber(value: unknown): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value !== 'string') return 0;
  const normalized = value.replace(/,/g, '').trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function parseNullableDate(value: unknown): string | null {
  const parsed = parseString(value);
  return parsed.length > 0 ? parsed : null;
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
  const raw = payload?.ErrorCode ?? '';
  const errorCode = typeof raw === 'string' ? raw.trim() : String(raw).trim();
  const rawMsg = payload?.ErrorMessage ?? '';
  const message = typeof rawMsg === 'string' ? rawMsg.trim() : '';

  if (errorCode === '1018' || message.includes('1018')) {
    throw new SyncError(
      `IBKR rate-limited request (1018): ${message || 'no message'}`,
      'RATE_LIMITED_1018',
      true,
    );
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
    throw new SyncError(
      `SendRequest payload missing FlexStatementResponse: ${raw}`,
      'SEND_REQUEST_SCHEMA',
      false,
    );
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

function getStatements(xml: string): FlexStatementRecord[] {
  const data = parser.parse(xml) as Record<string, unknown>;
  const root = asRecord(data.FlexQueryResponse ?? data);
  const flexStatements = asRecord(root.FlexStatements);
  const rawStatements = flexStatements.FlexStatement;
  const statements = asArray(rawStatements).map(asRecord);

  if (statements.length === 0) {
    throw new SyncError('Missing FlexStatements.FlexStatement payload', 'SCHEMA_ERROR', false);
  }

  return statements;
}

function parseNav(statements: FlexStatementRecord[]): IBKRPortfolioSnapshot['nav'] {
  let totalStarting = 0;
  let totalEnding = 0;
  let totalMarkToMarket = 0;
  let totalDeposits = 0;
  let fromDate: string | null = null;
  let toDate: string | null = null;
  let twrSum = 0;
  let twrWeightSum = 0;

  for (const stmt of statements) {
    const nav = asRecord(stmt.ChangeInNAV);
    if (Object.keys(nav).length === 0) continue;

    totalStarting += parseNumber(nav.startingValue);
    totalEnding += parseNumber(nav.endingValue);
    totalMarkToMarket += parseNumber(nav.mtm ?? nav.markToMarket);
    totalDeposits += parseNumber(nav.depositsWithdrawals);

    const currentFromDate = parseNullableDate(nav.fromDate);
    const currentToDate = parseNullableDate(nav.toDate);
    if (currentFromDate && (!fromDate || currentFromDate < fromDate)) fromDate = currentFromDate;
    if (currentToDate && (!toDate || currentToDate > toDate)) toDate = currentToDate;

    const endingValue = parseNumber(nav.endingValue);
    const twrValue = parseNumber(nav.twr ?? nav.timeWeightedReturn);
    if (endingValue > 0 && twrValue !== 0) {
      twrSum += twrValue * endingValue;
      twrWeightSum += endingValue;
    }
  }

  return {
    startingValue: totalStarting,
    endingValue: totalEnding,
    depositsWithdrawals: totalDeposits,
    twr: twrWeightSum > 0 ? twrSum / twrWeightSum : 0,
    markToMarket: totalMarkToMarket,
    fromDate,
    toDate,
  };
}

function parseCash(statements: FlexStatementRecord[]): IBKRCash {
  const aggregated: IBKRCash = {
    startingCash: 0,
    endingCash: 0,
    endingSettledCash: 0,
    depositsWithdrawals: 0,
    dividends: 0,
    netTradesSales: 0,
    netTradesPurchases: 0,
    interest: 0,
    withholdingTax: 0,
    brokerFees: 0,
  };

  for (const stmt of statements) {
    const cashNode = asRecord(stmt.CashReport);
    const rows = asArray(cashNode.CashReportCurrency).map(asRecord);
    for (const row of rows) {
      const currency = parseString(row.currency).toUpperCase();
      const fxRateToBase = parseNumber(row.fxRateToBase);
      const conversion = currency && currency !== 'USD' && fxRateToBase > 0 ? fxRateToBase : 1;
      const inBase = (value: unknown): number => parseNumber(value) * conversion;

      aggregated.startingCash += inBase(row.startingCash);
      aggregated.endingCash += inBase(row.endingCash);
      aggregated.endingSettledCash += inBase(row.endingSettledCash);
      aggregated.depositsWithdrawals += inBase(row.depositWithdrawals ?? row.depositsWithdrawals);
      aggregated.dividends += inBase(row.dividends);
      aggregated.netTradesSales += inBase(row.netTradesSales);
      aggregated.netTradesPurchases += inBase(row.netTradesPurchases);
      aggregated.interest = (aggregated.interest ?? 0) + inBase(row.brokerInterest);
      aggregated.withholdingTax = (aggregated.withholdingTax ?? 0) + inBase(row.withholdingTax);
      aggregated.brokerFees = (aggregated.brokerFees ?? 0) + inBase(row.brokerFees);
    }
  }

  return aggregated;
}

type AggregatedPosition = {
  symbol: string;
  description: string;
  conid: string;
  securityId: string;
  securityIdType: string;
  cusip: string;
  isin: string;
  figi: string;
  accountId: string;
  accountAlias: string;
  model: string;
  currency: string;
  fxRateToBase: number;
  assetClass: string;
  subCategory: string;
  listingExchange: string;
  underlyingConid: string;
  underlyingSymbol: string;
  underlyingSecurityId: string;
  underlyingListingExchange: string;
  issuer: string;
  issuerCountryCode: string;
  multiplier: number;
  strike: number;
  expiry: string | null;
  putCall: string;
  principalAdjustFactor: number;
  reportDate: string | null;
  quantity: number;
  markPrice: number;
  positionValue: number;
  openPrice: number;
  costBasisPrice: number;
  costBasisMoney: number;
  percentOfNav: number;
  unrealizedPnL: number;
  side: string;
  levelOfDetail: string;
  openDateTime: string | null;
  holdingPeriodDateTime: string | null;
  vestingDate: string | null;
  code: string;
  originatingOrderId: string;
  originatingTransactionId: string;
};

function mergeText(...values: string[]): string {
  return values.find((value) => value.trim().length > 0) ?? '';
}

function parsePositions(statements: FlexStatementRecord[]): IBKRPosition[] {
  const bySymbol = new Map<string, AggregatedPosition>();

  for (const stmt of statements) {
    const openPositionsNode = asRecord(stmt.OpenPositions);
    const rawPositions = asArray(openPositionsNode.OpenPosition).map(asRecord);

    for (const raw of rawPositions) {
      const symbol = parseString(raw.symbol).toUpperCase();
      if (!symbol) continue;

      const quantity = parseNumber(raw.position);
      const positionValue = parseNumber(raw.positionValue);
      const costBasisMoney = parseNumber(raw.costBasisMoney);
      const markPrice = parseNumber(raw.markPrice);
      const openPrice = parseNumber(raw.openPrice);
      const costBasisPrice = parseNumber(raw.costBasisPrice);
      const percentOfNav = parseNumber(raw.percentOfNAV);
      const unrealizedPnL = parseNumber(raw.fifoPnlUnrealized ?? raw.unrealizedPnl);

      const existing = bySymbol.get(symbol);
      if (!existing) {
        bySymbol.set(symbol, {
          symbol,
          description: parseString(raw.description),
          conid: parseString(raw.conid),
          securityId: parseString(raw.securityID),
          securityIdType: parseString(raw.securityIDType),
          cusip: parseString(raw.cusip),
          isin: parseString(raw.isin),
          figi: parseString(raw.figi),
          accountId: parseString(raw.accountId),
          accountAlias: parseString(raw.acctAlias),
          model: parseString(raw.model),
          currency: mergeText(parseString(raw.currency), 'USD'),
          fxRateToBase: parseNumber(raw.fxRateToBase),
          assetClass: parseString(raw.assetCategory),
          subCategory: parseString(raw.subCategory),
          listingExchange: parseString(raw.listingExchange),
          underlyingConid: parseString(raw.underlyingConid),
          underlyingSymbol: parseString(raw.underlyingSymbol),
          underlyingSecurityId: parseString(raw.underlyingSecurityID),
          underlyingListingExchange: parseString(raw.underlyingListingExchange),
          issuer: parseString(raw.issuer),
          issuerCountryCode: parseString(raw.issuerCountryCode),
          multiplier: parseNumber(raw.multiplier),
          strike: parseNumber(raw.strike),
          expiry: parseNullableDate(raw.expiry),
          putCall: parseString(raw.putCall),
          principalAdjustFactor: parseNumber(raw.principalAdjustFactor),
          reportDate: parseNullableDate(raw.reportDate),
          quantity,
          markPrice,
          positionValue,
          openPrice,
          costBasisPrice,
          costBasisMoney,
          percentOfNav,
          unrealizedPnL,
          side: parseString(raw.side),
          levelOfDetail: parseString(raw.levelOfDetail),
          openDateTime: parseNullableDate(raw.openDateTime),
          holdingPeriodDateTime: parseNullableDate(raw.holdingPeriodDateTime),
          vestingDate: parseNullableDate(raw.vestingDate),
          code: parseString(raw.code),
          originatingOrderId: parseString(raw.originatingOrderID),
          originatingTransactionId: parseString(raw.originatingTransactionID),
        });
        continue;
      }

      const previousValue = existing.positionValue;
      const previousQuantity = existing.quantity;
      const nextValue = previousValue + positionValue;
      const nextQuantity = previousQuantity + quantity;
      const weightedByValue = nextValue > 0 ? nextValue : 0;
      const weightedByQuantity = Math.abs(nextQuantity) > 0 ? nextQuantity : 0;

      existing.quantity = nextQuantity;
      existing.positionValue = nextValue;
      existing.costBasisMoney += costBasisMoney;
      existing.unrealizedPnL += unrealizedPnL;
      existing.percentOfNav += percentOfNav;
      if (weightedByValue > 0) {
        existing.markPrice = ((existing.markPrice * previousValue) + (markPrice * positionValue)) / weightedByValue;
      } else if (markPrice > 0) {
        existing.markPrice = markPrice;
      }
      if (weightedByQuantity !== 0) {
        existing.openPrice = ((existing.openPrice * previousQuantity) + (openPrice * quantity)) / weightedByQuantity;
        existing.costBasisPrice =
          ((existing.costBasisPrice * previousQuantity) + (costBasisPrice * quantity)) / weightedByQuantity;
      }
      existing.description = mergeText(existing.description, parseString(raw.description));
      existing.conid = mergeText(existing.conid, parseString(raw.conid));
      existing.securityId = mergeText(existing.securityId, parseString(raw.securityID));
      existing.securityIdType = mergeText(existing.securityIdType, parseString(raw.securityIDType));
      existing.cusip = mergeText(existing.cusip, parseString(raw.cusip));
      existing.isin = mergeText(existing.isin, parseString(raw.isin));
      existing.figi = mergeText(existing.figi, parseString(raw.figi));
      existing.accountId = mergeText(existing.accountId, parseString(raw.accountId));
      existing.accountAlias = mergeText(existing.accountAlias, parseString(raw.acctAlias));
      existing.model = mergeText(existing.model, parseString(raw.model));
      existing.currency = mergeText(existing.currency, parseString(raw.currency));
      existing.assetClass = mergeText(existing.assetClass, parseString(raw.assetCategory));
      existing.subCategory = mergeText(existing.subCategory, parseString(raw.subCategory));
      existing.listingExchange = mergeText(existing.listingExchange, parseString(raw.listingExchange));
      existing.underlyingConid = mergeText(existing.underlyingConid, parseString(raw.underlyingConid));
      existing.underlyingSymbol = mergeText(existing.underlyingSymbol, parseString(raw.underlyingSymbol));
      existing.underlyingSecurityId = mergeText(existing.underlyingSecurityId, parseString(raw.underlyingSecurityID));
      existing.underlyingListingExchange = mergeText(existing.underlyingListingExchange, parseString(raw.underlyingListingExchange));
      existing.issuer = mergeText(existing.issuer, parseString(raw.issuer));
      existing.issuerCountryCode = mergeText(existing.issuerCountryCode, parseString(raw.issuerCountryCode));
      existing.side = mergeText(existing.side, parseString(raw.side));
      existing.levelOfDetail = mergeText(existing.levelOfDetail, parseString(raw.levelOfDetail));
      existing.reportDate = existing.reportDate ?? parseNullableDate(raw.reportDate);
      existing.openDateTime = existing.openDateTime ?? parseNullableDate(raw.openDateTime);
      existing.holdingPeriodDateTime =
        existing.holdingPeriodDateTime ?? parseNullableDate(raw.holdingPeriodDateTime);
      existing.vestingDate = existing.vestingDate ?? parseNullableDate(raw.vestingDate);
      existing.code = mergeText(existing.code, parseString(raw.code));
      existing.originatingOrderId = mergeText(existing.originatingOrderId, parseString(raw.originatingOrderID));
      existing.originatingTransactionId = mergeText(
        existing.originatingTransactionId,
        parseString(raw.originatingTransactionID),
      );
    }
  }

  return [...bySymbol.values()].sort((left, right) => right.positionValue - left.positionValue);
}

function parseTrades(statements: FlexStatementRecord[]): IBKRTrade[] {
  const trades: IBKRTrade[] = [];

  for (const stmt of statements) {
    const tradesNode = asRecord(stmt.Trades);
    const rows = asArray(tradesNode.Trade).map(asRecord);

    for (const row of rows) {
      trades.push({
        accountId: parseString(row.accountId),
        accountAlias: parseString(row.acctAlias),
        model: parseString(row.model),
        currency: parseString(row.currency),
        fxRateToBase: parseNumber(row.fxRateToBase),
        assetClass: parseString(row.assetCategory),
        subCategory: parseString(row.subCategory),
        symbol: parseString(row.symbol).toUpperCase(),
        description: parseString(row.description),
        conid: parseString(row.conid),
        securityId: parseString(row.securityID),
        securityIdType: parseString(row.securityIDType),
        cusip: parseString(row.cusip),
        isin: parseString(row.isin),
        figi: parseString(row.figi),
        listingExchange: parseString(row.listingExchange),
        underlyingConid: parseString(row.underlyingConid),
        underlyingSymbol: parseString(row.underlyingSymbol),
        underlyingSecurityId: parseString(row.underlyingSecurityID),
        underlyingListingExchange: parseString(row.underlyingListingExchange),
        issuer: parseString(row.issuer),
        issuerCountryCode: parseString(row.issuerCountryCode),
        tradeId: parseString(row.tradeID),
        multiplier: parseNumber(row.multiplier),
        relatedTradeId: parseString(row.relatedTradeID),
        strike: parseNumber(row.strike),
        reportDate: parseNullableDate(row.reportDate),
        expiry: parseNullableDate(row.expiry),
        dateTime: parseNullableDate(row.dateTime),
        putCall: parseString(row.putCall),
        tradeDate: parseNullableDate(row.tradeDate),
        principalAdjustFactor: parseNumber(row.principalAdjustFactor),
        settleDateTarget: parseNullableDate(row.settleDateTarget),
        transactionType: parseString(row.transactionType),
        exchange: parseString(row.exchange),
        quantity: parseNumber(row.quantity),
        tradePrice: parseNumber(row.tradePrice),
        tradeMoney: parseNumber(row.tradeMoney),
        proceeds: parseNumber(row.proceeds),
        taxes: parseNumber(row.taxes),
        ibCommission: parseNumber(row.ibCommission),
        ibCommissionCurrency: parseString(row.ibCommissionCurrency),
        netCash: parseNumber(row.netCash),
        closePrice: parseNumber(row.closePrice),
        openCloseIndicator: parseString(row.openCloseIndicator),
        notes: parseString(row.notes),
        costBasis: parseNumber(row.cost),
        realizedPnL: parseNumber(row.fifoPnlRealized),
        mtmPnL: parseNumber(row.mtmPnl),
        origTradePrice: parseNumber(row.origTradePrice),
        origTradeDate: parseNullableDate(row.origTradeDate),
        origTradeId: parseString(row.origTradeID),
        origOrderId: parseString(row.origOrderID),
        origTransactionId: parseString(row.origTransactionID),
        buySell: parseString(row.buySell),
        clearingFirmId: parseString(row.clearingFirmID),
        ibOrderId: parseString(row.ibOrderID),
        transactionId: parseString(row.transactionID),
        ibExecutionId: parseString(row.ibExecID),
        relatedTransactionId: parseString(row.relatedTransactionID),
        rtn: parseString(row.rtn),
        brokerageOrderId: parseString(row.brokerageOrderID),
        orderReference: parseString(row.orderReference),
        volatilityOrderLink: parseString(row.volatilityOrderLink),
        exchOrderId: parseString(row.exchOrderId),
        externalExecutionId: parseString(row.extExecID),
        orderTime: parseNullableDate(row.orderTime),
        openDateTime: parseNullableDate(row.openDateTime),
        holdingPeriodDateTime: parseNullableDate(row.holdingPeriodDateTime),
      });
    }
  }

  return trades.sort((left, right) => String(left.dateTime ?? '').localeCompare(String(right.dateTime ?? '')));
}

function parseTransfers(statements: FlexStatementRecord[]): IBKRTransfer[] {
  const transfers: IBKRTransfer[] = [];

  for (const stmt of statements) {
    const transfersNode = asRecord(stmt.Transfers);
    const rows = asArray(transfersNode.Transfer).map(asRecord);

    for (const row of rows) {
      transfers.push({
        accountId: parseString(row.accountId),
        accountAlias: parseString(row.acctAlias),
        model: parseString(row.model),
        currency: parseString(row.currency),
        fxRateToBase: parseNumber(row.fxRateToBase),
        assetClass: parseString(row.assetCategory),
        subCategory: parseString(row.subCategory),
        symbol: parseString(row.symbol).toUpperCase(),
        description: parseString(row.description),
        conid: parseString(row.conid),
        securityId: parseString(row.securityID),
        securityIdType: parseString(row.securityIDType),
        cusip: parseString(row.cusip),
        isin: parseString(row.isin),
        figi: parseString(row.figi),
        listingExchange: parseString(row.listingExchange),
        underlyingConid: parseString(row.underlyingConid),
        underlyingSymbol: parseString(row.underlyingSymbol),
        underlyingSecurityId: parseString(row.underlyingSecurityID),
        underlyingListingExchange: parseString(row.underlyingListingExchange),
        issuer: parseString(row.issuer),
        issuerCountryCode: parseString(row.issuerCountryCode),
        multiplier: parseNumber(row.multiplier),
        strike: parseNumber(row.strike),
        expiry: parseNullableDate(row.expiry),
        putCall: parseString(row.putCall),
        principalAdjustFactor: parseNumber(row.principalAdjustFactor),
        reportDate: parseNullableDate(row.reportDate),
        date: parseNullableDate(row.date),
        dateTime: parseNullableDate(row.dateTime),
        settleDate: parseNullableDate(row.settleDate),
        type: parseString(row.type),
        direction: parseString(row.direction),
        transferCompany: parseString(row.company),
        transferAccount: parseString(row.account),
        transferAccountName: parseString(row.accountName),
        deliveringBroker: parseString(row.deliveringBroker),
        quantity: parseNumber(row.quantity),
        transferPrice: parseNumber(row.transferPrice),
        positionAmount: parseNumber(row.positionAmount),
        positionAmountInBase: parseNumber(row.positionAmountInBase),
        pnlAmount: parseNumber(row.pnlAmount),
        pnlAmountInBase: parseNumber(row.pnlAmountInBase),
        cashTransfer: parseNumber(row.cashTransfer),
        code: parseString(row.code),
        clientReference: parseString(row.clientReference),
        transactionId: parseString(row.transactionID),
      });
    }
  }

  return transfers.sort((left, right) => String(left.dateTime ?? left.date ?? '').localeCompare(String(right.dateTime ?? right.date ?? '')));
}

function parseFunds(statements: FlexStatementRecord[]): IBKRFundLine[] {
  const funds: IBKRFundLine[] = [];

  for (const stmt of statements) {
    const fundsNode = asRecord(stmt.StmtFunds);
    const rows = asArray(fundsNode.StatementOfFundsLine).map(asRecord);

    for (const row of rows) {
      funds.push({
        accountId: parseString(row.accountId),
        accountAlias: parseString(row.acctAlias),
        model: parseString(row.model),
        currency: parseString(row.currency),
        fxRateToBase: parseNumber(row.fxRateToBase),
        assetClass: parseString(row.assetCategory),
        subCategory: parseString(row.subCategory),
        symbol: parseString(row.symbol).toUpperCase(),
        description: parseString(row.description),
        conid: parseString(row.conid),
        securityId: parseString(row.securityID),
        securityIdType: parseString(row.securityIDType),
        cusip: parseString(row.cusip),
        isin: parseString(row.isin),
        figi: parseString(row.figi),
        listingExchange: parseString(row.listingExchange),
        underlyingConid: parseString(row.underlyingConid),
        underlyingSymbol: parseString(row.underlyingSymbol),
        underlyingSecurityId: parseString(row.underlyingSecurityID),
        underlyingListingExchange: parseString(row.underlyingListingExchange),
        issuer: parseString(row.issuer),
        issuerCountryCode: parseString(row.issuerCountryCode),
        multiplier: parseNumber(row.multiplier),
        strike: parseNumber(row.strike),
        expiry: parseNullableDate(row.expiry),
        putCall: parseString(row.putCall),
        principalAdjustFactor: parseNumber(row.principalAdjustFactor),
        reportDate: parseNullableDate(row.reportDate),
        date: parseNullableDate(row.date),
        settleDate: parseNullableDate(row.settleDate),
        activityCode: parseString(row.activityCode),
        activityDescription: parseString(row.activityDescription),
        tradeId: parseString(row.tradeID),
        relatedTradeId: parseString(row.relatedTradeID),
        orderId: parseString(row.orderID),
        buySell: parseString(row.buySell),
        tradeQuantity: parseNumber(row.tradeQuantity),
        tradePrice: parseNumber(row.tradePrice),
        tradeGross: parseNumber(row.tradeGross),
        tradeCommission: parseNumber(row.tradeCommission),
        tradeTax: parseNumber(row.tradeTax),
        debit: parseNumber(row.debit),
        credit: parseNumber(row.credit),
        amount: parseNumber(row.amount),
        tradeCode: parseString(row.tradeCode),
        balance: parseNumber(row.balance),
        levelOfDetail: parseString(row.levelOfDetail),
        transactionId: parseString(row.transactionID),
        origTransactionId: parseString(row.origTransactionID),
        relatedTransactionId: parseString(row.relatedTransactionID),
      });
    }
  }

  return funds.sort((left, right) => String(left.date ?? '').localeCompare(String(right.date ?? '')));
}

function parsePerformance(statements: FlexStatementRecord[]): IBKRPerformanceRow[] {
  const performance: IBKRPerformanceRow[] = [];

  for (const stmt of statements) {
    const performanceNode = asRecord(stmt.FIFOPerformanceSummaryInBase);
    const rows = asArray(performanceNode.FIFOPerformanceSummaryUnderlying).map(asRecord);

    for (const row of rows) {
      performance.push({
        accountId: parseString(row.accountId),
        accountAlias: parseString(row.acctAlias),
        model: parseString(row.model),
        assetClass: parseString(row.assetCategory),
        subCategory: parseString(row.subCategory),
        symbol: parseString(row.symbol).toUpperCase(),
        description: parseString(row.description),
        conid: parseString(row.conid),
        securityId: parseString(row.securityID),
        securityIdType: parseString(row.securityIDType),
        cusip: parseString(row.cusip),
        isin: parseString(row.isin),
        figi: parseString(row.figi),
        listingExchange: parseString(row.listingExchange),
        underlyingConid: parseString(row.underlyingConid),
        underlyingSymbol: parseString(row.underlyingSymbol),
        underlyingSecurityId: parseString(row.underlyingSecurityID),
        underlyingListingExchange: parseString(row.underlyingListingExchange),
        issuer: parseString(row.issuer),
        issuerCountryCode: parseString(row.issuerCountryCode),
        multiplier: parseNumber(row.multiplier),
        strike: parseNumber(row.strike),
        expiry: parseNullableDate(row.expiry),
        putCall: parseString(row.putCall),
        principalAdjustFactor: parseNumber(row.principalAdjustFactor),
        reportDate: parseNullableDate(row.reportDate),
        costAdjustment: parseNumber(row.costAdjustment),
        realizedShortTermProfit: parseNumber(row.fifoRealizedSTProfit),
        realizedShortTermLoss: parseNumber(row.fifoRealizedSTLoss),
        realizedLongTermProfit: parseNumber(row.fifoRealizedLTProfit),
        realizedLongTermLoss: parseNumber(row.fifoRealizedLTLoss),
        totalRealizedPnL: parseNumber(row.fifoRealizedPnl),
        unrealizedProfit: parseNumber(row.unrealizedProfit),
        unrealizedLoss: parseNumber(row.unrealizedLoss),
        unrealizedShortTermProfit: parseNumber(row.fifoUnrealizedSTProfit),
        unrealizedShortTermLoss: parseNumber(row.fifoUnrealizedSTLoss),
        unrealizedLongTermProfit: parseNumber(row.fifoUnrealizedLTProfit),
        unrealizedLongTermLoss: parseNumber(row.fifoUnrealizedLTLoss),
        totalUnrealizedPnL: parseNumber(row.fifoUnrealizedPnl),
        totalRealizedAndUnrealizedPnL: parseNumber(row.total),
        transferredPnL: parseNumber(row.transferredFifoPnl),
      });
    }
  }

  return performance.sort((left, right) => right.totalRealizedAndUnrealizedPnL - left.totalRealizedAndUnrealizedPnL);
}

function parseInstruments(statements: FlexStatementRecord[]): IBKRInstrument[] {
  const instruments: IBKRInstrument[] = [];

  for (const stmt of statements) {
    const securitiesNode = asRecord(stmt.SecuritiesInfo);
    const rows = asArray(securitiesNode.SecurityInfo).map(asRecord);

    for (const row of rows) {
      instruments.push({
        currency: parseString(row.currency),
        assetClass: parseString(row.assetCategory),
        subCategory: parseString(row.subCategory),
        symbol: parseString(row.symbol).toUpperCase(),
        description: parseString(row.description),
        conid: parseString(row.conid),
        securityId: parseString(row.securityID),
        securityIdType: parseString(row.securityIDType),
        cusip: parseString(row.cusip),
        isin: parseString(row.isin),
        figi: parseString(row.figi),
        listingExchange: parseString(row.listingExchange),
        underlyingConid: parseString(row.underlyingConid),
        underlyingSymbol: parseString(row.underlyingSymbol),
        underlyingSecurityId: parseString(row.underlyingSecurityID),
        underlyingListingExchange: parseString(row.underlyingListingExchange),
        issuer: parseString(row.issuer),
        issuerCountryCode: parseString(row.issuerCountryCode),
        multiplier: parseNumber(row.multiplier),
        strike: parseNumber(row.strike),
        expiry: parseNullableDate(row.expiry),
        putCall: parseString(row.putCall),
        principalAdjustFactor: parseNumber(row.principalAdjustFactor),
        maturity: parseNullableDate(row.maturity),
        issueDate: parseNullableDate(row.issueDate),
        underlyingCategory: parseString(row.underlyingCategory),
        settlementPolicyMethod: parseString(row.settlementPolicyMethod),
        code: parseString(row.code),
      });
    }
  }

  return instruments.sort((left, right) => left.symbol.localeCompare(right.symbol));
}

function validateSnapshot(snapshot: IBKRPortfolioSnapshot): string[] {
  const errors: string[] = [];

  if (snapshot.source !== 'ibkr-flex') errors.push('source must be ibkr-flex');
  if (!snapshot.syncedAt || Number.isNaN(Date.parse(snapshot.syncedAt))) {
    errors.push('syncedAt must be a valid ISO timestamp');
  }

  const numbers: Array<[string, number]> = [
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

  for (const [field, value] of numbers) {
    if (!Number.isFinite(value)) errors.push(`${field} must be finite`);
  }

  if (snapshot.nav.fromDate === null || snapshot.nav.toDate === null) {
    errors.push('nav.fromDate and nav.toDate are required');
  }

  if (!Array.isArray(snapshot.positions) || snapshot.positions.length === 0) {
    errors.push('positions must be a non-empty array');
  }

  snapshot.positions.forEach((position, index) => {
    if (!position.symbol) errors.push(`positions[${index}].symbol must be non-empty string`);
    if (!Number.isFinite(position.quantity)) errors.push(`positions[${index}].quantity must be finite`);
    if (!Number.isFinite(position.costBasisMoney)) {
      errors.push(`positions[${index}].costBasisMoney must be finite`);
    }
    if (!Number.isFinite(position.markPrice)) errors.push(`positions[${index}].markPrice must be finite`);
    if (!Number.isFinite(position.positionValue)) {
      errors.push(`positions[${index}].positionValue must be finite`);
    }
    if (!Number.isFinite(position.unrealizedPnL)) {
      errors.push(`positions[${index}].unrealizedPnL must be finite`);
    }
  });

  return errors;
}

export function parseStatement(xml: string): IBKRPortfolioSnapshot {
  const statements = getStatements(xml);
  const snapshot: IBKRPortfolioSnapshot = {
    syncedAt: new Date().toISOString(),
    source: 'ibkr-flex',
    nav: parseNav(statements),
    cash: parseCash(statements),
    positions: parsePositions(statements),
    trades: parseTrades(statements),
    transfers: parseTransfers(statements),
    funds: parseFunds(statements),
    performance: parsePerformance(statements),
    instruments: parseInstruments(statements),
  };

  const validationErrors = validateSnapshot(snapshot);
  if (validationErrors.length > 0) {
    throw new SyncError(
      `Parsed IBKR statement failed validation: ${validationErrors.join('; ')}`,
      'VALIDATION_ERROR',
      false,
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
    `IBKR sync complete: ${parsed.positions.length} positions, ${parsed.trades.length} trades, output=${OUTPUT_PATH}`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runSync().catch((error: unknown) => {
    console.error('IBKR sync failed');
    if (error instanceof SyncError) {
      console.error(`[${error.code}] ${error.message}`);
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  });
}
