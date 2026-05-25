import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {detectAlerts, type AlertDetectionInput} from './alertRules.ts';

describe('alertRules', () => {
  it('detects all alert types and dedups by lineage key (alert_type, ticker, source_run_id, score_snapshot_id)', () => {
    const input: AlertDetectionInput = {
      pipelineFailures: [
        {sourceName: 'finnhub', sourceRunId: 33, errorMessage: 'timeout'},
        {sourceName: 'finnhub', sourceRunId: 33, errorMessage: 'timeout duplicate'},
      ],
      scoreSignals: [
        {
          ticker: 'NVDA',
          scoreSnapshotId: 7,
          sourceRunId: 91,
          actionabilityState: 'fresh_actionable',
          warnings: ['risk_breach: concentration > max'],
          hasCommitteeSession: false,
        },
        {
          ticker: 'AAPL',
          scoreSnapshotId: 8,
          sourceRunId: 92,
          actionabilityState: 'fresh_actionable',
          warnings: ['earnings_shock: guidance cut'],
          hasCommitteeSession: false,
        },
      ],
      portfolioContext: {
        grossExposurePct: 112,
        maxGrossExposurePct: 100,
      },
    };

    const alerts = detectAlerts(input);
    const types = alerts.map((alert) => `${alert.alertType}:${alert.ticker}`);

    assert.ok(types.includes('pipeline_failure:FINNHUB'));
    assert.ok(types.includes('review_ready_setup:NVDA'));
    assert.ok(types.includes('risk_breach:NVDA'));
    assert.ok(types.includes('earnings_filing_shock:AAPL'));
    assert.ok(types.includes('risk_breach:PORTFOLIO'));

    const pipelineFailures = alerts.filter((alert) => alert.alertType === 'pipeline_failure');
    assert.equal(pipelineFailures.length, 1);
  });

  it('does not collapse distinct lineage when source_run_id is shared', () => {
    const input: AlertDetectionInput = {
      pipelineFailures: [],
      scoreSignals: [
        {
          ticker: 'MSFT',
          scoreSnapshotId: 20,
          sourceRunId: 103,
          actionabilityState: 'fresh_actionable',
          warnings: [],
          hasCommitteeSession: false,
        },
        {
          ticker: 'MSFT',
          scoreSnapshotId: 21,
          sourceRunId: 103,
          actionabilityState: 'fresh_actionable',
          warnings: [],
          hasCommitteeSession: false,
        },
      ],
      portfolioContext: {
        grossExposurePct: 0,
        maxGrossExposurePct: 100,
      },
    };

    const alerts = detectAlerts(input);
    const reviewReadyMsft = alerts.filter(
      (alert) => alert.alertType === 'review_ready_setup' && alert.ticker === 'MSFT',
    );

    assert.equal(reviewReadyMsft.length, 2);
    assert.deepEqual(
      reviewReadyMsft.map((alert) => alert.scoreSnapshotId).sort((a, b) => (a ?? 0) - (b ?? 0)),
      [20, 21],
    );
  });
});
