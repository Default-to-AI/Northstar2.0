import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Search, Sparkles} from 'lucide-react';

import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {cn} from '@/lib/utils';

type InsightItem = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
  price: number | null;
  marketCap: number | null;
};

type InsightsResponse = {
  tab: string;
  generatedAt: string;
  items: InsightItem[];
  meta?: {
    status: string;
    message: string;
  };
  error?: string;
};

type SecuritySearchResult = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
};

type SecuritiesSearchResponse = {
  query: string;
  results: SecuritySearchResult[];
  error?: string;
};

type InsightsTab = {
  id: string;
  label: string;
};

const INSIGHTS_TABS: InsightsTab[] = [
  {id: 'sp500', label: 'S&P 500'},
  {id: 'trending', label: 'Trending'},
  {id: 'growth', label: 'Growth'},
  {id: 'ai', label: 'AI'},
  {id: 'cloud', label: 'Cloud'},
  {id: 'ev', label: 'EV'},
  {id: 'leisure', label: 'Leisure'},
  {id: 'dividend', label: 'Dividend'},
  {id: 'buyback', label: 'Buyback'},
];

function formatPrice(price: number | null): string {
  if (price === null || !Number.isFinite(price)) return '—';
  return price.toLocaleString(undefined, {style: 'currency', currency: 'USD', maximumFractionDigits: 2});
}

function formatMarketCap(marketCap: number | null): string {
  if (marketCap === null || !Number.isFinite(marketCap)) return '—';
  const abs = Math.abs(marketCap);
  if (abs >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`;
  return marketCap.toLocaleString();
}

export default function ScannerInsights() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<string>('sp500');
  const [items, setItems] = useState<InsightItem[]>([]);
  const [metaMessage, setMetaMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SecuritySearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  const activeTabLabel = useMemo(() => INSIGHTS_TABS.find((t) => t.id === tab)?.label ?? 'Insights', [tab]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMetaMessage(null);

    const controller = new AbortController();
    fetch(`/api/research/insights?tab=${encodeURIComponent(tab)}&limit=24`, {signal: controller.signal})
      .then(async (response) => {
        const contentType = response.headers.get('content-type') ?? '';
        if (!contentType.includes('application/json')) {
          const body = await response.text();
          if (body.toLowerCase().includes('<!doctype html>')) {
            throw new Error('API endpoint returned HTML instead of JSON. Ensure Vercel is routing /api/* to the serverless function.');
          }
          throw new Error('Insights endpoint did not return JSON.');
        }

        const payload = (await response.json()) as InsightsResponse;
        if (!response.ok || payload.error) {
          throw new Error(payload.error ?? 'Failed to load insights');
        }
        return payload;
      })
      .then((payload) => {
        setItems(payload.items);
        setMetaMessage(payload.meta?.message ?? null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load insights');
        setLoading(false);
      });

    return () => controller.abort();
  }, [tab]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const root = searchBoxRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 1) {
      setSearchResults([]);
      setSearchOpen(false);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      fetch(`/api/research/securities/search?q=${encodeURIComponent(q)}&limit=8`, {signal: controller.signal})
        .then(async (response) => {
          const payload = (await response.json()) as SecuritiesSearchResponse;
          if (!response.ok || payload.error) {
            throw new Error(payload.error ?? 'Failed to search securities');
          }
          return payload;
        })
        .then((payload) => {
          setSearchResults(payload.results);
          setSearchOpen(true);
          setSearchLoading(false);
        })
        .catch((err: unknown) => {
          if (err instanceof Error && err.name === 'AbortError') return;
          setSearchResults([]);
          setSearchOpen(false);
          setSearchLoading(false);
        });
    }, 150);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto overflow-y-auto h-full pb-12">
      <header className="space-y-1 pb-4 border-b border-border">
        <h1 className="text-2xl font-mono font-bold text-primary tracking-tighter uppercase italic flex items-center gap-2">
          <Sparkles size={24} /> INSIGHTS
        </h1>
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">
          {activeTabLabel.toUpperCase()} — DATABASE-BACKED SNAPSHOTS (NO DAILY CHANGE METRICS)
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList variant="line" className="rounded-none bg-transparent p-0 gap-2 flex flex-wrap">
            {INSIGHTS_TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="rounded-none border border-border/40 bg-[#0d0d14] px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground data-active:text-primary data-active:border-primary/40"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div ref={searchBoxRef} className="relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim().length > 0 && setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const first = searchResults[0];
                    if (first) {
                      navigate(`/insights/${first.ticker}`);
                      setSearchOpen(false);
                    }
                  }
                  if (e.key === 'Escape') {
                    setSearchOpen(false);
                  }
                }}
                placeholder="Search securities (ticker or name)…"
                className="rounded-none pl-10 font-mono text-[12px] h-10 bg-[#0d0d14] border-border terminal-border"
              />
            </div>
          </div>

          {searchOpen && (searchLoading || searchResults.length > 0) ? (
            <div className="absolute z-20 mt-2 w-full bg-[#0d0d14] border border-border terminal-border rounded-none overflow-hidden">
              {searchLoading ? (
                <div className="p-3 text-[11px] text-muted-foreground font-mono">Searching…</div>
              ) : (
                <div className="max-h-72 overflow-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.ticker}
                      type="button"
                      className={cn(
                        'w-full text-left px-3 py-2 border-b border-border/40 hover:bg-primary/5 focus:bg-primary/5 focus:outline-none',
                      )}
                      onClick={() => {
                        navigate(`/insights/${result.ticker}`);
                        setSearchOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-primary italic">{result.ticker}</span>
                          <span className="text-[11px] text-foreground">{result.name ?? result.ticker}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                          {result.exchange ?? '—'}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-0.5">
                        {result.sector ?? 'SECTOR_UNKNOWN'}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {metaMessage ? (
        <Card className="rounded-none bg-primary/5 border-primary/20 p-4">
          <p className="text-[10px] text-muted-foreground leading-relaxed italic font-mono uppercase tracking-widest">
            {metaMessage}
          </p>
        </Card>
      ) : null}

      {loading ? (
        <div className="text-muted-foreground font-mono text-sm animate-pulse">Loading insights…</div>
      ) : error ? (
        <div className="text-red-400 font-mono text-sm">{error}</div>
      ) : items.length === 0 ? (
        <div className="text-muted-foreground font-mono text-sm">No rows for this tab (or data not available).</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <button
              key={item.ticker}
              type="button"
              className="text-left"
              onClick={() => navigate(`/insights/${item.ticker}`)}
            >
              <Card className="rounded-none bg-[#0d0d14] border-border hover:border-primary/40 transition-all terminal-border p-4 h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono font-bold text-primary italic text-lg leading-none">{item.ticker}</div>
                    <div className="text-[11px] text-foreground mt-1 line-clamp-1">{item.name ?? item.ticker}</div>
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-1">
                      {(item.exchange ?? '—').toUpperCase()} · {(item.sector ?? 'SECTOR_UNKNOWN').toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Price</div>
                    <div className="text-[12px] font-mono font-bold text-foreground">{formatPrice(item.price)}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Mkt Cap</div>
                    <div className="text-[12px] font-mono font-bold text-foreground">{formatMarketCap(item.marketCap)}</div>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
