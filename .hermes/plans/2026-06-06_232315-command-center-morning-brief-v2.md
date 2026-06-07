# Northstar Command Center + Morning Brief v2 Implementation Plan

> **For Hermes:** execute directly unless a specialist subagent materially improves speed for a bounded slice.

**Task ID:** `ns-brief-v2`
**Goal:** Upgrade Northstar from a basic briefing/events dashboard into a decision-grade market-open command center with persona scoring, explicit watchlist actions, and portfolio health checks.
**Architecture:** Keep the existing deterministic research store and Command Center UI as the backbone. Add a new decision layer on top of stored evidence: a rules-backed persona scorecard, normalized action proposals, and portfolio governance checks rendered in a single market-open surface. LLMs may synthesize committee-style rationale later, but v1 of this layer should remain deterministic and template-driven.
**Tech Stack:** React + TanStack Query frontend, Express API routes under `src/server/research/`, SQLite research DB, Python collectors/scoring jobs under `scripts/research_engine/`.

---

## Current Reality / Gap Analysis

The repo already contains most of Slice 5's base plumbing:
- `src/pages/CommandCenter.tsx` already renders morning briefing, events, and alerts cards.
- `src/server/research/briefing.ts` and `src/server/research/events.ts` already expose briefing/event APIs.
- `scripts/research_engine/briefing.py` and `scripts/research_engine/collect_events.py` already populate the core cards.

What is still missing for the user's actual KPI:
1. **No persona decision engine** — Buffett / Hohn / Micha Stocks / Joseph Carlson viewpoints are not modeled anywhere.
2. **No actionable decision table** — top opportunities are badge-only, not `Ignore` / `Watch with trigger` / `Long candidate` / `Trim` / `Stop-loss review`.
3. **No portfolio liveness/governance checks** — current portfolio snapshot is static NAV/cash/exposure only.
4. **No normalized scenario tracking** — watch conditions, entries, invalidations, and risk-reward are not surfaced in the Command Center.
5. **No explicit market-open workflow artifact** — there is no end-to-end “morning brief → decisions → follow-up checks” operating flow in the UI or API.

## Product Decision

Do **not** bolt user-requested opinions directly into the existing `morning_briefs` payload as prose. That would produce a brittle blob.

Winning path:
1. Introduce a **decision-workflow data model** beside the existing briefing.
2. Compute a **persona scorecard** from deterministic evidence and configurable weights.
3. Produce **normalized decision objects** with action type, rationale, trigger, risk bounds, and portfolio-health implications.
4. Extend Command Center with three high-leverage panes:
   - **Decision queue**
   - **Portfolio health / liveness**
   - **Action-ready morning brief summary**

---

## Proposed Deliverables

### 1. Persona scoring system
A deterministic score model that emits per-ticker scores for:
- `buffett`
- `hohn`
- `micha_stocks`
- `joseph_carlson`
- optional `northstar_blended`

Each persona score should be derived from transparent factors already available or cheaply derivable:
- valuation / profitability / capital efficiency
- quality / moat proxies / growth durability
- concentration / activism / catalyst fit
- dividend / shareholder-return profile
- technical setup / momentum / drawdown context
- event risk / freshness / missing-data penalties

### 2. Decision object model
For each high-priority ticker or holding, generate a structured decision:
- `action`: `ignore | watch | long_candidate | trim | stop_review | restructure`
- `priority`
- `ticker`
- `why_now`
- `persona_scores`
- `watch_trigger`
- `entry_zone`
- `stop_loss`
- `price_target`
- `risk_reward`
- `invalidates_when`
- `portfolio_impact`
- `review_trigger`

### 3. Portfolio health checks
Deterministic checks over holdings:
- overweight / run-up / trim candidate
- stop placement stale or too loose / too tight
- earnings or filing catalyst too close for current sizing
- thesis drift or score deterioration
- cash / exposure regime check

### 4. Morning brief workflow contract
A command-center flow that answers, in one screen:
- Is the pipeline ready?
- What matters today?
- What should I ignore?
- What should I watch, and at what exact trigger?
- Which holdings need trim / stop / restructure review?
- What is the highest-conviction idea on the table for today?

