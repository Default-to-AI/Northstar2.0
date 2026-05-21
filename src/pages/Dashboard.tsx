import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid, LabelList
} from 'recharts';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  BookmarkPlus,
  ExternalLink,
  BookOpen,
  Upload
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { usePortfolioData } from '@/src/hooks/usePortfolioData';
import { useInvestorProfile } from '@/src/hooks/useInvestorProfile';
import { Position } from '@/src/types';
import { WatchlistDialog } from '@/src/components/WatchlistDialog';
import { ThesisDrawer } from '@/src/components/ThesisDrawer';
import { CsvImportDialog } from '@/src/components/CsvImportDialog';
import { FearGreedGauge } from '@/src/components/FearGreedGauge';
import { getFearGreedIndex } from '@/src/lib/fearGreedIndex';
import { useQuery } from '@tanstack/react-query';

// Chart Colors
const SECTOR_COLORS = ['#f5c518', '#8e8e9e', '#3b82f6', '#00c896', '#ff4757', '#a855f7', '#ec4899'];
const FONT_MONO = { fontFamily: 'JetBrains Mono', fontSize: 12 };

export default function Dashboard() {
  const { positions, metrics, cash, setCash, deletePosition, updatePosition, setPositions } = usePortfolioData();
  const { profile } = useInvestorProfile();
  const [newsMode, setNewsMode] = useState<'holdings' | 'market'>('holdings');
  const [isEditingCash, setIsEditingCash] = useState(false);
  const [tempCashValue, setTempCashValue] = useState("");
  const [chartTimeframe, setChartTimeframe] = useState<'ytd' | '1y' | 'mtd'>('ytd');

  // Real News Fetching
  const { data: realNews } = useQuery({
    queryKey: ['news', newsMode, positions.map(p => p.ticker).join(',')],
    queryFn: async () => {
      const url = newsMode === 'holdings' 
        ? `/api/news/holdings?symbols=${positions.map(p => p.ticker).join(',')}`
        : '/api/news/market';
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = (await res.json()) as Array<{
        ticker?: string;
        datetime: number;
        headline: string;
        source: string;
        url: string;
      }>;
      return data.map((item) => ({
        ticker: item.ticker || 'MKT',
        time: new Date(item.datetime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        headline: item.headline,
        source: item.source,
        url: item.url
      }));
    },
    enabled: true,
    refetchInterval: 300000 // 5 mins
  });

  const {
    data: fearGreed,
    isLoading: fearGreedLoading,
    isError: fearGreedError,
  } = useQuery({
    queryKey: ['fear-greed-index'],
    queryFn: () => getFearGreedIndex(),
    refetchInterval: 60 * 60 * 1000,
  });

  const getMockHoldingsNews = () => {
    const heldTickers = positions.map(p => p.ticker);
    if (heldTickers.length === 0) {
      return [
        { ticker: 'PORTFOLIO', time: 'Just now', headline: 'No positions found. Add tickers to your portfolio terminal to stream active company news.', source: 'System', url: '#' }
      ];
    }

    const pool: Record<string, { headline: string; source: string }[]> = {
      NVDA: [
        { headline: 'NVIDIA Blackwell AI chips ramp up; suppliers report yields beat expectations.', source: 'Barron\'s' },
        { headline: 'Analysts reiterate buy ratings citing unprecedented software enterprise pipeline support.', source: 'Reuters' }
      ],
      MSFT: [
        { headline: 'Azure growth tracks strong double digits fueled by massive multi-agent enterprise scale.', source: 'WSJ' },
        { headline: 'Expands custom cobalt CPU silicon instances to improve power margins on big LLMs.', source: 'Bloomberg' }
      ],
      AAPL: [
        { headline: 'iPhone assembly targets boosted in Asia on resilience of consumer hardware demand.', source: 'MarketWatch' },
        { headline: 'Launches localized AI developer models across continental European and Asian corridors.', source: 'CNBC' }
      ],
      META: [
        { headline: 'Meta pivots wearable strategy; custom AR glass prototyping accelerates.', source: 'Bloomberg' },
        { headline: 'AI-driven feed optimization delivers highest ad click-through rate over three quarters.', source: 'CNBC' }
      ],
      ASML: [
        { headline: 'ASML Q3 EUV bookings beat expectations, guiding robust hardware delivery schedules.', source: 'Reuters' }
      ],
      GOOG: [
        { headline: 'Google Cloud secures large strategic compute allocations in new regional hubs.', source: 'CNBC' }
      ],
      TSLA: [
        { headline: 'Tesla FSD beta rolls out to additional selected test groups in Western Europe.', source: 'Bloomberg' }
      ],
      AMD: [
        { headline: 'AMD MI325X accelerator benchmark reveals enhanced multi-tenant scaling efficiencies.', source: 'TechCrunch' }
      ]
    };

    const newsList: { ticker: string; time: string; headline: string; source: string; url: string }[] = [];
    heldTickers.forEach((ticker, i) => {
      const articles = pool[ticker];
      if (articles && articles.length > 0) {
        articles.forEach((art, idx) => {
          newsList.push({
            ticker,
            time: `${10 + i * 8 + idx * 15}m ago`,
            headline: art.headline,
            source: art.source,
            url: `https://finance.yahoo.com/quote/${ticker}`
          });
        });
      } else {
        newsList.push({
          ticker,
          time: `${15 + i * 12}m ago`,
          headline: `Shares of ${ticker} process robust accumulation within key support channels.`,
          source: 'MarketWatch',
          url: `https://finance.yahoo.com/quote/${ticker}`
        });
        newsList.push({
          ticker,
          time: `${2 + i * 2}h ago`,
          headline: `Institutional buyers consolidate positions in ${ticker} ahead of key regional catalyst.`,
          source: 'Reuters',
          url: `https://finance.yahoo.com/quote/${ticker}`
        });
      }
    });

    return newsList.slice(0, 15);
  };

  const getMockMarketNews = () => {
    return [
      { ticker: 'SPY', time: '5m ago', headline: 'S&P 500 futures trade firmly in green as wholesale producer price inflation drops below consensus.', source: 'WSJ', url: 'https://wsj.com' },
      { ticker: 'QQQ', time: '18m ago', headline: 'Nasdaq leads market recovery in pre-market trade; hardware sector sparks massive fresh capital inflows.', source: 'Bloomberg', url: 'https://bloomberg.com' },
      { ticker: 'FOMC', time: '1h ago', headline: 'Fed governors highlight constructive data backdrop, encouraging potential calendar policy shifts.', source: 'CNBC', url: 'https://cnbc.com' },
      { ticker: 'IWM', time: '2h ago', headline: 'Small-cap indices build momentum; credit easing forecast drives rotational demand in domestic shares.', source: 'Reuters', url: 'https://reuters.com' },
      { ticker: 'BTC', time: '3h ago', headline: 'Digital currencies clear key technical consolidations under heavy spot activity.', source: 'Barron\'s', url: 'https://barrons.com' },
      { ticker: 'WTI', time: '4h ago', headline: 'Crude futures contract on projection of global industrial inventories cooling further.', source: 'MarketWatch', url: 'https://marketwatch.com' },
      { ticker: 'GLD', time: '6h ago', headline: 'Gold benchmarks consolidate below records on stable treasury rate levels.', source: 'Bloomberg', url: 'https://bloomberg.com' }
    ];
  };

  const newsToDisplay = realNews && realNews.length > 0
    ? realNews
    : (newsMode === 'holdings' ? getMockHoldingsNews() : getMockMarketNews());
  const [editingStop, setEditingStop] = useState<string | null>(null);
  const [tempStop, setTempStop] = useState("");
  const [editingThesis, setEditingThesis] = useState<string | null>(null);
  const [tempThesis, setTempThesis] = useState("");
  const [watchlistDialogOpen, setWatchlistDialogOpen] = useState(false);
  const [csvImportOpen, setCsvImportOpen] = useState(false);
  const [prefilledTicker, setPrefilledTicker] = useState("");
  const [thesisDrawerOpen, setThesisDrawerOpen] = useState(false);
  const [activePosition, setActivePosition] = useState<Position | null>(null);

  // Prepare data for charts
  const sectorData: { name: string, value: number }[] = Object.entries(
    positions.reduce((acc, p) => {
      const value = p.shares * (p.currentPrice || p.avgCost);
      acc[p.sector] = (acc[p.sector] || 0) + value;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value: value as number }));

  const concentrationData = [...positions]
    .sort((a, b) => (b.shares * (b.currentPrice || b.avgCost)) - (a.shares * (a.currentPrice || a.avgCost)))
    .map(p => ({
      ticker: p.ticker,
      value: p.shares * (p.currentPrice || p.avgCost)
    }));

  const topHoldingsData = concentrationData.slice(0, 7).map((d, i) => ({
    ...d,
    fill: i === 0 ? '#f5c518' : '#475569'
  }));

  const ytdReturnData = [
    { date: 'Jan 1', portfolio: 0.00, spy: 0.00, fullDate: 'Jan 1, 2026' },
    { date: 'Jan 31', portfolio: 3.20, spy: 1.80, fullDate: 'Jan 31, 2026' },
    { date: 'Feb 28', portfolio: 1.10, spy: 0.50, fullDate: 'Feb 28, 2026' },
    { date: 'Mar 31', portfolio: 7.40, spy: 3.50, fullDate: 'Mar 31, 2026' },
    { date: 'Apr 30', portfolio: 12.60, spy: 6.20, fullDate: 'Apr 30, 2026' },
    { date: 'May 20', portfolio: 16.14, spy: 10.25, fullDate: 'May 20, 2026 (YTD)' },
  ];

  const oneYearReturnData = [
    { date: 'Jun 25', portfolio: 0.00, spy: 0.00, fullDate: 'Jun 1, 2025' },
    { date: 'Jul 25', portfolio: 2.10, spy: 3.20, fullDate: 'Jul 1, 2025' },
    { date: 'Aug 25', portfolio: -1.20, spy: 1.50, fullDate: 'Aug 1, 2025' },
    { date: 'Sep 25', portfolio: -4.50, spy: -2.30, fullDate: 'Sep 1, 2025' },
    { date: 'Oct 25', portfolio: -8.10, spy: -5.40, fullDate: 'Oct 1, 2025' },
    { date: 'Nov 25', portfolio: -5.30, spy: -3.10, fullDate: 'Nov 1, 2025' },
    { date: 'Dec 25', portfolio: -2.10, spy: 0.80, fullDate: 'Dec 1, 2025' },
    { date: 'Jan 26', portfolio: 1.50, spy: 2.40, fullDate: 'Jan 1, 2026' },
    { date: 'Feb 26', portfolio: -1.10, spy: 1.25, fullDate: 'Feb 1, 2026' },
    { date: 'Mar 26', portfolio: 1.80, spy: 3.60, fullDate: 'Mar 1, 2026' },
    { date: 'Apr 26', portfolio: -2.40, spy: 2.10, fullDate: 'Apr 1, 2026' },
    { date: 'May 26', portfolio: 0.42, spy: 4.80, fullDate: 'May 20, 2026 (1Y)' },
  ];

  const mtdReturnData = [
    { date: 'May 1', portfolio: 0.00, spy: 0.00, fullDate: 'May 1, 2026' },
    { date: 'May 5', portfolio: 0.45, spy: 0.20, fullDate: 'May 5, 2026' },
    { date: 'May 10', portfolio: 0.85, spy: 0.40, fullDate: 'May 10, 2026' },
    { date: 'May 15', portfolio: 1.20, spy: 0.75, fullDate: 'May 15, 2026' },
    { date: 'May 20', portfolio: 1.69, spy: 1.10, fullDate: 'May 20, 2026 (MTD)' },
  ];

  const cumulativeReturnData = chartTimeframe === 'ytd' 
    ? ytdReturnData 
    : chartTimeframe === '1y' 
      ? oneYearReturnData 
      : mtdReturnData;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(val);

  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { 
            label: 'TOTAL VALUE', 
            value: formatCurrency(metrics.totalValue),
            subline: <span className="text-primary">+$1,243 TODAY / +0.97%</span>
          },
          { 
            label: 'COST BASIS', 
            value: formatCurrency(metrics.totalCostBasis),
            subline: <span className="text-muted-foreground font-bold">{positions.length} POSITIONS</span>
          },
          { 
            label: 'TOTAL P&L', 
            value: formatCurrency(metrics.totalPnL), 
            sub: `${metrics.pnlPercentage.toFixed(2)}%`,
            color: metrics.totalPnL >= 0 ? 'text-positive' : 'text-negative',
            subline: <span className="text-muted-foreground">SINCE JAN 2025</span>
          },
          { 
            label: 'VS SPY', 
            value: '+4.7%', 
            sub: 'RELATIVE ALPHA', 
            color: 'text-positive',
            subline: (
              <div className="flex gap-2">
                <span className="text-muted-foreground">SPY: +12.3%</span>
                <span className="text-primary font-bold">ALPHA: +4.7%</span>
              </div>
            )
          },
          { 
            label: 'CASH', 
            value: isEditingCash ? (
              <Input 
                value={tempCashValue}
                onChange={(e) => setTempCashValue(e.target.value)}
                onBlur={() => {
                  const val = parseFloat(tempCashValue);
                  if (!isNaN(val)) setCash(val);
                  setIsEditingCash(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseFloat(tempCashValue);
                    if (!isNaN(val)) setCash(val);
                    setIsEditingCash(false);
                  }
                }}
                autoFocus
                className="h-7 w-24 text-[14px] bg-background border-primary rounded-none font-mono"
              />
            ) : (
              <span onDoubleClick={() => {
                setIsEditingCash(true);
                setTempCashValue(cash.toString());
              }} className="cursor-pointer">
                {formatCurrency(cash)}
              </span>
            ),
            subline: (() => {
              const cashPerc = (cash / metrics.totalValue) * 100;
              const belowFloor = cashPerc < profile.cashFloor;
              return (
                <div className="flex flex-col gap-1">
                   <span className="text-muted-foreground">{cashPerc.toFixed(1)}% OF PORTFOLIO</span>
                   {belowFloor && <span className="text-negative font-bold flex items-center gap-1.5"><AlertTriangle size={10} /> BELOW FLOOR</span>}
                </div>
              );
            })(),
            highlight: (cash / metrics.totalValue) * 100 < profile.cashFloor
          },
        ].map((kpi, i) => (
          <Card key={i} className={`rounded-none bg-background border-border terminal-border ${kpi.highlight ? 'border-red-500/50 ring-1 ring-red-500/20' : ''}`}>
            <CardContent className="p-4">
              <p className="label-text">{kpi.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className={`data-value ${kpi.color || 'text-foreground'}`}>{kpi.value}</span>
                {kpi.sub && <span className="text-[12px] font-mono text-muted-foreground">{kpi.sub}</span>}
              </div>
              <div className="text-[11px] font-mono mt-2 opacity-80">
                {kpi.subline}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-none bg-[#0d0d14] border-border terminal-border overflow-hidden">
        <div className="p-2 px-4 border-b border-border">
          <h2 className="label-text">Market Sentiment (Fear &amp; Greed)</h2>
        </div>
        <CardContent className="p-4">
          {fearGreedLoading ? (
            <div className="text-sm font-mono text-muted-foreground">Loading Fear &amp; Greed index...</div>
          ) : fearGreedError || !fearGreed ? (
            <div className="text-sm font-mono text-negative">Failed to load Fear &amp; Greed index.</div>
          ) : (
            <div className="max-w-[340px]">
              <FearGreedGauge value={fearGreed.value} classification={fearGreed.classification} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Holdings Table */}
      <Card className="rounded-none bg-[#0d0d14] border-border terminal-border overflow-hidden">
        <div className="p-2 px-4 border-b border-border flex items-center justify-between">
          <h2 className="label-text">Core Holdings</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCsvImportOpen(true)}
              className="rounded-none bg-muted/10 text-muted-foreground hover:text-foreground border-border h-7 text-[11px] font-bold px-3 py-1"
            >
              <Upload size={14} className="mr-1.5" /> IMPORT CSV
            </Button>
            <Button variant="outline" size="sm" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 border-none h-7 text-[11px] font-bold px-3 py-1">
              + ADD POSITION
            </Button>
          </div>
        </div>
        <div className="">
          <Table className="text-[13px]">
            <TableHeader className="bg-[#0d0d14] sticky top-0 z-10">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-[100px] label-text h-8 py-0">Ticker</TableHead>
                <TableHead className="text-right label-text h-8 py-0">Shares</TableHead>
                <TableHead className="text-right label-text h-8 py-0">Avg Cost</TableHead>
                <TableHead className="text-right label-text h-8 py-0">Price</TableHead>
                <TableHead className="text-right label-text h-8 py-0">Value</TableHead>
                <TableHead className="text-right label-text h-8 py-0">P&L</TableHead>
                <TableHead className="text-right label-text h-8 py-0">Weight</TableHead>
                <TableHead className="text-right label-text h-8 py-0">Stop</TableHead>
                <TableHead className="label-text h-8 py-0">Sector</TableHead>
                <TableHead className="label-text h-8 py-0">Thesis</TableHead>
                <TableHead className="w-[100px] h-8 py-0"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-mono">
              {positions.map((pos) => {
                const value = pos.shares * (pos.currentPrice || pos.avgCost);
                const pnl = value - (pos.shares * pos.avgCost);
                const pnlPerc = (pnl / (pos.shares * pos.avgCost)) * 100;
                const weight = metrics.totalValue > 0 ? (value / metrics.totalValue) * 100 : 0;
                
                const suggestedStop = pos.avgCost * (1 - (profile.defaultStopLoss / 100));
                const effectiveStop = pos.manualStop ?? suggestedStop;
                const currentPrice = pos.currentPrice || pos.avgCost;
                const isNearStop = currentPrice > effectiveStop && currentPrice <= effectiveStop * 1.05;
                const isBelowStop = currentPrice <= effectiveStop;

                const handleThesisBlur = () => {
                  if (editingThesis === pos.id) {
                    updatePosition({ ...pos, thesis: tempThesis });
                    setEditingThesis(null);
                  }
                };

                const handleStopBlur = () => {
                  if (editingStop === pos.id) {
                    const price = parseFloat(tempStop);
                    updatePosition({ ...pos, manualStop: isNaN(price) ? undefined : price });
                    setEditingStop(null);
                  }
                };

                return (
                  <TableRow key={pos.id} className="border-border hover:bg-muted/30 group">
                    <TableCell className="py-2 font-bold">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          pos.thesisData?.health === 'GREEN' ? 'bg-green-500' : 
                          pos.thesisData?.health === 'YELLOW' ? 'bg-amber-500' : 
                          pos.thesisData?.health === 'RED' ? 'bg-red-500' : 
                          'bg-[#444]'
                        }`} />
                        {pos.ticker}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 text-right">{pos.shares.toFixed(2)}</TableCell>
                    <TableCell className="py-3 text-right text-muted-foreground">{pos.avgCost.toFixed(2)}</TableCell>
                    <TableCell className="py-2 text-right">{currentPrice.toFixed(2)}</TableCell>
                    <TableCell className="py-2 text-right font-bold text-foreground">{formatCurrency(value)}</TableCell>
                    <TableCell className={`py-2 text-right ${pnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {pnl >= 0 ? '+' : ''}{pnlPerc.toFixed(1)}%
                    </TableCell>
                    <TableCell className="py-2 text-right text-muted-foreground/80">{weight.toFixed(1)}%</TableCell>
                    <TableCell className={`py-2 text-right ${
                      isBelowStop ? 'text-negative bg-negative/20 border-negative/30 border' : 
                      isNearStop ? 'text-primary bg-primary/20 border-primary/30 border' : 
                      'border-transparent'
                    }`}>
                      <div className="flex items-center justify-end gap-1">
                        {isBelowStop && <AlertTriangle className="w-3 h-3 text-red-500" />}
                        {editingStop === pos.id ? (
                          <Input 
                            value={tempStop}
                            onChange={(e) => setTempStop(e.target.value)}
                            onBlur={handleStopBlur}
                            onKeyDown={(e) => e.key === 'Enter' && handleStopBlur()}
                            autoFocus
                            className="h-5 w-16 text-[11px] rounded-none border-primary bg-background p-1 font-mono text-right"
                          />
                        ) : (
                          <span 
                            onClick={() => {
                              setEditingStop(pos.id);
                              setTempStop(pos.manualStop?.toString() || "");
                            }}
                            className={`cursor-pointer font-bold transition-all hover:scale-105 ${pos.manualStop ? 'text-red-500 underline decoration-dotted' : 'text-muted-foreground/50'}`}
                            title={pos.manualStop ? "Manual Stop (Order Set)" : "Suggested Stop (Auto)"}
                          >
                            {effectiveStop.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 uppercase text-[10px] opacity-60">{pos.sector}</TableCell>
                    <TableCell className="py-2">
                      {editingThesis === pos.id ? (
                        <Input 
                          value={tempThesis}
                          onChange={(e) => setTempThesis(e.target.value)}
                          onBlur={handleThesisBlur}
                          onKeyDown={(e) => e.key === 'Enter' && handleThesisBlur()}
                          autoFocus
                          className="h-6 text-[11px] rounded-none border-primary bg-background p-1 font-mono"
                        />
                      ) : (
                        <div 
                          onClick={() => {
                            setEditingThesis(pos.id);
                            setTempThesis(pos.thesis || "");
                          }}
                          className={`cursor-pointer truncate max-w-[200px] ${!pos.thesis ? 'text-muted-foreground italic text-[11px]' : ''}`}
                        >
                          {pos.thesis || "Add thesis..."}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-2 text-right pr-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="text-muted-foreground hover:text-primary"
                          title="View Thesis"
                          onClick={() => {
                            setActivePosition(pos);
                            setThesisDrawerOpen(true);
                          }}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          className="text-muted-foreground hover:text-primary"
                          title="Add to Watchlist"
                          onClick={() => {
                            setPrefilledTicker(pos.ticker);
                            setWatchlistDialogOpen(true);
                          }}
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          className="text-muted-foreground hover:text-negative"
                          onClick={() => deletePosition(pos.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sector Distribution */}
        <Card className="rounded-none bg-background border-border terminal-border flex flex-col min-h-[220px]">
          <div className="p-2 px-3 border-b border-border bg-muted/10">
            <h3 className="label-text">Sector Distribution</h3>
          </div>
          <div className="flex-1 flex items-center p-3">
              <div className="w-[140px] h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                       data={sectorData}
                       cx="50%"
                       cy="50%"
                       innerRadius={35}
                       outerRadius={55}
                       paddingAngle={2}
                       dataKey="value"
                       label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                       labelLine={false}
                    >
                      {sectorData.map((_, index) => (
                         <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} stroke="none" />
                       ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0d0d14', border: '1px solid #222', borderRadius: 0 }}
                      itemStyle={{ color: '#fff', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col gap-3 ml-6">
                 {sectorData.map((d, i) => (
                   <div key={i} className="flex flex-col gap-1">
                     <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5" style={{ backgroundColor: SECTOR_COLORS[i % SECTOR_COLORS.length] }} />
                       <span className="text-[11px] font-mono text-foreground font-bold uppercase truncate">{d.name}</span>
                     </div>
                     <span className="text-[10px] font-mono text-muted-foreground ml-4">
                       {formatCurrency(d.value)} ({metrics.totalValue > 0 ? ((d.value/metrics.totalValue)*100).toFixed(1) : 0}%)
                     </span>
                   </div>
                 ))}
              </div>
          </div>
        </Card>

        {/* Concentration by Stock */}
        <Card className="rounded-none bg-background border-border terminal-border flex flex-col">
          <div className="p-2 px-3 border-b border-border bg-muted/10">
            <h3 className="label-text">Concentration by Stock</h3>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center gap-6">
             {concentrationData.slice(0, 5).map((d, i) => {
               const max = concentrationData[0].value;
               const width = (d.value / max) * 100;
               return (
                  <div key={d.ticker} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <div className="text-[11px] font-mono font-bold text-foreground">{d.ticker}</div>
                      <div className="text-[10px] font-mono text-primary font-bold">
                        {formatCurrency(d.value)} <span className="text-muted-foreground font-normal">({metrics.totalValue > 0 ? ((d.value / metrics.totalValue) * 100).toFixed(1) : 0}%)</span>
                      </div>
                    </div>
                    <div className="flex-1 h-2.5 bg-muted/20 relative overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${i === 0 ? 'bg-primary' : 'bg-slate-600/60'}`} 
                        style={{ width: `${width}%` }} 
                      />
                    </div>
                  </div>
               );
             })}
          </div>
        </Card>

        {/* Top Holdings Weight */}
        <Card className="rounded-none bg-background border-border terminal-border flex flex-col">
          <div className="p-2 px-3 border-b border-border bg-muted/10">
            <h3 className="label-text">Top Holdings</h3>
          </div>
          <div className="flex-1 p-4 px-6 flex items-end">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={topHoldingsData} margin={{ top: 25, bottom: 20 }}>
                <Bar 
                  dataKey="value" 
                  radius={[2, 2, 0, 0]}
                  barSize={32}
                >
                  <LabelList 
                    dataKey="value" 
                    position="top" 
                    formatter={(val: number) => {
                      const weight = metrics.totalValue > 0 ? ((val / metrics.totalValue) * 100).toFixed(1) : 0;
                      return `${weight}%`;
                    }}
                    style={{ fontSize: 11, fill: '#f5c518', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}
                  />
                  {topHoldingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
                <XAxis 
                  dataKey="ticker" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#cbd5e1', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }}
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0d0d14', border: '1px solid #222', borderRadius: 0 }}
                  itemStyle={{ color: '#fff', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Cumulative Performance */}
      <Card className="rounded-none bg-background border-border terminal-border">
        <div className="p-2 px-4 border-b border-border bg-muted/10 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-6">
            <h3 className="label-text uppercase font-bold tracking-widest text-[11px] text-primary">Cumulative Return</h3>
            <div className="flex items-center gap-4 border-l border-border/80 pl-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Portfolio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#64748b] border-t border-dashed" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase">SPY 500</span>
              </div>
            </div>
          </div>

          <div className="flex bg-muted/20 border border-border">
            <button
              onClick={() => setChartTimeframe('ytd')}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase transition-colors border-r border-border ${chartTimeframe === 'ytd' ? 'bg-[#14141d] text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              YTD (+16.14%)
            </button>
            <button
              onClick={() => setChartTimeframe('1y')}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase transition-colors border-r border-border ${chartTimeframe === '1y' ? 'bg-[#14141d] text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              1Y (+0.42%)
            </button>
            <button
              onClick={() => setChartTimeframe('mtd')}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase transition-colors ${chartTimeframe === 'mtd' ? 'bg-[#14141d] text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              MTD (+1.69%)
            </button>
          </div>
        </div>
        <div className="h-[340px] p-0 px-4 pt-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cumulativeReturnData} margin={{ left: -10, right: 20, top: 10, bottom: 20 }}>
              <CartesianGrid vertical={false} stroke="#2a2a3a" strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#cbd5e1', fontFamily: 'JetBrains Mono' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#cbd5e1', fontFamily: 'JetBrains Mono' }}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d0d14', border: '1px solid #222', borderRadius: 0, padding: '10px' }}
                itemStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                labelStyle={{ fontSize: 11, color: '#f5c518', marginBottom: '6px', borderBottom: '1px solid #222', paddingBottom: '6px' }}
                labelFormatter={(label, payload) => payload[0]?.payload.fullDate || label}
                formatter={(val: number) => [`${val.toFixed(1)}%`]}
              />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="#f5c518" 
                strokeWidth={2.5} 
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#f5c518' }}
              />
              <Line 
                type="monotone" 
                dataKey="spy" 
                stroke="#475569" 
                strokeDasharray="4 4" 
                strokeWidth={1.5} 
                dot={false} 
                activeDot={{ r: 3, strokeWidth: 0, fill: '#475569' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 items-start">
      {/* News Section - IBKR Style Redesign */}
      <Card className="lg:col-span-6 rounded-none bg-background border-border terminal-border flex flex-col overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] min-h-[460px]">
          {/* Left Column - Market Brief */}
          <div className="border-r border-border flex flex-col min-w-0">
            <div className="flex p-3 border-b border-border bg-muted/10 justify-between items-center">
              <h3 className="text-[12px] font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" /> Market Brief
              </h3>
              <span className="text-[11px] font-mono text-muted-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Summary Text Block */}
              <div className="space-y-4">
                 <p className="text-[15px] leading-relaxed text-foreground/90 font-medium">
                   U.S. stock futures rose early Tuesday as investors prepared for a heavy lineup of retail earnings and housing data. 
                   Target (TGT) and TJX Companies (TJX) are both expected to report results before the opening bell, while Home Depot (HD) 
                   continues to trade near record highs following last week's upbeat guidance.
                 </p>
                 <p className="text-[14px] leading-relaxed text-muted-foreground italic">
                   The broader tech sector remains in focus as AI demand signals from key semiconductor players suggest a sustained 
                   deployment phase. Treasury yields eased slightly after yesterday's flat session, providing a constructive backdrop for growth-oriented strategies.
                 </p>
              </div>

              {/* Numbered Headlines */}
              <div className="space-y-4 pt-2">
                 <h4 className="text-[12px] font-bold uppercase tracking-tight text-primary border-b border-primary/20 pb-1 w-fit">Top Headlines</h4>
                 <div className="space-y-3">
                    {newsToDisplay.slice(0, 6).map((news, i) => (
                      <a 
                        key={i} 
                        href={news.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex gap-4 group cursor-pointer"
                      >
                        <span className="text-[13px] font-mono text-primary font-bold opacity-40 group-hover:opacity-100 transition-opacity">{i + 1}.</span>
                        <div className="flex-1 space-y-1">
                           <span className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors leading-snug block">
                             {news.headline}
                           </span>
                           <div className="flex items-center gap-2 opacity-50">
                             <span className="text-[10px] font-mono uppercase bg-muted px-1.5">{news.ticker}</span>
                             <span className="text-[11px] font-mono italic">{news.source} · {news.time}</span>
                           </div>
                        </div>
                      </a>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column - Analyst & Hot News */}
          <div className="flex flex-col min-w-0">
            {/* Top: Analyst Activity */}
            <div className="border-b border-border flex-1">
               <div className="p-3 border-b border-border bg-muted/5 flex justify-between items-center">
                  <h4 className="text-[12px] font-bold uppercase text-primary tracking-widest">Analyst Activity</h4>
                  <span className="text-[10px] text-muted-foreground uppercase opacity-50">Last Update: 2m ago</span>
               </div>
               <div className="p-4 grid grid-cols-2 gap-6 h-full">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-positive" />
                        <span className="text-[11px] font-bold text-positive uppercase">Upgrades</span>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {['MSFT', 'META', 'NVDA', 'AMD', 'ASML'].map(t => (
                          <Badge key={t} variant="outline" className="rounded-none border-positive/30 bg-positive/5 text-positive text-[11px] font-bold py-1 px-3">
                            {t}
                          </Badge>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-4 border-l border-border/40 pl-6">
                     <div className="flex items-center gap-2 mb-2">
                        <TrendingDown size={14} className="text-negative" />
                        <span className="text-[11px] font-bold text-negative uppercase">Downgrades</span>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {['AAPL', 'INTC', 'TSLA', 'BABA'].map(t => (
                          <Badge key={t} variant="outline" className="rounded-none border-negative/30 bg-negative/5 text-negative text-[11px] font-bold py-1 px-3">
                            {t}
                          </Badge>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom: Hot News with Toggle */}
            <div className="flex-1 flex flex-col">
               <div className="flex border-b border-border bg-muted/5 items-center">
                  <button 
                    onClick={() => setNewsMode('holdings')}
                    className={`px-5 py-2.5 text-[11px] font-bold uppercase transition-colors border-r border-border ${newsMode === 'holdings' ? 'bg-[#14141d] text-primary' : 'text-muted-foreground'}`}
                  >
                    My Holdings
                  </button>
                  <button 
                    onClick={() => setNewsMode('market')}
                    className={`px-5 py-2.5 text-[11px] font-bold uppercase transition-colors border-r border-border ${newsMode === 'market' ? 'bg-[#14141d] text-primary' : 'text-muted-foreground'}`}
                  >
                    Market-Wide
                  </button>
                  <div className="flex-1" />
                  <div className="px-4 text-[10px] font-mono text-primary flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                     <span>HOT NEWS</span>
                  </div>
               </div>
               
               <div className="p-4 space-y-4 overflow-y-auto flex-1 min-h-0">
                  {newsToDisplay.slice(0, 8).map((news, i) => (
                    <a 
                      key={i} 
                      href={news.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-4 border border-border/30 bg-muted/5 hover:border-primary/30 transition-all group"
                    >
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-mono font-bold text-primary px-1.5 bg-primary/10">{news.ticker}</span>
                          <span className="text-[10px] font-mono text-muted-foreground opacity-60 uppercase">{news.time}</span>
                       </div>
                       <h5 className="text-[13px] font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                         {news.headline}
                       </h5>
                       <div className="mt-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest italic">
                         Source: {news.source}
                       </div>
                    </a>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </Card>

        {/* Weekly Calendar */}
        <Card className="lg:col-span-4 rounded-none bg-background border-border terminal-border flex flex-col h-auto">
          <div className="p-2 px-3 border-b border-border bg-muted/10">
            <h3 className="label-text">Weekly Calendar</h3>
          </div>
          <div className="grid grid-cols-5 flex-1">
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, i) => (
              <div key={day} className="flex flex-col p-3 border-r last:border-r-0 border-border min-h-[200px]">
                <span className="text-[11px] font-mono font-bold text-muted-foreground mb-3 border-b border-border pb-1">{day}</span>
                <div className="flex flex-col gap-2.5">
                  {i === 0 && (
                    <a 
                      href="https://tradingeconomics.com/calendar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] p-2 bg-[#475569]/20 text-slate-300 border border-slate-500/30 rounded-none leading-tight font-bold uppercase text-center flex flex-col gap-1 transition-all hover:brightness-125 cursor-pointer"
                    >
                      <span>Macro</span>
                      <span className="opacity-60 text-[9px] font-normal">NY Fed Mfg</span>
                    </a>
                  )}
                  {i === 1 && (
                    <>
                      <a 
                        href="https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] p-2 bg-[#ff4757]/20 text-negative border border-negative/30 rounded-none leading-tight font-bold uppercase text-center flex flex-col gap-1 transition-all hover:brightness-125 cursor-pointer"
                      >
                        <span>FOMC</span>
                        <span className="opacity-60 text-[9px] font-normal">Interest Rate</span>
                      </a>
                      <a 
                        href="https://tradingeconomics.com/calendar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] p-2 bg-[#f5c518]/20 text-primary border border-primary/30 rounded-none leading-tight font-bold uppercase text-center flex flex-col gap-1 transition-all hover:brightness-125 cursor-pointer"
                      >
                        <span>Retail</span>
                        <span className="opacity-60 text-[9px] font-normal">MoM Data</span>
                      </a>
                    </>
                  )}
                  {i === 2 && (
                    <a 
                      href="https://finance.yahoo.com/calendar/earnings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] p-2 bg-[#f5c518]/20 text-primary border border-primary/30 rounded-none leading-tight font-bold uppercase text-center flex flex-col gap-1 transition-all hover:brightness-125 cursor-pointer"
                    >
                      <span>Earnings</span>
                      <span className="opacity-60 text-[9px] font-normal">TSLA / IBM</span>
                    </a>
                  )}
                  {i === 3 && (
                    <a 
                      href="https://www.bls.gov/cpi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] p-2 bg-[#3b82f6]/20 text-blue-400 border border-blue-500/30 rounded-none leading-tight font-bold uppercase text-center flex flex-col gap-1 transition-all hover:brightness-125 cursor-pointer"
                    >
                      <span>CPI</span>
                      <span className="opacity-60 text-[9px] font-normal">Jobless Claims</span>
                    </a>
                  )}
                  {i === 4 && (
                    <a 
                      href="https://www.bls.gov/news.release/empsit.toc.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] p-2 bg-[#00c896]/20 text-positive border border-positive/30 rounded-none leading-tight font-bold uppercase text-center flex flex-col gap-1 transition-all hover:brightness-125 cursor-pointer"
                    >
                      <span>Jobs</span>
                      <span className="opacity-60 text-[9px] font-normal">NFP Report</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <WatchlistDialog 
        open={watchlistDialogOpen} 
        onOpenChange={setWatchlistDialogOpen}
        initialTicker={prefilledTicker}
      />
      <ThesisDrawer 
        open={thesisDrawerOpen}
        onOpenChange={setThesisDrawerOpen}
        position={activePosition}
        onUpdate={updatePosition}
      />
      <CsvImportDialog 
        open={csvImportOpen}
        onOpenChange={setCsvImportOpen}
        onImport={setPositions}
      />
    </div>
  );
}
