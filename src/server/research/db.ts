import fs from 'node:fs';
import path from 'node:path';

import Database from 'better-sqlite3';

export function resolveResearchDbPath(): string {
  return path.resolve(process.env.NORTHSTAR_DB_PATH ?? path.join(process.cwd(), 'data/northstar.db'));
}

export function openResearchDb(): Database.Database {
  const dbPath = resolveResearchDbPath();
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Northstar research DB not found at ${dbPath}. Run npm run test:py or python3 scripts/run-pipeline.py to initialize it.`);
  }
  const db = new Database(dbPath, {fileMustExist: true});
  db.pragma('journal_mode = WAL');
  db.pragma('busy_timeout = 5000');
  db.pragma('foreign_keys = ON');
  return db;
}
