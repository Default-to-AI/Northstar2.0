export type Sector = string;

export type ThesisHealth = 'GREEN' | 'YELLOW' | 'RED' | 'NONE';

export interface Thesis {
  health: ThesisHealth;
  why: string;
  invalidation: string;
  stopLevel: number;
  reviewTriggers: string;
  notes: string;
}

export interface Position {
  id: string;
  ticker: string;
  shares: number;
  avgCost: number;
  sector: Sector;
  currentPrice?: number;
  manualStop?: number;
  thesis?: string;
  thesisData?: Thesis;
  name?: string;
  assetClass?: string;
  subCategory?: string;
  listingExchange?: string;
  issuerCountryCode?: string;
  percentOfNav?: number;
  reportDate?: string | null;
  brokerSource?: boolean;
  accountId?: string;
  accountAlias?: string;
  conid?: string;
  cusip?: string;
  isin?: string;
  figi?: string;
}

export type Verdict = 'BUY' | 'ADD' | 'HOLD' | 'TRIM' | 'SELL' | 'WATCH';
export type Outcome = 'CORRECT' | 'INCORRECT' | 'PENDING';

export interface ArchiveSession {
  id: string;
  ticker: string;
  date: string;
  verdict: Verdict;
  convictionScore: number;
  summary: string;
  personaScores: {
    M: number;
    H: number;
    C: number;
    Mi: number;
    Ca: number;
  };
  outcome: Outcome;
  outcomeText: string;
  fullTranscript: unknown;
}

export type WatchReason = 'POPULAR' | 'UNDERVALUED' | 'WAITING FOR ENTRY' | 'RESEARCHING';

export interface WatchlistItem {
  id: string;
  ticker: string;
  thesis: string;
  targetPrice: number;
  criteria: string;
  reason: WatchReason;
  personas: {
    M: boolean;
    H: boolean;
    C: boolean;
    Mi: boolean;
    Ca: boolean;
  };
  archived: boolean;
  createdAt: string;
}

export interface PortfolioMetrics {
  totalValue: number;
  totalCostBasis: number;
  totalPnL: number;
  pnlPercentage: number;
  cash: number;
}

export interface InvestorProfile {
  activeCapital: number;
  totalNetWorth: number;
  maxPositionSize: number;
  minPositionSize: number;
  cashFloor: number;
  defaultStopLoss: number;
  vixThreshold: number;
  positionSizeReduction: number;
  minConvictionScore: number;
  psychology: 'Aggressive Accumulator' | 'Conviction-Driven' | 'Defensive';
}

export interface NewsItem {
  id: string;
  ticker: string;
  headline: string;
  source: string;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: 'Earnings' | 'Fed Meeting' | 'CPI/PPI' | 'Macro';
}
