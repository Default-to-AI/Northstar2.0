import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

type AlertType = 'pipeline_failure' | 'review_ready_setup' | 'risk_breach' | 'earnings_filing_shock';

type AlertRecord = {
  id: string;
  ticker: string;
  alertType: AlertType;
  severity: 'high' | 'medium';
  message: string;
  sourceRunId: number | null;
  createdAt: string;
  status: 'active' | 'acknowledged';
};

type BriefingFreshResponse = {
  status: 'fresh';
  date: string;
  generatedAt: string;
  source: string;
  pipelineReadiness: unknown;
  preMarketContext: unknown;
  topOpportunities: unknown;
  portfolioSnapshot: unknown;
};

type BriefingNotGeneratedResponse = {
  status: 'not_generated';
  date?: string;
  error?: string;
};

type BriefingResponse = BriefingFreshResponse | BriefingNotGeneratedResponse;

type EventItem = {
  type: string;
  ticker: string | null;
  title: string;
  description: string | null;
  isHolding: boolean;
};

type EventsResponse = {
  generatedAt: string;
  events: Array<{
    date: string;
    items: EventItem[];
  }>;
};

type DecisionType = 'long_candidate' | 'watch' | 'ignore';

type DecisionRecord = {
  ticker: string;
  decisionType: DecisionType;
  primaryPersona: string;
  compounderScore: number;
  tacticalScore: number;
  thresholdMet: boolean;
  rationale: string[];
  evidence: {
    topPersonaScore: number;
    actionabilityState: string;
    personaCount: number;
  };
  createdAt: string;
};

type DecisionsResponse = {
  generatedAt: string;
  decisions: DecisionRecord[];
};

type HealthCheckType = 'trim' | 'stop_loss' | 'restructure' | 'position_sizing' | 'sector_concentration';

type HealthCheckRecord = {
  ticker: string;
  checkType: HealthCheckType;
  triggered: boolean;
  currentValue: number;
  thresholdValue: number;
  rationale: Record<string, unknown>;
  createdAt: string;
};

type PortfolioHealthResponse = {
  generatedAt: string;
  checks: HealthCheckRecord[];
};

type PremarketMover = {
  ticker: string;
  name: string | null;
  sector: string | null;
  lastClose: number;
  preMarketPrice: number | null;
  gapPct: number | null;
  preMarketVolume: number | null;
  avgVolume: number | null;
  relVolume: number | null;
};

type PremarketMoversResponse = {
  movers: PremarketMover[];
  asOf: string;
};

function alertLabel(type: AlertType): string {
  switch (type) {
    case 'pipeline_failure':
      return 'Pipeline failure';
    case 'review_ready_setup':
      return 'Review-ready setup';
    case 'risk_breach':
      return 'Risk breach';
    case 'earnings_filing_shock':
      return 'Earnings/Filing shock';
  }
}

