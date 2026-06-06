# Northstar 2.0 Operating Machine Plan

> **For Hermes:** Use `subagent-driven-development` for execution. Keep work in fresh-context tasks. Verify with real tests/build/runtime checks before any claim of completion.

## Goal

Turn Northstar into a predictable build machine for Slice 5+ work: spec-driven, testable, session-aware for US markets, with deterministic Python collectors, typed TS contracts, visible progress, and low-drama release hygiene.

## KPI Anchor

Per `STRATEGY.md`, optimize for:
- decision quality
- signal readiness rate
- alert precision
- data readiness before US market open

Anything that does not improve deterministic evidence flow, freshness, or operator decision speed is secondary.

## Current Repo Reality

### Good
- Slice 5 scaffolding already exists, not just a blank spec:
  - `src/server/research/briefing.ts`
  - `src/server/research/events.ts`
  - `scripts/research_engine/briefing.py`
  - `scripts/research_engine/collect_events.py`
  - `src/pages/CommandCenter.tsx`
- `npm run lint` passes.
- `npm run build` passes.
- Python tests pass: `python -m unittest discover -s tests -p 'test_*.py'` → `Ran 8 tests ... OK`.

### Bad / blocking
1. `npm test` is broken on this Windows/bash setup.
   - Current script: `tsx --test $(find src -name '*.test.ts' -o -name '*.test.tsx')`
   - Actual failure: `Error [ERR_MODULE_NOT_FOUND]: Cannot find module ... src/index.json`
   - Root cause is the shell-driven test file expansion path, not the test bodies themselves.
   - Manual explicit invocation proves the suite starts correctly with a stable file list / glob approach.
2. After bypassing the broken script, the real TS suite still has existing failures in `src/server/research/insights.test.ts`.
   - `duplicate column name: ticker` from SQLite setup in the insights path
   - chart expectation mismatch (`1 !== 2`)
   - temp-dir cleanup `EPERM` on Windows
   - So the control-plane sequence is: fix test runner wiring first, then fix the underlying insights test failures.
3. Repo is already dirty before new work.
   - Includes deletions of `docs/brainstorms/...`, ADR files, `.specify/memory/constitution.md`, and large `tmp/` trees.
   - Do not assume current working tree is safe or attributable to the next feature slice.
3. `.github/` workflows are absent.
   - No visible CI gate for typecheck/build/tests.
4. `specs/005-morning-briefing-events/spec.md` is still marked `Draft` while substantial code already exists.
5. `specs/005` plan/tasks are too optimistic relative to current reality.
   - Need a re-baseline before more implementation.
6. `.specify/memory/constitution.md` is missing from disk despite AGENTS referencing it.
   - Treat as a real context gap until restored or intentionally replaced.

## External Accelerants Worth Using

### Adopt now
1. `exchange_calendars`
   - Use for deterministic US trading-session logic, holidays, half-days, pre-open guards.
   - Why: Northstar wins or loses on market-session correctness.
2. `APScheduler`
   - Use inside Python-side scheduling or as a reference for deterministic job semantics if Hermes cron remains outer orchestration.
   - Why: retry, cron semantics, explicit schedule objects.
3. `sec-edgar-downloader`
   - Use for official filings ingestion instead of ad hoc scraping.
   - Why: event quality matters more than novelty.
4. `pre-commit`
   - Use for fast local gates across TS, Python, JSON, YAML.
   - Why: cheapest way to reduce garbage commits.
5. `vcrpy`
   - Use for collector tests with recorded HTTP interactions.
   - Why: stop flaky upstream APIs from poisoning tests.

### Adopt later if complexity rises
1. `great_expectations`
   - For data-freshness/schema/null-rate checks on canonical tables.
2. `Dagster`
   - Only if collector graph and observability outgrow Hermes cron + focused Python modules.

## Hermes Skills To Standardize On

### Mandatory for this repo
- `writing-plans` — every non-trivial slice starts with a durable plan
- `subagent-driven-development` — fresh subagent per task, spec review then quality review
- `requesting-code-review` — pre-commit quality gate before merge/push
- `test-driven-development` — for route and collector changes
- `systematic-debugging` — when cross-runtime failures appear

