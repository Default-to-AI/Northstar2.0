import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MarketEventRow = {
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

type GroupedEvent = {
  date: string;
  items: Array<{
    type: string;
    ticker: string | null;
    title: string;
    description: string | null;
    isHolding: boolean;
  }>;
};

// ---------------------------------------------------------------------------
// Route registration
// ---------------------------------------------------------------------------

export function registerEventsRoutes(
  app: Express,
  openDb: () => Database.Database,
): void {
  /**
   * GET /api/research/events — return upcoming events grouped by date.
   *
   * Returns:
   * ```json
   * { "generatedAt": "...", "events": [{ "date": "2026-05-26", "items": [...] }] }
   * ```
   */
  app.get('/api/research/events', (req: Request, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();
      const rows = db
        .prepare(
          `SELECT id, event_type, ticker, event_date, title, description,
                  source, relevant_holdings, created_at
           FROM market_events
           WHERE event_date >= date('now')
           ORDER BY event_date ASC, event_type ASC
           LIMIT 100`,
        )
        .all() as MarketEventRow[];

      // Group by date
      const grouped = new Map<string, GroupedEvent>();

      for (const row of rows) {
        const holdings: string[] = safeParseStringArray(row.relevant_holdings);
        const isHolding = holdings.length > 0;

        if (!grouped.has(row.event_date)) {
          grouped.set(row.event_date, {
            date: row.event_date,
            items: [],
          });
        }

        grouped.get(row.event_date)!.items.push({
          type: row.event_type,
          ticker: row.ticker,
          title: row.title,
          description: row.description,
          isHolding,
        });
      }

      return res.json({
        generatedAt: new Date().toISOString(),
        events: Array.from(grouped.values()),
      });
    } catch (error) {
      if (isDbNotFound(error)) {
        return res.json({
          generatedAt: new Date().toISOString(),
          events: [],
        });
      }
      console.error('GET /events error:', error);
      return res.status(500).json({error: 'Failed to fetch events'});
    } finally {
      db?.close();
    }
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeParseStringArray(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function isDbNotFound(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes('Northstar research DB not found')
  );
}