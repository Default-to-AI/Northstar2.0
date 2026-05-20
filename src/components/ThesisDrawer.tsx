import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Position, Thesis, ThesisHealth } from '../types';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Info } from 'lucide-react';

interface ThesisDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: Position | null;
  onUpdate: (updated: Position) => void;
}

export function ThesisDrawer({ open, onOpenChange, position, onUpdate }: ThesisDrawerProps) {
  const [activeTab, setActiveTab] = useState<'THESIS' | 'DATA'>('THESIS');
  const [thesis, setThesis] = useState<Thesis>({
    health: 'NONE',
    why: '',
    invalidation: '',
    stopLevel: 0,
    reviewTriggers: '',
    notes: '',
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['stock-metrics', position?.ticker],
    queryFn: async () => {
      const res = await fetch(`/api/stock/metrics?symbol=${position?.ticker}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!position && open,
  });

  useEffect(() => {
    if (position) {
      setThesis(position.thesisData || {
        health: 'NONE',
        why: position.thesis || '',
        invalidation: '',
        stopLevel: position.avgCost * 0.9, // Default 10% stop
        reviewTriggers: '',
        notes: '',
      });
    }
  }, [position]);

  const handleSave = () => {
    if (position) {
      onUpdate({
        ...position,
        thesisData: thesis,
        thesis: thesis.why // Keep summary in sync for simplicity
      });
      onOpenChange(false);
    }
  };

  if (!position) return null;

  const currentPrice = position.currentPrice || position.avgCost;
  const stopDistance = ((currentPrice - thesis.stopLevel) / thesis.stopLevel) * 100;
  const isNearStop = currentPrice > thesis.stopLevel && currentPrice <= thesis.stopLevel * 1.05;
  const isBelowStop = currentPrice <= thesis.stopLevel;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-[#0d0d14] border-l border-border font-mono p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b border-border bg-muted/10">
          <div className="flex justify-between items-start">
             <div>
               <SheetTitle className="text-2xl font-bold text-primary tracking-tighter uppercase italic">{position.ticker}</SheetTitle>
               <p className="text-[12px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">Investment Thesis & Risk Management</p>
             </div>
             <div className="flex bg-muted/20 border border-border">
               {(['NONE', 'GREEN', 'YELLOW', 'RED'] as ThesisHealth[]).map(h => (
                 <button 
                   key={h}
                   onClick={() => setThesis({...thesis, health: h})}
                   className={`w-8 h-8 flex items-center justify-center transition-colors ${
                     thesis.health === h 
                       ? (h === 'GREEN' ? 'bg-green-500 text-black' : h === 'YELLOW' ? 'bg-amber-500 text-black' : h === 'RED' ? 'bg-red-500 text-black' : 'bg-muted-foreground text-black')
                       : 'text-muted-foreground hover:bg-white/5'
                   }`}
                 >
                   {h === 'NONE' ? '∅' : h[0]}
                 </button>
               ))}
             </div>
          </div>
        </SheetHeader>

        <div className="flex border-b border-border bg-muted/5">
          <button 
            onClick={() => setActiveTab('THESIS')}
            className={`flex-1 py-4 text-[12px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'THESIS' ? 'bg-[#141420] text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
          >
            Thesis Management
          </button>
          <button 
            onClick={() => setActiveTab('DATA')}
            className={`flex-1 py-4 text-[12px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'DATA' ? 'bg-[#141420] text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
          >
            Live Fundamentals
          </button>
        </div>

        <div className="p-6 space-y-6">
          {activeTab === 'THESIS' ? (
            <>
              {/* Why */}
              <div className="space-y-3">
            <label className="text-[12px] font-bold text-muted-foreground uppercase flex flex-col gap-0.5">
              <span>MY THESIS</span>
              <span className="text-[10px] font-normal opacity-50 italic">WHY DO YOU OWN THIS? WHAT HAD TO BE TRUE TO BUY IT?</span>
            </label>
            <Textarea 
              value={thesis.why}
              onChange={(e) => setThesis({...thesis, why: e.target.value})}
              placeholder="The market is underpricing the durability of this revenue stream..."
              className="min-h-[120px] rounded-none border-border bg-background focus-visible:ring-0 text-[13px] leading-relaxed"
            />
          </div>

          {/* Invalidation */}
          <div className="space-y-3 border-l-2 border-red-500/20 pl-4 py-1">
            <label className="text-[12px] font-bold text-muted-foreground uppercase flex flex-col gap-0.5">
              <span>INVALIDATION CONDITIONS</span>
              <span className="text-[10px] font-normal opacity-50 italic">WHAT WOULD MAKE THIS THESIS WRONG?</span>
            </label>
            <Textarea 
              value={thesis.invalidation}
              onChange={(e) => setThesis({...thesis, invalidation: e.target.value})}
              placeholder="Revenue growth drops below 15% for two consecutive quarters"
              className="min-h-[100px] rounded-none border-border bg-background focus-visible:ring-0 text-[13px] leading-relaxed"
            />
          </div>

          {/* Stop Level */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-muted-foreground uppercase">STOP LEVEL</label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[12px]">$</span>
                <Input 
                  type="number"
                  value={thesis.stopLevel}
                  onChange={(e) => setThesis({...thesis, stopLevel: parseFloat(e.target.value) || 0})}
                  className="pl-8 h-10 rounded-none border-border bg-background focus-visible:ring-0 text-base font-bold"
                />
              </div>
              <div className="flex-1 text-right">
                <div className={`text-[12px] font-bold uppercase transition-colors ${
                  isBelowStop ? 'text-negative' : isNearStop ? 'text-amber-500' : 'text-muted-foreground'
                }`}>
                  {isBelowStop ? (
                    <span className="flex items-center justify-end gap-1">✖ STOP TRIGGERED</span>
                  ) : isNearStop ? (
                    <span className="flex items-center justify-end gap-1">⚠ PRICE WITHIN 5% OF STOP</span>
                  ) : (
                    <span>Price is {stopDistance.toFixed(1)}% above stop</span>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground opacity-50 mt-1">
                  CURRENT: ${currentPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Review Triggers */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-muted-foreground uppercase flex flex-col gap-0.5">
              <span>WHEN WILL YOU REVISIT THIS?</span>
              <span className="text-[10px] font-normal opacity-50 italic">REVIEW TRIGGERS</span>
            </label>
            <Input 
              value={thesis.reviewTriggers}
              onChange={(e) => setThesis({...thesis, reviewTriggers: e.target.value})}
              placeholder="Next earnings date, or if price drops below $180"
              className="h-10 rounded-none border-border bg-background focus-visible:ring-0 text-[13px]"
            />
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-muted-foreground uppercase">NOTES</label>
              <Textarea 
                value={thesis.notes}
                onChange={(e) => setThesis({...thesis, notes: e.target.value})}
                placeholder="Ongoing observations..."
                className="min-h-[140px] rounded-none border-border bg-background focus-visible:ring-0 text-[13px] leading-relaxed"
              />
            </div>
            </>
          ) : (
            <div className="space-y-7">
               {metricsLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 opacity-40">
                   <BarChart3 className="animate-pulse" size={48} />
                   <p className="text-[12px] uppercase font-bold tracking-tighter">Syncing terminal data...</p>
                </div>
              ) : metrics ? (
                <div className="space-y-5">
                   <div className="grid grid-cols-2 gap-5">
                    <div className="p-4 border border-border/50 bg-black/40">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase block mb-1.5">P/E Ratio (TTM)</span>
                      <span className="text-base font-bold text-foreground">{metrics.peTTM?.toFixed(2) || 'N/A'}</span>
                    </div>
                    <div className="p-4 border border-border/50 bg-black/40">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase block mb-1.5">ROE</span>
                      <span className="text-base font-bold text-foreground">{(metrics.roeTTM * 100)?.toFixed(1) || 'N/A'}%</span>
                    </div>
                    <div className="p-4 border border-border/50 bg-black/40">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase block mb-1.5">Net Margin</span>
                      <span className="text-base font-bold text-foreground">{(metrics.netProfitMarginTTM * 100)?.toFixed(1) || 'N/A'}%</span>
                    </div>
                    <div className="p-4 border border-border/50 bg-black/40">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase block mb-1.5">Div Yield</span>
                      <span className="text-base font-bold text-foreground">{metrics.dividendYieldIndicatedAnnual?.toFixed(2) || '0.00'}%</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="text-[12px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                       <BarChart3 size={15} /> Valuation Over Time
                    </h4>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                       <div className="flex justify-between border-b border-border/20 py-1.5">
                          <span className="text-[11px] text-muted-foreground">52W High</span>
                          <span className="text-[12px] font-bold text-foreground">${metrics['52WeekHigh']}</span>
                       </div>
                       <div className="flex justify-between border-b border-border/20 py-1.5">
                          <span className="text-[11px] text-muted-foreground">52W Low</span>
                          <span className="text-[12px] font-bold text-foreground">${metrics['52WeekLow']}</span>
                       </div>
                       <div className="flex justify-between border-b border-border/20 py-1.5">
                          <span className="text-[11px] text-muted-foreground">Beta</span>
                          <span className="text-[12px] font-bold text-foreground">{metrics.beta?.toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between border-b border-border/20 py-1.5">
                          <span className="text-[11px] text-muted-foreground">EPS (TTM)</span>
                          <span className="text-[12px] font-bold text-foreground">${metrics.epsTTM?.toFixed(2)}</span>
                       </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 p-5 mt-10 flex gap-4">
                     <Info className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                     <div className="space-y-2">
                        <p className="text-[12px] font-bold text-primary uppercase">Analyst Context</p>
                        <p className="text-[12px] leading-relaxed text-muted-foreground italic">
                           Current valuation implies {metrics.peTTM > 30 ? 'high growth expectations' : 'value orientation'}. 
                           Watch the {metrics.peTTM > metrics['peNormalizedAnnual'] ? 'potential multiple contraction' : 'relative undervaluation'} vs historical norms.
                        </p>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground opacity-40 italic text-base">
                   COULD_NOT_RESOLVE_TICKER: {position.ticker}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border mt-auto bg-muted/10 sticky bottom-0">
          <Button 
            onClick={handleSave}
            className="w-full rounded-none bg-primary text-black font-bold uppercase tracking-widest text-[13px] h-12 shadow-[0_0_15px_rgba(245,197,24,0.1)]"
          >
            Update Investment Thesis
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
