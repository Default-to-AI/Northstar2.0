from __future__ import annotations

import datetime as dt
import json
import logging
import time
from pathlib import Path
from typing import Any

import yfinance as yf

from scripts.research_engine.db import connect, resolve_db_path
from scripts.research_engine.migrations import migrate

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
SOURCE_NAME = "collect_events"
YFINANCE_SLEEP = 1.05  # seconds between yfinance API calls (>1 req/s)
DATA_DIR = Path(__file__).resolve().parents[2] / "data"
MACRO_CALENDAR_PATH = DATA_DIR / "macro-calendar.json"


# ===================================================================
# Helper: ticker universe
# ===================================================================
def _get_ticker_universe(conn: Any) -> list[str]:
    """Return the union of active securities and IBKR portfolio positions.

    1. SELECT ticker FROM securities WHERE active=1
    2. Read tickers from data/ibkr-portfolio.json (positions[].symbol)
    3. Return sorted unique list.
    """
    tickers: set[str] = set()

    # Active securities from DB
    for row in conn.execute("SELECT ticker FROM securities WHERE active=1"):
        t = str(row["ticker"]).strip().upper()
        if t:
            tickers.add(t)

    # IBKR portfolio
    ibkr_path = DATA_DIR / "ibkr-portfolio.json"
    if ibkr_path.exists():
        try:
            portfolio = json.loads(ibkr_path.read_text())
            for pos in portfolio.get("positions", []):
                sym = str(pos.get("symbol", "")).strip().upper()
                if sym:
                    tickers.add(sym)
        except (json.JSONDecodeError, OSError) as exc:
            logger.warning("Could not read IBKR portfolio: %s", exc)

    result = sorted(tickers)
    logger.info("Ticker universe: %d unique tickers", len(result))
    return result


# ===================================================================
# Phase 1: Earnings collector
# ===================================================================
def _collect_earnings(conn: Any, tickers: list[str]) -> int:
    """Query yfinance for upcoming earnings dates for each ticker.

    Calls:
      - yfinance.Ticker(t).calendar  (next earnings date)
      - yfinance.Ticker(t).earnings_dates  (upcoming within 30 days)

    Inserts into market_events with event_type='earnings'.
    Returns count of events inserted.
    """
    logger.info("Phase 1: Collecting earnings events for %d tickers ...", len(tickers))

    # Clear existing earnings events
    conn.execute("DELETE FROM market_events WHERE event_type='earnings'")
    conn.commit()

    inserted = 0
    now = dt.datetime.now(dt.timezone.utc)
    now_iso = now.isoformat()
    cutoff = now.date() + dt.timedelta(days=30)
    today = now.date()

    for i, ticker in enumerate(tickers):
        # Rate limiting
        if i > 0:
            time.sleep(YFINANCE_SLEEP)

        try:
            t = yf.Ticker(ticker)
        except Exception:
            logger.debug("Failed to create Ticker for %s — skipping", ticker)
            continue

        dates_found: set[dt.date] = set()

        # Method 1: .calendar for next earnings
        try:
            cal = t.calendar
            if cal:
                earn_date = cal.get("Earnings Date") or cal.get("earningsDate")
                if earn_date:
                    # Could be a Timestamp or a list of Timestamps
                    if isinstance(earn_date, list):
                        for ed in earn_date:
                            if hasattr(ed, "date"):
                                d = ed.date()
                                if today <= d <= cutoff:
                                    dates_found.add(d)
                    elif hasattr(earn_date, "date"):
                        d = earn_date.date()
                        if today <= d <= cutoff:
                            dates_found.add(d)
        except Exception:
            pass  # fall through to earnings_dates

        # Method 2: .earnings_dates for upcoming range
        try:
            edf = t.earnings_dates
            if edf is not None and not edf.empty:
                for idx in edf.index:
                    try:
                        if hasattr(idx, "date"):
                            d = idx.date()
                        elif hasattr(idx, "to_pydatetime"):
                            d = idx.to_pydatetime().date()
                        else:
                            d = dt.datetime.fromisoformat(str(idx)[:10]).date()
                        if today <= d <= cutoff:
                            dates_found.add(d)
                    except (ValueError, TypeError):
                        continue
        except Exception:
            pass

        if not dates_found:
            logger.debug("No upcoming earnings found for %s", ticker)
            continue

        date_strs = sorted(d.isoformat() for d in dates_found)
        title = f"Earnings: {ticker}"
        description = f"Upcoming earnings dates: {', '.join(date_strs)}"

        for ev_date in date_strs:
            conn.execute(
                """INSERT INTO market_events
                   (event_type, ticker, event_date, title, description, source, relevant_holdings, created_at)
                   VALUES ('earnings', ?, ?, ?, ?, ?, '[]', ?)""",
                (ticker, ev_date, title, description, SOURCE_NAME, now_iso),
            )
            inserted += 1

        logger.debug("  %s → %d earnings dates", ticker, len(date_strs))

    conn.commit()
    logger.info("Phase 1 complete: %d earnings events inserted", inserted)
    return inserted


