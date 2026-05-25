---
title: feat: Phase 3 decision loop — grounded committee, alerts, outcomes, docs
type: feat
status: active
date: 2026-05-25
origin: docs/plans/2026-05-25-001-feat-research-command-center-plan.md
---

# feat: Phase 3 decision loop — grounded committee, alerts, outcomes, docs

## Summary

Complete the research command center's Phase 3 (Decision Loop) by grounding the committee in frozen evidence packets, extending alerts beyond pipeline failures, implementing forward outcome tracking starting with a 1w idempotent job, and documenting quality gates. This slice consumes the Phase 1/2 foundation (SQLite research store, collectors, scoring, APIs, command-center UI) already built in Slice 3.

---

## Problem Frame

The Phase 1 foundation (SQLite store, collectors, scoring) and Phase 2 product surface (research APIs, command-center UI, scanner queues, durable watchlist, pipeline-failure alerts) are complete. The remaining gap is the **Decision Loop**: the committee still runs ticker-only Gemini ungrounded, alerts only cover pipeline failures, outcome tracking has no job to compute forward returns, and the full verification suite lacks documented gates. This blocks the strategy's evidence-grounded decision layer and outcome-feedback loop.

---

## Requirements

- R1 (U6). Committee sessions must consume frozen evidence packets, persist playbook lineage (entry/stop/target/size/invalidation/review trigger/confidence/citations), and reject empty or stale-core requests before calling any LLM.
- R2 (U6). Committee output must carry deterministic risk governance — model validates or computes allowed size ranges from versioned local config, rejects violations.
- R3 (U7). Add conservative alert rules beyond pipeline failure: buy-ready setup detection, risk breach, and earnings/filing shock, with deduplication and evidence-review framing.
- R4 (U8). Implement an idempotent 1w forward-outcome tracking job for scanner signals, committee playbooks, and accepted/rejected decisions versus SPY and available sector benchmarks.
- R5 (U9). Verify `npm run lint`, `npm run test`, and `npm run build` pass; document quality gates and operations in `docs/ops/`.

---

## Scope Boundaries

- No broker execution, order placement, or trade routing.
- No options, crypto, or global multi-asset expansion.
- No public cloud deployment or full SaaS auth.
- No switching LLM provider from Gemini for committee — the v1 LLM path stays on the already-configured provider.
- No outcome dashboard or rich charting in this slice — schema + 1w job are the v1 cutline.

### Deferred to Follow-Up Work

- Outcome dashboard and alert-precision UI: full chart/table rendering of 1w/1m/3m outcomes and alert stats after the job proves stable.
- Full WebSocket-based live alert push: v1 alerts are API-polled via TanStack Query; live push follows as an ops concern.
- Committee prompt-history editor: v1 prompt versioning is code-only; a UI admin panel is deferred.

---

## Context & Research

### Relevant Code and Patterns

- `src/server/research/committee.ts` — existing committee endpoint (ticker-only Gemini); must be upgraded to evidence-packet-grounded with output validation.
- `src/pages/Committee.tsx` — committee UI rendering; needs frozen-evidence CTA state and external-LLM disclosure.
- `src/server/research/evidence.ts` — evidence packet freezing endpoint already planned; consume from committee.
- `src/server/research/alerts.ts` — existing pipeline-failure alert path; extend with buy-ready, risk breach, earnings/shock rules.
- `src/server/research/outcomes.ts` — outcome schema exists from U1; needs a Python outcome job to compute forward returns.
- `scripts/research_engine/outcomes.py` — planned outcome job; implement idempotent 1w compute.
- `src/server/research/alerts.test.ts`, `src/server/research/briefing.test.ts`, `src/server/research/events.test.ts` — existing alert/briefing/event tests to extend.
- `config/risk-model/v1.json` — versioned risk config for deterministic size governance (max position %, max loss %, liquidity floor, concentration caps).
- `config/score-models/v1.json` — existing scoring config to link from outcome records.
- Existing migration and fixture DB patterns from `scripts/research_engine/db.py` and `scripts/research_engine/migrations.py`.

### Institutional Learnings

- Evidence-packet freeze before committee prevents LLM drift: hash, source run IDs, score snapshot ID.
- Forward returns use trading-day-aware logic and adjusted close; missing benchmark data must not fail the job.
- Alert dedupe uses source-run/score-snapshot linkage to prevent repeated identical alerts.
- Deterministic risk governance is server-side only; LLM may explain sizing but cannot override config bounds.

