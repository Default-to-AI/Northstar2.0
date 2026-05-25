import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {evaluateRiskGovernance} from './riskGovernance.ts';

describe('risk governance', () => {
  it('caps size by max position and stop-loss model', () => {
    const result = evaluateRiskGovernance({
      entry: 'Buy near 100',
      stop: 'Hard stop 95',
      size: 'Size 25%',
    });

    assert.equal(result.boundedSizeRange.minPct, 0);
    assert.ok(result.boundedSizeRange.maxPct <= 10);
    assert.ok(result.violations.some((v) => v.includes('max_position_exceeded')));
  });

  it('flags unparsable size input', () => {
    const result = evaluateRiskGovernance({
      entry: 'accumulate on dip',
      stop: 'tight risk control',
      size: 'small starter',
    });

    assert.ok(result.violations.some((v) => v.includes('size_parse_failed')));
    assert.ok(result.violations.some((v) => v.includes('stop_distance_unavailable')));
  });

  it('tightens max size when liquidity is below floor', () => {
    const result = evaluateRiskGovernance({
      entry: 'entry 100',
      stop: 'stop 90',
      size: '8%',
      payload: {
        marketData: {
          avgDollarVolume: 1000000,
        },
      },
    });

    assert.ok(result.boundedSizeRange.maxPct <= 5);
    assert.ok(result.violations.some((v) => v.includes('liquidity_floor_breach')));
  });

  it('returns clean no-violation result with expected UI-facing label and config version', () => {
    const result = evaluateRiskGovernance({
      entry: 'entry 100',
      stop: 'stop 90',
      size: '5%',
      payload: {
        marketData: {
          avgDollarVolume: 10000000,
        },
      },
    });

    assert.deepEqual(result.violations, []);
    assert.equal(result.boundedSizeRange.label, '0.00%-10.00%');
    assert.equal(result.configVersion, 'v1');
  });
});
