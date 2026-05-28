---
title: "Northstar 2.0 — Spec-Driven Workflow Reference"
description: "Canonical operating reference for AI agents. Spec-Driven Hermes workflow: spec → plan → tasks → execute → verify → commit."
version: 1.0.0
last_updated: 26-05-2026
---

# Northstar 2.0 — Spec-Driven Workflow Reference

This repository is a **market-open research command center and opportunity engine**. Northstar’s job is to deterministically collect evidence, score opportunities, and support disciplined decisions on US liquid equities/ETFs before and during the US session. The workflow below exists to keep work **evidence-first, reproducible, conservative-by-default**, and easy for agents (and humans) to execute without drifting scope.

---

## 1) Overview

Northstar 2.0 uses a **Spec-Driven Hermes** workflow: define the product intent in a spec, design an implementation plan, break the plan into atomic tasks, execute tasks with fresh-context subagents, verify against acceptance criteria, then commit in small, auditable slices. This prevents the common failure modes of AI coding: building the wrong thing quickly, trusting self-reported success, and accreting unverified changes.

---

## 2) The Spec-Driven Hermes Workflow

### The core loop

Authoritative loop:

```
spec.md → plan.md → tasks.md → delegate_task → verify → commit
```

**Meaning**

- **spec.md** answers *what and why* (user stories, acceptance scenarios). No stack decisions.
- **plan.md** answers *how* (architecture, phases, integration points, file touch list).
- **tasks.md** makes work *executable* (atomic steps with dependencies, parallel-safe markers).
- **delegate_task** executes each task in a **fresh context window** (no history accumulation).
- **verify** checks real outputs (code, tests, endpoints, UI states) against the spec.
- **commit** records a coherent unit of value with tests green.

### Fresh-context execution (non-negotiable)

Each delegated implementation task must be treated as if the agent has **no memory**. The orchestrator provides:

- the feature’s `spec.md`
- the feature’s `plan.md`
- the **single task** from `tasks.md`
- any file paths / commands / contracts needed

This avoids context drift, keeps each unit focused, and makes verification objective.

### Verification gates

No step is considered “done” until:

- files exist where claimed
- tests (or verification scripts) pass
- acceptance criteria are satisfied
- output is inspected (not just “the agent says it worked”)

---

## 3) The Three Files

### `spec.md` — What + why

**Purpose**: Define product intent in stable terms.

**Contents**

- One-sentence feature summary
- User stories with priorities **P1/P2/P3**
- Acceptance scenarios in **Given / When / Then** format
- Explicit non-goals / scope boundaries

**Rules**

- No tech stack choices.
- No file paths.
- No implementation detail.
- Every P1 must have at least one acceptance scenario.

**Example scenario style**

```
Given the pre-open pipeline ran within the last 2 hours
When I open the Command Center
Then the Morning Briefing card shows “fresh” and lists the top opportunities
```

### `plan.md` — How

**Purpose**: Turn the spec into an implementable approach.

**Contents**

- Architecture decisions and key data flow
- New/changed endpoints and their contracts
- DB schema/migrations (when relevant)
- UI structure (pages/components) and data hooks
- Implementation phases (sequencing constraints)
- “Patterns to follow” links to existing code
- Verification strategy (tests + manual checks)

**Rules**

- Plans are decision artifacts.
- Don’t edit plans as a progress tracker; progress is in git commits.

### `tasks.md` — Atomic execution

**Purpose**: Decompose the plan into independent, verifiable units.

**Contents**

- Tasks as checklists with clear “done” conditions
- Dependencies (explicit)
- `[P]` marker on tasks safe to run in parallel

**Rules**

- A task should be completable in one agent window.
- A task must name the files it touches or creates.
- Every task must include a verification step (tests, endpoint check, UI check).

---

## 4) Quality Gates (G0 / G1 / G2)

Adapted from BMAD-style gating. These gates are explicit pauses to prevent building fast in the wrong direction.

### G0 — Problem framing (before adding collectors/analysis)

**Trigger**: you are about to add a new collector, metric, factor, or pipeline job.

**Checklist**

- What question does this answer?
- What decision does it support?
- What is the minimum deterministic evidence required?
- What is the source-of-truth and update cadence?
- What happens when it is stale or unavailable?

