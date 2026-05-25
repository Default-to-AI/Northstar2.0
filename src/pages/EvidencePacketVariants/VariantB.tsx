import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartModal from "../../components/prototype/ChartModal";
import { FinancialMetric } from "../../types/mockData";
import { type EvidencePacket, mapLiveToBuilderData } from "../../lib/evidenceAdapter";
import { ChevronDown, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function VariantB({ data }: { data: EvidencePacket | null }) {
  const [selectedMetric, setSelectedMetric] = useState<FinancialMetric | null>(null);
  const [expandedStats, setExpandedStats] = useState<{ [key: number]: boolean }>({});

  const { appleStockData, quickStats, financialMetrics } = mapLiveToBuilderData(data);

  // Use terminal colors instead of chart-* colors
  const colorMap: { [key: string]: string } = {
    "chart-green": "#f5c518", // terminal gold
    "chart-orange": "#f5c518",
    "chart-blue": "#f5c518",
    "chart-cyan": "#f5c518",
    "chart-purple": "#f5c518",
    "chart-pink": "#f5c518",
  };

  const toggleStatExpand = (idx: number) => {
    setExpandedStats((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const renderSmallChart = (metric: FinancialMetric) => {
    const chartColor = colorMap[metric.color] || "#f5c518";
    const metricData = metric.data.slice(-8);

    const commonProps = {
      data: metricData,
      margin: { top: 5, right: 10, left: 0, bottom: 5 },
    };

    switch (metric.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={140}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d0d14",
                  border: "1px solid #2a2a35",
                  color: "#f5c518",
                  borderRadius: "0px",
                  fontSize: "12px",
                  fontFamily: "monospace"
                }}
                cursor={false}
              />
              <Bar dataKey="value" fill={chartColor} radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d0d14",
                  border: "1px solid #2a2a35",
                  color: "#f5c518",
                  borderRadius: "0px",
                  fontSize: "12px",
                  fontFamily: "monospace"
                }}
                cursor={false}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                fill={chartColor}
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={140}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d0d14",
                  border: "1px solid #2a2a35",
                  color: "#f5c518",
                  borderRadius: "0px",
                  fontSize: "12px",
                  fontFamily: "monospace"
                }}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-foreground p-6 overflow-y-auto pb-24">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header - Institutional Style */}
        <div className="border-b border-border pb-6 pt-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-mono font-bold text-primary tracking-tight uppercase">
                {appleStockData?.name || 'Unknown'}
              </h1>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
                {appleStockData?.symbol} | Institutional Evidence Packet
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-4xl font-bold text-primary">${appleStockData?.currentPrice.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Latest Close</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStats.map((stat, idx) => (
            <Card key={idx} className="bg-[#0d0d14] border-border rounded-none overflow-hidden">
              <button
                onClick={() => toggleStatExpand(idx)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="text-left font-mono">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-primary">{stat.value}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedStats[idx] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedStats[idx] && stat.details && (
                <div className="border-t border-border bg-[#0a0a0f] p-4 space-y-3 font-mono text-xs">
                  {stat.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex justify-between border-b border-white/5 pb-1 last:border-0 last:pb-0">
                      <span className="text-muted-foreground uppercase">{detail.label}</span>
                      <span className="text-foreground">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4 border-b border-border pb-2 flex items-center gap-2">
            <BarChart2 size={16} className="text-primary" /> Visual Evidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {financialMetrics.map((metric, idx) => (
              <Card
                key={idx}
                onClick={() => setSelectedMetric(metric)}
                className="bg-[#0d0d14] rounded-none p-4 border-border hover:border-primary cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wide">{metric.name}</h3>
                  <span className="text-[9px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 uppercase border border-primary/20">
                    {metric.type}
                  </span>
                </div>
                <div className="h-[140px]">{renderSmallChart(metric)}</div>
                <div className="mt-4 pt-3 border-t border-border font-mono">
                  <span className="text-[10px] text-muted-foreground uppercase">
                    Latest: <span className="text-foreground">{metric.data[metric.data.length - 1]?.value.toFixed(1) || 0}{metric.unit}</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      {/* Re-use Builder.io modal but we will eventually theme it if necessary - for now we just use it */}
      <ChartModal
        metric={selectedMetric || (financialMetrics[0] ?? null)}
        isOpen={selectedMetric !== null}
        onClose={() => setSelectedMetric(null)}
      />
    </div>
  );
}
