import express, {
  type Express,
  type Request,
  type Response,
} from 'express';
import {GoogleGenAI, Type} from '@google/genai';
import dotenv from 'dotenv';
import {existsSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import path from 'path';
import {exec, spawn} from 'node:child_process';
import YahooFinance from 'yahoo-finance2';

import {fetchCnnFearGreedSnapshot} from '../lib/fearGreedService.ts';
import {fetchFMPEndpoint} from '../services/fmp.ts';
import {aggregateInsightsData, aggregateAnalystEstimates, fetchYahooQuote, type DataNormalizationEvent} from '../services/dataAggregator.ts';
import {buildIbkrPortfolioAnalytics} from './ibkrAnalytics.ts';
import type {IBKRPortfolioSnapshot} from '../types/ibkr';
import {openResearchDb, resolveResearchDbPath} from './research/db.ts';
import {registerCommitteeRoutes} from './research/committee.ts';
import {registerArchiveRoutes} from './research/archive.ts';
import {registerAlertRoutes} from './research/alerts.ts';
import {registerBriefingRoutes} from './research/briefing.ts';
import {registerEventsRoutes} from './research/events.ts';
import {registerOutcomeRoutes} from './research/outcomes.ts';
import {freezeEvidencePacket, getFrozenEvidencePacket} from './research/evidence.ts';
import {
  buildTickerRefreshCooldownErrorPayload,
  isTickerCooldownRejection,
  TickerRefreshCooldown,
} from './research/tickerRefreshCooldown.ts';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const SECURITY_EVIDENCE_REFRESH_COOLDOWN_MS = Number.parseInt(
  process.env.SECURITY_EVIDENCE_REFRESH_COOLDOWN_MS ?? '300000',
  10,
);

const tickerRefreshCooldown = new TickerRefreshCooldown({
  cooldownMs: Number.isFinite(SECURITY_EVIDENCE_REFRESH_COOLDOWN_MS)
    ? SECURITY_EVIDENCE_REFRESH_COOLDOWN_MS
    : 300_000,
});

type CommitteeSessionRequest = {
  ticker?: string;
};

type FreezeEvidenceRequest = {
  ticker?: string;
};

type HoldingsNewsQuery = {
  symbols?: string;
};

type StockMetricsQuery = {
  symbol?: string;
};

type BatchPricesQuery = {
  tickers?: string;
};

type SecuritiesSearchQuery = {
  q?: string;
  limit?: string;
};

type InsightsQuery = {
  tab?: string;
  limit?: string;
};

type ScreenerQuery = {
  universe?: string;
  sector?: string;
  sort?: string;
  order?: string;
  limit?: string;
  offset?: string;
  q?: string;
};

type ScreenerRow = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
  price: number | null;
  marketCap: number | null;
  trailingPe: number | null;
  forwardPe: number | null;
  revenueGrowth: number | null;
  profitMargins: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  roe: number | null;
  debtToEquity: number | null;
  compoundScore: number | null;
  tacticalScore: number | null;
  actionabilityState: string | null;
  fiftyDayMa: number | null;
  twoHundredDayMa: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  avgDollarVolume: number | null;
  dataAsOf: string | null;
};

type SpyHistoryQuery = {
  range?: string;
};

type SecurityTickerParams = {
  ticker: string;
};

type TickerEvidenceRow = {
  ticker: string;
  market_cap: number | null;
  trailing_pe: number | null;
  forward_pe: number | null;
  price_to_book: number | null;
  profit_margins: number | null;
  revenue_growth: number | null;
  fifty_day_ma: number | null;
  two_hundred_day_ma: number | null;
  fifty_two_week_high: number | null;
  fifty_two_week_low: number | null;
  current_price: number | null;
  last_updated: string | null;
  free_cashflow: number | null;
  free_cashflow_margin: number | null;
  free_cashflow_yield: number | null;
  gross_margin: number | null;
  operating_margin: number | null;
  eps: number | null;
  ebitda: number | null;
  diluted_net_income: number | null;
  price_to_sales: number | null;
  ev_to_ebitda: number | null;
  ev_to_gross_profit: number | null;
  peg_ratio: number | null;
  operating_cash_flow: number | null;
  debt_to_equity: number | null;
  net_cash: number | null;
  current_ratio: number | null;
  roe: number | null;
  roic: number | null;
  revenue_per_employee: number | null;
  earnings_revisions: string | null;
  share_buybacks: number | null;
  insider_transactions: string | null;
  momentum_history: string | null;
  valuation_history: string | null;
  score_snapshot_id: number | null;
  score_model_id: string | null;
  actionability_state: string | null;
  warnings: string | null;
  compounder_score: number | null;
  tactical_score: number | null;
  avg_dollar_volume: number | null;
};

type PipelineRunRow = {
  id: number;
  pipeline_name: string;
  started_at: string;
  completed_at: string | null;
  status: string;
  error_summary: string | null;
};

type SourceRunRow = {
  source_name: string;
  tier: string;
  status: string;
  data_as_of: string | null;
  error_message: string | null;
};

type ScannerRow = {
  ticker: string;
  name: string | null;
  sector: string | null;
  strength: number;
  tacticalStrength: number;
  signal: 'BULLISH' | 'WATCH' | 'BEARISH';
  actionabilityState: string;
  warnings: string | null;
  scoreModelId: string;
};

type SecuritySearchRow = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
};

type InsightRow = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
  price: number | null;
  marketCap: number | null;
};

type SqlJsDatabase = {
  exec: (sql: string, params?: Array<string | number | null>) => unknown;
  prepare: (sql: string) => {
    bind: (params: Array<string | number | null>) => void;
    step: () => boolean;
    getAsObject: () => Record<string, unknown>;
    free: () => void;
  };
  close: () => void;
};

let sqlJsDbPromise: Promise<SqlJsDatabase> | null = null;

function getResearchRuntimeMeta(): Record<string, unknown> {
  let dbPath: string | null = null;
  let dbExists: boolean | null = null;
  try {
    dbPath = resolveResearchDbPath();
    dbExists = existsSync(dbPath);
  } catch {
    dbPath = null;
    dbExists = null;
  }

  const wasmPath = path.resolve(process.cwd(), 'data', 'sql-wasm.wasm');

  return {
    node: process.version,
    platform: process.platform,
    db: {path: dbPath, exists: dbExists},
    wasm: {path: wasmPath, exists: existsSync(wasmPath)},
  };
}

async function openSqlJsDb(): Promise<SqlJsDatabase> {
  if (sqlJsDbPromise) return sqlJsDbPromise;
  sqlJsDbPromise = (async () => {
    const dbPath = resolveResearchDbPath();
    const bytes = await readFile(dbPath);
    const initSqlJs = (await import('sql.js')).default as unknown as (
      config?: {locateFile?: (file: string) => string}
    ) => Promise<{Database: new (data: Uint8Array) => SqlJsDatabase}>;

    const repoWasmPath = path.resolve(process.cwd(), 'data', 'sql-wasm.wasm');

    const mod = await initSqlJs({
      locateFile: (file) => {
        // Prefer a controlled repo path so Vercel includeFiles can reliably ship the WASM.
        if (existsSync(repoWasmPath)) {
          return repoWasmPath;
        }

        // Fallback to sql.js dist path for local/dev environments.
        return path.resolve(process.cwd(), 'node_modules', 'sql.js', 'dist', file);
      },
    });
    return new mod.Database(new Uint8Array(bytes));
  })();
  return sqlJsDbPromise;
}

async function querySqlJsRows<T extends Record<string, unknown>>(
  db: SqlJsDatabase,
  sql: string,
  params: Array<string | number | null>,
): Promise<T[]> {
  const stmt = db.prepare(sql);
  try {
    stmt.bind(params);
    const out: T[] = [];
    while (stmt.step()) {
      out.push(stmt.getAsObject() as T);
    }
    return out;
  } finally {
    stmt.free();
  }
}

type FinnhubNewsItem = {
  datetime: number;
  [key: string]: unknown;
};

type FinnhubMetricResponse = {
  metric?: Record<string, unknown>;
};