### Situational
- `cross-runtime-service-debugging` — TS route ↔ Python collector ↔ SQLite bugs
- `github-pr-workflow` — when opening PRs and wiring CI enforcement
- `codebase-inspection` — when sizing refactors or finding dead zones

## Operating Workflow — The Machine

## Phase 0 — Recovery / baseline gate

**Objective:** stop building on sand.

### Tasks
- [ ] Capture a recovery handle before edits.
  - Prefer a branch or checkpoint commit if the repo owner wants preservation.
  - At minimum, record `git status --short` and current branch in the task log.
- [ ] Audit current dirty changes into buckets:
  - feature work to keep
  - unrelated deletions
  - generated/cache/tmp noise
  - missing authoritative docs
- [ ] Restore or intentionally replace missing project-governance files before continuing (`.specify/memory/constitution.md`, any required docs referenced by workflow).

### Verification
- [ ] `git status --short` is understood, not ignored.
- [ ] Recovery handle recorded.
- [ ] No ambiguous “mystery deletions” remain in scope.

## Phase 1 — Fix the engineering control plane first

**Objective:** make the repo capable of catching mistakes.

### Tasks
- [ ] Fix `package.json` test script so TypeScript tests run deterministically on this Windows + bash environment.
  - Likely replace shell expansion with a stable Node/tsx entry strategy.
- [ ] Add local quality gates:
  - `npm run lint`
  - `npm test`
  - `python -m unittest discover -s tests -p 'test_*.py'`
  - optional narrower collector tests
- [ ] Add pre-commit config covering:
  - TypeScript typecheck trigger or lightweight script gate
  - Python syntax/test hooks where cheap
  - JSON/YAML validation
  - trailing whitespace / EOF / large file guard
- [ ] Add `.github/workflows/ci.yml` with at least:
  - install deps
  - `npm run lint`
  - `npm test`
  - `python -m unittest discover -s tests -p 'test_*.py'`
  - `npm run build`

### Files likely to change
- `package.json`
- `.github/workflows/ci.yml`
- `.pre-commit-config.yaml`
- optional helper script under `scripts/`

### Verification
- [ ] `npm test` passes locally
- [ ] `npm run lint` passes
- [ ] Python tests pass
- [ ] `npm run build` passes

## Phase 2 — Re-baseline Slice 5 spec against actual code

**Objective:** stop pretending implementation and spec are aligned.

### Tasks
- [ ] Compare live code vs `specs/005-morning-briefing-events/spec.md` acceptance criteria.
- [ ] Update `plan.md` and `tasks.md` to reflect real remaining work, not already-completed scaffolding.
- [ ] Convert remaining work into atomic tasks with file paths and verification per task.
- [ ] Mark parallel-safe tasks explicitly.

### Gaps already visible
- Briefing freshness/staleness semantics need explicit verification.
- Events collector currently uses mixed heuristic logic; official-source priority must be tightened.
- Cron / schedule behavior is specified, but repo-local enforcement artifact is not visible.
- UI/data contracts use broad `unknown` shapes; tighten contracts.

### Files likely to change
- `specs/005-morning-briefing-events/spec.md`
- `specs/005-morning-briefing-events/plan.md`
- `specs/005-morning-briefing-events/tasks.md`

### Verification
- [ ] Each P1 acceptance scenario maps to one or more executable tasks.
- [ ] No already-done work remains as fake pending work.

## Phase 3 — Harden the data contract boundary

**Objective:** reduce cross-runtime ambiguity.

### Tasks
- [ ] Define explicit TS response types for briefing/events payloads.
- [ ] Replace `unknown` in `src/pages/CommandCenter.tsx` briefing parsing with concrete types and narrow validators.
- [ ] Add explicit JSON shape tests for:
  - `GET /api/research/briefing`
  - `POST /api/research/briefing/refresh`
  - `GET /api/research/events`
- [ ] Ensure Python collectors write fields with stable names expected by TS.

### Files likely to change
- `src/server/research/briefing.ts`
- `src/server/research/events.ts`
- `src/pages/CommandCenter.tsx`
- `src/types/` or `src/server/research/types.ts`
- `src/server/research/*.test.ts`

