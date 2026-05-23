import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { IBKRPortfolio } from './useIBKRPortfolio';
import {
  applyUserPositionsUpdate,
  canPersistLocalPortfolio,
  getLocalPortfolioSource,
  hadAnyLocalSnapshotOnBoot,
  hadManualLocalSnapshotOnBoot,
  markPortfolioSourceForUserEdit,
  mapIbkrPositionsToPortfolioPositions,
  NORTHSTAR_CASH_KEY,
  NORTHSTAR_PORTFOLIO_SOURCE_KEY,
  NORTHSTAR_POSITIONS_KEY,
  persistLocalPortfolioSource,
} from './portfolioHydration';

const storage = new Map<string, string>();

const fakeLocalStorage: Storage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clear: () => {
    storage.clear();
  },
  key: (index: number) => Array.from(storage.keys())[index] ?? null,
  get length() {
    return storage.size;
  },
};

(globalThis as unknown as { localStorage: Storage }).localStorage = fakeLocalStorage;

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

describe('mapIbkrPositionsToPortfolioPositions', () => {
  it('returns empty positions for valid all-cash snapshots', () => {
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

    const mappedPositions = mapIbkrPositionsToPortfolioPositions(allCashSnapshot);
    assert.deepEqual(mappedPositions, []);
  });
});

describe('canPersistLocalPortfolio', () => {
  it('allows local persistence when IBKR fetch completed with unusable snapshot', () => {
    const unusableSnapshot = buildSnapshot({
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

    const canPersist = canPersistLocalPortfolio({
      hadLocalSnapshotOnBoot: false,
      hasHydratedFromIbkr: false,
      isIbkrFetched: true,
      isIbkrPortfolioUsable: false,
      ibkrPortfolio: unusableSnapshot,
    });

    assert.equal(canPersist, true);
  });

  it('blocks local persistence when IBKR fetch completed with usable snapshot and no hydration/local boot', () => {
    const usableSnapshot = buildSnapshot();

    const canPersist = canPersistLocalPortfolio({
      hadLocalSnapshotOnBoot: false,
      hasHydratedFromIbkr: false,
      isIbkrFetched: true,
      isIbkrPortfolioUsable: true,
      ibkrPortfolio: usableSnapshot,
    });

    assert.equal(canPersist, false);
  });
});

describe('local storage hydration source metadata', () => {
  it('untagged legacy local snapshot on boot does not count as manual snapshot', () => {
    storage.clear();
    storage.set(NORTHSTAR_POSITIONS_KEY, JSON.stringify([{ ticker: 'AAPL' }]));
    storage.set(NORTHSTAR_CASH_KEY, '1000');

    assert.equal(hadAnyLocalSnapshotOnBoot(), true);
    assert.equal(hadManualLocalSnapshotOnBoot(), false);
    assert.equal(getLocalPortfolioSource(), 'manual');
  });

  it('explicit IBKR local snapshot on boot does not count as manual snapshot', () => {
    storage.clear();
    storage.set(NORTHSTAR_POSITIONS_KEY, JSON.stringify([{ ticker: 'AAPL' }]));
    storage.set(NORTHSTAR_CASH_KEY, '1000');
    persistLocalPortfolioSource('ibkr', '2026-05-23T00:00:00.000Z');

    assert.equal(hadAnyLocalSnapshotOnBoot(), true);
    assert.equal(hadManualLocalSnapshotOnBoot(), false);
    assert.equal(getLocalPortfolioSource(), 'ibkr');
  });

  it('manual local snapshot on boot remains authoritative local state', () => {
    storage.clear();
    storage.set(NORTHSTAR_POSITIONS_KEY, JSON.stringify([{ ticker: 'MSFT' }]));
    storage.set(NORTHSTAR_CASH_KEY, '2500');
    persistLocalPortfolioSource('manual');

    assert.equal(hadAnyLocalSnapshotOnBoot(), true);
    assert.equal(hadManualLocalSnapshotOnBoot(), true);
    assert.equal(getLocalPortfolioSource(), 'manual');
    assert.equal(storage.has(NORTHSTAR_PORTFOLIO_SOURCE_KEY), true);
  });
});

describe('post-hydration source tagging behavior', () => {
  it('keeps source=ibkr through passive local persistence writes after broker hydration', () => {
    storage.clear();
    persistLocalPortfolioSource('ibkr', '2026-05-23T00:00:00.000Z');

    storage.set(NORTHSTAR_POSITIONS_KEY, JSON.stringify([{ ticker: 'AAPL' }]));
    storage.set(NORTHSTAR_CASH_KEY, '12345');

    assert.equal(getLocalPortfolioSource(), 'ibkr');
  });

  it('user holdings overwrite marks source=manual after ibkr hydration', () => {
    storage.clear();
    persistLocalPortfolioSource('ibkr', '2026-05-23T00:00:00.000Z');

    const updates: unknown[] = [];
    const captureUpdate = (next: unknown): void => {
      updates.push(next);
    };

    applyUserPositionsUpdate(captureUpdate, () => []);

    assert.equal(getLocalPortfolioSource(), 'manual');
    assert.equal(updates.length, 1);
  });

  it('explicit metadata helper still marks source=manual', () => {
    storage.clear();
    persistLocalPortfolioSource('ibkr', '2026-05-23T00:00:00.000Z');

    markPortfolioSourceForUserEdit();

    assert.equal(getLocalPortfolioSource(), 'manual');
  });
});
