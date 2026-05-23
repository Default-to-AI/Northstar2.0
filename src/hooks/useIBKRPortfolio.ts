import {useQuery} from '@tanstack/react-query';

type IBKRPosition = {
  symbol: string;
  quantity: number;
  costBasisMoney: number;
  markPrice: number;
  positionValue: number;
  unrealizedPnL: number;
  reportDate: string | null;
  currency: string;
  assetClass: string;
};

type IBKRCash = {
  startingCash: number;
  endingCash: number;
  endingSettledCash: number;
  depositsWithdrawals: number;
  dividends: number;
  netTradesSales: number;
  netTradesPurchases: number;
};

type IBKRNav = {
  startingValue: number;
  endingValue: number;
  depositsWithdrawals: number;
  twr: number;
  markToMarket: number;
  fromDate: string | null;
  toDate: string | null;
};

export type IBKRPortfolio = {
  syncedAt: string;
  source: 'ibkr-flex';
  nav: IBKRNav;
  cash: IBKRCash;
  positions: IBKRPosition[];
};

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

  const hasPositiveCash = snapshot.cash.endingSettledCash > 0 || snapshot.cash.endingCash > 0;
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
