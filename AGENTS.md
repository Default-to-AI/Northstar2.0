---
title: "Northstar 2.0 — Agent Instructions"
description: "Hermes agent instructions for Northstar 2.0 — market-open research command center and opportunity engine"
---

# Northstar 2.0 — Agent Instructions

This file governs how AI agents work on Northstar 2.0. Read `CONTEXT.md` and `STRATEGY.md` before making major architecture or product decisions.

## Project Identity

Northstar 2.0 is a **market-open research command center and opportunity engine**. Its primary job is to find, score, and validate US liquid equities/ETFs before and during the US trading session. The portfolio dashboard is context for decisions, not the product nucleus.

## Workflow

The project uses a **Spec-Driven Hermes** workflow:

1. **Spec** → `specs/<feature>/spec.md` (what + why)
2. **Plan** → `specs/<feature>/plan.md` (architecture + phases)
3. **Tasks** → `specs/<feature>/tasks.md` (atomic tasks with dependencies)
4. **Execute** → Each task via `delegate_task` with fresh context
5. **Verify** → Against spec acceptance criteria before next wave
6. **Commit** → After each verified wave

Existing planning docs live in `docs/` (ADRs, brainstorms, operations). The `specs/` directory is the canonical active-feature reference.

## Key Files

| File | Purpose |
|------|---------|
| `STRATEGY.md` | Product direction and roadmap |
| `CONTEXT.md` | Current architecture, endpoints, conventions |
| `AGENTS.md` | ← This file — agent operating rules |
| `.specify/memory/constitution.md` | Project constitution |
| `specs/<feature>/spec.md` | Active feature spec |
| `specs/<feature>/plan.md` | Active feature plan |
| `specs/<feature>/tasks.md` | Active feature task breakdown |
| `src/server/app.ts` | Express API entry |
| `src/pages/CommandCenter.tsx` | Command Center UI |
| `scripts/research_engine/` | Python batch collectors |

## Technology Stack

- **Frontend**: React 19 + Vite + TanStack Query + shadcn/ui + Tailwind v4
- **Backend**: Express 4 + TypeScript + better-sqlite3
- **Batch/Data**: Python 3.11+ + pandas + yfinance + finnhub
- **Storage**: SQLite (`research.db`)
- **Portfolio**: IBKR Flex → `data/ibkr-portfolio.json`
- **Agent**: Hermes (primary), Gemini (committee synthesis)
- **Testing**: Node `--test` (TS) + pytest (Python)
- **Build**: esbuild + vite

## Execution Rules

- Each `delegate_task` starts fresh. Include the relevant spec, plan, and task as context.
- Verify against the spec's acceptance criteria, not against vibes. The subagent's self-report is not enough.
- Read `CONTEXT.md` before touching existing code — it documents current reality and known issues.
- Read `STRATEGY.md` before planning new features — it defines the roadmap and boundaries.
- Do NOT modify `docs/adr/` — ADRs record past decisions and are immutable.
- Do NOT modify `data/` — raw data is immutable.
- Python collectors go in `scripts/research_engine/`. TypeScript routes go in `src/server/`. UI components go in `src/pages/` or `src/components/`.

## Slice Roadmap (from STRATEGY.md)

| Slice | Scope | Status |
|-------|-------|--------|
| 1-2 | Foundation + Evidence | ✅ Done |
| 3 | Research Engine | ✅ Done |
| 4 | Decision Loop | ✅ Done (branch `feat/slice-4`) |
| **5** | **Morning Briefing + Events** | **◻ Next** |
| — | Historical Fundamentals Dashboard | ◻ After Slice 5 |
| 6 | Intraday Alerts | ◻ After Slice 5 |
| 7 | Vault Integration | ◻ After Slice 6 |