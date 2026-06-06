import YahooFinance from 'yahoo-finance2';
import { getFmpFundamentals } from './fmp';
import { getAlphaVantageFundamentals } from './alphaVantage';

const parseAV = (val: any) => (val === 'None' || !val) ? null : parseFloat(val);

function mapAVToFMP(avData: any) {
  const mapList = (incList: any[], balList: any[], cfList: any[]) => {
    const maxLen = Math.max(incList.length, balList.length, cfList.length);
    const result = [];
    for (let i = 0; i < maxLen; i++) {
      const inc = incList[i] || {};
      const bal = balList[i] || {};
      const cf = cfList[i] || {};
      const date = inc.fiscalDateEnding || bal.fiscalDateEnding || cf.fiscalDateEnding;
      if (!date) continue;

      result.push({
        date,
        revenue: parseAV(inc.totalRevenue),
        ebitda: parseAV(inc.ebitda),
        netIncome: parseAV(inc.netIncome),
        eps: parseAV(inc.reportedEPS),
        operatingIncome: parseAV(inc.operatingIncome),
        grossProfit: parseAV(inc.grossProfit),
        
        totalAssets: parseAV(bal.totalAssets),
        totalCurrentAssets: parseAV(bal.totalCurrentAssets),
        totalCurrentLiabilities: parseAV(bal.totalCurrentLiabilities),
        totalDebt: (parseAV(bal.shortTermDebt) || 0) + (parseAV(bal.longTermDebtNoncurrent) || parseAV(bal.longTermDebt) || 0),
        longTermDebt: (parseAV(bal.longTermDebtNoncurrent) || parseAV(bal.longTermDebt) || 0),
        cashAndCashEquivalents: parseAV(bal.cashAndShortTermInvestments),
        commonStockSharesOutstanding: parseAV(bal.commonStockSharesOutstanding),
        
        operatingCashFlow: parseAV(cf.operatingCashflow),
        freeCashFlow: (parseAV(cf.operatingCashflow) || 0) - Math.abs(parseAV(cf.capitalExpenditures) || 0),
        stockBasedCompensation: parseAV(cf.stockBasedCompensation),
        dividendsPaid: parseAV(cf.dividendPayout) ? -Math.abs(parseAV(cf.dividendPayout)) : null,
        commonStockRepurchased: parseAV(cf.proceedsFromRepurchaseOfEquity) ? -Math.abs(parseAV(cf.proceedsFromRepurchaseOfEquity)) : null,
      });
    }
    return result;
  };
  
  const annual = mapList(avData.income?.annualReports || [], avData.balance?.annualReports || [], avData.cashFlow?.annualReports || []);
  const quarterly = mapList(avData.income?.quarterlyReports || [], avData.balance?.quarterlyReports || [], avData.cashFlow?.quarterlyReports || []);

  return {
    annual: {
      income: annual, balance: annual, cashFlow: annual,
      metrics: [{ 
        peRatio: parseAV(avData.overview?.PERatio),
        pegRatio: parseAV(avData.overview?.PEGRatio),
        pbRatio: parseAV(avData.overview?.PriceToBookRatio),
        priceToSalesRatio: parseAV(avData.overview?.PriceToSalesRatioTTM),
        enterpriseValueMultiple: parseAV(avData.overview?.EVToEBITDA),
        evToSales: parseAV(avData.overview?.EVToRevenue),
        roe: parseAV(avData.overview?.ReturnOnEquityTTM),
        roa: parseAV(avData.overview?.ReturnOnAssetsTTM),
      }]
    },
    quarterly: {
      income: quarterly, balance: quarterly, cashFlow: quarterly
    }
  };
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface DataNormalizationEvent {
  ticker: string;
  metric: string;
  sources: { name: string; value: number }[];
  median: number;
  outlierSource: string;
  deviation: number; // percentage
  timestamp: string;
  note?: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function computeMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function validateMetric(
  ticker: string,
  metricName: string,
  sources: { name: string; value: number | null | undefined }[],
  thresholdPct: number = 2
): { validatedValue: number | null; events: DataNormalizationEvent[] } {
  const valid = sources.filter((s): s is { name: string; value: number } =>
    s.value !== null && s.value !== undefined && Number.isFinite(s.value) && s.value !== 0
  );
  if (valid.length === 0) return { validatedValue: null, events: [] };
  if (valid.length === 1) return { validatedValue: valid[0].value, events: [] };

  const median = computeMedian(valid.map(s => s.value));
  const events: DataNormalizationEvent[] = [];

  for (const source of valid) {
    const deviation = Math.abs((source.value - median) / median) * 100;
    if (deviation > thresholdPct) {
      events.push({
        ticker,
        metric: metricName,
        sources: valid.map(s => ({ name: s.name, value: s.value })),
        median,
        outlierSource: source.name,
        deviation: parseFloat(deviation.toFixed(4)),
        timestamp: new Date().toISOString(),
      });
    }
  }

  // If there were outliers, use the median; otherwise use the first source (Yahoo preferred)
  const validatedValue = events.length > 0 ? median : valid[0].value;
  return { validatedValue, events };
}

// ── Finnhub Metrics ─────────────────────────────────────────────────────────

export async function fetchFinnhubMetrics(ticker: string): Promise<Record<string, number | null>> {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return {};

  try {
    const url = new URL('https://finnhub.io/api/v1/stock/metric');
    url.searchParams.set('symbol', ticker);
    url.searchParams.set('metric', 'all');
    url.searchParams.set('token', apiKey);
    const res = await fetch(url.toString());
    if (!res.ok) return {};
    const data = await res.json() as { metric?: Record<string, any> };
    const m = data.metric || {};
    return {
      peBasicExclExtraTTM: m.peBasicExclExtraTTM ?? null,
      peExclExtraTTM: m.peExclExtraTTM ?? null,
      currentEvEbitdaTTM: m['currentEv/ebitdaTTM'] ?? m.currentEvEbitdaTTM ?? null,
      evEbitda: m['ev/ebitdaTTM'] ?? null,
    };
  } catch (e) {
    console.error('Finnhub Metrics Error:', e);
    return {};
  }
}

export async function fetchYahooQuote(ticker: string) {
  try {
    const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
    const result = await yf.quoteSummary(ticker, { 
      modules: ['price', 'summaryDetail', 'assetProfile', 'financialData', 'defaultKeyStatistics', 'earningsTrend'] 
    });
    return result;
  } catch (e) {
    console.error('Yahoo Finance Error:', e);
    return null;
  }
}

type HistoricalPricePoint = {
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  price: number | null;
  volume: number | null;
};

function toNullableNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

export async function fetchPriceHistoryYFinance(ticker: string): Promise<HistoricalPricePoint[]> {
  try {
    const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
    const period1 = new Date();
    period1.setFullYear(period1.getFullYear() - 10);

    const chart = await yf.chart(ticker, { period1: period1.toISOString().slice(0, 10), interval: '1d' });
    const quotes = Array.isArray(chart.quotes) ? chart.quotes : [];

    return quotes
      .filter((quote) => quote?.date)
      .map((quote) => ({
        date: new Date(quote.date).toISOString().slice(0, 10),
        open: toNullableNumber(quote.open),
        high: toNullableNumber(quote.high),
        low: toNullableNumber(quote.low),
        close: toNullableNumber(quote.close),
        price: toNullableNumber(quote.close),
        volume: toNullableNumber(quote.volume),
      }))
      .filter((quote) => quote.price !== null)
      .reverse();
  } catch (e) {
    console.error('Failed to fetch price history via yahoo-finance2', e);
    return [];
  }
}

export async function fetchFinnhubNews(ticker: string) {
  const apiKey = process.env.VITE_FINNHUB_KEY;
  if (!apiKey) return null;
  
  try {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const url = new URL('https://finnhub.io/api/v1/company-news');
    url.searchParams.set('symbol', ticker);
    url.searchParams.set('from', weekAgo);
    url.searchParams.set('to', today);
    url.searchParams.set('token', apiKey);
    
    const res = await fetch(url.toString());
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('Finnhub Error:', e);
    return null;
  }
}



export async function aggregateInsightsData(ticker: string) {
  const [
    yahooQuote,
    finnhubNews,
    historicalPriceData
  ] = await Promise.all([
    fetchYahooQuote(ticker),
    fetchFinnhubNews(ticker),
    fetchPriceHistoryYFinance(ticker)
  ]);

  let provider = 'FMP';
  let fmpData: any = null;
  const [avData, fmpRatiosRaw] = await Promise.all([
    getAlphaVantageFundamentals(ticker),
    import('./fmp').then(m => m.fetchFMPEndpoint(ticker, 'stable/ratios', 'limit=5&period=annual'))
  ]);

  if (avData) {
    fmpData = mapAVToFMP(avData);
    provider = 'AlphaVantage';
    console.log(`[DataAggregator] Using AlphaVantage data for ${ticker}`);
  } else {
    fmpData = await import('./fmp').then(m => m.getFmpFundamentals(ticker));
    provider = 'FMP';
    console.log(`[DataAggregator] Using FMP data for ${ticker}`);
  }

  // Ensure fmpRatiosRaw is properly set into fmpData
  console.log(`[DataAggregator] fmpRatiosRaw:`, fmpRatiosRaw?.length ? 'Array with ' + fmpRatiosRaw.length + ' items' : fmpRatiosRaw);
  if (fmpRatiosRaw && Array.isArray(fmpRatiosRaw)) {
    if (!fmpData.annual.ratios) fmpData.annual.ratios = [];
    fmpData.annual.ratios = fmpRatiosRaw;
  }

  const { annual: aData, quarterly: qData, ttm: ttmData = {}, pricing = {}, indexes = {} } = fmpData;
  pricing.historical = historicalPriceData;
  
  const qIncome = qData.income || [];
  const qBalance = qData.balance || [];
  const qCashFlow = qData.cashFlow || [];

  const aIncome = aData.income || [];
  const aBalance = aData.balance || [];
  const aCashFlow = aData.cashFlow || [];
  const aMetrics = aData.metrics || [];

  const keyMetricsTtm = ttmData.keyMetrics?.[0] || {};
  const ratiosTtm = ttmData.ratios?.[0] || {};
  const financialScores = ttmData.scores?.[0] || {};

  const currentQInc = qIncome[0] || {};
  const priorQInc = qIncome[4] || {}; // 4 quarters ago (1 year)

  // Valuation — Multi-Tier P/E Architecture
  const marketCap = keyMetricsTtm.marketCap ?? yahooQuote?.price?.marketCap;
  const currentPrice = yahooQuote?.price?.regularMarketPrice;

  // P/E (TTM) — from Yahoo trailing 4-quarter net income
  let peTtmYahoo = yahooQuote?.summaryDetail?.trailingPE ?? null;
  if (peTtmYahoo === null && currentPrice && yahooQuote?.defaultKeyStatistics?.trailingEps) {
    const trailingEps = yahooQuote.defaultKeyStatistics.trailingEps;
    if (trailingEps !== 0) {
      peTtmYahoo = currentPrice / trailingEps;
    }
  }
  // P/E (NTM) — from Yahoo forward consensus 12-month earnings
  const peNtmYahoo = yahooQuote?.summaryDetail?.forwardPE ?? null;

  // P/E (2027) — extrapolate from earningsTrend long-term growth rate
  let peFy2027: number | null = null;
  try {
    const trends = yahooQuote?.earningsTrend?.trend || [];
    // Find the next-year EPS estimate
    const nextYearTrend = trends.find((t: any) => t.period === '+1y');
    const nextYearEps = nextYearTrend?.earningsEstimate?.avg;
    // Find long-term growth rate (usually 5yr forward)
    const ltgTrend = trends.find((t: any) => t.period === '+5y');
    const rawLtg = ltgTrend?.growth ?? nextYearTrend?.growth;
    const ltgRate = typeof rawLtg === 'number' ? rawLtg : (rawLtg as any)?.avg ?? null;
    if (nextYearEps && ltgRate && currentPrice && ltgRate > -1) {
      // Current year is the base; project forward to 2027
      const currentYear = new Date().getFullYear();
      const yearsToProject = Math.max(2027 - (currentYear + 1), 1); // years from next FY to 2027
      const projected2027Eps = nextYearEps * Math.pow(1 + ltgRate, yearsToProject);
      if (projected2027Eps > 0) {
        peFy2027 = currentPrice / projected2027Eps;
      }
    }
  } catch (e) {
    console.error('P/E 2027 projection error:', e);
  }

  // FMP P/E
  const peFmp = aMetrics[0]?.peRatio ?? null;

  // Finnhub P/E
  const finnhubMetrics = await fetchFinnhubMetrics(ticker);
  const peFinnhub = finnhubMetrics.peExclExtraTTM ?? finnhubMetrics.peBasicExclExtraTTM ?? null;

  // ── Cross-source validation for P/E TTM ──
  const peValidation = validateMetric(ticker, 'PE_TTM', [
    { name: 'Yahoo', value: peTtmYahoo },
    { name: 'FMP', value: peFmp },
    { name: 'Finnhub', value: peFinnhub },
  ]);
  const peTtm = peValidation.validatedValue;
  const normalizationEvents: DataNormalizationEvent[] = [...peValidation.events];

  // ── Other valuation metrics ──
  const ps = ratiosTtm.priceToSalesRatioTTM ?? yahooQuote?.summaryDetail?.priceToSalesTrailing12Months;
  const pb = ratiosTtm.priceToBookRatioTTM ?? yahooQuote?.defaultKeyStatistics?.priceToBook;

  // ── EV/EBITDA Normalization (SBC add-back) ──
  const evEbitdaRaw = keyMetricsTtm.evToEBITDATTM ?? yahooQuote?.defaultKeyStatistics?.enterpriseToEbitda;
  const enterpriseValue = keyMetricsTtm.enterpriseValueTTM ?? yahooQuote?.defaultKeyStatistics?.enterpriseValue;
  const reportedEbitda = yahooQuote?.financialData?.ebitda;

  // Extract SBC from Yahoo financialData or AV cash flow
  let sbcAddBack: number | null = null;
  // Yahoo sometimes exposes SBC in cashflowStatementHistory; try financialData first
  const yahooCfSbc = (yahooQuote as any)?.cashflowStatementHistory
    ?.cashflowStatements?.[0]?.stockBasedCompensation ?? null;
  if (yahooCfSbc && typeof yahooCfSbc === 'number') {
    sbcAddBack = Math.abs(yahooCfSbc);
  }
  // Fallback to FMP cash flow (quarterly TTM if available, else most recent annual)
  if (!sbcAddBack) {
    if (qCashFlow.length > 0) {
      // Sum last 4 quarters for TTM SBC
      let ttmSbc = 0;
      let foundAny = false;
      for (let i = 0; i < Math.min(4, qCashFlow.length); i++) {
        const val = qCashFlow[i].stockBasedCompensation ?? null;
        if (val !== null) {
          ttmSbc += Math.abs(val);
          foundAny = true;
        }
      }
      if (foundAny) sbcAddBack = ttmSbc;
    } else if (aCashFlow.length > 0) {
      const val = aCashFlow[0].stockBasedCompensation ?? null;
      if (val !== null) {
        sbcAddBack = Math.abs(val);
      }
    }
  }

  // Compute normalized EV/EBITDA
  let evEbitdaNormalized: number | null = null;
  if (enterpriseValue && reportedEbitda && sbcAddBack) {
    const normalizedEbitda = reportedEbitda + sbcAddBack;
    if (normalizedEbitda > 0) {
      evEbitdaNormalized = enterpriseValue / normalizedEbitda;
    }
  } else if (evEbitdaRaw) {
    evEbitdaNormalized = evEbitdaRaw; // fallback when SBC unavailable
  }

  // FMP EV/EBITDA
  const evEbitdaFmp = aMetrics[0]?.enterpriseValueMultiple ?? null;

  // Finnhub EV/EBITDA
  const evEbitdaFinnhub = finnhubMetrics.currentEvEbitdaTTM ?? finnhubMetrics.evEbitda ?? null;

  // ── Cross-source validation for EV/EBITDA ──
  const evValidation = validateMetric(ticker, 'EV_EBITDA', [
    { name: 'Yahoo', value: evEbitdaNormalized },
    { name: 'FMP', value: evEbitdaFmp },
    { name: 'Finnhub', value: evEbitdaFinnhub },
  ]);
  const evEbitdaValidated = evValidation.validatedValue;
  normalizationEvents.push(...evValidation.events);

  // Add SBC Adjusted flag for payload export
  const sbcAdjusted = sbcAddBack !== null && sbcAddBack > 0;
  
  // Remove SBC_ADJUSTMENT flag logic as requested

  // Log normalization events
  if (normalizationEvents.length > 0) {
    console.warn(`[DataNormalization] ${ticker}: ${normalizationEvents.length} event(s) triggered`);
    for (const evt of normalizationEvents) {
      console.warn(`  → ${evt.metric} outlier from ${evt.outlierSource}: ${evt.deviation.toFixed(2)}% deviation (median: ${evt.median.toFixed(2)})`);
    }
  }

  // Cash Flow
  const fcf = yahooQuote?.financialData?.freeCashflow;
  const fcfYield = keyMetricsTtm.freeCashFlowYieldTTM ?? ((fcf && marketCap) ? fcf / marketCap : undefined);
  
  // ── SBC Adjusted FCF Yield & SBC Impact ──
  let adjFcfYield: number | undefined = undefined;
  let sbcImpact: number | undefined = undefined;
  let adjFcfPerShare: number | undefined = undefined;
  
  const annualFcf = aCashFlow[0]?.freeCashFlow;
  const annualSbc = aCashFlow[0]?.stockBasedCompensation;
  const fcfPerShare = aData.ratios?.[0]?.freeCashFlowPerShare;
  
  if (annualFcf && annualSbc && fcfPerShare && currentPrice) {
    const impliedSharesOut = annualFcf / fcfPerShare;
    if (impliedSharesOut > 0) {
      const sbcPerShare = annualSbc / impliedSharesOut;
      adjFcfPerShare = fcfPerShare - sbcPerShare;
      adjFcfYield = adjFcfPerShare / currentPrice;
    }
    sbcImpact = (annualSbc / annualFcf) * 100;
  }
  
  // Margins
  const profitMargin = ratiosTtm.netProfitMarginTTM ? ratiosTtm.netProfitMarginTTM * 100 : yahooQuote?.financialData?.profitMargins ? yahooQuote.financialData.profitMargins * 100 : undefined;
  const operatingMargin = ratiosTtm.operatingProfitMarginTTM ? ratiosTtm.operatingProfitMarginTTM * 100 : yahooQuote?.financialData?.operatingMargins ? yahooQuote.financialData.operatingMargins * 100 : undefined;
  
  let qEarningsYoY = undefined;
  let qRevenueYoY = undefined;
  const curNetInc = currentQInc.netIncome ?? null;
  const priNetInc = priorQInc.netIncome ?? null;
  if (curNetInc !== null && priNetInc !== null && priNetInc !== 0) {
    qEarningsYoY = ((curNetInc - priNetInc) / Math.abs(priNetInc)) * 100;
  }
  const curRev = currentQInc.revenue ?? null;
  const priRev = priorQInc.revenue ?? null;
  if (curRev !== null && priRev !== null && priRev !== 0) {
    qRevenueYoY = ((curRev - priRev) / Math.abs(priRev)) * 100;
  }

  // Balance Sheet
  const cash = qBalance[0]?.cashAndCashEquivalents ?? aBalance[0]?.cashAndCashEquivalents ?? yahooQuote?.financialData?.totalCash;
  const debt = qBalance[0]?.totalDebt ?? aBalance[0]?.totalDebt ?? yahooQuote?.financialData?.totalDebt;
  const netDebt = qBalance[0]?.netDebt ?? aBalance[0]?.netDebt;
  const netCash = netDebt !== undefined ? -netDebt : ((cash !== undefined && debt !== undefined) ? cash - debt : undefined);
  
  // Dividends
  const divYield = yahooQuote?.summaryDetail?.dividendYield ? yahooQuote.summaryDetail.dividendYield * 100 : undefined;
  const payoutRatio = yahooQuote?.summaryDetail?.payoutRatio ? yahooQuote.summaryDetail.payoutRatio * 100 : undefined;
  const exDivDate = yahooQuote?.summaryDetail?.exDividendDate ? new Date(yahooQuote.summaryDetail.exDividendDate).toLocaleDateString() : undefined;

  // Map FMP data into chart arrays
  const mapChartData = (incList: any[], balList: any[], cfList: any[], isAnnual: boolean) => {
    const maxLen = Math.max(incList.length, balList.length, cfList.length);
    const data = [];
    const limit = Math.min(maxLen, 20);

    for (let i = limit - 1; i >= 0; i--) {
      const inc = incList[i] || {};
      const bal = balList[i] || {};
      const cf = cfList[i] || {};

      const rawDate = inc.date || bal.date || cf.date || '0000-00-00';
      const d = new Date(rawDate);
      const label = isAnnual 
        ? d.getFullYear().toString() 
        : `Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`;

      // FMP dividendsPaid is usually negative, we want positive amount
      const dividends = cf.dividendsPaid ? Math.abs(cf.dividendsPaid) : null;
      // FMP commonStockRepurchased is usually negative
      const repurchases = cf.commonStockRepurchased ? Math.abs(cf.commonStockRepurchased) : null;

      data.push({
        period: label,
        revenue: inc.revenue ?? null,
        ebitda: inc.ebitda ?? null,
        netIncome: inc.netIncome ?? null,
        fcf: cf.freeCashFlow ?? null,
        eps: inc.eps ?? null,
        shares: inc.weightedAverageShsOut ?? null,
        cash: bal.cashAndCashEquivalents ?? null,
        debt: bal.totalDebt ?? null,
        dividends,
        repurchases
      });
    }
    return data;
  };

  const chartDataQuarterly = mapChartData(qIncome, qBalance, qCashFlow, false);
  const chartDataAnnual = mapChartData(aIncome, aBalance, aCashFlow, true);

  // Piotroski Score Calculation
  function computePiotroski(curInc: any, priInc: any, curBal: any, priBal: any, curCf: any, priCf: any): number | null {
    if (!curInc || !priInc || !curBal || !priBal || !curCf || !priCf) return null;
    
    let score = 0;

    const netIncome = curInc.netIncome || 0;
    const priorNetIncome = priInc.netIncome || 0;
    const operatingCashFlow = curCf.operatingCashFlow || 0;
    
    const totalAssets = curBal.totalAssets || 1;
    const priorTotalAssets = priBal.totalAssets || 1;
    
    const longTermDebt = curBal.longTermDebt || 0;
    const priorLongTermDebt = priBal.longTermDebt || 0;
    
    const currentAssets = curBal.totalCurrentAssets || 0;
    const currentLiabilities = curBal.totalCurrentLiabilities || 1;
    const priorCurrentAssets = priBal.totalCurrentAssets || 0;
    const priorCurrentLiabilities = priBal.totalCurrentLiabilities || 1;
    
    const sharesOutstanding = curBal.commonStockSharesOutstanding || curInc.weightedAverageShsOut || 0;
    const priorSharesOutstanding = priBal.commonStockSharesOutstanding || priInc.weightedAverageShsOut || 0;
    
    const grossProfit = curInc.grossProfit || 0;
    const priorGrossProfit = priInc.grossProfit || 0;
    const revenue = curInc.revenue || 1;
    const priorRevenue = priInc.revenue || 1;

    // 1. Net Income > 0
    if (netIncome > 0) score++;
    // 2. Operating Cash Flow > 0
    if (operatingCashFlow > 0) score++;
    // 3. ROA Current > ROA Prior
    if ((netIncome / totalAssets) > (priorNetIncome / priorTotalAssets)) score++;
    // 4. CFO > Net Income (Accrual quality)
    if (operatingCashFlow > netIncome) score++;
    // 5. Long Term Debt / Assets (Current < Prior)
    if ((longTermDebt / totalAssets) < (priorLongTermDebt / priorTotalAssets)) score++;
    // 6. Current Ratio (Current > Prior)
    if ((currentAssets / currentLiabilities) > (priorCurrentAssets / priorCurrentLiabilities)) score++;
    // 7. Shares Outstanding (Current <= Prior)
    if (sharesOutstanding <= priorSharesOutstanding && sharesOutstanding > 0) score++;
    // 8. Gross Margin (Current > Prior)
    if ((grossProfit / revenue) > (priorGrossProfit / priorRevenue)) score++;
    // 9. Asset Turnover (Current > Prior)
    if ((revenue / totalAssets) > (priorRevenue / priorTotalAssets)) score++;

    return score;
  }

  const piotroskiScore = financialScores.piotroskiScore ?? computePiotroski(aIncome[0], aIncome[1], aBalance[0], aBalance[1], aCashFlow[0], aCashFlow[1]);

  // Ratios from FMP Metrics (if available) + fallback to stable ratios
  const curMetrics = aMetrics[0] || {};
  const ratios = {
    peRatio: peTtm ?? curMetrics.peRatio ?? undefined,
    pegRatio: ratiosTtm.priceToEarningsGrowthRatioTTM ?? aData.ratios?.[0]?.priceToEarningsGrowthRatio ?? yahooQuote?.defaultKeyStatistics?.pegRatio ?? curMetrics.pegRatio ?? undefined,
    priceToBook: pb ?? curMetrics.pbRatio ?? undefined,
    priceToSales: ps ?? curMetrics.priceToSalesRatio ?? undefined,
    evToEbitda: evEbitdaValidated ?? curMetrics.enterpriseValueMultiple ?? undefined,
    evToRevenue: keyMetricsTtm.evToSalesTTM ?? curMetrics.evToSales ?? undefined,
    returnOnEquity: keyMetricsTtm.returnOnEquityTTM ? keyMetricsTtm.returnOnEquityTTM * 100 : curMetrics.roe ? curMetrics.roe * 100 : undefined,
    returnOnAssets: keyMetricsTtm.returnOnAssetsTTM ? keyMetricsTtm.returnOnAssetsTTM * 100 : curMetrics.roa ? curMetrics.roa * 100 : undefined,
    profitMargin: profitMargin ?? (aIncome[0]?.revenue && aIncome[0]?.netIncome ? (aIncome[0].netIncome / aIncome[0].revenue) * 100 : undefined),
    operatingMargin: operatingMargin ?? (aIncome[0]?.revenue && aIncome[0]?.operatingIncome ? (aIncome[0].operatingIncome / aIncome[0].revenue) * 100 : undefined),
    freeCashFlowPerShare: aData.ratios?.[0]?.freeCashFlowPerShare ?? undefined,
    dividendPayoutRatio: ratiosTtm.dividendPayoutRatioTTM ?? aData.ratios?.[0]?.dividendPayoutRatio ?? payoutRatio,
    piotroskiScore
  };

  return {
    quote: {
      price: yahooQuote?.price?.regularMarketPrice,
      change: yahooQuote?.price?.regularMarketChange,
      changePercent: yahooQuote?.price?.regularMarketChangePercent ? yahooQuote.price.regularMarketChangePercent * 100 : undefined,
      afterHoursPrice: yahooQuote?.price?.postMarketPrice,
      afterHoursChange: yahooQuote?.price?.postMarketChange,
      afterHoursChangePercent: yahooQuote?.price?.postMarketChangePercent ? yahooQuote.price.postMarketChangePercent * 100 : undefined,
    },
    profile: {
      name: yahooQuote?.price?.longName,
      exchange: yahooQuote?.price?.exchangeName,
      sector: yahooQuote?.assetProfile?.sector,
      industry: yahooQuote?.assetProfile?.industry,
      ceo: yahooQuote?.assetProfile?.companyOfficers?.[0]?.name,
      website: yahooQuote?.assetProfile?.website,
      employees: yahooQuote?.assetProfile?.fullTimeEmployees,
      beta: yahooQuote?.defaultKeyStatistics?.beta,
    },
    valuation: {
      marketCap,
      pe: { ttm: peTtm, ntm: peNtmYahoo, fy2027: peFy2027 },
      ps,
      evEbitda: evEbitdaValidated,
      evEbitdaNormalized,
      sbcAddBack,
      pb,
      normalizationEvents: normalizationEvents.length > 0 ? normalizationEvents : undefined,
    },
    cashFlow: { fcfYield, adjFcfYield, adjFcfPerShare, sbcImpact, sbcAdjusted },
    margins: { profitMargin, operatingMargin, qEarningsYoY, qRevenueYoY },
    balance: { cash, debt, netCash, netDebt },
    dividend: { divYield, payoutRatio, exDivDate },
    ratios,
    news: finnhubNews,
    pricing,
    indexes,
    charts: {
      quarterly: chartDataQuarterly,
      annual: chartDataAnnual
    }
  };
}

export async function aggregateAnalystEstimates(ticker: string) {
  try {
    const result = await YahooFinance.quoteSummary(ticker, { modules: ['earningsTrend'] });
    const trend = (result as any).earningsTrend?.trend || [];
    return trend.map((t: any) => ({
      date: t.period,
      estimatedEpsAvg: t.earningsEstimate?.avg,
      estimatedRevenueAvg: t.revenueEstimate?.avg
    }));
  } catch (e) {
    return [];
  }
}
