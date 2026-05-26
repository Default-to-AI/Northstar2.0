---
title: "Northstar 2.0 — Spec-Driven Workflow Reference Prompt"
description: "Prompt for GPT 5.4 / Codex 3.0 / 5.5 — generates the WORKFLOW.md reference for the real project"
---

# Prompt: Generate the Northstar 2.0 Spec-Driven Workflow Guide

*Feed this prompt to GPT 5.4, Codex 3.0, or Claude 5.5 to produce a complete WORKFLOW.md for the project root.*

---

You are a technical documentation specialist. Your task is to write a comprehensive workflow reference file named `WORKFLOW.md` that will live at the root of the Northstar 2.0 project repository. This file must be self-contained, agent-readable, and precise enough that any AI coding agent can pick it up cold and understand exactly how to work on this project.

## Context

Northstar 2.0 is a market-open research command center and opportunity engine. Its primary job is to find, score, and validate US liquid equities/ETFs before and during the US trading session. The portfolio dashboard is context for decisions, not the product nucleus.

The workflow is a hybrid funnel:
1. Deterministic scanner creates broad candidates.
2. Watchlist curates candidates into active research.
3. Evidence-grounded committee produces final trade playbooks.
4. Outcomes feed back into score-model governance.

### Project Details

- **Repository**: https://github.com/Default-to-AI/Northstar2.0
- **Frontend**: React 19 + Vite + TanStack Query + shadcn/ui + Tailwind v4
- **Backend**: Express 4 + TypeScript + better-sqlite3 (SQLite research store)
- **Batch/Data**: Python 3.11+ + pandas + yfinance + finnhub
- **Portfolio**: IBKR Flex XML → normalized JSON (`data/ibkr-portfolio.json`)
- **Agent**: Hermes Agent (primary), Gemini for committee synthesis
- **Testing**: Node `--test` (TypeScript), pytest (Python)
- **Build**: esbuild + vite
- **Spec System**: Spec-Kit by GitHub (`specify init`)
- **Project Constitution**: `.specify/memory/constitution.md`

### Project Structure

```
northstar2.0/
├── AGENTS.md                          # Agent instructions (Hermes)
├── WORKFLOW.md                        # ← THIS FILE – you are writing this
├── STRATEGY.md                        # Product direction and roadmap
├── CONTEXT.md                         # Current code reality and architecture
├── .specify/                          # Spec-Kit configuration
│   ├── memory/
│   │   └── constitution.md            # Project constitution
│   ├── templates/                     # Spec/plan/task templates
│   └── commands/                      # Slash command files
├── specs/                             # Active feature specs (Spec-Kit format)
│   └── 005-morning-briefing-events/
│       ├── spec.md                    # Slice 5: Morning Briefing + Events
│       ├── plan.md
│       └── tasks.md
├── docs/                              # Planning docs (existing system)
│   ├── adr/                           # Architecture Decision Records
│   ├── agents/                        # Agent-specific instructions
│   ├── brainstorms/                   # Feature brainstorm documents
│   ├── operations/                    # Operational guides
│   └── plans/                         # Previous implementation plans
├── src/
│   ├── server/                        # Express API
│   │   ├── app.ts                     # Main server
│   │   └── research/                  # Research endpoints
│   ├── pages/                         # React pages
│   ├── components/                    # UI components (shadcn/ui)
│   ├── hooks/                         # React hooks
│   ├── lib/                           # Utility libs (risk governance, alerts, etc.)
│   └── services/                      # External service integrations (IBKR)
├── scripts/
│   └── research_engine/               # Python batch collectors
├── config/
│   ├── risk-model/v1.json             # Risk governance config
│   └── score-models/v1.json           # Score model weights
├── data/                              # JSON exports/cache (SQLite is canonical store)
│   ├── ibkr-portfolio.json
│   └── macro-calendar.json
├── components/ui/                     # shadcn/ui components
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Delivery Roadmap (from STRATEGY.md)

| Slice | Scope | Status |
|-------|-------|--------|
| 1-2 | Foundation + Evidence | ✅ Done |
| 3 | Research Engine | ✅ Done |
| 4 | Decision Loop | ✅ Done |
| **5** | **Morning Briefing + Events** | **◻ In spec** |
| — | Historical Fundamentals Dashboard | ◻ After Slice 5 |
| 6 | Intraday Alerts | ◻ After Slice 5 |
| 7 | Vault Integration | ◻ After Slice 6 |

### Active Feature (Slice 5): Morning Briefing + Events

| US | Priority | Summary |
|----|----------|---------|
| US1 | P1 | Morning briefing card: readiness, pre-market context, top opportunities, portfolio snapshot |
| US2 | P1 | Events calendar: earnings, macro, SEC filings for holdings + watchlist |
| US3 | P2 | Pre-open Hermes cron for automated data collection |

7 implementation phases, 17 atomic tasks.

## What to Write

Create `WORKFLOW.md` with these sections:

### 1. Overview (1 paragraph)
What Northstar 2.0 is and what the Spec-Driven Hermes workflow achieves.

### 2. The Spec-Driven Hermes Workflow
Core loop: `spec.md → plan.md → tasks.md → delegate_task → verify → commit`. Explain fresh-context execution and verification gates.

### 3. The Three Files
- **spec.md**: What + why. User stories with priorities (P1/P2/P3), acceptance scenarios in Given/When/Then format. No tech stack.
- **plan.md**: How. Architecture, project structure, implementation phases. Tech stack decisions.
- **tasks.md**: Atomic tasks with dependencies. [P] marks parallel-safe tasks.

### 4. Quality Gates (G0/G1/G2)
Adapted from BMAD. G0 (problem framing before new collector/analysis), G1 (plan review before coding), G2 (verify against spec after implementation).

### 5. The Constitution Principles
Evidence-first, deterministic pipeline, immutable raw data, hybrid architecture (Python batch + TypeScript live), conservative by default.

### 6. Feature Lifecycle
1. Brainstorm → `docs/brainstorms/<date>-<slug>.md` (optional)
2. Spec → `specs/<###>-<feature>/spec.md`
3. G0 gate
4. Plan → `specs/<###>-<feature>/plan.md`
5. G1 gate
6. Tasks → `specs/<###>-<feature>/tasks.md`
7. For each task: delegate_task → verify → commit
8. G2 gate before merge

