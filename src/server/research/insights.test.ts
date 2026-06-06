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
    CREATE TABLE IF NOT EXISTS securities (
      ticker TEXT PRIMARY KEY,
      name TEXT,
      type TEXT,
      active BOOLEAN DEFAULT 1,
      exchange TEXT,
      sector TEXT,
      last_updated DATETIME
    );

    CREATE TABLE IF NOT EXISTS fundamentals (
      ticker TEXT PRIMARY KEY,
      market_cap REAL,
      revenue_growth REAL,
      current_price REAL
    );

    CREATE TABLE IF NOT EXISTS score_snapshots (
      id INTEGER PRIMARY KEY,
      ticker TEXT NOT NULL,
      tactical_score REAL,
      compounder_score REAL,
      actionability_state TEXT,
      warnings TEXT
    );
  `);

  db.prepare('INSERT INTO securities (ticker, name, active, exchange, sector) VALUES (?, ?, 1, ?, ?)').run(
    'AAPL',
    'Apple Inc.',
    'NASDAQ',
    'Technology',
  );
  db.prepare('INSERT INTO securities (ticker, name, active, exchange, sector) VALUES (?, ?, 1, ?, ?)').run(
    'MSFT',
    'Microsoft Corp',
    'NASDAQ',
    'Technology',
  );
  db.prepare('INSERT INTO securities (ticker, name, active, exchange, sector) VALUES (?, ?, 1, ?, ?)').run(
    'TSLA',
    'Tesla, Inc.',
    'NASDAQ',
    'Consumer Discretionary',
  );

  db.prepare('INSERT INTO fundamentals (ticker, market_cap, revenue_growth, current_price) VALUES (?, ?, ?, ?)').run(
    'AAPL',
    3_000_000_000_000,
    0.05,
    200.12,
  );
  db.prepare('INSERT INTO fundamentals (ticker, market_cap, revenue_growth, current_price) VALUES (?, ?, ?, ?)').run(
    'MSFT',
    3_200_000_000_000,
    0.12,
    450.0,
  );
  db.prepare('INSERT INTO fundamentals (ticker, market_cap, revenue_growth, current_price) VALUES (?, ?, ?, ?)').run(
    'TSLA',
    900_000_000_000,
    0.25,
    180.55,
  );

  db.prepare('INSERT INTO score_snapshots (id, ticker, tactical_score, compounder_score, actionability_state, warnings) VALUES (?, ?, ?, ?, ?, ?)').run(1, 'AAPL', 70, 85, 'fresh_actionable', '["high_valuation"]');
  db.prepare('INSERT INTO score_snapshots (id, ticker, tactical_score, compounder_score, actionability_state, warnings) VALUES (?, ?, ?, ?, ?, ?)').run(2, 'MSFT', 88, 90, 'fresh_actionable', '[]');
  db.prepare('INSERT INTO score_snapshots (id, ticker, tactical_score, compounder_score, actionability_state, warnings) VALUES (?, ?, ?, ?, ?, ?)').run(3, 'TSLA', 75, 60, 'stale', '[]');

  db.close();
}

before(async () => {
  cleanupDir = mkdtempSync(path.join(tmpdir(), 'northstar-insights-'));
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

describe('insights routes', () => {
  it('searches securities by ticker/name', async () => {
    const empty = await fetch(`${baseUrl}/api/research/securities/search?q=`);
    assert.equal(empty.status, 200);
    const emptyJson = (await empty.json()) as {results: unknown[]};
    assert.equal(emptyJson.results.length, 0);

    const response = await fetch(`${baseUrl}/api/research/securities/search?q=aap&limit=5`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as {results: Array<{ticker: string}>};
    assert.ok(json.results.length >= 1);
    assert.equal(json.results[0].ticker, 'AAPL');
  });

  it('returns sp500 insights ordered by market cap', async () => {
    const response = await fetch(`${baseUrl}/api/research/insights?tab=sp500&limit=3`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as {items: Array<{ticker: string; marketCap: number | null}>};
    assert.equal(json.items.length, 3);
    assert.equal(json.items[0].ticker, 'MSFT');
    assert.equal(json.items[1].ticker, 'AAPL');
  });

  it('returns trending insights ordered by tactical score', async () => {
    const response = await fetch(`${baseUrl}/api/research/insights?tab=trending&limit=3`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as {items: Array<{ticker: string}>};
    assert.equal(json.items.length, 3);
    assert.equal(json.items[0].ticker, 'MSFT');
  });

  it('returns unavailable meta for dividend/buyback tabs', async () => {
    const response = await fetch(`${baseUrl}/api/research/insights?tab=dividend&limit=5`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as {items: unknown[]; meta?: {status: string}};
    assert.equal(json.items.length, 0);
    assert.equal(json.meta?.status, 'unavailable');
  });

  it('returns 404 for unknown ticker insights', async () => {
    const response = await fetch(`${baseUrl}/api/insights/UNKNOWN`);
    assert.equal(response.status, 404);
  });

  it('returns ticker insights modules for valid ticker', async () => {
    const response = await fetch(`${baseUrl}/api/insights/AAPL`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as {ticker: string; modules: any[]};
    assert.equal(json.ticker, 'AAPL');
    assert.ok(json.modules.length >= 1, 'Should return at least one module (snapshot)');
    
    const snapshotModule = json.modules.find(m => m.title === 'SNAPSHOT');
    assert.ok(snapshotModule);
    assert.equal(snapshotModule.kind, 'kpi');
    
    const priceKpi = snapshotModule.items.find((k: any) => k.label === 'PRICE');
    assert.ok(priceKpi.value.includes('200.12'));
  });
  it('returns insider trades table for valid ticker', async () => {
    const response = await fetch(`${baseUrl}/api/insights/AAPL/insider-trades`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as any;
    assert.equal(json.kind, 'table');
    assert.equal(json.title, 'INSIDER TRADES');
    assert.ok(json.rows.length > 0);
  });

  it('returns analyst estimates table for valid ticker', async () => {
    const response = await fetch(`${baseUrl}/api/insights/AAPL/analyst-estimates`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as any;
    assert.equal(json.kind, 'table');
    assert.equal(json.title, 'ANALYST ESTIMATES');
    assert.ok(json.rows.length > 0);
  });

  it('returns charts data for valid ticker', async () => {
    const response = await fetch(`${baseUrl}/api/insights/AAPL/charts?timeframe=TTM`);
    assert.equal(response.status, 200);
    const json = (await response.json()) as any;
    assert.equal(json.kind, 'chart');
    assert.equal(json.title, 'HISTORICAL FINANCIALS');
    assert.equal(json.series.length, 1);
    assert.ok(json.series[0].points.length >= 12);
  });
});
