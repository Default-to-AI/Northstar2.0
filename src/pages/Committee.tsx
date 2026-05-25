import React, {useEffect, useMemo, useState} from 'react';
import {Search, Loader2, Sparkles, AlertTriangle} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useArchive} from '../hooks/useArchive';
import {Verdict, Outcome} from '../types';
import {useSearchParams} from 'react-router-dom';

type CommitteeReport = {
  category: 'BUY' | 'ADD' | 'HOLD' | 'TRIM' | 'SELL' | 'WATCH';
  market_implication: string;
  playbook?: {
    entry?: string;
    stop?: string;
    target?: string;
    size?: string;
    invalidation?: string;
    review_trigger?: string;
    confidence?: string;
    citations?: string[];
  };
};

type CommitteeResponse = {
  error?: string;
  sessionId?: string;
  evidencePacketId?: string;
  ticker?: string;
  model?: string;
  externalLlm?: boolean;
  final?: CommitteeReport;
  warnings?: string[];
  riskGovernance?: {
    boundedSizeRange?: {
      minPct: number;
      maxPct: number;
      label: string;
    };
    violations?: string[];
    configVersion?: string;
  };
};

type SessionLineage = {
  sessionId: string;
  evidencePacketId: string;
  ticker: string;
  model: string;
  externalLlm: boolean;
};

type ReadinessResponse = {
  status: string;
};

type EvidencePacketStatusResponse = {
  actionabilityState?: string;
};

type FetchLike = (input: string, init?: RequestInit) => Promise<{
  ok: boolean;
  json: () => Promise<unknown>;
}>;

export async function loadReadinessStatus(fetchImpl: FetchLike): Promise<string> {
  try {
    const res = await fetchImpl('/api/research/readiness');
    if (!res.ok) throw new Error('Failed to fetch readiness');
    const data = (await res.json()) as ReadinessResponse;
    return data.status;
  } catch {
    return 'error';
  }
}

export async function loadPacketActionabilityStatus(fetchImpl: FetchLike, evidencePacketId: string): Promise<string> {
  const packetId = evidencePacketId.trim();
  if (!packetId) return 'unknown';
  try {
    const res = await fetchImpl(`/api/research/evidence/${encodeURIComponent(packetId)}`);
    if (!res.ok) throw new Error('Failed to fetch evidence packet status');
    const data = (await res.json()) as EvidencePacketStatusResponse;
    return data.actionabilityState ?? 'unknown';
  } catch {
    return 'error';
  }
}

export function buildAdvisoryWarnings(warnings: string[] = [], violations: string[] = []): string[] {
  return [
    ...warnings,
    ...violations.map((violation) => `risk:${violation}`),
  ];
}

export function getCommitteeGateMessage(args: {
  evidencePacketId: string;
  readinessStatus: string;
  packetActionabilityStatus: string;
}): string | null {
  if (!args.evidencePacketId.trim()) return 'Frozen evidence packet ID required.';
  if (args.readinessStatus !== 'fresh_actionable') return `Readiness not actionable (${args.readinessStatus}).`;
  if (args.packetActionabilityStatus !== 'fresh_actionable') return `Selected packet stale (${args.packetActionabilityStatus}).`;
  return null;
}

