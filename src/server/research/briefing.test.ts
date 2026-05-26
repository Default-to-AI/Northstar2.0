import assert from 'node:assert/strict';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import Database from 'better-sqlite3';
import {after, before, describe, it} from 'node:test';

import {readFileSync} from 'node:fs';

let baseUrl = '';
let closeServer: (() => Promise<void>) | null = null;
let cleanupDir = '';
let dbPath = '';

function seed(): void {
  const db = new Database(dbPath);
  // Create both V3 tables so the API routes work without needing migration scripts
  db.exec(`
    CREATE TABLE IF NOT EXISTS morning_briefs (
      date TEXT PRIMARY KEY,
      pipeline_readiness_json TEXT,
      pre_market_context_json TEXT,
      top_opportunities_json TEXT,
      portfolio_snapshot_json TEXT,
      status TEXT NOT NULL DEFAULT 'generated',
      source TEXT NOT NULL DEFAULT 'cron',
      generated_at TEXT NOT NULL
    )
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS market_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL CHECK(event_type IN ('earnings','macro','filing')),
      ticker TEXT,
      event_date TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      source TEXT NOT NULL,
      relevant_holdings TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    )
  `);

  // Seed with today's date so date('now') matches
  db.prepare(`
    INSERT OR REPLACE INTO morning_briefs (date, pipeline_readiness_json, pre_market_context_json, top_opportunities_json, portfolio_snapshot_json, status, source, generated_at)
    VALUES (date('now'), '{"status":"ready","runId":1,"sources":[]}', '{"spyChangePct":0.25,"futuresDirection":"neutral"}', '[{"ticker":"AAPL","name":"Apple Inc.","score":85}]', '{"nav":100000,"cashPct":12.5,"grossExposure":87500}', 'generated', 'cron', datetime('now'))
  `).run();

  // Seed an event for testing
  db.prepare(`
    INSERT INTO market_events (event_type, ticker, event_date, title, description, source, relevant_holdings, created_at)
    VALUES ('earnings', 'AAPL', date('now', '+3 days'), 'Earnings: AAPL', 'Upcoming earnings for Apple Inc.', 'collect_events', '["AAPL"]', datetime('now'))
  `).run();

  db.close();
}

before(async () => {
  cleanupDir = mkdtempSync(path.join(tmpdir(), 'northstar-briefing-'));
  dbPath = path.join(cleanupDir, 'northstar.db');
  seed();

  process.env.NORTHSTAR_DB_PATH = dbPath;
  process.env.NODE_ENV = 'production';

  // Clear PYTHONPATH to ensure the refresh test doesn't accidentally run real code
  process.env.PYTHONPATH = '';

  const {createApp} = await import('../app.ts');
  const app = await createApp();
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once('listening', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Failed to bind test server');
  baseUrl = `http://127.0.0.1:${address.port}`;
  closeServer = async () => {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  };
});

after(async () => {
  if (closeServer) await closeServer();
  if (cleanupDir) rmSync(cleanupDir, {recursive: true, force: true});
});

describe('briefing routes', () => {
  it('returns fresh briefing when row exists', async () => {
    const response = await fetch(`${baseUrl}/api/research/briefing`);
    assert.equal(response.status, 200);
    const data = await response.json() as Record<string, unknown>;
    assert.equal(data.status, 'fresh');
    assert.ok(typeof data.date === 'string');
    assert.ok(data.pipelineReadiness);
    assert.ok(data.preMarketContext);
    assert.ok(data.topOpportunities);
    assert.ok(data.portfolioSnapshot);
  });

  it('refresh endpoint returns briefing data or error', async () => {
    // The script may succeed (if Python can import the module) or fail.
    // Both are valid responses with the expected shape.
    const response = await fetch(`${baseUrl}/api/research/briefing/refresh`, {method: 'POST'});
    const data = await response.json() as Record<string, unknown>;

    if (response.status === 200) {
      assert.equal(data.status, 'fresh');
      assert.ok(data.pipelineReadiness);
    } else {
      assert.equal(response.status, 502);
      assert.equal(data.status, 'error');
      assert.ok(typeof data.fallbackCommand === 'string');
    }
  });
});

describe('events routes', () => {
  it('returns events grouped by date', async () => {
    const response = await fetch(`${baseUrl}/api/research/events`);
    assert.equal(response.status, 200);
    const data = await response.json() as {generatedAt: string; events: Array<{date: string; items: unknown[]}>};
    assert.ok(data.generatedAt);
    assert.ok(Array.isArray(data.events));
    assert.ok(data.events.length >= 1, 'Expected at least one event');
    // Check structure
    const firstGroup = data.events[0];
    assert.ok(typeof firstGroup.date === 'string');
    assert.ok(Array.isArray(firstGroup.items));
    const firstEvent = firstGroup.items[0] as Record<string, unknown>;
    assert.equal(firstEvent.type, 'earnings');
    assert.equal(firstEvent.ticker, 'AAPL');
    assert.equal(firstEvent.isHolding, true);
  });
});