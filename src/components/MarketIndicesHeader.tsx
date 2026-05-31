import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

export default function MarketIndicesHeader() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['market-indices'],
    queryFn: async () => {
      const res = await fetch('/api/market/indices');
      if (!res.ok) throw new Error('Failed to fetch indices');
      return res.json();
    },
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) {
    return <div className="text-[11px] font-mono text-muted-foreground animate-pulse">LOADING INDICES...</div>;
  }

  if (isError || !data) {
    return <div className="text-[11px] font-mono text-rose-500/80">INDICES UNAVAILABLE</div>;
  }

  const renderIndex = (name: string, quote: any) => {
    if (!quote || quote.price == null) {
      return (
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{name}</span>
          <span className="text-rose-500/80 bg-rose-500/10 px-1 py-0.5 rounded tracking-wider uppercase">MISSING DATA</span>
        </span>
      );
    }
    
    const changePct = quote.changesPercentage ?? quote.changePercentage ?? 0;
    const isPositive = changePct >= 0;
    
    return (
      <span className="flex items-center gap-1.5">
        <span className="text-muted-foreground">{name}</span>
        <span className={cn(
          "font-bold",
          isPositive ? "text-emerald-400" : "text-rose-400"
        )}>
          {isPositive ? '+' : ''}{changePct.toFixed(2)}%
        </span>
      </span>
    );
  };

  return (
    <div className="flex items-center gap-4 text-[11px] font-mono">
      {renderIndex('Dow Jones', data.djia)}
      {renderIndex('S&P 500', data.spy)}
      {renderIndex('Nasdaq', data.qqq)}
    </div>
  );
}
