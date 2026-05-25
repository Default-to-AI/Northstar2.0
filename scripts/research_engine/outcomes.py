from __future__ import annotations

import datetime as dt
import logging
from pathlib import Path
from typing import Any

from scripts.research_engine.db import connect, resolve_db_path
from scripts.research_engine.migrations import migrate

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Trading-day helpers
# ---------------------------------------------------------------------------
_WEEKEND_DAYS = {5, 6}  # Saturday, Sunday


def _next_trading_day(d: dt.date) -> dt.date:
    """If *d* falls on a weekend, advance to the following Monday."""
    while d.weekday() in _WEEKEND_DAYS:
        d += dt.timedelta(days=1)
    return d


def _forward_target_date(start: dt.date, horizon_days: int) -> dt.date:
    """Return the date *horizon_days* trading days after *start* (skipping weekends)."""
    target = start
    remaining = horizon_days
    while remaining > 0:
        target += dt.timedelta(days=1)
        if target.weekday() not in _WEEKEND_DAYS:
            remaining -= 1
    return target


# ---------------------------------------------------------------------------
# Price helpers
# ---------------------------------------------------------------------------
_SPY_TICKER = "SPY"

_SECTOR_BENCHMARK_MAP: dict[str, str] = {
    "technology": "XLK",
    "consumer cyclical": "XLY",
    "consumer defensive": "XLP",
    "financial services": "XLF",
    "financial": "XLF",
    "healthcare": "XLV",
    "energy": "XLE",
    "industrials": "XLI",
    "basic materials": "XLB",
    "utilities": "XLU",
    "real estate": "XLRE",
    "communication services": "XLC",
    "communication": "XLC",
}


def _sector_benchmark_ticker(sector: str | None) -> str | None:
    """Map a sector name to its representative sector ETF ticker, if known."""
    if not sector:
        return None
    sector_lower = sector.strip().lower()
    for key, etf in _SECTOR_BENCHMARK_MAP.items():
        if key in sector_lower:
            return etf
    return None


def _get_price(
    conn: Any,
    ticker: str,
    target_date: dt.date,
) -> float | None:
    """Return adjusted_close (falling back to close) for *ticker* on or just before *target_date*.

    Gracefully handles a ``daily_prices`` table that predates the ``adjusted_close``
    column (V1 schema) — falls back to ``close`` without crashing.
    """
    try:
        row = conn.execute(
            """
            SELECT adjusted_close, close
            FROM daily_prices
            WHERE ticker = ? AND date <= ?
            ORDER BY date DESC
            LIMIT 1
            """,
            (ticker, target_date.isoformat()),
        ).fetchone()
        if row is None:
            return None
        if row["adjusted_close"] is not None:
            return float(row["adjusted_close"])
        if row["close"] is not None:
            return float(row["close"])
        return None
    except Exception:
        # Fallback: table hasn't been migrated to include adjusted_close
        row = conn.execute(
            """
            SELECT close
            FROM daily_prices
            WHERE ticker = ? AND date <= ?
            ORDER BY date DESC
            LIMIT 1
            """,
            (ticker, target_date.isoformat()),
        ).fetchone()
        if row is None or row["close"] is None:
            return None
        return float(row["close"])


# ---------------------------------------------------------------------------
# Source discovery  —  finds records eligible for outcome tracking
# ---------------------------------------------------------------------------
def _discover_sources(conn: Any) -> list[dict[str, Any]]:
    """Discover eligible source records and return descriptor dicts for seeding.

    Currently discovers:
      - **scanner_signal** records from ``score_snapshots`` (the latest per ticker).
      - **committee_playbook** records from ``committee_sessions`` (if table exists).
    """
    sources: list[dict[str, Any]] = []

    # ── scanner_signal: every actionable score snapshot ─────────────────────
    score_rows = conn.execute(
        """
        SELECT ss.id, ss.ticker, ss.score_model_id, ss.created_at,
               ss.pipeline_run_id, ss.factor_snapshot_id
        FROM score_snapshots ss
        WHERE ss.actionability_state IN ('fresh_actionable', 'blocked_core_stale')
        ORDER BY ss.ticker, ss.created_at DESC
        """
    ).fetchall()

    for row in score_rows:
        source_id = int(row["id"])
        created = str(row["created_at"]) if row["created_at"] else ""
        decision_date = created[:10] if created else dt.date.today().isoformat()

        sources.append(
            {
                "source_type": "scanner_signal",
                "source_id": source_id,
                "ticker": str(row["ticker"]),
                "decision_date": decision_date,
                "horizon_days": 5,
                "score_snapshot_id": source_id,
                "score_model_id": str(row["score_model_id"]) if row["score_model_id"] else None,
            }
        )

    # ── committee_playbook: every committee session with a finalized playbook ──
    try:
        pb_rows = conn.execute(
            """
            SELECT cs.id, cs.ticker, cs.score_snapshot_id, cs.score_model_id,
                   cs.created_at, cs.evidence_packet_id, cs.source_freshness
            FROM committee_sessions cs
            ORDER BY cs.ticker, cs.created_at DESC
            """
        ).fetchall()
    except Exception:
        pb_rows = []  # table may not exist yet

    for row in pb_rows:
        sid_raw = row["id"]
        source_id: int = (
            int(sid_raw) if isinstance(sid_raw, int) else abs(hash(str(sid_raw)))
        )
        created = str(row["created_at"]) if row["created_at"] else ""
        decision_date = created[:10] if created else dt.date.today().isoformat()

        sources.append(
            {
                "source_type": "committee_playbook",
                "source_id": source_id,
                "ticker": str(row["ticker"]),
                "decision_date": decision_date,
                "horizon_days": 5,
                "score_snapshot_id": row["score_snapshot_id"],
                "evidence_packet_id": row["evidence_packet_id"],
                "committee_session_id": str(row["id"]) if row["id"] else None,
                "score_model_id": str(row["score_model_id"]) if row["score_model_id"] else None,
            }
        )

    return sources


