# 0002 — Research decision loop

## Status

Accepted

## Context

Phase 1 and Phase 2 established the deterministic data pipeline (SQLite research store, daily prices, fundamentals, factor computation, scoring) and the product surface (research APIs, command-center UI, scanner queues, durable watchlist, pipeline-failure alerts). The remaining gap was the **Decision Loop** — the workflow that converts frozen evidence into validated playbooks, surfaces high-confidence alerts, and measures decision quality through forward return tracking.

Three interconnected problems needed to be solved:

1. **Committee was ungrounded.** The existing `POST /api/committee/session` endpoint accepted a ticker string and called Gemini with no evidence context. There was no mechanism to prevent LLM drift, no evidence-packet freeze, no citation validation, and no persistence of session lineage.

2. **Alerts were limited.** Only pipeline-failure alerts existed. There was no detection for review-ready setups, risk breaches, or earnings/filing shocks. Alerts lacked user acknowledgment semantics.

3. **Outcomes were not tracked.** Scanner signals and committee playbooks were produced but their forward returns were never computed. There was no feedback loop to measure decision quality against SPY or sector benchmarks.

## Decision

### Committee grounding (evidence-packet-grounded sessions)

- Committee sessions require a frozen evidence packet ID, not a ticker. Ticker-only requests are rejected with a clear error.
- Evidence packets are frozen by the Phase 2 evidence-freeze endpoint. The committee endpoint reads the frozen packet and rejects empty or stale-core payloads before any LLM call.
- Every committee session persists full lineage: evidence packet hash, score snapshot ID, score model ID, LLM model/version, prompt version, schema version, source freshness, and the final playbook JSON.
- LLM output is validated before persistence: all cited evidence must exist in the frozen packet (by evidence field path or `evidence_packet:<id>` reference). Citations absent from the packet are rejected.
- Every playbook entry is validated by deterministic risk governance before persistence.

### Risk governance (deterministic size enforcement)

- Risk governance is pure deterministic TypeScript (`src/lib/riskGovernance.ts`) that reads a versioned configuration (`config/risk-model/v1.json`).
- The LLM may explain sizing rationale, but the deterministic code computes the allowed size range. Proposed sizes exceeding risk bounds are capped.
- Risk violations produce advisory warnings visible in the committee UI. The playbook is persisted even with violations (marked for user review), but missing required playbook fields or absent evidence citations block persistence entirely.

### Alert extensions (conservative rules, deduplication, acknowledgment)

- Alert types are a typed union: `pipeline_failure`, `review_ready_setup`, `risk_breach`, `earnings_filing_shock`.
- Alert rule detection is pure TypeScript (`src/lib/alertRules.ts`) consuming score snapshots, evidence packets, and portfolio context.
- Deduplication uses a composite lineage key: `alert_type + ticker + source_run_id + score_snapshot_id`. Alerts with the same key are merged via `INSERT OR IGNORE`.
- User acknowledgment via `POST /api/research/alerts/:id/acknowledge` sets `status = 'acknowledged'` without deleting the alert. Superseded alerts (new lineage for the same type+ticker) are automatically cleaned.
- Alerts are framed as evidence-review prompts, not trade instructions.

### Outcome tracking (forward return computation)

- The `decision_outcomes` table tracks both signal outcomes (scanner signals) and decision outcomes (committee playbooks).
- Idempotency is enforced by `UNIQUE(source_type, source_id, horizon_days)` — re-running the outcome job produces zero duplicate rows.
- The outcome job runs as a standalone Python script (`python -m scripts.research_engine.outcomes`) matching the existing collector/scoring pattern.
- Forward returns are computed using trading-day-aware logic (skip weekends, no US holiday calendar in v1), preferring `adjusted_close` with `close` fallback.
- Benchmark comparison: SPY + sector-specific ETF mapping (XLK, XLF, XLV, etc.). Missing benchmark data is recorded as fallback (non-fatal).
- The API (`GET /api/research/outcomes`) serves computed outcome records with filtering by source type, status, and ticker.
- Missing price data, delisted/acquired tickers, and overlapping windows are handled gracefully: status `partial` or `terminal` with explanatory notes.

## Consequences

- All committee sessions now trace to frozen evidence packets, score snapshots, and deterministic risk boundaries. No ungrounded LLM analysis can be persisted.
- The old ticker-only committee endpoint is replaced. Existing callers must go through the evidence-freeze flow first.
- Alert surface is expanded from pipeline failures to four types, with deduplication that survives pipeline re-runs.
- Outcome quality can be measured: win rate vs SPY, average forward return by source type, and sector-relative performance.
- The outcome job is idempotent and safe to run on a cron schedule (deferred to follow-up work).
- Risk governance is config-driven and versioned. Adjusting risk bounds requires updating `config/risk-model/v1.json`, not code changes.
- LLM provider stays on the already-configured Gemini model. The evidence-packet contract is provider-agnostic; switching providers would only affect the committee synthesis layer.
- Future outcome dashboards and alert-precision UIs can consume the structured outcome and alert data without schema changes.