### Verification
- [ ] TypeScript no longer uses loose `unknown` parsing for core Slice 5 payloads.
- [ ] Endpoint tests assert exact response shape.

## Phase 4 — Make pre-open collection session-aware and deterministic

**Objective:** align the workflow with actual US market operations.

### Tasks
- [ ] Add exchange-session guard using `exchange_calendars` or an equivalent deterministic market-calendar layer.
- [ ] Distinguish:
  - trading day pre-open
  - trading day post-open
  - weekend/holiday/no-session
  - half-day / special close
- [ ] Make briefing/events jobs write explicit freshness/readiness state, not just data blobs.
- [ ] Ensure “no trading today” is a first-class status, not an error.

### Files likely to change
- `scripts/research_engine/briefing.py`
- `scripts/research_engine/collect_events.py`
- `src/server/research/briefing.ts`
- schedule/cron config artifact

### Verification
- [ ] simulated weekday pre-open → fresh/generatable
- [ ] weekend/holiday → no-trading status
- [ ] stale previous-day briefing clearly marked in API + UI

## Phase 5 — Tighten source-of-truth policy for events

**Objective:** prevent low-quality catalysts from contaminating decision flow.

### Tasks
- [ ] Move filings closer to official SEC source ingestion (`sec-edgar-downloader` or direct EDGAR client path).
- [ ] Keep macro calendar versioned and explicit.
- [ ] Separate source confidence by event type:
  - SEC official
  - exchange/company calendar
  - Yahoo convenience source
  - manual/static calendar
- [ ] Surface source + freshness in API responses.

### Verification
- [ ] every event row exposes source provenance
- [ ] official data preferred where available
- [ ] fallback source is visible, not silent

## Phase 6 — Execution cadence per feature task

For each remaining Slice 5 task and every future slice:
1. update spec/plan/tasks
2. create or refresh `.hermes/plans/...`
3. mirror stable task IDs into `todo`
4. implement via `delegate_task` with full context:
   - exact task scope
   - files to touch
   - expected output format
   - success criteria
5. run spec-compliance review subagent
6. run code-quality review subagent
7. verify locally with real commands
8. clean up artifacts
9. only then commit

## Suggested Near-Term Task Order

### Task A — Fix broken TS test execution
**Why first:** current repo cannot reliably prove TS changes.

### Task B — Add CI + pre-commit
**Why second:** stop regression leakage while Slice 5 continues.

### Task C — Re-baseline `specs/005`
**Why third:** current plan is stale relative to live code.

### Task D — Harden briefing/events contracts
**Why fourth:** reduces rework before more UI/collector changes.

### Task E — Add session-aware pre-open behavior
**Why fifth:** core product edge.

### Task F — Upgrade event-source quality and freshness semantics
**Why sixth:** improves decision quality, not just feature completeness.

## Proposed Subagent Briefs

### Implementer template
- goal: implement exactly one task
- include:
  - exact spec/plan/task text
  - exact files
  - required tests
  - command outputs expected
- success criteria:
  - changed files match task
  - targeted tests pass
  - no scope creep

### Spec reviewer template
- check only against acceptance criteria and task text
- output: `PASS` or numbered gaps

### Quality reviewer template
- check types, naming, failure modes, tests, security, project conventions
- output: `APPROVED` or `REQUEST_CHANGES` with severity

## Concrete Commands To Use As Standard Verification

```bash
npm run lint
npm test
python -m unittest discover -s tests -p 'test_*.py'
npm run build
```

For Slice 5 runtime checks, add narrow endpoint tests and targeted collector tests before broadening scope.

## Risks
- Current dirty repo state can contaminate new work attribution.
- Slice 5 code may look “mostly there” but still violate acceptance details.
- Yahoo-based data can pass tests yet still be operationally weak without explicit freshness/provenance.
- Without fixing TS test execution first, further feature work is low-trust.

## Definition of Done For “Well-Oiled Machine”
- TS tests pass reliably on this host
- build/lint/python tests all green
- CI exists and enforces the same gates
- Slice 5 spec/plan/tasks match reality
- pre-open workflow is market-session aware
- briefing/events payloads are typed and verified
- source provenance and freshness are explicit
- each future feature follows spec → plan → tasks → implement → verify → cleanup
