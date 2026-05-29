import fs from 'node:fs';
import path from 'node:path';

import Database from 'better-sqlite3';

export function resolveResearchDbPath(): string {
  return path.resolve(process.env.NORTHSTAR_DB_PATH ?? path.join(process.cwd(), 'data/northstar.db'));
}

function isVercelRuntime(): boolean {
  // Vercel sets VERCEL=1 for both preview + production.
  return process.env.VERCEL === '1' || process.env.VERCEL === 'true';
}

export function openResearchDb(): Database.Database {
  const dbPath = resolveResearchDbPath();
  if (!fs.existsSync(dbPath)) {
    throw new Error(
      `Northstar research DB not found at ${dbPath}. Ensure data/northstar.db is bundled (vercel.json includeFiles) or set NORTHSTAR_DB_PATH.`,
    );
  }

  // Vercel serverless filesystems are read-only except /tmp. WAL mode requires creating
  // sidecar -wal/-shm files next to the DB and will throw "unable to open database file".
  const readonly = isVercelRuntime();

  const db = new Database(dbPath, {fileMustExist: true, readonly});

  // Only set write-requiring pragmas when the filesystem is writable.
  if (!readonly) {
    db.pragma('journal_mode = WAL');
  }

  db.pragma('busy_timeout = 5000');
  db.pragma('foreign_keys = ON');
  return db;
}
