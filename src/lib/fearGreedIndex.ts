export interface FearGreedSnapshot {
  value: number;
  classification: string;
}

interface ApiItem {
  value: string;
  value_classification: string;
}

interface ApiResponse {
  data?: ApiItem[];
}

const ONE_HOUR_MS = 60 * 60 * 1000;

let cache: { snapshot: FearGreedSnapshot; expiresAt: number } | null = null;

function toSnapshot(payload: ApiResponse): FearGreedSnapshot {
  const item = payload?.data?.[0];
  if (!item || typeof item.value !== 'string' || typeof item.value_classification !== 'string') {
    throw new Error('Invalid Fear & Greed API payload shape');
  }

  const parsedValue = Number.parseInt(item.value, 10);
  if (!Number.isFinite(parsedValue)) {
    throw new Error('Invalid Fear & Greed value');
  }

  return {
    value: Math.max(0, Math.min(100, parsedValue)),
    classification: item.value_classification.trim() || 'Unknown',
  };
}

export async function getFearGreedIndex(nowMs: number = Date.now()): Promise<FearGreedSnapshot> {
  if (cache && cache.expiresAt > nowMs) {
    return cache.snapshot;
  }

  const response = await fetch('https://api.alternative.me/fng/?limit=1');
  if (!response.ok) {
    throw new Error(`Fear & Greed API request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse;
  const snapshot = toSnapshot(payload);

  cache = {
    snapshot,
    expiresAt: nowMs + ONE_HOUR_MS,
  };

  return snapshot;
}

export function __resetFearGreedCache(): void {
  cache = null;
}
