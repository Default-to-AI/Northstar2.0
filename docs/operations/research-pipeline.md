# Research Pipeline

## Overview

The research pipeline is a batch-oriented Python process that collects market data (daily prices, fundamentals, factor snapshots) and scores the universe. It represents the deterministic data-collection and scoring layer of Northstar 2.0 — the foundation that the evidence-grounded committee and alert rules consume.

---

## Commands

### Record a pipeline lifecycle

```sh
python -m scripts.run_pipeline
```

Records a pipeline run and a core source run as `ready` in the research store. Used during development and scheduling to initialize the pipeline lifecycle tracking.

### Full pipeline execution

Slice 1/2 collectors and scoring jobs are invoked individually:

```sh
# Run migrations then collect daily prices
python -m scripts.research_engine.migrations          # ensure schema
python -m scripts.research_engine.collect_prices       # daily price collection
python -m scripts.research_engine.collect_fundamentals # fundamental data
python -m scripts.research_engine.compute_factors      # factor computation
python -m scripts.research_engine.score_universe       # scoring pass
```

Future: a single orchestrator script (`scripts/research_engine/pipeline.py`) will sequence these steps.

### Outcome tracking

```sh
python -m scripts.research_engine.outcomes
```

Discovers new sources (scanner signals, committee playbooks), seeds `decision_outcomes` rows, and computes forward returns. Idempotent — safe to re-run. See [research-outcomes.md](research-outcomes.md).

---

## Source Tiers

Sources in the research store carry a `tier` field on `source_runs` rows:

| Tier | Behavior | Examples |
|------|----------|---------|
| **core** | Must be fresh for pipeline readiness. Stale core data blocks committee sessions and buy-ready alerts. | Daily prices, fundamentals, SEC filings, earnings |
| **secondary** | Can be stale with visible warnings. Committee and scoring degrade gracefully with advisory notes. | Sentiment, alternative data, social media signals |

The `actionability_state` on `score_snapshots` reflects tier status:
- `fresh_actionable` — core data is current
- `blocked_core_stale` — core data is stale; committee sessions are blocked

---

## Database

**Location:** `data/northstar.db` (repo-relative)

The path is resolved by `scripts/research_engine/db.py`:
1. `NORTHSTAR_DB_PATH` environment variable if set
2. Otherwise `data/northstar.db` relative to the repository root

### Connection settings

- Journal mode: WAL
- Busy timeout: 5000 ms
- Foreign keys: ON
- Row factory: `sqlite3.Row`

---

## Migration Behavior

Migrations are applied idempotently via `scripts/research_engine/migrations.py` (`SCHEMA_VERSION = 2`):

- **V1 (Phase 1/2):** Creates core research store tables (`pipeline_runs`, `source_runs`, `securities`, `daily_prices`, `fundamentals`, `factor_snapshots`, `score_snapshots`, `score_model_versions`, `universe_memberships`, `security_identifiers`).
- **V2 (Phase 3):** Adds `decision_outcomes` table for forward return tracking with `UNIQUE(source_type, source_id, horizon_days)`.
- **Column backfill:** Missing columns from earlier partial schemas are added via `ALTER TABLE ... ADD COLUMN` (non-destructive).
- **Legacy backfill:** Legacy `ticker_evidence` rows are copied into `securities` and `fundamentals` tables.

Migrations run automatically when:
- The pipeline lifecycle is recorded (`scripts/run-pipeline.py`)
- The outcome job runs (`scripts/research_engine/outcomes.py`)
- The API server opens the database for alerts/outcomes routes

No destructive drops. All migrations are `CREATE TABLE IF NOT EXISTS` / `ALTER TABLE ADD COLUMN IF NOT MISSING`.

---

## Troubleshooting

### Database not found

```text
FileNotFoundError: Northstar DB not found: /path/to/data/northstar.db
```

Run migrations first:
```sh
python -c "from scripts.research_engine.migrations import migrate; from scripts.research_engine.db import connect; migrate(connect())"
```

### WAL file growth

SQLite WAL files (`data/northstar.db-wal`, `data/northstar.db-shm`) are normal. Periodic `PRAGMA wal_checkpoint(TRUNCATE)` can shrink them.

### Stale core blocks committee

If `POST /api/research/committee/session` returns a `blocked_core_stale` error:
1. Run the pipeline collectors to refresh core sources
2. Freeze a new evidence packet
3. Retry the committee session

### Alert dedupe not firing

Check `research_alerts` table: alerts are deduplicated by `(alert_type, ticker, source_run_id, score_snapshot_id)`. If source runs are not recorded, dedupe may produce duplicates. Ensure pipeline lifecycle runs are recorded before alert generation.

### Missing `decision_outcomes` table

Run outcome job:
```sh
python -m scripts.research_engine.outcomes
```

The outcome job calls `migrate()` which creates the table if missing.

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NORTHSTAR_DB_PATH` | Override research DB path |
| `GEMINI_API_KEY` | Required for committee LLM synthesis |
| `GEMINI_MODEL` | Gemini model name (default: `gemini-2.5-flash`) |

No secrets in docs. API keys are set in `.env.local` or environment.