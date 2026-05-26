---
title: Northstar 2.0 — Agent Instructions
description: "Hermes agent instructions for the Northstar 2.0 finance dashboard project"
---

# Northstar 2.0 — Agent Instructions

This file governs how AI agents work on Northstar 2.0.

## Project Identity

Northstar 2.0 is a **finance research and decision-support dashboard**. It collects evidence about stocks from multiple sources, analyzes it, and surfaces investment opportunities with clear rationales.

**Key rules:**
- **Evidence-first.** Every recommendation cites its sources. No unsupported claims.
- **Immutable raw data.** Never modify collected data — only transform it.
- **Modular collectors.** One collector per data source. Independent, testable, composable.
- **Dashboard-first UX.** Streamlit is the primary interface.

## Technology Stack

- Python 3.11+
- pandas, numpy for analysis
- yfinance / finnhub / SEC EDGAR for market data
- SQLite for local storage
- Streamlit for dashboard
- pytest for testing
- uv for package management

## Workflow

The project uses the **Spec-Driven Hermes** workflow:

1. **Spec** — `/speckit.specify` or write `specs/<feature>/spec.md` (what + why, no tech stack)
2. **Plan** — `/speckit.plan` or write `specs/<feature>/plan.md` (architecture + tech decisions)
3. **Tasks** — `/speckit.tasks` or write `specs/<feature>/tasks.md` (atomic checkpointed tasks)
4. **Execute** — Each task via Hermes `delegate_task` with fresh context
5. **Verify** — Check output against spec's acceptance criteria before next wave
6. **Commit** — `git add` + `git commit` after each verified wave

## Execution Rules

- Each `delegate_task` call starts fresh. Include the relevant spec and task context explicitly.
- Do NOT skip the verify step between waves. Verify against the spec, not against vibes.
- Use the constitution (`.specify/memory/constitution.md`) for project principles and quality gates.
- When creating new collectors or analysis modules, always define what question they answer first (G0 gate).

## Reference Files

- `.specify/memory/constitution.md` — Project constitution (principles, gates, stack)
- `specs/<feature>/spec.md` — Feature specification
- `specs/<feature>/plan.md` — Implementation plan
- `specs/<feature>/tasks.md` — Task breakdown
- Collectors go in `collectors/` — one file per data source
- Analyzers go in `analyzers/` — one file per signal type
- Dashboard code goes in `dashboard/`
- Raw data goes in `data/raw/` (immutable)
- Processed data goes in `data/processed/`