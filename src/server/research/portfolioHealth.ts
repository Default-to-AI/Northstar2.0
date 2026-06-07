import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';

type PortfolioHealthRow = {
  ticker: string;
  check_type: string;
  triggered: number;
  current_value: number | null;
  threshold_value: number | null;
  rationale_json: string;
  created_at: string;
};

export function registerPortfolioHealthRoutes(
  app: Express,
  openDb: () => Database.Database,
): void {
  app.get('/api/research/portfolio-health', (req: Request, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();
      const rows = db
        .prepare(
          `SELECT ticker, check_type, triggered, current_value, threshold_value, rationale_json, created_at
           FROM portfolio_health_checks
           WHERE date = date('now')
           ORDER BY triggered DESC, check_type ASC, ticker ASC`,
        )
        .all() as PortfolioHealthRow[];

      return res.json({
        generatedAt: new Date().toISOString(),
        checks: rows.map((row) => ({
          ticker: row.ticker,
          checkType: row.check_type,
          triggered: row.triggered === 1,
          currentValue: row.current_value,
          thresholdValue: row.threshold_value,
          rationale: safeParseJson(row.rationale_json),
          createdAt: row.created_at,
        })),
      });
    } catch (error) {
      if (isDbNotFound(error)) {
        return res.json({generatedAt: new Date().toISOString(), checks: []});
      }
      console.error('GET /portfolio-health error:', error);
      return res.status(500).json({error: 'Failed to fetch portfolio health'});
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