### 7. Hermes Execution Rules
- Include spec + plan + task as context to each delegate_task
- Fresh context per call — no accumulated history
- Verify actual output, not subagent self-report
- Use `toolsets=["terminal", "file"]` for implementation tasks
- Read CONTEXT.md before touching existing code
- Read STRATEGY.md before planning new features

### 8. Architecture Reference
```
yfinance / Finnhub / IBKR / SEC EDGAR
    ↓ Python collectors (cron-scheduled)
SQLite research store
    ↓ TypeScript/Express API
React frontend (Command Center)
    ↓ User decision
```

Key data flow: raw data → collectors → SQLite → API → UI → user.

### 9. Code Conventions

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

### 10. Common Pitfalls
- Skipping G0 — building without defining the question
- Skipping verification — trusting the subagent's self-report
- Mutating raw data — write-once in SQLite
- Adding paid dependencies before free stack proves value
- Overbuilding v1 — no real-time, no microservices, no cloud SaaS
- LLM-as-source-of-truth — LLM synthesizes evidence, it does not generate it
- Modifying ADRs — past decisions are immutable records

### 11. Quick Reference

```bash
# Install dependencies
npm install
pip install -r scripts/requirements.txt

# Dev server
npm run dev              # TypeScript + Express + Vite

# Tests
npm test                 # TypeScript tests (Node --test)
npm run test:py          # Python tests (pytest)

# Python collectors
python3 -m scripts.research_engine.briefing
python3 -m scripts.research_engine.collect_events

# Pipeline
python3 scripts/run-pipeline.py
python3 scripts/run-scanner.py

# Create a new feature spec
# 1. Write specs/<name>/spec.md
# 2. Write specs/<name>/plan.md
# 3. Write specs/<name>/tasks.md
# 4. Execute via Hermes northstar2-spec-driven skill
```

## Style Requirements
- **Tone**: Direct, technical, no fluff.
- **Format**: Markdown with tables and code blocks.
- **Length**: 300-800 lines.
- **Audience**: AI agents and human operators.

## Output
Write the complete `WORKFLOW.md` file content. Start with a frontmatter block:

```yaml
---
title: "Northstar 2.0 — Spec-Driven Workflow Reference"
description: "Canonical operating reference for AI agents. Spec-Driven Hermes workflow: spec → plan → tasks → execute → verify → commit."
version: 1.0.0
last_updated: 26-05-2026
---
```

Then the full markdown body. Do not include any meta-commentary about the prompt itself.