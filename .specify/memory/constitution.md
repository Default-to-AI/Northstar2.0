# Northstar 2.0 Constitution

**Project**: Northstar 2.0 — Finance Dashboard with Research and Evidence-Driven Stock Analysis
**Version**: 1.0.0 | **Ratified**: 26-05-2026 | **Last Amended**: 26-05-2026

## Core Principles

### I. Evidence-First Analysis
Every recommendation must be backed by collected evidence — not intuition. Data sources must be cited. Assumptions must be stated. Decisions must be traceable from raw data to recommendation. No "because I think so" reasoning.

### II. Data Integrity
Market data, financials, and research sources must be preserved immutably. Raw data is never modified — only transformed into analyzed data. The pipeline must be reproducible: given the same inputs and date, the same outputs must result.

### III. Modular Collectors
Each data source and analysis type gets its own independent collector module. Collectors are self-contained, independently testable, and composable. Adding a new signal source means adding a new collector, not modifying existing ones.

### IV. Dashboard-Driven UX
The primary interface is a visual dashboard. Data is collected and analyzed in the background; the dashboard surfaces opportunities, evidence, and rationale. The dashboard is the decision-support layer, not just a chart viewer.

### V. Simplicity First (YAGNI)
Start with the simplest pipeline that delivers value. No distributed systems, no real-time streaming, no microservices in v1. A Python script that collects data, analyzes it, and feeds a dashboard is the correct starting point.

## Data Architecture

### Data Flow
```
Raw Data Sources (Yahoo Finance, SEC, News APIs)
    ↓ Collectors (modular, scheduled)
Staging / Raw Storage (SQLite / Parquet)
    ↓ Analyzers (technical, fundamental, sentiment)
Analysis Outputs (metrics, signals, scores)
    ↓ Dashboard (Streamlit)
User Decisions
```

### Evidence Repository
Every recommendation includes a link to its evidence chain:
- Source URL or API reference
- Timestamp of collection
- Raw value before analysis
- Transformation applied
- Final signal/score

## Quality Gates

1. **G0 — Problem Framing**: Before building a new collector or analysis, define what question it answers and what decision it supports.
2. **G1 — Plan Review**: Architecture and approach must be reviewed before implementation begins.
3. **G2 — Verification**: After implementation, verify that the output matches the spec before merging.

## Development Workflow

1. Use `/speckit.specify` to define the feature (what, why, not how)
2. Use `/speckit.plan` to create the technical plan
3. Use `/speckit.tasks` to break into atomic tasks
4. Use Hermes `delegate_task` to execute each task in a fresh context
5. Use `/speckit.implement` or manual verification to close the wave
6. Log evidence: what was built, what it tells us, what decisions it supports

## Technology Stack (Default)

- **Language**: Python 3.11+
- **Data**: pandas, numpy, SQLite
- **Market Data**: yfinance, finnhub, SEC EDGAR API
- **Dashboard**: Streamlit
- **Scheduling**: Hermes cron jobs
- **Testing**: pytest
- **Dependencies**: pip/uv

## Governance

This constitution supersedes general coding conventions for Northstar 2.0. Amendments require a log entry explaining the change and its rationale. The AGENTS.md file is the canonical runtime version of this constitution for Hermes agents.