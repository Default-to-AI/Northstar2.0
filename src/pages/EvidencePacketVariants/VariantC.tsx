import { useState, useMemo } from "react";
import {
  ComposedChart,
  LineChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Activity, DollarSign, TrendingUp, TrendingDown, Maximize2 } from "lucide-react";
import ChartModal from "../../components/prototype/ChartModal";
import { type EvidencePacket, mapLiveToBuilderData } from "../../lib/evidenceAdapter";
import type { FinancialMetric } from "../../types/mockData";

export default function VariantC({ data }: { data: EvidencePacket | null }) {
  const { appleStockData, quickStats, financialMetrics } = mapLiveToBuilderData(data);
  const [selectedMetric, setSelectedMetric] = useState<FinancialMetric | null>(null);

  // Group metrics into one big chart for "Dashboard" view
  const combinedData = useMemo(() => {
    if (financialMetrics.length === 0) return [];
    
    // Simplistic combine by using the first metric's dates
    return financialMetrics[0].data.map((d, i) => {
      const obj: Record<string, string | number> = { date: d.date };
      financialMetrics.forEach(m => {
        obj[m.name] = m.data[i]?.value || 0;
      });
      return obj;
    });
  }, [financialMetrics]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] text-slate-900 dark:text-slate-50 p-4 md:p-8 overflow-y-auto pb-24 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header - Modern Dashboard Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-inner">
              {appleStockData?.symbol?.[0] || '?'}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {appleStockData?.name || 'Unknown Security'}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-1">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300">
                  {appleStockData?.symbol}
                </span>
                <span>•</span>
                <span>Evidence Packet Analysis</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end bg-slate-50 dark:bg-slate-950 px-6 py-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Current Price</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              ${appleStockData?.currentPrice.toFixed(2)}
              <span className="text-sm font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp size={14} /> LIVE
              </span>
            </div>
          </div>
        </div>

        {/* Dense KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.slice(0, 4).map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-transform hover:scale-[1.02] duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                  {idx === 0 ? <DollarSign size={16} /> : <Activity size={16} />}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
              {stat.details && stat.details[0] && (
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="text-emerald-500">↗ {stat.details[0].value}</span> {stat.details[0].label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Master Chart Area */}
        {financialMetrics.length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Comparative Trends</h2>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={combinedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                    itemStyle={{ fontSize: '14px', fontWeight: '500' }}
                  />
                  {financialMetrics.map((m, i) => (
                    m.type === 'line' ? (
                      <Line key={m.name} type="monotone" dataKey={m.name} stroke={i===0?"#3b82f6":"#8b5cf6"} strokeWidth={3} dot={false} />
                    ) : m.type === 'area' ? (
                      <Area key={m.name} type="monotone" dataKey={m.name} fill="#10b981" stroke="#059669" opacity={0.1} />
                    ) : (
                      <Bar key={m.name} dataKey={m.name} fill="#6366f1" radius={[4,4,0,0]} barSize={20} />
                    )
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detailed Metrics List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {financialMetrics.map((metric, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 group">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-slate-700 dark:text-slate-300">{metric.name}</h3>
                <button 
                  onClick={() => setSelectedMetric(metric)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metric.data[metric.data.length - 1]?.value.toFixed(2) || 0}
                </span>
                <span className="text-sm text-slate-500 mb-1">{metric.unit}</span>
              </div>
              {/* Mini sparkline */}
              <div className="mt-4 h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.data}>
                    <Line type="monotone" dataKey="value" stroke={metric.type==='area'?"#10b981":"#3b82f6"} strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ChartModal
        metric={selectedMetric || (financialMetrics[0] ?? null)}
        isOpen={selectedMetric !== null}
        onClose={() => setSelectedMetric(null)}
      />
    </div>
  );
}