---

## Files Likely to Change

### Backend / API
- Modify: `src/server/research/briefing.ts`
- Modify: `src/server/research/db.ts`
- Create: `src/server/research/decisions.ts`
- Create: `src/server/research/portfolioHealth.ts`
- Create: `src/server/research/personaScores.ts`
- Modify: `src/server/app.ts`
- Create: `src/server/research/decisions.test.ts`
- Create: `src/server/research/portfolioHealth.test.ts`

### Python / scoring / storage
- Modify: `scripts/research_engine/briefing.py`
- Modify: `scripts/research_engine/scoring.py`
- Create: `scripts/research_engine/decision_workflow.py`
- Create: `scripts/research_engine/tests/test_decision_workflow.py`
- Create: `scripts/research_engine/tests/test_portfolio_health.py`
- Modify: `scripts/research_engine/db.py`
- Modify: `scripts/research_engine/migrations.py`
- Create: `config/persona-model/v1.json`
- Create: `config/portfolio-health/v1.json`

### Frontend
- Modify: `src/pages/CommandCenter.tsx`
- Create: `src/components/command-center/DecisionQueueCard.tsx`
- Create: `src/components/command-center/PortfolioHealthCard.tsx`
- Create: `src/components/command-center/PersonaScoreMatrix.tsx`
- Create: `src/components/command-center/DecisionActionBadge.tsx`

### Specs / durable context
- Create: `specs/007-command-center-decision-workflow/spec.md`
- Create: `specs/007-command-center-decision-workflow/plan.md`
- Create: `specs/007-command-center-decision-workflow/tasks.md`

---

## Execution Plan

### `ns-brief-v2-1` — Freeze the expanded feature contract
**Objective:** Capture the broadened command-center scope as a new spec instead of mutating Slice 5 beyond recognition.

**Steps**
1. Create `specs/007-command-center-decision-workflow/spec.md`.
2. Convert the user's stated requirements into explicit user stories:
   - daily morning brief
   - persona-informed decisioning
   - watchlist scenario decisions
   - long-term setup decisions
   - portfolio liveness / trim / stop checks
   - restructuring checks
3. Define strict out-of-scope boundaries: no broker execution, no freeform LLM-only opinion engine.
4. Add acceptance criteria for exact decision outputs and visible UI sections.

**Verify:** spec file exists and acceptance scenarios map cleanly to the user ask.

### `ns-brief-v2-2` — Design the storage contract
**Objective:** Add durable tables/config contracts for persona scores and decision outputs.

**Steps**
1. Inspect current SQLite schema in Python migration code.
2. Add schema for:
   - `persona_score_snapshots`
   - `decision_briefs`
   - `portfolio_health_checks`
3. Add versioned config files for persona weights and portfolio-health thresholds.
4. Keep the schema append-only and compatible with existing morning-brief tables.

**Verify:** migrations run on a temp DB and new tables are queryable.

### `ns-brief-v2-3` — Implement the deterministic persona scoring engine
**Objective:** Produce transparent persona-aligned scores from existing evidence.

**Steps**
1. Audit currently available factor fields from the research DB.
2. Map factors to persona dimensions.
3. Implement weight-based scoring in Python.
4. Persist persona score snapshots with model version IDs and missing-data flags.

**Verify:** unit tests show stable scoring outputs for fixtures; scores degrade gracefully on missing fields.

### `ns-brief-v2-4` — Implement decision synthesis
**Objective:** Turn scores + portfolio context into structured daily actions.

**Steps**
1. Build a decision engine that classifies each candidate/holding.
2. Emit watch triggers, long-candidate setup fields, stop-review flags, and trim/restructure actions.
3. Record rationale as template-driven text from evidence, not LLM prose.
4. Write one “top idea for today” selection rule for the morning brief.

**Verify:** fixture-driven tests produce the expected action class and required fields.

### `ns-brief-v2-5` — Implement portfolio liveness checks
**Objective:** Surface holdings that require governance action before or during the session.

