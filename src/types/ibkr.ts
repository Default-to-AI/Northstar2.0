export type IBKRSource = 'ibkr-flex';

export interface IBKRNav {
  startingValue: number;
  endingValue: number;
  depositsWithdrawals: number;
  twr: number;
  markToMarket: number;
  fromDate: string | null;
  toDate: string | null;
}

export interface IBKRCash {
  startingCash: number;
  endingCash: number;
  endingSettledCash: number;
  depositsWithdrawals: number;
  dividends: number;
  netTradesSales: number;
  netTradesPurchases: number;
  interest?: number;
  withholdingTax?: number;
  brokerFees?: number;
  currency?: string;          // e.g. 'USD', 'ILS' – present when API adds multi-currency breakdown
  fxRateToBase?: number;      // FX rate for multi-currency cash entries
}

export interface IBKRPosition {
  symbol: string;
  description: string;
  conid: string;
  securityId: string;
  securityIdType: string;
  cusip: string;
  isin: string;
  figi: string;
  accountId: string;
  accountAlias: string;
  model: string;
  currency: string;
  fxRateToBase: number;
  assetClass: string;
  subCategory: string;
  listingExchange: string;
  underlyingConid: string;
  underlyingSymbol: string;
  underlyingSecurityId: string;
  underlyingListingExchange: string;
  issuer: string;
  issuerCountryCode: string;
  multiplier: number;
  strike: number;
  expiry: string | null;
  putCall: string;
  principalAdjustFactor: number;
  reportDate: string | null;
  quantity: number;
  markPrice: number;
  positionValue: number;
  openPrice: number;
  costBasisPrice: number;
  costBasisMoney: number;
  percentOfNav: number;
  unrealizedPnL: number;
  side: string;
  levelOfDetail: string;
  openDateTime: string | null;
  holdingPeriodDateTime: string | null;
  vestingDate: string | null;
  code: string;
  originatingOrderId: string;
  originatingTransactionId: string;
}

export interface IBKRTrade {
  accountId: string;
  accountAlias: string;
  model: string;
  currency: string;
  fxRateToBase: number;
  assetClass: string;
  subCategory: string;
  symbol: string;
  description: string;
  conid: string;
  securityId: string;
  securityIdType: string;
  cusip: string;
  isin: string;
  figi: string;
  listingExchange: string;
  underlyingConid: string;
  underlyingSymbol: string;
  underlyingSecurityId: string;
  underlyingListingExchange: string;
  issuer: string;
  issuerCountryCode: string;
  tradeId: string;
  multiplier: number;
  relatedTradeId: string;
  strike: number;
  reportDate: string | null;
  expiry: string | null;
  dateTime: string | null;
  putCall: string;
  tradeDate: string | null;
  principalAdjustFactor: number;
  settleDateTarget: string | null;
  transactionType: string;
  exchange: string;
  quantity: number;
  tradePrice: number;
  tradeMoney: number;
  proceeds: number;
  taxes: number;
  ibCommission: number;
  ibCommissionCurrency: string;
  netCash: number;
  closePrice: number;
  openCloseIndicator: string;
  notes: string;
  costBasis: number;
  realizedPnL: number;
  mtmPnL: number;
  origTradePrice: number;
  origTradeDate: string | null;
  origTradeId: string;
  origOrderId: string;
  origTransactionId: string;
  buySell: string;
  clearingFirmId: string;
  ibOrderId: string;
  transactionId: string;
  ibExecutionId: string;
  relatedTransactionId: string;
  rtn: string;
  brokerageOrderId: string;
  orderReference: string;
  volatilityOrderLink: string;
  exchOrderId: string;
  externalExecutionId: string;
  orderTime: string | null;
  openDateTime: string | null;
  holdingPeriodDateTime: string | null;
}

export interface IBKRTransfer {
  accountId: string;
  accountAlias: string;
  model: string;
  currency: string;
  fxRateToBase: number;
  assetClass: string;
  subCategory: string;
  symbol: string;
  description: string;
  conid: string;
  securityId: string;
  securityIdType: string;
  cusip: string;
  isin: string;
  figi: string;
  listingExchange: string;
  underlyingConid: string;
  underlyingSymbol: string;
  underlyingSecurityId: string;
  underlyingListingExchange: string;
  issuer: string;
  issuerCountryCode: string;
  multiplier: number;
  strike: number;
  expiry: string | null;
  putCall: string;
  principalAdjustFactor: number;
  reportDate: string | null;
  date: string | null;
  dateTime: string | null;
  settleDate: string | null;
  type: string;
  direction: string;
  transferCompany: string;
  transferAccount: string;
  transferAccountName: string;
  deliveringBroker: string;
  quantity: number;
  transferPrice: number;
  positionAmount: number;
  positionAmountInBase: number;
  pnlAmount: number;
  pnlAmountInBase: number;
  cashTransfer: number;
  code: string;
  clientReference: string;
  transactionId: string;
}

