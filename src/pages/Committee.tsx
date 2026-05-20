import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { useArchive } from '../hooks/useArchive';
import { Verdict, Outcome } from '../types';
import { useSearchParams } from 'react-router-dom';

const PERSONAS = [
  { key: 'M', name: 'Mahaney', color: '#f5c518', role: 'Technologist', lens: 'Growth, TAM, Category Leadership' },
  { key: 'H', name: 'Hohn', color: '#00c896', role: 'Activist', lens: 'Value, Governance, Normalized Earnings' },
  { key: 'C', name: 'Cohen', color: '#ff4757', role: 'Trader', lens: 'Risk/Reward, Catalysts, Timing' },
  { key: 'Mi', name: 'Micha', color: '#3b82f6', role: 'Trend Follower', lens: 'Price Momentum, 150MA' },
  { key: 'Ca', name: 'Carlson', color: '#a855f7', role: 'Compounder', lens: 'FCF, Moats, Dividend Growth' },
];

export default function Committee() {
  const { addSession } = useArchive();
  const [searchParams] = useSearchParams();
  const [ticker, setTicker] = useState(searchParams.get('ticker') || "");
  const [isSearching, setIsSearching] = useState(false);
  const [sessionState, setSessionState] = useState<'IDLE' | 'ACT1' | 'ACT2' | 'ACT3' | 'COMPLETE'>('IDLE');
  const [sessionData, setSessionData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startSession = async () => {
    if (!ticker) return;
    setIsSearching(true);
    setMessages([]);
    setSessionState('ACT1');

    try {
      const response = await fetch("/api/committee/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker: ticker.toUpperCase() }),
      });
      const data = await response.json();
      setSessionData(data);

      // Simulate Act 1
      const act1Messages = data.act1.map((p: any) => ({
        type: 'ACT1',
        persona: p.persona,
        content: p.read,
        score: p.score,
        concern: p.concern,
        timestamp: new Date().toISOString()
      }));

      // Add messages one by one with delay
      for (const msg of act1Messages) {
        setMessages(prev => [...prev, msg]);
        await new Promise(r => setTimeout(r, 600));
      }

      setSessionState('ACT2');
      
      // Simulate Act 2
      const act2Messages = data.debate.map((d: any) => ({
        type: 'ACT2',
        from: d.from,
        to: d.to,
        content: d.message,
        timestamp: new Date().toISOString()
      }));

      for (const msg of act2Messages) {
        setMessages(prev => [...prev, msg]);
        await new Promise(r => setTimeout(r, 800));
      }

      setSessionState('ACT3');

      // Final Results
      setMessages(prev => [...prev, {
        type: 'ACT3',
        data: data.final,
        timestamp: new Date().toISOString()
      }]);

      setSessionState('COMPLETE');
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { type: 'ERROR', content: 'Session sync failure. Check connection.' }]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCommit = () => {
    if (!sessionData) return;
    const { final } = sessionData;
    addSession({
      id: Math.random().toString(36).substr(2, 9),
      ticker: ticker.toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      verdict: final.verdict as Verdict,
      convictionScore: final.convictionScore,
      summary: final.summary,
      personaScores: final.finalScores,
      outcome: 'PENDING' as Outcome,
      outcomeText: '',
      fullTranscript: sessionData
    });
    alert("Session committed to Research Archive.");
    setSessionState('IDLE');
    setTicker("");
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] text-[#888] font-mono p-6 overflow-hidden">
      {/* Header */}
      <header className="mb-6 flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tighter uppercase italic">COMMITTEE ROOM</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">THREE-ACT ADVERSARIAL DEBATE — ADAPTIVE ALPHA HUNT</p>
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
        {/* Left: Input & Personas */}
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
                       disabled={sessionState !== 'IDLE' && sessionState !== 'COMPLETE'}
                     />
                   </div>
                   <Button 
                     onClick={startSession}
                     disabled={!ticker || (sessionState !== 'IDLE' && sessionState !== 'COMPLETE')}
                     className="rounded-none bg-primary text-black font-bold h-9 px-4 disabled:opacity-50"
                   >
                     {isSearching ? <Loader2 className="animate-spin" size={14} /> : "START"}
                   </Button>
                 </div>
               </div>

               <div className="pt-4 border-t border-border/10 space-y-3">
                 <h3 className="text-[10px] font-bold text-muted-foreground uppercase">Committee Members</h3>
                 {PERSONAS.map(p => (
                   <div key={p.key} className="group cursor-default">
                     <div className="flex items-center gap-2 mb-1">
                       <span 
                         className="w-6 h-6 flex items-center justify-center font-bold text-[10px] border"
                         style={{ color: p.color, borderColor: `${p.color}44`, backgroundColor: `${p.color}11` }}
                       >
                         {p.key}
                       </span>
                       <span className="text-[11px] font-bold text-foreground/80">{p.name}</span>
                       <span className="text-[8px] opacity-40 uppercase ml-auto">{p.role}</span>
                     </div>
                     <p className="text-[9px] leading-tight opacity-40 group-hover:opacity-70 transition-opacity">{p.lens}</p>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
          
          <div className="mt-auto p-4 bg-muted/5 border border-border/30 italic text-[10px] text-muted-foreground/50 leading-relaxed terminal-border">
            Note: Act 1 is independent verdicts. Act 2 is adversarial debate. Act 3 is risk-gated decision.
          </div>
        </div>

        {/* Right: Message Stream */}
        <div className="flex-1 flex flex-col bg-[#0d0d14] border border-border terminal-border overflow-hidden relative">
          {sessionState === 'IDLE' && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-20">
               <Sparkles className="w-12 h-12 text-primary" />
               <p className="text-[12px] uppercase tracking-widest text-center max-w-xs">
                 Enter a ticker symbols to convene the specialists.
               </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
             <AnimatePresence>
               {messages.map((msg, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.4 }}
                 >
                   {msg.type === 'ACT1' && (
                     <div className="flex gap-4 group">
                       <div className="shrink-0 flex flex-col items-center gap-2">
                         <div 
                           className="w-10 h-10 flex items-center justify-center font-bold text-xl border-2"
                           style={{ color: PERSONAS.find(p => p.name === msg.persona)?.color, borderColor: `${PERSONAS.find(p => p.name === msg.persona)?.color}44` }}
                         >
                           {PERSONAS.find(p => p.name === msg.persona)?.key}
                         </div>
                         <div className="text-[10px] font-bold opacity-60">
                           {msg.score.toFixed(1)}
                         </div>
                       </div>
                       <div className="flex-1 space-y-3">
                         <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-foreground">ACT 1: INITIAL VERDICT — {msg.persona}</span>
                           <span className="text-[8px] opacity-20">{msg.timestamp.split('T')[1].split('.')[0]}</span>
                         </div>
                         <p className="text-[12px] leading-relaxed text-foreground/90 bg-muted/5 p-3 italic border-l border-border/40">
                           "{msg.content}"
                         </p>
                         <div className="flex items-center gap-2 text-negative/80 bg-negative/5 p-2 px-3 border border-negative/10">
                            <AlertTriangle size={12} className="shrink-0" />
                            <span className="text-[10px] uppercase font-bold tracking-tight">Concern: {msg.concern}</span>
                         </div>
                       </div>
                     </div>
                   )}

                   {msg.type === 'ACT2' && (
                      <div className="flex gap-4 bg-muted/5 p-4 border-l-2 border-primary/20 relative">
                        <div className="absolute -left-1 top-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(245,197,24,0.5)]" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                             <div className="flex items-center gap-1">
                               <span 
                                 className="w-5 h-5 flex items-center justify-center text-[9px] font-bold border"
                                 style={{ color: PERSONAS.find(p => p.name === msg.from)?.color, borderColor: `${PERSONAS.find(p => p.name === msg.from)?.color}33` }}
                               >
                                 {PERSONAS.find(p => p.name === msg.from)?.key}
                               </span>
                               <ChevronRight size={12} />
                               <span 
                                 className="w-5 h-5 flex items-center justify-center text-[9px] font-bold border"
                                 style={{ color: PERSONAS.find(p => p.name === msg.to)?.color, borderColor: `${PERSONAS.find(p => p.name === msg.to)?.color}33` }}
                               >
                                 {PERSONAS.find(p => p.name === msg.to)?.key}
                               </span>
                             </div>
                             <span className="text-[10px] font-bold uppercase tracking-widest text-primary italic">Act 2: Cross-Examination</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-foreground/80 pl-2">
                             {msg.content}
                          </p>
                        </div>
                      </div>
                   )}

                   {msg.type === 'ACT3' && (
                     <div className="space-y-6 pt-4 border-t-2 border-primary animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-primary text-black flex items-center justify-center">
                                <ShieldCheck size={24} />
                             </div>
                             <div>
                                <h3 className="text-[14px] font-bold text-foreground tracking-tighter uppercase italic">ACT 3: FINAL VERDICT & RISK GATE</h3>
                                <div className="flex items-center gap-2">
                                  <Badge className={`rounded-none bg-transparent border uppercase text-[9px] ${
                                    msg.data.verdict === 'BUY' ? 'border-green-500 text-green-500' :
                                    msg.data.verdict === 'SELL' ? 'border-red-500 text-red-500' :
                                    'border-amber-500 text-amber-500'
                                  }`}>
                                    {msg.data.verdict}
                                  </Badge>
                                  <span className="text-[12px] font-bold text-foreground">Conviction: {msg.data.convictionScore.toFixed(1)} / 10</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex gap-1">
                             {PERSONAS.map(p => (
                               <div key={p.key} className="flex flex-col items-center">
                                  <span className="text-[8px] opacity-40 font-bold">{p.key}</span>
                                  <span className="text-[11px] font-bold" style={{ color: p.color }}>{msg.data.finalScores[p.key]}</span>
                               </div>
                             ))}
                          </div>
                        </div>

                        <Card className="rounded-none border-primary/30 bg-primary/5 p-4 border shadow-[0_0_20px_rgba(245,197,24,0.05)]">
                           <p className="text-[13px] leading-relaxed font-bold text-foreground">
                              {msg.data.summary}
                           </p>
                        </Card>

                        <div className="grid grid-cols-3 gap-4">
                           <div className="p-3 border border-border/50 bg-black/40">
                              <span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">Entry Playbook</span>
                              <span className="text-[11px] font-bold text-foreground">{msg.data.riskPlaybook.entry}</span>
                           </div>
                           <div className="p-3 border border-border/50 bg-black/40 border-l-negative/30">
                              <span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">Hard Stop</span>
                              <span className="text-[11px] font-bold text-negative">{msg.data.riskPlaybook.stop}</span>
                           </div>
                           <div className="p-3 border border-border/50 bg-black/40">
                              <span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">Primary Target</span>
                              <span className="text-[11px] font-bold text-positive">{msg.data.riskPlaybook.target}</span>
                           </div>
                        </div>
                        
                        <div className="p-4 bg-[#1a1a24] border border-border border-l-4 border-l-primary flex gap-3">
                           <MessageSquare className="text-primary shrink-0 w-4 h-4" />
                           <p className="text-[11px] italic leading-tight text-foreground/90">
                              CEO Directive: {msg.data.recommendation}
                           </p>
                        </div>
                     </div>
                   )}

                   {msg.type === 'ERROR' && (
                     <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] flex gap-2">
                        <AlertTriangle size={14} /> {msg.content}
                     </div>
                   )}
                 </motion.div>
               ))}
             </AnimatePresence>
             <div ref={chatEndRef} />
          </div>

          {/* Activity Bar */}
          <div className="h-6 bg-muted/10 border-t border-border px-4 flex items-center justify-between text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                   <div className={`w-1.5 h-1.5 rounded-full ${isSearching ? 'bg-primary animate-ping' : 'bg-green-500'}`} />
                   Committee: {isSearching ? 'Engaged' : 'Standby'}
                </span>
                <span>Buffer: {messages.length} pkts</span>
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