### External References

- better-sqlite3 prepared statement and transaction patterns (existing usage in `src/server/research/db.ts`).

---

## Key Technical Decisions

| Decision | Rationale |
|---|---|
| Committee requires a frozen evidence packet ID, not a ticker | Prevents ungrounded LLM analysis; every session traces to frozen inputs |
| Outcome job runs as a standalone Python script, not inline in the API | Matches the existing Python collector/scoring pattern; API serves outcome records, the job computes them |
| Alerts use a single `POST /api/research/alerts/acknowledge` for user acknowledgment | Keeps the alert model simple: emitted → acknowledged → resolved; no multi-state workflow in v1 |
| Deterministic risk config lives in `config/risk-model/v1.json` alongside score models | Versioned, immutable config; committee output validation reads the active config at session time |

---

## Open Questions

### Resolved During Planning

- Should the committee validate output against frozen evidence packet citations before persisting? Yes — reject LLM-cited claims that have no matching evidence row.
- Should outcome tracking cover scanner-only signals (not just playbooks)? Yes — separate signal vs decision outcome records.
- Should `docs/operations/research-pipeline.md` be created in this slice or deferred to U9? U9 owns all docs; commit it as part of the final documentation pass.

### Deferred to Implementation

- Exact alert dedupe window: implement with source-run/score-snapshot IDs as the dedupe key; tune window in testing.
- Exact trading-calendar rules: use the simplest trading-day-aware approach (skip weekends, US market holidays); formalize in the outcome job.
- Outcome job trigger: v1 is manual `python -m scripts.research_engine.outcomes`; cron/Hermes scheduling is a follow-up.

---

## Implementation Units

```mermaid
flowchart TB
  S4U1[S4-U1: Grounded committee]\
  S4U2[S4-U2: Risk governance + output validation]\
  S4U3[S4-U3: Extended alerts]\
  S4U4[S4-U4: Outcome tracking job]\
  S4U5[S4-U5: Docs + quality gates]\

  S4U1 --> S4U2
  S4U1 --> S4U3
  S4U1 --> S4U4
  S4U2 --> S4U4
  S4U3 --> S4U5
  S4U4 --> S4U5
```

### S4-U1. Ground committee in frozen evidence packets

**Goal:** Replace ticker-only committee with an evidence-packet-grounded session that requires a frozen evidence packet ID, stores full lineage, and produces validated playbooks.

**Requirements:** R1

**Dependencies:** Existing evidence-packet freeze endpoint from Phase 2 (U4), existing committee module from Phase 2

**Files:**
- Modify: `src/server/research/committee.ts` — upgrade to accept evidence-packet ID, freeze if missing, persist session + playbook
- Modify: `src/pages/Committee.tsx` — add frozen-evidence CTA state, external-LLM disclosure, evidence packet reference display
- Modify: `src/server/app.ts` — wire updated committee routes
- Modify: `src/server/research/evidence.ts` — ensure evidence packet freeze is callable from committee endpoint
- Create: `src/server/research/committee.test.ts` — route-level tests
- Create: `src/pages/Committee.test.tsx` — UI state and degradation tests
- Modify: `src/hooks/useArchive.ts` — persist committee sessions to SQLite, not localStorage

**Approach:**
- New committee endpoint `POST /api/research/committee/session` accepts `{ evidencePacketId: string }` (or compatible references to freeze one)
- Existing `POST /api/committee/session` (ticker-only) must reject with a clear error redirecting to the evidence-packet flow
- Store evidence packet hash, source run IDs, score snapshot ID, score model ID, LLM model/version, prompt version, response schema version, missing-data warnings, and the final playbook
- Validation gates: reject if core evidence is missing/stale, reject if the evidence packet ID is invalid, reject ticker-only requests
- Persist completed, rejected, and failed sessions; migrate archive behavior away from browser-only storage
- Show UI copy that committee synthesis uses an external LLM provider; disable committee CTA when core evidence is stale
- LLM output is synthesis only — cannot mutate deterministic scores

**Patterns to follow:**
- Existing Gemini JSON response schema style in committee code, moved server-side
- Evidence packet grouping from `src/pages/EvidencePacket.tsx`
- Archive UX intent from `src/hooks/useArchive.ts`, with SQLite persistence

