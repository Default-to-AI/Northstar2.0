"""Morning briefing collector — composes a four-section briefing and writes to morning_briefs.

Sections
--------
pipeline_readiness   — Latest completed pipeline run + its source runs.
pre_market_context   — SPY overnight/after-hours data via yfinance.
top_opportunities    — Top 5 score_snapshots by compounder_score.
portfolio_snapshot   — NAV, cash %, gross exposure from data/ibkr-portfolio.json.

Usage
-----
    python -m scripts.research_engine.briefing
"""

from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any

import yfinance as yf

from scripts.research_engine.db import connect, resolve_db_path
from scripts.research_engine.migrations import migrate

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Section helpers
# ---------------------------------------------------------------------------


def _collect_pipeline_readiness(conn: Any) -> dict[str, Any]:
    """Query the latest completed pipeline run and its source runs.

    Returns
    -------
    dict
        ``{status, runId, completedAt, sources: [{name, tier, status, timestamp, errorMessage}]}``
        or ``{"status": "no_data", "runId": None, ...}`` when no completed runs exist.
    """
    row = conn.execute(
        """
        SELECT id, pipeline_name, completed_at, status, error_summary
        FROM pipeline_runs
        WHERE completed_at IS NOT NULL
          AND status IN ('ready', 'degraded', 'success', 'failed')
        ORDER BY completed_at DESC
        LIMIT 1
        """
    ).fetchone()

    if row is None:
        return {
            "status": "no_data",
            "runId": None,
            "completedAt": None,
            "sources": [],
        }

    source_rows = conn.execute(
        """
        SELECT source_name, tier, status, completed_at, error_message
        FROM source_runs
        WHERE pipeline_run_id = ?
        ORDER BY source_name ASC
        """,
        (int(row["id"]),),
    ).fetchall()

    sources = [
        {
            "name": str(sr["source_name"]),
            "tier": str(sr["tier"]),
            "status": str(sr["status"]),
            "timestamp": str(sr["completed_at"]) if sr["completed_at"] else None,
            "errorMessage": str(sr["error_message"]) if sr["error_message"] else None,
        }
        for sr in source_rows
    ]

    return {
        "status": str(row["status"]),
        "runId": int(row["id"]),
        "completedAt": str(row["completed_at"]) if row["completed_at"] else None,
        "sources": sources,
    }


def _collect_pre_market_context() -> dict[str, Any]:
    """Fetch SPY overnight / after-hours data via yfinance.

    Returns
    -------
    dict
        ``{spyChangePct, futuresDirection, lastClose, note}``
    """
    try:
        ticker = yf.Ticker("SPY")
        hist = ticker.history(period="1d", prepost=True)

        if hist.empty:
            # Fallback: get the last close from a longer history
            hist_long = ticker.history(period="5d")
            if hist_long.empty:
                return {
                    "spyChangePct": None,
                    "futuresDirection": None,
                    "lastClose": None,
                    "note": "No SPY data available from yfinance",
                }
            last_close = float(hist_long["Close"].iloc[-1])
            return {
                "spyChangePct": None,
                "futuresDirection": None,
                "lastClose": last_close,
                "note": "Extended-hours data unavailable; using last close",
            }

        # Determine if we have pre/after-market data beyond regular hours
        # yfinance with prepost=True returns rows with timestamps; if only
        # one row it's likely the regular session close.
        if len(hist) == 1:
            last_close = float(hist["Close"].iloc[-1])
            return {
                "spyChangePct": None,
                "futuresDirection": None,
                "lastClose": last_close,
                "note": "Only regular-session data available; no extended-hours tick",
            }

        # Compare first and last row to infer overnight / extended-hours direction
        first_close = float(hist["Close"].iloc[0])
        last_close = float(hist["Close"].iloc[-1])
        change_pct = ((last_close - first_close) / first_close) * 100.0

        # Heuristic futures direction
        if change_pct > 0.15:
            futures_direction = "bullish"
        elif change_pct < -0.15:
            futures_direction = "bearish"
        else:
            futures_direction = "neutral"

        return {
            "spyChangePct": round(change_pct, 2),
            "futuresDirection": futures_direction,
            "lastClose": round(last_close, 2),
            "note": None,
        }

    except Exception as exc:
        logger.warning("SPY pre-market fetch failed: %s", exc)
        return {
            "spyChangePct": None,
            "futuresDirection": None,
            "lastClose": None,
            "note": f"yfinance fetch failed: {exc}",
        }


def _collect_top_opportunities(conn: Any) -> list[dict[str, Any]]:
    """Query top 5 opportunities by compounder_score.

    Returns
    -------
    list[dict]
        ``[{ticker, name, sector, score}, …]``
        Empty list when no score_snapshots exist.
    """
    rows = conn.execute(
        """
        SELECT s.ticker, s.name, s.sector, ss.compounder_score
        FROM score_snapshots ss
        JOIN securities s ON ss.ticker = s.ticker
        WHERE ss.id IN (
            SELECT MAX(id) FROM score_snapshots GROUP BY ticker
        )
        ORDER BY ss.compounder_score DESC
        LIMIT 5
        """
    ).fetchall()

    return [
        {
            "ticker": str(r["ticker"]),
            "name": str(r["name"]) if r["name"] else None,
            "sector": str(r["sector"]) if r["sector"] else None,
            "score": float(r["compounder_score"]) if r["compounder_score"] is not None else None,
        }
        for r in rows
    ]


