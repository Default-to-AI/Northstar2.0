# 0000 — Initial project setup

## Status

Accepted

## Context

Bootstrapping `northstar-2.0` as a Hermes-managed project. Needed to establish the per-repo agent configuration, define the data pipeline contract, and decide on the tech stack layout.

## Decision

- Single-context layout: one `CONTEXT.md` + `docs/adr/` at repo root
- Issue tracker: GitHub Issues (`Default-to-AI/Northstar2.0`)
- Triage labels: defaults (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`)
- Data pipeline: IBKR Flex XML → `src/services/ibkr/sync.ts` → `data/ibkr-portfolio.json` → FE hooks
- Dev tooling: `tsx --test` for unit tests, `npm run lint`, `npm run build`

## Consequences

- All engineering skills (`tdd`, `diagnose`, `improve-codebase-architecture`) now have read access to `CONTEXT.md` and `docs/adr/`
- GitHub Issues is the authoritative work log; `.scratch/` is not used

