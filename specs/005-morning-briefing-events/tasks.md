# Tasks: Morning Briefing + Events Dashboard

**Input**: `specs/005-morning-briefing-events/spec.md`, `specs/005-morning-briefing-events/plan.md`
**Brainstorm**: `docs/brainstorms/2026-05-25-slice5-morning-briefing-events.md`

---

## Phase 1: Database Schema

- [ ] T001 Create migration SQL: `morning_briefs` table (date TEXT PK, briefing JSON, created_at, run_type TEXT cron|manual), `market_events` table (id INTEGER PK, date TEXT, type TEXT earnings|macro|filing, ticker TEXT nullable, description TEXT, source TEXT, created_at)
- [ ] T002 Add migration runner to `src/server/research/db.ts` — auto-run new migrations on server start

---

## Phase 2: Python Collectors

- [ ] T003 Create `scripts/research_engine/briefing.py` — template-driven JSON composition: pipeline readiness from existing readiness data, pre-market context (S&P futures, significant overnight moves from yfinance), top 3–5 compounder/tactical picks from scanner data, portfolio snapshot (NAV, cash %, exposure from IBKR JSON). Store in `morning_briefs` table; replace-on-date.
- [ ] T004 Create `scripts/research_engine/collect_events.py` — yfinance earnings calendar for watchlist+holdings, hardcoded macro calendar from `data/macro-calendar.json`, SEC EDGAR JSON API filing deadlines for watchlist+holdings. Respect rate limits (< 5 req/s). Store in `market_events` table.
- [ ] T005 Create `data/macro-calendar.json` — hardcoded 2026 Fed decision dates, FOMC minutes, CPI, NFP, GDP, PCE, JOLTS release dates.

---

## Phase 3: API Endpoints

- [ ] T006 Create `src/server/research/briefing.ts` — `GET /api/research/briefing` returns today's briefing from SQLite, or `{ status: 'not_generated', date }` if none exists. `POST /api/research/briefing/refresh` spawns briefing Python script, waits for completion, returns fresh briefing or error. Respect timeout.
- [ ] T007 Create `src/server/research/events.ts` — `GET /api/research/events` returns upcoming events from SQLite grouped by date and type. Highlight events affecting holdings/watchlist.
- [ ] T008 Register new routes in `src/server/app.ts`.

---

## Phase 4: Hermes Cron

- [ ] T009 Create Hermes cron job — pre-open schedule (9:00 ET Mon–Fri) running `python3 -m scripts.research_engine.briefing` and `python3 -m scripts.research_engine.collect_events`. Weekend/holiday check produces "no trading today" status.

---

## Phase 5: UI — Briefing Card

- [ ] T010 Add Morning Briefing card to Command Center (above alerts card). Three states: not-generated (warning + "Run briefing now" button + terminal command), loading (spinner), loaded (four sections).
- [ ] T011 Implement "Run briefing now" button — POST to `/api/research/briefing/refresh`, show loading state, handle success/error responses.
- [ ] T012 Style briefing card consistent with existing Command Center terminal-style layout.

---

## Phase 6: UI — Events Card

- [ ] T013 Add Upcoming Events card to Command Center. Group events by date (today, this week, later). Show type badge (earnings/macro/filing), ticker where relevant, description. Highlight holding/watchlist symbols.
- [ ] T014 Style events card with compact layout — date headers, event rows, highlight badges.

---

## Phase 7: Tests + Polish

- [ ] T015 Write tests for `GET /api/research/briefing`, `POST /api/research/briefing/refresh`, `GET /api/research/events` in `src/server/research/briefing.test.ts` and `src/server/research/events.test.ts`.
- [ ] T016 Write Python tests for briefing collector and events collector in `scripts/research_engine/tests/`.
- [ ] T017 Integration test: run briefing collector → verify SQLite row → verify API returns it → verify UI renders it correctly.

---

## Execution Order

```
Phase 1 (Schema)     → No deps
    ↓
Phase 2 (Collectors) → Depends on Phase 1
    ↓
Phase 3 (API)        → Depends on Phase 1 + 2
    ↓
Phase 4 (Cron)       → Depends on Phase 2
    ↓
Phase 5 + 6 (UI)     → Depends on Phase 3 (can be parallel)
    ↓
Phase 7 (Tests)      → Depends on all above
```

Tasks marked [P] within a phase can run in parallel via separate `delegate_task` calls.