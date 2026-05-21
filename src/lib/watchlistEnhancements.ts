import { WatchReason } from '../types';

export interface QuoteSnapshot {
  currentPrice?: number;
}

export interface WatchlistEnhancementInput {
  id: string;
  ticker: string;
  thesis: string;
  targetPrice: number;
  criteria: string;
  reason: WatchReason;
  archived: boolean;
  personas: {
    M: boolean;
    H: boolean;
    C: boolean;
    Mi: boolean;
    Ca: boolean;
  };
}

export interface PortfolioHoldingInput {
  ticker: string;
  weight: number;
  sector?: string;
}

export interface WatchlistEnhancedItem {
  id: string;
  ticker: string;
  targetPrice: number;
  thesis: string;
  analysis: string;
  committeeThoughts: string[];
  committeeScores: {
    M: number;
    H: number;
    C: number;
    Mi: number;
    Ca: number;
  };
  scores: {
    conviction: number;
    valuation: number;
    riskReward: number;
    portfolioFit: number;
    total: number;
  };
  buyScenario: {
    trigger: string;
    stopLoss: number;
    upsideToTargetPct: number;
    notes: string;
  };
  inValidationScenario: {
    status: 'in_validation' | 'ready';
    requirements: string[];
    notes: string;
  };
  riskRewardRatio: number;
  recommendedPositionSizePct: number;
  portfolioFitReasoning: string;
  currentPrice?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round(value: number, places = 1): number {
  const factor = Math.pow(10, places);
  return Math.round(value * factor) / factor;
}

export function buildEnhancedWatchlist(
  items: WatchlistEnhancementInput[],
  quotesByTicker: Record<string, QuoteSnapshot>,
  options?: { holdings?: PortfolioHoldingInput[] },
): WatchlistEnhancedItem[] {
  const holdings = options?.holdings ?? [];
  const holdingsMap = new Map(holdings.map((holding) => [holding.ticker.toUpperCase(), holding]));

  return items.map((item) => {
    const quote = quotesByTicker[item.ticker];
    const currentPrice = quote?.currentPrice;
    const upsideToTargetPct = currentPrice && currentPrice > 0
      ? ((item.targetPrice - currentPrice) / currentPrice) * 100
      : 0;

    const personaKeys: Array<keyof WatchlistEnhancementInput['personas']> = ['M', 'H', 'C', 'Mi', 'Ca'];
    const selectedPersonaCount = personaKeys.filter((key) => item.personas[key]).length;
    const consensusScore = (selectedPersonaCount / personaKeys.length) * 100;

    const conviction = clamp(round(consensusScore * 0.65 + (upsideToTargetPct > 0 ? 18 : 6), 1), 0, 100);
    const valuation = clamp(round(50 + upsideToTargetPct * 1.1, 1), 0, 100);
    const stopLoss = currentPrice ? currentPrice * 0.92 : item.targetPrice * 0.85;
    const downsidePct = currentPrice && currentPrice > 0 ? ((currentPrice - stopLoss) / currentPrice) * 100 : 8;
    const riskRewardRatio = downsidePct > 0 ? round(Math.abs(upsideToTargetPct) / downsidePct, 2) : 0;
    const riskReward = clamp(round(riskRewardRatio * 30, 1), 0, 100);

    const existingWeight = holdingsMap.get(item.ticker.toUpperCase())?.weight ?? 0;
    const maxRecommended = 8;
    const recommendedPositionSizePct = clamp(round(Math.min(maxRecommended, 2 + riskRewardRatio * 1.8 - existingWeight * 0.08), 2), 0.5, maxRecommended);
    const portfolioFit = clamp(round(70 - existingWeight * 0.5 + (item.reason === 'UNDERVALUED' ? 10 : 0), 1), 0, 100);
    const total = round((conviction * 0.35) + (valuation * 0.25) + (riskReward * 0.2) + (portfolioFit * 0.2), 1);

    const committeeScores = {
      M: item.personas.M ? clamp(round(conviction / 10, 1), 0, 10) : 0,
      H: item.personas.H ? clamp(round((valuation + conviction) / 20, 1), 0, 10) : 0,
      C: item.personas.C ? clamp(round((riskReward + conviction) / 20, 1), 0, 10) : 0,
      Mi: item.personas.Mi ? clamp(round((portfolioFit + conviction) / 20, 1), 0, 10) : 0,
      Ca: item.personas.Ca ? clamp(round(total / 10, 1), 0, 10) : 0,
    };

    const committeeThoughts = personaKeys
      .filter((key) => item.personas[key])
      .map((key) => {
        const notes: Record<typeof key, string> = {
          M: `M: ${upsideToTargetPct >= 0 ? 'Setup has positive upside.' : 'Price is above target; wait for reset.'}`,
          H: `H: ${item.criteria || 'Need stronger criteria definition.'}`,
          C: `C: Risk/reward ${riskRewardRatio.toFixed(2)}x supports ${riskRewardRatio >= 2 ? 'an actionable setup' : 'continued monitoring'}.`,
          Mi: `Mi: Portfolio fit currently ${portfolioFit.toFixed(1)} / 100 with existing exposure at ${existingWeight.toFixed(2)}%.`,
          Ca: `Ca: Composite score ${total.toFixed(1)} indicates ${total >= 70 ? 'high readiness' : 'work still required'}.`,
        };
        return notes[key];
      });

    const status: 'in_validation' | 'ready' = total >= 70 && upsideToTargetPct > 5 ? 'ready' : 'in_validation';

    return {
      id: item.id,
      ticker: item.ticker,
      targetPrice: item.targetPrice,
      thesis: item.thesis,
      analysis: `${item.ticker} setup: target ${item.targetPrice.toFixed(2)}, ${upsideToTargetPct >= 0 ? 'upside' : 'downside'} ${Math.abs(upsideToTargetPct).toFixed(1)}%, committee alignment ${selectedPersonaCount}/${personaKeys.length}.`,
      committeeThoughts,
      committeeScores,
      scores: {
        conviction,
        valuation,
        riskReward,
        portfolioFit,
        total,
      },
      buyScenario: {
        trigger: status === 'ready' ? `Confirm hold above ${currentPrice ? (currentPrice * 0.99).toFixed(2) : item.targetPrice.toFixed(2)} on volume.` : `Wait for validation above ${item.targetPrice.toFixed(2)} catalyst threshold.`,
        stopLoss: round(stopLoss, 2),
        upsideToTargetPct: round(upsideToTargetPct, 1),
        notes: status === 'ready' ? 'Conditions support entry with disciplined risk management.' : 'Not enough confirmation yet; keep on active watch.',
      },
      inValidationScenario: {
        status,
        requirements: status === 'ready'
          ? ['Maintain support level', 'No thesis break in upcoming catalyst']
          : ['Catalyst confirmation', 'Volume follow-through', 'Committee score uplift above threshold'],
        notes: status === 'ready'
          ? 'Validation complete for current threshold model.'
          : 'Needs more evidence before upgrading to buy-ready.',
      },
      riskRewardRatio,
      recommendedPositionSizePct,
      portfolioFitReasoning: `Existing portfolio weight ${existingWeight.toFixed(2)}%. Recommended starter size ${recommendedPositionSizePct.toFixed(2)}% balances diversification and setup quality.`,
      currentPrice,
    };
  });
}
