# Tasks: Research & Evidence Pipeline

**Input**: `specs/001-research-evidence-pipeline/spec.md`, `specs/001-research-evidence-pipeline/plan.md`

---

## Phase 1: Foundation (Shared Infrastructure)

**Purpose**: Project initialization and shared infrastructure

- [ ] T001 Initialize Python project with `uv` and `pyproject.toml` — dependencies: pandas, numpy, yfinance, finnhub-python, streamlit, ta-lib, pytest
- [ ] T002 Create SQLite schema in `northstar/db/schema.py` — tables: stocks, prices, fundamentals, news_sentiment, signals, recommendations
- [ ] T003 Create base collector interface in `northstar/collectors/__init__.py` — abstract class with `collect()` and `validate()` methods
- [ ] T004 Create config module in `northstar/config.py` — API keys from env vars, database path, default settings
- [ ] T005 Create `data/raw/`, `data/processed/` directories with `.gitkeep`
- [ ] T006 Create `.gitignore` — ignore: `data/raw/*.db`, `.env`, `__pycache__/`

---

## Phase 2: Collectors

**Purpose**: Modular data collectors for each source

### Price Collector
- [ ] T007 Create `northstar/collectors/prices.py` — yfinance daily OHLCV fetcher for a list of tickers
- [ ] T008 Implement data validation: check for missing days, outlier prices, split adjustments
- [ ] T009 Store raw prices in `data/raw/prices/` as Parquet files (immutable)

### Fundamentals Collector
- [ ] T010 Create `northstar/collectors/fundamentals.py` — yfinance financials fetcher (income statement, balance sheet, cash flow)
- [ ] T011 Extract key ratios: P/E, EPS, revenue growth, debt-to-equity, profit margin
- [ ] T012 Store fundamentals in SQLite `fundamentals` table

### News Collector
- [ ] T013 Create `northstar/collectors/news.py` — finnhub news fetcher with company news + sentiment
- [ ] T014 Implement sentiment scoring: finnhub's built-in sentiment + optional fallback
- [ ] T015 Store news + sentiment in SQLite `news_sentiment` table

**Checkpoint**: Collectors can fetch data for 10 tickers and populate the database.

---

## Phase 3: Analyzers

**Purpose**: Transform raw data into trading signals

### Technical Analyzer
- [ ] T016 Create `northstar/analyzers/technical.py` — compute RSI (14-day) from price data
- [ ] T017 Implement MACD calculation (12, 26, 9)
- [ ] T018 Implement SMA crossover detection (50-day vs 200-day)
- [ ] T019 Store computed signals in SQLite `signals` table

### Fundamentals Analyzer
- [ ] T020 Create `northstar/analyzers/fundamentals.py` — compute derived ratios (PEG, ROE, current ratio)
- [ ] T021 Implement sector-relative scoring (how does P/E compare to sector median)
- [ ] T022 Store analysis in `signals` table with source metadata

**Checkpoint**: For a given ticker, the system can show RSI, MACD status, SMA status, and key ratios.

---

## Phase 4: Dashboard — Screener (US1)

- [ ] T023 Create `dashboard/app.py` — Streamlit entry point with sidebar navigation
- [ ] T024 Create `dashboard/pages/screener.py` — default stock screener view with ticker table
- [ ] T025 Add filter UI: sector dropdown, P/E range, volume min, price range, signal filter
- [ ] T026 Implement data loading from SQLite → pandas DataFrame → Streamlit table
- [ ] T027 Add ticker click → navigate to stock detail page

---

## Phase 5: Dashboard — Research View (US2)

- [ ] T028 Create `dashboard/pages/research.py` — stock detail page layout
- [ ] T029 Add price chart panel with SMA overlays (using Streamlit line_chart or plotly)
- [ ] T030 [P] Add fundamental ratios panel (P/E, EPS, revenue growth, debt/equity)
- [ ] T031 [P] Add news sentiment panel (headlines + sentiment badges)
- [ ] T032 [P] Add technical indicators panel (RSI gauge, MACD status, SMA crossover status)

---

## Phase 6: Recommendations (P2 — US3)

- [ ] T033 Create `northstar/engine/recommender.py` — signal aggregation → recommendation
- [ ] T034 Implement scoring: weight technicals (40%), fundamentals (40%), sentiment (20%)
- [ ] T035 Generate recommendation: Strong Buy (80+), Buy (60-79), Hold (40-59), Sell (20-39), Strong Sell (0-19)
- [ ] T036 Create evidence summary format: for each signal point → source + timestamp + value
- [ ] T037 Create `dashboard/pages/recommendations.py` — recommendation list with expandable evidence

---

## Phase 7: Polish & Testing

- [ ] T038 Write integration test: full pipeline (collect → analyze → recommend → display)
- [ ] T039 Add error handling: API timeout, missing data, rate limit recovery
- [ ] T040 Create `scripts/collect-all.sh` — run all collectors sequentially
- [ ] T041 Write README.md — setup, usage, adding new collectors
- [ ] T042 Add unit tests for analyzers (pytest with known data)

---

## Execution Order

```
Phase 1 (Foundation)     → no deps, start here
    ↓
Phase 2 (Collectors)     → depends on Phase 1
    ↓
Phase 3 (Analyzers)      → depends on Phase 2
    ↓
Phase 4 (Screener US1)   → depends on Phase 3
    ↓
Phase 5 (Research US2)   → depends on Phase 3 (parallel with Phase 4)
    ↓
Phase 6 (Recs US3)       → depends on Phase 5
    ↓
Phase 7 (Polish)         → depends on all above
```

Tasks marked [P] within a phase can run in parallel in separate `delegate_task` calls.