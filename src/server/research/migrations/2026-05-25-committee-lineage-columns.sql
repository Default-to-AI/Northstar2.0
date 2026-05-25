-- Adds first-class lineage columns for grounded committee sessions.
-- Safe to run repeatedly on SQLite (guard each ALTER with pragma check in runner).

ALTER TABLE committee_sessions ADD COLUMN score_snapshot_id INTEGER;
ALTER TABLE committee_sessions ADD COLUMN score_model_id TEXT;
ALTER TABLE committee_sessions ADD COLUMN source_freshness TEXT NOT NULL DEFAULT '{}';
ALTER TABLE committee_sessions ADD COLUMN prompt_version TEXT NOT NULL DEFAULT 'unknown';
ALTER TABLE committee_sessions ADD COLUMN schema_version TEXT NOT NULL DEFAULT 'v1';
