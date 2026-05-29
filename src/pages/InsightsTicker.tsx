import {useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {BarChart3, Loader2, AlertTriangle} from 'lucide-react';
import {useQuery} from '@tanstack/react-query';

import type {
  InsightsTickerResponse,
  InsightKpiModule,
  InsightNarrativeModule,
  InsightListModule,
  InsightTableModule,
  InsightChartModule
} from '../../lib/insights/contracts';

function Placeholder({label}: {label: string}) {
  return (
    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-3">
      {label}
    </div>
  );
}

function Section({children, delayMs = 0}: {children: React.ReactNode, delayMs?: number}) {
  return (
    <div 
      className="space-y-2 pt-4 border-t border-border/40 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
      style={{animationDelay: `${delayMs}ms`}}
    >
      {children}
    </div>
  );
}

export default function InsightsTicker() {
  const {ticker = ''} = useParams<{ticker: string}>();
  const normalizedTicker = useMemo(() => ticker.trim().toUpperCase(), [ticker]);
  
  const [timeframe, setTimeframe] = useState<'Quarterly' | 'TTM' | 'Annually'>('Annually');
  
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

  const {data: tradesData} = useQuery<InsightTableModule>({
    queryKey: ['insights-trades', normalizedTicker],
    queryFn: async () => {
      const res = await fetch(`/api/insights/${normalizedTicker}/insider-trades`);
      if (!res.ok) throw new Error('Failed to fetch trades');
      return res.json();
    },
    enabled: normalizedTicker.length > 0,
  });

  const {data: estimatesData} = useQuery<InsightTableModule>({
    queryKey: ['insights-estimates', normalizedTicker],
    queryFn: async () => {
      const res = await fetch(`/api/insights/${normalizedTicker}/analyst-estimates`);
      if (!res.ok) throw new Error('Failed to fetch estimates');
      return res.json();
    },
    enabled: normalizedTicker.length > 0,
  });

  const {data: chartsData} = useQuery<InsightChartModule>({
    queryKey: ['insights-charts', normalizedTicker, timeframe],
    queryFn: async () => {
      const res = await fetch(`/api/insights/${normalizedTicker}/charts?timeframe=${timeframe}`);
      if (!res.ok) throw new Error('Failed to fetch charts');
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
    <div className="p-6 space-y-8 max-w-[1200px] mx-auto overflow-y-auto h-full pb-12">
      {/* Consolidated Header / Hero */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div className="space-y-2">
          <div className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono flex items-center gap-2 mb-2">
            <BarChart3 size={14} /> Ticker Insights
          </div>
          <h1 className="text-3xl font-mono font-bold text-primary italic leading-none">{displayTicker}</h1>
          <div className="text-[14px] text-foreground">{data?.name || 'UNKNOWN COMPANY'}</div>
          <div className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest">
            {data?.exchange || 'UNKNOWN'} · {data?.sector || 'UNKNOWN'}
          </div>
        </div>
        <div className="text-left md:text-right flex gap-8">
          <div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Last</div>
            <div className="text-2xl font-mono font-bold text-foreground">{priceItem?.value || '—'}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Mkt Cap</div>
            <div className="text-2xl font-mono font-bold text-foreground">{mktCapItem?.value || '—'}</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Section delayMs={100}>
              <Placeholder label="THESIS" />
              <div className="text-[13px] text-foreground/90 leading-relaxed">
                {thesisModule ? (
                  <div dangerouslySetInnerHTML={{ __html: thesisModule.markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ) : (
                  'No thesis available.'
                )}
              </div>
            </Section>

            <Section delayMs={200}>
              <Placeholder label="ANALYST ESTIMATES" />
              <div className="text-[13px] text-foreground/90 leading-relaxed">
                {estimatesData ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] text-muted-foreground border-b border-border/40">
                        {estimatesData.columns.map(c => <th key={c.key} className="pb-2 font-normal">{c.label}</th>)}
                      </tr>
                    </thead>
                    <tbody className="font-mono text-[12px]">
                      {estimatesData.rows.map((row) => (
                        <tr key={row.key} className="border-b border-border/10 last:border-0">
                          {estimatesData.columns.map(c => <td key={c.key} className="py-2">{row.values[c.key]}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-muted-foreground">Loading estimates...</div>
                )}
              </div>
            </Section>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Section delayMs={300}>
              <Placeholder label="RISKS" />
              <div className="text-[13px] text-foreground/90 leading-relaxed space-y-1">
                {risksModule?.items && risksModule.items.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    {risksModule.items.map((risk, i) => (
                      <li key={i}><span className="text-foreground/90">{risk}</span></li>
                    ))}
                  </ul>
                ) : (
                  'No risks logged.'
                )}
              </div>
            </Section>

            <Section delayMs={400}>
              <Placeholder label="INSIDER TRADES" />
              <div className="text-[13px] text-foreground/90 leading-relaxed overflow-x-auto">
                {tradesData ? (
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr className="text-[10px] text-muted-foreground border-b border-border/40">
                        {tradesData.columns.map(c => <th key={c.key} className="pb-2 font-normal pr-4">{c.label}</th>)}
                      </tr>
                    </thead>
                    <tbody className="font-mono text-[11px]">
                      {tradesData.rows.map((row) => (
                        <tr key={row.key} className="border-b border-border/10 last:border-0">
                          {tradesData.columns.map(c => (
                            <td key={c.key} className={`py-2 pr-4 ${c.key === 'type' ? (row.values[c.key] === 'Buy' ? 'text-green-500' : 'text-red-500') : ''}`}>
                              {row.values[c.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-muted-foreground">Loading trades...</div>
                )}
              </div>
            </Section>
          </div>

          <Section delayMs={500}>
            <div className="flex items-center justify-between mb-3">
              <Placeholder label="HISTORICAL FINANCIALS" />
              <div className="flex gap-2">
                {['Quarterly', 'TTM', 'Annually'].map(tf => (
                  <button 
                    key={tf}
                    onClick={() => setTimeframe(tf as any)}
                    className={`text-[10px] uppercase font-mono tracking-widest px-2 py-1 ${timeframe === tf ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {chartsData ? chartsData.series.map((series) => (
                <div key={series.key} className="space-y-2">
                  <div className="text-[11px] font-mono text-muted-foreground">{series.label}</div>
                  <div className="h-24 flex items-end gap-1">
                    {series.points.map((p, i) => {
                      const height = p.y ? `${Math.max(10, Math.min(100, (p.y / 200) * 100))}%` : '0%';
                      return (
                        <div key={i} className="flex-1 bg-muted group relative hover:bg-primary/50 transition-colors" style={{height}}>
                          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[9px] px-1 whitespace-nowrap pointer-events-none">
                            {p.x}: {p.y ? p.y.toFixed(1) : '—'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )) : (
                <div className="text-muted-foreground text-[12px]">Loading charts...</div>
              )}
            </div>
          </Section>
        </div>

        {/* Sidebar column */}
        <div className="lg:col-span-4 space-y-8">
          <Section delayMs={600}>
            <Placeholder label="SNAPSHOT" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">QUALITY</div>
                <div className="text-lg font-mono font-bold text-foreground">{qualityItem?.value || '—'}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">VALUE</div>
                <div className="text-lg font-mono font-bold text-foreground">—</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">GROWTH</div>
                <div className="text-lg font-mono font-bold text-foreground">—</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">MOMENTUM</div>
                <div className="text-lg font-mono font-bold text-foreground">{momentumItem?.value || '—'}</div>
              </div>
            </div>
          </Section>

          <Section delayMs={700}>
            <Placeholder label="EVENTS" />
            <div className="text-[13px] text-foreground/90 leading-relaxed">
              {eventsModule?.items && eventsModule.items.length > 0 ? (
                <ul className="space-y-3">
                  {eventsModule.items.map((event, i) => (
                    <li key={i} className="text-muted-foreground">
                      <span className="text-foreground/90 block leading-tight">{event}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                'No events available.'
              )}
            </div>
          </Section>

          <Section delayMs={800}>
            <Placeholder label="DISCLOSURE" />
            <div className="text-[11px] text-muted-foreground leading-relaxed">
              PLACEHOLDER: Data sources & limitations. This information is provided for educational purposes only.
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
