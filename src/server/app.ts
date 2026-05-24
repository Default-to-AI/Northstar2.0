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
import Database from 'better-sqlite3';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

type CommitteeSessionRequest = {
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
};

type FinnhubNewsItem = {
  datetime: number;
  [key: string]: unknown;
};

type FinnhubMetricResponse = {
  metric?: Record<string, unknown>;
};

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
      const {ticker} = req.body;
      if (!ticker) {
        return res.status(400).json({error: 'Ticker is required'});
      }

      try {
        const act1Params = {
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are the chairman of an investment committee. You steer a panel of 5 specialists.
          Personas:
          - Mahaney (Technologist): Focus on growth, TAM, category leadership.
          - Hohn (Activist): Focus on value, governance, normalized earnings.
          - Cohen (Trader): Focus on risk/reward, catalysts, timing.
          - Stokes (Trend Follower): Focus on price momentum, 150MA.
          - Carlson (Compounder): Focus on FCF, moats, dividend growth.
          
          TASK: Run ACT 1 of a committee session for ${ticker}. 
          Each persona MUST provide:
          1. Their lens-specific read.
          2. A score 1-10.
          3. Their biggest concern.
          
          Respond in JSON.`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                act1: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      persona: {type: Type.STRING},
                      read: {type: Type.STRING},
                      score: {type: Type.NUMBER},
                      concern: {type: Type.STRING},
                    },
                    required: ['persona', 'read', 'score', 'concern'],
                  },
                },
              },
            },
          },
          contents: `Analyze ${ticker}.`,
        };

        const act1Response = await ai.models.generateContent(act1Params);
        const act1Data = JSON.parse(act1Response.text) as {
          act1: Array<{
            persona: string;
            read: string;
            score: number;
            concern: string;
          }>;
        };

        const act2Params = {
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are running ACT 2: DEBATE for ${ticker}.
          Based on the initial Act 1 scores and concerns, simulate a 3-turn adversarial exchange between personas.
          Personas can challenge each other's assumptions.
          
          Respond in JSON.`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                debate: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      from: {type: Type.STRING},
                      to: {type: Type.STRING},
                      message: {type: Type.STRING},
                    },
                    required: ['from', 'to', 'message'],
                  },
                },
              },
            },
          },
          contents: `Act 1 Results: ${JSON.stringify(act1Data)}`,
        };

        const act2Response = await ai.models.generateContent(act2Params);
        const act2Data = JSON.parse(act2Response.text) as {
          debate: Array<{
            from: string;
            to: string;
            message: string;
          }>;
        };

        const act3Params = {
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are running ACT 3: FINAL VERDICT & RISK GATE for ${ticker}.
          Synthesize the debate. Provide final scores for each persona (M, H, C, Mi, Ca).
          Also, as the Risk Officer, provide deterministic constraints (entry, stop, target).
          The Committee Recommendation should be a summary of the outcome.
          
          Respond in JSON.`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                finalScores: {
                  type: Type.OBJECT,
                  properties: {
                    M: {type: Type.NUMBER},
                    H: {type: Type.NUMBER},
                    C: {type: Type.NUMBER},
                    Mi: {type: Type.NUMBER},
                    Ca: {type: Type.NUMBER},
                  },
                },
                recommendation: {type: Type.STRING},
                verdict: {
                  type: Type.STRING,
                  enum: ['BUY', 'ADD', 'HOLD', 'TRIM', 'SELL', 'WATCH'],
                },
                riskPlaybook: {
                  type: Type.OBJECT,
                  properties: {
                    entry: {type: Type.STRING},
                    stop: {type: Type.STRING},
                    target: {type: Type.STRING},
                  },
                },
                summary: {type: Type.STRING},
              },
            },
          },
          contents: `Debate Log: ${JSON.stringify(act2Data)}`,
        };

        const act3Response = await ai.models.generateContent(act3Params);
        const act3Data = JSON.parse(act3Response.text) as {
          finalScores: {
            M: number;
            H: number;
            C: number;
            Mi: number;
            Ca: number;
          };
          recommendation: string;
          verdict: 'BUY' | 'ADD' | 'HOLD' | 'TRIM' | 'SELL' | 'WATCH';
          riskPlaybook: {
            entry: string;
            stop: string;
            target: string;
          };
          summary: string;
          convictionScore?: number;
        };

        const {M, H, C, Mi, Ca} = act3Data.finalScores;
        const fundamentalScore = (M + H) / 2;
        const macroScore = Ca;
        const technicalScore = (C + Mi) / 2;
        const sentimentScore = M;

        const weightedConviction =
          fundamentalScore * 0.35 +
          macroScore * 0.25 +
          technicalScore * 0.2 +
          sentimentScore * 0.2;

        act3Data.convictionScore = Number(weightedConviction.toFixed(1));

        return res.json({
          act1: act1Data.act1,
          debate: act2Data.debate,
          final: act3Data,
        });
      } catch (error) {
        console.error('Committee error:', error);
        return res.status(500).json({error: 'Failed to run committee session'});
      }
    },
  );

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
      const db = new Database(DB_PATH, { fileMustExist: false });
      
      // Check if table exists
      const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='runs'").get();
      if (!tableCheck) {
        db.close();
        return res.json({ status: 'warning', message: 'Pipeline not initialized', sources: [] });
      }

      const stmt = db.prepare(`
        SELECT pipeline_name, started_at, completed_at, status, error_message
        FROM runs
        ORDER BY completed_at DESC
        LIMIT 1
      `);
      const row = stmt.get() as any;
      db.close();

      if (!row) {
        return res.json({ status: 'warning', message: 'No pipeline runs found', sources: [] });
      }

      const completedAt = new Date(row.completed_at);
      const now = new Date();
      const diffHours = (now.getTime() - completedAt.getTime()) / (1000 * 60 * 60);

      let status = 'fresh';
      if (row.status !== 'success') {
        status = 'error';
      } else if (diffHours > 24) {
        status = 'stale';
      }

      return res.json({
        status,
        sources: [
          {
            name: row.pipeline_name,
            status,
            timestamp: row.completed_at,
            error_message: row.error_message,
          }
        ]
      });
    } catch (error) {
      console.error('Readiness error:', error);
      return res.status(500).json({ error: 'Failed to fetch readiness' });
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
        const db = new Database(DB_PATH, {fileMustExist: false});

        const tableCheck = db
          .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='ticker_evidence'")
          .get();
        if (!tableCheck) {
          db.close();
          return res.status(404).json({error: 'Evidence table not initialized'});
        }

        const row = db
          .prepare(
            `
              SELECT ticker, market_cap, trailing_pe, forward_pe, price_to_book,
                     profit_margins, revenue_growth, fifty_day_ma, two_hundred_day_ma,
                     fifty_two_week_high, fifty_two_week_low, current_price, last_updated
              FROM ticker_evidence
              WHERE ticker = ?
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
          },
          fundamentals: {
            profitMargins: row.profit_margins,
            revenueGrowth: row.revenue_growth,
          },
          technicals: {
            fiftyDayMA: row.fifty_day_ma,
            twoHundredDayMA: row.two_hundred_day_ma,
            fiftyTwoWeekHigh: row.fifty_two_week_high,
            fiftyTwoWeekLow: row.fifty_two_week_low,
            currentPrice: row.current_price,
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
    const finnhubKey = process.env.VITE_FINNHUB_KEY;
    if (!finnhubKey) {
      return res.status(500).json({error: 'Finnhub key missing'});
    }

    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${encodeURIComponent(finnhubKey)}`,
      );
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
      const finnhubKey = process.env.VITE_FINNHUB_KEY;
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
            const response = await fetch(
              `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(ticker)}&from=${weekAgo}&to=${today}&token=${encodeURIComponent(finnhubKey)}`,
            );
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
      const finnhubKey = process.env.VITE_FINNHUB_KEY;
      if (!finnhubKey || !symbol) {
        return res.status(400).json({error: 'Missing parameters'});
      }

      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${encodeURIComponent(symbol)}&metric=all&token=${encodeURIComponent(finnhubKey)}`,
        );
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

const DB_PATH = path.resolve(
  process.cwd(),
  'data/northstar.db',
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
