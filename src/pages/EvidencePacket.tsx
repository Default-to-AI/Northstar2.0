import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {AlertTriangle, Loader2} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import PrototypeSwitcher from '../components/prototype/PrototypeSwitcher';
import type {EvidencePacket as EvidencePacketResponse} from '../lib/evidenceAdapter';
import VariantA from './EvidencePacketVariants/VariantA';
import VariantB from './EvidencePacketVariants/VariantB';
import VariantC from './EvidencePacketVariants/VariantC';

async function fetchEvidencePacket(ticker: string): Promise<EvidencePacketResponse> {
  const response = await fetch(`/api/research/security/${encodeURIComponent(ticker)}`);
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {error?: string} | null;
    throw new Error(payload?.error ?? 'Failed to load evidence packet');
  }

  return (await response.json()) as EvidencePacketResponse;
}

export default function EvidencePacket() {
  const {ticker = ''} = useParams<{ticker: string}>();
  const normalizedTicker = ticker.toUpperCase();
  const [searchParams] = useSearchParams();
  const variant = searchParams.get('variant') ?? 'A';

  const queryClient = useQueryClient();
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const [refreshLog, setRefreshLog] = useState<string[]>([]);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['evidence-packet', normalizedTicker],
    queryFn: () => fetchEvidencePacket(normalizedTicker),
    enabled: normalizedTicker.length > 0,
  });

  type RefreshErrorPayload = {
    error?: string;
    code?: string;
    ticker?: string;
    retryAfterSeconds?: number;
    retryAfterMs?: number;
    nextAllowedAt?: string;
  };

  const parseMaybeJsonError = async (response: Response): Promise<RefreshErrorPayload | null> => {
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) return null;
    return (await response.json().catch(() => null)) as RefreshErrorPayload | null;
  };

  const runRefreshStream = async (): Promise<void> => {
    if (!normalizedTicker) return;
    setRefreshLoading(true);
    setRefreshError(null);
    setRefreshLog([]);

    const controller = new AbortController();

    try {
      const response = await fetch(
        `/api/research/security/${encodeURIComponent(normalizedTicker)}/refresh/stream`,
        {method: 'GET', signal: controller.signal},
      );

      if (!response.ok) {
        const payload = await parseMaybeJsonError(response);
        if (payload?.code === 'TICKER_REFRESH_COOLDOWN') {
          const seconds =
            typeof payload.retryAfterSeconds === 'number' && Number.isFinite(payload.retryAfterSeconds)
              ? Math.max(1, Math.ceil(payload.retryAfterSeconds))
              : null;
          const fallback = seconds !== null
            ? `Refresh is cooling down. Try again in ~${seconds}s.`
            : 'Refresh is cooling down. Try again soon.';
          throw new Error(payload.error ?? fallback);
        }

        throw new Error(payload?.error ?? 'Failed to refresh security evidence');
      }

      if (!response.body) {
        throw new Error('Refresh stream not available');
      }

      const decoder = new TextDecoder();
      const reader = response.body.getReader();
      let buffer = '';
      let sawDone = false;

      const pushLog = (line: string): void => {
        setRefreshLog((prev) => {
          const next = prev.length > 200 ? prev.slice(prev.length - 200) : prev;
          return [...next, line];
        });
      };

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {stream: true});

        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          const lines = part.split(/\r?\n/);
          const eventLine = lines.find((line) => line.startsWith('event: '));
          const dataLine = lines.find((line) => line.startsWith('data: '));
          const event = eventLine ? eventLine.slice('event: '.length).trim() : 'message';
          const data = dataLine ? dataLine.slice('data: '.length) : '';

          if (event === 'log' || event === 'start') {
            if (data.trim().length > 0) pushLog(data);
          } else if (event === 'error') {
            throw new Error(data.trim().length > 0 ? data : 'Refresh failed');
          } else if (event === 'done') {
            sawDone = true;
          }
        }
      }

      if (!sawDone) {
        pushLog('Collector exited without a done signal.');
      }

      await queryClient.invalidateQueries({queryKey: ['evidence-packet', normalizedTicker]});
    } catch (err: unknown) {
      setRefreshError(err instanceof Error ? err.message : 'Failed to refresh security evidence');
    } finally {
      controller.abort();
      setRefreshLoading(false);
    }
  };

  const runRefresh = async (): Promise<void> => {
    if (!normalizedTicker) return;
    setRefreshLoading(true);
    setRefreshError(null);

    try {
      const response = await fetch(
        `/api/research/security/${encodeURIComponent(normalizedTicker)}/refresh`,
        {method: 'POST', headers: {'Content-Type': 'application/json'}},
      );
      const payload = (await response.json().catch(() => null)) as RefreshErrorPayload | null;
      if (!response.ok) {
        if (payload?.code === 'TICKER_REFRESH_COOLDOWN') {
          const seconds =
            typeof payload.retryAfterSeconds === 'number' && Number.isFinite(payload.retryAfterSeconds)
              ? Math.max(1, Math.ceil(payload.retryAfterSeconds))
              : null;
          const fallback = seconds !== null
            ? `Refresh is cooling down. Try again in ~${seconds}s.`
            : 'Refresh is cooling down. Try again soon.';
          throw new Error(payload.error ?? fallback);
        }

        throw new Error(payload?.error ?? 'Failed to refresh security evidence');
      }

      await queryClient.invalidateQueries({queryKey: ['evidence-packet', normalizedTicker]});
    } catch (err: unknown) {
      setRefreshError(err instanceof Error ? err.message : 'Failed to refresh security evidence');
    } finally {
      setRefreshLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="p-6">
          <Card className="rounded-none border-border p-6 bg-[#0d0d14] flex items-center gap-3 max-w-4xl mx-auto">
            <Loader2 className="animate-spin" size={16} />
            <span className="font-mono text-xs uppercase">Loading evidence...</span>
          </Card>
        </div>
      ) : null}

      {isError ? (
        <div className="p-6">
          <Card className="rounded-none border-red-500/40 p-6 bg-red-500/5 space-y-2 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase">
              <AlertTriangle size={14} /> Failed to load evidence
            </div>
            <p className="text-xs text-red-200">{error instanceof Error ? error.message : 'Unknown error'}</p>
            <p className="text-xs text-muted-foreground">
              Run: <code className="font-mono">python3 scripts/collect_evidence.py --ticker {normalizedTicker}</code>
            </p>
          </Card>
        </div>
      ) : null}

      {data ? (
        <div className="w-full h-full relative">
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {refreshError ? (
              <span className="text-[10px] font-mono text-red-300 bg-red-500/10 border border-red-500/30 px-2 py-1 rounded-none">
                {refreshError}
              </span>
            ) : null}
            {refreshLoading && refreshLog.length > 0 ? (
              <span className="text-[10px] font-mono text-muted-foreground bg-muted/10 border border-border px-2 py-1 rounded-none max-w-[380px] truncate">
                {refreshLog.at(-1)}
              </span>
            ) : null}
            <Button
              type="button"
              variant="outline"
              className="rounded-none h-8 px-3 text-[10px] font-mono font-bold uppercase tracking-widest"
              disabled={refreshLoading}
              onClick={() => void runRefreshStream()}
            >
              {refreshLoading ? 'Refreshing…' : 'Refresh'}
            </Button>
          </div>
          {variant === 'A' && <VariantA data={data} />}
          {variant === 'B' && <VariantB data={data} />}
          {variant === 'C' && <VariantC data={data} />}
          <PrototypeSwitcher variants={['A', 'B', 'C']} current={variant} />
        </div>
      ) : null}
    </>
  );
}
