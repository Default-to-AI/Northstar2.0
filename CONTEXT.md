# Northstar 2.0 — Context

## What this is

Northstar 2.0 is a market-open research command center and opportunity engine. Its primary job is to find, score, and validate US liquid equities/ETFs before and during the US trading session; the portfolio dashboard is context for decisions, not the product nucleus.

The workflow is a hybrid funnel:

1. Deterministic scanner creates broad candidates.
2. Watchlist curates candidates into active research.
3. Evidence-grounded committee produces final trade playbooks.
4. Outcomes feed back into score-model governance.

## Product direction

Canonical strategy lives in `STRATEGY.md`.

Core decisions:

- Universe: US liquid equities/ETFs seeded from S&P 500, Nasdaq 100, Russell-style proxies, current IBKR holdings, and watchlist overlays.
- Ranking: separate `Compounder candidates` and `Tactical setups`; only show action priority when quality and setup gates both pass.
- Data architecture: hybrid batch/live system. Python batch jobs collect market/fundamental/event data and calculate factors; TypeScript/Express serves UI contracts and reads SQLite.
- Storage: SQLite is the canonical research store. JSON files are exports/cache only.
- Refresh cadence: US-market pre-open pipeline refreshes core data before 9:30 ET; intraday live quotes/news and cautious IBKR on-demand refresh during the US session.
- Evidence policy: official data drives scores. Rumors, social media, Reddit, and chatter are low-confidence signals only; they can raise review flags and are useful when aligned with official data, but they are not source of truth.
- Output authority: trade playbooks only — entry, stop, target, size, invalidation, and review trigger. No broker execution in v1.

## Tech stack

- Frontend: React + Vite + TanStack Query + shadcn/ui.
- Backend: Express (`src/server/app.ts`) for API contracts and UI-facing routes.
- Batch/data: Python collectors/scoring jobs should own yfinance/pandas-style market collection and factor calculation.
- Storage: SQLite research store for securities, daily prices, fundamentals, news/events/chatter, factor snapshots, score snapshots, watchlist links, committee sessions, alerts, and decision outcomes.
- Portfolio context: IBKR Flex XML → normalized portfolio (`src/services/ibkr/sync.ts`, `src/types/ibkr.ts`) → `data/ibkr-portfolio.json` → frontend hooks.
- Hooks: `src/hooks/useIBKRPortfolio.ts`, `src/hooks/portfolioHydration.ts`, `src/hooks/usePortfolioData.ts`.
- Fallback: seed positions and watchlist in `src/constants.ts` until SQLite-backed state replaces localStorage.

## Current code reality

- `src/pages/Scanner.tsx` is mock/hardcoded and should be replaced by SQLite-backed scanner APIs.
- `src/lib/watchlistEnhancements.ts` has deterministic watchlist scoring, but it is shallow and should become a consumer of stored factor/score snapshots.
- `src/pages/Committee.tsx` and `POST /api/research/committee/session` consume frozen evidence packets; ticker-only requests are rejected. Committee output is validated against evidence citations and risk governance bounds before persistence.
- `src/pages/Dashboard.tsx` and IBKR analytics are useful portfolio context, but should not define the product center of gravity.
- Browser `localStorage` is acceptable for temporary UI state only; durable watchlist/thesis/outcome state should move to SQLite.
- `scripts/research_engine/outcomes.py` computes 1w forward returns for scanner signals and committee playbooks. The `decision_outcomes` table tracks outcomes idempotently via `UNIQUE(source_type, source_id, horizon_days)`.
- Alert rules (`src/lib/alertRules.ts`) emit four types: `pipeline_failure`, `review_ready_setup`, `risk_breach`, `earnings_filing_shock`. Deduplication uses `alert_type + ticker + source_run_id + score_snapshot_id`. Alerts are acknowledged via `POST /api/research/alerts/:id/acknowledge`.

## Key endpoints / planned contracts

Existing:

- `GET /api/portfolio/ibkr` — latest IBKR portfolio snapshot from `data/ibkr-portfolio.json`.
- `GET /api/portfolio/ibkr/analytics` — portfolio analytics against SPY from IBKR snapshot.
- `/api/news/*`, `/api/stock/*`, `/api/market/fear-greed` — market/news support routes.
- `POST /api/committee/session` — legacy ticker-only endpoint; returns error redirecting to evidence-packet flow.
- `POST /api/research/committee/session` — evidence-grounded committee run with risk governance and citation validation.
- `GET /api/research/alerts` — research alerts with four types; refresh on poll, deduplicated by lineage key.
- `POST /api/research/alerts/:id/acknowledge` — user acknowledgment of an alert.
- `GET /api/research/outcomes` — computed forward return records from `decision_outcomes`.
- `GET /api/research/briefing` — command-center morning brief.
- `POST /api/research/briefing/refresh` — runs briefing collector inline and returns refreshed result.
- `GET /api/research/events` — earnings, macro events, and relevant holding/watchlist/candidate catalysts.

Needed:

- `GET /api/research/readiness` — pre-open pipeline source freshness and warnings.
- `GET /api/research/scanner?queue=compounder|tactical` — ranked opportunities from score snapshots.
- `GET /api/research/security/:ticker` — normalized evidence packet for one ticker.

## Conventions

- Read `STRATEGY.md` before planning major product or architecture changes.
- Do not let LLM output become primary source of truth. LLMs synthesize evidence packets; deterministic data and explicit freshness rules drive scores.
- Use tiered data readiness: core sources must pass; secondary sources can be stale only with visible warnings.
- Store score model weights in a versioned config and record score model IDs on every score snapshot.
- Committee sessions require a frozen evidence packet; ticker-only requests are rejected. LLM output is validated against evidence citations and deterministic risk governance before persistence. Risk config lives in `config/risk-model/v1.json`.
- Track decision outcomes prospectively: 1w/1m/3m forward returns versus SPY and relevant sectors. Outcome job runs as `python3 -m scripts.research_engine.outcomes`; idempotent key is `(source_type, source_id, horizon_days)`.
- Default alert policy is conservative: buy-ready setup, risk breach, earnings/filing shock, or data pipeline failure. Alerts deduplicated by `alert_type + ticker + source_run_id + score_snapshot_id`.
- Keep v1 local/private. No broker execution, public cloud, paid data dependency, options/crypto, or full SaaS auth in v1.
- All live portfolio formatting goes through `src/services/ibkr/sync.ts` → `data/ibkr-portfolio.json`.
- FE hydration: `src/hooks/portfolioHydration.ts` normalizes raw IBKR payload into table rows.
- Use the `ibkr-flex-sync-pattern` and `ibkr-portfolio-normalization` skills when touching the IBKR pipeline.

## Obsidian vault

`~/Vault` (`C:\Users\Tiger\Vault`) is the second brain; Vault AGENTS.md governs access rules. Long-form thesis and research notes should live in Obsidian, with SQLite storing structured fields and links back to notes.