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
import type { FinancialMetric } from "../../types/mockData";
import { type EvidencePacket, mapLiveToBuilderData } from "../../lib/evidenceAdapter";
import { ChevronDown } from "lucide-react";

export default function VariantA({ data }: { data: EvidencePacket | null }) {
  const [selectedMetric, setSelectedMetric] = useState<FinancialMetric | null>(null);
  const [expandedStats, setExpandedStats] = useState<{ [key: number]: boolean }>({});

  const { appleStockData, quickStats, financialMetrics } = mapLiveToBuilderData(data);

  const colorMap: { [key: string]: string } = {
    "chart-green": "#00d084",
    "chart-orange": "#ff9500",
    "chart-blue": "#3b82f6",
    "chart-cyan": "#06b6d4",
    "chart-purple": "#a855f7",
    "chart-pink": "#ec4899",
  };

  const toggleStatExpand = (idx: number) => {
    setExpandedStats((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const renderSmallChart = (metric: FinancialMetric) => {
    const chartColor = colorMap[metric.color] || "#3b82f6";
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
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  color: "#ffffff",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                cursor={false}
              />
              <Bar dataKey="value" fill={chartColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  color: "#ffffff",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                cursor={false}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                fill={chartColor}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={140}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  color: "#ffffff",
                  borderRadius: "4px",
                  fontSize: "12px",
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
    <div className="min-h-screen bg-background dark p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Centered Header Section */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{appleStockData?.name || 'Unknown'}</h1>
              <p className="text-sm text-muted-foreground">{appleStockData?.symbol} | NASDAQ</p>
            </div>
          </div>

          {/* Stock Price */}
          <div className="mb-3">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-5xl font-bold text-foreground">
                ${appleStockData?.currentPrice.toFixed(2)}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-lg font-semibold text-chart-green">
                  +${appleStockData?.priceChange.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-chart-green/20 text-chart-green rounded text-xs font-semibold">
                  +{appleStockData?.percentChange.toFixed(2)}%
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleStatExpand(idx)}
                className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedStats[idx] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedStats[idx] && stat.details && (
                <div className="border-t border-border bg-secondary/30 p-4 space-y-2">
                  {stat.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{detail.label}</span>
                      <span className="text-foreground font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <h2 className="text-2xl font-semibold text-foreground mb-6">Financial Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financialMetrics.map((metric, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMetric(metric)}
              className="bg-card rounded-lg p-6 border border-border hover:border-foreground/50 cursor-pointer transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">{metric.name}</h3>
              <div className="h-[140px]">{renderSmallChart(metric)}</div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Latest: {metric.data[metric.data.length - 1]?.value.toFixed(1) || 0}{metric.unit}
                </span>
                <span className="text-xs bg-foreground/10 text-foreground px-2 py-1 rounded">
                  {metric.type === "bar" ? "Bar" : metric.type === "area" ? "Area" : "Line"}
                </span>
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