# ---------------------------------------------------------------------------
# Seeding  —  idempotent INSERT OR IGNORE into decision_outcomes
# ---------------------------------------------------------------------------
def _seed_pending(conn: Any, sources: list[dict[str, Any]]) -> int:
    """Insert ``(source_type, source_id, horizon_days)`` seed rows.

    Returns the number of rows actually inserted (new seeds).
    """
    seeded = 0
    for src in sources:
        cur = conn.execute(
            """
            INSERT OR IGNORE INTO decision_outcomes
                (source_type, source_id, horizon_days, ticker, decision_date,
                 score_snapshot_id, evidence_packet_id, committee_session_id,
                 score_model_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
            """,
            (
                src["source_type"],
                src["source_id"],
                src.get("horizon_days", 5),
                src["ticker"],
                src["decision_date"],
                src.get("score_snapshot_id"),
                src.get("evidence_packet_id"),
                src.get("committee_session_id"),
                src.get("score_model_id"),
            ),
        )
        # rowcount is 0 for ignored duplicates, 1 for new inserts
        seeded += cur.rowcount

    return seeded


# ---------------------------------------------------------------------------
# Computation  —  forward returns for every pending row
# ---------------------------------------------------------------------------
def _compute_pending(conn: Any) -> int:
    """Compute forward returns for all ``pending``` outcome rows.

    Returns count of rows that changed status.
    """
    pending = conn.execute(
        """
        SELECT * FROM decision_outcomes
        WHERE status = 'pending'
        ORDER BY id ASC
        """
    ).fetchall()

    changed = 0
    for row in pending:
        try:
            _compute_single(conn, row)
            changed += 1
        except Exception as exc:
            logger.error("Failed to compute outcome id=%s: %s", row["id"], exc)

    return changed


def _compute_single(conn: Any, row: Any) -> None:
    """Compute and persist the forward return for a single outcome row."""
    row_id = int(row["id"])
    horizon_days = int(row["horizon_days"])
    ticker = str(row["ticker"])
    decision_date_str = str(row["decision_date"])

    # ── Normalise decision date to a trading day ──────────────────────────
    decision_date = _next_trading_day(
        dt.date.fromisoformat(decision_date_str[:10])
    )
    forward_date = _forward_target_date(decision_date, horizon_days)

    # ── Prices ────────────────────────────────────────────────────────────
    entry_price = _get_price(conn, ticker, decision_date)
    exit_price = _get_price(conn, ticker, forward_date)

    spy_entry = _get_price(conn, _SPY_TICKER, decision_date)
    spy_exit = _get_price(conn, _SPY_TICKER, forward_date)

    # ── Sector benchmark ──────────────────────────────────────────────────
    sector_row = conn.execute(
        "SELECT sector FROM securities WHERE ticker = ?", (ticker,)
    ).fetchone()
    sector_benchmark: str | None = None
    sector_entry: float | None = None
    sector_exit: float | None = None
    if sector_row and sector_row["sector"]:
        bench = _sector_benchmark_ticker(str(sector_row["sector"]))
        if bench is not None:
            sector_benchmark = bench
            sector_entry = _get_price(conn, bench, decision_date)
            sector_exit = _get_price(conn, bench, forward_date)

    # ── Determine outcome status ──────────────────────────────────────────
    if entry_price is None and exit_price is None:
        status = "terminal"
        notes = "No price data available — ticker may be delisted or acquired"
    elif exit_price is None:
        status = "partial"
        notes = f"No forward price data after {forward_date.isoformat()}"
    else:
        status = "computed"
        notes = None

    # ── Compute returns ───────────────────────────────────────────────────
    forward_return: float | None = None
    benchmark_return: float | None = None
    sector_return: float | None = None

    if entry_price is not None and exit_price is not None:
        forward_return = (exit_price - entry_price) / entry_price

    if spy_entry is not None and spy_exit is not None:
        benchmark_return = (spy_exit - spy_entry) / spy_entry
    elif notes is None:
        notes = "SPY benchmark data unavailable"

    if sector_entry is not None and sector_exit is not None:
        sector_return = (sector_exit - sector_entry) / sector_entry

    now_iso = dt.datetime.now(dt.timezone.utc).isoformat()

    # ── Persist ───────────────────────────────────────────────────────────
    conn.execute(
        """
        UPDATE decision_outcomes
        SET decision_price = ?,
            spy_price = ?,
            sector_benchmark = ?,
            sector_return = ?,
            forward_price = ?,
            forward_return = ?,
            benchmark_return = ?,
            status = ?,
            notes = ?,
            computed_at = ?
        WHERE id = ?
        """,
        (
            entry_price,
            spy_entry,
            sector_benchmark,
            sector_return,
            exit_price,
            forward_return,
            benchmark_return,
            status,
            notes,
            now_iso,
            row_id,
        ),
    )


