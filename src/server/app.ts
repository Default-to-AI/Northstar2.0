import express, {
  type Express,
  type Request,
  type Response,
} from 'express';
import {GoogleGenAI, Type} from '@google/genai';
import dotenv from 'dotenv';
import {readFile} from 'node:fs/promises';
import path from 'path';

import {fetchCnnFearGreedSnapshot} from '../lib/fearGreedService.ts';
import {buildIbkrPortfolioAnalytics} from './ibkrAnalytics.ts';
import type {IBKRPortfolioSnapshot} from '../types/ibkr';
import {openResearchDb} from './research/db.ts';
import {registerCommitteeRoutes} from './research/committee.ts';
import {registerArchiveRoutes} from './research/archive.ts';
import {registerAlertRoutes} from './research/alerts.ts';
import {freezeEvidencePacket, getFrozenEvidencePacket} from './research/evidence.ts';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

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
