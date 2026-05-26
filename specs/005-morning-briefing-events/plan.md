# Implementation Plan: Morning Briefing + Events Dashboard

**Branch**: `feat/slice-5-morning-briefing-events` | **Date**: 26-05-2026
**Spec**: `specs/005-morning-briefing-events/spec.md`
**Brainstorm**: `docs/brainstorms/2026-05-25-slice5-morning-briefing-events.md`

## Summary

Add a pre-open Hermes cron job that generates a template-driven morning briefing stored in SQLite, served via `GET /api/research/briefing`, and displayed as a new card on the Command Center. Pair it with a parallel events collector that ingests earnings calendar, macro calendar, and SEC filing deadlines. A "Run briefing now" button executes the briefing inline when the pre-open run is missed.

## Tech Context

- Existing DB path: `openResearchDb()` → SQLite with existing `runs`, `ticker_evidence`, `score_snapshots`, `alerts`, `decision_outcomes` tables
- Existing API: Express at `src/server/app.ts` — routes follow `/api/research/*` pattern
- Existing Python collectors: `scripts/research_engine/` pattern — `run-pipeline.py` as entry orchestration
- Existing UI: Command Center at `src/pages/CommandCenter.tsx` — terminal-style card layout with `PipelineReadinessIndicator`, `FearGreedGauge` components
- Cron: Hermes cron configurable from `hermes cron set` CLI

## Project Structure Changes

```
# New files
scripts/research_engine/briefing.py        # Briefing collector
scripts/research_engine/collect_events.py  # Events collector
scripts/research_engine/db.py              # Schema + migrations for new tables
src/server/research/briefing.ts            # GET /api/research/briefing
src/server/research/briefing.test.ts
src/server/research/events.ts              # GET /api/research/events
src/server/research/events.test.ts
src/server/research/migrations/2026-05-26-morning-briefs-events.sql

# Modified files
src/pages/CommandCenter.tsx                # Add briefing + events cards
src/server/research/db.ts                  # Add migration runner for new tables

# Config
.hermes/cron/pre-open.yaml                # Hermes cron job config
data/macro-calendar.json                   # Hardcoded macro event dates
```

## Implementation Phases

### Phase 1: Database schema (T001–T002)
New SQLite tables: `morning_briefs` and `market_events`. Migration script.

### Phase 2: Python collectors (T003–T005)
Briefing collector: aggregate readiness + scanner + portfolio + pre-market data. Events collector: yfinance earnings + macro + SEC filings.

### Phase 3: API endpoints (T006–T008)
`GET /api/research/briefing`, `POST /api/research/briefing/refresh`, `GET /api/research/events`.

### Phase 4: Hermes cron job (T009)
Pre-open cron scheduling for briefing + events collectors.

### Phase 5: UI — Briefing card (T010–T012)
Command Center briefing card with warning state, loading state, and data state.

### Phase 6: UI — Events card (T013–T014)
Command Center events card with date-grouped events and holding highlights.

### Phase 7: Tests + polish (T015–T017)
API tests, collector tests, integration test for full flow.