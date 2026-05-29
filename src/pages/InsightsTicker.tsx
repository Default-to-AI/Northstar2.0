import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {BarChart3} from 'lucide-react';

import {Card} from '@/components/ui/card';

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
  const displayTicker = normalizedTicker.length > 0 ? normalizedTicker : 'UNKNOWN';

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto overflow-y-auto h-full pb-12">
      <header className="space-y-1 pb-4 border-b border-border">
        <h1 className="text-2xl font-mono font-bold text-primary tracking-tighter uppercase italic flex items-center gap-2">
          <BarChart3 size={22} /> INSIGHTS: {displayTicker}
        </h1>
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">
          TICKER PAGE — MODULE SHELL (WAVE 1)
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main column */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-1">
                <div className="font-mono font-bold text-primary italic text-xl leading-none">{displayTicker}</div>
                <div className="text-[11px] text-foreground">SECURITY_NAME_PLACEHOLDER</div>
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  EXCHANGE_PLACEHOLDER · SECTOR_PLACEHOLDER
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Last</div>
                <div className="text-[14px] font-mono font-bold text-foreground">$—</div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Mkt Cap</div>
                <div className="text-[12px] font-mono font-bold text-foreground">—</div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
              <Placeholder label="THESIS" />
              <div className="text-[12px] text-muted-foreground leading-relaxed">
                PLACEHOLDER: High-level investment thesis summary will render here.
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
              <div className="text-[12px] text-muted-foreground leading-relaxed">
                PLACEHOLDER: Key risks and failure modes will render here.
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
                <div className="text-[12px] font-mono font-bold text-foreground">—</div>
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
                <div className="text-[12px] font-mono font-bold text-foreground">—</div>
              </div>
            </div>
          </Card>

          <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 space-y-3">
            <Placeholder label="EVENTS" />
            <div className="text-[12px] text-muted-foreground leading-relaxed">
              PLACEHOLDER: Earnings / guidance / filings timeline.
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
