# Tasks: Command Center Decision Workflow

**Input**: `specs/007-command-center-decision-workflow/spec.md`, `specs/007-command-center-decision-workflow/plan.md`

---

## Phase 1: Schema + Config

- [ ] T001 Add `SCHEMA_VERSION = 6` and create `persona_score_snapshots` in `scripts/research_engine/migrations.py`
- [ ] T002 Add `decision_briefs` table in `scripts/research_engine/migrations.py`
- [ ] T003 Add `portfolio_health_checks` table in `scripts/research_engine/migrations.py`
- [ ] T004 Create `config/persona-model/v1.json` with initial heuristic weights for Buffett, Hohn, Micha Stocks, and Joseph Carlson
- [ ] T005 Create `config/portfolio-health/v1.json` with deterministic thresholds for trim, stop review, and restructure checks

---

## Phase 2: Python Decision Workflow

- [ ] T006 Create `scripts/research_engine/decision_workflow.py` entrypoint that loads latest factor/score/portfolio context
- [ ] T007 Implement persona score calculation and persist `persona_score_snapshots`
- [ ] T008 Implement candidate decision classification and persist `decision_briefs`
- [ ] T009 Implement holding governance checks and persist `portfolio_health_checks`
- [ ] T010 Update `scripts/research_engine/briefing.py` so the morning-brief workflow also refreshes decision outputs

---

## Phase 3: API Contracts

- [ ] T011 Create `src/server/research/decisions.ts` with `GET /api/research/decisions`
- [ ] T012 Create `src/server/research/portfolioHealth.ts` with `GET /api/research/portfolio-health`
- [ ] T013 Register new routes in `src/server/app.ts`
- [ ] T014 Add route tests in `src/server/research/decisions.test.ts` and `src/server/research/portfolioHealth.test.ts`

---

## Phase 4: Command Center UI

- [ ] T015 Create `DecisionQueueCard` for normalized daily actions
- [ ] T016 Create `PortfolioHealthCard` for trim / stop / restructure outputs
- [ ] T017 Create compact `PersonaScoreMatrix` for the top candidate(s)
- [ ] T018 Update `src/pages/CommandCenter.tsx` to render the new cards without regressing briefing/events/alerts
- [ ] T019 Add loading, empty, degraded-data, and no-action-ready states

---

## Phase 5: Workflow Verification

- [ ] T020 Add Python tests in `scripts/research_engine/tests/test_decision_workflow.py`
- [ ] T021 Add Python tests in `scripts/research_engine/tests/test_portfolio_health.py`
- [ ] T022 Run targeted Node route tests for new research endpoints
- [ ] T023 Run one end-to-end local generation flow and verify SQLite rows + rendered UI
- [ ] T024 Cleanup temporary fixtures/artifacts created only for the implementation session

---

## Execution Order

```text
Phase 1 (Schema + Config)
    ↓
Phase 2 (Python workflow)
    ↓
Phase 3 (API contracts)
    ↓
Phase 4 (UI)
    ↓
Phase 5 (Verification + cleanup)
```

## First Build Step

Start at **T001–T005**. Until the schema and config contracts exist, the rest of the slice is guesswork.