**Test scenarios:**
- Happy path: fresh evidence packet produces validated playbook with persisted session and full lineage
- Happy path: secondary stale evidence allows committee with explicit warnings
- Edge case: missing core evidence blocks committee before any LLM call
- Edge case: evidence packet frozen; later data updates do not change stored input hash
- Edge case: ticker-only request to new committee endpoint returns clear error
- Error path: LLM timeout records failed session and returns safe error contract
- Error path: LLM returns invalid JSON records failed session
- Integration: committing a playbook creates durable outcome seed state without modifying score snapshots

**Verification:**
- Committee requires a frozen evidence packet or valid reference before any LLM call
- Every persisted session traces to evidence packet, score model, prompt version, and source status set
- UI shows external-LLM disclosure and disabled CTA when core evidence is stale

---

### S4-U2. Add deterministic risk governance and output validation

**Goal:** Add server-side risk bounds to committee playbooks: deterministic config validates position size, loss limits, liquidity floor, and concentration caps. Reject LLM output that violates config bounds or cites absent evidence.

**Requirements:** R1, R2

**Dependencies:** S4-U1

**Files:**
- Create: `config/risk-model/v1.json` — versioned risk governance config
- Create: `src/lib/riskGovernance.ts` — pure deterministic risk validation
- Create: `src/lib/riskGovernance.test.ts` — risk validation tests
- Modify: `src/server/research/committee.ts` — integrate risk governance before persisting playbook
- Modify: `src/pages/Committee.tsx` — show risk-bounded size range and validation results

**Approach:**
- Define `config/risk-model/v1.json`: max position % of portfolio, max loss % of account, minimum liquidity (daily volume floor), concentration limits (max % in any sector), and max position count
- Risk governance is pure deterministic TypeScript (`src/lib/riskGovernance.ts`): reads active config at session time, evaluates LLM-proposed entry/stop/size against bounds, and returns validated size range and any violations
- Committee output validation is a separate step: before persisting playbook, verify all cited evidence exists in the frozen packet (by hash or key)
- Reject output that cites missing evidence, exceeds risk bounds, or has missing required playbook fields
- LLM may explain sizing rationale, but deterministic code computes the allowed range
- Violated bounds are recorded as advisory warnings for user override (not silently dropped) but the playbook is marked `risk_violation: true` until user acknowledgment

**Patterns to follow:**
- Pure deterministic logic style from `src/lib/watchlistEnhancements.ts` and `src/lib/scoreModel.ts`
- Versioned config pattern from `config/score-models/v1.json`

**Test scenarios:**
- Happy path: valid playbook passes risk bounds and evidence citation check
- Edge case: proposed size exceeds max position % — risk governance shrinks to allowed range
- Edge case: proposed stop exceeds max loss % — advisory warning, playbook marked risk_violation
- Edge case: evidence citation references data not in the frozen packet — rejected
- Error path: missing risk config file falls back to safe defaults
- Error path: concentration limit violated — advisory warning
- Integration: risk-governance check runs before playbook persistence; violations do not prevent persistence but are recorded

**Verification:**
- Every committee playbook has a deterministic size range from risk config
- Playbooks citing absent evidence are rejected before persistence
- Risk violations are recorded and visible in the committee UI

---

### S4-U3. Extend alerts beyond pipeline failure

**Goal:** Add conservative alert rules for buy-ready setup detection, risk breach, and earnings/filing shock. Deduplicate by source-run/score-snapshot linkage.

**Requirements:** R3

**Dependencies:** S4-U1 (committee playbook state for buy-ready alerts)

**Files:**
- Modify: `src/server/research/alerts.ts` — add buy-ready, risk breach, earnings/shock rules
- Modify: `src/server/research/alerts.test.ts` — extend alert test coverage
- Modify: `src/server/research/routes.ts` — wire alert acknowledgment endpoint
- Modify: `src/pages/CommandCenter.tsx` — render new alert types in the high-confidence alerts area
- Create: `src/lib/alertRules.ts` — pure alert rule detection logic
- Create: `src/lib/alertRules.test.ts` — rule-level tests

**Approach:**
- Define alert types in a typed union: `pipeline_failure`, `review_ready_setup`, `risk_breach`, `earnings_filing_shock`
- Alert rule detection is pure TypeScript: consumes score snapshots, evidence packets, and portfolio context; emits alert records with source linkage
- `review_ready_setup`: actionable score snapshot with fresh core data, no committee playbook yet (or playbook in draft)
- `risk_breach`: existing position triggers stop loss, concentration exceeds config limits, or portfolio delta exceeds threshold
- `earnings_filing_shock`: SEC filing or earnings event with unexpected delta against consensus or prior period
- Deduplication key: `(alert_type, ticker, source_run_id)` — prevents repeated identical alerts from the same pipeline run
- Acknowledge via `POST /api/research/alerts/:id/acknowledge` — records user acknowledgment without deleting the alert
- Alerts are framed as `evidence-review` prompts, not trade instructions: language like "Review-ready setup" / "Risk threshold reached"

