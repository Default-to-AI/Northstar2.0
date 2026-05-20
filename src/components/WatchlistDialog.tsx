import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { WatchlistItem, WatchReason } from '../types';
import { useWatchlist } from '../hooks/useWatchlist';

const PERSONAS = [
  { key: 'M', name: 'Mahaney', color: '#f5c518' },
  { key: 'H', name: 'Hohn', color: '#00c896' },
  { key: 'C', name: 'Cohen', color: '#ff4757' },
  { key: 'Mi', name: 'Micha', color: '#3b82f6' },
  { key: 'Ca', name: 'Carlson', color: '#a855f7' },
] as const;

interface WatchlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTicker?: string;
}

export function WatchlistDialog({ open, onOpenChange, initialTicker }: WatchlistDialogProps) {
  const { addItem } = useWatchlist();
  const [newItem, setNewItem] = useState<Partial<WatchlistItem>>({
    ticker: '',
    thesis: '',
    targetPrice: 0,
    criteria: '',
    reason: 'RESEARCHING',
    personas: { M: false, H: false, C: false, Mi: false, Ca: false },
    archived: false,
  });

  useEffect(() => {
    if (initialTicker) {
      setNewItem(prev => ({ ...prev, ticker: initialTicker }));
    }
  }, [initialTicker]);

  const handleAddItem = () => {
    if (!newItem.ticker) return;
    
    addItem({
      ...newItem as WatchlistItem,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      archived: false,
    });
    
    onOpenChange(false);
    setNewItem({
      ticker: '',
      thesis: '',
      targetPrice: 0,
      criteria: '',
      reason: 'RESEARCHING',
      personas: { M: false, H: false, C: false, Mi: false, Ca: false },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none border-border bg-[#0d0d14] font-mono sm:max-w-[500px] terminal-border">
        <DialogHeader>
          <DialogTitle className="text-base font-bold uppercase tracking-widest text-primary">Add Ticker to Watchlist</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-[12px] uppercase font-bold text-muted-foreground">Ticker</label>
            <Input 
              className="col-span-3 rounded-none bg-background border-border h-9 text-[14px]" 
              value={newItem.ticker}
              onChange={(e) => setNewItem({...newItem, ticker: e.target.value.toUpperCase()})}
              placeholder="e.g. NVDA"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-[12px] uppercase font-bold text-muted-foreground">Thesis</label>
            <Input 
              className="col-span-3 rounded-none bg-background border-border h-9 text-[14px]" 
              value={newItem.thesis}
              onChange={(e) => setNewItem({...newItem, thesis: e.target.value})}
              placeholder="One-line core thesis"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-[12px] uppercase font-bold text-muted-foreground">Target Price</label>
            <div className="col-span-3 flex items-center gap-2">
              <span className="text-muted-foreground text-[14px]">$</span>
              <Input 
                type="number"
                className="rounded-none bg-background border-border h-9 text-[14px]" 
                value={newItem.targetPrice}
                onChange={(e) => setNewItem({...newItem, targetPrice: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-[12px] uppercase font-bold text-muted-foreground">Reason</label>
            <Select 
              value={newItem.reason}
              onValueChange={(v) => setNewItem({...newItem, reason: v as WatchReason})}
            >
              <SelectTrigger className="col-span-3 rounded-none bg-background border-border h-9 text-[14px] focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none bg-[#0d0d14] border-border font-mono">
                <SelectItem value="POPULAR" className="text-[12px]">POPULAR</SelectItem>
                <SelectItem value="UNDERVALUED" className="text-[12px]">UNDERVALUED</SelectItem>
                <SelectItem value="WAITING FOR ENTRY" className="text-[12px]">WAITING FOR ENTRY</SelectItem>
                <SelectItem value="RESEARCHING" className="text-[12px]">RESEARCHING</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-[12px] uppercase font-bold text-muted-foreground">Criteria</label>
            <Input 
              className="col-span-3 rounded-none bg-background border-border h-9 text-[14px]" 
              value={newItem.criteria}
              onChange={(e) => setNewItem({...newItem, criteria: e.target.value})}
              placeholder="What trigger points are you watching?"
            />
          </div>
          <div className="grid grid-cols-4 items-top gap-4">
            <label className="text-[12px] uppercase font-bold text-muted-foreground pt-1">Conviction</label>
            <div className="col-span-3 grid grid-cols-2 gap-3">
              {PERSONAS.map(p => (
                <div key={p.key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`persona-dialog-${p.key}`} 
                    checked={newItem.personas?.[p.key as keyof typeof newItem.personas]} 
                    onCheckedChange={(checked) => {
                      setNewItem({
                        ...newItem,
                        personas: { ...newItem.personas!, [p.key]: !!checked }
                      });
                    }}
                    className="rounded-none border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4"
                  />
                  <label 
                    htmlFor={`persona-dialog-${p.key}`}
                    className="text-[11px] font-mono font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ color: newItem.personas?.[p.key as keyof typeof newItem.personas] ? p.color : '#666' }}
                  >
                    {p.key} - {p.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleAddItem}
            className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-[12px] font-bold h-10"
          >
            COMMIT_TO_DATABASE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
