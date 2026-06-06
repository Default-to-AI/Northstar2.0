---
title: "Northstar 2.0 — Agent Instructions"
description: "Hermes agent instructions for Northstar 2.0 — market-open research command center and opportunity engine"
last_updated: 2026-05-26
---

# Northstar 2.0 — Agent Instructions

Read `CONTEXT.md` and `STRATEGY.md` before making any architecture or product decisions.

## Project Identity

Northstar 2.0 is a **market-open research command center and opportunity engine**. Primary job: find, score, and validate US liquid equities/ETFs before and during the US trading session. The portfolio dashboard is context for decisions, not the product nucleus.

## Key Files

| File | Purpose |
|------|---------|
| `STRATEGY.md` | Product direction, KPIs, roadmap — authoritative |
| `CONTEXT.md` | Current architecture, endpoints, known issues — authoritative |
| `AGENTS.md` | ← This file — agent routing rules only |
| `WORKFLOW.md` | Spec-Driven Hermes workflow reference |
| `.specify/memory/constitution.md` | Project constitution and quality gates |
| `specs/<feature>/spec.md` | Active feature spec |
| `specs/<feature>/plan.md` | Active feature plan |
| `specs/<feature>/tasks.md` | Active feature task breakdown |
| `src/server/app.ts` | Express API entry |
| `src/pages/CommandCenter.tsx` | Command Center UI |
| `scripts/research_engine/` | Python batch collectors |

## Workflow

Spec-Driven Hermes. Full reference in `WORKFLOW.md`.

```
spec.md → plan.md → tasks.md → delegate_task → verify → commit
```

## Execution Rules

- Read `CONTEXT.md` before touching existing code — it documents current reality and known issues.
- Read `STRATEGY.md` before planning new features — it defines KPIs, roadmap, and boundaries.
- Each `delegate_task` starts fresh. Include the relevant spec, plan, and task as context. Assume no memory.
- Verify against spec acceptance criteria. Subagent self-report is not sufficient.
- Do NOT modify `docs/adr/` — ADRs are immutable records.
- Do NOT mutate `data/` — raw collected data is write-once.
- Python collectors → `scripts/research_engine/`. TypeScript routes → `src/server/`. UI → `src/pages/` or `src/components/`.
