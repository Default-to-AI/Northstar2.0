import assert from 'node:assert/strict';
import {describe, it} from 'node:test';

import {TickerRefreshCooldown} from './tickerRefreshCooldown.ts';

describe('TickerRefreshCooldown', () => {
  it('allows first refresh and then rejects until cooldown expires (per ticker)', () => {
    let nowMs = 1_000_000;
    const clock = () => nowMs;

    const limiter = new TickerRefreshCooldown({cooldownMs: 10_000, now: clock});

    const first = limiter.startOrReject('AAPL');
    assert.equal(first.allowed, true);
    assert.equal(first.ticker, 'AAPL');

    const second = limiter.startOrReject('AAPL');
    assert.equal(second.allowed, false);
    assert.equal(second.ticker, 'AAPL');
    assert.ok(second.retryAfterMs > 0);

    nowMs += 9_999;
    const third = limiter.startOrReject('AAPL');
    assert.equal(third.allowed, false);

    nowMs += 1;
    const fourth = limiter.startOrReject('AAPL');
    assert.equal(fourth.allowed, true);
  });

  it('tracks cooldown independently per ticker and normalizes to uppercase', () => {
    let nowMs = 5_000;
    const limiter = new TickerRefreshCooldown({cooldownMs: 2_000, now: () => nowMs});

    const a1 = limiter.startOrReject('msft');
    assert.equal(a1.allowed, true);
    assert.equal(a1.ticker, 'MSFT');

    const a2 = limiter.startOrReject('MSFT');
    assert.equal(a2.allowed, false);

    const b1 = limiter.startOrReject('TSLA');
    assert.equal(b1.allowed, true);

    nowMs += 2_000;
    const a3 = limiter.startOrReject('MsFt');
    assert.equal(a3.allowed, true);
  });
});
