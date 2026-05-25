import {useQuery} from '@tanstack/react-query';
import {useParams, useSearchParams} from 'react-router-dom';
import {AlertTriangle, Loader2} from 'lucide-react';

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

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['evidence-packet', normalizedTicker],
    queryFn: () => fetchEvidencePacket(normalizedTicker),
    enabled: normalizedTicker.length > 0,
  });

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
          {variant === 'A' && <VariantA data={data} />}
          {variant === 'B' && <VariantB data={data} />}
          {variant === 'C' && <VariantC data={data} />}
          <PrototypeSwitcher variants={['A', 'B', 'C']} current={variant} />
        </div>
      ) : null}
    </>
  );
}
