export type InsightTabId =
  | 'sp500'
  | 'trending'
  | 'growth'
  | 'ai'
  | 'cloud'
  | 'ev'
  | 'leisure'
  | 'dividend'
  | 'buyback';

export type InsightTab = {
  id: InsightTabId;
  label: string;
};

export type InsightItem = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
  price: number | null;
  marketCap: number | null;
};

export type InsightsResponse = {
  tab: string;
  generatedAt: string;
  items: InsightItem[];
  meta?: {
    status: string;
    message: string;
  };
  error?: string;
};

export type SecuritySearchResult = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
};

export type SecuritiesSearchResponse = {
  query: string;
  results: SecuritySearchResult[];
  error?: string;
};

export type InsightModuleKind = 'kpi' | 'narrative' | 'table' | 'chart' | 'list' | 'disclosure';

export type InsightModuleBase = {
  kind: InsightModuleKind;
  title: string;
  description?: string;
};

export type InsightKpi = {
  label: string;
  value: string;
  delta?: string;
  tone?: 'positive' | 'negative' | 'neutral';
};

export type InsightKpiModule = InsightModuleBase & {
  kind: 'kpi';
  items: InsightKpi[];
};

export type InsightNarrativeModule = InsightModuleBase & {
  kind: 'narrative';
  markdown: string;
};

export type InsightListModule = InsightModuleBase & {
  kind: 'list';
  items: string[];
};

export type InsightTableColumn = {
  key: string;
  label: string;
};

export type InsightTableRow = {
  key: string;
  values: Record<string, string | number | null>;
};

export type InsightTableModule = InsightModuleBase & {
  kind: 'table';
  columns: InsightTableColumn[];
  rows: InsightTableRow[];
};

export type InsightChartPoint = {
  x: string;
  y: number | null;
};

export type InsightChartSeries = {
  key: string;
  label: string;
  points: InsightChartPoint[];
};

export type InsightChartModule = InsightModuleBase & {
  kind: 'chart';
  series: InsightChartSeries[];
};

export type InsightDisclosureModule = InsightModuleBase & {
  kind: 'disclosure';
  markdown: string;
};

export type InsightModule =
  | InsightKpiModule
  | InsightNarrativeModule
  | InsightListModule
  | InsightTableModule
  | InsightChartModule
  | InsightDisclosureModule;

export type InsightsTickerResponse = {
  ticker: string;
  name: string | null;
  exchange: string | null;
  sector: string | null;
  generatedAt: string;
  modules: InsightModule[];
  aggregatedData?: any;
  error?: string;
};
