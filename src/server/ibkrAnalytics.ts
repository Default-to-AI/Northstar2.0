import type {
  IBKRChartPoint,
  IBKRPortfolioAnalytics,
  IBKRPortfolioSnapshot,
  IBKRTimeframeMetrics,
} from '../types/ibkr';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const YAHOO_HEADERS: HeadersInit = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
};

type AnalyticsRange = '1y' | 'ytd' | 'mtd';

type DailyClosePoint = {
  date: string;
  timestamp: number;
  close: number;
};

function parseIbkrDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const [datePart, timePart] = value.split(';');
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(datePart.trim());
  if (!match) return null;
  const [, day, month, year] = match;
  const time = timePart?.trim() || '00:00:00';
  const parsed = new Date(`${year}-${month}-${day}T${time}Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toIsoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getWindowStart(range: AnalyticsRange, floorDate: Date): Date {
  const today = new Date();
  const currentYearStart = new Date(Date.UTC(today.getUTCFullYear(), 0, 1));
  const currentMonthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));

  if (range === 'ytd') {
    return currentYearStart > floorDate ? currentYearStart : floorDate;
  }
  if (range === 'mtd') {
    return currentMonthStart > floorDate ? currentMonthStart : floorDate;
  }
  return floorDate;
}

async function fetchYahooHistory(symbol: string): Promise<DailyClosePoint[]> {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1y&interval=1d`,
    {headers: YAHOO_HEADERS},
  );
  if (!response.ok) {
    throw new Error(`Yahoo chart API failed for ${symbol} (${response.status})`);
  }

  const data = (await response.json()) as {
    chart?: {
      result?: Array<{
        timestamp?: number[];
        indicators?: {
          quote?: Array<{
            close?: Array<number | null>;
          }>;
        };
      }>;
      error?: unknown;
    };
  };

  const result = data.chart?.result?.[0];
  if (!result) {
    return [];
  }

  const timestamps = result.timestamp ?? [];
  const closes = result.indicators?.quote?.[0]?.close ?? [];
  const points: DailyClosePoint[] = [];

  for (let index = 0; index < timestamps.length; index += 1) {
    const close = closes[index];
    if (typeof close !== 'number' || !Number.isFinite(close)) continue;
    const timestamp = timestamps[index] * 1000;
    const date = new Date(timestamp);
    points.push({
      date: toIsoDay(date),
      timestamp,
      close,
    });
  }

  return points;
}

function buildPriceLookup(points: DailyClosePoint[]): Map<string, number> {
  return new Map(points.map((point) => [point.date, point.close]));
}

function getCloseForDate(
  lookup: Map<string, number>,
  orderedDates: string[],
  fallback: number,
): Map<string, number> {
  const normalized = new Map<string, number>();
  let lastKnown = fallback;

  for (const date of orderedDates) {
    const current = lookup.get(date);
    if (typeof current === 'number' && Number.isFinite(current)) {
      lastKnown = current;
    }
    normalized.set(date, lastKnown);
  }

  return normalized;
}

function sortTradesDescending(snapshot: IBKRPortfolioSnapshot) {
  return [...snapshot.trades].sort((left, right) => {
    const leftTime = parseIbkrDate(left.dateTime ?? left.tradeDate)?.getTime() ?? 0;
    const rightTime = parseIbkrDate(right.dateTime ?? right.tradeDate)?.getTime() ?? 0;
    return rightTime - leftTime;
  });
}

function getCurrentInvestedValue(snapshot: IBKRPortfolioSnapshot): number {
  return snapshot.positions.reduce((total, position) => {
    const positionValue = Number.isFinite(position.positionValue)
      ? position.positionValue
      : position.quantity * position.markPrice;
    return total + positionValue;
  }, 0);
}

function getCurrentPortfolioCash(snapshot: IBKRPortfolioSnapshot): number {
  const impliedCash = snapshot.nav.endingValue - getCurrentInvestedValue(snapshot);
  return Number.isFinite(impliedCash) ? impliedCash : 0;
}

function buildMetrics(series: IBKRChartPoint[]): IBKRTimeframeMetrics {
  const first = series[0];
  const last = series[series.length - 1];
  if (!first || !last) {
    return {
      portfolioReturnPct: 0,
      spyReturnPct: 0,
      alphaPct: 0,
      startDate: '',
      endDate: '',
    };
  }

  const portfolioReturnPct = first.portfolioValue > 0
    ? ((last.portfolioValue / first.portfolioValue) - 1) * 100
    : 0;
  const spyReturnPct = first.spyValue > 0
    ? ((last.spyValue / first.spyValue) - 1) * 100
    : 0;

  return {
    portfolioReturnPct,
    spyReturnPct,
    alphaPct: portfolioReturnPct - spyReturnPct,
    startDate: first.fullDate,
    endDate: last.fullDate,
  };
}

