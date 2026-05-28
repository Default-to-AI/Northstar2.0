export type TickerCooldownRejection = {
  allowed: false;
  ticker: string;
  cooldownMs: number;
  retryAfterMs: number;
  nextAllowedAtMs: number;
};

export type TickerCooldownAllowance = {
  allowed: true;
  ticker: string;
  cooldownMs: number;
  nextAllowedAtMs: number;
};

export type TickerCooldownDecision = TickerCooldownRejection | TickerCooldownAllowance;

export function isTickerCooldownRejection(
  decision: TickerCooldownDecision,
): decision is TickerCooldownRejection {
  return decision.allowed === false;
}

export type TickerRefreshCooldownOptions = {
  cooldownMs: number;
  now?: () => number;
};

type Entry = {
  nextAllowedAtMs: number;
};

function clampToNonNegativeInteger(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  return Math.floor(value);
}

export class TickerRefreshCooldown {
  private readonly cooldownMs: number;
  private readonly now: () => number;
  private readonly nextByTicker: Map<string, Entry>;

  constructor(options: TickerRefreshCooldownOptions) {
    this.cooldownMs = clampToNonNegativeInteger(options.cooldownMs);
    this.now = options.now ?? (() => Date.now());
    this.nextByTicker = new Map<string, Entry>();
  }

  /**
   * Atomically checks + reserves the refresh slot for the ticker.
   * The reservation sets nextAllowedAtMs = now + cooldown.
   */
  public startOrReject(ticker: string): TickerCooldownDecision {
    const normalized = ticker.toUpperCase();
    const nowMs = this.now();

    const existing = this.nextByTicker.get(normalized);
    const nextAllowedAtMs = existing?.nextAllowedAtMs ?? 0;

    if (nowMs < nextAllowedAtMs) {
      return {
        allowed: false,
        ticker: normalized,
        cooldownMs: this.cooldownMs,
        retryAfterMs: clampToNonNegativeInteger(nextAllowedAtMs - nowMs),
        nextAllowedAtMs,
      };
    }

    const reservedUntil = nowMs + this.cooldownMs;
    this.nextByTicker.set(normalized, {nextAllowedAtMs: reservedUntil});

    return {
      allowed: true,
      ticker: normalized,
      cooldownMs: this.cooldownMs,
      nextAllowedAtMs: reservedUntil,
    };
  }

  /** For tests / introspection. */
  public peekNextAllowedAtMs(ticker: string): number | null {
    const entry = this.nextByTicker.get(ticker.toUpperCase());
    return entry ? entry.nextAllowedAtMs : null;
  }

  /** For tests / operational resets. */
  public clearTicker(ticker: string): void {
    this.nextByTicker.delete(ticker.toUpperCase());
  }

  /** For tests / operational resets. */
  public clearAll(): void {
    this.nextByTicker.clear();
  }
}

export type TickerRefreshCooldownErrorPayload = {
  error: string;
  code: 'TICKER_REFRESH_COOLDOWN';
  ticker: string;
  retryAfterSeconds: number;
  retryAfterMs: number;
  nextAllowedAt: string;
};

export function buildTickerRefreshCooldownErrorPayload(
  decision: TickerCooldownRejection,
): TickerRefreshCooldownErrorPayload {
  const retryAfterSeconds = Math.max(1, Math.ceil(decision.retryAfterMs / 1000));
  return {
    error: `Refresh for ${decision.ticker} is cooling down. Try again in ~${retryAfterSeconds}s.`,
    code: 'TICKER_REFRESH_COOLDOWN',
    ticker: decision.ticker,
    retryAfterSeconds,
    retryAfterMs: decision.retryAfterMs,
    nextAllowedAt: new Date(decision.nextAllowedAtMs).toISOString(),
  };
}
