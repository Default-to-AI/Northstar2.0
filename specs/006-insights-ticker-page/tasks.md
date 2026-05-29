# Tasks: Insights Ticker Page (/insights/:ticker)

**Spec**: `specs/006-insights-ticker-page/spec.md`
**Plan**: `specs/006-insights-ticker-page/plan.md`
**Created**: 29-05-2026
**Status**: Draft

## Wave 1 — Contracts + route + UI shell (lock module boundaries)

- [ ] T1: Define TS contract types for insights modules (overview, quote, charts, news, insider trades, estimates)
- [ ] T2: Locate routing entrypoint and add `/insights/:ticker` route to new page `src/pages/InsightsTicker.tsx`
- [ ] T3: Implement page layout shell (grid + cards) matching reference structure; placeholders only

## Wave 2 — Backend minimal slice + contract tests (unblocks real UI)

- [ ] T4: Add server router `/api/insights/:ticker` with **overview + quote + news** endpoints (minimal viable)
- [ ] T5: Add Node `--test` coverage for these endpoints (schema/contract tests, error isolation, unknown ticker behavior)

## Wave 3 — Frontend wiring for minimal slice (end-to-end working page)

- [ ] T6: Wire TanStack Query for overview/quote/news; add per-card loading/empty/error states
- [ ] T7: Manual verification: `/insights/GOOGL` loads; header + KPI band + news render; unknown ticker safe

## Wave 4 — Expand modules + timeframe charts + harden

- [ ] T8: Add `insider-trades` + `analyst-estimates` endpoints + tests
- [ ] T9: Add `charts` endpoint with `timeframe` param + tests; return uniform chart series list
- [ ] T10: Wire charts + timeframe toggle (Quarterly/TTM/Annually) with refetch
- [ ] T11: Styling parity pass (dark cards, spacing, typography) + responsiveness

## Notes

- This task breakdown intentionally starts with UI skeleton + types so we can lock the contract and module boundaries before provider work.
