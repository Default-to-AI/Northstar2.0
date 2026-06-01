import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertTriangle, Search, Star, ExternalLink, X, Download, ChevronDown, Info, ArrowUp, ArrowDown } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import type {
  InsightsTickerResponse,
  InsightKpiModule,
  InsightNarrativeModule,
  InsightListModule,
  InsightTableModule
} from '../../lib/insights/contracts';

// --- Components ---

function Panel({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-[#1a1b23] border border-[#2a2b36] rounded-xl p-5 shadow-lg", className)} {...props}>
      {children}
    </div>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[13px] font-semibold text-foreground mb-4">{children}</h3>;
}

function MissingData() {
  return <span className="text-rose-500/80 font-mono text-[10px] bg-rose-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">Missing Data</span>;
}

function NoneBadge({ text = "None" }: { text?: string }) {
  return <span className="text-muted-foreground/80 font-mono text-[10px] bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-wider">{text}</span>;
}

function CompanyLogo({ ticker, name, className = 'w-12 h-12' }: { ticker: string, name: string, className?: string }) {
  const logoUrl = `/api/logo/ticker/${encodeURIComponent(ticker)}`;

  return (
    <div className={`rounded-md border border-black/70 bg-[#0f1015] flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
          fallback?.classList.remove('hidden');
        }}
      />
      <div className={`bg-emerald-500 rounded-md flex items-center justify-center font-bold text-white hidden w-full h-full`}>
        {ticker.charAt(0)}
      </div>
    </div>
  );
}

// Static mapping for Top 20 companies by Market Cap as a fallback since free APIs don't provide live global rank
const TOP_MCAP_RANKS: Record<string, number> = {
  'NVDA': 1, 'MSFT': 2, 'AAPL': 3, 'GOOG': 4, 'GOOGL': 4, 'AMZN': 5,
  'META': 6, 'BRK-B': 7, 'TSM': 8, 'AVGO': 9, 'LLY': 10, 'JPM': 11,
  'TSLA': 12, 'WMT': 13, 'V': 14, 'XOM': 15, 'UNH': 16, 'MA': 17,
  'PG': 18, 'JNJ': 19, 'HD': 20
};

// Format numbers for Y-Axis (Integers only, with $)
function formatYAxisTick(value: number) {
  if (value === 0) return '0';
  return '$' + formatLargeNumber(value);
}

function formatXAxisTick(tickItem: string, configKey: string) {
  if (configKey === 'Price' && tickItem && typeof tickItem === 'string') {
    const parts = tickItem.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }
  return tickItem;
}

function formatRelativeTime(dateString: string, now = Date.now()) {
  const diffInSeconds = Math.max(0, Math.floor((now - new Date(dateString).getTime()) / 1000));
  if (diffInSeconds < 60) return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
}

function RelativeTimeDisplay({ timestamp }: { timestamp: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <>{formatRelativeTime(timestamp, now)}</>;
}

// Format numbers for generic large values (e.g. Market Cap)
function formatLargeNumber(num: number) {
  if (num == null) return '—';
  if (num === 0) return '0';
  if (Math.abs(num) >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (Math.abs(num) >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (Math.abs(num) >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function getMetricColor(value: number | undefined | null, metricType: string, sector?: string | null, sectorPeMap?: Record<string, number>) {
  if (value === undefined || value === null) return 'text-white';
  
  if (metricType === 'piotroski') {
    if (value >= 7) return 'text-emerald-400';
    if (value >= 4) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'peg') {
    if (value <= 0) return 'text-rose-400';
    if (value < 1.0) return 'text-emerald-400';
    if (value <= 1.5) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'roe') {
    if (value > 20) return 'text-emerald-400';
    if (value >= 10) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'roa') {
    if (value > 15) return 'text-emerald-400';
    if (value >= 5) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'evRevenue') {
    if (value < 3) return 'text-emerald-400';
    if (value <= 10) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'pe') {
    if (value <= 0) return 'text-rose-400';
    
    let targetPe = 25; // Default average PE
    
    if (sector && sectorPeMap && sectorPeMap[sector]) {
      targetPe = sectorPeMap[sector];
    } else if (sector && sectorPeMap) {
      // Find a partial match just in case
      const found = Object.keys(sectorPeMap).find(k => sector.toLowerCase().includes(k.toLowerCase()));
      if (found) targetPe = sectorPeMap[found];
    }
    
    if (value < targetPe * 0.7) return 'text-emerald-400';
    if (value <= targetPe * 1.1) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'ps') {
    if (value <= 0) return 'text-rose-400';
    if (value < 2) return 'text-emerald-400';
    if (value <= 5) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'pb') {
    if (value <= 0) return 'text-rose-400';
    if (value < 1.5) return 'text-emerald-400';
    if (value <= 3) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'evEbitda') {
    if (value <= 0) return 'text-rose-400';
    if (value < 10) return 'text-emerald-400';
    if (value <= 15) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'yield') {
    if (value >= 0.05) return 'text-emerald-400';
    if (value >= 0.02) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'sbcImpact') {
    if (value < 0) return 'text-rose-400';
    if (value < 10) return 'text-emerald-400';
    if (value <= 20) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'margin') {
    if (value >= 20) return 'text-emerald-400';
    if (value >= 5) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'growth') {
    if (value >= 15) return 'text-emerald-400';
    if (value >= 0) return 'text-amber-400';
    return 'text-rose-400';
  }
  if (metricType === 'divYield') {
    if (value >= 3) return 'text-emerald-400';
    if (value >= 1) return 'text-amber-400';
    return 'text-white';
  }
  if (metricType === 'payoutRatio') {
    if (value < 0) return 'text-rose-400';
    if (value < 50) return 'text-emerald-400';
    if (value <= 75) return 'text-amber-400';
    return 'text-rose-400';
  }
  return 'text-white';
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1b23] border border-[#2a2b36] p-3 rounded-lg shadow-2xl text-[13px] min-w-[140px] relative">
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1b23] border-b border-r border-[#2a2b36] rotate-45"></div>
        <p className="font-bold text-white mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 font-medium">
             <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.color }}></div>
             <span className="text-white">${formatLargeNumber(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// Chart Configurations mapping Title to data key and style
const CHART_CONFIGS: Record<string, { dataKey: string; type: 'area' | 'bar'; color: string; fillOpacity: number }> = {
  'Price': { dataKey: 'price', type: 'area', color: '#10b981', fillOpacity: 0.3 },
  'Revenue': { dataKey: 'revenue', type: 'bar', color: '#0ea5e9', fillOpacity: 1 },
  'EBITDA': { dataKey: 'ebitda', type: 'bar', color: '#8b5cf6', fillOpacity: 1 },
  'Net Income': { dataKey: 'netIncome', type: 'bar', color: '#10b981', fillOpacity: 1 },
  'Free Cash Flow': { dataKey: 'fcf', type: 'bar', color: '#3b82f6', fillOpacity: 1 },
  'EPS': { dataKey: 'eps', type: 'area', color: '#f59e0b', fillOpacity: 0.2 },
  'Shares Outstanding': { dataKey: 'shares', type: 'area', color: '#6366f1', fillOpacity: 0.2 },
  'Cash & Debt': { dataKey: 'cash', type: 'bar', color: '#10b981', fillOpacity: 1 },
  'Return Of Capital': { dataKey: 'repurchases', type: 'bar', color: '#ec4899', fillOpacity: 1 },
};

function MiniChart({ data, configKey }: { data: any[], configKey: string }) {
  const config = CHART_CONFIGS[configKey];
  if (!config || !data || data.length === 0) return <MissingData />;

  return (
    <ResponsiveContainer width="100%" height="100%">
      {config.type === 'bar' ? (
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
          <XAxis dataKey={configKey === 'Price' ? 'date' : 'period'} stroke="#52525b" fontSize={9} tickMargin={5} minTickGap={15} angle={-45} textAnchor="end" tickFormatter={(val) => formatXAxisTick(val, configKey)} />
          <YAxis stroke="#52525b" fontSize={9} tickFormatter={formatYAxisTick} width={45} domain={configKey === 'Price' ? ['auto', 'auto'] : undefined} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
          <Bar dataKey={config.dataKey} fill={config.color} radius={[2, 2, 0, 0]} />
        </BarChart>
      ) : (
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
          <XAxis dataKey={configKey === 'Price' ? 'date' : 'period'} stroke="#52525b" fontSize={9} tickMargin={5} minTickGap={15} angle={-45} textAnchor="end" tickFormatter={(val) => formatXAxisTick(val, configKey)} />
          <YAxis stroke="#52525b" fontSize={9} tickFormatter={formatYAxisTick} width={45} domain={configKey === 'Price' ? ['auto', 'auto'] : undefined} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey={config.dataKey} stroke={config.color} fill={config.color} fillOpacity={config.fillOpacity} strokeWidth={2} />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

function ExpandedChart({ data, fullData, configKey, isAnnual }: { data: any[], fullData: any[], configKey: string, isAnnual: boolean }) {
  const config = CHART_CONFIGS[configKey];
  if (!config || !data || data.length === 0) return <div className="flex items-center justify-center h-full"><MissingData /></div>;

  const currentVal = fullData[fullData.length - 1]?.[config.dataKey];
  
  const calculateGrowth = (years: number) => {
    const offset = configKey === 'Price' ? years * 252 : (isAnnual ? years : years * 4);
    if (fullData.length < offset * 0.9) return null;
    const startIndex = Math.max(0, fullData.length - 1 - offset);
    const pastVal = fullData[startIndex]?.[config.dataKey];
    if (!pastVal || pastVal <= 0 || !currentVal || currentVal <= 0) return null;
    const cagr = (Math.pow(currentVal / pastVal, 1 / years) - 1) * 100;
    return cagr.toFixed(2);
  };
  const cagr1 = calculateGrowth(1);
  const cagr3 = calculateGrowth(3);
  const cagr5 = calculateGrowth(5);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {config.type === 'bar' ? (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey={configKey === 'Price' ? 'date' : 'period'} stroke="#52525b" fontSize={11} tickMargin={10} minTickGap={30} tickFormatter={(val) => formatXAxisTick(val, configKey)} />
              <YAxis stroke="#52525b" fontSize={11} tickFormatter={formatYAxisTick} domain={configKey === 'Price' ? ['auto', 'auto'] : undefined} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey={config.dataKey} fill={config.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey={configKey === 'Price' ? 'date' : 'period'} stroke="#52525b" fontSize={11} tickMargin={10} minTickGap={30} tickFormatter={(val) => formatXAxisTick(val, configKey)} />
              <YAxis stroke="#52525b" fontSize={11} tickFormatter={formatYAxisTick} domain={configKey === 'Price' ? ['auto', 'auto'] : undefined} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={config.dataKey} stroke={config.color} fill={config.color} fillOpacity={config.fillOpacity} strokeWidth={2} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      {(cagr1 || cagr3 || cagr5) && (
        <div className="flex gap-3 justify-center pb-4 pt-2">
          {cagr1 && <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md text-xs font-semibold">1Y CAGR: {cagr1}%</span>}
          {cagr3 && <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md text-xs font-semibold">3Y CAGR: {cagr3}%</span>}
          {cagr5 && <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md text-xs font-semibold">5Y CAGR: {cagr5}%</span>}
        </div>
      )}
    </div>
  );
}


// --- Main Page Component ---

export default function InsightsTicker() {
  const { ticker = '' } = useParams<{ ticker: string }>();
  const normalizedTicker = useMemo(() => ticker.trim().toUpperCase(), [ticker]);
  const queryClient = useQueryClient();
  const [timeframe, setTimeframe] = useState<'Quarterly' | 'TTM' | 'Annually'>('Quarterly');
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [expandedTimeframe, setExpandedTimeframe] = useState<'1 Week' | '1 Month' | '3 Months' | '6 Months' | 'YTD' | '1 Year' | '3 Years' | '5 Years' | '10 Years' | 'All'>('5 Years');
  const [isPatching, setIsPatching] = useState(false);

  // --- Data Fetching ---
  const { data, isLoading, isError } = useQuery<InsightsTickerResponse>({
    queryKey: ['insights-ticker', normalizedTicker],
    queryFn: async () => {
      const res = await fetch(`/api/insights/${normalizedTicker}`);
      if (!res.ok) throw new Error('Failed to fetch insights');
      return res.json();
    },
    enabled: normalizedTicker.length > 0,
  });

  const { data: tradesData } = useQuery<InsightTableModule>({
    queryKey: ['insights-trades', normalizedTicker],
    queryFn: async () => {
      const res = await fetch(`/api/insights/${normalizedTicker}/insider-trades`);
      if (!res.ok) throw new Error('Failed to fetch trades');
      return res.json();
    },
    enabled: normalizedTicker.length > 0,
  });

  const { data: estimatesData } = useQuery<InsightTableModule>({
    queryKey: ['insights-estimates', normalizedTicker],
    queryFn: async () => {
      const res = await fetch(`/api/insights/${normalizedTicker}/analyst-estimates`);
      if (!res.ok) throw new Error('Failed to fetch estimates');
      return res.json();
    },
    enabled: normalizedTicker.length > 0,
  });

  const { data: sectorPeData } = useQuery<Record<string, number>>({
    queryKey: ['sector-pe'],
    queryFn: async () => {
      const res = await fetch(`/api/insights/sector-pe`);
      if (!res.ok) throw new Error('Failed to fetch sector PEs');
      return res.json();
    },
  });

  const agg = data?.aggregatedData || {};

  const getSectorPeTooltip = () => {
    const sector = agg?.profile?.sector;
    if (!sector || !sectorPeData) return null;
    let targetPe = 25;
    let foundName = sector;
    if (sectorPeData[sector]) {
      targetPe = sectorPeData[sector];
    } else {
      const found = Object.keys(sectorPeData).find(k => sector.toLowerCase().includes(k.toLowerCase()));
      if (found) {
        targetPe = sectorPeData[found];
        foundName = found;
      }
    }
    return `${foundName} Avg PE: ${targetPe.toFixed(2)}`;
  };
  const peTooltip = getSectorPeTooltip();

  const historicalData = useMemo(() => {
    if (!agg?.pricing?.historical) return [];
    return [...agg.pricing.historical].reverse();
  }, [agg?.pricing?.historical]);

  const currentChartData = useMemo(() => {
    return timeframe === 'Annually' ? (agg?.charts?.annual || []) : (agg?.charts?.quarterly || []);
  }, [timeframe, agg?.charts]);

  const chartDataToRender = useMemo(() => {
    if (!selectedChart) return [];
    const isPrice = selectedChart === 'Price';
    const targetData = isPrice ? historicalData : currentChartData;
    let sliceAmount = 0;
    if (expandedTimeframe === 'YTD') {
      if (isPrice) {
        const currentYear = new Date().getFullYear().toString();
        const ytdIndex = targetData.findIndex((d: any) => d.date && d.date.startsWith(currentYear));
        sliceAmount = ytdIndex !== -1 ? targetData.length - ytdIndex : 252;
      } else {
        sliceAmount = timeframe === 'Annually' ? 1 : 4;
      }
    } else if (expandedTimeframe === '1 Week') {
      sliceAmount = isPrice ? 5 : 1;
    } else if (expandedTimeframe === '1 Month') {
      sliceAmount = isPrice ? 21 : 1;
    } else if (expandedTimeframe === '3 Months') {
      sliceAmount = isPrice ? 63 : (timeframe === 'Annually' ? 1 : 1);
    } else if (expandedTimeframe === '6 Months') {
      sliceAmount = isPrice ? 126 : (timeframe === 'Annually' ? 1 : 2);
    } else if (expandedTimeframe === '1 Year') {
      sliceAmount = isPrice ? 252 : (timeframe === 'Annually' ? 1 : 4);
    } else if (expandedTimeframe === '3 Years') {
      sliceAmount = isPrice ? 756 : (timeframe === 'Annually' ? 3 : 12);
    } else if (expandedTimeframe === '5 Years') {
      sliceAmount = isPrice ? 1260 : (timeframe === 'Annually' ? 5 : 20);
    } else if (expandedTimeframe === '10 Years') {
      sliceAmount = isPrice ? 2520 : (timeframe === 'Annually' ? 10 : 40);
    }
    return sliceAmount > 0 ? targetData.slice(-sliceAmount) : targetData;
  }, [selectedChart, historicalData, currentChartData, expandedTimeframe, timeframe]);

  const chartPercentChange = useMemo(() => {
    if (!selectedChart || chartDataToRender.length < 2) return null;
    const config = CHART_CONFIGS[selectedChart];
    if (!config) return null;
    const firstPoint = chartDataToRender[0]?.[config.dataKey];
    const lastPoint = chartDataToRender[chartDataToRender.length - 1]?.[config.dataKey];
    if (firstPoint && lastPoint && firstPoint !== 0) {
      return ((lastPoint - firstPoint) / firstPoint) * 100;
    }
    return null;
  }, [selectedChart, chartDataToRender]);

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
  }
  if (isError) {
    return <div className="p-12 text-center text-destructive"><AlertTriangle className="mx-auto w-12 h-12 mb-4" />Error Loading Insights</div>;
  }

  // --- Data Extraction ---
  const thesisModule = data?.modules.find(m => m.title === 'THESIS') as InsightNarrativeModule | undefined;
  const risksModule = data?.modules.find(m => m.title === 'RISKS') as InsightListModule | undefined;
  
  const snapshotModule = data?.modules.find(m => m.title === 'SNAPSHOT') as InsightKpiModule | undefined;
  const getMetric = (label: string) => snapshotModule?.items.find(i => i.label === label)?.value || '—';

  return (
    <div className="bg-[#0f1015] min-h-screen text-foreground p-6 space-y-6 overflow-y-auto">
      
      {/* Chart Modal */}
      {selectedChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8" onClick={() => setSelectedChart(null)}>
          <div className="bg-[#1a1b23] border border-[#2a2b36] rounded-xl w-full max-w-6xl h-[80vh] flex flex-col p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-8 relative">
              <div className="flex items-center gap-4">
                <CompanyLogo ticker={normalizedTicker} name={agg?.profile?.name || data?.name || 'Company'} className="w-12 h-12" />
                <div className="w-12 h-12 bg-emerald-500 rounded flex items-center justify-center font-bold text-white text-2xl hidden">
                  {normalizedTicker.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-white leading-tight">{selectedChart} - {normalizedTicker}</h2>
                  {chartPercentChange !== null && (
                    <div className={`flex items-center gap-1 font-semibold text-sm ${chartPercentChange >= 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'} px-2 py-0.5 rounded-sm w-fit mt-1`}>
                      {chartPercentChange >= 0 ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                      {chartPercentChange >= 0 ? '+' : ''}{chartPercentChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                    </div>
                  )}
                </div>
              </div>
              
              <div className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center border border-[#2a2b36] rounded overflow-hidden">
                {['1 Week', '1 Month', '3 Months', '6 Months', 'YTD', '1 Year', '5 Years', '10 Years', 'All'].map(tf => (
                  <button 
                    key={tf}
                    onClick={() => setExpandedTimeframe(tf as any)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors border-r border-[#2a2b36] last:border-r-0 ${expandedTimeframe === tf ? 'bg-[#0ea5e9]/20 text-[#0ea5e9]' : 'bg-[#0f1015] text-muted-foreground hover:bg-[#1a1b23] hover:text-white'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 items-center">
                <button className="bg-[#0f1015] border border-[#2a2b36] p-1.5 rounded hover:bg-[#2a2b36] transition-colors"><Download className="w-4 h-4" /></button>
                <button className="bg-[#0f1015] border border-[#2a2b36] p-1.5 rounded hover:bg-[#2a2b36] transition-colors" onClick={() => setSelectedChart(null)}><X className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex-1 border border-[#2a2b36]/50 rounded-lg bg-[#0f1015]/50 overflow-hidden flex flex-col">
               {CHART_CONFIGS[selectedChart] ? (
                 <ExpandedChart 
                   data={chartDataToRender} 
                   fullData={selectedChart === 'Price' ? historicalData : currentChartData}
                   configKey={selectedChart} 
                   isAnnual={timeframe === 'Annually'} 
                 />
               ) : (
                 <div className="flex items-center justify-center h-full flex-col gap-4">
                   <MissingData />
                   <span className="text-muted-foreground text-sm">Chart not configured for {selectedChart}</span>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* 1. Header Area */}
      <div className="relative">
        
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <div className="relative w-96 mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={normalizedTicker} 
              className="w-full bg-[#1a1b23] border border-[#2a2b36] rounded-md py-2 pl-10 pr-10 text-sm focus:outline-none focus:border-primary/50"
              readOnly
            />
            <Star className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-yellow-400" />
          </div>

          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="text-[11px] text-muted-foreground font-mono bg-emerald-500/10 text-emerald-400/90 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {data?.generatedAt ? (
                <>Last Data Refresh: <RelativeTimeDisplay timestamp={data.generatedAt} /></>
              ) : (
                <>Last Data Refresh: <MissingData /></>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={async () => {
                  try {
                    await fetch(`/api/insights/${normalizedTicker}/refresh`, { method: 'POST' });
                    window.location.reload();
                  } catch (e) {
                    console.error('Failed to refresh cache', e);
                  }
                }}
                className="text-[10px] text-muted-foreground hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Clear Cache & Refresh
              </button>
              {process.env.NODE_ENV === 'development' && (
                <button
                  disabled={isPatching}
                  onClick={async () => {
                    try {
                      setIsPatching(true);
                      const res = await fetch(`/api/insights/${normalizedTicker}/dev-patch`);
                      if (!res.ok) throw new Error('Failed to fetch dev patch');
                      const patch = await res.json();
                      
                      queryClient.setQueryData(['insights-ticker', normalizedTicker], (old: any) => {
                        if (!old) return old;
                        const newAgg = { ...old.aggregatedData };
                        if (newAgg.valuation) {
                          if (newAgg.valuation.pe.ttm == null && patch.peTtm != null) newAgg.valuation.pe.ttm = patch.peTtm;
                          if (newAgg.valuation.pe.ntm == null && patch.peNtm != null) newAgg.valuation.pe.ntm = patch.peNtm;
                          if (newAgg.valuation.ps == null && patch.ps != null) newAgg.valuation.ps = patch.ps;
                          if (newAgg.valuation.pb == null && patch.pb != null) newAgg.valuation.pb = patch.pb;
                        }
                        if (newAgg.dividend) {
                          if (newAgg.dividend.divYield == null && patch.divYield !== undefined) newAgg.dividend.divYield = patch.divYield;
                          if (newAgg.dividend.payoutRatio == null && patch.payoutRatio !== undefined) newAgg.dividend.payoutRatio = patch.payoutRatio;
                          if (newAgg.dividend.exDivDate == null && patch.exDivDate !== undefined) newAgg.dividend.exDivDate = patch.exDivDate;
                        }
                        return { ...old, aggregatedData: newAgg };
                      });
                    } catch (e) {
                      console.error('Patch Error:', e);
                    } finally {
                      setIsPatching(false);
                    }
                  }}
                  className="text-[10px] text-amber-500/80 hover:text-amber-400 underline underline-offset-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isPatching ? 'Patching...' : 'Populate Missing Data (Dev API)'}
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <CompanyLogo ticker={normalizedTicker} name={agg?.profile?.name || data?.name || 'Company'} />
            <div className="text-center md:text-left">
              <h1 className="text-xl font-semibold text-white">{agg?.profile?.name || data?.name || 'Unknown Company'}</h1>
              <div className="text-sm text-muted-foreground">{normalizedTicker} | {agg?.profile?.exchange || data?.exchange || 'NASDAQ'}</div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-2xl font-bold text-white">
                {agg?.quote?.price ? `$${agg.quote.price.toFixed(2)}` : (getMetric('PRICE') !== '—' ? getMetric('PRICE') : <MissingData />)}
              </span>
              {agg?.quote?.change ? (
                <span className={cn("text-[11px] px-2 py-0.5 rounded font-medium", agg.quote.change >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400")}>
                  {agg.quote.change >= 0 ? '+' : ''}{agg.quote.change.toFixed(2)} | {agg.quote.changePercent?.toFixed(2)}%
                </span>
              ) : <MissingData />}
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-2">
              <span>After hours:</span> 
              {agg?.quote?.afterHoursPrice ? (
                <>
                  <span className="text-foreground">${agg.quote.afterHoursPrice.toFixed(2)}</span>
                  {agg?.quote?.afterHoursChange && (
                    <span className={agg.quote.afterHoursChange >= 0 ? "text-emerald-400" : "text-rose-400"}>
                      {agg.quote.afterHoursChange >= 0 ? '+' : ''}{agg.quote.afterHoursChange.toFixed(2)} | {agg.quote.afterHoursChangePercent?.toFixed(2)}%
                    </span>
                  )}
                </>
              ) : <MissingData />}
            </div>
            {agg?.pricing?.priceChange && (
              <div className="flex justify-center gap-4 mt-3 text-[11px] font-mono">
                <span className="text-muted-foreground">YTD: {agg.pricing.priceChange.ytd != null ? <span className={agg.pricing.priceChange.ytd >= 0 ? "text-emerald-400" : "text-rose-400"}>{agg.pricing.priceChange.ytd > 0 ? '+' : ''}{agg.pricing.priceChange.ytd.toFixed(2)}%</span> : <MissingData />}</span>
                <span className="text-muted-foreground">1Y: {agg.pricing.priceChange['1Y'] != null ? <span className={agg.pricing.priceChange['1Y'] >= 0 ? "text-emerald-400" : "text-rose-400"}>{agg.pricing.priceChange['1Y'] > 0 ? '+' : ''}{agg.pricing.priceChange['1Y'].toFixed(2)}%</span> : <MissingData />}</span>
                <span className="text-muted-foreground">3Y: {agg.pricing.priceChange['3Y'] != null ? <span className={agg.pricing.priceChange['3Y'] >= 0 ? "text-emerald-400" : "text-rose-400"}>{agg.pricing.priceChange['3Y'] > 0 ? '+' : ''}{agg.pricing.priceChange['3Y'].toFixed(2)}%</span> : <MissingData />}</span>
              </div>
            )}
          </div>
        </div>
      </div>



      {/* 2. Brief */}
      <Panel className="text-center flex flex-col items-center">
        <h3 className="text-[14px] font-semibold text-white mb-1">Brief</h3>
        <p className="text-[12px] text-muted-foreground mb-4">A summary of key recent developments</p>
        <div className="text-[13px] text-foreground/90 space-y-2 max-w-4xl w-full">
          {thesisModule ? (
             <div dangerouslySetInnerHTML={{ __html: thesisModule.markdown }} />
          ) : (
            <MissingData />
          )}

        </div>
      </Panel>

      {/* 3. Financial Metrics Grid */}
      <Panel className="py-6 overflow-x-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-[12px] min-w-[800px]">
          <div className="space-y-2 border-r border-[#2a2b36] pr-6">
            <h4 className="font-semibold text-white mb-4">Valuation</h4>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Market Cap:</span> 
              <span>
                {agg?.valuation?.marketCap ? `$${formatLargeNumber(agg.valuation.marketCap)}` : <MissingData />}
                {TOP_MCAP_RANKS[ticker!] && <span className="ml-1.5 text-xs text-sky-400 font-bold bg-sky-400/10 px-1 rounded-sm">(#{TOP_MCAP_RANKS[ticker!]})</span>}
              </span>
            </div>
            <div className="flex justify-between items-center group relative cursor-help">
              <span className="text-muted-foreground flex items-center gap-1">P/E (TTM): <Info className="w-3 h-3" /></span>
              <span className={cn("flex items-center gap-1", getMetricColor(agg?.valuation?.pe?.ttm, 'pe', agg?.profile?.sector, sectorPeData))}>
                {agg?.valuation?.pe?.ttm ? agg.valuation.pe.ttm.toFixed(2) : <MissingData />}
                {agg?.valuation?.normalizationEvents?.some((e: any) => e.metric === 'PE_TTM') && (
                  <span title={`Cross-source deviation >2% — using median. ${agg.valuation.normalizationEvents.filter((e: any) => e.metric === 'PE_TTM').map((e: any) => `${e.outlierSource}: ${e.deviation.toFixed(2)}%`).join(', ')}`} className="text-amber-400 cursor-help text-[10px]">⚠</span>
                )}
              </span>
              {peTooltip && (
                <div className="absolute bottom-full right-0 mb-1 hidden group-hover:block w-max bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded py-1 px-2 z-50 shadow-xl">
                  {peTooltip}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center group relative cursor-help">
              <span className="text-muted-foreground flex items-center gap-1">P/E (NTM): <Info className="w-3 h-3" /></span>
              <span className={getMetricColor(agg?.valuation?.pe?.ntm, 'pe', agg?.profile?.sector, sectorPeData)}>{agg?.valuation?.pe?.ntm ? agg.valuation.pe.ntm.toFixed(2) : <MissingData />}</span>
              {peTooltip && (
                <div className="absolute bottom-full right-0 mb-1 hidden group-hover:block w-max bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded py-1 px-2 z-50 shadow-xl">
                  {peTooltip}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center group relative cursor-help">
              <span className="text-muted-foreground flex items-center gap-1">P/E (2027E): <Info className="w-3 h-3" /></span>
              <span className={cn("flex items-center gap-1", getMetricColor(agg?.valuation?.pe?.fy2027, 'pe', agg?.profile?.sector, sectorPeData))}>
                {agg?.valuation?.pe?.fy2027 ? agg.valuation.pe.fy2027.toFixed(2) : <MissingData />}
                {agg?.valuation?.pe?.fy2027 && <span className="text-[9px] text-muted-foreground ml-0.5" title="Extrapolated from long-term growth rate applied to NTM EPS">est.</span>}
              </span>
              {peTooltip && (
                <div className="absolute bottom-full right-0 mb-1 hidden group-hover:block w-max bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded py-1 px-2 z-50 shadow-xl">
                  {peTooltip}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">EV/EBITDA (TTM):</span>
              <span className={cn("flex items-center gap-1", getMetricColor(agg?.valuation?.evEbitda, 'evEbitda'))}>
                {agg?.valuation?.evEbitda ? agg.valuation.evEbitda.toFixed(2) : <MissingData />}
                {agg?.valuation?.normalizationEvents?.some((e: any) => e.metric === 'EV_EBITDA') && (
                  <span title={`Cross-source deviation >2% — using median. ${agg.valuation.normalizationEvents.filter((e: any) => e.metric === 'EV_EBITDA').map((e: any) => `${e.outlierSource}: ${e.deviation.toFixed(2)}%`).join(', ')}`} className="text-amber-400 cursor-help text-[10px]">⚠</span>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground text-[11px]">EV/EBITDA (SBC Adj.):</span>
              <span className={cn("flex items-center gap-1", getMetricColor(agg?.valuation?.evEbitdaNormalized, 'evEbitda'))}>
                {agg?.valuation?.evEbitdaNormalized ? agg.valuation.evEbitdaNormalized.toFixed(2) : <MissingData />}
                {agg?.valuation?.sbcAddBack && <span className="text-[9px] text-emerald-400/70 ml-0.5" title={`SBC add-back: $${formatLargeNumber(agg.valuation.sbcAddBack)}`}>+SBC</span>}
              </span>
            </div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Price To Sales (TTM):</span> <span className={getMetricColor(agg?.valuation?.ps, 'ps')}>{agg?.valuation?.ps ? agg.valuation.ps.toFixed(2) : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Price to Book (MRQ):</span> <span className={getMetricColor(agg?.valuation?.pb, 'pb')}>{agg?.valuation?.pb ? agg.valuation.pb.toFixed(2) : <MissingData />}</span></div>
            {agg?.valuation?.normalizationEvents && agg.valuation.normalizationEvents.length > 0 && (
              <div className="mt-3 pt-2 border-t border-amber-500/20">
                <div className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold mb-1">
                  <span>⚠</span> Data Quality ({agg.valuation.normalizationEvents.length} event{agg.valuation.normalizationEvents.length > 1 ? 's' : ''})
                </div>
                {agg.valuation.normalizationEvents.slice(0, 3).map((evt: any, idx: number) => (
                  <div key={idx} className="text-[9px] text-muted-foreground leading-tight">
                    {evt.note ? (
                      <span className={evt.metric === 'SBC_ADJUSTMENT' && evt.outlierSource !== 'FMP Fallback' ? "text-emerald-400" : "text-amber-400"}>
                        {evt.metric}: {evt.note}
                      </span>
                    ) : (
                      `${evt.metric}: ${evt.outlierSource} deviated ${evt.deviation.toFixed(1)}% from median (${evt.median.toFixed(2)})`
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2 border-r border-[#2a2b36] pr-6">
            <h4 className="font-semibold text-white mb-4">Advanced Ratios</h4>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">PEG Ratio (TTM):</span> <span className={getMetricColor(agg?.ratios?.pegRatio, 'peg')}>{agg?.ratios?.pegRatio != null ? agg.ratios.pegRatio.toFixed(2) : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Return on Equity (TTM):</span> <span className={getMetricColor(agg?.ratios?.returnOnEquity, 'roe')}>{agg?.ratios?.returnOnEquity != null ? `${agg.ratios.returnOnEquity.toFixed(2)}%` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Return on Assets (TTM):</span> <span className={getMetricColor(agg?.ratios?.returnOnAssets, 'roa')}>{agg?.ratios?.returnOnAssets != null ? `${agg.ratios.returnOnAssets.toFixed(2)}%` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">EV to Revenue (TTM):</span> <span className={getMetricColor(agg?.ratios?.evToRevenue, 'evRevenue')}>{agg?.ratios?.evToRevenue != null ? agg.ratios.evToRevenue.toFixed(2) : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Piotroski Score:</span> <span className={getMetricColor(agg?.ratios?.piotroskiScore, 'piotroski')}>{agg?.ratios?.piotroskiScore != null && agg?.ratios?.piotroskiScore !== null ? `${agg.ratios.piotroskiScore}/9` : <MissingData />}</span></div>
          </div>
          <div className="space-y-2 border-r border-[#2a2b36] pr-6">
            <h4 className="font-semibold text-white mb-4">Cash Flow</h4>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">FCF Yield (TTM):</span> <span className={getMetricColor(agg?.cashFlow?.fcfYield, 'yield')}>{agg?.cashFlow?.fcfYield != null ? `${(agg.cashFlow.fcfYield * 100).toFixed(2)}%` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">FCF Per Share / Price:</span> <span>{agg?.ratios?.freeCashFlowPerShare != null && agg?.quote?.price ? `${agg.ratios.freeCashFlowPerShare.toFixed(2)} / ${agg.quote.price.toFixed(2)}` : <MissingData />}</span></div>
            <div className="flex justify-between items-center mt-2"><span className="text-muted-foreground">SBC Adj. FCF Yield:</span> <span className={getMetricColor(agg?.cashFlow?.adjFcfYield, 'yield')}>{agg?.cashFlow?.adjFcfYield != null ? `${(agg.cashFlow.adjFcfYield * 100).toFixed(2)}%` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground text-[10px]">Adj. FCF Per Share / Price:</span> <span>{agg?.cashFlow?.adjFcfPerShare != null && agg?.quote?.price ? `${agg.cashFlow.adjFcfPerShare.toFixed(2)} / ${agg.quote.price.toFixed(2)}` : <MissingData />}</span></div>
            <div className="flex justify-between items-center mt-2"><span className="text-muted-foreground">SBC Impact:</span> <span className={getMetricColor(agg?.cashFlow?.sbcImpact, 'sbcImpact')}>{agg?.cashFlow?.sbcImpact != null ? `${agg.cashFlow.sbcImpact.toFixed(2)}%` : <MissingData />}</span></div>
          </div>
          <div className="space-y-2 border-r border-[#2a2b36] pr-6">
            <h4 className="font-semibold text-white mb-4">Margins & Growth</h4>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Profit Margins (TTM):</span> <span className={getMetricColor(agg?.margins?.profitMargin, 'margin')}>{agg?.margins?.profitMargin != null ? `${agg.margins.profitMargin.toFixed(2)}%` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Operating Margin (TTM):</span> <span className={getMetricColor(agg?.margins?.operatingMargin, 'margin')}>{agg?.margins?.operatingMargin != null ? `${agg.margins.operatingMargin.toFixed(2)}%` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Earnings YoY (MRQ):</span> <span className={getMetricColor(agg?.margins?.qEarningsYoY, 'growth')}>{agg?.margins?.qEarningsYoY != null ? `${agg.margins.qEarningsYoY.toFixed(2)}%` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Revenue YoY (MRQ):</span> <span className={getMetricColor(agg?.margins?.qRevenueYoY, 'growth')}>{agg?.margins?.qRevenueYoY != null ? `${agg.margins.qRevenueYoY.toFixed(2)}%` : <MissingData />}</span></div>
          </div>
          <div className="space-y-2 border-r border-[#2a2b36] pr-6">
            <h4 className="font-semibold text-white mb-4">Balance</h4>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Cash (MRQ):</span> <span>{agg?.balance?.cash != null ? `$${formatLargeNumber(agg.balance.cash)}` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Debt (MRQ):</span> <span>{agg?.balance?.debt != null ? `$${formatLargeNumber(agg.balance.debt)}` : <MissingData />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Net Debt (MRQ):</span> <span>{agg?.balance?.netDebt != null ? `$${formatLargeNumber(agg.balance.netDebt)}` : <MissingData />}</span></div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white mb-4">Dividend</h4>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Dividend Yield:</span> <span className={getMetricColor(agg?.dividend?.divYield, 'divYield')}>{agg?.dividend?.divYield != null ? `${agg.dividend.divYield.toFixed(2)}%` : <NoneBadge />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Payout Ratio:</span> <span className={getMetricColor(agg?.dividend?.payoutRatio, 'payoutRatio')}>{agg?.dividend?.payoutRatio != null ? `${agg.dividend.payoutRatio.toFixed(2)}%` : <NoneBadge />}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Payout Date:</span> <span>{agg?.dividend?.exDivDate || <NoneBadge />}</span></div>
          </div>
        </div>
      </Panel>

      {/* 4. Charts Grid */}
      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <div className="bg-[#1a1b23] border border-[#2a2b36] rounded-lg p-1 flex gap-1">
            {['Quarterly', 'Quarterly (TTM)', 'Annually'].map(tf => {
              const val = tf === 'Quarterly (TTM)' ? 'TTM' : tf as any;
              return (
                <button 
                  key={tf}
                  onClick={() => setTimeframe(val)}
                  className={cn(
                    "px-4 py-1.5 text-[12px] font-medium rounded-md transition-colors",
                    timeframe === val ? "bg-sky-500/20 text-sky-400" : "text-muted-foreground hover:text-white"
                  )}
                >
                  {tf}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {['Price', 'Revenue', 'EBITDA', 'Net Income', 'Free Cash Flow', 'EPS', 'Shares Outstanding', 'Cash & Debt', 'Return Of Capital'].map((title) => {
            const dataArr = title === 'Price' ? historicalData : currentChartData;
            const config = CHART_CONFIGS[title];
            let pctChange: number | null = null;
            if (dataArr && dataArr.length >= 2 && config) {
              const first = dataArr[0]?.[config.dataKey];
              const last = dataArr[dataArr.length - 1]?.[config.dataKey];
              if (first && last && first !== 0) {
                pctChange = ((last - first) / first) * 100;
              }
            }
            return (
            <Panel 
              key={title} 
              className="p-4 h-48 flex flex-col cursor-pointer hover:border-primary/50 transition-colors group"
              onClick={() => setSelectedChart(title)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 shrink-0 relative">
                    <CompanyLogo ticker={normalizedTicker} name={agg?.profile?.name || data?.name || 'Company'} className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-foreground leading-tight">
                      {title === 'Price' ? `Price - ${normalizedTicker}` : title}
                    </span>
                    {pctChange !== null && (
                      <div className={`flex items-center gap-0.5 font-semibold text-[10px] ${pctChange >= 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'} px-1.5 py-0.5 rounded-sm w-fit mt-0.5`}>
                        {pctChange >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {pctChange >= 0 ? '+' : ''}{pctChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                      </div>
                    )}
                  </div>
                </div>
                <button className="text-muted-foreground group-hover:text-white transition-colors shrink-0">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden mt-auto rounded relative">
                {CHART_CONFIGS[title] ? (
                  <MiniChart data={title === 'Price' ? historicalData : currentChartData} configKey={title} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0f1015]/50 border border-[#2a2b36]/50">
                    <MissingData />
                  </div>
                )}
              </div>
            </Panel>
          );})}
          
          {/* Missing/Unconfigured Charts */}
          {['Valuation'].map((title) => (
            <Panel 
              key={title} 
              className="p-4 h-48 flex flex-col cursor-pointer hover:border-primary/50 transition-colors group"
              onClick={() => setSelectedChart(title)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2.5">
                  <CompanyLogo ticker={normalizedTicker} name={agg?.profile?.name || data?.name || 'Company'} className="w-8 h-8" />
                  <span className="text-[12px] font-semibold text-foreground">{title}</span>
                </div>
                <button className="text-muted-foreground group-hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center mt-auto bg-[#0f1015]/50 rounded border border-[#2a2b36]/50">
                <MissingData />
              </div>
            </Panel>
          ))}
        </div>
      </div>

      {/* 5. Advantages & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel>
          <PanelTitle>Competitive Advantages</PanelTitle>
          <div className="space-y-4 text-[12px] text-foreground/90 leading-relaxed flex items-center justify-center min-h-[100px]">
             <MissingData />
          </div>
        </Panel>
        
        <Panel>
          <PanelTitle>Investment Risks</PanelTitle>
          <div className="space-y-4 text-[12px] text-foreground/90 leading-relaxed">
            {risksModule?.items && risksModule.items.length > 0 ? (
               risksModule.items.map((r, idx) => <p key={idx}>{r}</p>)
            ) : (
              <div className="flex items-center justify-center min-h-[100px]">
                <MissingData />
              </div>
            )}
          </div>
        </Panel>
      </div>

      {/* 6. Profile & Estimates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel>
          <PanelTitle>Company Profile</PanelTitle>
          <div className="space-y-3 text-[12px]">
            <div className="flex justify-between py-1 border-b border-[#2a2b36] items-center"><span className="text-muted-foreground">CEO</span> <span>{agg?.profile?.ceo || <MissingData />}</span></div>
            <div className="flex justify-between py-1 border-b border-[#2a2b36] items-center"><span className="text-muted-foreground">Website</span> {agg?.profile?.website ? <a href={agg.profile.website} className="text-sky-400 hover:underline" target="_blank" rel="noreferrer">{agg.profile.website}</a> : <MissingData />}</div>
            <div className="flex justify-between py-1 border-b border-[#2a2b36] items-center"><span className="text-muted-foreground">Sector</span> <span>{agg?.profile?.sector || <MissingData />}</span></div>
            <div className="flex justify-between py-1 border-b border-[#2a2b36] items-center"><span className="text-muted-foreground">Industry</span> <span>{agg?.profile?.industry || <MissingData />}</span></div>
            <div className="flex justify-between py-1 border-b border-[#2a2b36] items-center"><span className="text-muted-foreground">Full Time Employees</span> <span>{typeof agg?.profile?.employees === 'number' ? agg.profile.employees.toLocaleString() : <MissingData />}</span></div>
            <div className="flex justify-between py-1 border-b border-[#2a2b36] items-center"><span className="text-muted-foreground">Beta</span> <span>{typeof agg?.profile?.beta === 'number' ? agg.profile.beta.toFixed(3) : <MissingData />}</span></div>
            <div className="flex justify-between py-1 items-center"><span className="text-muted-foreground">Piotroski Score:</span> <span className={getMetricColor(agg?.ratios?.piotroskiScore, 'piotroski')}>{agg?.ratios?.piotroskiScore != null && agg?.ratios?.piotroskiScore !== null ? <span className="font-bold">{agg.ratios.piotroskiScore}/9</span> : <MissingData />}</span></div>
          </div>
        </Panel>

        <Panel>
          <div className="flex justify-between items-center mb-4">
             <PanelTitle>Analyst Estimates</PanelTitle>
             <div className="text-[11px] text-muted-foreground flex gap-2"><span className="text-sky-400">EPS</span> <span>Revenue</span></div>
          </div>
          <table className="w-full text-[12px] text-left">
            <thead>
              <tr className="border-b border-[#2a2b36] text-muted-foreground">
                <th className="py-2 font-normal"></th>
                {estimatesData ? estimatesData.rows.map(r => <th key={r.key} className="py-2 font-normal">{r.values.period}</th>) : <th className="py-2 font-normal"><MissingData /></th>}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2a2b36]/50">
                <td className="py-3 text-muted-foreground">Avg. Estimate (EPS)</td>
                {estimatesData ? estimatesData.rows.map(r => <td key={r.key}>{r.values.eps}</td>) : <td><MissingData /></td>}
              </tr>
              <tr>
                <td className="py-3 text-muted-foreground">Avg. Estimate (Rev)</td>
                {estimatesData ? estimatesData.rows.map(r => <td key={r.key}>{r.values.revenue}</td>) : <td><MissingData /></td>}
              </tr>
            </tbody>
          </table>
        </Panel>
      </div>

      {/* 7. Insider Trading & News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel>
          <PanelTitle>Company Insider Trading</PanelTitle>
          <div className="overflow-x-auto">
            {tradesData ? (
              <table className="w-full text-left text-[12px] whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[#2a2b36] text-muted-foreground">
                    {tradesData.columns.map(c => <th key={c.key} className="pb-3 font-normal pr-4">{c.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tradesData.rows.slice(0, 8).map((row) => (
                    <tr key={row.key} className="border-b border-[#2a2b36]/50 last:border-0">
                      {tradesData.columns.map(c => (
                        <td key={c.key} className={`py-3 pr-4 ${c.key === 'type' && row.values[c.key] === 'Buy' ? 'text-emerald-400' : c.key === 'type' ? 'text-muted-foreground' : ''}`}>
                          {row.values[c.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center p-8 bg-[#0f1015]/50 rounded-lg border border-[#2a2b36]/50">
                <MissingData />
              </div>
            )}
          </div>
        </Panel>

        <Panel className="flex flex-col">
          <PanelTitle>Latest News</PanelTitle>
          {agg?.news && agg.news.length > 0 ? (
            <div className="space-y-4">
              {agg.news.slice(0, 7).map((newsItem: any, i: number) => (
                <div key={i} className="flex gap-4 p-2 hover:bg-[#1a1b23] rounded-lg transition-colors cursor-pointer group border-b border-[#2a2b36]/40 last:border-0">
                  <div className="w-16 h-12 bg-[#2a2b36] rounded shrink-0 overflow-hidden">
                    {newsItem.image ? (
                      <img src={newsItem.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="News thumbnail" />
                    ) : (
                      <div className="w-full h-full bg-[#2a2b36] flex items-center justify-center text-muted-foreground text-xs">News</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <a href={newsItem.url} target="_blank" rel="noreferrer" className="block">
                      <h4 className="text-[13px] font-medium text-foreground/90 group-hover:text-sky-400 transition-colors leading-tight mb-1">{newsItem.headline}</h4>
                      <div className="text-[11px] text-muted-foreground">{newsItem.source} | {new Date(newsItem.datetime * 1000).toLocaleDateString()}</div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0f1015]/50 rounded-lg border border-[#2a2b36]/50 min-h-[200px]">
              <MissingData />
              <span className="text-muted-foreground text-sm mt-2">No news fetched</span>
            </div>
          )}
        </Panel>
      </div>

    </div>
  );
}
