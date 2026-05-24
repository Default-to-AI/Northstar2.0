import {Position, Sector} from '../types';
import type {SetStateAction} from 'react';
import {IBKRPortfolio} from './useIBKRPortfolio';

export const NORTHSTAR_POSITIONS_KEY = 'northstar_positions';
export const NORTHSTAR_CASH_KEY = 'northstar_cash';
export const NORTHSTAR_PORTFOLIO_SOURCE_KEY = 'northstar_portfolio_source';
export const NORTHSTAR_PORTFOLIO_SYNCED_AT_KEY = 'northstar_portfolio_synced_at';

export type LocalPortfolioSource = 'manual' | 'ibkr';

function titleCaseLabel(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function getDisplayAssetClass(assetClass?: string, subCategory?: string): string {
  const normalizedAssetClass = (assetClass ?? '').trim();
  const normalizedSubCategory = (subCategory ?? '').trim();
  const assetClassUpper = normalizedAssetClass.toUpperCase();
  const subCategoryUpper = normalizedSubCategory.toUpperCase();

  // IBKR reports ETFs with assetClass "STK" and subCategory "ETF".
  // The more specific subCategory must win over generic stock-like asset classes.
  if (subCategoryUpper === 'ETF' || assetClassUpper === 'ETF') {
    return 'ETF';
  }

  if (
    subCategoryUpper === 'COMMON' ||
    subCategoryUpper === 'COMMON STOCK' ||
    subCategoryUpper === 'STK' ||
    subCategoryUpper === 'STOCK' ||
    assetClassUpper === 'COMMON STOCK' ||
    assetClassUpper === 'COMMON' ||
    assetClassUpper === 'STK' ||
    assetClassUpper === 'STOCK'
  ) {
    return 'Stock';
  }

  if (normalizedSubCategory.length > 0) {
    return titleCaseLabel(normalizedSubCategory);
  }

  if (normalizedAssetClass.length > 0) {
    return titleCaseLabel(normalizedAssetClass);
  }

  return '';
}

export function getPositionDisplayAssetClass(position: Pick<Position, 'assetClass' | 'subCategory' | 'sector'>): string {
  return getDisplayAssetClass(position.assetClass ?? position.sector, position.subCategory) || position.sector;
}

function mapBrokerClassification(position: IBKRPortfolio['positions'][number]): Sector {
  return getPositionDisplayAssetClass({
    assetClass: position.assetClass,
    subCategory: position.subCategory,
    sector: position.assetClass,
  });
}

export function mapIbkrPositionsToPortfolioPositions(ibkrPortfolio: IBKRPortfolio): Position[] {
  return ibkrPortfolio.positions
    .filter((position) => position.symbol && position.quantity > 0)
    .map((position, index) => ({
      id: `ibkr-${position.symbol}-${position.conid || index}`,
      ticker: position.symbol,
      name: position.description,
      shares: position.quantity,
      avgCost:
        position.quantity > 0
          ? position.costBasisMoney / position.quantity
          : position.costBasisMoney,
      currentPrice: position.markPrice,
      sector: mapBrokerClassification(position),
      thesis: position.description || `Imported from IBKR (${position.assetClass})`,
      assetClass: position.assetClass,
      subCategory: position.subCategory,
      listingExchange: position.listingExchange,
      issuerCountryCode: position.issuerCountryCode,
      percentOfNav: position.percentOfNav,
      reportDate: position.reportDate,
      brokerSource: true,
      accountId: position.accountId,
      accountAlias: position.accountAlias,
      conid: position.conid,
      cusip: position.cusip,
      isin: position.isin,
      figi: position.figi,
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
