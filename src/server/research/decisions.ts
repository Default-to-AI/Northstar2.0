import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';

type DecisionBriefRow = {
  ticker: string;
  decision_type: string;
  primary_persona: string;
  compounder_score: number | null;
  tactical_score: number | null;
  threshold_met: number;
  rationale_json: string;
  evidence_json: string;
  created_at: string;
};

export function registerDecisionRoutes(
  app: Express,
  openDb: () => Database.Database,
): void {
  app.get('/api/research/decisions', (req: Request, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();
      const rows = db
        .prepare(
          `SELECT ticker, decision_type, primary_persona, compounder_score, tactical_score,
                  threshold_met, rationale_json, evidence_json, created_at
           FROM decision_briefs
           WHERE date = date('now')
           ORDER BY CASE decision_type
             WHEN 'long_candidate' THEN 1
             WHEN 'watch' THEN 2
             WHEN 'trim' THEN 3
             WHEN 'stop_review' THEN 4
             WHEN 'restructure' THEN 5
             ELSE 6
           END, compounder_score DESC, ticker ASC`,
        )
        .all() as DecisionBriefRow[];

      return res.json({
        generatedAt: new Date().toISOString(),
        decisions: rows.map((row) => ({
          ticker: row.ticker,
          decisionType: row.decision_type,
          primaryPersona: row.primary_persona,
          compounderScore: row.compounder_score,
          tacticalScore: row.tactical_score,
          thresholdMet: row.threshold_met === 1,
          rationale: safeParseJson(row.rationale_json),
          evidence: safeParseJson(row.evidence_json),
          createdAt: row.created_at,
        })),
      });
    } catch (error) {
      if (isDbNotFound(error)) {
        return res.json({generatedAt: new Date().toISOString(), decisions: []});
      }
      console.error('GET /decisions error:', error);
      return res.status(500).json({error: 'Failed to fetch decisions'});
    } finally {
      db?.close();
    }
  });
}

function safeParseJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function isDbNotFound(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes('Northstar research DB not found')
  );
}
