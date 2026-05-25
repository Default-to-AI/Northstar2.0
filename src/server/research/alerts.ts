import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';
import {buildAlertLineageKey, detectAlerts, type AlertType} from '../../lib/alertRules.ts';

type AlertRow = {
  id: string;
  ticker: string;
  alert_type: AlertType;
  severity: 'high' | 'medium';
  message: string;
  evidence_json: string;
  source_run_id: number | null;
  score_snapshot_id: number | null;
  status: 'active' | 'acknowledged';
  acknowledged_at: string | null;
  created_at: string;
};

function ensureAlertsTable(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS research_alerts (
      id TEXT PRIMARY KEY,
      ticker TEXT NOT NULL,
      alert_type TEXT NOT NULL,
      severity TEXT NOT NULL,
      message TEXT NOT NULL,
      evidence_json TEXT NOT NULL,
      source_run_id INTEGER,
      score_snapshot_id INTEGER,
      status TEXT NOT NULL DEFAULT 'active',
      acknowledged_at TEXT,
      created_at TEXT NOT NULL
    );
  `);
}

function hashString(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

function parseWarnings(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function upsertGeneratedAlerts(db: Database.Database): void {
  const hasEvidencePacketsTable = db.prepare(`
    SELECT 1
    FROM sqlite_master
    WHERE type = 'table' AND name = 'evidence_packets'
    LIMIT 1
  `).get() !== undefined;

  const hasCommitteeSessionsTable = db.prepare(`
    SELECT 1
    FROM sqlite_master
    WHERE type = 'table' AND name = 'committee_sessions'
    LIMIT 1
  `).get() !== undefined;

  const committeeLineageExistsClause = hasCommitteeSessionsTable
    ? (hasEvidencePacketsTable
    ? `
      EXISTS(
        SELECT 1 FROM committee_sessions cs
        WHERE (
          cs.score_snapshot_id = ss.id
          OR (
            cs.score_snapshot_id IS NULL
            AND EXISTS (
              SELECT 1
              FROM evidence_packets ep
              WHERE ep.id = cs.evidence_packet_id
                AND ep.score_snapshot_id = ss.id
            )
          )
        )
      )
    `
    : `
      EXISTS(
        SELECT 1 FROM committee_sessions cs
        WHERE cs.score_snapshot_id = ss.id
      )
    `)
    : '0';

  const pipelineFailures = db.prepare(`
    SELECT source_name, id as source_run_id, error_message
    FROM source_runs
    WHERE status = 'failed'
    ORDER BY id DESC
    LIMIT 20
  `).all() as Array<{source_name: string; source_run_id: number; error_message: string | null}>;

  const scoreSignals = db.prepare(`
    SELECT ss.ticker, ss.id as score_snapshot_id, ss.pipeline_run_id as source_run_id, ss.actionability_state, ss.warnings,
      ${committeeLineageExistsClause} as has_committee_session
    FROM score_snapshots ss
    WHERE ss.id IN (
      SELECT MAX(inner_ss.id) FROM score_snapshots inner_ss GROUP BY inner_ss.ticker
    )
  `).all() as Array<{
    ticker: string;
    score_snapshot_id: number | null;
    source_run_id: number | null;
    actionability_state: string | null;
    warnings: string | null;
    has_committee_session: 0 | 1;
  }>;

  const alerts = detectAlerts({
    pipelineFailures: pipelineFailures.map((row) => ({
      sourceName: row.source_name,
      sourceRunId: row.source_run_id,
      errorMessage: row.error_message,
    })),
    scoreSignals: scoreSignals.map((row) => ({
      ticker: row.ticker,
      scoreSnapshotId: row.score_snapshot_id,
      sourceRunId: row.source_run_id,
      actionabilityState: row.actionability_state,
      warnings: parseWarnings(row.warnings),
      hasCommitteeSession: row.has_committee_session === 1,
    })),
    portfolioContext: {
      grossExposurePct: 0,
      maxGrossExposurePct: 100,
    },
  });

  const insert = db.prepare(`
    INSERT OR IGNORE INTO research_alerts (
      id, ticker, alert_type, severity, message, evidence_json, source_run_id, score_snapshot_id, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)
  `);

  const generatedAlerts = alerts.map((alert) => {
    const key = buildAlertLineageKey(alert);
    return {
      id: `al_${hashString(key)}`,
      alert,
    };
  });

  const now = new Date().toISOString();

  const generatedIds = generatedAlerts.map((item) => item.id);
  const generatedTypes = ['pipeline_failure', 'review_ready_setup', 'risk_breach', 'earnings_filing_shock'] as const;
  const typePlaceholders = generatedTypes.map(() => '?').join(', ');
  const idPlaceholders = generatedIds.map(() => '?').join(', ');

  const clearStaleSql = generatedIds.length > 0
    ? `
      DELETE FROM research_alerts
      WHERE status = 'active'
        AND alert_type IN (${typePlaceholders})
        AND id NOT IN( ${idPlaceholders})
    `
    : `
      DELETE FROM research_alerts
      WHERE status = 'active'
        AND alert_type IN (${typePlaceholders})
    `;

  db.prepare(clearStaleSql).run(...generatedTypes, ...generatedIds);

  // Clean up acknowledged alerts superseded by new lineage
  // An acknowledged alert is superseded when a generated alert has the same
  // (alert_type, ticker) but different lineage (different id/hash)
  if (generatedIds.length > 0) {
    db.prepare(`
      DELETE FROM research_alerts
      WHERE status = 'acknowledged'
        AND alert_type IN (${typePlaceholders})
        AND id NOT IN (${idPlaceholders})
    `).run(...generatedTypes, ...generatedIds);
  }

  for (const {id, alert} of generatedAlerts) {
    insert.run(
      id,
      alert.ticker,
      alert.alertType,
      alert.severity,
      alert.message,
      JSON.stringify(alert.evidence),
      alert.sourceRunId,
      alert.scoreSnapshotId,
      now,
    );
  }
}

export function registerAlertRoutes(app: Express, openDb: () => Database.Database): void {
  app.get('/api/research/alerts', (req: Request, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();
      ensureAlertsTable(db);
      upsertGeneratedAlerts(db);

      const includeAcknowledged = req.query.includeAcknowledged === 'true';

      const rows = db.prepare(`
        SELECT id, ticker, alert_type, severity, message, evidence_json, source_run_id, score_snapshot_id, status, acknowledged_at, created_at
        FROM research_alerts
        ${!includeAcknowledged ? "WHERE status = 'active'" : ''}
        ORDER BY created_at DESC, id DESC
        LIMIT 200
      `).all() as AlertRow[];

      return res.json({
        generatedAt: new Date().toISOString(),
        alerts: rows.map((row) => ({
          id: row.id,
          ticker: row.ticker,
          alertType: row.alert_type,
          severity: row.severity,
          message: row.message,
          evidence: JSON.parse(row.evidence_json) as Record<string, unknown>,
          sourceRunId: row.source_run_id,
          scoreSnapshotId: row.score_snapshot_id,
          sourceRunIdLinkage: row.source_run_id !== null,
          status: row.status,
          acknowledgedAt: row.acknowledged_at,
          createdAt: row.created_at,
        })),
      });
    } catch (error) {
      console.error('Alerts route error:', error);
      return res.status(500).json({error: 'Failed to fetch alerts'});
    } finally {
      db?.close();
    }
  });

  app.post('/api/research/alerts/:id/acknowledge', (req: Request<{id: string}>, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();
      ensureAlertsTable(db);
      const now = new Date().toISOString();
      const result = db.prepare(`
        UPDATE research_alerts
        SET status = 'acknowledged', acknowledged_at = ?
        WHERE id = ?
      `).run(now, req.params.id);

      if (result.changes === 0) {
        return res.status(404).json({error: `Alert not found: ${req.params.id}`});
      }

      return res.json({id: req.params.id, status: 'acknowledged', acknowledgedAt: now});
    } catch (error) {
      console.error('Acknowledge alert error:', error);
      return res.status(500).json({error: 'Failed to acknowledge alert'});
    } finally {
      db?.close();
    }
  });
}
