"""Tests for the V3 schema migration adding morning_briefs and market_events tables."""

from __future__ import annotations

import sqlite3

from scripts.research_engine.migrations import migrate


def _fresh_db() -> sqlite3.Connection:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def _table_columns(conn: sqlite3.Connection, name: str) -> set[str]:
    return {str(r[1]) for r in conn.execute(f"PRAGMA table_info({name})")}


class TestV3Migration:
    """Verify the V3 migration creates both tables, indexes, and is idempotent."""

    def test_migration_creates_morning_briefs(self) -> None:
        conn = _fresh_db()
        migrate(conn)
        assert "morning_briefs" in {
            r[0] for r in conn.execute("SELECT name FROM sqlite_master WHERE type='table'")
        }
        cols = _table_columns(conn, "morning_briefs")
        for expected in (
            "date",
            "pipeline_readiness_json",
            "pre_market_context_json",
            "top_opportunities_json",
            "portfolio_snapshot_json",
            "status",
            "source",
            "generated_at",
        ):
            assert expected in cols, f"missing column: {expected}"

    def test_migration_creates_market_events(self) -> None:
        conn = _fresh_db()
        migrate(conn)
        assert "market_events" in {
            r[0] for r in conn.execute("SELECT name FROM sqlite_master WHERE type='table'")
        }
        cols = _table_columns(conn, "market_events")
        for expected in ("event_type", "ticker", "event_date", "title", "description", "source", "relevant_holdings", "created_at"):
            assert expected in cols, f"missing column: {expected}"

    def test_migration_creates_index(self) -> None:
        conn = _fresh_db()
        migrate(conn)
        idx = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_market_events_date_type'"
        ).fetchone()
        assert idx is not None, "missing index idx_market_events_date_type"

    def test_idempotent(self) -> None:
        conn = _fresh_db()
        migrate(conn)
        migrate(conn)
        migrate(conn)
        # Should not error and tables still exist
        assert "morning_briefs" in {
            r[0] for r in conn.execute("SELECT name FROM sqlite_master WHERE type='table'")
        }

    def test_check_constraint_event_type(self) -> None:
        conn = _fresh_db()
        migrate(conn)
        try:
            conn.execute(
                "INSERT INTO market_events(event_type, event_date, title, source, created_at) "
                "VALUES ('invalid', '2026-06-01', 'test', 'test', 'now')"
            )
            assert False, "CHECK constraint should have rejected 'invalid'"  # pragma: no cover
        except sqlite3.IntegrityError:
            pass  # expected

    def test_round_trip(self) -> None:
        conn = _fresh_db()
        migrate(conn)
        conn.execute(
            "INSERT OR REPLACE INTO morning_briefs(date, generated_at) VALUES ('2026-05-26', '2026-05-26T08:00:00')"
        )
        row = conn.execute("SELECT date, status, source FROM morning_briefs WHERE date = ?", ("2026-05-26",)).fetchone()
        assert row is not None
        assert row["date"] == "2026-05-26"
        assert row["status"] == "generated"
        assert row["source"] == "cron"