**Patterns to follow:**
- Existing alert API contract and data model from Phase 2 (alerts.ts)
- TanStack Query pattern for alert polling in CommandCenter.tsx

**Test scenarios:**
- Happy path: actionable score snapshot produces one review-ready alert with source linkage
- Happy path: risk breach alert fires when existing position violates risk config thresholds
- Happy path: earnings/filing shock alert fires from event data with delta > threshold
- Edge case: same alert type + ticker + source run dedupes — second evaluation produces no new alert
- Edge case: stale core data blocks buy-ready alerts (not review-ready without fresh evidence)
- Edge case: risk breach on a closed position does not fire
- Error path: score snapshot with missing ticker metadata logs warning and does not crash
- Integration: acknowledged alert re-appears in unacknowledged queries until new source run supersedes it

**Verification:**
- Alerts endpoint returns typed alert records with source-run linkage and dedupe evidence
- UI distinguishes alert types and links each to the relevant evidence/security/portfolio context
- No alert implies trade action — all are framed as research review

---

### S4-U4. Implement idempotent 1w forward-outcome tracking job

**Goal:** Create an idempotent Python outcome job that computes 1w forward returns for scanner signals, committee playbooks, and accepted/rejected decisions versus SPY and available sector benchmarks.

**Requirements:** R4

**Dependencies:** S4-U1 (playbook outcomes), S4-U2 (risk-config lineage), U3 (score snapshots from Phase 1)

**Files:**
- Modify: `scripts/research_engine/outcomes.py` — implement 1w outcome computation
- Create: `tests/research_engine/test_outcomes.py` — outcome job tests
- Modify: `src/server/research/outcomes.ts` — API to serve outcome records
- Create: `src/server/research/outcomes.test.ts` — outcome API route tests