# ===================================================================
# Phase 2: Macro collector
# ===================================================================
def _collect_macro(conn: Any) -> int:
    """Read static macro-calendar.json and insert macro events.

    Also deletes stale macro events older than 7 days.
    Always deletes-and-reinserts macro events (clean sweep).
    Returns count of events inserted.
    """
    logger.info("Phase 2: Collecting macro events ...")

    if not MACRO_CALENDAR_PATH.exists():
        logger.warning("Macro calendar not found: %s", MACRO_CALENDAR_PATH)
        return 0

    try:
        entries = json.loads(MACRO_CALENDAR_PATH.read_text())
    except (json.JSONDecodeError, OSError) as exc:
        logger.warning("Failed to load macro calendar: %s", exc)
        return 0

    now = dt.datetime.now(dt.timezone.utc)
    now_iso = now.isoformat()
    today = now.date()

    # Delete stale macro events (>7 days old)
    stale_cutoff = (today - dt.timedelta(days=7)).isoformat()
    deleted_stale = conn.execute(
        "DELETE FROM market_events WHERE event_type='macro' AND event_date < ?",
        (stale_cutoff,),
    ).rowcount

    # Delete all macro events to refresh
    conn.execute("DELETE FROM market_events WHERE event_type='macro'")
    conn.commit()

    inserted = 0
    for entry in entries:
        ev_date = str(entry.get("date", "")).strip()
        title = str(entry.get("title", "")).strip()
        description = entry.get("description", "")

        if not ev_date or not title:
            continue

        conn.execute(
            """INSERT INTO market_events
               (event_type, ticker, event_date, title, description, source, relevant_holdings, created_at)
               VALUES ('macro', NULL, ?, ?, ?, ?, '[]', ?)""",
            (ev_date, title, description, SOURCE_NAME, now_iso),
        )
        inserted += 1

    conn.commit()
    logger.info(
        "Phase 2 complete: %d macro events inserted (deleted %d stale)",
        inserted,
        deleted_stale,
    )
    return inserted


# ===================================================================
# Phase 3: Filing deadlines collector
# ===================================================================
def _last_day_of_month(year: int, month: int) -> dt.date:
    """Return the last calendar day of the given month."""
    if month == 12:
        return dt.date(year, 12, 31)
    return dt.date(year, month + 1, 1) - dt.timedelta(days=1)


def _compute_filing_deadlines(
    ticker: str,
    fy_end_month: int,
    today: dt.date,
) -> list[dict[str, Any]]:
    """Compute next 10-Q and 10-K filing deadlines from fiscal year-end month.

    SEC rules:
      - 10-Q (first 3 fiscal quarters): due 45 days after quarter-end
      - 10-K (4th quarter / full year): due 90 days after fiscal year-end

    Returns list of dicts with 'event_date', 'title', 'description'.
    Only returns deadlines on or after *today*.
    """
    # Determine current fiscal year end
    fy_end_year = today.year if today.month <= fy_end_month else today.year + 1

    # Quarter-end month offsets: 1st qtr = fy_end - 9, 2nd = fy_end - 6,
    # 3rd = fy_end - 3, 4th (FY end) = fy_end
    quarters: list[tuple[int, str]] = [
        (-9, f"Q1 ({_qtr_label(fy_end_month, 0)})"),
        (-6, f"Q2 ({_qtr_label(fy_end_month, 1)})"),
        (-3, f"Q3 ({_qtr_label(fy_end_month, 2)})"),
        (0, "Annual (FY)"),
    ]

    results: list[dict[str, Any]] = []

    for i, (offset, label) in enumerate(quarters):
        q_month = fy_end_month + offset
        q_year = fy_end_year
        if q_month <= 0:
            q_month += 12
            q_year -= 1

        q_end = _last_day_of_month(q_year, q_month)

        if i < 3:
            # 10-Q due 45 days after quarter end
            deadline = q_end + dt.timedelta(days=45)
            form = "10-Q"
        else:
            # 10-K due 90 days after fiscal year end
            deadline = q_end + dt.timedelta(days=90)
            form = "10-K"

        if deadline < today:
            continue

        results.append(
            {
                "event_date": deadline.isoformat(),
                "title": f"{form} Filing: {ticker}",
                "description": (
                    f"{form} deadline for {ticker} ({label}); "
                    f"quarter ended {q_end.isoformat()}, "
                    f"filing due by {deadline.isoformat()}"
                ),
            }
        )

    return results


