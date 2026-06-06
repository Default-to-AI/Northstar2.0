import { openResearchDb } from '../server/research/db';

export async function fetchFMPEndpoint(ticker: string, endpoint: string, queryParams: string = ''): Promise<any | null> {
  const apiKey = process.env.VITE_FMP_KEY || process.env.FMP_API_KEY || process.env.FMP_KEY;
  if (!apiKey) {
    console.error('FMP API key is missing. Please set VITE_FMP_KEY in .env');
    return null;
  }

  const db = openResearchDb();
  
  // Ensure cache table exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS fmp_cache (
      ticker TEXT NOT NULL,
      endpoint TEXT,
      params TEXT,
      data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (ticker, endpoint, params)
    )
  `);

  const row = db.prepare('SELECT data, timestamp FROM fmp_cache WHERE ticker = ? AND endpoint = ? AND params = ?').get(ticker, endpoint, queryParams) as { data: string, timestamp: string } | undefined;

  if (row) {
    const cachedTime = new Date(row.timestamp).getTime();
    const now = Date.now();
    const daysOld = (now - cachedTime) / (1000 * 60 * 60 * 24);
    
    // If cache is less than 1 day old, return it
    if (daysOld < 1) {
      console.log(`[FMP Cache] HIT for ${ticker} ${endpoint} (${daysOld.toFixed(1)} days old)`);
      db.close();
      return JSON.parse(row.data);
    } else {
      console.log(`[FMP Cache] EXPIRED for ${ticker} ${endpoint} (${daysOld.toFixed(1)} days old). Refreshing...`);
    }
  } else {
    console.log(`[FMP Cache] MISS for ${ticker} ${endpoint}. Fetching...`);
  }

  try {
    const baseUrl = endpoint.startsWith('stable/') 
      ? `https://financialmodelingprep.com/${endpoint}?symbol=${ticker}&apikey=${apiKey}`
      : `https://financialmodelingprep.com/api/v3/${endpoint}/${ticker}?apikey=${apiKey}`;
    const url = `${baseUrl}${queryParams ? '&' + queryParams : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`FMP Error for ${endpoint} ${ticker}: ${res.statusText}`);
      return row ? JSON.parse(row.data) : null; 
    }
    
    const data = await res.json();
    
    // Check for FMP Error payload
    if (data && data['Error Message']) {
      console.error(`FMP Rate Limit / Error for ${endpoint} ${ticker}:`, data['Error Message']);
      return row ? JSON.parse(row.data) : null;
    }
    
    // Save to Cache if data is valid array or an object with a valid array payload
    if ((Array.isArray(data) && data.length > 0) || (data && Array.isArray(data.historical) && data.historical.length > 0)) {
      const insertStmt = db.prepare(`
        INSERT INTO fmp_cache (ticker, endpoint, params, data, timestamp) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(ticker, endpoint, params) DO UPDATE SET data=excluded.data, timestamp=CURRENT_TIMESTAMP
      `);
      insertStmt.run(ticker, endpoint, queryParams, JSON.stringify(data));
    }

    return data;
  } catch (e) {
    console.error(`FMP Fetch Error for ${endpoint} ${ticker}:`, e);
    return row ? JSON.parse(row.data) : null;
  } finally {
    db.close();
  }
}

export async function getFmpFundamentals(ticker: string) {
  // Fetch Annual (limit 5)
  const aIncome = await fetchFMPEndpoint(ticker, 'stable/income-statement', 'limit=5');
  const aBalance = await fetchFMPEndpoint(ticker, 'stable/balance-sheet-statement', 'limit=5');
  const aCashFlow = await fetchFMPEndpoint(ticker, 'stable/cash-flow-statement', 'limit=5');
  const aMetrics = await fetchFMPEndpoint(ticker, 'stable/key-metrics', 'limit=5');
  const aRatios = await fetchFMPEndpoint(ticker, 'stable/ratios', 'limit=5&period=annual');

  // Fetch Quarterly (limit 5 for free tier)
  const qIncome = await fetchFMPEndpoint(ticker, 'stable/income-statement', 'period=quarter&limit=5');
  const qBalance = await fetchFMPEndpoint(ticker, 'stable/balance-sheet-statement', 'period=quarter&limit=5');
  const qCashFlow = await fetchFMPEndpoint(ticker, 'stable/cash-flow-statement', 'period=quarter&limit=5');

  // Fetch TTM and Scores (limit 1)
  const keyMetricsTtm = await fetchFMPEndpoint(ticker, 'stable/key-metrics-ttm', 'limit=1');
  const ratiosTtm = await fetchFMPEndpoint(ticker, 'stable/ratios-ttm', 'limit=1');
  const financialScores = await fetchFMPEndpoint(ticker, 'stable/financial-scores', 'limit=1');

  // Fetch Pricing and Historicals
  const priceChange = await fetchFMPEndpoint(ticker, 'stable/stock-price-change', '');
  const historicalPrices = await fetchFMPEndpoint(ticker, 'stable/historical-price-eod/light', '');

  // Fetch Index Quotes
  const [spyQuote, qqqQuote, diaQuote] = await Promise.all([
    fetchFMPEndpoint('SPY', 'stable/quote', ''),
    fetchFMPEndpoint('QQQ', 'stable/quote', ''),
    fetchFMPEndpoint('DJIA', 'stable/quote', '')
  ]);

  return {
    annual: {
      income: Array.isArray(aIncome) ? aIncome : [],
      balance: Array.isArray(aBalance) ? aBalance : [],
      cashFlow: Array.isArray(aCashFlow) ? aCashFlow : [],
      metrics: Array.isArray(aMetrics) ? aMetrics : [],
      ratios: Array.isArray(aRatios) ? aRatios : []
    },
    quarterly: {
      income: Array.isArray(qIncome) ? qIncome : [],
      balance: Array.isArray(qBalance) ? qBalance : [],
      cashFlow: Array.isArray(qCashFlow) ? qCashFlow : []
    },
    ttm: {
      keyMetrics: Array.isArray(keyMetricsTtm) ? keyMetricsTtm : [],
      ratios: Array.isArray(ratiosTtm) ? ratiosTtm : [],
      scores: Array.isArray(financialScores) ? financialScores : []
    },
    pricing: {
      priceChange: Array.isArray(priceChange) && priceChange.length > 0 ? priceChange[0] : null,
      historical: Array.isArray(historicalPrices?.historical) ? historicalPrices.historical.slice(0, 100) : [] // Limit to 100 days
    },
    indexes: {
      spy: Array.isArray(spyQuote) && spyQuote.length > 0 ? spyQuote[0] : null,
      qqq: Array.isArray(qqqQuote) && qqqQuote.length > 0 ? qqqQuote[0] : null,
      dia: Array.isArray(diaQuote) && diaQuote.length > 0 ? diaQuote[0] : null
    }
  };
}
