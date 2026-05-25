export type AlertType = 'pipeline_failure' | 'review_ready_setup' | 'risk_breach' | 'earnings_filing_shock';

export type AlertSeverity = 'high' | 'medium';

export type ScoreSnapshotSignal = {
  ticker: string;
  scoreSnapshotId: number | null;
  sourceRunId: number | null;
  actionabilityState: string | null;
  warnings: string[];
  hasCommitteeSession: boolean;
};

export type PipelineFailureSignal = {
  sourceName: string;
  sourceRunId: number;
  errorMessage: string | null;
};

export type PortfolioContext = {
  grossExposurePct: number;
  maxGrossExposurePct: number;
};

export type DetectedAlert = {
  alertType: AlertType;
  ticker: string;
  sourceRunId: number | null;
  scoreSnapshotId: number | null;
  severity: AlertSeverity;
  message: string;
  evidence: Record<string, unknown>;
};

export type AlertDetectionInput = {
  pipelineFailures: PipelineFailureSignal[];
  scoreSignals: ScoreSnapshotSignal[];
  portfolioContext: PortfolioContext;
};

function hasWarning(warnings: string[], terms: string[]): boolean {
  const haystack = warnings.map((warning) => warning.toLowerCase());
  return terms.some((term) => haystack.some((warning) => warning.includes(term)));
}

export function buildAlertLineageKey(alert: Pick<DetectedAlert, 'alertType' | 'ticker' | 'sourceRunId' | 'scoreSnapshotId'>): string {
  return [
    alert.alertType,
    alert.ticker,
    alert.sourceRunId ?? 'none',
    alert.scoreSnapshotId ?? 'none',
  ].join(':');
}

function dedup(alerts: DetectedAlert[]): DetectedAlert[] {
  const seen = new Set<string>();
  const unique: DetectedAlert[] = [];
  for (const alert of alerts) {
    const key = buildAlertLineageKey(alert);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(alert);
  }
  return unique;
}

export function detectAlerts(input: AlertDetectionInput): DetectedAlert[] {
  const alerts: DetectedAlert[] = [];

  for (const failure of input.pipelineFailures) {
    alerts.push({
      alertType: 'pipeline_failure',
      ticker: failure.sourceName.toUpperCase(),
      sourceRunId: failure.sourceRunId,
      scoreSnapshotId: null,
      severity: 'high',
      message: `Pipeline source ${failure.sourceName} failed and needs operator review.`,
      evidence: {
        sourceName: failure.sourceName,
        errorMessage: failure.errorMessage,
      },
    });
  }

  for (const signal of input.scoreSignals) {
    if (signal.actionabilityState === 'fresh_actionable' && !signal.hasCommitteeSession) {
      alerts.push({
        alertType: 'review_ready_setup',
        ticker: signal.ticker,
        sourceRunId: signal.sourceRunId,
        scoreSnapshotId: signal.scoreSnapshotId,
        severity: 'medium',
        message: `${signal.ticker} is review-ready with fresh evidence and no committee playbook yet.`,
        evidence: {
          actionabilityState: signal.actionabilityState,
          scoreSnapshotId: signal.scoreSnapshotId,
        },
      });
    }

    if (hasWarning(signal.warnings, ['risk_breach', 'drawdown', 'concentration'])) {
      alerts.push({
        alertType: 'risk_breach',
        ticker: signal.ticker,
        sourceRunId: signal.sourceRunId,
        scoreSnapshotId: signal.scoreSnapshotId,
        severity: 'high',
        message: `${signal.ticker} breached configured risk guardrails.`,
        evidence: {
          warnings: signal.warnings,
        },
      });
    }

    if (hasWarning(signal.warnings, ['earnings_shock', 'filing_shock', 'guidance_cut'])) {
      alerts.push({
        alertType: 'earnings_filing_shock',
        ticker: signal.ticker,
        sourceRunId: signal.sourceRunId,
        scoreSnapshotId: signal.scoreSnapshotId,
        severity: 'high',
        message: `${signal.ticker} has an earnings or filing shock requiring evidence review.`,
        evidence: {
          warnings: signal.warnings,
        },
      });
    }
  }

  if (input.portfolioContext.grossExposurePct > input.portfolioContext.maxGrossExposurePct) {
    alerts.push({
      alertType: 'risk_breach',
      ticker: 'PORTFOLIO',
      sourceRunId: null,
      scoreSnapshotId: null,
      severity: 'high',
      message: 'Portfolio gross exposure is above configured max guardrail.',
      evidence: {
        grossExposurePct: input.portfolioContext.grossExposurePct,
        maxGrossExposurePct: input.portfolioContext.maxGrossExposurePct,
      },
    });
  }

  return dedup(alerts);
}
