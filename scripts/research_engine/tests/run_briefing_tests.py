"""Quick verification script for briefing collector — run without pytest."""

from __future__ import annotations

import sqlite3

from scripts.research_engine.migrations import migrate
from scripts.research_engine.briefing import (
    _collect_pipeline_readiness,
    _collect_top_opportunities,
    _collect_pre_market_context,
)


def test_pipeline_readiness() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    migrate(conn)
    conn.executescript("""
        INSERT INTO pipeline_runs (pipeline_name, started_at, completed_at, status) VALUES ('main', '2026-05-26T08:30:00', '2026-05-26T09:00:00', 'ready');
        INSERT INTO source_runs (pipeline_run_id, source_name, tier, status, completed_at) VALUES (1, 'daily_prices', 'core', 'ready', '2026-05-26T09:00:00');
    """)
    result = _collect_pipeline_readiness(conn)
    assert result["status"] == "ready", f"Expected ready, got {result['status']}"
    assert len(result["sources"]) == 1
    assert result["sources"][0]["name"] == "daily_prices"
    print("  pipeline_readiness: PASS")


def test_no_data() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    migrate(conn)
    result = _collect_pipeline_readiness(conn)
    assert result["status"] == "no_data"
    print("  no_data: PASS")


def test_top_opportunities() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    migrate(conn)
    conn.executescript("""
        INSERT INTO pipeline_runs (pipeline_name, started_at, completed_at, status) VALUES ('main', '2026-05-26T08:30:00', '2026-05-26T09:00:00', 'ready');
        INSERT INTO securities (ticker, name, sector) VALUES ('AAPL', 'Apple Inc.', 'technology');
        INSERT INTO score_snapshots (ticker, pipeline_run_id, compounder_score, tactical_score, actionability_state, warnings)
            VALUES ('AAPL', 1, 85, 70, 'fresh_actionable', '[]');
    """)
    ops = _collect_top_opportunities(conn)
    assert len(ops) == 1
    assert ops[0]["ticker"] == "AAPL"
    assert ops[0]["score"] == 85.0
    print("  top_opportunities: PASS")


def test_empty_opportunities() -> None:
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    migrate(conn)
    conn.execute("INSERT INTO pipeline_runs (pipeline_name, started_at, completed_at, status) VALUES ('main', '2026-05-26T08:30:00', '2026-05-26T09:00:00', 'ready')")
    conn.commit()
    assert _collect_top_opportunities(conn) == []
    print("  empty_opportunities: PASS")


def test_pre_market_context() -> None:
    result = _collect_pre_market_context()
    assert "spyChangePct" in result
    assert "futuresDirection" in result
    assert "lastClose" in result
    assert "note" in result
    print(f"  pre_market_context: PASS (note: {result['note'] or 'has data'})")


if __name__ == "__main__":
    print("Running briefing collector tests...")
    test_pipeline_readiness()
    test_no_data()
    test_top_opportunities()
    test_empty_opportunities()
    test_pre_market_context()
    print("\nAll briefing tests PASS")