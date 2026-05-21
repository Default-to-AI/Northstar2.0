import { FearGreedSnapshot } from './fearGreedService';

const FIVE_MINUTES_MS = 5 * 60 * 1000;

let cache: { snapshot: FearGreedSnapshot; expiresAt: number } | null = null;

function isFearGreedSnapshot(value: unknown): value is FearGreedSnapshot {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const snapshot = value as Record<string, unknown>;
  return (
    typeof snapshot.value === 'number'
    && typeof snapshot.classification === 'string'
    && typeof snapshot.updatedAt === 'string'
    && typeof snapshot.previousClose === 'number'
    && typeof snapshot.previousWeek === 'number'
    && typeof snapshot.previousMonth === 'number'
    && typeof snapshot.previousYear === 'number'
  );
}

export async function getFearGreedIndex(nowMs: number = Date.now()): Promise<FearGreedSnapshot> {
  if (cache && cache.expiresAt > nowMs) {
    return cache.snapshot;
  }

  const response = await fetch('/api/market/fear-greed');
  if (!response.ok) {
    throw new Error(`Fear & Greed API request failed: ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  if (!isFearGreedSnapshot(payload)) {
    throw new Error('Invalid Fear & Greed API payload shape');
  }

  const snapshot: FearGreedSnapshot = {
    ...payload,
    value: Math.max(0, Math.min(100, Math.round(payload.value))),
    previousClose: Math.max(0, Math.min(100, Math.round(payload.previousClose))),
    previousWeek: Math.max(0, Math.min(100, Math.round(payload.previousWeek))),
    previousMonth: Math.max(0, Math.min(100, Math.round(payload.previousMonth))),
    previousYear: Math.max(0, Math.min(100, Math.round(payload.previousYear))),
  };

  cache = {
    snapshot,
    expiresAt: nowMs + FIVE_MINUTES_MS,
  };

  return snapshot;
}

export function __resetFearGreedCache(): void {
  cache = null;
}
