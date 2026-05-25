from __future__ import annotations

import sqlite3
import tempfile
import unittest
from pathlib import Path

from scripts.research_engine.migrations import migrate


class MigrationTests(unittest.TestCase):
    def test_migration_is_idempotent_and_preserves_legacy_table(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            db_path = Path(tmp) / "northstar.db"
            conn = sqlite3.connect(db_path)
            conn.row_factory = sqlite3.Row
            conn.execute("CREATE TABLE ticker_evidence (ticker TEXT PRIMARY KEY, market_cap REAL, current_price REAL, revenue_growth REAL, last_updated TEXT)")
            conn.execute("INSERT INTO ticker_evidence VALUES ('AAPL', 1, 2, 0.1, '2026-01-01T00:00:00Z')")
            migrate(conn)
            migrate(conn)
            self.assertIsNotNone(conn.execute("SELECT name FROM sqlite_master WHERE name='ticker_evidence'").fetchone())
            self.assertIsNotNone(conn.execute("SELECT ticker FROM securities WHERE ticker='AAPL'").fetchone())
            self.assertIsNotNone(conn.execute("SELECT ticker FROM fundamentals WHERE ticker='AAPL'").fetchone())
            self.assertEqual(conn.execute("SELECT COUNT(*) FROM securities WHERE ticker='AAPL'").fetchone()[0], 1)
            conn.close()


if __name__ == '__main__':
    unittest.main()