**Pass condition**: You can state the decision supported, inputs, outputs, and failure-mode behavior in 3–5 sentences.

### G1 — Plan review (before implementation)

**Trigger**: you have a spec, and you’re about to start coding.

**Checklist**

- Does `plan.md` satisfy all P1 acceptance scenarios?
- Is the data flow consistent with: collectors → SQLite → API → UI?
- Does the plan honor constraints: no broker execution, no paid dependencies, conservative alerts?
- Does the plan name verification steps and test locations?

**Pass condition**: Plan is coherent, minimal, and verifiable.

### G2 — Verification (after implementation, before merge)

**Trigger**: feature work is “done.”

**Checklist**

- All tests pass (`npm test`, `npm run test:py` where applicable)
- Endpoints respond with correct shapes
- UI renders and handles stale/missing data gracefully
- Acceptance scenarios are demonstrably satisfied

**Pass condition**: Spec acceptance criteria are met; repo is green.

---

## 5) The Constitution Principles

These principles are policy. When in conflict with convenience, **policy wins**.

### Evidence-first

- LLMs synthesize evidence packets; they are **not** the source of truth.
- Official data (prices, financials, filings) drives scores.
- Rumors/social/chatter are **low-confidence** signals only.

### Deterministic pipeline first

Workflow funnel:

1. Deterministic scanner creates broad candidates.
2. Watchlist curates candidates into active research.
3. Evidence-grounded committee produces final trade playbooks.
4. Outcomes feed back into score-model governance.

### Immutable raw data

- Collected data is **write-once**.
- Raw inputs are never mutated; only transformed.
- Pipeline should be reproducible: same inputs + same date ⇒ same outputs.

### Hybrid architecture

- **Batch (Python)** owns collection, factor computation, scoring, outcomes.
- **Live (TypeScript/Express)** owns UI contracts, serving, committee execution, alert evaluation.
- **SQLite** is the canonical store; JSON is export/cache only.

### Conservative by default

- Default alerts: `pipeline_failure`, `review_ready_setup`, `risk_breach`, `earnings_filing_shock`.
- No broker execution in v1.
- No paid data dependencies before free stack proves value.

---

## 6) Feature Lifecycle

### 0. Optional brainstorm

If problem is ambiguous or scope is risky:

- Create: `docs/brainstorms/<date>-<slug>.md`
- Capture: user stories, risks, non-goals, open questions.

### 1. Create spec

- Create folder: `specs/<###>-<feature>/`
- Write: `spec.md`
- Include P1/P2/P3 stories + Given/When/Then acceptance scenarios.

### 2. G0 gate

- Confirm the problem framing for any new collector/analysis.

### 3. Create plan

- Write: `plan.md`
- Include architecture, phases, file map, endpoints, DB changes, verification.

### 4. G1 gate

- Confirm the plan satisfies the spec and is minimal, testable, and consistent with project constraints.

### 5. Create tasks

- Write: `tasks.md`
- Make tasks atomic, dependency-aware, and verifiable.
- Mark parallel-safe tasks with `[P]`.

### 6. Execute tasks (repeat)

For each task:

1) `delegate_task` with fresh context and explicit file touch list
2) Orchestrator verifies real outputs (git diff, tests, endpoint calls)
3) Commit only when green

### 7. G2 gate (before merge)

- Re-check acceptance scenarios.
- Ensure tests and build are green.

---

## 7) Hermes Execution Rules

### Context contract for each `delegate_task`

Each task execution must include:

- `specs/<feature>/spec.md`
- `specs/<feature>/plan.md`
- the exact task text from `specs/<feature>/tasks.md`
- any relevant existing file references (“patterns to follow”)

### Fresh context per call

- Assume subagents have no memory.
- Do not rely on “we already discussed this” inside a subagent prompt.

### Verification is mandatory

- Never accept “tests passed” without running tests or confirming logs.
- Verify file creation/modification with `git status` + `git diff`.

### Toolsets

- Implementation tasks should default to: `toolsets=["terminal", "file"]`.

### Read before change

- Read `CONTEXT.md` before touching existing code.
- Read `STRATEGY.md` before making feature/roadmap decisions.

