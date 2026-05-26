# Northstar 2.0 Constitution

**Project**: Northstar 2.0 — Market-Open Research Command Center & Opportunity Engine
**Version**: 1.0.0 | **Ratified**: 26-05-2026 | **Last Amended**: 26-05-2026

## Core Principles

### I. Evidence-First
Every score, recommendation, and playbook must trace back to deterministic data. LLMs synthesize evidence packets — they are not the source of truth. Official data (market prices, financials, SEC filings) drives scores. Rumors, social media, and chatter are low-confidence signals only.

### II. Deterministic Pipeline First
The deterministic scanner creates broad candidates. The watchlist curates them. The evidence-grounded committee produces final trade playbooks. No LLM output is persisted without citation validation against frozen evidence packets.

### III. Immutable Raw Data
Collected data is write-once. Raw data is never modified — only transformed into analyzed data. The pipeline must be reproducible: same inputs + same date → same outputs.

### IV. Hybrid Architecture
- **Batch (Python)**: Market data collection, factor computation, scoring, outcome tracking
- **Live (TypeScript/Express)**: API contracts, UI routes, committee sessions, alert evaluation
- **Storage**: SQLite is the canonical research store. JSON files are exports/cache only.

### V. Conservative by Default
Default alert policy: buy-ready setup, risk breach, earnings/filing shock, or pipeline failure. No broker execution in v1. No paid data dependencies before free stack proves product value.

## Data Architecture

```
Data Sources (yfinance, Finnhub, IBKR Flex, SEC EDGAR)
    ↓ Python Batch Collectors (modular, cron-scheduled)
SQLite Research Store (securities, prices, fundamentals, events, scores, alerts, outcomes)
    ↓ TypeScript/Express API Layer (typed contracts)
React Frontend (Command Center, Scanner, Committee, Dashboard)
    ↓ User Decision
```

## Quality Gates

| Gate | Phase | Check |
|------|-------|-------|
| G0 | Before adding a new collector or analysis | What question does this answer? What decision does it support? |
| G1 | Before implementation (plan review) | Does the plan solve the spec's problem? Architecture sound? |
| G2 | After implementation, before merge | Does output match spec acceptance criteria? Tests pass? |

## Technology Stack

- **Frontend**: React 19 + Vite + TanStack Query + shadcn/ui + Tailwind v4
- **Backend**: Express 4 + TypeScript + better-sqlite3
- **Batch/Data**: Python 3.11+ + pandas + yfinance + finnhub
- **Storage**: SQLite (research store)
- **Portfolio**: IBKR Flex XML → normalized JSON
- **Agent**: Hermes Agent (primary), Gemini for committee synthesis
- **Build**: esbuild + vite

## Development Workflow

1. Brainstorm the feature → `docs/brainstorms/<date>-<slug>.md`
2. Write the spec → `specs/<feature>/spec.md` (what + why)
3. Create the plan → `specs/<feature>/plan.md` (architecture + phases)
4. Break into tasks → `specs/<feature>/tasks.md`
5. Execute each task via Hermes `delegate_task` with fresh context
6. Verify against spec acceptance criteria before next wave
7. Commit after each verified wave

## Governance

This constitution complements `STRATEGY.md` (product direction), `CONTEXT.md` (current code reality), and `AGENTS.md` (agent instructions). When in conflict: AGENTS.md > constitution > CONTEXT.md > STRATEGY.md for agent behavior.

Amendments require a log entry explaining the change and rationale.