import { openResearchDb } from '../server/research/db';

export interface AlphaVantageStatement {
  annualReports: any[];
  quarterlyReports: any[];
}

export interface AlphaVantageOverview {
  [key: string]: string;
}

export async function fetchAVEndpoint(ticker: string, endpoint: string): Promise<any | null> {
  const apiKey = process.env.AV_KEY || process.env.VITE_AV_KEY;
  if (!apiKey) {
    console.error('AV API key is missing. Please set AV_KEY in .env');
    return null;
  }

  const db = openResearchDb();
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS av_cache (
      ticker TEXT NOT NULL,
      endpoint TEXT NOT NULL,
      data TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (ticker, endpoint)
    )
  `);

  const stmt = db.prepare(`SELECT data, timestamp FROM av_cache WHERE ticker = ? AND endpoint = ?`);
  const row = stmt.get(ticker, endpoint) as { data: string; timestamp: string } | undefined;

  if (row) {
    const cachedTime = new Date(row.timestamp).getTime();
    const now = Date.now();
    const daysOld = (now - cachedTime) / (1000 * 60 * 60 * 24);
    
    if (daysOld < 30) {
      console.log(`[AV Cache] HIT for ${ticker} ${endpoint} (${daysOld.toFixed(1)} days old)`);
      db.close();
      return JSON.parse(row.data);
    } else {
      console.log(`[AV Cache] EXPIRED for ${ticker} ${endpoint} (${daysOld.toFixed(1)} days old). Refreshing...`);
    }
  } else {
    console.log(`[AV Cache] MISS for ${ticker} ${endpoint}. Fetching...`);
  }

  try {
    const url = `https://www.alphavantage.co/query?function=${endpoint}&symbol=${ticker}&apikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`AV Error for ${endpoint} ${ticker}: ${res.statusText}`);
      return row ? JSON.parse(row.data) : null; 
    }
    
    const data = await res.json();
    
    if (data && !data['Information'] && !data['Note'] && !data['Error Message'] && Object.keys(data).length > 0) {
      const insertStmt = db.prepare(`
        INSERT INTO av_cache (ticker, endpoint, data, timestamp) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(ticker, endpoint) DO UPDATE SET data=excluded.data, timestamp=CURRENT_TIMESTAMP
      `);
      insertStmt.run(ticker, endpoint, JSON.stringify(data));
    }

    return data;
  } catch (e) {
    console.error(`AV Fetch Error for ${endpoint} ${ticker}:`, e);
    return row ? JSON.parse(row.data) : null;
  } finally {
    db.close();
  }
}

export async function getAlphaVantageFundamentals(ticker: string) {
  const overview = await fetchAVEndpoint(ticker, 'OVERVIEW');
  const income = await fetchAVEndpoint(ticker, 'INCOME_STATEMENT');
  const balance = await fetchAVEndpoint(ticker, 'BALANCE_SHEET');
  const cashFlow = await fetchAVEndpoint(ticker, 'CASH_FLOW');

  // Check if we hit the limit or got invalid data
  const isRateLimited = (data: any) => data && (data['Information'] || data['Note'] || data['Error Message']);

  if (
    !overview || isRateLimited(overview) ||
    !income || isRateLimited(income) ||
    !balance || isRateLimited(balance) ||
    !cashFlow || isRateLimited(cashFlow)
  ) {
    return null;
  }

  return {
    overview,
    income,
    balance,
    cashFlow
  };
}
