import { Position, Sector } from '../types';
import type { SetStateAction } from 'react';
import { IBKRPortfolio } from './useIBKRPortfolio';

export const NORTHSTAR_POSITIONS_KEY = 'northstar_positions';
export const NORTHSTAR_CASH_KEY = 'northstar_cash';
export const NORTHSTAR_PORTFOLIO_SOURCE_KEY = 'northstar_portfolio_source';
export const NORTHSTAR_PORTFOLIO_SYNCED_AT_KEY = 'northstar_portfolio_synced_at';

export type LocalPortfolioSource = 'manual' | 'ibkr';

function mapAssetClassToSector(assetClass: string): Sector {
  const normalized = assetClass.toLowerCase();

  if (normalized.includes('technology')) return 'Technology';
  if (normalized.includes('financial')) return 'Financials';
  if (normalized.includes('consumer')) return 'Consumer Discretionary';
  if (normalized.includes('industrial')) return 'Industrials';
  if (normalized.includes('health')) return 'Health Care';
  if (normalized.includes('energy')) return 'Energy';
  if (normalized.includes('communication')) return 'Communication Services';
  if (normalized.includes('material')) return 'Materials';
  if (normalized.includes('utility')) return 'Utilities';
  if (normalized.includes('real estate')) return 'Real Estate';

  return 'Other';
}

export function mapIbkrPositionsToPortfolioPositions(ibkrPortfolio: IBKRPortfolio): Position[] {
  return ibkrPortfolio.positions
    .filter((position) => position.symbol && position.quantity > 0)
    .map((position, index) => ({
      id: `ibkr-${position.symbol}-${index}`,
      ticker: position.symbol,
      shares: position.quantity,
      avgCost:
        position.quantity > 0
          ? position.costBasisMoney / position.quantity
          : position.costBasisMoney,
      currentPrice: position.markPrice,
      sector: mapAssetClassToSector(position.assetClass),
      thesis: `Imported from IBKR (${position.assetClass})`,
    }));
}

export function canPersistLocalPortfolio(params: {
  hadLocalSnapshotOnBoot: boolean;
  hasHydratedFromIbkr: boolean;
  isIbkrFetched: boolean;
  isIbkrPortfolioUsable: boolean;
  ibkrPortfolio: IBKRPortfolio | null | undefined;
}): boolean {
  const {
    hadLocalSnapshotOnBoot,
    hasHydratedFromIbkr,
    isIbkrFetched,
    isIbkrPortfolioUsable,
    ibkrPortfolio,
  } = params;

  if (hadLocalSnapshotOnBoot || hasHydratedFromIbkr) {
    return true;
  }

  if (!isIbkrFetched) {
    return false;
  }

  if (!ibkrPortfolio) {
    return true;
  }

  return !isIbkrPortfolioUsable;
}

export function markPortfolioSourceForUserEdit(): void {
  persistLocalPortfolioSource('manual');
}

export function applyUserPositionsUpdate(
  setPositions: (nextPositionsOrUpdater: SetStateAction<Position[]>) => void,
  nextPositionsOrUpdater: SetStateAction<Position[]>,
): void {
  markPortfolioSourceForUserEdit();
  setPositions(nextPositionsOrUpdater);
}

export function getLocalPortfolioSource(): LocalPortfolioSource {
  const source = localStorage.getItem(NORTHSTAR_PORTFOLIO_SOURCE_KEY);
  return source === 'ibkr' ? 'ibkr' : 'manual';
}

export function hadAnyLocalSnapshotOnBoot(): boolean {
  return Boolean(localStorage.getItem(NORTHSTAR_POSITIONS_KEY)) || Boolean(localStorage.getItem(NORTHSTAR_CASH_KEY));
}

export function hadManualLocalSnapshotOnBoot(): boolean {
  const source = localStorage.getItem(NORTHSTAR_PORTFOLIO_SOURCE_KEY);
  return hadAnyLocalSnapshotOnBoot() && source === 'manual';
}

export function persistLocalPortfolioSource(source: LocalPortfolioSource, syncedAt?: string): void {
  localStorage.setItem(NORTHSTAR_PORTFOLIO_SOURCE_KEY, source);
  if (source === 'ibkr' && syncedAt) {
    localStorage.setItem(NORTHSTAR_PORTFOLIO_SYNCED_AT_KEY, syncedAt);
    return;
  }

  localStorage.removeItem(NORTHSTAR_PORTFOLIO_SYNCED_AT_KEY);
}

export function clearLocalPortfolioHydrationMetadata(): void {
  localStorage.removeItem(NORTHSTAR_PORTFOLIO_SOURCE_KEY);
  localStorage.removeItem(NORTHSTAR_PORTFOLIO_SYNCED_AT_KEY);
}
