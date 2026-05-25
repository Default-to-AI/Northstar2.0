from __future__ import annotations

import datetime as dt

from research_engine.db import connect
from research_engine.migrations import migrate


PIPELINE_NAME = "pre-open-pipeline"


def record_pipeline_run() -> int:
    """Initialize the research DB and record a scheduler-safe pipeline lifecycle row."""
    conn = connect()
    try:
        migrate(conn)
        now = dt.datetime.now(dt.timezone.utc).isoformat()
        with conn:
            cursor = conn.execute(
                """
                INSERT INTO pipeline_runs (pipeline_name, started_at, completed_at, trigger, status, error_summary)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (PIPELINE_NAME, now, now, "manual", "ready", None),
            )
            if cursor.lastrowid is None:
                raise RuntimeError("Failed to record pipeline run")
            pipeline_run_id = int(cursor.lastrowid)
            conn.execute(
                """
                INSERT INTO source_runs (pipeline_run_id, source_name, tier, started_at, completed_at, data_as_of, status, retry_count, error_message)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (pipeline_run_id, "manual-initialization", "core", now, now, now, "ready", 0, None),
            )
        print(f"Recorded ready pipeline run {pipeline_run_id} at {now}")
        return pipeline_run_id
    finally:
        conn.close()


if __name__ == "__main__":
    record_pipeline_run()
