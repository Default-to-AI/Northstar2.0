import { useQuery } from '@tanstack/react-query';
import { FALLBACK_SEED_POSITIONS } from '../constants';
import { fetchCurrentPrices } from '../lib/finnhub';
import { Position, PortfolioMetrics } from '../types';
import { useState, useEffect, useRef, type SetStateAction } from 'react';
import { isIBKRPortfolioSnapshotUsable, useIBKRPortfolio } from './useIBKRPortfolio';
import {
  applyUserPositionsUpdate,
  canPersistLocalPortfolio,
  clearLocalPortfolioHydrationMetadata,
  hadManualLocalSnapshotOnBoot,
  markPortfolioSourceForUserEdit,
  mapIbkrPositionsToPortfolioPositions,
  NORTHSTAR_CASH_KEY,
  NORTHSTAR_POSITIONS_KEY,
  persistLocalPortfolioSource,
} from './portfolioHydration';

export function usePortfolioData() {
  const {data: ibkrPortfolio, isFetched: isIbkrFetched} = useIBKRPortfolio();
  const isIbkrPortfolioUsable = isIBKRPortfolioSnapshotUsable(ibkrPortfolio);
  const hasHydratedFromIbkr = useRef(false);
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
    if (
      hasHydratedFromIbkr.current ||
      !ibkrPortfolio ||
      !isIbkrPortfolioUsable ||
      hadLocalSnapshotOnBoot.current
    ) {
      return;
    }

    const mappedPositions = mapIbkrPositionsToPortfolioPositions(ibkrPortfolio);
    setPositionsRaw(mappedPositions);

    if (ibkrPortfolio.cash.endingSettledCash > 0) {
      setCash(ibkrPortfolio.cash.endingSettledCash);
    } else if (ibkrPortfolio.cash.endingCash > 0) {
      setCash(ibkrPortfolio.cash.endingCash);
    }

    persistLocalPortfolioSource('ibkr', ibkrPortfolio.syncedAt);
    hasHydratedFromIbkr.current = true;
  }, [ibkrPortfolio, isIbkrPortfolioUsable]);

  const tickers = positions.map(p => p.ticker);

  const { data: prices, isLoading } = useQuery({
    queryKey: ['prices', tickers.join(',')],
    queryFn: () => fetchCurrentPrices(tickers),
    refetchInterval: 60000,
  });

  const positionsWithPrices = positions.map(p => ({
    ...p,
    currentPrice: prices?.[p.ticker] ?? p.currentPrice ?? p.avgCost,
  }));

  const metrics: PortfolioMetrics = positionsWithPrices.reduce((acc, p) => {
    const value = p.shares * (p.currentPrice || p.avgCost);
    const cost = p.shares * p.avgCost;
    return {
      totalValue: acc.totalValue + value,
      totalCostBasis: acc.totalCostBasis + cost,
      totalPnL: acc.totalPnL + (value - cost),
      pnlPercentage: 0,
      cash: 0,
    };
  }, { totalValue: 0, totalCostBasis: 0, totalPnL: 0, pnlPercentage: 0, cash: 0 });

  metrics.cash = cash;
  metrics.totalValue += cash;

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

  const addPosition = (p: Position) => {
    markPortfolioSourceForUserEdit();
    setPositionsRaw(prev => [...prev, p]);
  };
  const deletePosition = (id: string) => {
    markPortfolioSourceForUserEdit();
    setPositionsRaw(prev => prev.filter(pos => pos.id !== id));
  };
  const updatePosition = (updated: Position) => {
    markPortfolioSourceForUserEdit();
    setPositionsRaw(prev => prev.map(p => p.id === updated.id ? updated : p));
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
    cash,
    setCash: setCashFromUser,
    isLoading,
    addPosition,
    deletePosition,
    updatePosition,
    setPositions: setPositionsFromUser,
    resetToSeed,
    ibkrPortfolio,
    isIbkrPortfolioUsable,
  };
}
