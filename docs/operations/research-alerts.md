# Research Alerts

## Overview

Alerts are high-confidence, conservatively-scoped exceptions surfaced from score snapshots, evidence packets, and portfolio context. They are framed as **evidence-review prompts**, not trade instructions.

---

## Alert Types

| Type | Severity | Meaning |
|------|----------|---------|
| `pipeline_failure` | `high` | A data source in the pipeline failed. Operator review required before the next research cycle. |
| `review_ready_setup` | `medium` | A ticker has fresh actionable core data and no committee playbook yet. Candidate for committee review. |
| `risk_breach` | `high` | A position or portfolio-level risk guardrail has been breached (risk config bounds, concentration limits, drawdown thresholds). |
| `earnings_filing_shock` | `high` | An earnings or SEC filing event produced an unexpected delta against consensus or prior period. |

---

## Alert Rules

### Pipeline failure

Fires when any `source_runs` row has `status = 'failed'`. One alert per failed source run.

**Trigger:** `source_runs.status = 'failed'`

**Evidence:** `{ sourceName, errorMessage }`

### Review-ready setup

Fires when the latest score snapshot for a ticker has `actionability_state = 'fresh_actionable'` **and** no committee session exists that traces to that score snapshot.

**Trigger:** `score_snapshots.actionability_state = 'fresh_actionable'` AND `committee_sessions` has no matching row.

**Evidence:** `{ actionabilityState, scoreSnapshotId }`

### Risk breach

Fires when:
- A score snapshot's `warnings` JSON array contains risk-related keywords (`risk_breach`, `drawdown`, `concentration`)
- OR portfolio gross exposure exceeds the `maxGrossExposurePct` configured limit

**Trigger:** Warning keywords in score snapshot OR portfolio-level exposure exceedance.

**Evidence:** `{ warnings }` or `{ grossExposurePct, maxGrossExposurePct }`

### Earnings/filing shock

Fires when a score snapshot's `warnings` JSON array contains earnings- or filing-related keywords (`earnings_shock`, `filing_shock`, `guidance_cut`).

**Trigger:** Warning keywords in score snapshot.

**Evidence:** `{ warnings }`

---

## Deduplication

### Lineage key

Each alert generates a composite dedupe key:

```
alertType:ticker:sourceRunId:scoreSnapshotId
```

Alerts with the same key are merged via `INSERT OR IGNORE` into `research_alerts`.

The `id` column is a hash of the lineage key:

```
id = 'al_' + hash(alert_type + ':' + ticker + ':' + sourceRunId + ':' + scoreSnapshotId)
```

### Stale alert cleanup

Each alert generation cycle:
1. Clears active alerts whose `id` is no longer in the generated set (superseded by newer lineage)
2. Clears acknowledged alerts superseded by a newer lineage (same `alert_type` + `ticker`, different hash)

This ensures that when a new pipeline run produces fresh evidence, old alerts for the same ticker are replaced.

---

## Database Schema

### `research_alerts` table

```sql
CREATE TABLE IF NOT EXISTS research_alerts (
    id              TEXT PRIMARY KEY,
    ticker          TEXT NOT NULL,
    alert_type      TEXT NOT NULL,
    severity        TEXT NOT NULL,
    message         TEXT NOT NULL,
    evidence_json   TEXT NOT NULL,
    source_run_id   INTEGER,
    score_snapshot_id INTEGER,
    status          TEXT NOT NULL DEFAULT 'active',
    acknowledged_at TEXT,
    created_at      TEXT NOT NULL
);
```

Status values: `active`, `acknowledged`

---

## API

### GET /api/research/alerts

Returns all active alerts with evidence payloads. Supports `?includeAcknowledged=true` to also return acknowledged alerts.

**Response shape:**

```json
{
  "generatedAt": "2026-05-25T14:30:00.000Z",
  "alerts": [
    {
      "id": "al_3f7a",
      "ticker": "AAPL",
      "alertType": "review_ready_setup",
      "severity": "medium",
      "message": "AAPL is review-ready with fresh evidence and no committee playbook yet.",
      "evidence": { "actionabilityState": "fresh_actionable", "scoreSnapshotId": 42 },
      "sourceRunId": 17,
      "scoreSnapshotId": 42,
      "sourceRunIdLinkage": true,
      "status": "active",
      "acknowledgedAt": null,
      "createdAt": "2026-05-25T14:30:00.000Z"
    }
  ]
}
```

Acknowledged alerts include `acknowledgedAt` timestamp.

### POST /api/research/alerts/:id/acknowledge

Records user acknowledgment without deleting the alert. Sets `status = 'acknowledged'` and records `acknowledged_at`.

**Response (200):**
```json
{
  "id": "al_3f7a",
  "status": "acknowledged",
  "acknowledgedAt": "2026-05-25T14:35:00.000Z"
}
```

**Response (404):**
```json
{
  "error": "Alert not found: al_unknown"
}
```

---

## Evidence-Review Framing

All alerts are framed as requests for evidence review, not trade instructions:

| Alert Type | Surface Language |
|-----------|-----------------|
| `pipeline_failure` | "Pipeline source X failed — operator review required" |
| `review_ready_setup` | "TICKER is review-ready with fresh evidence" |
| `risk_breach` | "TICKER breached risk guardrails — evidence review needed" |
| `earnings_filing_shock` | "TICKER has an earnings/filing shock requiring evidence review" |

---

## Polling

The frontend polls `/api/research/alerts` via TanStack Query. Alerts are refreshed on each poll (stale alerts are cleaned, new alerts are generated from current score snapshots). No WebSocket push in v1.