export async function buildIbkrPortfolioAnalytics(
  snapshot: IBKRPortfolioSnapshot,
  range: AnalyticsRange,
): Promise<IBKRPortfolioAnalytics> {
  const trades = sortTradesDescending(snapshot);
  const floorTradeDate = [...trades]
    .map((trade) => parseIbkrDate(trade.tradeDate ?? trade.dateTime))
    .filter((date): date is Date => Boolean(date))
    .sort((left, right) => left.getTime() - right.getTime())[0];

  const fallbackFloorDate = parseIbkrDate(snapshot.nav.fromDate) ?? new Date(Date.now() - 365 * ONE_DAY_MS);
  const floorDate = floorTradeDate ?? fallbackFloorDate;
  const floorIsoDay = toIsoDay(floorDate);

  const symbols = Array.from(
    new Set(
      [...snapshot.positions.map((position) => position.symbol), ...snapshot.trades.map((trade) => trade.symbol)]
        .map((symbol) => symbol.trim().toUpperCase())
        .filter(Boolean)
        .filter((symbol) => symbol !== 'USD.ILS'),
    ),
  );

  const [spyHistory, ...symbolHistories] = await Promise.all([
    fetchYahooHistory('SPY'),
    ...symbols.map((symbol) => fetchYahooHistory(symbol)),
  ]);

  const marketDays = spyHistory
    .filter((point) => point.date >= floorIsoDay)
    .map((point) => point.date);

  if (marketDays.length === 0) {
    return {
      range,
      sinceDate: floorIsoDay,
      series: [],
      metrics: buildMetrics([]),
    };
  }

  const spyByDate = buildPriceLookup(spyHistory);
  const priceBySymbol = new Map<string, Map<string, number>>();
  symbols.forEach((symbol, index) => {
    const lookup = buildPriceLookup(symbolHistories[index] ?? []);
    const fallbackPrice =
      snapshot.positions.find((position) => position.symbol === symbol)?.markPrice ??
      snapshot.trades.find((trade) => trade.symbol === symbol)?.tradePrice ??
      0;
    priceBySymbol.set(symbol, getCloseForDate(lookup, marketDays, fallbackPrice));
  });

  const quantities = new Map<string, number>();
  snapshot.positions.forEach((position) => {
    quantities.set(position.symbol, position.quantity);
  });
  let cash = getCurrentPortfolioCash(snapshot);

  const tradesByDay = new Map<string, typeof trades>();
  trades.forEach((trade) => {
    const tradeDate = parseIbkrDate(trade.tradeDate ?? trade.dateTime);
    if (!tradeDate) return;
    const isoDay = toIsoDay(tradeDate);
    const dayTrades = tradesByDay.get(isoDay) ?? [];
    dayTrades.push(trade);
    tradesByDay.set(isoDay, dayTrades);
  });

  const transfersByDay = new Map<string, typeof snapshot.transfers>();
  snapshot.transfers.forEach((transfer) => {
    const transferDate = parseIbkrDate(transfer.dateTime ?? transfer.date ?? transfer.settleDate);
    if (!transferDate) return;
    const isoDay = toIsoDay(transferDate);
    const dayTransfers = transfersByDay.get(isoDay) ?? [];
    dayTransfers.push(transfer);
    transfersByDay.set(isoDay, dayTransfers);
  });

  const descendingDays = [...marketDays].sort((left, right) => right.localeCompare(left));
  const rawSeries: Array<{date: string; portfolioValue: number; spyValue: number}> = [];

  for (const day of descendingDays) {
    let portfolioValue = 0;
    for (const symbol of symbols) {
      const quantity = quantities.get(symbol) ?? 0;
      if (quantity === 0) continue;
      const symbolPrices = priceBySymbol.get(symbol);
      const close = symbolPrices?.get(day) ?? 0;
      portfolioValue += quantity * close;
    }

    rawSeries.push({
      date: day,
      portfolioValue: portfolioValue + cash,
      spyValue: spyByDate.get(day) ?? 0,
    });

    const sameDayTrades = tradesByDay.get(day) ?? [];
    sameDayTrades.forEach((trade) => {
      const currentQuantity = quantities.get(trade.symbol) ?? 0;
      quantities.set(trade.symbol, currentQuantity - trade.quantity);
      cash -= trade.netCash;
    });

    const sameDayTransfers = transfersByDay.get(day) ?? [];
    sameDayTransfers.forEach((transfer) => {
      if (transfer.symbol) {
        const currentQuantity = quantities.get(transfer.symbol) ?? 0;
        quantities.set(transfer.symbol, currentQuantity - transfer.quantity);
      }
      cash -= transfer.cashTransfer;
    });
  }

  const ascendingSeries = rawSeries.reverse();
  const portfolioBase = ascendingSeries[0]?.portfolioValue ?? 0;
  const spyBase = ascendingSeries[0]?.spyValue ?? 0;

  const normalizedSeries: IBKRChartPoint[] = ascendingSeries.map((point) => ({
    date: new Date(`${point.date}T00:00:00Z`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    fullDate: point.date,
    portfolio: portfolioBase > 0 ? ((point.portfolioValue / portfolioBase) - 1) * 100 : 0,
    spy: spyBase > 0 ? ((point.spyValue / spyBase) - 1) * 100 : 0,
    portfolioValue: point.portfolioValue,
    spyValue: point.spyValue,
  }));

  const windowStart = getWindowStart(range, floorDate);
  const windowIsoDay = toIsoDay(windowStart);
  const series = normalizedSeries.filter((point) => point.fullDate >= windowIsoDay);

  return {
    range,
    sinceDate: floorIsoDay,
    series,
    metrics: buildMetrics(series),
  };
}
