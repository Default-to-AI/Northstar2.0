import type {Express, Request, Response} from 'express';
import type Database from 'better-sqlite3';

type ArchiveSessionBody = {
  id: string;
  ticker: string;
  date: string;
  verdict: string;
  convictionScore: number;
  summary: string;
  personaScores: unknown;
  outcome: string;
  outcomeText: string;
  fullTranscript: unknown;
  committeeSessionId?: string;
  evidencePacketId?: string;
  committeeModel?: string;
  committeeExternalLlm?: boolean;
};

function ensureColumn(db: Database.Database, tableName: string, columnName: string, ddl: string): void {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{name: string}>;
  const hasColumn = columns.some((column) => column.name === columnName);
  if (!hasColumn) {
    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${ddl}`);
  }
}

function ensureArchiveTable(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS archive_sessions (
      id TEXT PRIMARY KEY,
      ticker TEXT NOT NULL,
      date TEXT NOT NULL,
      verdict TEXT NOT NULL,
      conviction_score REAL NOT NULL,
      summary TEXT NOT NULL,
      persona_scores_json TEXT NOT NULL,
      outcome TEXT NOT NULL,
      outcome_text TEXT NOT NULL,
      full_transcript_json TEXT NOT NULL,
      committee_session_id TEXT,
      evidence_packet_id TEXT,
      committee_model TEXT,
      committee_external_llm INTEGER
    );
  `);

  ensureColumn(db, 'archive_sessions', 'committee_session_id', 'committee_session_id TEXT');
  ensureColumn(db, 'archive_sessions', 'evidence_packet_id', 'evidence_packet_id TEXT');
  ensureColumn(db, 'archive_sessions', 'committee_model', 'committee_model TEXT');
  ensureColumn(db, 'archive_sessions', 'committee_external_llm', 'committee_external_llm INTEGER');
}

export function registerArchiveRoutes(app: Express, openDb: () => Database.Database): void {
  app.get('/api/research/archive/sessions', (_req: Request, res: Response) => {
    let db: Database.Database | null = null;
    try {
      db = openDb();
      ensureArchiveTable(db);
      const rows = db
        .prepare(
          `SELECT id, ticker, date, verdict, conviction_score, summary, persona_scores_json, outcome, outcome_text, full_transcript_json,
                  committee_session_id, evidence_packet_id, committee_model, committee_external_llm
           FROM archive_sessions ORDER BY date DESC, id DESC`,
        )
        .all() as Array<Record<string, unknown>>;

      return res.json({
        sessions: rows.map((row) => ({
          id: row.id,
          ticker: row.ticker,
          date: row.date,
          verdict: row.verdict,
          convictionScore: row.conviction_score,
          summary: row.summary,
          personaScores: JSON.parse(String(row.persona_scores_json)),
          outcome: row.outcome,
          outcomeText: row.outcome_text,
          fullTranscript: JSON.parse(String(row.full_transcript_json)),
          committeeSessionId: row.committee_session_id,
          evidencePacketId: row.evidence_packet_id,
          committeeModel: row.committee_model,
          committeeExternalLlm: Boolean(row.committee_external_llm),
        })),
      });
    } catch (error) {
      console.error('Archive list error:', error);
      return res.status(500).json({error: 'Failed to fetch archive sessions'});
    } finally {
      db?.close();
    }
  });

  app.post('/api/research/archive/sessions', (req: Request<Record<string, never>, unknown, ArchiveSessionBody>, res: Response) => {
    let db: Database.Database | null = null;
    try {
      const body = req.body;
      db = openDb();
      ensureArchiveTable(db);
      db.prepare(
        `INSERT OR REPLACE INTO archive_sessions (
          id, ticker, date, verdict, conviction_score, summary, persona_scores_json, outcome, outcome_text, full_transcript_json,
          committee_session_id, evidence_packet_id, committee_model, committee_external_llm
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        body.id,
        body.ticker,
        body.date,
        body.verdict,
        body.convictionScore,
        body.summary,
        JSON.stringify(body.personaScores),
        body.outcome,
        body.outcomeText,
        JSON.stringify(body.fullTranscript),
        body.committeeSessionId ?? null,
        body.evidencePacketId ?? null,
        body.committeeModel ?? null,
        typeof body.committeeExternalLlm === 'boolean' ? Number(body.committeeExternalLlm) : null,
      );
      return res.status(201).json({ok: true});
    } catch (error) {
      console.error('Archive create error:', error);
      return res.status(500).json({error: 'Failed to save archive session'});
    } finally {
      db?.close();
    }
  });

  app.patch('/api/research/archive/sessions/:id', (req: Request<{id: string}, unknown, ArchiveSessionBody>, res: Response) => {
    let db: Database.Database | null = null;
    try {
      const body = req.body;
      db = openDb();
      ensureArchiveTable(db);
      db.prepare(
        `UPDATE archive_sessions
         SET ticker = ?, date = ?, verdict = ?, conviction_score = ?, summary = ?, persona_scores_json = ?, outcome = ?, outcome_text = ?, full_transcript_json = ?,
             committee_session_id = ?, evidence_packet_id = ?, committee_model = ?, committee_external_llm = ?
         WHERE id = ?`,
      ).run(
        body.ticker,
        body.date,
        body.verdict,
        body.convictionScore,
        body.summary,
        JSON.stringify(body.personaScores),
        body.outcome,
        body.outcomeText,
        JSON.stringify(body.fullTranscript),
        body.committeeSessionId ?? null,
        body.evidencePacketId ?? null,
        body.committeeModel ?? null,
        typeof body.committeeExternalLlm === 'boolean' ? Number(body.committeeExternalLlm) : null,
        req.params.id,
      );
      return res.json({ok: true});
    } catch (error) {
      console.error('Archive update error:', error);
      return res.status(500).json({error: 'Failed to update archive session'});
    } finally {
      db?.close();
    }
  });
}
