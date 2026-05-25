import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';

type OutcomeRow = {
  id: number;
  source_type: string;
  source_id: number;
  horizon_days: number;
  ticker: string;
  decision_date: string;
  decision_price: number | null;
  spy_price: number | null;
  sector_benchmark: string | null;
  sector_return: number | null;
  forward_price: number | null;
  forward_return: number | null;
  benchmark_return: number | null;
  status: string;
  score_snapshot_id: number | null;
  evidence_packet_id: string | null;
  committee_session_id: string | null;
  score_model_id: string | null;
  source_freshness: string | null;
  notes: string | null;
  created_at: string;
  computed_at: string | null;
};

export function registerOutcomeRoutes(app: Express, openDb: () => Database.Database): void {
  app.get('/api/research/outcomes', (req: Request, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();

      const limit = Math.min(Math.max(Number(req.query.limit) || 200, 1), 1000);
      const sourceType = req.query.sourceType as string | undefined;
      const status = req.query.status as string | undefined;
      const ticker = (req.query.ticker as string | undefined)?.toUpperCase();

      const conditions: string[] = [];
      const params: Array<string | number> = [];

      if (sourceType) {
        conditions.push('source_type = ?');
        params.push(sourceType);
      }
      if (status) {
        conditions.push('status = ?');
        params.push(status);
      }
      if (ticker) {
        conditions.push('ticker = ?');
        params.push(ticker);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      const rows = db.prepare(`
        SELECT id, source_type, source_id, horizon_days, ticker, decision_date,
               decision_price, spy_price, sector_benchmark, sector_return,
               forward_price, forward_return, benchmark_return, status,
               score_snapshot_id, evidence_packet_id, committee_session_id,
               score_model_id, source_freshness, notes, created_at, computed_at
        FROM decision_outcomes
        ${whereClause}
        ORDER BY created_at DESC, id DESC
        LIMIT ?
      `).all(...params, limit) as OutcomeRow[];

      // Determine dataAsOf from the most recent computed_at among results
      let dataAsOf: string | null = null;
      for (const row of rows) {
        if (row.computed_at && (!dataAsOf || row.computed_at > dataAsOf)) {
          dataAsOf = row.computed_at;
        }
      }

      return res.json({
        generatedAt: new Date().toISOString(),
        dataAsOf,
        outcomes: rows.map((row) => ({
          id: row.id,
          sourceType: row.source_type,
          sourceId: row.source_id,
          horizonDays: row.horizon_days,
          ticker: row.ticker,
          decisionDate: row.decision_date,
          decisionPrice: row.decision_price,
          spyPrice: row.spy_price,
          sectorBenchmark: row.sector_benchmark,
          sectorReturn: row.sector_return,
          forwardPrice: row.forward_price,
          forwardReturn: row.forward_return,
          benchmarkReturn: row.benchmark_return,
          status: row.status,
          scoreSnapshotId: row.score_snapshot_id,
          evidencePacketId: row.evidence_packet_id,
          committeeSessionId: row.committee_session_id,
          scoreModelId: row.score_model_id,
          sourceFreshness: row.source_freshness,
          notes: row.notes,
          createdAt: row.created_at,
          computedAt: row.computed_at,
        })),
      });
    } catch (error) {
      console.error('Outcomes route error:', error);
      return res.status(500).json({error: 'Failed to fetch decision outcomes'});
    } finally {
      db?.close();
    }
  });
}
