import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentPrices } from '../lib/finnhub';
import { useWatchlist } from '../hooks/useWatchlist';
import { WatchlistItem, WatchReason } from '../types';
import { Plus, Trash2, Archive, Search, Target, MessageSquare, Info, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { WatchlistDialog } from '../components/WatchlistDialog';

const PERSONAS = [
  { key: 'M', name: 'Mahaney', color: '#f5c518' },
  { key: 'H', name: 'Hohn', color: '#00c896' },
  { key: 'C', name: 'Cohen', color: '#ff4757' },
  { key: 'Mi', name: 'Micha', color: '#3b82f6' },
  { key: 'Ca', name: 'Carlson', color: '#a855f7' },
] as const;

const REASON_COLORS: Record<WatchReason, string> = {
  'POPULAR': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'UNDERVALUED': 'bg-green-500/10 text-green-400 border-green-500/20',
  'WAITING FOR ENTRY': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'RESEARCHING': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export default function Watchlist() {
  const { items, updateItem, deleteItem, toggleArchive } = useWatchlist();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const tickers = items.map(i => i.ticker);
  const { data: prices } = useQuery({
    queryKey: ['watchlist-prices', tickers.join(',')],
    queryFn: () => fetchCurrentPrices(tickers),
    enabled: tickers.length > 0,
    refetchInterval: 60000,
  });

  const getPersonaCount = (item: WatchlistItem) => {
    return Object.values(item.personas).filter(Boolean).length;
  };

  const sortedItems = [...items]
    .filter(item => item.ticker.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => getPersonaCount(b) - getPersonaCount(a));

  const activeItems = sortedItems.filter(i => !i.archived);
  const archivedItems = sortedItems.filter(i => i.archived);

  return (
    <div className="p-4 space-y-4 max-w-[1200px] mx-auto overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-xl font-mono text-primary uppercase tracking-tighter font-bold">Watchlist</h1>
          <div className="relative w-64 group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="FILTER_TICKERS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 rounded-none border-border bg-background/50 font-mono text-[10px] focus-visible:ring-0 focus:border-primary"
            />
          </div>
        </div>

        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-[10px] font-bold px-4 h-8"
        >
          <Plus className="w-3 h-3 mr-2" /> ADD TO WATCHLIST
        </Button>
      </div>

      <WatchlistDialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-10 p-0">
          <TabsTrigger 
            value="active" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-[10px] font-bold uppercase tracking-widest px-6"
          >
            Active Watchlist ({activeItems.length})
          </TabsTrigger>
          <TabsTrigger 
            value="archived" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-mono text-[10px] font-bold uppercase tracking-widest px-6"
          >
            Archived ({archivedItems.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeItems.map((item) => (
              <WatchlistCard 
                key={item.id} 
                item={item} 
                currentPrice={prices?.[item.ticker]} 
                onDelete={() => deleteItem(item.id)}
                onArchive={() => toggleArchive(item.id)}
                onUpdate={(val) => updateItem(val)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {archivedItems.map((item) => (
              <WatchlistCard 
                key={item.id} 
                item={item} 
                currentPrice={prices?.[item.ticker]} 
                onDelete={() => deleteItem(item.id)}
                onArchive={() => toggleArchive(item.id)}
                onUpdate={(val) => updateItem(val)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface WatchlistCardProps {
  item: WatchlistItem;
  currentPrice: number | undefined;
  onDelete: () => void;
  onArchive: () => void;
  onUpdate: (val: WatchlistItem) => void;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ 
  item, 
  currentPrice, 
  onDelete, 
  onArchive,
  onUpdate 
}) => {
  const price = currentPrice || 0;
  const distance = price > 0 ? ((price - item.targetPrice) / item.targetPrice) * 100 : null;
  const personaCount = Object.values(item.personas).filter(Boolean).length;

  return (
    <Card className="rounded-none bg-[#0d0d14] border-border terminal-border flex flex-col group overflow-hidden">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="text-lg font-mono font-bold text-primary">{item.ticker}</span>
            <Badge variant="outline" className={`rounded-none text-[8px] font-mono border ${REASON_COLORS[item.reason]}`}>
              {item.reason}
            </Badge>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-white/5" onClick={onArchive}>
              <Archive className="w-3 h-3 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="w-6 h-6 hover:text-negative hover:bg-negative/5" onClick={onDelete}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-medium leading-tight text-foreground/90">{item.thesis}</p>
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground italic">
            <Info className="w-2.5 h-2.5" />
            <span>Criteria: {item.criteria}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-2">
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-muted-foreground uppercase opacity-50 block">Target Price</span>
            <span className="text-xs font-mono font-bold">${item.targetPrice.toFixed(2)}</span>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[8px] font-mono text-muted-foreground uppercase opacity-50 block">Distance</span>
            {distance !== null ? (
              <span className={`text-xs font-mono font-bold ${distance <= 5 ? 'text-positive' : distance <= 15 ? 'text-amber-500' : 'text-slate-500'}`}>
                {distance > 0 ? '+' : ''}{distance.toFixed(1)}%
              </span>
            ) : (
              <span className="text-xs font-mono text-muted-foreground opacity-30">N/A</span>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-border/50 flex justify-between items-center">
          <div className="flex gap-1.5">
            {PERSONS_LIST.map(p => (
              <div 
                key={p.key}
                title={p.name}
                className={`w-5 h-5 flex items-center justify-center font-mono text-[9px] font-bold border transition-colors duration-300 ${
                  item.personas[p.key as keyof typeof item.personas] 
                    ? `border-[${p.color}] text-white bg-[${p.color}]/20 outline outline-1 outline-[${p.color}]/50` 
                    : 'border-border text-muted-foreground/60'
                }`}
                style={{ 
                  borderColor: item.personas[p.key as keyof typeof item.personas] ? p.color : undefined,
                  color: item.personas[p.key as keyof typeof item.personas] ? 'white' : undefined,
                  backgroundColor: item.personas[p.key as keyof typeof item.personas] ? `${p.color}33` : undefined,
                }}
              >
                {p.key}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-1">
             <div className={`w-1 h-1 rounded-full ${personaCount >= 5 ? 'bg-primary animate-ping' : personaCount >= 2 ? 'bg-primary' : 'bg-slate-700'}`} />
             <span className="text-[8px] font-mono text-muted-foreground uppercase">
               {personaCount >= 5 ? 'Strong Consensus' : personaCount >= 2 ? 'Growing Interest' : 'Early Stage'}
             </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const PERSONS_LIST = PERSONAS;
