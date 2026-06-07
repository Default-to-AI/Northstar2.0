# Implementation Plan: Command Center Decision Workflow

**Branch**: `feat/command-center-decision-workflow` | **Date**: 06-06-2026
**Spec**: `specs/007-command-center-decision-workflow/spec.md`
**Parent context**: `.hermes/plans/2026-06-06_232315-command-center-morning-brief-v2.md`

## Summary

Extend the existing Slice 5 morning-brief/events foundation into a decision-grade command center. Keep the current `morning_briefs`, `market_events`, alerts, and Command Center cards intact, then add a new deterministic workflow for persona scores, action decisions, and portfolio-health checks.

## Current Code Reality

Already present:
- `src/pages/CommandCenter.tsx` renders briefing, upcoming events, and research alerts.
- `src/server/research/briefing.ts` serves `GET /api/research/briefing` and manual refresh.
- `src/server/research/events.ts` serves upcoming events.
- `scripts/research_engine/briefing.py` writes readiness, pre-market, opportunities, and portfolio snapshot to `morning_briefs`.
- `scripts/research_engine/migrations.py` is the canonical place for SQLite schema evolution and currently sits at `SCHEMA_VERSION = 5`.

Implication:
- The next slice should **not** rebuild the command center from scratch.
- The correct move is to add a parallel decision-workflow layer and wire it into the existing briefing pipeline/UI.

## Data Model Decision

Use separate durable tables instead of stuffing everything into `morning_briefs` JSON.

### New tables
1. `persona_score_snapshots`
   - per ticker, per run, per persona score output
   - stores raw score components, penalties, and model version
2. `decision_briefs`
   - normalized daily actions (`ignore`, `watch`, `long_candidate`, `trim`, `stop_review`, `restructure`)
   - stores triggers, target/stop, risk-reward, invalidation, and review trigger
3. `portfolio_health_checks`
   - holding-level governance outputs
   - stores check type, severity, reason code, and suggested action

### Config files
- `config/persona-model/v1.json`
- `config/portfolio-health/v1.json`

## Architecture

### Python layer
Python owns:
- factor-to-persona mapping
- scoring calculations
- action classification
- portfolio-health rules
- writing result rows into SQLite

### TypeScript / API layer
Express owns:
- route contracts for reading the new outputs
- response normalization for the frontend
- test fixtures for seeded DB responses

### Frontend layer
React owns:
- presenting the daily decision queue
- presenting portfolio-health actions
- showing persona score breakdowns compactly
- preserving the existing command-center visual language

## Proposed File Changes

### Modify
- `scripts/research_engine/migrations.py`
- `scripts/research_engine/briefing.py`
- `src/server/app.ts`
- `src/pages/CommandCenter.tsx`

### Create
- `scripts/research_engine/decision_workflow.py`
- `scripts/research_engine/tests/test_decision_workflow.py`
- `scripts/research_engine/tests/test_portfolio_health.py`
- `src/server/research/decisions.ts`
- `src/server/research/portfolioHealth.ts`
- `src/server/research/decisions.test.ts`
- `src/server/research/portfolioHealth.test.ts`
- `src/components/command-center/DecisionQueueCard.tsx`
- `src/components/command-center/PortfolioHealthCard.tsx`
- `src/components/command-center/PersonaScoreMatrix.tsx`
- `config/persona-model/v1.json`
- `config/portfolio-health/v1.json`

## Implementation Phases

### Phase 1 — Schema + config
Add schema version 6 for persona scores, decisions, and portfolio-health tables. Add versioned JSON configs for weights and thresholds.

### Phase 2 — Deterministic decision workflow
Build Python logic that reads latest factor/score/portfolio context and writes:
- persona score snapshots
- action decisions
- portfolio-health checks

### Phase 3 — API contracts
Add:
- `GET /api/research/decisions`
- `GET /api/research/portfolio-health`

Optional: add a tiny summary block to `GET /api/research/briefing`, but keep the full decision dataset in dedicated endpoints.

### Phase 4 — UI
Upgrade Command Center with:
- Decision Queue card
- Portfolio Health card
- compact persona score matrix for top candidate(s)

### Phase 5 — Verification
Run targeted Python and Node tests, then confirm the live UI renders the new sections without breaking existing briefing/events/alerts cards.

## Design Constraints

- No freeform LLM-generated morning brief prose as source of truth.
- No pretending to replicate investor minds exactly; persona scores are heuristics only.
- Conservative defaults: if evidence is weak, emit `ignore` or `watch`, not synthetic conviction.
- Watch actions must contain explicit triggers.
- Long-candidate actions must contain entry, stop, target, risk-reward, invalidation, and review trigger.

## Validation Strategy

### Python
- fixture-driven tests for persona scores
- fixture-driven tests for action classification
- fixture-driven tests for trim / stop / restructure triggers

### API
- seeded SQLite tests for new routes
- response-shape assertions
- degraded/missing-data scenarios

### UI
- load states
- empty states
- error states
- rendering of all six action classes

## Risks

- Current factor coverage may be insufficient for strong persona fidelity.
- Portfolio-health logic can become noisy if thresholds are too eager.
- The UI can get cluttered fast; priority ordering matters more than breadth.

## Execution Recommendation

Start with schema + configs first. That is the leverage point that de-risks the rest of the implementation and clarifies the exact payload contracts before touching UI.
