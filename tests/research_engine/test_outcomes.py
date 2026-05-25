"""Tests for scripts/research_engine/outcomes.py — end-to-end via compute_latest_outcomes."""
import datetime
import os
import sqlite3
import tempfile
import unittest

from scripts.research_engine import migrations
from scripts.research_engine.outcomes import (
    _next_trading_day,
    compute_latest_outcomes,
)


def _seed(conn: sqlite3.Connection, ticker: str, sector: str = "Technology") -> None:
    conn.execute(
        "INSERT OR IGNORE INTO securities (ticker, name, type, active, sector) VALUES (?, ?, 'EQUITY', 1, ?)",
        (ticker, ticker, sector),
    )


def _snapshot(conn: sqlite3.Connection, ticker: str) -> None:
    conn.execute(
        "INSERT OR IGNORE INTO score_snapshots (id, ticker, pipeline_run_id, actionability_state, created_at) VALUES (?, ?, ?, ?, ?)",
        (abs(hash(ticker)) % 100000, ticker, 1, "fresh_actionable", "2026-05-18"),
    )


def _price(conn: sqlite3.Connection, ticker: str, date: str, close: float) -> None:
    conn.execute(
        "INSERT OR IGNORE INTO daily_prices (ticker, date, source, close, adjusted_close) VALUES (?, ?, 'yahoo', ?, ?)",
        (ticker, date, close, close),
    )


class OutcomeTests(unittest.TestCase):

    def setUp(self):
        self._tmpdir = tempfile.TemporaryDirectory()
        self._db_path = os.path.join(self._tmpdir.name, "test.db")
        conn = sqlite3.connect(self._db_path)
        migrations.migrate(conn)
        conn.close()

    def tearDown(self):
        self._tmpdir.cleanup()

    def test_happy_path(self):
        conn = sqlite3.connect(self._db_path)
        _seed(conn, "AAPL")
        _seed(conn, "SPY", "ETF")
        _snapshot(conn, "AAPL")
        _price(conn, "AAPL", "2026-05-18", 180.0)
        _price(conn, "AAPL", "2026-05-25", 190.0)
        _price(conn, "SPY", "2026-05-18", 500.0)
        _price(conn, "SPY", "2026-05-25", 510.0)
        conn.commit()
        conn.close()

        outcomes = compute_latest_outcomes(self._db_path)
        self.assertGreater(len(outcomes), 0)
        row = outcomes[0]
        self.assertEqual(row["status"], "computed")
        self.assertEqual(row["ticker"], "AAPL")

    def test_delisted_gets_terminal(self):
        conn = sqlite3.connect(self._db_path)
        _seed(conn, "GONE")
        _snapshot(conn, "GONE")
        conn.commit()
        conn.close()

        outcomes = compute_latest_outcomes(self._db_path)
        gone = [o for o in outcomes if o["ticker"] == "GONE"]
        self.assertGreater(len(gone), 0)
        self.assertEqual(gone[0]["status"], "terminal")

    def test_idempotent_rerun(self):
        conn = sqlite3.connect(self._db_path)
        _seed(conn, "IDEM")
        _seed(conn, "SPY", "ETF")
        _snapshot(conn, "IDEM")
        _price(conn, "IDEM", "2026-05-18", 100.0)
        _price(conn, "IDEM", "2026-05-25", 110.0)
        _price(conn, "SPY", "2026-05-18", 500.0)
        _price(conn, "SPY", "2026-05-25", 510.0)
        conn.commit()
        conn.close()

        r1 = compute_latest_outcomes(self._db_path)
        r2 = compute_latest_outcomes(self._db_path)
        self.assertGreater(len(r1), 0)
        self.assertEqual(len(r1), len(r2))
        self.assertEqual(r1[0]["id"], r2[0]["id"])

    def test_weekend_advances_to_monday(self):
        self.assertEqual(_next_trading_day(datetime.date(2026, 5, 23)), datetime.date(2026, 5, 25))
        self.assertEqual(_next_trading_day(datetime.date(2026, 5, 24)), datetime.date(2026, 5, 25))
        self.assertEqual(_next_trading_day(datetime.date(2026, 5, 25)), datetime.date(2026, 5, 25))
        self.assertEqual(_next_trading_day(datetime.date(2026, 5, 30)), datetime.date(2026, 6, 1))

    def test_missing_benchmark(self):
        conn = sqlite3.connect(self._db_path)
        _seed(conn, "XYZ", "Unknown Sector")
        _snapshot(conn, "XYZ")
        _price(conn, "XYZ", "2026-05-18", 50.0)
        _price(conn, "XYZ", "2026-05-25", 55.0)
        conn.commit()
        conn.close()

        outcomes = compute_latest_outcomes(self._db_path)
        self.assertGreater(len(outcomes), 0)


if __name__ == "__main__":
    unittest.main()