import React, { useState } from 'react';
import { Search, Loader2, Sparkles, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { useArchive } from '../hooks/useArchive';
import { Verdict, Outcome } from '../types';

type CommitteeReport = {
  category: 'BUY' | 'ADD' | 'HOLD' | 'TRIM' | 'SELL' | 'WATCH';
  market_implication: string;
};

type CommitteeResponse = {error?: string; final?: CommitteeReport};
import { useSearchParams } from 'react-router-dom';

export default function Committee() {
  const { addSession } = useArchive();
  const [searchParams] = useSearchParams();
  const [ticker, setTicker] = useState(searchParams.get('ticker') || "");
  const [isSearching, setIsSearching] = useState(false);
  const [sessionState, setSessionState] = useState<'IDLE' | 'ANALYZING' | 'COMPLETE'>('IDLE');
  const [report, setReport] = useState<CommitteeReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startSession = async () => {
    if (!ticker) return;
    setIsSearching(true);
    setError(null);
    setSessionState('ANALYZING');

    try {
      const response = await fetch("/api/committee/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker: ticker.toUpperCase() }),
      });
      const data = (await response.json()) as CommitteeResponse;
      
      if (data.error) {
        throw new Error(data.error);
      }
      if (!data.final) {
        throw new Error('Committee response missing final report');
      }

      setReport(data.final);
      setSessionState('COMPLETE');
    } catch (error: unknown) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'Session sync failure. Check connection.');
      setSessionState('IDLE');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCommit = () => {
    if (!report) return;
    // Map categories to verdicts
    const verdictMap: Record<CommitteeReport['category'], Verdict> = {
      BUY: 'BUY',
      ADD: 'ADD',
      HOLD: 'HOLD',
      TRIM: 'TRIM',
      SELL: 'SELL',
      WATCH: 'WATCH',
    };
    
    addSession({
      id: Math.random().toString(36).substr(2, 9),
      ticker: ticker.toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      verdict: verdictMap[report.category],
      convictionScore: report.category === 'BUY' || report.category === 'SELL' ? 8 : 6,
      summary: report.market_implication,
      personaScores: { M: 0, H: 0, C: 0, Mi: 0, Ca: 0 },
      outcome: 'PENDING' as Outcome,
      outcomeText: '',
      fullTranscript: report
    });
    alert("Session committed to Research Archive.");
    setSessionState('IDLE');
    setTicker("");
    setReport(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] text-[#888] font-mono p-6 overflow-hidden">
      {/* Header */}
      <header className="mb-6 flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tighter uppercase italic">AI ANALYST ROOM</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">MICHA.STOCKS AI-ERA FUNDAMENTAL ANALYSIS</p>
        </div>
        {sessionState === 'COMPLETE' && (
           <Button 
             onClick={handleCommit}
             className="rounded-none bg-primary text-black font-bold h-8 text-[10px] uppercase tracking-widest px-6"
           >
             Commit to Archive
           </Button>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left: Input */}
        <div className="w-80 flex flex-col gap-4">
          <Card className="rounded-none bg-muted/5 border-border terminal-border">
            <CardContent className="p-4 space-y-4">
               <div>
                 <label className="text-[11px] font-bold text-muted-foreground uppercase mb-2 block">Stock to Analyze</label>
                 <div className="flex gap-2">
                   <div className="relative flex-1">
                     <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
                     <Input 
                       value={ticker}
                       onChange={(e) => setTicker(e.target.value)}
                       placeholder="NVDA, AAPL..."
                       className="bg-background/50 border-border rounded-none pl-8 h-9 text-foreground italic focus-visible:ring-0"
                       disabled={sessionState === 'ANALYZING'}
                     />
                   </div>
                   <Button 
                     onClick={startSession}
                     disabled={!ticker || sessionState === 'ANALYZING'}
                     className="rounded-none bg-primary text-black font-bold h-9 px-4 disabled:opacity-50"
                   >
                     {isSearching ? <Loader2 className="animate-spin" size={14} /> : "START"}
                   </Button>
                 </div>
               </div>

               <div className="pt-4 border-t border-border/10 space-y-3">
                 <h3 className="text-[10px] font-bold text-muted-foreground uppercase">Operating Procedure</h3>
                 <ul className="text-[10px] space-y-2 opacity-60">
                   <li>1. Fetch 26+ KPI Evidence</li>
                   <li>2. Build Four Dashboards</li>
                   <li>3. Interpret Signal Conflicts</li>
                   <li>4. Model Bull/Bear Scenarios</li>
                   <li>5. Issue Disciplined Category</li>
                 </ul>
               </div>
            </CardContent>
          </Card>
          
          <div className="mt-auto p-4 bg-muted/5 border border-border/30 italic text-[10px] text-muted-foreground/50 leading-relaxed terminal-border">
            Note: This analysis evaluates business health and theoretical valuation at the current point in time. It does not provide market timing.
          </div>
        </div>

        {/* Right: Message Stream */}
        <div className="flex-1 flex flex-col bg-[#0d0d14] border border-border terminal-border overflow-hidden relative">
          {sessionState === 'IDLE' && !error && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-20">
               <Sparkles className="w-12 h-12 text-primary" />
               <p className="text-[12px] uppercase tracking-widest text-center max-w-xs">
                 Enter a ticker symbol to begin fundamental analysis.
               </p>
            </div>
          )}

          {sessionState === 'ANALYZING' && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
               <Loader2 className="animate-spin w-12 h-12 text-primary" />
               <p className="text-[12px] uppercase tracking-widest text-center animate-pulse text-primary">
                 Synthesizing evidence...
               </p>
            </div>
          )}

          {error && (
             <div className="m-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] flex gap-2">
                <AlertTriangle size={14} /> {error}
             </div>
          )}

          {sessionState === 'COMPLETE' && report && (
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="border-b-2 border-primary pb-4">
                    <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Recommendation</h2>
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-bold uppercase ${
                        report.category.includes('BUY') ? 'text-green-500' :
                        report.category.includes('SELL') ? 'text-red-500' :
                        'text-amber-500'
                      }`}>
                        {report.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-primary uppercase">Market Implication</h3>
                    <p className="text-sm text-foreground/90 bg-muted/5 p-4 border-l border-primary/40 leading-relaxed">
                      {report.market_implication}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="rounded-none bg-[#0a0a0f] border-border p-4">
                      <h4 className="text-[10px] font-bold uppercase text-primary mb-2">Income Statement Snapshot</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] text-positive uppercase">Evidence:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.income_statement.evidence.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] text-negative uppercase">Risk:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.income_statement.risk.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    <Card className="rounded-none bg-[#0a0a0f] border-border p-4">
                      <h4 className="text-[10px] font-bold uppercase text-primary mb-2">Momentum</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] text-positive uppercase">Evidence:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.momentum.evidence.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] text-negative uppercase">Risk:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.momentum.risk.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    <Card className="rounded-none bg-[#0a0a0f] border-border p-4">
                      <h4 className="text-[10px] font-bold uppercase text-primary mb-2">Valuation History</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] text-positive uppercase">Evidence:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.valuation.evidence.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] text-negative uppercase">Risk:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.valuation.risk.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    <Card className="rounded-none bg-[#0a0a0f] border-border p-4">
                      <h4 className="text-[10px] font-bold uppercase text-primary mb-2">Capital Allocation</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] text-positive uppercase">Evidence:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.capital_allocation.evidence.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] text-negative uppercase">Risk:</span>
                          <ul className="list-disc pl-4 text-xs text-foreground/80">
                            {report.dashboards.capital_allocation.risk.map((e: string, i: number) => <li key={i}>{e}</li>)}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-primary uppercase">Data Triggers</h3>
                    <ul className="list-none space-y-1">
                      {report.data_triggers.map((t: string, i: number) => (
                         <li key={i} className="flex gap-2 items-start text-sm text-foreground/90">
                           <ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                           {t}
                         </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="rounded-none border-green-500/30 bg-green-500/5 p-4 space-y-3">
                       <h3 className="text-[12px] font-bold text-green-500 uppercase">3-Year Bull Case</h3>
                       <ul className="list-disc pl-4 text-xs text-foreground/80 space-y-1">
                         {report.bull_case.map((t: string, i: number) => <li key={i}>{t}</li>)}
                       </ul>
                    </Card>
                    <Card className="rounded-none border-red-500/30 bg-red-500/5 p-4 space-y-3">
                       <h3 className="text-[12px] font-bold text-red-500 uppercase">3-Year Bear Case</h3>
                       <ul className="list-disc pl-4 text-xs text-foreground/80 space-y-1">
                         {report.bear_case.map((t: string, i: number) => <li key={i}>{t}</li>)}
                       </ul>
                    </Card>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="text-[12px] font-bold text-amber-500 uppercase">Invalidation Conditions</h3>
                    <ul className="list-none space-y-1">
                      {report.invalidation_conditions.map((t: string, i: number) => (
                         <li key={i} className="flex gap-2 items-start text-sm text-amber-500/80">
                           <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                           {t}
                         </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Activity Bar */}
          <div className="h-6 bg-muted/10 border-t border-border px-4 flex items-center justify-between text-[9px] font-bold tracking-widest text-muted-foreground uppercase shrink-0">
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                   <div className={`w-1.5 h-1.5 rounded-full ${sessionState === 'ANALYZING' ? 'bg-primary animate-ping' : 'bg-green-500'}`} />
                   Agent: {sessionState === 'ANALYZING' ? 'Generating Analysis' : 'Standby'}
                </span>
             </div>
             <div>
                Phase: {sessionState}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
