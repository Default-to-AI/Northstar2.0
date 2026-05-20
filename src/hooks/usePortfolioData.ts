import { useQuery } from '@tanstack/react-query';
import { SEED_POSITIONS } from '../constants';
import { fetchCurrentPrices } from '../lib/finnhub';
import { Position, PortfolioMetrics } from '../types';
import { useState, useEffect } from 'react';

export function usePortfolioData() {
  const [positions, setPositions] = useState<Position[]>(() => {
    const saved = localStorage.getItem('northstar_positions');
    return saved ? JSON.parse(saved) : SEED_POSITIONS;
  });

  const [cash, setCash] = useState<number>(() => {
    const saved = localStorage.getItem('northstar_cash');
    return saved ? parseFloat(saved) : 15000;
  });

  const tickers = positions.map(p => p.ticker);
  
  const { data: prices, isLoading } = useQuery({
    queryKey: ['prices', tickers.join(',')],
    queryFn: () => fetchCurrentPrices(tickers),
    refetchInterval: 60000, // Refresh every minute
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
      pnlPercentage: 0, // Calculated below
      cash: 0, // Injected below
    };
  }, { totalValue: 0, totalCostBasis: 0, totalPnL: 0, pnlPercentage: 0, cash: 0 });

  metrics.cash = cash;
  metrics.totalValue += cash; // Total portfolio = Holdings + Cash

  metrics.pnlPercentage = metrics.totalCostBasis > 0 
    ? (metrics.totalPnL / metrics.totalCostBasis) * 100 
    : 0;

  useEffect(() => {
    localStorage.setItem('northstar_positions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem('northstar_cash', cash.toString());
  }, [cash]);

  const addPosition = (p: Position) => setPositions(prev => [...prev, p]);
  const deletePosition = (id: string) => setPositions(prev => prev.filter(pos => pos.id !== id));
  const updatePosition = (updated: Position) => setPositions(prev => prev.map(p => p.id === updated.id ? updated : p));
  const resetToSeed = () => {
    localStorage.removeItem('northstar_positions');
    localStorage.removeItem('northstar_cash');
    setPositions(SEED_POSITIONS);
    setCash(15000);
  };

  return {
    positions: positionsWithPrices,
    metrics,
    cash,
    setCash,
    isLoading,
    addPosition,
    deletePosition,
    updatePosition,
    setPositions,
    resetToSeed
  };
}
