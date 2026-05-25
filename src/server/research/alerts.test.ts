import assert from 'node:assert/strict';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import Database from 'better-sqlite3';
import {after, before, describe, it} from 'node:test';

let baseUrl = '';
let closeServer: (() => Promise<void>) | null = null;
let cleanupDir = '';
let dbPath = '';

function seed(): void {
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS source_runs (
      id INTEGER PRIMARY KEY,
      source_name TEXT NOT NULL,
      status TEXT NOT NULL,
      error_message TEXT
    );
    CREATE TABLE IF NOT EXISTS score_snapshots (
      id INTEGER PRIMARY KEY,
      ticker TEXT NOT NULL,
      source_run_id INTEGER,
      score_model_id TEXT,
      actionability_state TEXT,
      warnings TEXT,
      compounder_score REAL,
      tactical_score REAL
    );
    CREATE TABLE IF NOT EXISTS committee_sessions (
      id TEXT PRIMARY KEY,
      ticker TEXT NOT NULL,
      score_snapshot_id INTEGER
    );
  `);

  db.prepare('INSERT INTO source_runs (id, source_name, status, error_message) VALUES (1, ?, ?, ?)').run('finnhub', 'failed', 'timeout');
  db.prepare(`
    INSERT INTO score_snapshots (id, ticker, source_run_id, score_model_id, actionability_state, warnings, compounder_score, tactical_score)
    VALUES (11, 'NVDA', 101, 'test-model', 'fresh_actionable', '["risk_breach: concentration"]', 85, 80)
  `).run();
  db.prepare(`
    INSERT INTO score_snapshots (id, ticker, source_run_id, score_model_id, actionability_state, warnings, compounder_score, tactical_score)
    VALUES (12, 'AAPL', 102, 'test-model', 'fresh_actionable', '["earnings_shock: guidance cut"]', 83, 77)
  `).run();

  db.close();
}

before(async () => {
  cleanupDir = mkdtempSync(path.join(tmpdir(), 'northstar-alerts-'));
  dbPath = path.join(cleanupDir, 'northstar.db');
  seed();

  process.env.NORTHSTAR_DB_PATH = dbPath;
  process.env.NODE_ENV = 'production';

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

describe('alerts routes', () => {
  it('returns typed alerts with source-run linkage', async () => {
    const response = await fetch(`${baseUrl}/api/research/alerts`);
    assert.equal(response.status, 200);
    const data = (await response.json()) as {
      alerts: Array<{id: string; alertType: string; sourceRunId: number | null; sourceRunIdLinkage: boolean}>;
    };

    assert.ok(data.alerts.some((alert) => alert.alertType === 'pipeline_failure'));
    assert.ok(data.alerts.some((alert) => alert.alertType === 'review_ready_setup'));
    assert.ok(data.alerts.some((alert) => alert.alertType === 'risk_breach'));
    assert.ok(data.alerts.some((alert) => alert.alertType === 'earnings_filing_shock'));
    assert.ok(data.alerts.some((alert) => alert.sourceRunIdLinkage));
  });

  it('acknowledges an alert by id', async () => {
    const listRes = await fetch(`${baseUrl}/api/research/alerts`);
    const listJson = (await listRes.json()) as {alerts: Array<{id: string}>};
    assert.ok(listJson.alerts.length > 0);

    const id = listJson.alerts[0].id;
    const ackRes = await fetch(`${baseUrl}/api/research/alerts/${encodeURIComponent(id)}/acknowledge`, {method: 'POST'});
    assert.equal(ackRes.status, 200);
    const ackJson = (await ackRes.json()) as {id: string; status: string; acknowledgedAt: string};
    assert.equal(ackJson.id, id);
    assert.equal(ackJson.status, 'acknowledged');
    assert.equal(typeof ackJson.acknowledgedAt, 'string');
  });

  it('respects includeAcknowledged query parameter', async () => {
    // Seed two alerts (via before hook)
    // Acknowledge the first alert
    const listRes = await fetch(`${baseUrl}/api/research/alerts`);
    const listJson = (await listRes.json()) as {alerts: Array<{id: string}>};
    assert.ok(listJson.alerts.length >= 2);
    const idToAck = listJson.alerts[0].id;
    const ackRes = await fetch(`${baseUrl}/api/research/alerts/${encodeURIComponent(idToAck)}/acknowledge`, {method: 'POST'});
    assert.equal(ackRes.status, 200);

    // Fetch without parameter -> should return only unacknowledged alerts
    const listWithoutParam = await fetch(`${baseUrl}/api/research/alerts`);
    const listWithoutParamJson = (await listWithoutParam.json()) as {alerts: Array<{id: string; status: string}>};
    // Should have one less than total (since we acknowledged one)
    assert.equal(listWithoutParamJson.alerts.length, listJson.alerts.length - 1);
    // Ensure the acknowledged alert is not in the list
    assert.ok(!listWithoutParamJson.alerts.some(alert => alert.id === idToAck));
    // Ensure the remaining alerts are active
    for (const alert of listWithoutParamJson.alerts) {
      assert.equal(alert.status, 'active');
    }

    // Fetch with includeAcknowledged=true -> should return all alerts
    const listWithParam = await fetch(`${baseUrl}/api/research/alerts?includeAcknowledged=true`);
    const listWithParamJson = (await listWithParam.json()) as {alerts: Array<{id: string; status: string}>};
    // Should have the same number as initially seeded
    assert.equal(listWithParamJson.alerts.length, listJson.alerts.length);
    // Should contain the acknowledged alert
    assert.ok(listWithParamJson.alerts.some(alert => alert.id === idToAck && alert.status === 'acknowledged'));
  });
});
