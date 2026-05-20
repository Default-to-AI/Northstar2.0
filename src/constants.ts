import { Position, InvestorProfile, WatchlistItem } from "./types";

export const SEED_POSITIONS: Position[] = [
  { id: 'p1', ticker: 'QQQ', shares: 69.2812, avgCost: 597.405, currentPrice: 485.20, sector: 'Technology', thesis: "Core tech exposure" },
  { id: 'p2', ticker: 'GOOG', shares: 36, avgCost: 288.793, currentPrice: 178.45, sector: 'Communication Services', thesis: "AI and search dominance" },
  { id: 'p3', ticker: 'META', shares: 22, avgCost: 606.367, currentPrice: 472.30, sector: 'Communication Services', thesis: "Social graph and AI infrastructure" },
  { id: 'p4', ticker: 'AMZN', shares: 44.7724, avgCost: 233.859, currentPrice: 183.20, sector: 'Consumer Discretionary', thesis: "AWS and margin expansion" },
  { id: 'p5', ticker: 'NFLX', shares: 81.305, avgCost: 91.412, currentPrice: 625.40, sector: 'Communication Services', thesis: "Streaming leadership" },
  { id: 'p6', ticker: 'UBER', shares: 80, avgCost: 71.917, currentPrice: 68.90, sector: 'Industrials', thesis: "Transportation and delivery network effect" },
  { id: 'p7', ticker: 'MSFT', shares: 14, avgCost: 421.212, currentPrice: 423.50, sector: 'Technology', thesis: "Enterprise software and Azure" },
  { id: 'p8', ticker: 'JPM', shares: 15, avgCost: 308.79, currentPrice: 198.60, sector: 'Financials', thesis: "Quality bank and fortress balance sheet" },
  { id: 'p9', ticker: 'IGV', shares: 30, avgCost: 87.355, currentPrice: 84.10, sector: 'Technology', thesis: "Software sector benchmark" },
  { id: 'p10', ticker: 'PLTR', shares: 20, avgCost: 136.145, currentPrice: 21.30, sector: 'Technology', thesis: "Data operating system leader" },
  { id: 'p11', ticker: 'FICO', shares: 2.09, avgCost: 1096.354, currentPrice: 1450.00, sector: 'Financials', thesis: "Credit score pricing power" },
  { id: 'p12', ticker: 'AAPL', shares: 7, avgCost: 269.076, currentPrice: 212.40, sector: 'Technology', thesis: "Strong ecosystem and capital returns" },
  { id: 'p13', ticker: 'TSLA', shares: 2, avgCost: 427.058, currentPrice: 174.80, sector: 'Consumer Discretionary', thesis: "AI/Robotics/EV bet" },
  { id: 'p14', ticker: 'RGTI', shares: 22, avgCost: 20.428, currentPrice: 1.15, sector: 'Technology', thesis: "Quantum computing long-shot" },
];

export const SEED_WATCHLIST: WatchlistItem[] = [
  {
    id: 'w1',
    ticker: 'NVDA',
    thesis: 'Compute dominance is structural',
    targetPrice: 110.00,
    criteria: 'Wait for valuation mean reversion',
    reason: 'WAITING FOR ENTRY',
    personas: { M: true, H: true, C: false, Mi: true, Ca: false },
    archived: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'w2',
    ticker: 'CRWD',
    thesis: 'Endpoint security leader',
    targetPrice: 280.00,
    criteria: 'Growth must stay > 30%',
    reason: 'POPULAR',
    personas: { M: true, H: false, C: false, Mi: false, Ca: true },
    archived: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'w3',
    ticker: 'TSLA',
    thesis: 'FSD inflection potential',
    targetPrice: 180.00,
    criteria: 'Margin stability in auto',
    reason: 'RESEARCHING',
    personas: { M: false, H: false, C: true, Mi: false, Ca: false },
    archived: false,
    createdAt: new Date().toISOString()
  }
];

export const DEFAULT_PROFILE: InvestorProfile = {
  activeCapital: 500000,
  totalNetWorth: 2000000,
  maxPositionSize: 10,
  minPositionSize: 5000,
  cashFloor: 15,
  defaultStopLoss: 8,
  vixThreshold: 25,
  positionSizeReduction: 30,
  minConvictionScore: 7,
  psychology: 'Conviction-Driven',
};
