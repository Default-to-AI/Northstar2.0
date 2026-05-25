# Research Outcomes

## Overview

Outcome tracking computes forward returns for scanner signals, committee playbooks, and accepted/rejected decisions. It measures Northstar's decision quality by comparing security returns against SPY and sector benchmarks over configurable horizons.

---

## Database Schema

### `decision_outcomes` table

Created by V2 migration. Tracks both **signal outcomes** (scanner-generated scores) and **decision outcomes** (user-accepted/rejected committee playbooks).

```sql
CREATE TABLE IF NOT EXISTS decision_outcomes (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    source_type         TEXT NOT NULL CHECK(source_type IN ('scanner_signal','committee_playbook','user_decision','alert')),
    source_id           INTEGER NOT NULL,
    horizon_days        INTEGER NOT NULL DEFAULT 5,
    ticker              TEXT NOT NULL,
    decision_date       TEXT NOT NULL,
    decision_price      REAL,
    spy_price           REAL,
    sector_benchmark    TEXT,
    sector_return       REAL,
    forward_price       REAL,
    forward_return      REAL,
    benchmark_return    REAL,
    status              TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','computed','partial','terminal')),
    score_snapshot_id   INTEGER,
    evidence_packet_id  TEXT,
    committee_session_id TEXT,
    score_model_id      TEXT,
    source_freshness    TEXT,
    notes               TEXT,
    created_at          TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    computed_at         TEXT,
    UNIQUE(source_type, source_id, horizon_days),
    FOREIGN KEY(ticker) REFERENCES securities(ticker)
);
```

### Status values

| Status | Meaning |
|--------|---------|
| `pending` | Seed row inserted, not yet computed |
| `computed` | Forward return successfully computed for both security and benchmark |
| `partial` | Forward price data partially available (e.g. benchmark missing) |
| `terminal` | No price data at all — ticker may be delisted or acquired |

### Source types

| `source_type` | Source of outcome record |
|---------------|------------------------|
| `scanner_signal` | Score snapshot (actionable) |
| `committee_playbook` | Committee session with finalized playbook |
| `user_decision` | User accepted/rejected decision (future) |
| `alert` | Alert-triggered decision tracking (future) |

---

## Idempotency

The `UNIQUE(source_type, source_id, horizon_days)` constraint ensures idempotency. Re-running the outcome job:

- **Seeds** new rows via `INSERT OR IGNORE` — duplicates are silently skipped
- **Computes** pending and partial rows (previously-computed rows are not re-computed by default)
- **Refreshes** rows stuck in `partial` where forward price data may now exist

This means re-running the job is safe and produces no duplicate outcome records.

---

## Job Usage

### CLI

```sh
python -m scripts.research_engine.outcomes
```

The job:
1. Runs migrations (ensures `decision_outcomes` table exists)
2. Discovers eligible source records from `score_snapshots` (latest actionable per ticker) and `committee_sessions`
3. Inserts new pending outcome seeds (idempotent via UNIQUE constraint)
4. Computes forward returns for all pending rows
5. Re-checks previously-partial rows for newly available price data
6. Prints outcome summary to stdout

### Programmatic API

```python
from scripts.research_engine.outcomes import compute_latest_outcomes

results = compute_latest_outcomes()  # uses NORTHSTAR_DB_PATH or default
```

Returns `list[dict[str, Any]]` of outcome records ordered by computed time descending.

### Trading-day awareness

- Weekend decision dates are advanced to Monday
- Forward target dates skip weekends (no US market holiday calendar in v1)
- Price lookup uses `adjusted_close` (falling back to `close`) on or just before the target date

### Benchmark mapping

| Sector | Benchmark ETF |
|--------|---------------|
| Technology | XLK |
| Consumer Cyclical | XLY |
| Consumer Defensive | XLP |
| Financial Services / Financial | XLF |
| Healthcare | XLV |
| Energy | XLE |
| Industrials | XLI |
| Basic Materials | XLB |
| Utilities | XLU |
| Real Estate | XLRE |
| Communication Services / Communication | XLC |

Missing sector benchmark data is recorded as fallback (non-fatal). The job logs a warning and continues.

### Refresh behavior

Rows with status `partial` or `computed` but `forward_price IS NULL` are re-checked on each run. If forward price data becomes available in a later run, the row is updated with the newly computed return.

---

## API

### GET /api/research/outcomes

Returns computed outcome records from `decision_outcomes`. Supports filtering by `sourceType`, `status`, and `ticker`.

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number (1-1000) | Max records to return (default: 200) |
| `sourceType` | string | Filter by source type (`scanner_signal`, `committee_playbook`) |
| `status` | string | Filter by status (`pending`, `computed`, `partial`, `terminal`) |
| `ticker` | string | Filter by ticker (case-insensitive, normalized to uppercase) |

**Response shape:**

```json
{
  "generatedAt": "2026-05-25T14:30:00.000Z",
  "dataAsOf": "2026-06-01T14:30:00.000Z",
  "outcomes": [
    {
      "id": 1,
      "sourceType": "scanner_signal",
      "sourceId": 42,
      "horizonDays": 5,
      "ticker": "AAPL",
      "decisionDate": "2026-05-25",
      "decisionPrice": 185.50,
      "spyPrice": 520.10,
      "sectorBenchmark": "XLK",
      "sectorReturn": 0.0123,
      "forwardPrice": 190.20,
      "forwardReturn": 0.0253,
      "benchmarkReturn": 0.0101,
      "status": "computed",
      "scoreSnapshotId": 42,
      "evidencePacketId": "evp_abc123",
      "committeeSessionId": "cms_1712345678",
      "scoreModelId": "v1",
      "sourceFreshness": null,
      "notes": null,
      "createdAt": "2026-05-25T14:30:00.000Z",
      "computedAt": "2026-06-01T14:30:00.000Z"
    }
  ]
}
```

---

## Manual Notes / Verdicts

Manual notes and user verdicts (accepted/rejected) are stored separately from quantitative return outcomes. The schema supports `notes` text column; future extensions may add a `verdict` table linked by `committee_session_id`.

---

## KPI Computation

Decision-quality KPIs can be computed from SQLite:

```sql
-- Average forward return by source type (1w horizon)
SELECT source_type,
       AVG(forward_return) as avg_return,
       AVG(benchmark_return) as avg_benchmark,
       COUNT(*) as n
FROM decision_outcomes
WHERE status = 'computed' AND horizon_days = 5
GROUP BY source_type;

-- Win rate (outperforming SPY)
SELECT source_type,
       COUNT(*) as total,
       SUM(CASE WHEN forward_return > benchmark_return THEN 1 ELSE 0 END) as wins,
       ROUND(100.0 * SUM(CASE WHEN forward_return > benchmark_return THEN 1 ELSE 0 END) / COUNT(*), 1) as win_rate_pct
FROM decision_outcomes
WHERE status = 'computed' AND horizon_days = 5
GROUP BY source_type;
```