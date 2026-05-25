from __future__ import annotations

import datetime as dt
import json
from typing import Any

from research_engine.db import connect
from research_engine.migrations import migrate
from research_engine.scoring import calculate_scores, load_model


FACTOR_COLUMNS = [
    "market_cap", "trailing_pe", "forward_pe", "price_to_book", "price_to_sales",
    "ev_to_ebitda", "ev_to_gross_profit", "peg_ratio", "free_cashflow",
    "operating_cash_flow", "gross_margin", "operating_margin", "profit_margins",
    "revenue_growth", "eps", "ebitda", "diluted_net_income", "debt_to_equity",
    "net_cash", "current_ratio", "roe", "roic", "revenue_per_employee",
    "fifty_day_ma", "two_hundred_day_ma", "fifty_two_week_high",
    "fifty_two_week_low", "current_price",
]


def run_scanner() -> None:
    """Create factor and score snapshots for every active security with fundamentals."""
    model = load_model()
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    conn = connect(must_exist=True)
    try:
        migrate(conn)
        latest_run = conn.execute(
            """
            SELECT id FROM pipeline_runs
            WHERE status IN ('ready', 'degraded', 'success') AND completed_at IS NOT NULL
            ORDER BY completed_at DESC, id DESC
            LIMIT 1
            """,
        ).fetchone()
        pipeline_run_id = int(latest_run["id"]) if latest_run else None
        rows = conn.execute(
            f"""
            SELECT s.ticker, f.source_run_id, f.data_as_of, {", ".join(f"f.{column}" for column in FACTOR_COLUMNS)}
            FROM securities s
            JOIN fundamentals f ON s.ticker = f.ticker
            WHERE s.active = 1
            ORDER BY s.ticker
            """,
        ).fetchall()
        with conn:
            conn.execute(
                """
                INSERT OR REPLACE INTO score_model_versions (model_id, version, config_json)
                VALUES (?, ?, ?)
                """,
                (model["model_id"], model.get("version", "unknown"), json.dumps(model, sort_keys=True)),
            )
            for row in rows:
                factors: dict[str, Any] = {column: row[column] for column in FACTOR_COLUMNS}
                result = calculate_scores(factors, model)
                factor_cursor = conn.execute(
                    """
                    INSERT INTO factor_snapshots (
                        ticker, pipeline_run_id, source_run_id, model_id, data_as_of,
                        factors_json, reasons_json, coverage_json, missing_data_json, actionable, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        row["ticker"], pipeline_run_id, row["source_run_id"], model["model_id"], row["data_as_of"],
                        json.dumps(factors, sort_keys=True), json.dumps(result["reasons"]),
                        json.dumps(result["coverage"], sort_keys=True), json.dumps(result["missing_data"]),
                        1 if result["actionable"] else 0, now,
                    ),
                )
                if factor_cursor.lastrowid is None:
                    raise RuntimeError(f"Failed to write factor snapshot for {row['ticker']}")
                conn.execute(
                    """
                    INSERT INTO score_snapshots (
                        ticker, pipeline_run_id, factor_snapshot_id, score_model_id,
                        compounder_score, tactical_score, actionability_state, warnings, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        row["ticker"], pipeline_run_id, int(factor_cursor.lastrowid), model["model_id"],
                        result["compounder_score"], result["tactical_score"], result["actionability_state"],
                        json.dumps(result["warnings"]), now,
                    ),
                )
                print(
                    f"Scored {row['ticker']}: Compounder={result['compounder_score']}, "
                    f"Tactical={result['tactical_score']}, State={result['actionability_state']}"
                )
        print("Scanner run complete.")
    finally:
        conn.close()


if __name__ == "__main__":
    run_scanner()
