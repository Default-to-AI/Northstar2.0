import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { fetchCnnFearGreedSnapshot } from "./src/lib/fearGreedService";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/committee/session", async (req, res) => {
    const { ticker } = req.body;
    if (!ticker) return res.status(400).json({ error: "Ticker is required" });

    try {
      // Act 1: Initial Verdicts
      const act1Params = {
        model: "gemini-3-flash-preview",
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
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              act1: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    persona: { type: Type.STRING },
                    read: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    concern: { type: Type.STRING }
                  },
                  required: ["persona", "read", "score", "concern"]
                }
              }
            }
          }
        },
        contents: `Analyze ${ticker}.`
      };

      const act1Response = await ai.models.generateContent(act1Params);
      const act1Data = JSON.parse(act1Response.text);

      // Act 2: Debate
      const act2Params = {
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are running ACT 2: DEBATE for ${ticker}.
          Based on the initial Act 1 scores and concerns, simulate a 3-turn adversarial exchange between personas.
          Personas can challenge each other's assumptions.
          
          Respond in JSON.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              debate: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    from: { type: Type.STRING },
                    to: { type: Type.STRING },
                    message: { type: Type.STRING }
                  },
                  required: ["from", "to", "message"]
                }
              }
            }
          }
        },
        contents: `Act 1 Results: ${JSON.stringify(act1Data)}`
      };

      const act2Response = await ai.models.generateContent(act2Params);
      const act2Data = JSON.parse(act2Response.text);

      // Act 3: Final Verdict & Risk Officer
      const act3Params = {
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are running ACT 3: FINAL VERDICT & RISK GATE for ${ticker}.
          Synthesize the debate. Provide final scores for each persona (M, H, C, Mi, Ca).
          Also, as the Risk Officer, provide deterministic constraints (entry, stop, target).
          The Committee Recommendation should be a summary of the outcome.
          
          Respond in JSON.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              finalScores: {
                type: Type.OBJECT,
                properties: {
                  M: { type: Type.NUMBER },
                  H: { type: Type.NUMBER },
                  C: { type: Type.NUMBER },
                  Mi: { type: Type.NUMBER },
                  Ca: { type: Type.NUMBER }
                }
              },
              recommendation: { type: Type.STRING },
              verdict: { type: Type.STRING, enum: ["BUY", "ADD", "HOLD", "TRIM", "SELL", "WATCH"] },
              riskPlaybook: {
                type: Type.OBJECT,
                properties: {
                  entry: { type: Type.STRING },
                  stop: { type: Type.STRING },
                  target: { type: Type.STRING }
                }
              },
              summary: { type: Type.STRING }
            }
          }
        },
        contents: `Debate Log: ${JSON.stringify(act2Data)}`
      };

      const act3Response = await ai.models.generateContent(act3Params);
      const act3Data = JSON.parse(act3Response.text);

      // Deterministic Scoring Engine
      // Weights: Fundamentals (35%), Macro (25%), Technical (20%), Sentiment/Social (20%)
      const { M, H, C, Mi, Ca } = act3Data.finalScores;
      const fundamentalScore = (M + H) / 2;
      const macroScore = Ca;
      const technicalScore = (C + Mi) / 2;
      const sentimentScore = M; // Mahaney often represents the "growth story/sentiment"
      
      const weightedConviction = (fundamentalScore * 0.35) + (macroScore * 0.25) + (technicalScore * 0.20) + (sentimentScore * 0.20);
      act3Data.convictionScore = Number(weightedConviction.toFixed(1));

      res.json({
        act1: act1Data.act1,
        debate: act2Data.debate,
        final: act3Data
      });

    } catch (error) {
      console.error("Committee error:", error);
      res.status(500).json({ error: "Failed to run committee session" });
    }
  });

  app.get("/api/market/fear-greed", async (_req, res) => {
    try {
      const snapshot = await fetchCnnFearGreedSnapshot();
      res.json(snapshot);
    } catch (error) {
      console.error("Fear & Greed fetch error:", error);
      res.status(500).json({ error: "Failed to fetch Fear & Greed index" });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.get("/api/news/market", async (req, res) => {
    const finnhubKey = process.env.VITE_FINNHUB_KEY;
    if (!finnhubKey) return res.status(500).json({ error: "Finnhub key missing" });
    
    try {
      const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${finnhubKey}`);
      const data = await response.json();
      res.json(data.slice(0, 10)); // Limit to 10
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/holdings", async (req, res) => {
    const { symbols } = req.query;
    const finnhubKey = process.env.VITE_FINNHUB_KEY;
    if (!finnhubKey || !symbols) return res.status(400).json({ error: "Missing parameters" });
    
    try {
      const tickers = (symbols as string).split(',');
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const allNews = await Promise.all(tickers.slice(0, 5).map(async (t) => {
        const r = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${t}&from=${weekAgo}&to=${today}&token=${finnhubKey}`);
        const d = await r.json();
        return d.slice(0, 3).map((item: any) => ({ ...item, ticker: t }));
      }));
      
      res.json(allNews.flat().sort((a,b) => b.datetime - a.datetime));
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch company news" });
    }
  });

  app.get("/api/stock/metrics", async (req, res) => {
    const { symbol } = req.query;
    const finnhubKey = process.env.VITE_FINNHUB_KEY;
    if (!finnhubKey || !symbol) return res.status(400).json({ error: "Missing parameters" });
    
    try {
      const response = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${finnhubKey}`);
      const data = await response.json();
      res.json(data.metric);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
