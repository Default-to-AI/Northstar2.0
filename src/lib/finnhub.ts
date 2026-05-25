import {Sector} from '../types';

export async function fetchCurrentPrice(ticker: string): Promise<number | null> {
  const prices = await fetchCurrentPrices([ticker]);
  return prices[ticker] ?? null;
}

export async function fetchSector(_ticker: string): Promise<Sector> {
  // Sector enrichment is server-side only in the V1 architecture. Until the
  // watchlist API lands, keep CSV import deterministic without exposing keys.
  return 'Technology';
}

export async function fetchCurrentPrices(tickers: string[]): Promise<Record<string, number>> {
  if (tickers.length === 0) return {};

  try {
    const joined = tickers.join(',');
    const response = await fetch(`/api/stock/batch-prices?tickers=${encodeURIComponent(joined)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return {};
    const data = await response.json() as {prices?: Record<string, number>};
    return data.prices ?? {};
  } catch {
    return {};
  }
}
