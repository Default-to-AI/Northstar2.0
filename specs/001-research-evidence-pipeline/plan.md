# Implementation Plan: Research & Evidence Pipeline

**Branch**: `001-research-evidence-pipeline` | **Date**: 26-05-2026 | **Spec**: `specs/001-research-evidence-pipeline/spec.md`

## Summary

Build the core data pipeline for Northstar 2.0: modular collectors that fetch stock data from multiple sources, an analysis layer that computes signals, and a Streamlit dashboard that surfaces the results as an evidence-backed stock screener and research view.

## Tech Stack

| Aspect | Choice | Rationale |
|--------|--------|-----------|
| Language | Python 3.11+ | Standard for data analysis; pandas/numpy ecosystem |
| Market Data | yfinance + finnhub | Free tier sufficient for v1; yfinance for prices/fundamentals, finnhub for news/sentiment |
| Storage | SQLite | No server needed; single file; SQL for queries |
| Analysis | pandas + numpy + ta-lib | pandas for transforms, ta-lib for technical indicators |
| Dashboard | Streamlit | Fastest path from data to interactive UI |
| Testing | pytest | Standard Python testing |
| Dependencies | uv | Modern fast package management |
| Scheduling | Hermes cron jobs | For periodic data collection runs |

## Project Structure

```
northstar2.0/
├── AGENTS.md                           # Agent instructions
├── .specify/                            # Spec-Kit config
├── pyproject.toml                       # Python project config
├── specs/
│   └── 001-research-evidence-pipeline/
│       ├── spec.md                      # ← This feature's spec
│       ├── plan.md                      # ← This file
│       └── tasks.md                     # ← Task breakdown
├── northstar/                           # Main package
│   ├── __init__.py
│   ├── config.py                        # API keys, settings
│   ├── collectors/                      # One module per data source
│   │   ├── __init__.py
│   │   ├── prices.py                    # Price + volume data (yfinance)
│   │   ├── fundamentals.py              # Financial statements (yfinance)
│   │   └── news.py                      # News + sentiment (finnhub)
│   ├── analyzers/                       # Signal computation
│   │   ├── __init__.py
│   │   ├── technical.py                 # RSI, MACD, SMA, etc.
│   │   └── fundamentals.py              # Ratio computation
│   ├── engine/                          # Recommendation logic
│   │   ├── __init__.py
│   │   └── recommender.py              # Evidence → recommendation
│   └── db/
│       ├── __init__.py
│       └── schema.py                    # SQLite schema + migrations
├── dashboard/                           # Streamlit app
│   ├── __init__.py
│   ├── app.py                           # Main dashboard entry
│   ├── pages/
│   │   ├── screener.py                  # Stock screener (US1)
│   │   ├── research.py                  # Stock detail + evidence (US2)
│   │   └── recommendations.py           # Decision recommendations (US3)
│   └── components/                      # Reusable UI components
│       ├── stock_card.py
│       ├── evidence_panel.py
│       └── signal_chart.py
├── data/
│   ├── raw/                             # Immutable raw data cache
│   └── processed/                       # Analyzed/transformed data
├── scripts/
│   └── collect-all.sh                   # Run all collectors
└── tests/
    ├── test_collectors/
    ├── test_analyzers/
    └── test_engine/
```

## Constitution Check

**Gates passed:**
- G0 (Problem Framing): ✓ The spec defines what questions each collector answers
- No violations of simplicity principle

## Implementation Phases

### Phase 1: Foundation (shared infra)
- Python project setup (`pyproject.toml`, uv)
- SQLite schema
- Configuration management
- Base collector interface

### Phase 2: Collectors (P1 workloads)
- Price collector (yfinance — daily OHLCV)
- Fundamentals collector (yfinance — financials, ratios)
- News collector (finnhub — headlines + sentiment)

### Phase 3: Analyzers (P1 workloads)
- Technical indicators (RSI, MACD, SMA crossovers)
- Fundamentals analyzer (P/E, EPS growth, debt ratios)

### Phase 4: Dashboard — Screener (US1)
- Data loading from SQLite
- Filter UI components
- Stock table with key metrics

### Phase 5: Dashboard — Research View (US2)
- Stock detail page
- News + sentiment panel
- Fundamentals panel
- Technical indicators panel

### Phase 6: Dashboard — Recommendations (US2→US3, P2)
- Recommendation engine
- Evidence summary UI
- Confidence scoring

### Phase 7: Polish & Testing
- End-to-end test for collector → analysis → display pipeline
- Error handling for API failures
- Documentation