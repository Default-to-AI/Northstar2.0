import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {BarChart3, Loader2, AlertTriangle} from 'lucide-react';
import {useQuery} from '@tanstack/react-query';

import {Card} from '@/components/ui/card';
import type {InsightsTickerResponse, InsightKpiModule, InsightNarrativeModule, InsightListModule} from '../../lib/insights/contracts';

function Placeholder({label}: {label: string}) {
  return (
    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
      {label}
    </div>
  );
}

export default function InsightsTicker() {
  const {ticker = ''} = useParams<{ticker: string}>();

  const normalizedTicker = useMemo(() => ticker.trim().toUpperCase(), [ticker]);
  
  const {data, isLoading, isError, error} = useQuery<InsightsTickerResponse>({
    queryKey: ['insights-ticker', normalizedTicker],
    queryFn: async () => {
      const res = await fetch(`/api/insights/${normalizedTicker}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Unknown ticker');
        throw new Error('Failed to fetch insights');
      }
      return res.json();
    },
    enabled: normalizedTicker.length > 0,
  });

  const displayTicker = data?.ticker ?? (normalizedTicker.length > 0 ? normalizedTicker : 'UNKNOWN');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-12">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto text-center space-y-4 pt-12">
        <AlertTriangle className="mx-auto w-12 h-12 text-destructive" />
        <h2 className="text-xl font-mono text-destructive">Error Loading Insights</h2>
        <p className="text-muted-foreground">{error instanceof Error ? error.message : 'An unknown error occurred.'}</p>
      </div>
    );
  }

  const snapshotModule = data?.modules.find(m => m.title === 'SNAPSHOT') as InsightKpiModule | undefined;
  const thesisModule = data?.modules.find(m => m.title === 'THESIS') as InsightNarrativeModule | undefined;
  const risksModule = data?.modules.find(m => m.title === 'RISKS') as InsightListModule | undefined;
  const eventsModule = data?.modules.find(m => m.title === 'EVENTS') as InsightListModule | undefined;

  const priceItem = snapshotModule?.items.find(i => i.label === 'PRICE');
  const mktCapItem = snapshotModule?.items.find(i => i.label === 'MKT CAP');
  const qualityItem = snapshotModule?.items.find(i => i.label === 'COMPOUNDER SCORE');
  const momentumItem = snapshotModule?.items.find(i => i.label === 'TACTICAL SCORE');

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto overflow-y-auto h-full pb-12">
      <header className="space-y-1 pb-4 border-b border-border">
        <h1 className="text-2xl font-mono font-bold text-primary tracking-tighter uppercase italic flex items-center gap-2">
          <BarChart3 size={22} /> INSIGHTS: {displayTicker}
        </h1>
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">
          TICKER PAGE — MODULE SHELL (WAVE 2)
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-1">
                <div className="font-mono font-bold text-primary italic text-xl leading-none">{displayTicker}</div>
                <div className="text-[11px] text-foreground">{data?.name || 'UNKNOWN COMPANY'}</div>
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  {data?.exchange || 'UNKNOWN'} · {data?.sector || 'UNKNOWN'}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Last</div>
                <div className="text-[14px] font-mono font-bold text-foreground">{priceItem?.value || '—'}</div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Mkt Cap</div>
                <div className="text-[12px] font-mono font-bold text-foreground">{mktCapItem?.value || '—'}</div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
              <Placeholder label="THESIS" />
              <div className="text-[12px] text-muted-foreground leading-relaxed">
                {thesisModule ? (
                  <div dangerouslySetInnerHTML={{ __html: thesisModule.markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ) : (
                  'No thesis available.'
                )}
              </div>
            </Card>

            <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
              <Placeholder label="CATALYSTS" />
              <div className="text-[12px] text-muted-foreground leading-relaxed">
                PLACEHOLDER: Near-term catalysts list will render here.
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
              <Placeholder label="RISKS" />
              <div className="text-[12px] text-muted-foreground leading-relaxed space-y-1">
                {risksModule?.items && risksModule.items.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {risksModule.items.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    ))}
                  </ul>
                ) : (
                  'No risks logged.'
                )}
              </div>
            </Card>

            <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
              <Placeholder label="VALUATION" />
              <div className="text-[12px] text-muted-foreground leading-relaxed">
                PLACEHOLDER: Multiples / scenarios / implied expectations will render here.
              </div>
            </Card>
          </div>

          <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
            <Placeholder label="NOTES" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-border/40 p-3">
                <Placeholder label="TECHNICAL" />
                <div className="text-[12px] text-muted-foreground mt-1">PLACEHOLDER</div>
              </div>
              <div className="border border-border/40 p-3">
                <Placeholder label="SENTIMENT" />
                <div className="text-[12px] text-muted-foreground mt-1">PLACEHOLDER</div>
              </div>
              <div className="border border-border/40 p-3">
                <Placeholder label="POSITIONING" />
                <div className="text-[12px] text-muted-foreground mt-1">PLACEHOLDER</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar column */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
            <Placeholder label="SNAPSHOT" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">QUALITY</div>
                <div className="text-[12px] font-mono font-bold text-foreground">{qualityItem?.value || '—'}</div>
              </div>
              <div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">VALUE</div>
                <div className="text-[12px] font-mono font-bold text-foreground">—</div>
              </div>
              <div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">GROWTH</div>
                <div className="text-[12px] font-mono font-bold text-foreground">—</div>
              </div>
              <div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">MOMENTUM</div>
                <div className="text-[12px] font-mono font-bold text-foreground">{momentumItem?.value || '—'}</div>
              </div>
            </div>
          </Card>

          <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
            <Placeholder label="EVENTS" />
            <div className="text-[12px] text-muted-foreground leading-relaxed">
              {eventsModule?.items && eventsModule.items.length > 0 ? (
                <ul className="space-y-2">
                  {eventsModule.items.map((event, i) => (
                    <li key={i}>{event}</li>
                  ))}
                </ul>
              ) : (
                'No events available.'
              )}
            </div>
          </Card>

          <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
            <Placeholder label="DISCLOSURE" />
            <div className="text-[12px] text-muted-foreground leading-relaxed">
              PLACEHOLDER: Data sources & limitations.
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
