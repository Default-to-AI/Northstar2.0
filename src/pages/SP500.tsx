import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Search, ChevronUp, ChevronDown, ChevronsUpDown,
  RefreshCw, Filter, ExternalLink,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type Sp500Item = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
  price: number | null;
  marketCap: number | null;
  trailingPe: number | null;
  forwardPe: number | null;
  revenueGrowth: number | null;
  profitMargins: number | null;
  grossMargin: number | null;
  operatingMargin: number | null;
  roe: number | null;
  debtToEquity: number | null;
  compoundScore: number | null;
  tacticalScore: number | null;
  actionabilityState: string | null;
  fiftyDayMa: number | null;
  twoHundredDayMa: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  avgDollarVolume: number | null;
  dataAsOf: string | null;
};

type Sp500Response = {
  generatedAt: string;
  universe: string;
  total: number;
  limit: number;
  offset: number;
  sectors: string[];
  items: Sp500Item[];
  error?: string;
};

type SortKey =
  | 'market_cap' | 'score' | 'tactical' | 'pe' | 'forward_pe'
  | 'revenue_growth' | 'profit_margin' | 'price' | 'ticker';

// ─── Formatters ───────────────────────────────────────────────────────────────

const fmt = {
  price: (v: number | null) => {
    if (v == null || !Number.isFinite(v)) return '—';
    return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
  },
  cap: (v: number | null) => {
    if (v == null || !Number.isFinite(v)) return '—';
    if (Math.abs(v) >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
    if (Math.abs(v) >= 1e9)  return `$${(v / 1e9).toFixed(2)}B`;
    if (Math.abs(v) >= 1e6)  return `$${(v / 1e6).toFixed(2)}M`;
    return `$${v.toLocaleString()}`;
  },
  pct: (v: number | null, decimals = 1) => {
    if (v == null || !Number.isFinite(v)) return '—';
    return `${(v * 100).toFixed(decimals)}%`;
  },
  pe: (v: number | null) => {
    if (v == null || !Number.isFinite(v) || v <= 0) return '—';
    return v.toFixed(1) + 'x';
  },
  score: (v: number | null) => {
    if (v == null || !Number.isFinite(v)) return null;
    return Math.round(v);
  },
  vol: (v: number | null) => {
    if (v == null || !Number.isFinite(v)) return '—';
    if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
    return `$${v.toLocaleString()}`;
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CompanyLogo({ ticker }: { ticker: string }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [ticker]);

  if (error) {
    return (
      <div className="w-6 h-6 rounded bg-[#2a2b36] flex items-center justify-center font-bold text-white text-[10px] shrink-0">
        {ticker.charAt(0)}
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded bg-white flex items-center justify-center overflow-hidden shrink-0 p-0.5">
      <img 
        src={`https://img.logo.dev/ticker/${ticker}?token=pk_CyCNK430RpK33Qe6o3xFlw&size=60`} 
        alt={`${ticker} logo`} 
        className="w-full h-full object-contain"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}

function ScoreBar({ value, color }: { value: number | null; color: string }) {
  const s = fmt.score(value);
  if (s == null) return <span className="text-muted-foreground font-mono text-[11px]">—</span>;
  const w = `${s}%`;
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: w, background: color }} />
      </div>
      <span className="text-[11px] font-mono font-bold tabular-nums w-6 text-right" style={{ color }}>
        {s}
      </span>
    </div>
  );
}

function ActionBadge({ state }: { state: string | null }) {
  if (!state) return <span className="text-muted-foreground text-[10px] font-mono">—</span>;
  const map: Record<string, { label: string; cls: string }> = {
    fresh_actionable:    { label: 'FRESH',   cls: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5' },
    stale_usable:        { label: 'STALE',   cls: 'text-amber-400 border-amber-400/30 bg-amber-400/5' },
    blocked_core_stale:  { label: 'BLOCKED', cls: 'text-red-400 border-red-400/30 bg-red-400/5' },
    degraded_partial:    { label: 'DEGRADED',cls: 'text-orange-400 border-orange-400/30 bg-orange-400/5' },
  };
  const info = map[state] ?? { label: state.toUpperCase().replace(/_/g, ' '), cls: 'text-muted-foreground border-border bg-muted/10' };
  return (
    <span className={cn('px-1.5 py-0.5 border text-[9px] font-mono font-bold tracking-widest rounded-none', info.cls)}>
      {info.label}
    </span>
  );
}

function SectorPill({ sector }: { sector: string | null }) {
  if (!sector) return <span className="text-muted-foreground text-[10px]">—</span>;
  const colors: Record<string, string> = {
    'Technology':              '#7c3aed',
    'Communication Services':  '#2563eb',
    'Health Care':             '#059669',
    'Financials':              '#b45309',
    'Consumer Discretionary':  '#db2777',
    'Consumer Staples':        '#65a30d',
    'Energy':                  '#dc2626',
    'Industrials':             '#0891b2',
    'Materials':               '#0d9488',
    'Real Estate':             '#7c2d12',
    'Utilities':               '#4338ca',
  };
  const color = colors[sector] ?? '#555';
  return (
    <span
      className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest rounded-none border whitespace-nowrap"
      style={{ color, borderColor: `${color}40`, background: `${color}10` }}
    >
      {sector.toUpperCase()}
    </span>
  );
}

function GrowthCell({ value }: { value: number | null }) {
  if (value == null || !Number.isFinite(value)) return <span className="text-muted-foreground">—</span>;
  const pct = value * 100;
  const color = pct >= 15 ? '#10b981' : pct >= 5 ? '#f59e0b' : pct >= 0 ? '#94a3b8' : '#ef4444';
  return (
    <span className="font-mono text-[11px] font-semibold" style={{ color }}>
      {pct >= 0 ? '+' : ''}{pct.toFixed(1)}%
    </span>
  );
}

function Th({
  label, sortKey, currentSort, currentOrder, onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  currentOrder: 'asc' | 'desc';
  onSort: (k: SortKey) => void;
}) {
  const active = currentSort === sortKey;
  return (
    <th
      className={cn(
        'px-3 py-3 text-left cursor-pointer select-none whitespace-nowrap group',
        'text-[10px] font-mono font-bold uppercase tracking-widest',
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
      )}
      onClick={() => onSort(sortKey)}
    >
      <span className="flex items-center gap-1">
        {label}
        {active
          ? (currentOrder === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />)
          : <ChevronsUpDown size={11} className="opacity-30 group-hover:opacity-70" />
        }
      </span>
    </th>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SP500() {
  const navigate = useNavigate();

  const [data, setData]           = useState<Sp500Response | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [sort, setSort]           = useState<SortKey>('market_cap');
  const [order, setOrder]         = useState<'asc' | 'desc'>('desc');
  const [sector, setSector]       = useState<string>('');
  const [query, setQuery]         = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [page, setPage]           = useState(0);
  const PAGE_SIZE                 = 100;

  // Debounce search query
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedQ(query), 200);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [query]);

  // Reset page on filter/sort change
  useEffect(() => { setPage(0); }, [sort, order, sector, debouncedQ]);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      sort,
      order,
      limit: String(PAGE_SIZE),
      offset: String(page * PAGE_SIZE),
    });
    if (sector)   params.set('sector', sector);
    if (debouncedQ) params.set('q', debouncedQ);

    const ctrl = new AbortController();
    fetch(`/api/research/sp500?${params}`, { signal: ctrl.signal })
      .then(async (r) => {
        const payload = await r.json() as Sp500Response;
        if (!r.ok || payload.error) throw new Error(payload.error ?? 'Failed to load');
        return payload;
      })
      .then((payload) => { setData(payload); setLoading(false); })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load S&P 500 data');
        setLoading(false);
      });
    return () => ctrl.abort();
  }, [sort, order, sector, debouncedQ, page]);

  useEffect(() => fetchData(), [fetchData]);

  const handleSort = (k: SortKey) => {
    if (sort === k) setOrder((o) => (o === 'desc' ? 'asc' : 'desc'));
    else { setSort(k); setOrder(k === 'pe' || k === 'forward_pe' || k === 'ticker' ? 'asc' : 'desc'); }
  };

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  const lastUpdated = useMemo(() => {
    if (!data?.items?.length) return null;
    const dates = data.items.map((i) => i.dataAsOf).filter(Boolean) as string[];
    if (!dates.length) return null;
    return new Date(dates.sort().at(-1)!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [data]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#09090f]">
      {/* Header */}
      <div className="shrink-0 px-6 pt-6 pb-4 border-b border-border bg-[#09090f]">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-mono font-bold text-primary tracking-tighter uppercase italic flex items-center gap-2">
              <TrendingUp size={22} />
              S&amp;P 500
            </h1>
            <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest mt-0.5">
              {data ? (
                <>
                  {data.total.toLocaleString()} SECURITIES
                  {data.universe === 'sp500' ? ' · INDEX MEMBERS' : ' · ALL ACTIVE (RUN seed-sp500.py TO FILTER)'}
                  {lastUpdated ? ` · DATA AS OF ${lastUpdated.toUpperCase()}` : ''}
                </>
              ) : 'LOADING…'}
            </p>
          </div>
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest border border-border px-3 py-1.5 hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-40"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            REFRESH
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ticker or name…"
              className="pl-9 pr-3 h-8 w-56 rounded-none font-mono text-[11px] bg-[#0d0d14] border-border"
            />
          </div>

          {/* Sector filter */}
          {data?.sectors && data.sectors.length > 0 && (
            <div className="relative flex items-center gap-1.5">
              <Filter size={12} className="text-muted-foreground" />
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="h-8 rounded-none font-mono text-[11px] bg-[#0d0d14] border border-border text-foreground px-2 pr-6 appearance-none cursor-pointer focus:outline-none focus:border-primary/50"
              >
                <option value="">ALL SECTORS</option>
                {data.sectors.map((s) => (
                  <option key={s} value={s}>{s.toUpperCase()}</option>
                ))}
              </select>
            </div>
          )}

          {/* Pagination info */}
          {data && data.total > PAGE_SIZE && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[10px] font-mono text-muted-foreground">
                PAGE {page + 1}/{totalPages}
              </span>
              <button
                type="button" disabled={page === 0} onClick={() => setPage((p) => p - 1)}
                className="px-2 py-1 text-[10px] font-mono border border-border hover:border-foreground/30 disabled:opacity-30 transition-colors"
              >
                ← PREV
              </button>
              <button
                type="button" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}
                className="px-2 py-1 text-[10px] font-mono border border-border hover:border-foreground/30 disabled:opacity-30 transition-colors"
              >
                NEXT →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        {error ? (
          <div className="p-8">
            <Card className="rounded-none border-red-400/20 bg-red-400/5 p-6">
              <p className="text-red-400 font-mono text-sm">{error}</p>
              {error.includes('seed') || error.includes('no data') ? (
                <p className="text-muted-foreground font-mono text-xs mt-3 leading-relaxed">
                  Run: <code className="text-primary">python3 scripts/seed-sp500.py</code> then{' '}
                  <code className="text-primary">python3 scripts/run-pipeline.py</code> and{' '}
                  <code className="text-primary">python3 scripts/run-scanner.py</code>
                </p>
              ) : null}
            </Card>
          </div>
        ) : loading && !data ? (
          <div className="p-8 flex items-center gap-3 text-muted-foreground font-mono text-sm">
            <RefreshCw size={14} className="animate-spin" />
            Loading S&amp;P 500 data…
          </div>
        ) : data?.items.length === 0 ? (
          <div className="p-8">
            <Card className="rounded-none border-border bg-muted/5 p-10 flex flex-col items-center gap-4 text-center">
              <TrendingUp size={32} className="text-primary/40" />
              <div>
                <p className="text-foreground font-mono font-bold uppercase tracking-widest text-sm">No Data Available</p>
                <p className="text-muted-foreground font-mono text-xs mt-2 leading-relaxed max-w-md">
                  Run the seed script to populate all S&amp;P 500 constituents:
                </p>
                <div className="mt-4 space-y-1 text-left">
                  {[
                    'python3 scripts/seed-sp500.py',
                    'python3 scripts/run-pipeline.py',
                    'python3 scripts/run-scanner.py',
                  ].map((cmd) => (
                    <div key={cmd} className="bg-[#0d0d14] border border-border px-3 py-2 font-mono text-[11px] text-primary">
                      $ {cmd}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 z-10 bg-[#09090f] border-b border-border">
              <tr>
                <th className="px-3 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground w-8">#</th>
                <th className="px-3 py-3 text-left w-12"></th>
                <Th label="Ticker"    sortKey="ticker"         currentSort={sort} currentOrder={order} onSort={handleSort} />
                <th className="px-3 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">Company</th>
                <th className="px-3 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">Sector</th>
                <Th label="Price"     sortKey="price"          currentSort={sort} currentOrder={order} onSort={handleSort} />
                <Th label="Mkt Cap"   sortKey="market_cap"     currentSort={sort} currentOrder={order} onSort={handleSort} />
                <Th label="P/E"       sortKey="pe"             currentSort={sort} currentOrder={order} onSort={handleSort} />
                <Th label="Fwd P/E"   sortKey="forward_pe"     currentSort={sort} currentOrder={order} onSort={handleSort} />
                <Th label="Rev Grw"   sortKey="revenue_growth" currentSort={sort} currentOrder={order} onSort={handleSort} />
                <Th label="Mrgn"      sortKey="profit_margin"  currentSort={sort} currentOrder={order} onSort={handleSort} />
                <Th label="Score"     sortKey="score"          currentSort={sort} currentOrder={order} onSort={handleSort} />
                <Th label="Tactical"  sortKey="tactical"       currentSort={sort} currentOrder={order} onSort={handleSort} />
                <th className="px-3 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">State</th>
                <th className="px-3 py-3 text-right text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground w-8"></th>
              </tr>
            </thead>
            <tbody>
              {(data?.items ?? []).map((item, idx) => {
                const rowNum = page * PAGE_SIZE + idx + 1;
                const above50 = item.price != null && item.fiftyDayMa != null && item.price > item.fiftyDayMa;
                return (
                  <tr
                    key={item.ticker}
                    className="border-b border-border/30 hover:bg-primary/3 cursor-pointer transition-colors group"
                    onClick={() => navigate(`/insights/${item.ticker}`)}
                  >
                    <td className="px-3 py-2.5 text-[10px] font-mono text-muted-foreground/50 tabular-nums">{rowNum}</td>
                    <td className="px-3 py-2.5">
                      <CompanyLogo ticker={item.ticker} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary italic text-[13px]">{item.ticker}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 max-w-[200px]">
                      <span className="text-foreground line-clamp-1 text-[11px]">{item.name ?? item.ticker}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <SectorPill sector={item.sector} />
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={cn('font-mono text-[11px] font-semibold tabular-nums', above50 ? 'text-emerald-400' : 'text-foreground')}>
                        {fmt.price(item.price)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[11px] tabular-nums text-foreground">{fmt.cap(item.marketCap)}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{fmt.pe(item.trailingPe)}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{fmt.pe(item.forwardPe)}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <GrowthCell value={item.revenueGrowth} />
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{fmt.pct(item.profitMargins)}</span>
                    </td>
                    <td className="px-3 py-2.5 min-w-[100px]">
                      <ScoreBar value={item.compoundScore} color="#eab308" />
                    </td>
                    <td className="px-3 py-2.5 min-w-[100px]">
                      <ScoreBar value={item.tacticalScore} color="#6366f1" />
                    </td>
                    <td className="px-3 py-2.5">
                      <ActionBadge state={item.actionabilityState} />
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <ExternalLink
                        size={12}
                        className="text-muted-foreground/40 group-hover:text-primary/60 transition-colors"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
