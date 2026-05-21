import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentPrices } from '../lib/finnhub';
import { useWatchlist } from '../hooks/useWatchlist';
import { WatchlistItem, WatchReason } from '../types';
import { Plus, Trash2, Archive, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { WatchlistDialog } from '../components/WatchlistDialog';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { buildEnhancedWatchlist, PortfolioHoldingInput, WatchlistEnhancementInput, WatchlistEnhancedItem } from '../lib/watchlistEnhancements';

const REASON_COLORS: Record<WatchReason, string> = {
  POPULAR: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  UNDERVALUED: 'bg-green-500/10 text-green-400 border-green-500/20',
  'WAITING FOR ENTRY': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  RESEARCHING: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

interface EnhancedCardItem {
  base: WatchlistItem;
  enhanced: WatchlistEnhancedItem;
}

function toEnhancementInput(item: WatchlistItem): WatchlistEnhancementInput {
  return {
    id: item.id,
    ticker: item.ticker,
    thesis: item.thesis,
    targetPrice: item.targetPrice,
    criteria: item.criteria,
    reason: item.reason,
    archived: item.archived,
    personas: item.personas,
  };
}

export default function Watchlist() {
  const { items, deleteItem, toggleArchive } = useWatchlist();
  const { positions } = usePortfolioData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const tickers = items.map((item) => item.ticker);
  const { data: prices } = useQuery({
    queryKey: ['watchlist-prices', tickers.join(',')],
    queryFn: () => fetchCurrentPrices(tickers),
    enabled: tickers.length > 0,
    refetchInterval: 60000,
  });

  const holdings = useMemo<PortfolioHoldingInput[]>(() => {
    const totalPortfolioValue = positions.reduce((acc, position) => {
      const price = position.currentPrice ?? position.avgCost;
      return acc + position.shares * price;
    }, 0);

    if (totalPortfolioValue <= 0) {
      return positions.map((position) => ({ ticker: position.ticker, weight: 0, sector: position.sector }));
    }

    return positions.map((position) => {
      const price = position.currentPrice ?? position.avgCost;
      const weight = (position.shares * price / totalPortfolioValue) * 100;
      return {
        ticker: position.ticker,
        weight,
        sector: position.sector,
      };
    });
  }, [positions]);

  const enhancedById = useMemo(() => {
    const quotesByTicker: Record<string, { currentPrice?: number }> = Object.entries(prices ?? {}).reduce(
      (acc, [ticker, currentPrice]) => {
        acc[ticker] = { currentPrice };
        return acc;
      },
      {} as Record<string, { currentPrice?: number }>,
    );

    const enhanced = buildEnhancedWatchlist(
      items.map(toEnhancementInput),
      quotesByTicker,
      { holdings },
    );

    return new Map(enhanced.map((item) => [item.id, item]));
  }, [holdings, items, prices]);

  const sortedItems = [...items]
    .filter((item) => item.ticker.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.ticker.localeCompare(b.ticker));

  const toEnhancedCard = (item: WatchlistItem): EnhancedCardItem => ({
    base: item,
    enhanced: enhancedById.get(item.id) ?? {
      id: item.id,
      ticker: item.ticker,
      targetPrice: item.targetPrice,
      thesis: item.thesis,
      analysis: 'Pending enhancement data.',
      committeeThoughts: [],
      scores: {
        conviction: 0,
        valuation: 0,
        riskReward: 0,
        portfolioFit: 0,
        total: 0,
      },
      buyScenario: {
        trigger: 'No trigger defined yet.',
        stopLoss: 0,
        upsideToTargetPct: 0,
        notes: 'No notes available.',
      },
      inValidationScenario: {
        status: 'in_validation',
        requirements: ['Recalculate enhancement model for this ticker.'],
        notes: 'No validation note available.',
      },
      riskRewardRatio: 0,
      recommendedPositionSizePct: 0,
      portfolioFitReasoning: 'No portfolio fit reasoning available.',
      currentPrice: prices?.[item.ticker],
    },
  });

  const activeItems = sortedItems.filter((item) => !item.archived).map(toEnhancedCard);
  const archivedItems = sortedItems.filter((item) => item.archived).map(toEnhancedCard);

  return (
    <div className="p-4 space-y-4 max-w-[1400px] mx-auto overflow-y-auto h-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-mono text-primary uppercase tracking-tighter font-bold">Watchlist</h1>
          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="FILTER_TICKERS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="terminal-input pl-8 h-8 rounded-none border-border bg-background/50 focus-visible:ring-0 focus:border-primary"
            />
          </div>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="terminal-button rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-4 h-8"
        >
          <Plus className="w-3 h-3 mr-2" /> ADD TO WATCHLIST
        </Button>
      </div>

      <WatchlistDialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-10 p-0">
          <TabsTrigger value="active" className="terminal-nav rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6">
            Active ({activeItems.length})
          </TabsTrigger>
          <TabsTrigger value="archived" className="terminal-nav rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6">
            Archived ({archivedItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="pt-4 space-y-4">
          {activeItems.map(({ base, enhanced }) => (
            <WatchlistCard
              key={base.id}
              item={base}
              enhanced={enhanced}
              currentPrice={prices?.[base.ticker]}
              onDelete={() => deleteItem(base.id)}
              onArchive={() => toggleArchive(base.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="archived" className="pt-4 space-y-4">
          {archivedItems.map(({ base, enhanced }) => (
            <WatchlistCard
              key={base.id}
              item={base}
              enhanced={enhanced}
              currentPrice={prices?.[base.ticker]}
              onDelete={() => deleteItem(base.id)}
              onArchive={() => toggleArchive(base.id)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface WatchlistCardProps {
  item: WatchlistItem;
  enhanced: WatchlistEnhancedItem;
  currentPrice: number | undefined;
  onDelete: () => void;
  onArchive: () => void;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ item, enhanced, currentPrice, onDelete, onArchive }) => {
  const price = currentPrice ?? enhanced.currentPrice ?? null;
  const validationReady = enhanced.inValidationScenario.status === 'ready';
  const statusClass = validationReady
    ? 'border-emerald-500/40 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.25)]'
    : 'border-amber-500/40 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.2)]';

  return (
    <Card className={`rounded-none bg-[#0d0d14] terminal-border overflow-hidden ${statusClass}`}>
      <CardContent className="p-4 md:p-5 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xl font-mono font-bold text-primary">{item.ticker}</span>
            <Badge variant="outline" className={`terminal-badge rounded-none border px-1.5 py-0.5 ${REASON_COLORS[item.reason]}`}>
              {item.reason}
            </Badge>
            <Badge variant="outline" className={`rounded-none border ${validationReady ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/40 text-amber-300 bg-amber-500/10'}`}>
              {validationReady ? 'BUY READY' : 'IN VALIDATION'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-7 h-7 hover:bg-white/5" onClick={onArchive}>
              <Archive className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="w-7 h-7 hover:text-negative hover:bg-negative/5" onClick={onDelete}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <Metric label="Current price" value={price === null ? 'N/A' : `$${price.toFixed(2)}`} />
          <Metric label="Target price" value={`$${item.targetPrice.toFixed(2)}`} />
          <Metric label="Upside %" value={`${enhanced.buyScenario.upsideToTargetPct > 0 ? '+' : ''}${enhanced.buyScenario.upsideToTargetPct.toFixed(1)}%`} />
          <Metric label="Risk/Reward" value={enhanced.riskRewardRatio.toFixed(2)} />
          <Metric label="Rec. size" value={`${enhanced.recommendedPositionSizePct.toFixed(2)}%`} />
          <Metric label="Conviction" value={enhanced.scores.conviction.toFixed(1)} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Section title="Regular data">
            <Row label="Company" value={item.ticker} />
            <Row label="Criteria" value={item.criteria || 'No criteria set'} />
            <Row label="Created" value={new Date(item.createdAt).toLocaleDateString()} />
          </Section>

          <Section title="Analysis">
            <p className="terminal-body text-sm text-foreground/90">{enhanced.analysis}</p>
          </Section>

          <Section title="Committee scores">
            <div className="grid grid-cols-5 gap-2">
              {(['M', 'H', 'C', 'Mi', 'Ca'] as const).map((key) => (
                <div key={key} className="border border-border px-2 py-1 text-center">
                  <div className="terminal-meta">{key}</div>
                  <div className="font-mono text-sm">
                    {item.personas[key] ? enhanced.committeeScores[key].toFixed(1) : '-'}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Committee thoughts">
            {enhanced.committeeThoughts.length > 0 ? (
              <ul className="space-y-1 text-sm text-foreground/90 list-disc pl-4">
                {enhanced.committeeThoughts.map((thought) => (
                  <li key={thought}>{thought}</li>
                ))}
              </ul>
            ) : (
              <p className="terminal-body text-sm text-foreground/70">No committee thoughts yet.</p>
            )}
          </Section>

          <Section title="Thesis">
            <p className="terminal-body text-sm text-foreground/90">{enhanced.thesis}</p>
          </Section>

          <Section title={validationReady ? 'Buy scenario' : 'Validation scenario'}>
            {validationReady ? (
              <div className="space-y-1 text-sm text-foreground/90">
                <Row label="Trigger" value={enhanced.buyScenario.trigger} />
                <Row label="Stop loss" value={`$${enhanced.buyScenario.stopLoss.toFixed(2)}`} />
                <Row label="Upside" value={`${enhanced.buyScenario.upsideToTargetPct.toFixed(1)}%`} />
                <p className="terminal-body">{enhanced.buyScenario.notes}</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-foreground/90">
                <Row label="Status" value={enhanced.inValidationScenario.status} />
                <ul className="list-disc pl-4 space-y-1">
                  {enhanced.inValidationScenario.requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
                <p className="terminal-body">{enhanced.inValidationScenario.notes}</p>
              </div>
            )}
          </Section>

          <Section title="Scores dashboard">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <ScorePill label="Conviction" score={enhanced.scores.conviction} />
              <ScorePill label="Valuation" score={enhanced.scores.valuation} />
              <ScorePill label="Risk/Reward" score={enhanced.scores.riskReward} />
              <ScorePill label="Portfolio Fit" score={enhanced.scores.portfolioFit} />
              <ScorePill label="Total" score={enhanced.scores.total} />
            </div>
          </Section>

          <Section title="Portfolio fit">
            <p className="terminal-body text-sm text-foreground/90">{enhanced.portfolioFitReasoning}</p>
          </Section>
        </div>
      </CardContent>
    </Card>
  );
};

function ScorePill({ label, score }: { label: string; score: number }) {
  const tone = score >= 75 ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' : score >= 55 ? 'text-amber-300 border-amber-500/40 bg-amber-500/10' : 'text-rose-300 border-rose-500/40 bg-rose-500/10';
  return (
    <div className={`border px-2 py-1 rounded-none ${tone}`}>
      <div className="terminal-meta">{label}</div>
      <div className="font-mono font-semibold">{score.toFixed(1)}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border border-border/70 p-3">
      <h3 className="terminal-label text-primary">{title}</h3>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="terminal-meta">{label}</span>
      <span className="font-mono text-right">{value}</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border/70 p-2 space-y-1">
      <div className="terminal-meta">{label}</div>
      <div className="font-mono text-sm font-semibold">{value}</div>
    </div>
  );
}
