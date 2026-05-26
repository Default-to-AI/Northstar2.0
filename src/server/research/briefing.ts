import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';
import {exec} from 'node:child_process';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BriefingRow = {
  date: string;
  pipeline_readiness_json: string | null;
  pre_market_context_json: string | null;
  top_opportunities_json: string | null;
  portfolio_snapshot_json: string | null;
  status: string;
  source: string;
  generated_at: string;
};

type EventsRow = {
  id: number;
  event_type: string;
  ticker: string | null;
  event_date: string;
  title: string;
  description: string | null;
  source: string;
  relevant_holdings: string;
  created_at: string;
};

// ---------------------------------------------------------------------------
// Route registration
// ---------------------------------------------------------------------------

export function registerBriefingRoutes(
  app: Express,
  openDb: () => Database.Database,
): void {
  /**
   * GET /api/research/briefing — return the stored briefing for today.
   * Returns `{ status: 'fresh', ...sections }` or `{ status: 'not_generated' }`.
   */
  app.get('/api/research/briefing', (req: Request, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();
      const row = db
        .prepare(
          `SELECT date, pipeline_readiness_json, pre_market_context_json,
                  top_opportunities_json, portfolio_snapshot_json,
                  status, source, generated_at
           FROM morning_briefs
           WHERE date = date('now')
           LIMIT 1`,
        )
        .get() as BriefingRow | undefined;

      if (!row) {
        const today = new Date().toISOString().slice(0, 10);
        return res.json({status: 'not_generated', date: today});
      }

      return res.json({
        status: 'fresh',
        date: row.date,
        generatedAt: row.generated_at,
        source: row.source,
        pipelineReadiness: safeParseJson(row.pipeline_readiness_json),
        preMarketContext: safeParseJson(row.pre_market_context_json),
        topOpportunities: safeParseJson(row.top_opportunities_json),
        portfolioSnapshot: safeParseJson(row.portfolio_snapshot_json),
      });
    } catch (error: unknown) {
      if (isDbNotFound(error)) {
        return res.json({
          status: 'not_generated',
          error: 'Research DB not initialized. Run the pipeline first.',
        });
      }
      console.error('GET /briefing error:', error);
      return res.status(500).json({error: 'Failed to fetch briefing'});
    } finally {
      db?.close();
    }
  });

  /**
   * POST /api/research/briefing/refresh — run the briefing collector inline.
   * Returns fresh briefing JSON on success, 502 on timeout/error.
   */
  app.post('/api/research/briefing/refresh', (req: Request, res: Response) => {
    const TIMEOUT_MS = 120_000;

    // Verify DB exists before spawning the subprocess
    let db: Database.Database | null = null;
    try {
      db = openDb();
    } catch (error: unknown) {
      if (isDbNotFound(error)) {
        return res.json({
          status: 'not_generated',
          error: 'Research DB not initialized. Run the pipeline first.',
        });
      }
      return res.status(500).json({error: 'Failed to open research DB'});
    } finally {
      db?.close();
    }

    const cwd = resolveProjectRoot();

    exec(
      'python3 -m scripts.research_engine.briefing',
      {cwd, timeout: TIMEOUT_MS},
      async (err, stdout, stderr) => {
        if (err) {
          const message = err.killed && err.code === undefined
            ? 'Briefing generation timed out. Try again or run: python3 -m scripts.research_engine.briefing'
            : (stderr || err.message).trim();
          return res.status(502).json({
            status: 'error',
            error: message,
            fallbackCommand: 'python3 -m scripts.research_engine.briefing',
          });
        }

        // Re-query the briefing table and return fresh data
        let db2: Database.Database | null = null;
        try {
          db2 = openDb();
          const row = db2
            .prepare(
              `SELECT date, pipeline_readiness_json, pre_market_context_json,
                      top_opportunities_json, portfolio_snapshot_json,
                      status, source, generated_at
               FROM morning_briefs
               WHERE date = date('now')
               LIMIT 1`,
            )
            .get() as BriefingRow | undefined;

          if (!row) {
            return res.status(502).json({
              status: 'error',
              error: 'Briefing script completed but no row was written.',
            });
          }

          return res.json({
            status: 'fresh',
            date: row.date,
            generatedAt: row.generated_at,
            source: row.source,
            pipelineReadiness: safeParseJson(row.pipeline_readiness_json),
            preMarketContext: safeParseJson(row.pre_market_context_json),
            topOpportunities: safeParseJson(row.top_opportunities_json),
            portfolioSnapshot: safeParseJson(row.portfolio_snapshot_json),
          });
        } catch (queryError: unknown) {
          console.error('POST /briefing/refresh query error:', queryError);
          return res.status(500).json({error: 'Failed to re-query briefing after generation'});
        } finally {
          db2?.close();
        }
      },
    );
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function resolveProjectRoot(): string {
  // The server is always started from the project root
  return process.cwd();
}