**Steps**
1. Read normalized holdings from the IBKR snapshot path already used by the app.
2. Add deterministic checks for run-up, concentration, exposure, stop drift, and near-term event risk.
3. Persist check outputs for the briefing date.
4. Expose health status and required action via API.

**Verify:** synthetic holdings fixtures trigger trim / stop_review / restructure outputs correctly.

### `ns-brief-v2-6` — Extend the API layer
**Objective:** Expose decision workflow data to the Command Center without overloading the existing briefing endpoint.

**Steps**
1. Add `GET /api/research/decisions`.
2. Add `GET /api/research/portfolio-health`.
3. Optionally enrich `GET /api/research/briefing` with a small summary block only.
4. Add route tests with seeded SQLite fixtures.

**Verify:** API tests pass and response shape stays deterministic.

### `ns-brief-v2-7` — Upgrade the Command Center UI
**Objective:** Make the command center decision-grade rather than informational-only.

**Steps**
1. Keep existing briefing/events/alerts cards intact.
2. Add a **Decision Queue** card showing top actions for the day.
3. Add a **Portfolio Health** card showing trim / stop / restructure items.
4. Add a **Persona Score Matrix** for the top candidate(s), keeping it compact and readable.
5. Add visible fields for watch triggers, risk-reward, targets, and invalidation.

**Verify:** UI renders all required action classes and empty/error/loading states cleanly.

### `ns-brief-v2-8` — Wire the morning-brief workflow
**Objective:** Produce one repeatable market-open operating path.

**Steps**
1. Update the Python briefing job to write or refresh decisions + health checks before the UI reads them.
2. Ensure manual refresh from the Command Center refreshes the new workflow outputs too.
3. Define the “top idea on the table today” selection rule and include it in the summary.
4. Ensure stale / missing data surfaces visible warnings instead of silent fallback.

**Verify:** end-to-end run writes rows, APIs return them, UI renders them.

### `ns-brief-v2-9` — Verification and cleanup
**Objective:** Prove the workflow works and leave the workspace clean.

**Steps**
1. Run targeted TS route tests.
2. Run targeted Python workflow tests.
3. Run one end-to-end local generation flow against a temp or local DB.
4. Remove any temporary fixtures/scripts created only for the task.

**Verify:** test output and live endpoint responses provide positive evidence.

---

## Verification Artifacts

Expected proof points for completion:
- `specs/007-command-center-decision-workflow/spec.md`
- passing `src/server/research/*.test.ts` outputs for the new routes
- passing `scripts/research_engine/tests/test_decision_workflow.py`
- passing `scripts/research_engine/tests/test_portfolio_health.py`
- fresh rows in SQLite for persona scores / decisions / portfolio health
- rendered Command Center showing Decision Queue + Portfolio Health + persona-aware daily call

---

## Delegation Briefs

### Candidate delegate: engineer
**Scope:** Implement one bounded slice at a time (schema, API, or UI), not the whole feature.
**Inputs:** Current plan, relevant spec files, exact target files, seeded fixture expectations.
**Expected output:** Patch summary, changed files, test commands run, concrete results.
**Success criteria:** Code compiles, targeted tests pass, response/UI contract matches the specified slice.

### Candidate delegate: reviewer
**Scope:** Audit deterministic scoring logic and risk-governance outputs.
**Inputs:** Final patch, tests, config weights, sample outputs.
**Expected output:** Risk-focused review with must-fix / nice-to-have separation.
**Success criteria:** No hidden LLM dependence, transparent scoring, no unbounded action generation.

---

## Risks / Tradeoffs

- **Data availability risk:** persona scoring quality depends on current factor coverage in SQLite.
- **Overfitting risk:** copying investor personas too literally will create fake precision; keep them as heuristics, not mythology.
- **UI overload risk:** dumping every metric into Command Center will kill usability; default to a prioritized decision queue.
- **False authority risk:** any action recommendation must visibly disclose missing-data penalties and deterministic source coverage.

---

## Cleanup Note

Keep this plan while the implementation is active. Delete it after the new spec/tasks become the durable source of truth and the feature is complete.