def _qtr_label(fy_end_month: int, q_index: int) -> str:
    """Return a human-readable label for the fiscal quarter."""
    months_map = {
        1: "Jan-Mar",
        2: "Feb-Apr",
        3: "Mar-May",
        4: "Apr-Jun",
        5: "May-Jul",
        6: "Jun-Aug",
        7: "Jul-Sep",
        8: "Aug-Oct",
        9: "Sep-Nov",
        10: "Oct-Dec",
        11: "Nov-Jan",
        12: "Dec-Feb",
    }
    # Quarter start month for given FY-end and quarter index
    # Q1 starts at FY_end_month - 11, Q2 at FY_end_month - 8, Q3 at FY_end_month - 5
    start_offset = {-9: -11, -6: -8, -3: -5, 0: -2}
    offsets = [-9, -6, -3, 0]
    offset = offsets[q_index]
    start_m = fy_end_month + offset - 2  # 3-month quarter starting point
    if start_m <= 0:
        start_m += 12
    return months_map.get(start_m, f"Q{q_index + 1}")


def _collect_filings(conn: Any, tickers: list[str]) -> int:
    """Query yfinance info for fiscal year-end month and compute filing deadlines.

    No SEC EDGAR API — purely rule-based from fiscal year-end.
    Inserts into market_events with event_type='filing'.
    Returns count of events inserted.
    """
    logger.info("Phase 3: Collecting filing deadlines for %d tickers ...", len(tickers))

    # Clear existing filing events
    conn.execute("DELETE FROM market_events WHERE event_type='filing'")
    conn.commit()

    inserted = 0
    now = dt.datetime.now(dt.timezone.utc)
    now_iso = now.isoformat()
    today = now.date()

    for i, ticker in enumerate(tickers):
        # Rate limiting
        if i > 0:
            time.sleep(YFINANCE_SLEEP)

        try:
            t = yf.Ticker(ticker)
            info = t.info
        except Exception:
            logger.debug("Failed to fetch info for %s — skipping", ticker)
            continue

        if not info:
            logger.debug("No info data for %s — skipping", ticker)
            continue

        fy_end = info.get("fiscalYearEnd")
        if fy_end is None:
            logger.debug("No fiscalYearEnd for %s — skipping", ticker)
            continue

        try:
            fy_end_month = int(fy_end)
            if fy_end_month < 1 or fy_end_month > 12:
                logger.debug("Invalid fiscalYearEnd %s for %s — skipping", fy_end, ticker)
                continue
        except (ValueError, TypeError):
            logger.debug("Non-integer fiscalYearEnd %s for %s — skipping", fy_end, ticker)
            continue

        deadlines = _compute_filing_deadlines(ticker, fy_end_month, today)
        if not deadlines:
            continue

        for entry in deadlines:
            conn.execute(
                """INSERT INTO market_events
                   (event_type, ticker, event_date, title, description, source, relevant_holdings, created_at)
                   VALUES ('filing', ?, ?, ?, ?, ?, '[]', ?)""",
                (
                    ticker,
                    entry["event_date"],
                    entry["title"],
                    entry["description"],
                    SOURCE_NAME,
                    now_iso,
                ),
            )
            inserted += 1

        logger.debug("  %s (FY-end month=%d) → %d filing deadlines", ticker, fy_end_month, len(deadlines))

    conn.commit()
    logger.info("Phase 3 complete: %d filing events inserted", inserted)
    return inserted


# ===================================================================
# Public API
# ===================================================================
def collect_all_events(
    db_path: str | Path | None = None,
) -> dict[str, int]:
    """Run all three collector phases sequentially.

    If one phase fails, prior phases' data is preserved.

    Parameters
    ----------
    db_path : str or Path or None
        Path to the Northstar SQLite database. Falls back to env var or default.

    Returns
    -------
    dict[str, int]
        Counts per phase: {earnings, macro, filing}.
    """
    resolved = Path(db_path) if db_path else resolve_db_path()
    conn = connect(resolved)

    results: dict[str, int] = {}

    try:
        migrate(conn)

        tickers = _get_ticker_universe(conn)

        # Phase 1: Earnings
        try:
            results["earnings"] = _collect_earnings(conn, tickers)
        except Exception as exc:
            logger.error("Phase 1 (earnings) failed: %s", exc)
            results["earnings"] = -1

        # Phase 2: Macro
        try:
            results["macro"] = _collect_macro(conn)
        except Exception as exc:
            logger.error("Phase 2 (macro) failed: %s", exc)
            results["macro"] = -1

        # Phase 3: Filings
        try:
            results["filing"] = _collect_filings(conn, tickers)
        except Exception as exc:
            logger.error("Phase 3 (filing) failed: %s", exc)
            results["filing"] = -1

        logger.info(
            "Collect complete — earnings=%s  macro=%s  filing=%s",
            results.get("earnings", "?"),
            results.get("macro", "?"),
            results.get("filing", "?"),
        )

    finally:
        conn.close()

    return results


# ===================================================================
# CLI entry point
# ===================================================================
def main() -> None:
    """CLI entry point — run ``python -m scripts.research_engine.collect_events``."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%H:%M:%S",
    )

    db_path = resolve_db_path()
    logger.info("Database: %s", db_path)

    results = collect_all_events(db_path)

    for phase, count in results.items():
        status = str(count) if count >= 0 else "FAILED"
        logger.info("  %s: %s", phase, status)


if __name__ == "__main__":
    main()
