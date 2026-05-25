"""Tests for the events collector — earnings, macro, and filing deadline collection."""

from __future__ import annotations

import json
import os
import sqlite3
import tempfile
from pathlib import Path

from scripts.research_engine.migrations import migrate

# Import collector functions
from scripts.research_engine.collect_events import (
    _compute_filing_deadlines,
    _get_ticker_universe,
    _last_day_of_month,
)


# ── _get_ticker_universe ──────────────────────────────────────────────────

def _test_ticker_universe() -> None:
    """Test that ticker universe includes active securities."""
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    migrate(conn)
    conn.execute("INSERT INTO securities (ticker, name, active) VALUES ('AAPL', 'Apple Inc.', 1)")
    conn.execute("INSERT INTO securities (ticker, name, active) VALUES ('INACTIVE', 'Inactive Co.', 0)")
    conn.commit()

    # Suppress ibkr-portfolio.json not found warning by temporarily pointing elsewhere
    tickers = _get_ticker_universe(conn)
    assert "AAPL" in tickers, "Active ticker should be in universe"
    assert "INACTIVE" not in tickers, "Inactive ticker should not be in universe"
    print("  _test_ticker_universe: PASS")


# ── _last_day_of_month ────────────────────────────────────────────────────

def _test_last_day_of_month() -> None:
    """Test the month-end calculator."""
    assert _last_day_of_month(2026, 1) == _d(2026, 1, 31)
    assert _last_day_of_month(2026, 2) == _d(2026, 2, 28)
    assert _last_day_of_month(2026, 12) == _d(2026, 12, 31)
    assert _last_day_of_month(2024, 2) == _d(2024, 2, 29)  # leap year
    print("  _test_last_day_of_month: PASS")


# ── _compute_filing_deadlines ──────────────────────────────────────────────

def _test_compute_filing_deadlines() -> None:
    """Test filing deadline computation for a Dec FY-end."""
    today = _d(2026, 5, 26)
    deadlines = _compute_filing_deadlines("AAPL", 12, today)

    # Should have 4 deadlines (10-Q for Q1-Q3, 10-K for FY)
    # From May 26, 2026: Q2 deadline (Jun 30+45=Aug 14), Q3 deadline (Sep 30+45=Nov 14)
    # and 10-K (Dec 31+90=Mar 31, 2027) should all be visible.
    # Q1 deadline (Mar 31+45=May 15) is before today so skipped.
    assert len(deadlines) == 3, f"Expected 3 deadlines, got {len(deadlines)}"

    # Check structure
    for entry in deadlines:
        assert "event_date" in entry
        assert "title" in entry
        assert "description" in entry

    # 10-K should be due 90 days after Dec 31, 2026 = March 31, 2027
    ten_k = [d for d in deadlines if "10-K" in d["title"]]
    assert len(ten_k) == 1
    assert ten_k[0]["event_date"] == "2027-03-31"

# 10-Q for Q2 (Jun 30) should be due 45 days later = Aug 14
    ten_q2 = [d for d in deadlines if "10-Q" in d["title"] and "Q2" in d["description"]]
    assert len(ten_q2) >= 1, "Should have a Q2 filing deadline"

    print("  _test_compute_filing_deadlines: PASS")


def _test_filing_deadlines_june_fy() -> None:
    """Test for a company with June fiscal year-end."""
    today = _d(2026, 5, 26)
    deadlines = _compute_filing_deadlines("TEST", 6, today)

    assert len(deadlines) > 0, "Should have deadlines for June FY-end"

    # 10-K should be due 90 days after June 30, 2026 = Sep 28, 2026
    ten_k = [d for d in deadlines if "10-K" in d["title"]]
    assert len(ten_k) == 1
    # Check all deadlines are on or after today
    for d in deadlines:
        assert d["event_date"] >= today.isoformat(), f"Deadline {d['event_date']} is before today"

    print("  _test_filing_deadlines_june_fy: PASS")


# ── Macro calendar validity ──────────────────────────────────────────────

def _test_macro_calendar_exists() -> None:
    """Verify the macro-calendar.json file is valid."""
    path = Path(__file__).resolve().parents[3] / "data" / "macro-calendar.json"
    # __file__ is at scripts/research_engine/tests/test_collect_events.py — parents[3] → repo root
    assert path.exists(), f"Macro calendar not found at {path}"
    with open(path) as f:
        entries = json.load(f)
    assert len(entries) > 50, f"Expected 50+ entries, got {len(entries)}"
    for e in entries:
        assert "date" in e and "title" in e and "description" in e
    print("  _test_macro_calendar_exists: PASS")


# ── Main runner ──────────────────────────────────────────────────────────

import datetime as _dt


def _d(year: int, month: int, day: int) -> _dt.date:
    return _dt.date(year, month, day)


if __name__ == "__main__":
    print("Running events collector tests...")
    _test_ticker_universe()
    _test_last_day_of_month()
    _test_compute_filing_deadlines()
    _test_filing_deadlines_june_fy()
    _test_macro_calendar_exists()
    print("\nAll events collector tests PASS")