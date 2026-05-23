import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { IBKRPortfolio, isIBKRPortfolioSnapshotUsable } from './useIBKRPortfolio';

function buildSnapshot(overrides: Partial<IBKRPortfolio> = {}): IBKRPortfolio {
  return {
    syncedAt: '2026-05-23T00:00:00.000Z',
    source: 'ibkr-flex',
    nav: {
      startingValue: 100000,
      endingValue: 101000,
      depositsWithdrawals: 0,
      twr: 1,
      markToMarket: 1000,
      fromDate: '2026-05-22',
      toDate: '2026-05-23',
    },
    cash: {
      startingCash: 1000,
      endingCash: 1000,
      endingSettledCash: 1000,
      depositsWithdrawals: 0,
      dividends: 0,
      netTradesSales: 0,
      netTradesPurchases: 0,
    },
    positions: [
      {
        symbol: 'AAPL',
        quantity: 10,
        costBasisMoney: 1700,
        markPrice: 180,
        positionValue: 1800,
        unrealizedPnL: 100,
        reportDate: '2026-05-23',
        currency: 'USD',
        assetClass: 'Technology',
      },
    ],
    ...overrides,
  };
}

describe('isIBKRPortfolioSnapshotUsable', () => {
  it('rejects empty/stale all-zero snapshots', () => {
    const staleSnapshot = buildSnapshot({
      positions: [],
      cash: {
        startingCash: 0,
        endingCash: 0,
        endingSettledCash: 0,
        depositsWithdrawals: 0,
        dividends: 0,
        netTradesSales: 0,
        netTradesPurchases: 0,
      },
      nav: {
        startingValue: 0,
        endingValue: 0,
        depositsWithdrawals: 0,
        twr: 0,
        markToMarket: 0,
        fromDate: null,
        toDate: null,
      },
    });

    assert.equal(isIBKRPortfolioSnapshotUsable(staleSnapshot), false);
  });

  it('accepts valid position-bearing snapshots', () => {
    const snapshot = buildSnapshot();
    assert.equal(isIBKRPortfolioSnapshotUsable(snapshot), true);
  });

  it('accepts valid all-cash snapshots with positive cash and nav dates', () => {
    const allCashSnapshot = buildSnapshot({
      positions: [],
      cash: {
        startingCash: 15000,
        endingCash: 15000,
        endingSettledCash: 15000,
        depositsWithdrawals: 0,
        dividends: 0,
        netTradesSales: 0,
        netTradesPurchases: 0,
      },
    });

    assert.equal(isIBKRPortfolioSnapshotUsable(allCashSnapshot), true);
  });
});
