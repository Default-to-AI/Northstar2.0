import express, {
  type Express,
  type Request,
  type Response,
} from 'express';
import {GoogleGenAI, Type} from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

import {fetchCnnFearGreedSnapshot} from '../lib/fearGreedService.ts';

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

  app.get('/api/news/market', async (_req: Request, res: Response) => {
    const finnhubKey = process.env.VITE_FINNHUB_KEY;
    if (!finnhubKey) {
      return res.status(500).json({error: 'Finnhub key missing'});
    }

    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${finnhubKey}`,
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
              `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${weekAgo}&to=${today}&token=${finnhubKey}`,
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
          `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${finnhubKey}`,
        );
        const data = (await response.json()) as FinnhubMetricResponse;
        return res.json(data.metric ?? {});
      } catch (error) {
        console.error('Stock metrics fetch error:', error);
        return res.status(500).json({error: 'Failed to fetch metrics'});
      }
    },
  );
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