# ---------------------------------------------------------------------------
# Re-run / overlap handling
# ---------------------------------------------------------------------------
def _refresh_computed(conn: Any) -> int:
    """Re-evaluate already-computed rows whose horizon may now be reachable.

    Handles:
      - Rows stuck in ``partial`` that now have forward price data.
      - Rows where more recent price data has become available (overlapping
        windows — most recent data wins).
    """
    refreshed = 0

    # Re-check partial/computed rows where forward data might now exist
    stale = conn.execute(
        """
        SELECT * FROM decision_outcomes
        WHERE status IN ('partial', 'computed')
          AND forward_price IS NULL
        ORDER BY id ASC
        """
    ).fetchall()

    for row in stale:
        try:
            _compute_single(conn, row)
            refreshed += 1
        except Exception as exc:
            logger.warning("Refresh failed for outcome id=%s: %s", row["id"], exc)

    return refreshed


# ===================================================================
# Public API
# ===================================================================


def compute_latest_outcomes(
    db_path: str | Path | None = None,
) -> list[dict[str, Any]]:
    """Discover new sources, seed outcome records, and compute forward returns.

    This is the main entry point for API consumption (e.g. called lazily on
    ``GET /api/research/outcomes``).  It:

    1. Runs migrations (ensures ``decision_outcomes`` table).
    2. Discovers eligible source records (scanner signals, committee playbooks).
    3. Inserts new pending outcome seeds (idempotent via UNIQUE constraint).
    4. Computes forward returns for all pending rows.
    5. Re-checks previously-partial rows for newly available price data.
    6. Returns the most recent outcome records.

    Parameters
    ----------
    db_path : str or Path or None
        Path to the Northstar SQLite database.  Falls back to the
        ``NORTHSTAR_DB_PATH`` env var or ``<repo-root>/data/northstar.db``.

    Returns
    -------
    list[dict[str, Any]]
        List of outcome rows (dicts) from ``decision_outcomes``, ordered by
        computed time descending.
    """
    resolved = Path(db_path) if db_path else resolve_db_path()
    conn = connect(resolved)

    try:
        migrate(conn)

        # Discover and seed
        sources = _discover_sources(conn)

        with conn:
            new_seeds = _seed_pending(conn, sources)

        with conn:
            computed = _compute_pending(conn)

        with conn:
            refreshed = _refresh_computed(conn)

        # Avoid log spam if these happen silently via API
        total = new_seeds + computed + refreshed
        if total > 0:
            logger.info(
                "Outcomes: %d new seeds, %d computed, %d refreshed",
                new_seeds,
                computed,
                refreshed,
            )

        outcomes = conn.execute(
            """
            SELECT *
            FROM decision_outcomes
            ORDER BY computed_at DESC NULLS LAST, created_at DESC
            LIMIT 500
            """
        ).fetchall()

        return [dict(r) for r in outcomes]

    finally:
        conn.close()


# ===================================================================
# CLI entry point
# ===================================================================


def main() -> None:
    """CLI entry point — run ``python -m scripts.research_engine.outcomes``."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%H:%M:%S",
    )

    db_path = resolve_db_path()
    logger.info("Database: %s", db_path)

    results = compute_latest_outcomes(db_path)
    logger.info("Returned %d outcome records", len(results))

    for r in results:
        frepr = f"{r['forward_return']:.4f}" if r["forward_return"] is not None else "N/A"
        brepr = f"{r['benchmark_return']:.4f}" if r["benchmark_return"] is not None else "N/A"
        logger.info(
            "  %s id=%s  %s  %dd  status=%-9s  ret=%-8s  spy=%-8s",
            r["source_type"],
            r["source_id"],
            r["ticker"],
            r["horizon_days"],
            r["status"],
            frepr,
            brepr,
        )


if __name__ == "__main__":
    main()
