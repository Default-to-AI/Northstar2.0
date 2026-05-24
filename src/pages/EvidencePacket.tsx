import {useQuery} from '@tanstack/react-query';
import {Link, useParams} from 'react-router-dom';
import {AlertTriangle, Loader2} from 'lucide-react';

import {Card} from '@/components/ui/card';

type EvidencePacketResponse = {
  ticker: string;
  valuation: {
    marketCap: number | null;
    trailingPE: number | null;
    forwardPE: number | null;
    priceToBook: number | null;
  };
  fundamentals: {
    profitMargins: number | null;
    revenueGrowth: number | null;
    freeCashflow: number | null;
    freeCashflowMargin: number | null;
    freeCashflowYield: number | null;
  };
  technicals: {
    fiftyDayMA: number | null;
    twoHundredDayMA: number | null;
    fiftyTwoWeekHigh: number | null;
    fiftyTwoWeekLow: number | null;
    currentPrice: number | null;
  };
  lastUpdated: string | null;
};

async function fetchEvidencePacket(ticker: string): Promise<EvidencePacketResponse> {
  const response = await fetch(`/api/research/security/${encodeURIComponent(ticker)}`);
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {error?: string} | null;
    throw new Error(payload?.error ?? 'Failed to load evidence packet');
  }

  return (await response.json()) as EvidencePacketResponse;
}

function formatNumber(value: number | null, options?: Intl.NumberFormatOptions): string {
  if (value === null || Number.isNaN(value)) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', options).format(value);
}

function formatPercent(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return 'N/A';
  }

  return `${(value * 100).toFixed(2)}%`;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'N/A';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day}/${month}/${year} at ${hours}:${minutes}`;
}

export default function EvidencePacket() {
  const {ticker = ''} = useParams<{ticker: string}>();
  const normalizedTicker = ticker.toUpperCase();

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['evidence-packet', normalizedTicker],
    queryFn: () => fetchEvidencePacket(normalizedTicker),
    enabled: normalizedTicker.length > 0,
  });

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto overflow-y-auto h-full pb-12">
      <header className="space-y-2 border-b border-border pb-4">
        <h1 className="text-2xl font-mono font-bold text-primary uppercase tracking-tight">
          Evidence Packet: {normalizedTicker || 'Unknown'}
        </h1>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Research snapshot from SQLite ticker_evidence
        </p>
      </header>

      {isLoading ? (
        <Card className="rounded-none border-border p-6 bg-[#0d0d14] flex items-center gap-3">
          <Loader2 className="animate-spin" size={16} />
          <span className="font-mono text-xs uppercase">Loading evidence...</span>
        </Card>
      ) : null}

      {isError ? (
        <Card className="rounded-none border-red-500/40 p-6 bg-red-500/5 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase">
            <AlertTriangle size={14} /> Failed to load evidence
          </div>
          <p className="text-xs text-red-200">{error instanceof Error ? error.message : 'Unknown error'}</p>
          <p className="text-xs text-muted-foreground">
            Run: <code className="font-mono">python3 scripts/collect_evidence.py --ticker {normalizedTicker}</code>
          </p>
        </Card>
      ) : null}

      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rounded-none border-border p-4 bg-[#0d0d14] space-y-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">Valuation</h2>
            <p className="text-sm">Market Cap: {formatNumber(data.valuation.marketCap, {notation: 'compact'})}</p>
            <p className="text-sm">Trailing P/E: {formatNumber(data.valuation.trailingPE, {maximumFractionDigits: 2})}</p>
            <p className="text-sm">Forward P/E: {formatNumber(data.valuation.forwardPE, {maximumFractionDigits: 2})}</p>
            <p className="text-sm">Price/Book: {formatNumber(data.valuation.priceToBook, {maximumFractionDigits: 2})}</p>
          </Card>

          <Card className="rounded-none border-border p-4 bg-[#0d0d14] space-y-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">Fundamentals</h2>
            <p className="text-sm">Profit Margins: {formatPercent(data.fundamentals.profitMargins)}</p>
            <p className="text-sm">Revenue Growth: {formatPercent(data.fundamentals.revenueGrowth)}</p>
            <p className="text-sm">Free Cash Flow: {formatNumber(data.fundamentals.freeCashflow, {notation: 'compact'})}</p>
            <p className="text-sm">FCF Margin: {formatPercent(data.fundamentals.freeCashflowMargin)}</p>
            <p className="text-sm">FCF Yield: {formatPercent(data.fundamentals.freeCashflowYield)}</p>
          </Card>

          <Card className="rounded-none border-border p-4 bg-[#0d0d14] space-y-2 md:col-span-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">Technicals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <p>Current Price: {formatNumber(data.technicals.currentPrice, {maximumFractionDigits: 2})}</p>
              <p>50D MA: {formatNumber(data.technicals.fiftyDayMA, {maximumFractionDigits: 2})}</p>
              <p>200D MA: {formatNumber(data.technicals.twoHundredDayMA, {maximumFractionDigits: 2})}</p>
              <p>52W High: {formatNumber(data.technicals.fiftyTwoWeekHigh, {maximumFractionDigits: 2})}</p>
              <p>52W Low: {formatNumber(data.technicals.fiftyTwoWeekLow, {maximumFractionDigits: 2})}</p>
            </div>
          </Card>

          <Card className="rounded-none border-border p-4 bg-muted/10 md:col-span-2">
            <p className="text-xs font-mono uppercase text-muted-foreground">
              Last Updated: {formatDate(data.lastUpdated)}
            </p>
          </Card>
        </div>
      ) : null}

      <div>
        <Link to="/scanner" className="text-xs font-mono uppercase text-primary hover:underline">
          Back to Scanner
        </Link>
      </div>
    </div>
  );
}
