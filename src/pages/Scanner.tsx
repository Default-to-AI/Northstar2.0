import React, {useEffect, useState} from 'react';
import {Sparkles, TrendingUp, TrendingDown, Target, Zap, Waves, Search, BarChart3, ChevronRight} from 'lucide-react';
import {Card} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';

interface Opportunity {
  ticker: string;
  name: string | null;
  reason: string;
  signal: 'BULLISH' | 'WATCH' | 'BEARISH';
  strength: number;
  sector: string | null;
  actionabilityState: string;
  warnings: string[];
}

type ScannerResponse = {
  opportunities: Opportunity[];
};

const SECTOR_STRENGTH = [
  {name: 'Technology', strength: 82, trend: 'up'},
  {name: 'Communication Services', strength: 74, trend: 'up'},
  {name: 'Health Care', strength: 68, trend: 'down'},
  {name: 'Financials', strength: 61, trend: 'side'},
  {name: 'Energy', strength: 42, trend: 'down'},
];

export default function Scanner() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/research/scanner')
      .then(async (response) => {
        const contentType = response.headers.get('content-type') ?? '';
        if (!contentType.includes('application/json')) {
          const body = await response.text();
          if (body.toLowerCase().includes('<!doctype html>')) {
            throw new Error('API endpoint returned HTML instead of JSON. Start app with "npm run dev" and open the same URL/port it prints.');
          }
          throw new Error('Scanner endpoint did not return JSON.');
        }

        const payload = (await response.json()) as ScannerResponse & {error?: string};
        if (!response.ok || payload.error) {
          throw new Error(payload.error ?? 'Failed to load scanner queue');
        }
        return payload as ScannerResponse;
      })
      .then((data) => {
        setOpportunities(data.opportunities);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load scanner queue');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto overflow-y-auto h-full pb-12">
      <header className="pb-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-mono font-bold text-primary tracking-tighter uppercase italic flex items-center gap-2">
              <Sparkles size={24} /> OPPORTUNITY SCANNER
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">
              SYSTEM SCANNING FOR REVIEW-READY SETUPS — MULTI-FACTOR SIGNAL DETECTION
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-none h-8 text-[10px] font-bold uppercase tracking-widest border-border bg-[#0d0d14] hover:bg-primary/5"
            onClick={() => navigate('/scanner/insights')}
          >
            VIEW INSIGHTS
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Market Regime</span>
            <div className="flex items-center gap-2">
              <Zap className="text-primary" size={16} />
              <span className="text-lg font-bold text-foreground">DATA_DEPENDENT</span>
            </div>
         </Card>
         <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Review Candidates</span>
            <div className="flex items-center gap-2">
              <Target className="text-positive" size={16} />
              <span className="text-lg font-bold text-foreground">{opportunities.length} REVIEW_READY</span>
            </div>
         </Card>
         <Card className="rounded-none bg-[#0d0d14] border-border terminal-border p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Scanning Depth</span>
            <div className="flex items-center gap-2">
              <Waves className="text-blue-400" size={16} />
              <span className="text-lg font-bold text-foreground">{opportunities.length} SCORED_SECURITIES</span>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
           <h2 className="text-[12px] font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
             <BarChart3 size={16} className="text-primary" /> Algorithmic Rank
           </h2>
           <div className="space-y-3">
              {loading ? (
                <div className="text-muted-foreground font-mono text-sm animate-pulse">Loading score snapshots...</div>
              ) : error ? (
                <div className="text-red-400 font-mono text-sm">{error}</div>
              ) : opportunities.length === 0 ? (
                <div className="text-muted-foreground font-mono text-sm">No score snapshots yet. Run python3 scripts/run-scanner.py.</div>
              ) : opportunities.map((op) => (
                <Card key={op.ticker} className="rounded-none bg-[#0d0d14] border-border hover:border-primary/40 transition-all group overflow-hidden">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted/20 border border-border flex items-center justify-center font-bold text-lg text-primary italic">
                      {op.ticker}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-foreground">{op.name ?? op.ticker}</span>
                        <Badge variant="outline" className={`rounded-none text-[9px] font-mono border ${op.signal === 'BULLISH' ? 'border-positive/30 text-positive' : 'border-amber-500/30 text-amber-500'}`}>
                           {op.signal}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 italic">&quot;{op.reason}&quot;</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                       <span className="text-[9px] font-bold text-muted-foreground uppercase">Score</span>
                       <span className="text-sm font-bold font-mono text-primary">{op.strength}%</span>
                    </div>
                    <div className="pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button
                         variant="ghost"
                         size="icon"
                         className="h-8 w-8 rounded-none text-muted-foreground hover:text-primary hover:bg-primary/5"
                         onClick={() => navigate(`/security/${op.ticker}`)}
                       >
                         <ChevronRight size={18} />
                       </Button>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted/10">
                     <div
                       className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-700"
                       style={{width: `${op.strength}%`}}
                     />
                  </div>
                </Card>
              ))}
           </div>
        </div>

        <div className="space-y-4">
           <h2 className="text-[12px] font-bold text-foreground uppercase tracking-widest">Sector Context</h2>
           <div className="space-y-2">
              {SECTOR_STRENGTH.map((s) => (
                <div key={s.name} className="bg-muted/5 border border-border/30 p-3 flex flex-col gap-2 opacity-60">
                   <div className="flex justify-between items-center">
                     <span className="text-[11px] font-bold text-foreground/80">{s.name}</span>
                     {s.trend === 'up' ? <TrendingUp size={14} className="text-positive" /> : s.trend === 'down' ? <TrendingDown size={14} className="text-negative" /> : <div className="w-3.5 h-0.5 bg-muted-foreground" />}
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-muted/20 rounded-none overflow-hidden">
                         <div
                           className={`h-full transition-all duration-1000 ${s.strength > 75 ? 'bg-positive' : s.strength > 50 ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                           style={{width: `${s.strength}%`}}
                         />
                      </div>
                      <span className="text-[10px] font-mono font-bold w-8 text-right">{s.strength}%</span>
                   </div>
                </div>
              ))}
           </div>

           <Card className="rounded-none bg-primary/5 border-primary/20 p-4 mt-6">
              <h3 className="text-[11px] font-bold text-primary uppercase mb-2 flex items-center gap-2">
                <Search size={14} /> Discovery Engine
              </h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic mb-4">
                The scanner surfaces candidates for evidence review. Committee synthesis is blocked until Slice 4 freezes evidence packets.
              </p>
              <Button disabled className="w-full rounded-none h-8 text-[10px] font-bold uppercase tracking-widest bg-primary text-black disabled:opacity-50">
                Deep Scan Pending Slice 4
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
}
