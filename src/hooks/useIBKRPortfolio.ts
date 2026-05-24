import {useQuery} from '@tanstack/react-query';

import type {IBKRPortfolioAnalytics, IBKRPortfolioSnapshot} from '../types/ibkr';

export type IBKRPortfolio = IBKRPortfolioSnapshot;

type CashLikeEntry = Record<string, unknown> & {
  currency?: unknown;
  fxRateToBase?: unknown;
  endingCash?: unknown;
  endingSettledCash?: unknown;
  startingCash?: unknown;
};

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value !== 'string') {
    return null;
  }

  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeCashEntry(entry: CashLikeEntry): number {
  const settled = toFiniteNumber(entry.endingSettledCash);
  const ending = toFiniteNumber(entry.endingCash);
  const starting = toFiniteNumber(entry.startingCash);
  const amount = settled ?? ending ?? starting ?? 0;

  const currency = typeof entry.currency === 'string' ? entry.currency.trim().toUpperCase() : '';
  const fxRateToBase = toFiniteNumber(entry.fxRateToBase);
  const conversionRate = currency && currency !== 'USD' && fxRateToBase && fxRateToBase > 0 ? fxRateToBase : 1;

  return amount * conversionRate;
}

function extractCashEntries(snapshot: IBKRPortfolio): CashLikeEntry[] {
  const asRecord = snapshot as unknown as Record<string, unknown>;
  const candidateArrays: unknown[] = [];
  const arrayKeys = [
    'cashRows',
    'cashByCurrency',
    'cashBreakdown',
    'cashSummaryRows',
    'cashCurrencies',
    'cashEntries',
    'cashReportCurrency',
  ];

  for (const key of arrayKeys) {
    const value = asRecord[key];
    if (Array.isArray(value)) {
      candidateArrays.push(...value);
    }
  }

  const cashRecord = snapshot.cash as unknown as Record<string, unknown>;
  for (const key of arrayKeys) {
    const value = cashRecord?.[key];
    if (Array.isArray(value)) {
      candidateArrays.push(...value);
    }
  }

  if (candidateArrays.length > 0) {
    const seen = new Set<string>();
    return candidateArrays.filter((entry): entry is CashLikeEntry => {
      if (typeof entry !== 'object' || entry === null) {
        return false;
      }

      const cashEntry = entry as CashLikeEntry;
      const signature = [
        typeof cashEntry.currency === 'string' ? cashEntry.currency.trim().toUpperCase() : '',
        cashEntry.fxRateToBase ?? '',
        cashEntry.startingCash ?? '',
        cashEntry.endingCash ?? '',
        cashEntry.endingSettledCash ?? '',
        cashEntry.depositsWithdrawals ?? cashEntry.depositWithdrawals ?? '',
        cashEntry.dividends ?? '',
        cashEntry.netTradesSales ?? '',
        cashEntry.netTradesPurchases ?? '',
        cashEntry.interest ?? '',
        cashEntry.withholdingTax ?? '',
        cashEntry.brokerFees ?? '',
      ].join('|');

      if (seen.has(signature)) {
        return false;
      }

      seen.add(signature);
      return true;
    });
  }

  return [cashRecord as CashLikeEntry];
}

export function normalizeIbkrCashValue(snapshot: IBKRPortfolio | null | undefined): number {
  if (!snapshot) {
    return 0;
  }

  return extractCashEntries(snapshot).reduce((total, entry) => total + normalizeCashEntry(entry), 0);
}

export function isIBKRPortfolioSnapshotUsable(snapshot: IBKRPortfolio | null | undefined): boolean {
  if (!snapshot) {
    return false;
  }

  const hasUsablePositions = snapshot.positions.some(
    (position) => Boolean(position.symbol) && position.quantity > 0,
  );

  if (hasUsablePositions) {
    return true;
  }

  const hasPositiveCash = normalizeIbkrCashValue(snapshot) > 0;
  const hasNavDateRange = Boolean(snapshot.nav.fromDate) && Boolean(snapshot.nav.toDate);
  const hasSourceMetadata = snapshot.source === 'ibkr-flex' && snapshot.syncedAt.trim().length > 0;

  return hasPositiveCash && hasNavDateRange && hasSourceMetadata;
}

export function useIBKRPortfolio() {
  return useQuery<IBKRPortfolio | null>({
    queryKey: ['ibkr-portfolio'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio/ibkr');
      if (response.status === 404) return null;
      if (!response.ok) {
        throw new Error(`IBKR portfolio request failed (${response.status})`);
      }
      return (await response.json()) as IBKRPortfolio;
    },
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
}

export function useIBKRPortfolioAnalytics(range: '1y' | 'ytd' | 'mtd', snapshotKey = '') {
  return useQuery<IBKRPortfolioAnalytics | null>({
    queryKey: ['ibkr-portfolio-analytics', range, snapshotKey],
    queryFn: async () => {
      const response = await fetch(`/api/portfolio/ibkr/analytics?range=${range}`);
      if (response.status === 404) return null;
      if (!response.ok) {
        throw new Error(`IBKR portfolio analytics request failed (${response.status})`);
      }
      return (await response.json()) as IBKRPortfolioAnalytics;
    },
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
}