### Anti-goals / bans

- **No Kanban** workflows in this project (noise + token burn).
- Do not modify `docs/adr/` (ADRs are immutable records).

---

## 8) Architecture Reference

### High-level flow

```
yfinance / Finnhub / IBKR / SEC EDGAR
    ↓ Python collectors (cron-scheduled)
SQLite research store
    ↓ TypeScript/Express API
React frontend (Command Center)
    ↓ User decision
```

### Data flow rule

- Raw data → collectors → SQLite → API → UI → user
- JSON files under `data/` are exports/cache only; SQLite is canonical.

### Slice 5 context (current / next)

From `STRATEGY.md`, the next major slice is:

- **Slice 5: Morning Briefing + Events**
  - Morning briefing card (readiness + context + top opportunities + portfolio snapshot)
  - Events calendar (earnings/macro/SEC filings for holdings + watchlist)
  - Pre-open Hermes cron for automated collection

---

## 9) Code Conventions

### Directory map

| Path | Purpose | Rules |
|------|---------|-------|
| `src/server/` | Express routes + business logic | Typed contracts, `/api/*` routes |
| `src/pages/` | React page components | One per route |
| `src/components/` | Reusable UI | shadcn/ui + custom |
| `src/lib/` | Utility logic | Pure functions where possible |
| `src/hooks/` | React hooks | TanStack Query preferred |
| `scripts/research_engine/` | Python batch collectors | One module per pipeline |
| `config/` | Versioned config files | JSON, schema-defined |
| `data/` | JSON exports/cache | Not canonical — SQLite is store |
| `docs/` | Planning docs | ADRs immutable |

### TypeScript rules (project standard)

- Prefer explicit types for exported functions and API contracts.
- Avoid `any`.
- Keep server routes thin; put business logic in `src/lib/` or focused modules.

### Python collector rules

- One module per pipeline.
- Deterministic inputs/outputs.
- Docstrings + type hints.
- Fail noisily on missing sources; surface freshness state to readiness/briefing.

---

## 10) Common Pitfalls

- **Skipping G0**: building collection/analysis without defining the decision it supports.
- **Skipping verification**: trusting subagent self-report rather than running tests and checking diffs.
- **Mutating raw data**: collected evidence must be write-once; only transformed downstream.
- **Adding paid dependencies early**: prove value on free stack first.
- **Overbuilding v1**: no real-time microservices or cloud SaaS complexity in v1.
- **LLM-as-source-of-truth**: LLMs synthesize; evidence is authoritative.
- **Modifying ADRs**: `docs/adr/` is immutable.

---

## 11) Quick Reference

### Setup

```bash
# Install dependencies
npm install
pip install -r scripts/requirements.txt
```

### Dev server

```bash
npm run dev              # TypeScript + Express + Vite
```

### Tests

```bash
npm test                 # TypeScript tests (Node --test)
npm run test:py          # Python tests (pytest)
```

### Python collectors

```bash
python3 -m scripts.research_engine.briefing
python3 -m scripts.research_engine.collect_events
```

### Pipeline

```bash
python3 scripts/run-pipeline.py
python3 scripts/run-scanner.py
```

### Creating a new feature (Spec-Kit format)

```text
1) Write specs/<###>-<feature>/spec.md
2) Write specs/<###>-<feature>/plan.md
3) Write specs/<###>-<feature>/tasks.md
4) Execute each task via Hermes delegate_task with fresh context
```

---

## Appendix A — Task template (recommended)

Use this pattern inside `specs/<feature>/tasks.md`.

```md
## T<n>: <short task name> [P]

**Goal**: <one sentence>

**Depends on**: T<m>, T<k>

**Files**:
- Create: <paths>
- Modify: <paths>
- Tests: <paths>

**Steps**:
- [ ] <atomic step>
- [ ] <atomic step>

**Verification**:
- [ ] `npm test` (or narrower test target)
- [ ] Manual check: <endpoint/UI>
```

## Appendix B — “Done” definition (repo-level)

A feature slice is only “done” when:

- Spec acceptance scenarios can be walked end-to-end
- SQLite remains canonical; data exports are not treated as source-of-truth
- Tests are green
- Changes are committed in coherent units
