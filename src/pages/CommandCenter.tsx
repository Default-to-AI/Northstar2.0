import {useQuery} from '@tanstack/react-query';
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

export default function CommandCenter() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['research-alerts'],
    queryFn: async () => {
      const response = await fetch('/api/research/alerts');
      if (!response.ok) throw new Error('Failed to load alerts');
      return (await response.json()) as {alerts: AlertRecord[]};
    },
    refetchInterval: 30_000,
  });

  return (
    <div className="p-4 space-y-4 max-w-[1200px] mx-auto">
      <h1 className="text-sm font-mono tracking-[0.2em] uppercase text-primary">Command Center</h1>

      <Card className="rounded-none bg-[#0d0d14] border-border terminal-border overflow-hidden">
        <CardContent className="p-4 space-y-3">
          <h2 className="label-text">High-confidence research alerts</h2>
          {isLoading && <p className="text-sm font-mono text-muted-foreground">Loading alerts…</p>}
          {isError && <p className="text-sm font-mono text-negative">Failed to load alerts.</p>}
          {!isLoading && !isError && (data?.alerts.length ?? 0) === 0 && (
            <p className="text-sm font-mono text-muted-foreground">No active alerts. No alert implies trade action.</p>
          )}

          <div className="space-y-2">
            {(data?.alerts ?? []).filter((alert) => alert.status === 'active').map((alert) => (
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
  );
}
