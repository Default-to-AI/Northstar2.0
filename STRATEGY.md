---
name: Northstar 2.0
last_updated: 2026-05-23
---

# Northstar 2.0 Strategy

## Target problem

Robert needs a reliable way to find, score, and act on market opportunities before and during the US trading session. The hard part is separating actionable evidence from noisy prices, stale fundamentals, ungrounded AI output, and low-confidence market chatter while keeping portfolio context visible.

## Our approach

Northstar is a research engine first: a hybrid funnel where deterministic data pipelines create broad candidates, the watchlist curates them, and an evidence-grounded committee produces final trade playbooks. The portfolio dashboard is context, not the product nucleus.

## Who it's for

**Primary:** Robert / Singularity operator - hiring Northstar to prepare a fresh market-open command center, surface research opportunities, and turn validated candidates into disciplined trade playbooks.

## Key metrics

- **Decision quality** - 1w/1m/3m forward return of signals and actual decisions versus SPY and relevant sector benchmarks; measured from score/playbook/outcome snapshots in SQLite.
- **Signal readiness rate** - share of top candidates with passing core data freshness, explicit thesis, entry, invalidation, size, and review trigger; measured in the research store.
- **Alert precision** - percentage of intraday alerts that are high-confidence and actionable: buy-ready, risk breach, earnings/filing shock, or pipeline failure; measured from alert logs and user outcomes.
- **Data readiness** - market-open refresh status by tier: core sources must pass; secondary sources may be stale only with visible warnings; measured by the pre-open pipeline run.

## Tracks

The tracks form a loop: data foundation feeds scanner rankings; scanner feeds watchlist and committee; committee produces playbooks; outcomes feed back into score-model governance.

### Data foundation

SQLite-backed research store with securities, daily prices, fundamentals, news/events/chatter, factor snapshots, score snapshots, watchlist links, committee sessions, and decision outcomes.

_Why it serves the approach:_ deterministic evidence must exist before scanner, committee, or alerts can be trusted.

### Opportunity scanner

US liquid equities/ETFs universe seeded from S&P 500, Nasdaq 100, Russell-style proxies, current holdings, and watchlist overlays; ranked into separate compounder and tactical setup queues.

_Why it serves the approach:_ broad deterministic discovery prevents the product from becoming a manual watchlist or LLM-only idea generator.

### Evidence-grounded decision layer

Committee sessions consume normalized evidence packets: factor scores, fundamentals, price/technicals, news, filings, earnings/macro events, portfolio exposure, thesis history, and missing-data flags.

_Why it serves the approach:_ LLM debate is useful as adversarial synthesis, not as the source of truth or primary scoring engine.

### Market-open operations

A scheduled US-market pre-open pipeline refreshes all core data, prepares the command-center briefing, and sends conservative intraday exception alerts for buy-ready setups, risk breaches, earnings/filing shocks, and data failures.

_Why it serves the approach:_ the product wins by having fresh, prioritized evidence ready before decisions are made.

## Not working on

- Broker execution or order placement.
- Options, crypto, or global multi-asset expansion.
- Public cloud deployment before auth, secrets, privacy, and audit rules are hardened.
- Paid market-data dependencies before the free stack proves product value.
- Full SaaS auth, multi-tenancy, or broad team workflows in v1.

## Marketing

**One-liner:** Northstar is a market-open research command center that turns free data, portfolio context, and grounded AI debate into disciplined trade playbooks.

**Key message:** It is not a generic portfolio dashboard. It is a research engine: deterministic scanner first, curated watchlist second, evidence-grounded committee last, with outcome tracking closing the loop.

---

## Delivery Roadmap

| # | Slice | Scope | Status |
|---|-------|-------|--------|
| 1-2 | Foundation + Evidence | IBKR sync, portfolio dashboard, evidence pipeline, scanner, watchlist | ✅ Done |
| 3 | Research Engine | SQLite store, collectors, scoring, APIs, command center UI | ✅ Done |
| 4 | Decision Loop | Grounded committee, risk governance, 4 alert types, outcome tracking, docs | ✅ Done (branch `feat/slice-4`) |
| **5** | **Morning Briefing + Events** | Enriched briefing endpoint, events collector (SEC filings, earnings, macro), pre-open briefing job, morning brief UI on Command Center | ◻ Next |
| **—** | **Historical Fundamentals Dashboard** | **Quarterly fundamentals history table, 4-5y collector (yfinance/SEC), time-series API, 14-chart grid UI. Design reference: `/tmp/builder-io-qualtrim-design`** | ◻ After Slice 5 or parallel |
| **6** | **Intraday Alerts** | Real-time price triggers, risk breach monitoring, earnings/filing shock detection, alert precision KPI, WebSocket push | ◻ After Slice 5 |
| **7** | **Vault Integration** | Link SQLite records to Obsidian notes, auto-create thesis notes from committee sessions, read/search vault from scanner UI | ◻ After Slice 6 |
