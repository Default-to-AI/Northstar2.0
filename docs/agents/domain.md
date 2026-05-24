# Domain docs

This repo uses **single-context** layout.

## Where to look

| Asset               | Path                |
|---------------------|---------------------|
| Domain context      | `CONTEXT.md` (repo root) |
| Architectural decisions | `docs/adr/` (repo root) |

## Rules

- `CONTEXT.md` is **read-only**. Update only on explicit instruction.
- ADRs follow the `NNNN-slug.md` naming convention under `docs/adr/`. Create one when making a notable architecture decision.
- Skills (`improve-codebase-architecture`, `diagnose`, `tdd`) read both files automatically.
