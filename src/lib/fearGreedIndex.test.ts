import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { __resetFearGreedCache, getFearGreedIndex } from './fearGreedIndex';

afterEach(() => {
  __resetFearGreedCache();
  globalThis.fetch = originalFetch;
});

const originalFetch = globalThis.fetch;

describe('getFearGreedIndex', () => {
  it('parses and clamps payload', async () => {
    globalThis.fetch = (async () => new Response(
      JSON.stringify({ data: [{ value: '140', value_classification: 'Extreme Greed' }] }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    )) as typeof fetch;

    const snapshot = await getFearGreedIndex(0);
    assert.equal(snapshot.value, 100);
    assert.equal(snapshot.classification, 'Extreme Greed');
  });

  it('uses one-hour cache', async () => {
    let calls = 0;
    globalThis.fetch = (async () => {
      calls += 1;
      return new Response(
        JSON.stringify({ data: [{ value: '55', value_classification: 'Neutral' }] }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    }) as typeof fetch;

    await getFearGreedIndex(1_000);
    await getFearGreedIndex(2_000);

    assert.equal(calls, 1);
  });

  it('throws on invalid payload', async () => {
    globalThis.fetch = (async () => new Response(
      JSON.stringify({ data: [] }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    )) as typeof fetch;

    await assert.rejects(() => getFearGreedIndex(), /Invalid Fear & Greed API payload shape/);
  });
});