export function CommitteeCompletePanel(props: {
  report: CommitteeReport;
  riskBoundedSizeLabel: string | null;
  advisoryWarnings: string[];
}): React.JSX.Element {
  const {report, riskBoundedSizeLabel, advisoryWarnings} = props;

  return (
    <div className="space-y-3 text-sm">
      <div className="text-primary font-bold">{report.category}</div>
      <div>{report.market_implication}</div>
      {report.playbook && (
        <ul className="text-xs opacity-90 space-y-1">
          <li>entry: {report.playbook.entry}</li>
          <li>stop: {report.playbook.stop}</li>
          <li>target: {report.playbook.target}</li>
          <li>size: {report.playbook.size}</li>
          {riskBoundedSizeLabel && <li>risk-bounded size range: {riskBoundedSizeLabel}</li>}
          <li>invalidation: {report.playbook.invalidation}</li>
          <li>review trigger: {report.playbook.review_trigger}</li>
          <li>confidence: {report.playbook.confidence}</li>
        </ul>
      )}
      {advisoryWarnings.length > 0 && (
        <div className="text-amber-400 text-xs mt-3">
          <div className="font-bold">advisory warnings</div>
          <ul className="list-disc pl-5 space-y-1">
            {advisoryWarnings.map((warning) => <li key={warning}>{warning}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export function canStartCommitteeGate(args: {
  evidencePacketId: string;
  readinessStatus: string;
  packetActionabilityStatus: string;
  sessionState: 'IDLE' | 'ANALYZING' | 'COMPLETE';
}): boolean {
  return args.evidencePacketId.trim().length > 0
    && args.readinessStatus === 'fresh_actionable'
    && args.packetActionabilityStatus === 'fresh_actionable'
    && args.sessionState !== 'ANALYZING';
}

export function buildArchiveSessionDraft(args: {
  sessionLineage: SessionLineage;
  report: CommitteeReport;
  dateIso: string;
}): {
  id: string;
  ticker: string;
  date: string;
  verdict: Verdict;
  convictionScore: number;
  summary: string;
  personaScores: {M: number; H: number; C: number; Mi: number; Ca: number};
  outcome: Outcome;
  outcomeText: string;
  fullTranscript: CommitteeReport;
  committeeSessionId: string;
  evidencePacketId: string;
  committeeModel: string;
  committeeExternalLlm: boolean;
} {
  const verdictMap: Record<CommitteeReport['category'], Verdict> = {
    BUY: 'BUY',
    ADD: 'ADD',
    HOLD: 'HOLD',
    TRIM: 'TRIM',
    SELL: 'SELL',
    WATCH: 'WATCH',
  };

  return {
    id: args.sessionLineage.sessionId,
    ticker: args.sessionLineage.ticker,
    date: args.dateIso.split('T')[0],
    verdict: verdictMap[args.report.category],
    convictionScore: args.report.category === 'BUY' || args.report.category === 'SELL' ? 8 : 6,
    summary: args.report.market_implication,
    personaScores: {M: 0, H: 0, C: 0, Mi: 0, Ca: 0},
    outcome: 'PENDING' as Outcome,
    outcomeText: '',
    fullTranscript: args.report,
    committeeSessionId: args.sessionLineage.sessionId,
    evidencePacketId: args.sessionLineage.evidencePacketId,
    committeeModel: args.sessionLineage.model,
    committeeExternalLlm: args.sessionLineage.externalLlm,
  };
}

export default function Committee() {
  const {addSession} = useArchive();
  const [searchParams] = useSearchParams();
  const [ticker, setTicker] = useState((searchParams.get('ticker') ?? '').toUpperCase());
  const [evidencePacketId, setEvidencePacketId] = useState(searchParams.get('evidencePacketId') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [sessionState, setSessionState] = useState<'IDLE' | 'ANALYZING' | 'COMPLETE'>('IDLE');
  const [report, setReport] = useState<CommitteeReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [readinessStatus, setReadinessStatus] = useState<string>('loading');
  const [packetActionabilityStatus, setPacketActionabilityStatus] = useState<string>('loading');
  const [sessionLineage, setSessionLineage] = useState<SessionLineage | null>(null);
  const [advisoryWarnings, setAdvisoryWarnings] = useState<string[]>([]);
  const [riskBoundedSizeLabel, setRiskBoundedSizeLabel] = useState<string | null>(null);

  useEffect(() => {
    const loadReadiness = async (): Promise<void> => {
      setReadinessStatus(await loadReadinessStatus(fetch));
    };
    void loadReadiness();
  }, []);

  useEffect(() => {
    const loadPacketStatus = async (): Promise<void> => {
      setPacketActionabilityStatus(await loadPacketActionabilityStatus(fetch, evidencePacketId));
    };
    void loadPacketStatus();
  }, [evidencePacketId]);

  const canStart = useMemo(() => {
    return canStartCommitteeGate({
      evidencePacketId,
      readinessStatus,
      packetActionabilityStatus,
      sessionState,
    });
  }, [evidencePacketId, packetActionabilityStatus, readinessStatus, sessionState]);

  const disabledReason = useMemo(() => {
    return getCommitteeGateMessage({
      evidencePacketId,
      readinessStatus,
      packetActionabilityStatus,
    });
  }, [evidencePacketId, packetActionabilityStatus, readinessStatus]);

  const startSession = async () => {
    if (!canStart) return;
    setIsSearching(true);
    setError(null);
    setSessionState('ANALYZING');

    try {
      const response = await fetch('/api/research/committee/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({evidencePacketId}),
      });
      const data = (await response.json()) as CommitteeResponse;

      if (data.error) {
        throw new Error(data.error);
      }
      if (!data.final || !data.sessionId || !data.evidencePacketId || !data.ticker || !data.model || typeof data.externalLlm !== 'boolean') {
        throw new Error('Committee response missing required fields');
      }

      setSessionLineage({
        sessionId: data.sessionId,
        evidencePacketId: data.evidencePacketId,
        ticker: data.ticker,
        model: data.model,
        externalLlm: data.externalLlm,
      });
      setAdvisoryWarnings(buildAdvisoryWarnings(data.warnings ?? [], data.riskGovernance?.violations ?? []));
      setRiskBoundedSizeLabel(data.riskGovernance?.boundedSizeRange?.label ?? null);
      setReport(data.final);
      setSessionState('COMPLETE');
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : 'Session sync failure. Check connection.');
      setSessionState('IDLE');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCommit = async () => {
    if (!report || !sessionLineage) return;

    await addSession(buildArchiveSessionDraft({
      sessionLineage,
      report,
      dateIso: new Date().toISOString(),
    }));

    setSessionState('IDLE');
    setReport(null);
    setSessionLineage(null);
    setAdvisoryWarnings([]);
    setRiskBoundedSizeLabel(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] text-[#888] font-mono p-6 overflow-hidden">
      <header className="mb-6 flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tighter uppercase italic">AI ANALYST ROOM</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">MICHA.STOCKS AI-ERA FUNDAMENTAL ANALYSIS</p>
        </div>
        {sessionState === 'COMPLETE' && (
          <Button onClick={handleCommit} className="rounded-none bg-primary text-black font-bold h-8 text-[10px] uppercase tracking-widest px-6">
            Commit to Archive
          </Button>
        )}
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="w-96 flex flex-col gap-4">
          <Card className="rounded-none bg-muted/5 border-border terminal-border">
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase mb-2 block">Ticker (for readiness check)</label>
                <Input value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="bg-background/50 border-border rounded-none h-9 text-foreground italic" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase mb-2 block">Frozen Evidence Packet ID</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
                    <Input
                      value={evidencePacketId}
                      onChange={(e) => setEvidencePacketId(e.target.value)}
                      placeholder="pkt_NVDA_..."
                      className="bg-background/50 border-border rounded-none pl-8 h-9 text-foreground italic focus-visible:ring-0"
                      disabled={sessionState === 'ANALYZING'}
                    />
                  </div>
                  <Button onClick={startSession} disabled={!canStart} className="rounded-none bg-primary text-black font-bold h-9 px-4 disabled:opacity-50">
                    {isSearching ? <Loader2 className="animate-spin" size={14} /> : 'START'}
                  </Button>
                </div>
              </div>
              <div className="text-[10px] uppercase opacity-70 space-y-1">
                <div>readiness: {readinessStatus}</div>
                <div>packet actionability: {packetActionabilityStatus}</div>
                {disabledReason ? <div className="text-amber-500">gate: {disabledReason}</div> : <div className="text-green-500">gate: ready</div>}
              </div>
            </CardContent>
          </Card>

          <div className="mt-auto p-4 bg-muted/5 border border-border/30 italic text-[10px] text-muted-foreground/50 leading-relaxed terminal-border">
            Note: Committee synthesis is generated by an external LLM provider using frozen evidence packets. This is research aid, not execution advice.
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#0d0d14] border border-border terminal-border overflow-hidden relative p-6">
          {sessionState === 'IDLE' && !error && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-20">
              <Sparkles className="w-12 h-12 text-primary" />
              <p className="text-[12px] uppercase tracking-widest text-center max-w-xs">Provide ticker + frozen evidence packet to begin grounded committee analysis.</p>
            </div>
          )}
          {sessionState === 'ANALYZING' && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="animate-spin w-12 h-12 text-primary" />
              <p className="text-[12px] uppercase tracking-widest text-center animate-pulse text-primary">Synthesizing evidence...</p>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] flex gap-2">
              <AlertTriangle size={14} /> {error}
            </div>
          )}
          {sessionState === 'COMPLETE' && report && (
            <CommitteeCompletePanel
              report={report}
              riskBoundedSizeLabel={riskBoundedSizeLabel}
              advisoryWarnings={advisoryWarnings}
            />
          )}
        </div>
      </div>
    </div>
  );
}
