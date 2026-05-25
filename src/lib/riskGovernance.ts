import {readFileSync} from 'node:fs';
import path from 'node:path';

export type RiskModelConfig = {
  version: string;
  maxPositionPct: number;
  maxLossPct: number;
  liquidityFloorUsd: number;
  concentrationCaps: {
    singleNamePct: number;
    sectorPct: number;
  };
};

export type RiskBoundedSizeRange = {
  minPct: number;
  maxPct: number;
  label: string;
};

export type RiskGovernanceResult = {
  boundedSizeRange: RiskBoundedSizeRange;
  violations: string[];
  configVersion: string;
};

type EvaluateRiskInput = {
  entry: string;
  stop: string;
  size: string;
  payload?: Record<string, unknown>;
};

let cachedConfig: RiskModelConfig | null = null;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function parsePercentValues(text: string): number[] {
  const matches = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%/g)];
  return matches.map((match) => Number.parseFloat(match[1])).filter((value) => Number.isFinite(value));
}

function parseFirstNumber(text: string): number | null {
  const match = text.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const value = Number.parseFloat(match[1]);
  return Number.isFinite(value) ? value : null;
}

function getPayloadNumber(payload: Record<string, unknown> | undefined, pathKey: string): number | null {
  if (!payload) return null;
  const value = pathKey.split('.').reduce<unknown>((current, segment) => {
    if (!current || typeof current !== 'object') return null;
    return (current as Record<string, unknown>)[segment] ?? null;
  }, payload);
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function formatRange(minPct: number, maxPct: number): string {
  return `${minPct.toFixed(2)}%-${maxPct.toFixed(2)}%`;
}

export function loadRiskModelConfig(): RiskModelConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const rootDir = path.resolve(process.cwd());
  const configPath = path.join(rootDir, 'config/risk-model/v1.json');
  const config = JSON.parse(readFileSync(configPath, 'utf8')) as RiskModelConfig;

  cachedConfig = config;
  return config;
}

export function evaluateRiskGovernance(input: EvaluateRiskInput): RiskGovernanceResult {
  const config = loadRiskModelConfig();
  const violations: string[] = [];

  const sizePercents = parsePercentValues(input.size);
  const requestedSizePct = sizePercents.length > 0 ? Math.max(...sizePercents) : null;

  if (requestedSizePct === null) {
    violations.push('size_parse_failed: no percent found in proposed playbook size');
  }

  let maxPct = config.maxPositionPct;

  const entryPrice = parseFirstNumber(input.entry);
  const stopPrice = parseFirstNumber(input.stop);
  if (entryPrice !== null && stopPrice !== null && entryPrice > 0 && stopPrice > 0 && stopPrice < entryPrice) {
    const stopDistancePct = ((entryPrice - stopPrice) / entryPrice) * 100;
    if (stopDistancePct > 0) {
      const riskLimitedMax = (config.maxLossPct / stopDistancePct) * 100;
      maxPct = Math.min(maxPct, riskLimitedMax);
    }
  } else {
    violations.push('stop_distance_unavailable: unable to derive risk-limited sizing from entry/stop');
  }

  const avgDollarVolume = getPayloadNumber(input.payload, 'marketData.avgDollarVolume')
    ?? getPayloadNumber(input.payload, 'marketData.averageDollarVolume')
    ?? getPayloadNumber(input.payload, 'liquidity.avgDollarVolume');

  if (avgDollarVolume !== null && avgDollarVolume < config.liquidityFloorUsd) {
    maxPct = Math.min(maxPct, config.maxPositionPct / 2);
    violations.push(`liquidity_floor_breach: avgDollarVolume ${avgDollarVolume} below floor ${config.liquidityFloorUsd}`);
  }

  if (requestedSizePct !== null && requestedSizePct > config.maxPositionPct) {
    violations.push(`max_position_exceeded: requested ${requestedSizePct}% above cap ${config.maxPositionPct}%`);
  }

  maxPct = clamp(maxPct, 0, config.maxPositionPct);
  const boundedSizeRange: RiskBoundedSizeRange = {
    minPct: 0,
    maxPct: Number(maxPct.toFixed(2)),
    label: formatRange(0, Number(maxPct.toFixed(2))),
  };

  return {
    boundedSizeRange,
    violations,
    configVersion: config.version,
  };
}
