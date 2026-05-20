import React, { useState, useMemo } from 'react';
import { useArchive } from '../hooks/useArchive';
import { ArchiveSession, Verdict, Outcome } from '../types';
import { Search, Calendar, ChevronDown, ChevronUp, BarChart3, MessageSquare, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const VERDICT_COLORS: Record<Verdict, string> = {
  'BUY': 'bg-green-500/10 text-green-400 border-green-500/20',
  'ADD': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'HOLD': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'TRIM': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'SELL': 'bg-red-500/10 text-red-400 border-red-500/20',
  'WATCH': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const OUTCOME_COLORS: Record<Outcome, string> = {
  'CORRECT': 'text-green-500',
  'INCORRECT': 'text-red-500',
  'PENDING': 'text-slate-500',
};

const PERSONAS = [
  { key: 'M', name: 'Mahaney', color: '#f5c518' },
  { key: 'H', name: 'Hohn', color: '#00c896' },
  { key: 'C', name: 'Cohen', color: '#ff4757' },
  { key: 'Mi', name: 'Micha', color: '#3b82f6' },
  { key: 'Ca', name: 'Carlson', color: '#a855f7' },
] as const;

export default function Archive() {
  const { sessions, updateSession } = useArchive();
  const [search, setSearch] = useState("");
  const [verdictFilter, setVerdictFilter] = useState<Verdict | "ALL">("ALL");
  const [minConviction, setMinConviction] = useState([0]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredSessions = useMemo(() => {
    return sessions
      .filter(s => {
        const matchesSearch = s.ticker.toLowerCase().includes(search.toLowerCase());
        const matchesVerdict = verdictFilter === "ALL" || s.verdict === verdictFilter;
        const matchesConviction = s.convictionScore >= minConviction[0];
        const matchesFrom = !dateFrom || s.date >= dateFrom;
        const matchesTo = !dateTo || s.date <= dateTo;
        return matchesSearch && matchesVerdict && matchesConviction && matchesFrom && matchesTo;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [sessions, search, verdictFilter, minConviction, dateFrom, dateTo, sortOrder]);

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto overflow-y-auto h-full">
      <header className="space-y-1">
        <h1 className="text-2xl font-mono font-bold text-primary tracking-tighter uppercase italic">RESEARCH ARCHIVE</h1>
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">DECISION JOURNAL — EVERY COMMITTEE SESSION ON RECORD</p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-muted/5 p-4 border border-border terminal-border">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Search</label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="FILTER BY TICKER..." 
              className="pl-7 h-8 rounded-none border-border bg-background/50 font-mono text-[10px]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Verdict</label>
          <Select value={verdictFilter} onValueChange={(v) => setVerdictFilter(v as any)}>
            <SelectTrigger className="h-8 rounded-none border-border bg-background/50 font-mono text-[10px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none font-mono text-[10px]">
              <SelectItem value="ALL">ALL VERDICTS</SelectItem>
              <SelectItem value="BUY">BUY</SelectItem>
              <SelectItem value="ADD">ADD</SelectItem>
              <SelectItem value="HOLD">HOLD</SelectItem>
              <SelectItem value="TRIM">TRIM</SelectItem>
              <SelectItem value="SELL">SELL</SelectItem>
              <SelectItem value="WATCH">WATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 px-2">
          <label className="text-[10px] font-mono text-muted-foreground uppercase font-bold flex justify-between">
            Min Conviction <span>{minConviction[0]}</span>
          </label>
          <Slider 
            value={minConviction} 
            max={10} 
            step={0.1} 
            onValueChange={setMinConviction} 
            className="py-3"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Date Range</label>
          <div className="flex gap-2">
             <Input 
               type="date" 
               className="h-8 rounded-none border-border bg-background/50 text-[10px] font-mono" 
               value={dateFrom}
               onChange={(e) => setDateFrom(e.target.value)}
             />
             <Input 
               type="date" 
               className="h-8 rounded-none border-border bg-background/50 text-[10px] font-mono" 
               value={dateTo}
               onChange={(e) => setDateTo(e.target.value)}
             />
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-mono text-muted-foreground font-bold">{filteredSessions.length} SESSIONS FOUND</span>
          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="text-[10px] font-mono text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors uppercase font-bold"
          >
            Sort by Date {sortOrder === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          </button>
        </div>

        {filteredSessions.map(session => (
          <SessionCard key={session.id} session={session} onUpdate={updateSession} />
        ))}
      </div>
    </div>
  );
}

interface SessionCardProps {
  session: ArchiveSession;
  onUpdate: (s: ArchiveSession) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="rounded-none bg-[#0d0d14] border-border terminal-border flex flex-col group transition-all duration-300 hover:border-primary/30">
      <CardContent className="p-4 space-y-4">
        {/* Header Row */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <span className="text-xl font-mono font-bold text-primary tracking-tighter">{session.ticker}</span>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-muted-foreground flex items-center gap-1">
                <Calendar size={10} /> {session.date}
              </span>
            </div>
            <Badge variant="outline" className={`rounded-none text-[9px] font-mono border ${VERDICT_COLORS[session.verdict]}`}>
              {session.verdict}
            </Badge>
          </div>
          
          <div className="text-right">
             <span className="text-[9px] font-mono text-muted-foreground uppercase opacity-50 block">Conviction</span>
             <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-foreground">{session.convictionScore.toFixed(1)} <span className="text-[10px] text-muted-foreground">/ 10</span></span>
                <div className="w-24 h-1 bg-muted/20 rounded-none overflow-hidden hidden sm:block">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${session.convictionScore * 10}%` }} 
                  />
                </div>
             </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-[11px] leading-relaxed text-foreground/90 font-medium border-l-2 border-primary/20 pl-3">
          {session.summary}
        </p>

        {/* Persona Verdicts Row */}
        <div className="flex flex-wrap gap-3 py-2 border-y border-border/10">
          {PERSONAS.map(p => (
             <div key={p.key} className="flex items-center gap-1.5">
               <span 
                 className="w-5 h-5 flex items-center justify-center font-mono text-[9px] font-bold border border-border" 
                 style={{ color: p.color, borderColor: `${p.color}33` }}
               >
                 {p.key}
               </span>
               <span className="text-[10px] font-mono text-muted-foreground font-bold">
                 {session.personaScores[p.key as keyof typeof session.personaScores]?.toFixed(1) || 'N/A'}
               </span>
             </div>
          ))}
        </div>

        {/* Outcome Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
           <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-muted-foreground uppercase font-bold flex items-center gap-1">
                Outcome Log <span className={`text-[8px] px-1 border ${session.outcome === 'CORRECT' ? 'border-green-500/30 text-green-500' : session.outcome === 'INCORRECT' ? 'border-red-500/30 text-red-500' : 'border-slate-500/30 text-muted-foreground'}`}>
                  {session.outcome}
                </span>
              </label>
              <div className="flex gap-2">
                <Input 
                  className="h-7 text-[10px] rounded-none bg-background/30 border-border font-mono" 
                  value={session.outcomeText}
                  onChange={(e) => onUpdate({...session, outcomeText: e.target.value})}
                  placeholder="ADD OUTCOME OBSERVATION..."
                />
                <Select 
                  value={session.outcome} 
                  onValueChange={(v: Outcome) => onUpdate({...session, outcome: v})}
                >
                  <SelectTrigger className="w-24 h-7 text-[9px] font-mono rounded-none border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-mono text-[10px]">
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="CORRECT">CORRECT</SelectItem>
                    <SelectItem value="INCORRECT">INCORRECT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
           </div>

           <div className="flex items-end justify-end pb-1">
             <Button 
               variant="ghost" 
               size="sm" 
               className="h-7 rounded-none text-[9px] font-mono text-muted-foreground hover:text-primary hover:bg-primary/5 uppercase font-bold"
               onClick={() => setIsExpanded(!isExpanded)}
             >
               {isExpanded ? <ChevronUp size={10} className="mr-1" /> : <ChevronDown size={10} className="mr-1" />}
               {isExpanded ? 'Collapse Transcript' : 'View Full Session'}
             </Button>
           </div>
        </div>

        {/* Collapsible Transcript */}
        {isExpanded && (
          <div className="mt-2 p-3 bg-[#0a0a0f] border border-border/50 font-mono text-[9px] text-[#448844] overflow-x-auto terminal-inner-shadow">
            <pre>{JSON.stringify(session.fullTranscript, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