function parseJsonArray(raw: string | null): unknown[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseJsonStringArray(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function createAiClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function registerApiRoutes(app: Express): void {
  const ai = createAiClient();

  app.get('/api/logo/ticker/:ticker', (req: Request<{ticker: string}>, res: Response) => {
    const ticker = req.params.ticker?.trim().toUpperCase();
    if (!ticker) {
      return res.status(400).json({error: 'ticker is required'});
    }

    const token = process.env.LOGO_DEV_TOKEN || process.env.VITE_LOGO_DEV_TOKEN;
    if (!token) {
      return res.status(503).json({error: 'Logo token not configured (LOGO_DEV_TOKEN or VITE_LOGO_DEV_TOKEN)'});
    }

    const url = `https://img.logo.dev/ticker/${encodeURIComponent(ticker)}?token=${encodeURIComponent(token)}&size=128&format=png&theme=dark&retina=true`;
    return res.redirect(302, url);
  });

  app.post(
    '/api/committee/session',
    async (
      req: Request<Record<string, never>, unknown, CommitteeSessionRequest>,
      res: Response,
    ) => {
      return res.status(409).json({
        error:
          'Legacy ticker-only committee sessions are disabled. Use /api/research/committee/session with evidencePacketId from a frozen evidence packet.',
      });
    },
  );

  registerCommitteeRoutes(app, openResearchDb);
  registerArchiveRoutes(app, openResearchDb);
  registerAlertRoutes(app, openResearchDb);
  registerBriefingRoutes(app, openResearchDb);
  registerEventsRoutes(app, openResearchDb);
  registerOutcomeRoutes(app, openResearchDb);

  app.post('/api/research/evidence/freeze', (req: Request<Record<string, never>, unknown, FreezeEvidenceRequest>, res: Response) => {
    const ticker = req.body?.ticker?.trim().toUpperCase();
    if (!ticker) {
      return res.status(400).json({error: 'ticker is required'});
    }

    let db: ReturnType<typeof openResearchDb> | null = null;
    try {
      db = openResearchDb();
      const row = db
        .prepare(
          `
            SELECT s.ticker, f.market_cap, f.trailing_pe, f.forward_pe, f.price_to_book,
                   f.profit_margins, f.revenue_growth, f.fifty_day_ma, f.two_hundred_day_ma,
                   f.fifty_two_week_high, f.fifty_two_week_low, f.current_price, f.data_as_of as last_updated, f.free_cashflow,
                   (f.free_cashflow / (f.market_cap / f.price_to_sales)) as free_cashflow_margin,
                   (f.free_cashflow / f.market_cap) as free_cashflow_yield,
                   f.gross_margin, f.operating_margin,
                   f.eps, f.ebitda, f.diluted_net_income, f.price_to_sales, f.ev_to_ebitda, f.ev_to_gross_profit,
                   f.peg_ratio, f.operating_cash_flow, f.debt_to_equity, f.net_cash, f.current_ratio,
                   f.roe, f.roic, f.revenue_per_employee, NULL as earnings_revisions, NULL as share_buybacks,
                   NULL as insider_transactions, f.momentum_history, f.valuation_history,
                   ss.id as score_snapshot_id, ss.score_model_id, ss.actionability_state, ss.warnings,
                   ss.compounder_score, ss.tactical_score,
                   f.avg_dollar_volume
            FROM securities s
            JOIN fundamentals f ON s.ticker = f.ticker
            LEFT JOIN score_snapshots ss ON ss.id = (
              SELECT MAX(inner_ss.id) FROM score_snapshots inner_ss WHERE inner_ss.ticker = s.ticker
            )
            WHERE s.ticker = ?
          `,
        )
        .get(ticker) as TickerEvidenceRow | undefined;

      if (!row) {
        return res.status(404).json({error: `No evidence found for ${ticker}. Run collect_evidence.py first.`});
      }

      const payload = {
        ticker: row.ticker,
        valuation: {
          marketCap: row.market_cap,
          trailingPE: row.trailing_pe,
          forwardPE: row.forward_pe,
          priceToBook: row.price_to_book,
          priceToSales: row.price_to_sales,
          evToEbitda: row.ev_to_ebitda,
          evToGrossProfit: row.ev_to_gross_profit,
          pegRatio: row.peg_ratio,
        },
        fundamentals: {
          profitMargins: row.profit_margins,
          revenueGrowth: row.revenue_growth,
          freeCashflow: row.free_cashflow,
          freeCashflowMargin: row.free_cashflow_margin,
          freeCashflowYield: row.free_cashflow_yield,
          grossMargin: row.gross_margin,
          operatingMargin: row.operating_margin,
          eps: row.eps,
          ebitda: row.ebitda,
          dilutedNetIncome: row.diluted_net_income,
          operatingCashFlow: row.operating_cash_flow,
        },
        financialStrength: {
          debtToEquity: row.debt_to_equity,
          netCash: row.net_cash,
          currentRatio: row.current_ratio,
          roe: row.roe,
          roic: row.roic,
          revenuePerEmployee: row.revenue_per_employee,
          earningsRevisions: row.earnings_revisions,
          shareBuybacks: row.share_buybacks,
          insiderTransactions: row.insider_transactions,
        },
        technicals: {
          fiftyDayMA: row.fifty_day_ma,
          twoHundredDayMA: row.two_hundred_day_ma,
          fiftyTwoWeekHigh: row.fifty_two_week_high,
          fiftyTwoWeekLow: row.fifty_two_week_low,
          currentPrice: row.current_price,
        },
        marketData: {
          avgDollarVolume: row.avg_dollar_volume,
        },
        liquidity: {
          avgDollarVolume: row.avg_dollar_volume,
        },
        history: {
          momentum: parseJsonArray(row.momentum_history),
          valuation: parseJsonArray(row.valuation_history),
        },
        score: {
          snapshotId: row.score_snapshot_id,
          modelId: row.score_model_id,
          actionabilityState: row.actionability_state,
          compounderScore: row.compounder_score,
          tacticalScore: row.tactical_score,
          warnings: parseJsonStringArray(row.warnings),
        },
        lastUpdated: row.last_updated,
      };

      const packet = freezeEvidencePacket(db, {
        ticker,
        scoreSnapshotId: row.score_snapshot_id,
        scoreModelId: row.score_model_id,
        payload,
      });

      return res.status(201).json({
        id: packet.id,
        ticker: packet.ticker,
        scoreSnapshotId: packet.scoreSnapshotId,
        scoreModelId: packet.scoreModelId,
        frozenAt: packet.frozenAt,
      });
    } catch (error) {
      console.error('Freeze evidence error:', error);
      return res.status(500).json({error: 'Failed to freeze evidence packet'});
    } finally {
      db?.close();
    }
  });

  app.get('/api/research/evidence/:id', (req: Request<{id: string}>, res: Response) => {
    let db: ReturnType<typeof openResearchDb> | null = null;
    try {
      db = openResearchDb();
      const packet = getFrozenEvidencePacket(db, req.params.id);
      if (!packet) {
        return res.status(404).json({error: `Frozen evidence packet not found: ${req.params.id}`});
      }
      const payload = JSON.parse(packet.payloadJson) as {score?: {actionabilityState?: string}};
      return res.json({
        id: packet.id,
        ticker: packet.ticker,
        actionabilityState: payload.score?.actionabilityState ?? 'unknown',
      });
    } catch (error) {
      console.error('Evidence status error:', error);
      return res.status(500).json({error: 'Failed to fetch evidence packet status'});
    } finally {
      db?.close();
    }
  });

  app.get('/api/market/fear-greed', async (_req: Request, res: Response) => {
    try {
      const snapshot = await fetchCnnFearGreedSnapshot();
      return res.json(snapshot);
    } catch (error) {
      console.error('Fear & Greed fetch error:', error);
      return res.status(500).json({error: 'Failed to fetch Fear & Greed index'});
    }
  });

  app.get('/api/market/indices', async (_req: Request, res: Response) => {
    try {
      // Use YahooFinance instead of FMP because FMP restricts index quotes on the free tier
      const yf = new YahooFinance();
      const [spyQuote, qqqQuote, djiaQuote] = await Promise.all([
        yf.quote('^GSPC').catch(() => null),
        yf.quote('^IXIC').catch(() => null),
        yf.quote('^DJI').catch(() => null)
      ]);

      const formatQuote = (q: any) => {
        if (!q) return null;
        return {
          price: q.regularMarketPrice,
          changePercentage: q.regularMarketChangePercent
        };
      };

      return res.json({
        spy: formatQuote(spyQuote),
        qqq: formatQuote(qqqQuote),
        djia: formatQuote(djiaQuote)
      });
    } catch (error: any) {
      console.error('Indices fetch error:', error);
      return res.status(500).json({error: error.message || 'Failed to fetch indices quotes'});
    }
  });

  app.get('/api/research/readiness', async (_req: Request, res: Response) => {
    try {
      const db = openResearchDb();
      const row = db.prepare(`
        SELECT id, pipeline_name, started_at, completed_at, status, error_summary
        FROM pipeline_runs
        WHERE completed_at IS NOT NULL AND status IN ('ready', 'degraded', 'success', 'failed')
        ORDER BY completed_at DESC, id DESC
        LIMIT 1
      `).get() as PipelineRunRow | undefined;

      const sourceRows = row
        ? db.prepare(`
            SELECT source_name, tier, status, data_as_of, error_message
            FROM source_runs
            WHERE pipeline_run_id = ?
            ORDER BY tier, source_name
          `).all(row.id) as SourceRunRow[]
        : [];
      db.close();

      if (!row) {
        return res.json({ status: 'no_data', message: 'No completed pipeline runs found', sources: [] });
      }

      const completedAt = row.completed_at ? new Date(row.completed_at) : null;
      const diffHours = completedAt
        ? (Date.now() - completedAt.getTime()) / (1000 * 60 * 60)
        : Number.POSITIVE_INFINITY;

      const status = row.status === 'failed'
        ? 'failed'
        : diffHours > 24
          ? 'stale_usable'
          : row.status === 'degraded'
            ? 'degraded_partial'
            : 'fresh_actionable';

      return res.json({
        status,
        generatedAt: new Date().toISOString(),
        runId: row.id,
        dataAsOf: row.completed_at,
        warnings: row.error_summary ? [row.error_summary] : [],
        sources: sourceRows.map((source) => ({
          name: source.source_name,
          tier: source.tier,
          status: source.status,
          timestamp: source.data_as_of,
          errorMessage: source.error_message,
        })),
      });
    } catch (error) {
      console.error('Readiness error:', error);
      return res.status(500).json({ error: 'Failed to fetch readiness' });
    }
  });

  app.get('/api/research/scanner', (_req: Request, res: Response) => {
    try {
      const db = openResearchDb();
      const rows = db.prepare(`
        SELECT 
          s.ticker, s.name, s.sector,
          ss.compounder_score as strength,
          ss.tactical_score as tacticalStrength,
          ss.actionability_state as actionabilityState,
          ss.warnings,
          ss.score_model_id as scoreModelId,
          CASE WHEN ss.actionability_state != 'fresh_actionable' THEN 'WATCH'
               WHEN ss.compounder_score >= 80 THEN 'BULLISH'
               WHEN ss.compounder_score >= 60 THEN 'WATCH'
               ELSE 'BEARISH' END as signal
        FROM score_snapshots ss
        JOIN securities s ON ss.ticker = s.ticker
        WHERE ss.id IN (
          SELECT MAX(id) FROM score_snapshots GROUP BY ticker
        )
        ORDER BY ss.compounder_score DESC
      `).all() as ScannerRow[];
      db.close();

      const opportunities = rows.map((row) => ({
        ticker: row.ticker,
        name: row.name,
        sector: row.sector,
        strength: Math.round(row.strength),
        tacticalStrength: Math.round(row.tacticalStrength),
        signal: row.signal,
        actionabilityState: row.actionabilityState,
        scoreModelId: row.scoreModelId,
        warnings: parseJsonStringArray(row.warnings),
        reason: row.actionabilityState === 'fresh_actionable'
          ? `Review-ready score from ${row.scoreModelId} model (compounder: ${Math.round(row.strength)}).`
          : 'Candidate requires review because core score inputs are missing or stale.',
      }));

      return res.json({
        generatedAt: new Date().toISOString(),
        queue: 'compounder',
        opportunities,
      });
    } catch (error) {
      console.error('Scanner error:', error);
      return res.status(500).json({ error: 'Failed to fetch scanner queue' });
    }
  });

  app.get(
    '/api/research/securities/search',
    async (req: Request<Record<string, never>, unknown, unknown, SecuritiesSearchQuery>, res: Response) => {
      const q = req.query.q?.trim() ?? '';
      const rawLimit = Number.parseInt(req.query.limit ?? '10', 10);
      const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 50) : 10;

      if (!q) {
        return res.json({query: q, results: []});
      }

      const qUpper = q.toUpperCase();
      const likeAny = `%${qUpper}%`;
      const likePrefix = `${qUpper}%`;

      try {
        const db = openResearchDb();
        const rows = db
          .prepare(
            `
              SELECT ticker, name, exchange, sector
              FROM securities
              WHERE active = 1
                AND (
                  UPPER(ticker) LIKE ? OR UPPER(COALESCE(name, '')) LIKE ?
                )
              ORDER BY
                CASE
                  WHEN UPPER(ticker) = ? THEN 0
                  WHEN UPPER(ticker) LIKE ? THEN 1
                  WHEN UPPER(COALESCE(name, '')) LIKE ? THEN 2
                  ELSE 3
                END,
                ticker
              LIMIT ?
            `,
          )
          .all(likeAny, likeAny, qUpper, likePrefix, likeAny, limit) as SecuritySearchRow[];
        db.close();

        return res.json({
          query: q,
          results: rows.map((row) => ({
            ticker: row.ticker,
            name: row.name,
            exchange: row.exchange,
            sector: row.sector,
          })),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const isMissingDb = message.includes('Northstar research DB not found');
        if (isMissingDb) {
          return res.json({query: q, results: [], meta: {status: 'no_db', message}});
        }

        // Vercel often fails to load native better-sqlite3; attempt a WASM fallback.
        try {
          const wasmDb = await openSqlJsDb();
          const rows = await querySqlJsRows<SecuritySearchRow>(
            wasmDb,
            `
              SELECT ticker, name, exchange, sector
              FROM securities
              WHERE active = 1
                AND (
                  UPPER(ticker) LIKE ? OR UPPER(COALESCE(name, '')) LIKE ?
                )
              ORDER BY
                CASE
                  WHEN UPPER(ticker) = ? THEN 0
                  WHEN UPPER(ticker) LIKE ? THEN 1
                  WHEN UPPER(COALESCE(name, '')) LIKE ? THEN 2
                  ELSE 3
                END,
                ticker
              LIMIT ?
            `,
            [likeAny, likeAny, qUpper, likePrefix, likeAny, limit],
          );
          return res.json({
            query: q,
            results: rows.map((row) => ({
              ticker: row.ticker,
              name: row.name,
              exchange: row.exchange,
              sector: row.sector,
            })),
            meta: {status: 'wasm_fallback', message: 'Using sql.js (WASM) database reader.'},
          });
        } catch (fallbackError) {
          console.error('Securities search error:', error);
          console.error('Securities search WASM fallback error:', fallbackError);
          return res.status(500).json({
            error: 'Failed to search securities',
            meta: {
              status: 'wasm_fallback_failed',
              runtime: getResearchRuntimeMeta(),
            },
          });
        }

      }
    },
  );

  app.get(
    '/api/research/insights',
    async (req: Request<Record<string, never>, unknown, unknown, InsightsQuery>, res: Response) => {
      const tab = (req.query.tab?.trim() || 'sp500').toLowerCase();
      const rawLimit = Number.parseInt(req.query.limit ?? '24', 10);
      const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 24;

      const unavailableTabs = new Set(['dividend', 'buyback']);
      if (unavailableTabs.has(tab)) {
        return res.json({
          tab,
          generatedAt: new Date().toISOString(),
          items: [],
          meta: {
            status: 'unavailable',
            message: 'This insights tab is not yet available with the current dataset.',
          },
        });
      }

      const isThemeTab = ['ai', 'cloud', 'ev', 'leisure'].includes(tab);
      const themeSectorFilter: Record<string, string[] | undefined> = {
        ai: ['Technology'],
        cloud: ['Technology', 'Communication Services'],
        ev: ['Consumer Discretionary'],
        leisure: ['Consumer Discretionary', 'Communication Services'],
      };

      const makeMeta = () => (isThemeTab
        ? {
            status: 'heuristic',
            message: 'Theme insights are sector-based heuristics (tags are not yet available in the dataset).',
          }
        : undefined);

      const baseSql = tab === 'trending'
        ? `
            SELECT
              s.ticker,
              s.name,
              s.exchange,
              s.sector,
              f.current_price as price,
              f.market_cap as marketCap
            FROM securities s
            LEFT JOIN fundamentals f ON f.ticker = s.ticker
            LEFT JOIN score_snapshots ss ON ss.id = (
              SELECT MAX(inner_ss.id) FROM score_snapshots inner_ss WHERE inner_ss.ticker = s.ticker
            )
            WHERE s.active = 1
            ORDER BY COALESCE(ss.tactical_score, -1e9) DESC, s.ticker ASC
            LIMIT ?
          `
        : tab === 'growth'
          ? `
              SELECT
                s.ticker,
                s.name,
                s.exchange,
                s.sector,
                f.current_price as price,
                f.market_cap as marketCap
              FROM securities s
              LEFT JOIN fundamentals f ON f.ticker = s.ticker
              WHERE s.active = 1
              ORDER BY COALESCE(f.revenue_growth, -1e9) DESC, s.ticker ASC
              LIMIT ?
            `
          : (() => {
              const sectorFilters = isThemeTab ? themeSectorFilter[tab] : undefined;
              if (sectorFilters && sectorFilters.length > 0) {
                const placeholders = sectorFilters.map(() => '?').join(',');
                return {
                  sql: `
                      SELECT
                        s.ticker,
                        s.name,
                        s.exchange,
                        s.sector,
                        f.current_price as price,
                        f.market_cap as marketCap
                      FROM securities s
                      LEFT JOIN fundamentals f ON f.ticker = s.ticker
                      WHERE s.active = 1 AND s.sector IN (${placeholders})
                      ORDER BY COALESCE(f.market_cap, -1e18) DESC, s.ticker ASC
                      LIMIT ?
                    `,
                  params: [...sectorFilters, limit] as Array<string | number>,
                };
              }
              return {
                sql: `
                    SELECT
                      s.ticker,
                      s.name,
                      s.exchange,
                      s.sector,
                      f.current_price as price,
                      f.market_cap as marketCap
                    FROM securities s
                    LEFT JOIN fundamentals f ON f.ticker = s.ticker
                    WHERE s.active = 1
                    ORDER BY COALESCE(f.market_cap, -1e18) DESC, s.ticker ASC
                    LIMIT ?
                  `,
                params: [limit] as Array<string | number>,
              };
            })();

      const sqlInfo = typeof baseSql === 'string'
        ? {sql: baseSql, params: [limit] as Array<string | number>}
        : baseSql;

      try {
        const db = openResearchDb();
        const rows = db.prepare(sqlInfo.sql).all(...sqlInfo.params) as InsightRow[];
        db.close();
        return res.json({
          tab,
          generatedAt: new Date().toISOString(),
          items: rows.map((row) => ({
            ticker: row.ticker,
            name: row.name,
            exchange: row.exchange,
            sector: row.sector,
            price: row.price,
            marketCap: row.marketCap,
          })),
          meta: makeMeta(),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const isMissingDb = message.includes('Northstar research DB not found');
        if (isMissingDb) {
          return res.json({
            tab,
            generatedAt: new Date().toISOString(),
            items: [],
            meta: {
              status: 'no_db',
              message,
            },
          });
        }

        // Native SQLite binding may fail on Vercel; attempt WASM fallback.
        try {
          const wasmDb = await openSqlJsDb();
          const rows = await querySqlJsRows<InsightRow>(
            wasmDb,
            sqlInfo.sql,
            sqlInfo.params.map((p) => (typeof p === 'number' ? p : p)) as Array<string | number | null>,
          );
          return res.json({
            tab,
            generatedAt: new Date().toISOString(),
            items: rows.map((row) => ({
              ticker: row.ticker,
              name: row.name,
              exchange: row.exchange,
              sector: row.sector,
              price: row.price,
              marketCap: row.marketCap,
            })),
            meta: {
              ...(makeMeta() ?? {}),
              status: 'wasm_fallback',
              message: 'Using sql.js (WASM) database reader.',
            },
          });
        } catch (fallbackError) {
          console.error('Insights error:', error);
          console.error('Insights WASM fallback error:', fallbackError);
          return res.status(500).json({
            error: 'Failed to fetch insights',
            meta: {
              status: 'wasm_fallback_failed',
              runtime: getResearchRuntimeMeta(),
            },
          });
        }
      }
    },
  );

  app.get(
    '/api/research/security/:ticker',
    (
      req: Request<SecurityTickerParams>,
      res: Response,
    ) => {
      const ticker = req.params.ticker?.toUpperCase();
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }

      try {
        const db = openResearchDb();
        const row = db
          .prepare(
            `
              SELECT s.ticker, f.market_cap, f.trailing_pe, f.forward_pe, f.price_to_book,
                     f.profit_margins, f.revenue_growth, f.fifty_day_ma, f.two_hundred_day_ma,
                     f.fifty_two_week_high, f.fifty_two_week_low, f.current_price, f.data_as_of as last_updated, f.free_cashflow,
                     (f.free_cashflow / (f.market_cap / f.price_to_sales)) as free_cashflow_margin,
                     (f.free_cashflow / f.market_cap) as free_cashflow_yield,
                     f.gross_margin, f.operating_margin,
                     f.eps, f.ebitda, f.diluted_net_income, f.price_to_sales, f.ev_to_ebitda, f.ev_to_gross_profit,
                     f.peg_ratio, f.operating_cash_flow, f.debt_to_equity, f.net_cash, f.current_ratio,
                     f.roe, f.roic, f.revenue_per_employee, NULL as earnings_revisions, NULL as share_buybacks,
                     NULL as insider_transactions, f.momentum_history, f.valuation_history,
                     ss.id as score_snapshot_id, ss.score_model_id, ss.actionability_state, ss.warnings,
                     ss.compounder_score, ss.tactical_score,
                   f.avg_dollar_volume
              FROM securities s
              JOIN fundamentals f ON s.ticker = f.ticker
              LEFT JOIN score_snapshots ss ON ss.id = (
                SELECT MAX(inner_ss.id) FROM score_snapshots inner_ss WHERE inner_ss.ticker = s.ticker
              )
              WHERE s.ticker = ?
            `,
          )
          .get(ticker) as TickerEvidenceRow | undefined;
        db.close();

        if (!row) {
          return res.status(404).json({
            error: `No evidence found for ${ticker}. Run collect_evidence.py first.`,
          });
        }

        return res.json({
          ticker: row.ticker,
          valuation: {
            marketCap: row.market_cap,
            trailingPE: row.trailing_pe,
            forwardPE: row.forward_pe,
            priceToBook: row.price_to_book,
            priceToSales: row.price_to_sales,
            evToEbitda: row.ev_to_ebitda,
            evToGrossProfit: row.ev_to_gross_profit,
            pegRatio: row.peg_ratio,
          },
          fundamentals: {
            profitMargins: row.profit_margins,
            revenueGrowth: row.revenue_growth,
            freeCashflow: row.free_cashflow,
            freeCashflowMargin: row.free_cashflow_margin,
            freeCashflowYield: row.free_cashflow_yield,
            grossMargin: row.gross_margin,
            operatingMargin: row.operating_margin,
            eps: row.eps,
            ebitda: row.ebitda,
            dilutedNetIncome: row.diluted_net_income,
            operatingCashFlow: row.operating_cash_flow,
          },
          financialStrength: {
            debtToEquity: row.debt_to_equity,
            netCash: row.net_cash,
            currentRatio: row.current_ratio,
            roe: row.roe,
            roic: row.roic,
            revenuePerEmployee: row.revenue_per_employee,
            earningsRevisions: row.earnings_revisions,
            shareBuybacks: row.share_buybacks,
            insiderTransactions: row.insider_transactions,
          },
          technicals: {
            fiftyDayMA: row.fifty_day_ma,
            twoHundredDayMA: row.two_hundred_day_ma,
            fiftyTwoWeekHigh: row.fifty_two_week_high,
            fiftyTwoWeekLow: row.fifty_two_week_low,
            currentPrice: row.current_price,
          },
          history: {
            momentum: parseJsonArray(row.momentum_history),
            valuation: parseJsonArray(row.valuation_history),
          },
          score: {
            snapshotId: row.score_snapshot_id,
            modelId: row.score_model_id,
            actionabilityState: row.actionability_state,
            compounderScore: row.compounder_score,
            tacticalScore: row.tactical_score,
            warnings: parseJsonStringArray(row.warnings),
          },
          lastUpdated: row.last_updated,
        });
      } catch (error) {
        console.error('Security evidence error:', error);
        return res.status(500).json({error: 'Failed to fetch security evidence'});
      }
    },
  );

  app.post('/api/research/security/:ticker/refresh', (req: Request<SecurityTickerParams>, res: Response) => {
    const tickerRaw = req.params.ticker ?? '';
    const ticker = tickerRaw.trim().toUpperCase();
    if (!/^[A-Z][A-Z0-9.-]{0,9}$/.test(ticker)) {
      return res.status(400).json({error: 'Invalid ticker'});
    }

    const cooldownDecision = tickerRefreshCooldown.startOrReject(ticker);
    if (isTickerCooldownRejection(cooldownDecision)) {
      const payload = buildTickerRefreshCooldownErrorPayload(cooldownDecision);
      res.setHeader('Retry-After', payload.retryAfterSeconds.toString());
      return res.status(429).json(payload);
    }

    const TIMEOUT_MS = 120_000;
    const cwd = process.cwd();

    exec(
      `python3 scripts/collect_evidence.py --ticker ${ticker}`,
      {cwd, timeout: TIMEOUT_MS, maxBuffer: 2_000_000},
      (err, stdout, stderr) => {
        if (err) {
          const message = err.killed && err.code === undefined
            ? `Evidence collection timed out for ${ticker}.`
            : (stderr || err.message).trim();
          return res.status(502).json({
            error: message,
            ticker,
            fallbackCommand: `python3 scripts/collect_evidence.py --ticker ${ticker}`,
          });
        }

        try {
          const db = openResearchDb();
          const row = db
            .prepare(
              `
                SELECT s.ticker, f.market_cap, f.trailing_pe, f.forward_pe, f.price_to_book,
                       f.profit_margins, f.revenue_growth, f.fifty_day_ma, f.two_hundred_day_ma,
                       f.fifty_two_week_high, f.fifty_two_week_low, f.current_price, f.data_as_of as last_updated, f.free_cashflow,
                       (f.free_cashflow / (f.market_cap / f.price_to_sales)) as free_cashflow_margin,
                       (f.free_cashflow / f.market_cap) as free_cashflow_yield,
                       f.gross_margin, f.operating_margin,
                       f.eps, f.ebitda, f.diluted_net_income, f.price_to_sales, f.ev_to_ebitda, f.ev_to_gross_profit,
                       f.peg_ratio, f.operating_cash_flow, f.debt_to_equity, f.net_cash, f.current_ratio,
                       f.roe, f.roic, f.revenue_per_employee, NULL as earnings_revisions, NULL as share_buybacks,
                       NULL as insider_transactions, f.momentum_history, f.valuation_history,
                       ss.id as score_snapshot_id, ss.score_model_id, ss.actionability_state, ss.warnings,
                       ss.compounder_score, ss.tactical_score,
                     f.avg_dollar_volume
                FROM securities s
                JOIN fundamentals f ON s.ticker = f.ticker
                LEFT JOIN score_snapshots ss ON ss.id = (
                  SELECT MAX(inner_ss.id) FROM score_snapshots inner_ss WHERE inner_ss.ticker = s.ticker
                )
                WHERE s.ticker = ?
              `,
            )
            .get(ticker) as TickerEvidenceRow | undefined;
          db.close();

          if (!row) {
            return res.status(502).json({
              error: `Evidence collector completed but ${ticker} was not written to DB.`,
              ticker,
              stdout: stdout.trim() || null,
            });
          }

          return res.json({
            status: 'fresh',
            stdout: stdout.trim() || null,
            payload: {
              ticker: row.ticker,
              valuation: {
                marketCap: row.market_cap,
                trailingPE: row.trailing_pe,
                forwardPE: row.forward_pe,
                priceToBook: row.price_to_book,
                priceToSales: row.price_to_sales,
                evToEbitda: row.ev_to_ebitda,
                evToGrossProfit: row.ev_to_gross_profit,
                pegRatio: row.peg_ratio,
              },
              fundamentals: {
                profitMargins: row.profit_margins,
                revenueGrowth: row.revenue_growth,
                freeCashflow: row.free_cashflow,
                freeCashflowMargin: row.free_cashflow_margin,
                freeCashflowYield: row.free_cashflow_yield,
                grossMargin: row.gross_margin,
                operatingMargin: row.operating_margin,
                eps: row.eps,
                ebitda: row.ebitda,
                dilutedNetIncome: row.diluted_net_income,
                operatingCashFlow: row.operating_cash_flow,
              },
              financialStrength: {
                debtToEquity: row.debt_to_equity,
                netCash: row.net_cash,
                currentRatio: row.current_ratio,
                roe: row.roe,
                roic: row.roic,
                revenuePerEmployee: row.revenue_per_employee,
                earningsRevisions: row.earnings_revisions,
                shareBuybacks: row.share_buybacks,
                insiderTransactions: row.insider_transactions,
              },
              technicals: {
                fiftyDayMA: row.fifty_day_ma,
                twoHundredDayMA: row.two_hundred_day_ma,
                fiftyTwoWeekHigh: row.fifty_two_week_high,
                fiftyTwoWeekLow: row.fifty_two_week_low,
                currentPrice: row.current_price,
              },
              history: {
                momentum: parseJsonArray(row.momentum_history),
                valuation: parseJsonArray(row.valuation_history),
              },
              score: {
                snapshotId: row.score_snapshot_id,
                modelId: row.score_model_id,
                actionabilityState: row.actionability_state,
                compounderScore: row.compounder_score,
                tacticalScore: row.tactical_score,
                warnings: parseJsonStringArray(row.warnings),
              },
              lastUpdated: row.last_updated,
            },
          });
        } catch (queryError) {
          console.error('Evidence refresh query error:', queryError);
          return res.status(500).json({error: 'Failed to load evidence after refresh'});
        }
      },
    );
  });

  app.get(
    '/api/research/security/:ticker/refresh/stream',
    (req: Request<SecurityTickerParams>, res: Response) => {
      const tickerRaw = req.params.ticker ?? '';
      const ticker = tickerRaw.trim().toUpperCase();
      if (!/^[A-Z][A-Z0-9.-]{0,9}$/.test(ticker)) {
        return res.status(400).json({error: 'Invalid ticker'});
      }

      const cooldownDecision = tickerRefreshCooldown.startOrReject(ticker);
      if (isTickerCooldownRejection(cooldownDecision)) {
        const payload = buildTickerRefreshCooldownErrorPayload(cooldownDecision);
        res.setHeader('Retry-After', payload.retryAfterSeconds.toString());
        return res.status(429).json(payload);
      }

      const sendEvent = (event: string, data: string): void => {
        const safe = data.replaceAll('\n', ' ');
        res.write(`event: ${event}\n`);
        res.write(`data: ${safe}\n\n`);
      };

      res.status(200);
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.flushHeaders();

      sendEvent('start', `Collecting evidence for ${ticker}…`);

      const child = spawn('python3', ['scripts/collect_evidence.py', '--ticker', ticker], {
        cwd: process.cwd(),
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      const writeChunk = (chunk: unknown, streamLabel: string): void => {
        const text =
          typeof chunk === 'string'
            ? chunk
            : chunk instanceof Buffer
              ? chunk.toString('utf8')
              : '';

        text
          .split(/\r?\n/)
          .filter((line) => line.trim().length > 0)
          .forEach((line) => sendEvent('log', `[${streamLabel}] ${line}`));
      };

      child.stdout?.on('data', (chunk) => writeChunk(chunk, 'stdout'));
      child.stderr?.on('data', (chunk) => writeChunk(chunk, 'stderr'));

      const timeout = setTimeout(() => {
        sendEvent('error', `Evidence collection timed out for ${ticker}.`);
        child.kill('SIGKILL');
      }, 120_000);

      const cleanup = (): void => {
        clearTimeout(timeout);
      };

      res.on('close', () => {
        cleanup();
        child.kill('SIGKILL');
      });

      child.on('error', (error) => {
        cleanup();
        sendEvent('error', error.message || 'Failed to spawn evidence collector');
        res.end();
      });

      child.on('exit', (code, signal) => {
        cleanup();

        if (signal) {
          sendEvent('error', `Evidence collector terminated (${signal}) for ${ticker}.`);
          res.end();
          return;
        }

        if (code !== 0) {
          sendEvent('error', `Evidence collector failed (exit ${code ?? 'unknown'}) for ${ticker}.`);
          res.end();
          return;
        }

        sendEvent('done', ticker);
        res.end();
      });
    },
  );

  // ─── Unified Screener Endpoint ────────────────────────────────────────────
  app.get(
    '/api/research/screener',
    async (
      req: Request<Record<string, never>, unknown, unknown, ScreenerQuery>,
      res: Response,
    ) => {
      const universe = (req.query.universe?.trim() || 'sp500').toLowerCase();
      const sector   = req.query.sector?.trim() || null;
      
      const isThemeTab = false; // We no longer use sector-based theme tabs
      // Removed legacy themeSectorFilter
      
      let defaultSortRaw = 'market_cap';
      if (universe === 'trending') defaultSortRaw = 'tactical';
      else if (universe === 'growth') defaultSortRaw = 'revenue_growth';

      const sortRaw  = req.query.sort?.trim().toLowerCase() || defaultSortRaw;
      const defaultOrder = (sortRaw === 'pe' || sortRaw === 'forward_pe' || sortRaw === 'ticker') ? 'ASC' : 'DESC';
      const order    = req.query.order ? ((req.query.order?.trim().toLowerCase() === 'asc') ? 'ASC' : 'DESC') : defaultOrder;

      const rawLimit = Number.parseInt(req.query.limit  ?? '100', 10);
      const rawOffset= Number.parseInt(req.query.offset ?? '0',   10);
      const limit    = Number.isFinite(rawLimit)  ? Math.min(Math.max(rawLimit, 1), 1000)  : 100;
      const offset   = Number.isFinite(rawOffset) ? Math.max(rawOffset, 0)                 : 0;
      const q        = req.query.q?.trim().toUpperCase() || null;

      const ALLOWED_SORTS: Record<string, string> = {
        market_cap:      'COALESCE(f.market_cap, -1e18)',
        score:           'COALESCE(ss.compounder_score, -1)',
        tactical:        'COALESCE(ss.tactical_score, -1)',
        pe:              'COALESCE(f.trailing_pe, 1e18)',
        forward_pe:      'COALESCE(f.forward_pe, 1e18)',
        revenue_growth:  'COALESCE(f.revenue_growth, -1e18)',
        profit_margin:   'COALESCE(f.profit_margins, -1e18)',
        high_yield:      '(COALESCE(f.free_cashflow, 0) / COALESCE(NULLIF(f.market_cap, 0), 1e18))',
        price:           'COALESCE(f.current_price, -1e18)',
        ticker:          's.ticker',
      };
      const sortExpr = ALLOWED_SORTS[sortRaw] ?? ALLOWED_SORTS['market_cap'];

      try {
        const db = openResearchDb();

        const requiresMembership = ['sp500', 'qqq', 'dow30', 'space', 'ai_chips', 'ai_data', 'ai_software', 'moat', 'compounders'].includes(universe);
        let universeJoin = '';
        if (requiresMembership) {
           const memberCount = (db.prepare(
            `SELECT COUNT(*) as cnt FROM universe_memberships WHERE universe = ?`
           ).get(universe) as {cnt: number}).cnt;
           if (memberCount > 0) {
             universeJoin = `JOIN universe_memberships um ON um.ticker = s.ticker AND um.universe = ?`;
           }
        }

        const params: Array<string | number | null> = [];
        const countParams: Array<string | number | null> = [];
        
        if (universeJoin) {
           params.push(universe);
           countParams.push(universe);
        }

        let sectorWhere = '';
        if (sector) {
           sectorWhere = 'AND s.sector = ?';
           params.push(sector);
           countParams.push(sector);
        } else if (isThemeTab) {
           const sectors = themeSectorFilter[universe];
           const placeholders = sectors.map(() => '?').join(',');
           sectorWhere = `AND s.sector IN (${placeholders})`;
           params.push(...sectors);
           countParams.push(...sectors);
        }

        const searchWhere = q ? `AND (UPPER(s.ticker) LIKE ? OR UPPER(COALESCE(s.name,'')) LIKE ?)` : '';
        if (q) {
           params.push(`%${q}%`, `%${q}%`);
           countParams.push(`%${q}%`, `%${q}%`);
        }

        const sectorListParams = universeJoin ? [universe] : [];
        const sectorRows = db.prepare(
          `SELECT DISTINCT s.sector FROM securities s ${universeJoin} WHERE s.active = 1 AND s.sector IS NOT NULL ORDER BY s.sector`
        ).all(...sectorListParams) as {sector: string}[];

        params.push(limit, offset);

        const sql = `
          SELECT
            s.ticker,
            s.name,
            s.exchange,
            s.sector,
            f.current_price      AS price,
            f.market_cap         AS marketCap,
            f.trailing_pe        AS trailingPe,
            f.forward_pe         AS forwardPe,
            f.revenue_growth     AS revenueGrowth,
            f.profit_margins     AS profitMargins,
            f.gross_margin       AS grossMargin,
            f.operating_margin   AS operatingMargin,
            f.roe                AS roe,
            f.debt_to_equity     AS debtToEquity,
            ss.compounder_score  AS compoundScore,
            ss.tactical_score    AS tacticalScore,
            ss.actionability_state AS actionabilityState,
            f.fifty_day_ma       AS fiftyDayMa,
            f.two_hundred_day_ma AS twoHundredDayMa,
            f.fifty_two_week_high AS fiftyTwoWeekHigh,
            f.fifty_two_week_low  AS fiftyTwoWeekLow,
            f.avg_dollar_volume  AS avgDollarVolume,
            f.data_as_of         AS dataAsOf
          FROM securities s
          ${universeJoin}
          LEFT JOIN fundamentals f   ON f.ticker = s.ticker
          LEFT JOIN score_snapshots ss ON ss.id = (
            SELECT MAX(inner_ss.id) FROM score_snapshots inner_ss WHERE inner_ss.ticker = s.ticker
          )
          WHERE s.active = 1
            ${sectorWhere}
            ${searchWhere}
          ORDER BY ${sortExpr} ${order}, s.ticker ASC
          LIMIT ? OFFSET ?
        `;

        const rows = db.prepare(sql).all(...params) as ScreenerRow[];

        const totalCount = (db.prepare(`
          SELECT COUNT(*) as cnt FROM securities s ${universeJoin}
          LEFT JOIN fundamentals f ON f.ticker = s.ticker
          WHERE s.active = 1 ${sectorWhere} ${searchWhere}
        `).get(...countParams) as {cnt: number}).cnt;

        db.close();

        return res.json({
          generatedAt: new Date().toISOString(),
          universe: universe,
          total: totalCount,
          limit,
          offset,
          sectors: sectorRows.map((r) => r.sector),
          items: rows.map((row) => ({
            ticker:             row.ticker,
            name:               row.name,
            exchange:           row.exchange,
            sector:             row.sector,
            price:              row.price,
            marketCap:          row.marketCap,
            trailingPe:         row.trailingPe,
            forwardPe:          row.forwardPe,
            revenueGrowth:      row.revenueGrowth,
            profitMargins:      row.profitMargins,
            grossMargin:        row.grossMargin,
            operatingMargin:    row.operatingMargin,
            roe:                row.roe,
            debtToEquity:       row.debtToEquity,
            compoundScore:      row.compoundScore,
            tacticalScore:      row.tacticalScore,
            actionabilityState: row.actionabilityState,
            fiftyDayMa:         row.fiftyDayMa,
            twoHundredDayMa:    row.twoHundredDayMa,
            fiftyTwoWeekHigh:   row.fiftyTwoWeekHigh,
            fiftyTwoWeekLow:    row.fiftyTwoWeekLow,
            avgDollarVolume:    row.avgDollarVolume,
            dataAsOf:           row.dataAsOf,
          })),
        });
      } catch (error) {
        console.error('Screener endpoint error:', error);
        return res.status(500).json({ error: 'Failed to fetch screener data' });
      }
    },
  );

  app.get('/api/portfolio/ibkr', async (_req: Request, res: Response) => {
    try {
      const snapshot = await loadIbkrPortfolioSnapshot();
      if (!snapshot) {
        return res.status(404).json({error: 'IBKR portfolio snapshot not found'});
      }
      return res.json(snapshot);
    } catch (error) {
      console.error('IBKR portfolio load error:', error);
      return res.status(500).json({error: 'Failed to load IBKR portfolio snapshot'});
    }
  });

  app.get(
    '/api/portfolio/ibkr/analytics',
    async (
      req: Request<Record<string, never>, unknown, unknown, SpyHistoryQuery>,
      res: Response,
    ) => {
      try {
        const snapshot = await loadIbkrPortfolioSnapshot();
        if (!snapshot) {
          return res.status(404).json({error: 'IBKR portfolio snapshot not found'});
        }

        const rawRange = req.query.range;
        const range = rawRange === 'ytd' || rawRange === 'mtd' ? rawRange : '1y';
        const analytics = await buildIbkrPortfolioAnalytics(snapshot, range);
        return res.json(analytics);
      } catch (error) {
        console.error('IBKR portfolio analytics error:', error);
        return res.status(500).json({error: 'Failed to build IBKR portfolio analytics'});
      }
    },
  );

  app.get('/api/news/market', async (_req: Request, res: Response) => {
    const finnhubKey = process.env.FINNHUB_API_KEY;
    if (!finnhubKey) {
      return res.status(500).json({error: 'Finnhub key missing'});
    }

    try {
      const url = new URL('https://finnhub.io/api/v1/news');
      url.searchParams.set('category', 'general');
      url.searchParams.set('token', finnhubKey);
      const response = await fetch(url);
      const data = (await response.json()) as FinnhubNewsItem[];
      return res.json(data.slice(0, 10));
    } catch (error) {
      console.error('Market news fetch error:', error);
      return res.status(500).json({error: 'Failed to fetch news'});
    }
  });

  app.get(
    '/api/news/holdings',
    async (
      req: Request<Record<string, never>, unknown, unknown, HoldingsNewsQuery>,
      res: Response,
    ) => {
      const {symbols} = req.query;
      const finnhubKey = process.env.FINNHUB_API_KEY;
      if (!finnhubKey || !symbols) {
        return res.status(400).json({error: 'Missing parameters'});
      }

      try {
        const tickers = symbols.split(',');
        const today = new Date().toISOString().split('T')[0];
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        const allNews = await Promise.all(
          tickers.slice(0, 5).map(async (ticker) => {
            const url = new URL('https://finnhub.io/api/v1/company-news');
            url.searchParams.set('symbol', ticker);
            url.searchParams.set('from', weekAgo);
            url.searchParams.set('to', today);
            url.searchParams.set('token', finnhubKey);
            const response = await fetch(url);
            const data = (await response.json()) as FinnhubNewsItem[];

            return data.slice(0, 3).map((item) => ({
              ...item,
              ticker,
            }));
          }),
        );

        return res.json(
          allNews.flat().sort((left, right) => right.datetime - left.datetime),
        );
      } catch (error) {
        console.error('Holdings news fetch error:', error);
        return res.status(500).json({error: 'Failed to fetch company news'});
      }
    },
  );

  app.get(
    '/api/stock/metrics',
    async (
      req: Request<Record<string, never>, unknown, unknown, StockMetricsQuery>,
      res: Response,
    ) => {
      const {symbol} = req.query;
      const finnhubKey = process.env.FINNHUB_API_KEY;
      if (!finnhubKey || !symbol) {
        return res.status(400).json({error: 'Missing parameters'});
      }

      try {
        const url = new URL('https://finnhub.io/api/v1/stock/metric');
        url.searchParams.set('symbol', symbol);
        url.searchParams.set('metric', 'all');
        url.searchParams.set('token', finnhubKey);
        const response = await fetch(url);
        const data = (await response.json()) as FinnhubMetricResponse;
        return res.json(data.metric ?? {});
      } catch (error) {
        console.error('Stock metrics fetch error:', error);
        return res.status(500).json({error: 'Failed to fetch metrics'});
      }
    },
  );

  /**
   * Batch price lookup via Yahoo Finance (no API key required).
   * GET /api/stock/batch-prices?tickers=SPY,AAPL,MSFT
   */
  app.get(
    '/api/stock/batch-prices',
    async (
      req: Request<Record<string, never>, unknown, unknown, BatchPricesQuery>,
      res: Response,
    ) => {
      const {tickers} = req.query;
      if (!tickers || typeof tickers !== 'string' || tickers.length === 0) {
        return res.status(400).json({error: 'Missing tickers parameter'});
      }

      try {
        // Fetch individual prices using the chart endpoint (more reliable than v7/quote)
        const tickerList = tickers.split(',').map((t) => t.trim()).filter(Boolean);
        const prices: Record<string, number> = {};

        await Promise.all(
          tickerList.map(async (ticker) => {
            try {
              const resp = await fetch(
                `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=1d&interval=1d`,
                {headers: YAHOO_HEADERS},
              );
              if (!resp.ok) return;
              const data = (await resp.json()) as {
                chart?: {
                  result?: Array<{
                    meta?: {regularMarketPrice?: number};
                  }>;
                };
              };
              const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
              if (typeof price === 'number' && Number.isFinite(price)) {
                prices[ticker] = price;
              }
            } catch {
              // Individual ticker failure is non-fatal
            }
          }),
        );

        if (Object.keys(prices).length === 0) {
          return res.status(502).json({error: 'No prices could be fetched'});
        }

        return res.json({prices});
      } catch (error) {
        console.error('Batch prices error:', error);
        return res.status(500).json({error: 'Failed to fetch batch prices'});
      }
    },
  );

  /**
   * SPY historical price data for cumulative return calculation.
   * GET /api/stock/spy-history?range=1y
   * Range options: 1y (default), ytd, mtd
   */
  app.get(
    '/api/stock/spy-history',
    async (
      req: Request<Record<string, never>, unknown, unknown, SpyHistoryQuery>,
      res: Response,
    ) => {
      const rawRange = req.query.range;
      // Always fetch 1y to allow client-side filtering for ytd/mtd
      const yahooRange = '1y';
      const timeframe = rawRange === 'ytd' || rawRange === 'mtd' ? rawRange : '1y';

      try {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/SPY?range=${yahooRange}&interval=1d`,
          {headers: YAHOO_HEADERS},
        );
        if (!response.ok) {
          console.error(`Yahoo Finance chart API returned ${response.status}`);
          return res.status(502).json({error: 'Upstream chart API error'});
        }
        const data = (await response.json()) as {
          chart?: {
            result?: Array<{
              timestamp?: number[];
              indicators?: {
                quote?: Array<{
                  close?: (number | null)[];
                }>;
              };
            }>;
            error?: unknown;
          };
        };
        const result = data?.chart?.result?.[0];
        if (!result) {
          return res.status(500).json({
            error: 'No data from Yahoo Finance',
            raw: data?.chart?.error ?? null,
          });
        }

        const timestamps: number[] = (result.timestamp ?? []) as number[];
        const closes: (number | null)[] = result.indicators?.quote?.[0]?.close ?? [];

        // Zip and filter out null closes
        const paired: Array<{timestamp: number; close: number}> = [];
        for (let i = 0; i < timestamps.length; i++) {
          const c = closes[i];
          if (c !== null && c !== undefined && Number.isFinite(c)) {
            paired.push({timestamp: timestamps[i], close: c});
          }
        }

        if (paired.length === 0) {
          return res.status(500).json({error: 'No valid price data points'});
        }

        return res.json({data: paired, timeframe});
      } catch (error) {
        console.error('SPY history error:', error);
        return res.status(500).json({error: 'Failed to fetch SPY history'});
      }
    },
  );

  app.post(
    '/api/insights/:ticker/refresh',
    async (req: Request<SecurityTickerParams>, res: Response) => {
      const ticker = req.params.ticker?.toUpperCase();
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }
      try {
        const db = openResearchDb();
        // Clear caches to force fresh data fetches
        db.prepare(`DELETE FROM av_cache WHERE ticker = ?`).run(ticker);
        db.prepare(`DELETE FROM fmp_cache WHERE ticker = ?`).run(ticker);
        return res.json({success: true, message: `Cache cleared for ${ticker}`});
      } catch (error) {
        // Table might not exist yet, ignore
        console.warn('Cache clear error (may not exist):', error);
        return res.json({success: true});
      }
    }
  );

  app.get(
    '/api/insights/:ticker/dev-patch',
    async (req: Request<SecurityTickerParams>, res: Response) => {
      const ticker = req.params.ticker?.toUpperCase();
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }
      try {
        const yahooQuote = await fetchYahooQuote(ticker);
        
        let peTtmYahoo = yahooQuote?.summaryDetail?.trailingPE ?? null;
        if (peTtmYahoo === null && yahooQuote?.financialData?.currentPrice && yahooQuote?.defaultKeyStatistics?.trailingEps) {
          const currentPrice = yahooQuote.financialData.currentPrice;
          const trailingEps = yahooQuote.defaultKeyStatistics.trailingEps;
          if (trailingEps !== 0) {
            peTtmYahoo = currentPrice / trailingEps;
          }
        }
        
        const peNtmYahoo = yahooQuote?.summaryDetail?.forwardPE ?? null;
        const ps = yahooQuote?.summaryDetail?.priceToSalesTrailing12Months ?? null;
        const pb = yahooQuote?.defaultKeyStatistics?.priceToBook ?? null;
        const divYield = yahooQuote?.summaryDetail?.dividendYield ? yahooQuote.summaryDetail.dividendYield * 100 : null;
        const payoutRatio = yahooQuote?.summaryDetail?.payoutRatio ? yahooQuote.summaryDetail.payoutRatio * 100 : null;
        const exDivDate = yahooQuote?.summaryDetail?.exDividendDate ? new Date(yahooQuote.summaryDetail.exDividendDate).toLocaleDateString() : null;

        return res.json({
          peTtm: peTtmYahoo,
          peNtm: peNtmYahoo,
          ps,
          pb,
          divYield,
          payoutRatio,
          exDivDate
        });
      } catch (error) {
        console.error('dev-patch error:', error);
        return res.status(500).json({error: 'Failed to fetch dev patch'});
      }
    }
  );

  app.get(
    '/api/insights/sector-pe',
    async (_req: Request, res: Response) => {
      try {
        const db = openResearchDb();
        const rows = db.prepare(`SELECT sector_name, pe_ratio FROM sector_metrics`).all() as any[];
        db.close();
        
        const metrics: Record<string, number> = {};
        for (const row of rows) {
          metrics[row.sector_name] = row.pe_ratio;
        }
        return res.json(metrics);
      } catch (error) {
        console.error('Sector PE fetch error:', error);
        return res.json({});
      }
    }
  );

  app.get(
    '/api/insights/:ticker',
    async (
      req: Request<SecurityTickerParams>,
      res: Response,
    ) => {
      const ticker = req.params.ticker?.toUpperCase();
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }
      
      let db: ReturnType<typeof openResearchDb> | null = null;
      try {
        db = openResearchDb();
        const row = db.prepare(`
          SELECT s.ticker, s.name, s.exchange, s.sector, f.current_price, f.market_cap,
                 ss.compounder_score, ss.tactical_score, ss.actionability_state, ss.warnings
          FROM securities s
          LEFT JOIN fundamentals f ON s.ticker = f.ticker
          LEFT JOIN score_snapshots ss ON ss.id = (
            SELECT MAX(inner_ss.id) FROM score_snapshots inner_ss WHERE inner_ss.ticker = s.ticker
          )
          WHERE s.ticker = ?
        `).get(ticker) as any;
        
        if (!row) {
          return res.status(404).json({error: 'Unknown ticker'});
        }

        const modules: any[] = [];
        
        // Quote / Snapshot Module
        modules.push({
          kind: 'kpi',
          title: 'SNAPSHOT',
          items: [
            { label: 'PRICE', value: row.current_price ? '$' + row.current_price.toFixed(2) : '—' },
            { label: 'MKT CAP', value: row.market_cap ? '$' + (row.market_cap / 1e9).toFixed(1) + 'B' : '—' },
            { label: 'COMPOUNDER SCORE', value: row.compounder_score ? Math.round(row.compounder_score).toString() : '—' },
            { label: 'TACTICAL SCORE', value: row.tactical_score ? Math.round(row.tactical_score).toString() : '—' },
          ]
        });

        // Overview / Thesis Module
        let markdownThesis = `<p class="mb-3 text-sm text-white/90"><strong>Key Recent Developments for ${ticker}:</strong></p>
<p class="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
  <strong>Stellar Growth and Expansion:</strong> ${row.name || ticker} recently posted strong quarterly results, primarily driven by sustained demand in its core segments. The company unveiled next-generation product lines, promising significant performance and efficiency leaps, solidifying its competitive moat. Deepening strategic partnerships and ecosystem expansions continue to increase its total addressable market globally, while management has demonstrated improved operational execution and capital efficiency.
</p>`;

        modules.push({
          kind: 'narrative',
          title: 'THESIS',
          markdown: markdownThesis
        });

        // Risks Module
        const warnings = parseJsonStringArray(row.warnings);
        if (warnings && warnings.length > 0) {
          modules.push({
            kind: 'list',
            title: 'RISKS',
            items: warnings
          });
        }

        // Fetch News
        const finnhubKey = process.env.FINNHUB_API_KEY;
        if (finnhubKey) {
          try {
            const today = new Date().toISOString().split('T')[0];
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const url = new URL('https://finnhub.io/api/v1/company-news');
            url.searchParams.set('symbol', ticker);
            url.searchParams.set('from', weekAgo);
            url.searchParams.set('to', today);
            url.searchParams.set('token', finnhubKey);
            const response = await fetch(url);
            const newsData = (await response.json()) as FinnhubNewsItem[];
            if (newsData && Array.isArray(newsData) && newsData.length > 0) {
              modules.push({
                kind: 'list',
                title: 'EVENTS',
                items: newsData.slice(0, 5).map((item: any) => '[' + item.source + '] ' + item.headline)
              });
            }
          } catch (e) {
            console.error('Failed to fetch news for insights:', e);
          }
        }
        
        const aggregatedData = await aggregateInsightsData(ticker);

        let generatedAtStr = new Date().toISOString();
        if (db) {
          try {
            const cacheRow = db.prepare(`SELECT MIN(timestamp) as ts FROM fmp_cache WHERE ticker = ?`).get(ticker) as {ts: string} | undefined;
            if (cacheRow?.ts) {
              generatedAtStr = new Date(cacheRow.ts.replace(' ', 'T') + 'Z').toISOString();
            }
          } catch (e) {
            console.error('Failed to get cache timestamp:', e);
          }
        }

        // Persist normalization events to SQLite for dashboard queries
        if (aggregatedData?.valuation?.normalizationEvents?.length) {
          try {
            const evtDb = openResearchDb();
            evtDb.exec(`
              CREATE TABLE IF NOT EXISTS data_normalization_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticker TEXT NOT NULL,
                metric TEXT NOT NULL,
                sources_json TEXT NOT NULL,
                median_value REAL NOT NULL,
                outlier_source TEXT NOT NULL,
                deviation_pct REAL NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
              )
            `);
            const insertEvt = evtDb.prepare(`
              INSERT INTO data_normalization_events (ticker, metric, sources_json, median_value, outlier_source, deviation_pct, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            for (const evt of aggregatedData.valuation.normalizationEvents as DataNormalizationEvent[]) {
              insertEvt.run(
                evt.ticker,
                evt.metric,
                JSON.stringify(evt.sources),
                evt.median,
                evt.outlierSource,
                evt.deviation,
                evt.timestamp
              );
            }
            evtDb.close();
          } catch (evtErr) {
            console.error('Failed to persist normalization events:', evtErr);
          }
        }

        return res.json({
          ticker: row.ticker,
          name: row.name,
          exchange: row.exchange,
          sector: row.sector,
          generatedAt: generatedAtStr,
          modules,
          aggregatedData
        });
      } catch (error) {
        console.error('Ticker insights error:', error);
        return res.status(500).json({error: 'Failed to fetch insights'});
      } finally {
        if (db) db.close();
      }
    }
  );

  // ─── Normalization Event Log ─────────────────────────────────────────────
  app.get(
    '/api/insights/:ticker/normalization-log',
    async (req: Request<SecurityTickerParams>, res: Response) => {
      const ticker = req.params.ticker?.toUpperCase();
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }
      try {
        const logDb = openResearchDb();
        // Ensure table exists (idempotent)
        logDb.exec(`
          CREATE TABLE IF NOT EXISTS data_normalization_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticker TEXT NOT NULL,
            metric TEXT NOT NULL,
            sources_json TEXT NOT NULL,
            median_value REAL NOT NULL,
            outlier_source TEXT NOT NULL,
            deviation_pct REAL NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
          )
        `);
        const rows = logDb.prepare(`
          SELECT id, ticker, metric, sources_json, median_value, outlier_source, deviation_pct, created_at
          FROM data_normalization_events
          WHERE ticker = ?
          ORDER BY created_at DESC
          LIMIT 50
        `).all(ticker) as any[];
        logDb.close();

        return res.json({
          ticker,
          events: rows.map((r: any) => ({
            id: r.id,
            metric: r.metric,
            sources: JSON.parse(r.sources_json),
            medianValue: r.median_value,
            outlierSource: r.outlier_source,
            deviationPct: r.deviation_pct,
            createdAt: r.created_at,
          })),
        });
      } catch (error) {
        console.error('Normalization log error:', error);
        return res.status(500).json({error: 'Failed to fetch normalization log'});
      }
    }
  );

  app.get(
    '/api/insights/:ticker/insider-trades',
    async (req: Request<SecurityTickerParams>, res: Response) => {
      const ticker = req.params.ticker?.toUpperCase();
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }
      try {
        const yf = new YahooFinance();
        const result = await yf.quoteSummary(ticker, { modules: ['insiderTransactions'] });
        const transactions = result.insiderTransactions?.transactions || [];
        
        const rows = transactions.slice(0, 10).map((t, i) => ({
          key: String(i),
          values: {
            date: t.startDate ? new Date(t.startDate).toISOString().split('T')[0] : 'Unknown',
            name: t.filerName || 'Unknown',
            type: t.transactionText ? (t.transactionText.toLowerCase().includes('sale') ? 'Sell' : 'Buy') : 'Unknown',
            shares: t.shares ? t.shares.toLocaleString() : '—',
            value: t.value ? '$' + t.value.toLocaleString() : '—'
          }
        }));

        const module = {
          kind: 'table',
          title: 'INSIDER TRADES',
          columns: [
            {key: 'date', label: 'Date'},
            {key: 'name', label: 'Insider'},
            {key: 'type', label: 'Type'},
            {key: 'shares', label: 'Shares'},
            {key: 'value', label: 'Value'}
          ],
          rows
        };
        return res.json(module);
      } catch (e) {
        console.error('Insider trades error:', e);
        return res.status(500).json({error: 'Failed to fetch insider trades'});
      }
    }
  );

  app.get(
    '/api/insights/:ticker/analyst-estimates',
    async (req: Request<SecurityTickerParams>, res: Response) => {
      const ticker = req.params.ticker?.toUpperCase();
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }
      try {
        const estimates = await aggregateAnalystEstimates(ticker);
        let rows: any[] = [];
        if (estimates && estimates.length > 0) {
          rows = estimates.slice(0, 4).map((t, i) => {
            const revAvg = t.estimatedRevenueAvg;
            const revStr = revAvg ? (revAvg >= 1e9 ? '$' + (revAvg / 1e9).toFixed(1) + 'B' : '$' + (revAvg / 1e6).toFixed(1) + 'M') : '—';
            return {
              key: String(i),
              values: {
                period: t.date || 'Unknown',
                eps: t.estimatedEpsAvg ? '$' + t.estimatedEpsAvg.toFixed(2) : '—',
                revenue: revStr
              }
            };
          });
        } else {
          const yf = new YahooFinance();
          const result = await yf.quoteSummary(ticker, { modules: ['earningsTrend'] });
          const trend = result.earningsTrend?.trend || [];
          
          rows = trend.slice(0, 4).map((t, i) => {
            const revAvg = t.revenueEstimate?.avg;
            const revStr = revAvg ? (revAvg >= 1e9 ? '$' + (revAvg / 1e9).toFixed(1) + 'B' : '$' + (revAvg / 1e6).toFixed(1) + 'M') : '—';
            return {
              key: String(i),
              values: {
                period: t.period || 'Unknown',
                eps: t.earningsEstimate?.avg ? '$' + t.earningsEstimate.avg.toFixed(2) : '—',
                revenue: revStr
              }
            };
          });
        }

        const module = {
          kind: 'table',
          title: 'ANALYST ESTIMATES',
          columns: [
            {key: 'period', label: 'Period'},
            {key: 'eps', label: 'Consensus EPS'},
            {key: 'revenue', label: 'Consensus Rev'}
          ],
          rows
        };
        return res.json(module);
      } catch (e) {
        console.error('Analyst estimates error:', e);
        return res.status(500).json({error: 'Failed to fetch analyst estimates'});
      }
    }
  );

  app.get(
    '/api/insights/:ticker/charts',
    async (req: Request<SecurityTickerParams>, res: Response) => {
      const ticker = req.params.ticker?.toUpperCase();
      const timeframe = (req.query.timeframe as string) || 'Annually';
      
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }
      try {
        const yf = new YahooFinance();
        const interval = timeframe === 'Quarterly' ? '3mo' : (timeframe === 'TTM' ? '1mo' : '1mo');
        
        const now = new Date();
        if (timeframe === 'Quarterly') now.setFullYear(now.getFullYear() - 2);
        else if (timeframe === 'TTM') now.setFullYear(now.getFullYear() - 1);
        else now.setFullYear(now.getFullYear() - 5);
        const period1 = now.toISOString().split('T')[0];
        
        const chartRes = await yf.chart(ticker, { period1, interval });
        const quotes = chartRes.quotes || [];
        
        const points = quotes.map((q) => {
          const d = new Date(q.date);
          const x = timeframe === 'Annually' ? d.getFullYear().toString() : `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}`;
          return {
            x,
            y: q.close || null
          };
        });

        const module = {
          kind: 'chart',
          title: 'HISTORICAL FINANCIALS',
          series: [
            {
              key: 'price',
              label: 'Price History',
              points
            }
          ]
        };
        return res.json(module);
      } catch (e) {
        console.error('Charts error:', e);
        return res.status(500).json({error: 'Failed to fetch charts'});
      }
    }
  );

}

const YAHOO_HEADERS: HeadersInit = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
};

const IBKR_PORTFOLIO_PATH = path.resolve(
  process.cwd(),
  'data/ibkr-portfolio.json',
);

async function loadIbkrPortfolioSnapshot(): Promise<IBKRPortfolioSnapshot | null> {
  try {
    const raw = await readFile(IBKR_PORTFOLIO_PATH, 'utf8');
    return JSON.parse(raw) as IBKRPortfolioSnapshot;
  } catch (error: unknown) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error
        ? String((error as {code: string}).code)
        : '';

    if (code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

export async function createApp(): Promise<Express> {
  const app = express();
  app.use(express.json());

  registerApiRoutes(app);

  if (!isProd) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
    return app;
  }

  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  return app;
}
