export type Sector = 
  | 'Technology' 
  | 'Financials' 
  | 'Consumer Discretionary' 
  | 'Industrials' 
  | 'Health Care' 
  | 'Energy' 
  | 'Communication Services'
  | 'Consumer Staples'
  | 'Utilities'
  | 'Real Estate'
  | 'Materials'
  | 'Other';

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
  fullTranscript: any;
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
  maxPositionSize: number; // percentage
  minPositionSize: number; // dollar amount
  cashFloor: number; // percentage
  defaultStopLoss: number; // percentage
  vixThreshold: number;
  positionSizeReduction: number; // percentage
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
