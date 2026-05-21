export interface FearGreedSnapshot {
  value: number;
  classification: string;
  updatedAt: string;
  previousClose: number;
  previousWeek: number;
  previousMonth: number;
  previousYear: number;
}

interface CnnFearGreedNode {
  score?: number;
  rating?: string;
  timestamp?: string;
  previous_close?: number;
  previous_1_week?: number;
  previous_1_month?: number;
  previous_1_year?: number;
}

interface CnnFearGreedPayload {
  fear_and_greed?: CnnFearGreedNode;
}

export const CNN_FEAR_GREED_BASE_URL = 'https://production.dataviz.cnn.io/index/fearandgreed/graphdata';

const CNN_REQUEST_HEADERS: HeadersInit = {
  Accept: 'application/json, text/plain, */*',
  Origin: 'https://www.cnn.com',
  Referer: 'https://www.cnn.com/markets/fear-and-greed',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function toTitleCase(value: string): string {
  return value
    .trim()
    .replace(/_/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function toRoundedScore(value: unknown, label: string): number {
  if (!isFiniteNumber(value)) {
    throw new Error(`Invalid CNN Fear & Greed ${label}`);
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

export function toFearGreedSnapshot(payload: CnnFearGreedPayload): FearGreedSnapshot {
  const current = payload.fear_and_greed;
  if (
    !current
    || !isFiniteNumber(current.score)
    || typeof current.rating !== 'string'
    || typeof current.timestamp !== 'string'
    || !isFiniteNumber(current.previous_close)
    || !isFiniteNumber(current.previous_1_week)
    || !isFiniteNumber(current.previous_1_month)
    || !isFiniteNumber(current.previous_1_year)
  ) {
    throw new Error('Invalid CNN Fear & Greed payload shape');
  }

  return {
    value: toRoundedScore(current.score, 'score'),
    classification: toTitleCase(current.rating),
    updatedAt: current.timestamp,
    previousClose: toRoundedScore(current.previous_close, 'previous close'),
    previousWeek: toRoundedScore(current.previous_1_week, 'previous week'),
    previousMonth: toRoundedScore(current.previous_1_month, 'previous month'),
    previousYear: toRoundedScore(current.previous_1_year, 'previous year'),
  };
}

export function getFearGreedDatePath(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export async function fetchCnnFearGreedSnapshot(fetchImpl: typeof fetch = fetch, now: Date = new Date()): Promise<FearGreedSnapshot> {
  const datedUrl = `${CNN_FEAR_GREED_BASE_URL}/${getFearGreedDatePath(now)}`;
  const candidateUrls = [datedUrl, CNN_FEAR_GREED_BASE_URL];
  let lastError: Error | null = null;

  for (const url of candidateUrls) {
    try {
      const response = await fetchImpl(url, { headers: CNN_REQUEST_HEADERS });
      if (!response.ok) {
        lastError = new Error(`CNN Fear & Greed request failed: ${response.status} for ${url}`);
        continue;
      }

      const payload = (await response.json()) as CnnFearGreedPayload;
      return toFearGreedSnapshot(payload);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown CNN Fear & Greed fetch failure');
    }
  }

  throw lastError ?? new Error('CNN Fear & Greed request failed');
}
