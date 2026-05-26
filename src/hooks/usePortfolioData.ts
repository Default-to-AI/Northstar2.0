import {useQuery} from '@tanstack/react-query';
import {FALLBACK_SEED_POSITIONS} from '../constants';
import {fetchCurrentPrices} from '../lib/finnhub';
import {Position, PortfolioMetrics} from '../types';
import {useState, useEffect, useRef, type SetStateAction} from 'react';
import {isIBKRPortfolioSnapshotUsable, normalizeIbkrCashValue, useIBKRPortfolio} from './useIBKRPortfolio';
import {
  applyUserPositionsUpdate,
  canPersistLocalPortfolio,
  clearLocalPortfolioHydrationMetadata,
  hadAnyLocalSnapshotOnBoot,
  hadManualLocalSnapshotOnBoot,
  markPortfolioSourceForUserEdit,
  mapIbkrPositionsToPortfolioPositions,
  NORTHSTAR_CASH_KEY,
  NORTHSTAR_POSITIONS_KEY,
  NORTHSTAR_PORTFOLIO_SOURCE_KEY,
  persistLocalPortfolioSource,
  getLocalPortfolioSource,
} from './portfolioHydration';

export function getPortfolioDisplayCash(params: {
  ibkrPortfolio: ReturnType<typeof normalizeIbkrCashValue> extends number ? Parameters<typeof normalizeIbkrCashValue>[0] : never;
  isIbkrPortfolioUsable: boolean;
  localCash: number;
}): number {
  const {ibkrPortfolio, isIbkrPortfolioUsable, localCash} = params;
  return ibkrPortfolio && isIbkrPortfolioUsable
    ? normalizeIbkrCashValue(ibkrPortfolio)
    : localCash;
}