export interface IBKRFundLine {
  accountId: string;
  accountAlias: string;
  model: string;
  currency: string;
  fxRateToBase: number;
  assetClass: string;
  subCategory: string;
  symbol: string;
  description: string;
  conid: string;
  securityId: string;
  securityIdType: string;
  cusip: string;
  isin: string;
  figi: string;
  listingExchange: string;
  underlyingConid: string;
  underlyingSymbol: string;
  underlyingSecurityId: string;
  underlyingListingExchange: string;
  issuer: string;
  issuerCountryCode: string;
  multiplier: number;
  strike: number;
  expiry: string | null;
  putCall: string;
  principalAdjustFactor: number;
  reportDate: string | null;
  date: string | null;
  settleDate: string | null;
  activityCode: string;
  activityDescription: string;
  tradeId: string;
  relatedTradeId: string;
  orderId: string;
  buySell: string;
  tradeQuantity: number;
  tradePrice: number;
  tradeGross: number;
  tradeCommission: number;
  tradeTax: number;
  debit: number;
  credit: number;
  amount: number;
  tradeCode: string;
  balance: number;
  levelOfDetail: string;
  transactionId: string;
  origTransactionId: string;
  relatedTransactionId: string;
}

export interface IBKRPerformanceRow {
  accountId: string;
  accountAlias: string;
  model: string;
  assetClass: string;
  subCategory: string;
  symbol: string;
  description: string;
  conid: string;
  securityId: string;
  securityIdType: string;
  cusip: string;
  isin: string;
  figi: string;
  listingExchange: string;
  underlyingConid: string;
  underlyingSymbol: string;
  underlyingSecurityId: string;
  underlyingListingExchange: string;
  issuer: string;
  issuerCountryCode: string;
  multiplier: number;
  strike: number;
  expiry: string | null;
  putCall: string;
  principalAdjustFactor: number;
  reportDate: string | null;
  costAdjustment: number;
  realizedShortTermProfit: number;
  realizedShortTermLoss: number;
  realizedLongTermProfit: number;
  realizedLongTermLoss: number;
  totalRealizedPnL: number;
  unrealizedProfit: number;
  unrealizedLoss: number;
  unrealizedShortTermProfit: number;
  unrealizedShortTermLoss: number;
  unrealizedLongTermProfit: number;
  unrealizedLongTermLoss: number;
  totalUnrealizedPnL: number;
  totalRealizedAndUnrealizedPnL: number;
  transferredPnL: number;
}

export interface IBKRInstrument {
  currency: string;
  assetClass: string;
  subCategory: string;
  symbol: string;
  description: string;
  conid: string;
  securityId: string;
  securityIdType: string;
  cusip: string;
  isin: string;
  figi: string;
  listingExchange: string;
  underlyingConid: string;
  underlyingSymbol: string;
  underlyingSecurityId: string;
  underlyingListingExchange: string;
  issuer: string;
  issuerCountryCode: string;
  multiplier: number;
  strike: number;
  expiry: string | null;
  putCall: string;
  principalAdjustFactor: number;
  maturity: string | null;
  issueDate: string | null;
  underlyingCategory: string;
  settlementPolicyMethod: string;
  code: string;
}

export interface IBKRPortfolioSnapshot {
  syncedAt: string;
  source: IBKRSource;
  nav: IBKRNav;
  cash: IBKRCash;
  positions: IBKRPosition[];
  trades: IBKRTrade[];
  transfers: IBKRTransfer[];
  funds: IBKRFundLine[];
  performance: IBKRPerformanceRow[];
  instruments: IBKRInstrument[];
}

export interface IBKRChartPoint {
  date: string;
  fullDate: string;
  portfolio: number;
  spy: number;
  portfolioValue: number;
  spyValue: number;
}

export interface IBKRTimeframeMetrics {
  portfolioReturnPct: number;
  spyReturnPct: number;
  alphaPct: number;
  startDate: string;
  endDate: string;
}

export interface IBKRPortfolioAnalytics {
  range: '1y' | 'ytd' | 'mtd';
  sinceDate: string;
  series: IBKRChartPoint[];
  metrics: IBKRTimeframeMetrics;
}
