import type Database from 'better-sqlite3';

type FreezeInput = {
  ticker: string;
  scoreSnapshotId: number | null;
  scoreModelId: string | null;
  payload: unknown;
};

export type FrozenEvidencePacket = {
  id: string;
  ticker: string;
  scoreSnapshotId: number | null;
  scoreModelId: string | null;
  payloadJson: string;
  frozenAt: string;
};

function ensureEvidenceTables(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS evidence_packets (
      id TEXT PRIMARY KEY,
      ticker TEXT NOT NULL,
      score_snapshot_id INTEGER,
      score_model_id TEXT,
      payload_json TEXT NOT NULL,
      frozen_at TEXT NOT NULL
    );
  `);
}

function makePacketId(ticker: string): string {
  const normalized = ticker.trim().toUpperCase();
  return `pkt_${normalized}_${Date.now()}`;
}

export function freezeEvidencePacket(db: Database.Database, input: FreezeInput): FrozenEvidencePacket {
  ensureEvidenceTables(db);
  const id = makePacketId(input.ticker);
  const frozenAt = new Date().toISOString();
  const payloadJson = JSON.stringify(input.payload);

  db.prepare(
    `INSERT INTO evidence_packets (id, ticker, score_snapshot_id, score_model_id, payload_json, frozen_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(id, input.ticker.toUpperCase(), input.scoreSnapshotId, input.scoreModelId, payloadJson, frozenAt);

  return {
    id,
    ticker: input.ticker.toUpperCase(),
    scoreSnapshotId: input.scoreSnapshotId,
    scoreModelId: input.scoreModelId,
    payloadJson,
    frozenAt,
  };
}

export function getFrozenEvidencePacket(db: Database.Database, id: string): FrozenEvidencePacket | null {
  ensureEvidenceTables(db);
  const row = db
    .prepare(
      `SELECT id, ticker, score_snapshot_id as scoreSnapshotId, score_model_id as scoreModelId, payload_json as payloadJson, frozen_at as frozenAt
       FROM evidence_packets WHERE id = ?`,
    )
    .get(id) as FrozenEvidencePacket | undefined;

  return row ?? null;
}