function alertGuidance(type: AlertType): string {
  switch (type) {
    case 'pipeline_failure':
      return 'Evidence ingestion failed; investigate source health and rerun pipeline.';
    case 'review_ready_setup':
      return 'Fresh score is ready for evidence review. This is not a trade action.';
    case 'risk_breach':
      return 'Risk guardrail breached. Review evidence + exposure before any decision.';
    case 'earnings_filing_shock':
      return 'Shock signal detected in earnings/filings. Validate evidence before action.';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function formatPercent(value: number | null): string {
  return value === null ? 'n/a' : `${value.toFixed(2)}%`;
}

function formatCurrency(value: number | null): string {
  return value === null ? 'n/a' : `$${value.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
}

function eventTypeLabel(type: string): string {
  if (type === 'earnings') return 'Earnings';
  if (type === 'macro') return 'Macro';
  if (type === 'filing') return 'Filing';
  return type;
}

function decisionTypeLabel(type: DecisionType): string {
  if (type === 'long_candidate') return 'Long Candidate';
  if (type === 'watch') return 'Watch';
  return 'Ignore';
}

function decisionTypeVariant(type: DecisionType): 'default' | 'outline' | 'destructive' | 'secondary' {
  if (type === 'long_candidate') return 'default';
  if (type === 'watch') return 'secondary';
  return 'outline';
}

function healthCheckTypeLabel(type: HealthCheckType): string {
  const map: Record<HealthCheckType, string> = {
    trim: 'Trim',
    stop_loss: 'Stop Loss',
    restructure: 'Restructure',
    position_sizing: 'Position Sizing',
    sector_concentration: 'Sector Concentration',
  };
  return map[type] ?? type;
}

function healthCheckVariant(triggered: boolean): 'default' | 'outline' | 'destructive' | 'secondary' {
  return triggered ? 'destructive' : 'outline';
}

function dateHeading(dateIso: string): string {
  const date = new Date(`${dateIso}T00:00:00`);
  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowIso = tomorrow.toISOString().slice(0, 10);

  const pretty = date.toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
  if (dateIso === todayIso) return `Today • ${pretty}`;
  if (dateIso === tomorrowIso) return `Tomorrow • ${pretty}`;
  return pretty;
}

export default function CommandCenter() {
  const queryClient = useQueryClient();

  const alertsQuery = useQuery({
    queryKey: ['research-alerts'],
    queryFn: async () => {
      const response = await fetch('/api/research/alerts');
      if (!response.ok) throw new Error('Failed to load alerts');
      return (await response.json()) as {alerts: AlertRecord[]};
    },
    refetchInterval: 30_000,
  });

  const briefingQuery = useQuery({
    queryKey: ['research-briefing'],
    queryFn: async () => {
      const response = await fetch('/api/research/briefing');
      if (!response.ok) throw new Error('Failed to load briefing');
      return (await response.json()) as BriefingResponse;
    },
    refetchInterval: 60_000,
  });

  const eventsQuery = useQuery({
    queryKey: ['research-events'],
    queryFn: async () => {
      const response = await fetch('/api/research/events');
      if (!response.ok) throw new Error('Failed to load events');
      return (await response.json()) as EventsResponse;
    },
    refetchInterval: 60_000,
  });

  const decisionsQuery = useQuery({
    queryKey: ['research-decisions'],
    queryFn: async () => {
      const response = await fetch('/api/research/decisions');
      if (!response.ok) throw new Error('Failed to load decisions');
      return (await response.json()) as DecisionsResponse;
    },
    refetchInterval: 60_000,
  });

  const portfolioHealthQuery = useQuery({
    queryKey: ['research-portfolio-health'],
    queryFn: async () => {
      const response = await fetch('/api/research/portfolio-health');
      if (!response.ok) throw new Error('Failed to load portfolio health');
      return (await response.json()) as PortfolioHealthResponse;
    },
    refetchInterval: 60_000,
  });

  const premarketMoversQuery = useQuery({
    queryKey: ['research-premarket-movers'],
    queryFn: async () => {
      const response = await fetch('/api/research/premarket-movers');
      if (!response.ok) throw new Error('Failed to load pre-market movers');
      return (await response.json()) as PremarketMoversResponse;
    },
    refetchInterval: 30_000,
  });

  const refreshBriefingMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/research/briefing/refresh', {method: 'POST'});
      const body = (await response.json()) as BriefingResponse & {error?: string};
      if (!response.ok) {
        throw new Error(body.error ?? 'Refresh failed');
      }
      return body;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['research-briefing']});
    },
  });

  const briefingData = briefingQuery.data;
  const isBriefingFresh = briefingData?.status === 'fresh';

  const readiness = isBriefingFresh && isRecord(briefingData.pipelineReadiness)
    ? briefingData.pipelineReadiness
    : null;
  const preMarket = isBriefingFresh && isRecord(briefingData.preMarketContext)
    ? briefingData.preMarketContext
    : null;
  const portfolio = isBriefingFresh && isRecord(briefingData.portfolioSnapshot)
    ? briefingData.portfolioSnapshot
    : null;

  const topOpportunities = isBriefingFresh && Array.isArray(briefingData.topOpportunities)
    ? briefingData.topOpportunities
    : [];

  const readinessStatus = readiness ? asString(readiness.status) ?? 'unknown' : 'unknown';
  const overnightSpyPercent = preMarket
    ? asNumber(preMarket.spyOvernightChangePct) ?? asNumber(preMarket.overnightChangePct)
    : null;

  const macroNames = preMarket && Array.isArray(preMarket.keyMacro)
    ? preMarket.keyMacro.filter((value): value is string => typeof value === 'string')
    : [];

  const nav = portfolio ? asNumber(portfolio.nav) : null;
  const cashPct = portfolio ? asNumber(portfolio.cashPct) : null;
  const grossExposurePct = portfolio
    ? asNumber(portfolio.grossExposurePct) ?? asNumber(portfolio.exposurePct)
    : null;

  return (
    <div className="p-4 space-y-4 max-w-full mx-auto">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-sm font-mono tracking-[0.2em] uppercase text-primary">Command Center</h1>
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-positive animate-pulse" />
            LIVE
          </span>
          <span className="px-2 py-0.5 bg-muted rounded border border-border">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="rounded-none bg-card border-border terminal-border overflow-hidden col-span-1 lg:col-span-2 xl:col-span-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="label-text">Morning briefing</h2>
            {isBriefingFresh && (
              <span className="text-[10px] font-mono text-muted-foreground">
                generated: {briefingData.generatedAt}
              </span>
            )}
          </div>

          {briefingQuery.isLoading && (
            <p className="text-sm font-mono text-muted-foreground">Loading briefing…</p>
          )}

          {briefingQuery.isError && (
            <p className="text-sm font-mono text-negative">Failed to load briefing.</p>
          )}

          {!briefingQuery.isLoading && !briefingQuery.isError && briefingData?.status === 'not_generated' && (
            <div className="space-y-3">
              <p className="text-sm font-mono text-negative">Briefing hasn&apos;t run today.</p>
              {refreshBriefingMutation.isError && (
                <p className="text-xs font-mono text-negative">
                  Refresh failed: {refreshBriefingMutation.error instanceof Error ? refreshBriefingMutation.error.message : 'Unknown error'}.
                  {' '}Try again or use terminal: python3 -m scripts.research_engine.briefing
                </p>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => refreshBriefingMutation.mutate()}
                  disabled={refreshBriefingMutation.isPending}
                  className="border border-border bg-background/40 px-3 py-1 text-xs font-mono uppercase tracking-wide disabled:opacity-60"
                >
                  {refreshBriefingMutation.isPending ? 'Running…' : 'Run briefing now'}
                </button>
              </div>
              <pre className="border border-border bg-background/40 p-2 text-xs font-mono text-muted-foreground overflow-x-auto">
                python3 -m scripts.research_engine.briefing
              </pre>
            </div>
          )}

          {!briefingQuery.isLoading && !briefingQuery.isError && isBriefingFresh && (
            <div className="space-y-3">
              <div className="border border-border p-3 bg-background/40 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Readiness</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                    {readinessStatus}
                  </Badge>
                </div>
              </div>

              <div className="border border-border p-3 bg-background/40 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Pre-market</h3>
                <p className="text-sm font-mono text-foreground">SPY overnight: {formatPercent(overnightSpyPercent)}</p>
                <p className="text-xs font-mono text-muted-foreground">
                  {macroNames.length > 0 ? `Key macro: ${macroNames.join(', ')}` : 'Key macro: none listed'}
                </p>
              </div>

              <div className="border border-border p-3 bg-background/40 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Top opportunities</h3>
                <div className="flex flex-wrap gap-2">
                  {topOpportunities.length === 0 && (
                    <span className="text-xs font-mono text-muted-foreground">No opportunities available.</span>
                  )}
                  {topOpportunities.slice(0, 5).map((item, index) => {
                    const record = isRecord(item) ? item : null;
                    const ticker = record ? asString(record.ticker) ?? asString(record.symbol) ?? 'N/A' : 'N/A';
                    const score = record
                      ? asNumber(record.compounderScore) ?? asNumber(record.score)
                      : null;
                    return (
                      <Badge key={`${ticker}-${index}`} variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                        {ticker} {score === null ? '' : score.toFixed(1)}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="border border-border p-3 bg-background/40 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Portfolio</h3>
                <p className="text-sm font-mono text-foreground">NAV: {formatCurrency(nav)}</p>
                <p className="text-xs font-mono text-muted-foreground">Cash: {formatPercent(cashPct)}</p>
                <p className="text-xs font-mono text-muted-foreground">Exposure: {formatPercent(grossExposurePct)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-none bg-card border-border terminal-border overflow-hidden col-span-1 lg:col-span-2 xl:col-span-2">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="label-text">Pre-market movers</h2>
            {premarketMoversQuery.data && (
              <span className="text-[10px] font-mono text-muted-foreground">
                updated: {new Date(premarketMoversQuery.data.asOf).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
              </span>
            )}
          </div>
          {premarketMoversQuery.isLoading && (
            <p className="text-sm font-mono text-muted-foreground">Loading pre-market movers…</p>
          )}
          {premarketMoversQuery.isError && (
            <p className="text-sm font-mono text-negative">Failed to load pre-market movers.</p>
          )}
          {!premarketMoversQuery.isLoading && !premarketMoversQuery.isError && (premarketMoversQuery.data?.movers.length ?? 0) === 0 && (
            <p className="text-sm font-mono text-muted-foreground">No significant pre-market movers.</p>
          )}
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {(premarketMoversQuery.data?.movers ?? []).slice(0, 15).map((mover, index) => (
              <div key={`${mover.ticker}-${index}`} className="border border-border p-2 bg-background/40">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono flex-shrink-0">
                      {mover.ticker}
                    </Badge>
                    {mover.name && (
                      <span className="text-xs font-mono text-muted-foreground truncate max-w-[120px]">{mover.name}</span>
                    )}
                    {mover.sector && (
                      <Badge variant="outline" className="rounded-none uppercase text-[9px] font-mono text-muted-foreground flex-shrink-0">
                        {mover.sector}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono">
                    <span className={ (mover.gapPct ?? 0) >= 0 ? 'text-positive' : 'text-negative' }>
                      { (mover.gapPct ?? 0) >= 0 ? '+' : '' }{mover.gapPct?.toFixed(2)}%
                    </span>
                    <span className="text-muted-foreground">
                      ${mover.lastClose.toFixed(2)} → ${mover.preMarketPrice?.toFixed(2) ?? 'n/a'}
                    </span>
                    {mover.relVolume !== null && mover.relVolume > 0 && (
                      <Badge variant="outline" className="rounded-none uppercase text-[9px] font-mono">
                        {mover.relVolume.toFixed(1)}x vol
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none bg-card border-border terminal-border overflow-hidden col-span-1 lg:col-span-1 xl:col-span-1">
        <CardContent className="p-4 space-y-3">
          <h2 className="label-text">Upcoming events</h2>
          {eventsQuery.isLoading && <p className="text-sm font-mono text-muted-foreground">Loading events…</p>}
          {eventsQuery.isError && <p className="text-sm font-mono text-negative">Failed to load events.</p>}
          {!eventsQuery.isLoading && !eventsQuery.isError && (eventsQuery.data?.events.length ?? 0) === 0 && (
            <p className="text-sm font-mono text-muted-foreground">No upcoming events.</p>
          )}

          <div className="space-y-3">
            {(eventsQuery.data?.events ?? []).map((group) => (
              <div key={group.date} className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">{dateHeading(group.date)}</p>
                <div className="space-y-2">
                  {group.items.map((item, index) => (
                    <div key={`${group.date}-${item.type}-${item.ticker ?? 'macro'}-${index}`} className="border border-border p-2 bg-background/40">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                          {eventTypeLabel(item.type)}
                        </Badge>
                        {item.ticker && (
                          <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                            {item.ticker}
                          </Badge>
                        )}
                        {item.isHolding && (
                          <span className="border border-negative/30 bg-negative/5 px-2 py-0.5 text-[10px] font-mono uppercase text-negative">
                            Holding
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-mono text-foreground">{item.title}</p>
                      {item.description && (
                        <p className="mt-1 text-xs font-mono text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none bg-card border-border terminal-border overflow-hidden col-span-1 lg:col-span-1 xl:col-span-1">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="label-text">Daily decisions</h2>
            {decisionsQuery.data && (
              <span className="text-[10px] font-mono text-muted-foreground">
                generated: {decisionsQuery.data.generatedAt}
              </span>
            )}
          </div>
          {decisionsQuery.isLoading && <p className="text-sm font-mono text-muted-foreground">Loading decisions…</p>}
          {decisionsQuery.isError && <p className="text-sm font-mono text-negative">Failed to load decisions.</p>}
          {!decisionsQuery.isLoading && !decisionsQuery.isError && (decisionsQuery.data?.decisions.length ?? 0) === 0 && (
            <p className="text-sm font-mono text-muted-foreground">No decisions generated.</p>
          )}

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {(decisionsQuery.data?.decisions ?? []).map((decision, index) => (
              <div key={`${decision.ticker}-${decision.decisionType}-${index}`} className="border border-border p-3 bg-background/40">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={decisionTypeVariant(decision.decisionType)} className="rounded-none uppercase text-[10px] font-mono">
                      {decisionTypeLabel(decision.decisionType)}
                    </Badge>
                    <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                      {decision.ticker}
                    </Badge>
                    <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                      {decision.primaryPersona}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                    <span>C: {decision.compounderScore}</span>
                    <span>T: {decision.tacticalScore}</span>
                    <span>Persona: {decision.evidence.topPersonaScore.toFixed(1)}</span>
                  </div>
                </div>
                <p className="mt-1 text-xs font-mono text-muted-foreground">
                  {decision.rationale[0] ?? 'No rationale'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none bg-card border-border terminal-border overflow-hidden col-span-1 lg:col-span-1 xl:col-span-1">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="label-text">Portfolio health</h2>
            {portfolioHealthQuery.data && (
              <span className="text-[10px] font-mono text-muted-foreground">
                generated: {portfolioHealthQuery.data.generatedAt}
              </span>
            )}
          </div>
          {portfolioHealthQuery.isLoading && <p className="text-sm font-mono text-muted-foreground">Loading portfolio health…</p>}
          {portfolioHealthQuery.isError && <p className="text-sm font-mono text-negative">Failed to load portfolio health.</p>}
          {!portfolioHealthQuery.isLoading && !portfolioHealthQuery.isError && (portfolioHealthQuery.data?.checks.length ?? 0) === 0 && (
            <p className="text-sm font-mono text-muted-foreground">No portfolio health checks.</p>
          )}

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {(portfolioHealthQuery.data?.checks ?? []).map((check, index) => (
              <div key={`${check.ticker}-${check.checkType}-${index}`} className="border border-border p-3 bg-background/40">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={healthCheckVariant(check.triggered)} className="rounded-none uppercase text-[10px] font-mono">
                      {healthCheckTypeLabel(check.checkType)}
                    </Badge>
                    <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                      {check.ticker}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                    <span className={check.triggered ? 'text-negative' : 'text-muted-foreground'}>
                      {check.triggered ? '⚠ TRIGGERED' : 'OK'}
                    </span>
                    <span>Val: {check.currentValue.toFixed(2)}</span>
                    <span>Thresh: {check.thresholdValue.toFixed(2)}</span>
                  </div>
                </div>
                <p className="mt-1 text-xs font-mono text-muted-foreground">
                  {JSON.stringify(check.rationale)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none bg-card border-border terminal-border overflow-hidden col-span-1 lg:col-span-3 xl:col-span-3">
        <CardContent className="p-4 space-y-3">
          <h2 className="label-text">High-confidence research alerts</h2>
          {alertsQuery.isLoading && <p className="text-sm font-mono text-muted-foreground">Loading alerts…</p>}
          {alertsQuery.isError && <p className="text-sm font-mono text-negative">Failed to load alerts.</p>}
          {!alertsQuery.isLoading && !alertsQuery.isError && (alertsQuery.data?.alerts.length ?? 0) === 0 && (
            <p className="text-sm font-mono text-muted-foreground">No active alerts. No alert implies trade action.</p>
          )}

          <div className="space-y-2">
            {(alertsQuery.data?.alerts ?? []).filter((alert) => alert.status === 'active').map((alert) => (
              <div key={alert.id} className="border border-border p-3 bg-background/40">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                      {alertLabel(alert.alertType)}
                    </Badge>
                    <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                      {alert.ticker}
                    </Badge>
                    <Badge variant="outline" className="rounded-none uppercase text-[10px] font-mono">
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">source_run_id: {alert.sourceRunId ?? 'n/a'}</div>
                </div>
                <p className="mt-2 text-sm font-mono text-foreground">{alert.message}</p>
                <p className="mt-1 text-xs font-mono text-muted-foreground">{alertGuidance(alert.alertType)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}
