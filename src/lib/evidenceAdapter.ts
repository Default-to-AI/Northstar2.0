import type {FinancialMetric, QuickStat} from '../types/mockData';

type EvidenceHistoryPoint = {
  date: string;
  close?: number;
  trailingPE?: number;
  currentPrice?: number;
};

export type EvidencePacket = {
  ticker: string;
  valuation?: {
    marketCap?: number | null;
    trailingPE?: number | null;
    forwardPE?: number | null;
    priceToSales?: number | null;
    evToEbitda?: number | null;
  };
  fundamentals?: {
    revenueGrowth?: number | null;
    grossMargin?: number | null;
    operatingMargin?: number | null;
    profitMargins?: number | null;
    eps?: number | null;
    ebitda?: number | null;
  };
  financialStrength?: {
    debtToEquity?: number | null;
    currentRatio?: number | null;
    roe?: number | null;
    roic?: number | null;
  };
  technicals?: {
    currentPrice?: number | null;
  };
  history?: {
    valuation?: EvidenceHistoryPoint[];
    momentum?: EvidenceHistoryPoint[];
  };
};

type BuilderStockData = {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  percentChange: number;
  badgeType: 'neutral';
};

function formatNumber(value: number | null | undefined): string {
  return value !== null && value !== undefined ? value.toFixed(2) : 'N/A';
}

export function mapLiveToBuilderData(data: EvidencePacket | null): {
  appleStockData: BuilderStockData | null;
  quickStats: QuickStat[];
  financialMetrics: FinancialMetric[];
} {
  if (!data) return {appleStockData: null, quickStats: [], financialMetrics: []};

  const appleStockData: BuilderStockData = {
    symbol: data.ticker,
    name: data.ticker,
    currentPrice: data.technicals?.currentPrice ?? 0,
    priceChange: 0,
    percentChange: 0,
    badgeType: 'neutral',
  };

  const quickStats: QuickStat[] = [
    {
      label: 'Valuation',
      value: data.valuation?.marketCap ? `$${(data.valuation.marketCap / 1e9).toFixed(1)}B` : 'N/A',
      details: [
        {label: 'Market Cap', value: data.valuation?.marketCap ? `$${(data.valuation.marketCap / 1e9).toFixed(1)}B` : 'N/A'},
        {label: 'Trailing P/E', value: formatNumber(data.valuation?.trailingPE)},
        {label: 'Forward P/E', value: formatNumber(data.valuation?.forwardPE)},
        {label: 'Price to Sales', value: formatNumber(data.valuation?.priceToSales)},
        {label: 'EV to EBITDA', value: formatNumber(data.valuation?.evToEbitda)},
      ],
    },
    {
      label: 'Fundamentals',
      value: data.fundamentals?.revenueGrowth ? `${(data.fundamentals.revenueGrowth * 100).toFixed(1)}% Rev Growth` : 'N/A',
      details: [
        {label: 'Gross Margin', value: data.fundamentals?.grossMargin ? `${(data.fundamentals.grossMargin * 100).toFixed(1)}%` : 'N/A'},
        {label: 'Op Margin', value: data.fundamentals?.operatingMargin ? `${(data.fundamentals.operatingMargin * 100).toFixed(1)}%` : 'N/A'},
        {label: 'Net Margin', value: data.fundamentals?.profitMargins ? `${(data.fundamentals.profitMargins * 100).toFixed(1)}%` : 'N/A'},
        {label: 'EPS', value: formatNumber(data.fundamentals?.eps)},
        {label: 'EBITDA', value: data.fundamentals?.ebitda ? `$${(data.fundamentals.ebitda / 1e9).toFixed(1)}B` : 'N/A'},
      ],
    },
    {
      label: 'Financial Strength',
      value: data.financialStrength?.debtToEquity ? `${data.financialStrength.debtToEquity.toFixed(2)}x D/E` : 'N/A',
      details: [
        {label: 'Debt to Equity', value: formatNumber(data.financialStrength?.debtToEquity)},
        {label: 'Current Ratio', value: formatNumber(data.financialStrength?.currentRatio)},
        {label: 'ROE', value: data.financialStrength?.roe ? `${(data.financialStrength.roe * 100).toFixed(1)}%` : 'N/A'},
        {label: 'ROIC', value: data.financialStrength?.roic ? `${(data.financialStrength.roic * 100).toFixed(1)}%` : 'N/A'},
      ],
    },
  ];

  const financialMetrics: FinancialMetric[] = [];
  if (data.history?.valuation) {
    const sorted = [...data.history.valuation].sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime());
    financialMetrics.push({
      name: 'Valuation History',
      type: 'area',
      color: 'chart-blue',
      unit: 'x',
      data: sorted.map((value) => ({date: value.date, value: value.trailingPE ?? value.close ?? 0})),
    });
  }

  if (data.history?.momentum) {
    const sorted = [...data.history.momentum].sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime());
    financialMetrics.push({
      name: 'Momentum History',
      type: 'line',
      color: 'chart-green',
      unit: '$',
      data: sorted.map((value) => ({date: value.date, value: value.currentPrice ?? value.close ?? 0})),
    });
  }

  return {appleStockData, quickStats, financialMetrics};
}