export function usePortfolioData() {
  const {data: ibkrPortfolio, isFetched: isIbkrFetched} = useIBKRPortfolio();
  const isIbkrPortfolioUsable = isIBKRPortfolioSnapshotUsable(ibkrPortfolio);
  const hasHydratedFromIbkr = useRef(false);
  const lastHydratedSyncedAt = useRef<string | null>(null);
  const hadLocalSnapshotOnBoot = useRef(hadManualLocalSnapshotOnBoot());

  const [positions, setPositionsRaw] = useState<Position[]>(() => {
    const saved = localStorage.getItem(NORTHSTAR_POSITIONS_KEY);
    return saved ? JSON.parse(saved) : FALLBACK_SEED_POSITIONS;
  });

  const [cash, setCash] = useState<number>(() => {
    const saved = localStorage.getItem(NORTHSTAR_CASH_KEY);
    return saved ? parseFloat(saved) : 15000;
  });

  useEffect(() => {
    if (!ibkrPortfolio || !isIbkrPortfolioUsable) {
      return;
    }

    const syncedAt = ibkrPortfolio.syncedAt?.trim() || '';
    if (hasHydratedFromIbkr.current && lastHydratedSyncedAt.current === syncedAt) {
      return;
    }

    const currentSource = localStorage.getItem(NORTHSTAR_PORTFOLIO_SOURCE_KEY);
    const hasAnyLocalSnapshotNow = hadAnyLocalSnapshotOnBoot();
    const shouldHydratePositionsFromIbkr = currentSource !== 'manual' && !hasAnyLocalSnapshotNow;

    if (shouldHydratePositionsFromIbkr) {
      const mappedPositions = mapIbkrPositionsToPortfolioPositions(ibkrPortfolio);
      setPositionsRaw(mappedPositions);
    }

    const normalizedCash = normalizeIbkrCashValue(ibkrPortfolio);
    setCash(normalizedCash);
    localStorage.setItem(NORTHSTAR_CASH_KEY, normalizedCash.toString());

    if (currentSource !== 'manual') {
      persistLocalPortfolioSource('ibkr', syncedAt);
    }
    hasHydratedFromIbkr.current = true;
    lastHydratedSyncedAt.current = syncedAt;
  }, [ibkrPortfolio, isIbkrPortfolioUsable]);

  const nonBrokerTickers = positions.filter((position) => !position.brokerSource).map((position) => position.ticker);

  const {data: prices, isLoading} = useQuery({
    queryKey: ['prices', nonBrokerTickers.join(',')],
    queryFn: () => fetchCurrentPrices(nonBrokerTickers),
    enabled: nonBrokerTickers.length > 0,
    refetchInterval: 60000,
  });

  const positionsWithPrices = positions.map((position) => ({
    ...position,
    currentPrice: position.brokerSource
      ? position.currentPrice ?? position.avgCost
      : prices?.[position.ticker] ?? position.currentPrice ?? position.avgCost,
  }));

  const metrics: PortfolioMetrics = positionsWithPrices.reduce(
    (acc, position) => {
      const value = position.shares * (position.currentPrice || position.avgCost);
      const cost = position.shares * position.avgCost;
      return {
        totalValue: acc.totalValue + value,
        totalCostBasis: acc.totalCostBasis + cost,
        totalPnL: acc.totalPnL + (value - cost),
        pnlPercentage: 0,
        cash: 0,
      };
    },
    {totalValue: 0, totalCostBasis: 0, totalPnL: 0, pnlPercentage: 0, cash: 0},
  );

  const displayCash = ibkrPortfolio && isIbkrPortfolioUsable
    ? normalizeIbkrCashValue(ibkrPortfolio)
    : cash;

  metrics.cash = displayCash;
  metrics.totalValue += displayCash;

  metrics.pnlPercentage = metrics.totalCostBasis > 0
    ? (metrics.totalPnL / metrics.totalCostBasis) * 100
    : 0;

  useEffect(() => {
    const canPersistLocal = canPersistLocalPortfolio({
      hadLocalSnapshotOnBoot: hadLocalSnapshotOnBoot.current,
      hasHydratedFromIbkr: hasHydratedFromIbkr.current,
      isIbkrFetched,
      isIbkrPortfolioUsable,
      ibkrPortfolio,
    });
    if (!canPersistLocal) {
      return;
    }

    localStorage.setItem(NORTHSTAR_POSITIONS_KEY, JSON.stringify(positions));
  }, [ibkrPortfolio, isIbkrFetched, isIbkrPortfolioUsable, positions]);

  useEffect(() => {
    const canPersistLocal = canPersistLocalPortfolio({
      hadLocalSnapshotOnBoot: hadLocalSnapshotOnBoot.current,
      hasHydratedFromIbkr: hasHydratedFromIbkr.current,
      isIbkrFetched,
      isIbkrPortfolioUsable,
      ibkrPortfolio,
    });
    if (!canPersistLocal) {
      return;
    }

    localStorage.setItem(NORTHSTAR_CASH_KEY, cash.toString());
  }, [cash, ibkrPortfolio, isIbkrFetched, isIbkrPortfolioUsable]);

  const addPosition = (position: Position) => {
    markPortfolioSourceForUserEdit();
    setPositionsRaw((previous) => [...previous, position]);
  };
  const deletePosition = (id: string) => {
    markPortfolioSourceForUserEdit();
    setPositionsRaw((previous) => previous.filter((position) => position.id !== id));
  };
  const updatePosition = (updated: Position) => {
    markPortfolioSourceForUserEdit();
    setPositionsRaw((previous) => previous.map((position) => (position.id === updated.id ? updated : position)));
  };
  const setCashFromUser = (nextCash: number) => {
    markPortfolioSourceForUserEdit();
    setCash(nextCash);
  };
  const setPositionsFromUser = (nextPositionsOrUpdater: SetStateAction<Position[]>) => {
    applyUserPositionsUpdate(setPositionsRaw, nextPositionsOrUpdater);
  };
  const resetToSeed = () => {
    localStorage.removeItem(NORTHSTAR_POSITIONS_KEY);
    localStorage.removeItem(NORTHSTAR_CASH_KEY);
    clearLocalPortfolioHydrationMetadata();
    setPositionsRaw(FALLBACK_SEED_POSITIONS);
    setCash(15000);
  };

  return {
    positions: positionsWithPrices,
    metrics,
    cash: displayCash,
    setCash: setCashFromUser,
    isLoading,
    addPosition,
    deletePosition,
    updatePosition,
    setPositions: setPositionsFromUser,
    resetToSeed,
    ibkrPortfolio,
    isIbkrPortfolioUsable,
    getLocalPortfolioSource,
  };
}
