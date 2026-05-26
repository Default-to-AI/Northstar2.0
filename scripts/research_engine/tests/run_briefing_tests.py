"""Quick verification script for briefing collector — run without pytest."""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path

from scripts.research_engine.migrations import migrate
from scripts.research_engine.briefing import (
    _collect_pipeline_readiness,
    _collect_top_opportunities,
    _collect_pre_market_context,
    _collect_portfolio_snapshot,
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


def test_portfolio_snapshot_repo_root_path() -> None:
    """Regression test: portfolio path resolves at <repo>/data, not <repo>/data/data."""
    repo_root = Path(__file__).resolve().parents[3]
    data_dir = repo_root / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    portfolio_path = data_dir / "ibkr-portfolio.json"

    backup_content: str | None = None
    if portfolio_path.exists():
        backup_content = portfolio_path.read_text(encoding="utf-8")

    fixture = {
        "nav": {"endingValue": 1000},
        "cash": {"endingCash": 250},
        "positions": [{"positionValue": 300}, {"positionValue": 400}],
    }

    try:
        portfolio_path.write_text(json.dumps(fixture), encoding="utf-8")
        result = _collect_portfolio_snapshot(repo_root)
        assert result is not None
        assert result["nav"] == 1000.0
        assert result["cashPct"] == 25.0
        assert result["grossExposure"] == 700.0
        print("  portfolio_snapshot_repo_root_path: PASS")
    finally:
        if backup_content is None:
            portfolio_path.unlink(missing_ok=True)
        else:
            portfolio_path.write_text(backup_content, encoding="utf-8")


if __name__ == "__main__":
    print("Running briefing collector tests...")
    test_pipeline_readiness()
    test_no_data()
    test_top_opportunities()
    test_empty_opportunities()
    test_pre_market_context()
    test_portfolio_snapshot_repo_root_path()
    print("\nAll briefing tests PASS")