**Approach:**
- Distinguish signal outcome vs decision outcome records: signal = scanner-generated score; decision = user-accepted/rejected playbook
- Capture at decision time: security price, SPY price, sector benchmark (if known), score snapshot ID, evidence packet ID, committee session ID, source freshness, score model version
- Idempotency key: `(source_type, source_id, horizon_days)` — prevents duplicates on re-run
- Compute 1w forward returns using trading-day-aware logic (skip weekends, US holidays) and adjusted close where available
- Handle: missing benchmark data (record fallback, don't fail), delisted/acquired (terminal outcome state), overlapping outcome windows (most recent data wins)
- Store manual notes/verdicts separately from quantitative return outcomes
- Link alert precision: each accepted alert can eventually trace to its outcome
- Job runs standalone: `python -m scripts.research_engine.outcomes`; reads from the same `NORTHSTAR_DB_PATH`
- Provide a compact function `compute_latest_outcomes(db_path)` for API consumption — the API server calls this lazily on GET

**Patterns to follow:**
- Idempotent pipeline pattern from U2 (Phase 1) — run tracking and source-run records
- Scoring module consistency from U3 (Phase 1) — model version linkage

**Test scenarios:**
- Happy path: accepted playbook with price history computes 1w return vs SPY and sector benchmark
- Happy path: scanner-only signal outcome is tracked separately from accepted decision
- Edge case: weekend target date moves to next trading day
- Edge case: sector benchmark unavailable records fallback, does not crash
- Edge case: delisted/acquired ticker records terminal outcome
- Edge case: re-running the job produces no duplicate rows
- Error path: missing security price records partial outcome and skips (does not crash)
- Integration: API serves computed outcomes for the most recently tracked horizons

**Verification:**
- Re-running the outcome job produces no duplicate records
- Decision-quality KPI can be computed from SQLite `decision_outcomes` for 1w horizon
- API `GET /api/research/outcomes` returns signal and decision outcomes with benchmark data

---

### S4-U5. Update documentation, quality gates, and verification

**Goal:** Complete the quality loop: verify full verification suite passes, document research operations (pipeline, alerts, outcomes), and update strategy/context docs with Phase 3 state.

**Requirements:** R5

**Dependencies:** S4-U1, S4-U2, S4-U3, S4-U4

**Files:**
- Create: `docs/operations/research-pipeline.md` — pipeline commands, source tiers, troubleshooting
- Create: `docs/operations/research-alerts.md` — alert types, rules, dedupe policy
- Create: `docs/operations/research-outcomes.md` — outcome tracking schema, job usage
- Modify: `CONTEXT.md` — reflect grounded committee, extended alerts, outcome tracking
- Modify: `README.md` — update with Phase 3 capability summary
- Create: `docs/adr/0002-research-decision-loop.md` — ADR for Phase 3 decision loop architecture

**Approach:**
- Document pipeline commands, required env vars without secret values, DB location, migration behavior, source tiers, and troubleshooting
- Document alert rules, type definitions, dedupe keys, acknowledgment behavior
- Document outcome job: schema, idempotency keys, how to run, how to verify
- Run `npm run lint`, `npm run test`, `npm run build` as the final quality pass
- Run Python tests: `pytest tests/research_engine/` or equivalent project script
- Update `CONTEXT.md` with stable Phase 3 facts (grounded committee operation, alert types, outcome job)
- Create ADR for decision loop architecture (committee grounding, risk governance, outcome tracking)
- Do not overwrite dirty working-tree changes without explicit review

**Patterns to follow:**
- Existing ADR style in `docs/adr/0000-initial-project-setup.md`
- Existing `CONTEXT.md` format (stable facts only, no speculative plan details)

**Test scenarios:**
- Test expectation: none for documentation itself; verification is command availability and link accuracy
- Integration: documented commands match actual script/package entrypoints

**Verification:**
- `npm run lint` passes with zero errors
- `npm run test` passes (TypeScript suite + Python suite)
- `npm run build` passes
- Documentation references only repo-relative paths and redacts all secrets
- Python tests pass through the chosen project script

---

## System-Wide Impact

- **Interaction graph:** Committee produces playbooks → outcome job consumes playbooks + signals + decisions → alert rules consume score snapshots + portfolio context → all write to SQLite.
- **Error propagation:** LLM failures become failed sessions (not score mutations); risk validation failures produce advisory warnings (blocking for direct violations); benchmark unavailability is recorded as fallback (non-fatal).
- **State lifecycle risks:** Evidence packet freeze is out of this slice's scope (Phase 2 already owns it). Outcome job must be idempotent; re-runs must not duplicate rows.
- **API surface parity:** Existing ticker-only committee endpoint must reject with a redirect error. Alert acknowledgment endpoint is new. Outcomes endpoint already exists from Phase 2 but is enriched with computed values.
- **Integration coverage:** Unit tests cover risk governance and alert rules; route tests cover committee/alert/outcome endpoints; Python tests cover outcome job against fixture DBs.
- **Unchanged invariants:** Gemini stays server-side; no provider secret reaches browser bundles; IBKR remains a snapshot source; no broker execution.

---

## Risks & Dependencies

| Risk | Likelihood | Impact | Mitigation |
|------|:----------:|:------:|-----------|
| LLM hallucinates evidence citations | Medium | High | Output validation rejects citations absent from frozen packet |
| Risk config too conservative blocks valid playbooks | Medium | Medium | Violations are warnings, not hard blocks; user can override |
| Outcome job duplicates on re-run | Low | Medium | Idempotency key on `(source_type, source_id, horizon_days)` |
| Weekend/holiday pricing gaps in 1w computation | Medium | Low | Trading-day-aware date math with explicit fallback |
| Existing committee UI breaks during migration | Medium | Medium | Route tests before UI changes; ticker-only endpoint returns clear error |
| Alert dedupe window too aggressive | Low | Low | Source-run linkage as natural dedupe scope; tune in testing |

---

## Sources & References

- **Origin plan:** `docs/plans/2026-05-25-001-feat-research-command-center-plan.md` (U6-U9 scope extracted from Phase 3)
- **Phase 1/2 artifacts:** SQLite research store (`scripts/research_engine/db.py`, `src/server/research/db.ts`), collectors/pipeline, scoring, research APIs, command-center UI
- **Strategy:** `STRATEGY.md`
- **Project context:** `CONTEXT.md`
- **Existing committee code:** `src/server/app.ts` (committee route), `src/pages/Committee.tsx`
- **Existing alerts code:** `src/server/research/alerts.ts`
- **Existing outcomes schema:** `src/server/research/outcomes.ts`
- **Risk governance pattern:** `config/score-models/v1.json`, `src/lib/scoreModel.ts`