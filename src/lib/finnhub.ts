import { Sector } from '../types';

const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY;

export async function fetchCurrentPrice(ticker: string): Promise<number | null> {
  try {
    if (!FINNHUB_KEY || FINNHUB_KEY === 'YOUR_FINNHUB_API_KEY' || FINNHUB_KEY === 'MY_VITE_FINNHUB_KEY') {
      return null;
    }
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${encodeURIComponent(FINNHUB_KEY)}`,
    );
    const data = await response.json();

    if (data.c) {
      return data.c;
    }
    return null;
  } catch (error) {
    console.error(`Finnhub network error for ${ticker}:`, error);
    return null;
  }
}

export async function fetchSector(ticker: string): Promise<Sector> {
  try {
    if (!FINNHUB_KEY || FINNHUB_KEY === 'YOUR_FINNHUB_API_KEY' || FINNHUB_KEY === 'MY_VITE_FINNHUB_KEY') {
      return 'Technology';
    }
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(ticker)}&token=${encodeURIComponent(FINNHUB_KEY)}`,
    );
    const data = await response.json();

    if (data.finnhubIndustry) {
      return mapIndustryToSector(data.finnhubIndustry);
    }
    return 'Technology';
  } catch (error) {
    console.error(`Finnhub profile error for ${ticker}:`, error);
    return 'Technology';
  }
}

function mapIndustryToSector(industry: string): Sector {
  const ind = industry.toLowerCase();
  if (ind.includes('tech') || ind.includes('software') || ind.includes('semiconductor')) return 'Technology';
  if (ind.includes('bank') || ind.includes('financial') || ind.includes('insurance')) return 'Financials';
  if (ind.includes('retail') || ind.includes('auto') || (ind.includes('consumer') && !ind.includes('staples'))) return 'Consumer Discretionary';
  if (ind.includes('industrial') || ind.includes('aerospace') || ind.includes('machinery')) return 'Industrials';
  if (ind.includes('health') || ind.includes('pharm') || ind.includes('biotech')) return 'Health Care';
  if (ind.includes('energy') || ind.includes('oil') || ind.includes('gas')) return 'Energy';
  if (ind.includes('telecom') || ind.includes('media') || ind.includes('entertainment')) return 'Communication Services';
  if (ind.includes('beverage') || ind.includes('food') || ind.includes('tobacco') || ind.includes('staples')) return 'Consumer Staples';
  if (ind.includes('utilities')) return 'Utilities';
  if (ind.includes('real estate') || ind.includes('reit')) return 'Real Estate';
  if (ind.includes('material') || ind.includes('chemical') || ind.includes('metal')) return 'Materials';
  return 'Technology';
}

/**
 * Fetch current prices via the server-side Yahoo Finance proxy.
 * Falls back to Finnhub directly if the server is unavailable.
 */
export async function fetchCurrentPrices(tickers: string[]): Promise<Record<string, number>> {
  if (tickers.length === 0) return {};

  // Try server proxy first (reliable, no API key exposure)
  try {
    const joined = tickers.join(',');
    const response = await fetch(`/api/stock/batch-prices?tickers=${encodeURIComponent(joined)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) {
      const data = await response.json() as { prices: Record<string, number> };
      if (data.prices && Object.keys(data.prices).length > 0) {
        return data.prices;
      }
    }
  } catch {
    // Server proxy failed, fall through to Finnhub
  }

  // Fallback: Finnhub direct (requires API key in VITE_FINNHUB_KEY)
  const prices: Record<string, number> = {};
  if (!FINNHUB_KEY || FINNHUB_KEY === 'YOUR_FINNHUB_API_KEY' || FINNHUB_KEY === 'MY_VITE_FINNHUB_KEY') {
    return prices;
  }

  await Promise.all(
    tickers.map(async (ticker) => {
      const price = await fetchCurrentPrice(ticker);
      if (price !== null) {
        prices[ticker] = price;
      }
    })
  );

  return prices;
}