def _collect_portfolio_snapshot(repo_root: Path) -> dict[str, Any] | None:
    """Read IBKR portfolio data and extract NAV, cash %, gross exposure.

    Parameters
    ----------
    repo_root : Path
        Repository root path (parent of ``data/``).

    Returns
    -------
    dict or None
        ``{nav, cashPct, grossExposure}`` or ``None`` if file missing / invalid.
    """
    portfolio_path = repo_root / "data" / "ibkr-portfolio.json"
    if not portfolio_path.exists():
        logger.warning("IBKR portfolio file not found: %s", portfolio_path)
        return None

    try:
        with open(portfolio_path) as f:
            data = json.load(f)
    except (json.JSONDecodeError, OSError) as exc:
        logger.warning("Failed to parse IBKR portfolio file: %s", exc)
        return None

    nav = None
    ending_cash = None
    gross_exposure = None

    # Extract NAV
    nav_section = data.get("nav")
    if isinstance(nav_section, dict):
        nav = nav_section.get("endingValue")
        if nav is not None:
            nav = float(nav)

    # Extract ending cash
    cash_section = data.get("cash")
    if isinstance(cash_section, dict):
        ending_cash = cash_section.get("endingCash") or cash_section.get("endingSettledCash")
        if ending_cash is not None:
            ending_cash = float(ending_cash)

    # Calculate gross exposure from positions
    positions = data.get("positions")
    if isinstance(positions, list):
        gross_exposure = sum(
            float(p.get("positionValue", 0) or 0)
            for p in positions
        )

    # Compute cash percentage
    cash_pct = None
    if nav is not None and nav > 0 and ending_cash is not None:
        cash_pct = round((ending_cash / nav) * 100, 2)

    return {
        "nav": nav,
        "cashPct": cash_pct,
        "grossExposure": round(gross_exposure, 2) if gross_exposure is not None else None,
    }


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------


def generate_briefing(
    db_path: str | Path | None = None,
) -> dict[str, Any]:
    """Collect all four sections and write to ``morning_briefs`` table.

    Parameters
    ----------
    db_path : str or Path or None
        Path to the Northstar SQLite database.  Falls back to the
        ``NORTHSTAR_DB_PATH`` env var or ``<repo-root>/data/northstar.db``.

    Returns
    -------
    dict
        The row that was inserted (as a dict keyed by column name).
    """
    resolved = Path(db_path) if db_path else resolve_db_path()
    conn = connect(resolved)

    try:
        migrate(conn)

        # Collect sections
        pipeline_readiness = _collect_pipeline_readiness(conn)
        pre_market_context = _collect_pre_market_context()
        top_opportunities = _collect_top_opportunities(conn)
        repo_root = resolve_db_path().parent  # data/northstar.db → data/ → repo root
        portfolio_snapshot = _collect_portfolio_snapshot(repo_root.resolve())

        # Serialize to JSON strings
        pipeline_json = json.dumps(pipeline_readiness)
        pre_market_json = json.dumps(pre_market_context)
        opportunities_json = json.dumps(top_opportunities)
        portfolio_json = json.dumps(portfolio_snapshot) if portfolio_snapshot is not None else "null"

        # Write with INSERT OR REPLACE
        with conn:
            conn.execute(
                """
                INSERT OR REPLACE INTO morning_briefs
                    (date, pipeline_readiness_json, pre_market_context_json,
                     top_opportunities_json, portfolio_snapshot_json,
                     status, source, generated_at)
                VALUES (date('now'), ?, ?, ?, ?, 'generated', 'cron', datetime('now'))
                """,
                (pipeline_json, pre_market_json, opportunities_json, portfolio_json),
            )

        logger.info("Briefing written for %s", _today_str(conn))

        # Fetch back the row we just wrote
        row = conn.execute(
            "SELECT * FROM morning_briefs WHERE date = date('now')"
        ).fetchone()

        return dict(row) if row else {}

    finally:
        conn.close()


def _today_str(conn: Any) -> str:
    """Return today's date as a string from the DB."""
    r = conn.execute("SELECT date('now') AS d").fetchone()
    return str(r["d"]) if r else "unknown"


def main() -> None:
    """CLI entry point — run ``python -m scripts.research_engine.briefing``."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%H:%M:%S",
    )

    db_path = resolve_db_path()
    logger.info("Database: %s", db_path)

    result = generate_briefing(db_path)
    logger.info(
        "Briefing generated — date=%s status=%s sections=%s",
        result.get("date"),
        result.get("status"),
        _count_sections(result),
    )


def _count_sections(row: dict[str, Any]) -> int:
    """Count non-null JSON section columns."""
    cols = [
        "pipeline_readiness_json",
        "pre_market_context_json",
        "top_opportunities_json",
        "portfolio_snapshot_json",
    ]
    return sum(1 for c in cols if row.get(c) and row[c] != "null")


if __name__ == "__main__":
    main()
