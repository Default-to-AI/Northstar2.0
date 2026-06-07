"""Tests for deterministic persona scoring, decisions, and portfolio health."""

from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path

from scripts.research_engine.db import connect
from scripts.research_engine.decision_workflow import (
    calculate_persona_score,
    load_persona_model,
    persist_decision_briefs,
    persist_portfolio_health_checks,
    run_persona_scoring,
)
from scripts.research_engine.migrations import migrate


def _seed_factor_snapshot(conn: object) -> None:
    """Seed one ticker with enough data for persona, decision, and health checks."""
    migrate(conn)
    conn.execute(
        "INSERT INTO pipeline_runs (pipeline_name, started_at, completed_at, status) VALUES (?, ?, ?, ?)",
        ("main", "2026-06-06T08:30:00", "2026-06-06T08:45:00", "ready"),
    )
    conn.execute(
        "INSERT INTO source_runs (pipeline_run_id, source_name, tier, started_at, completed_at, status) VALUES (?, ?, ?, ?, ?, ?)",
        (1, "test_factors", "core", "2026-06-06T08:31:00", "2026-06-06T08:45:00", "ready"),
    )
    conn.execute(
        "INSERT INTO securities (ticker, name, sector) VALUES (?, ?, ?)",
        ("AAPL", "Apple Inc.", "technology"),
    )
    conn.execute(
        """
        INSERT INTO fundamentals(
            ticker, data_as_of, source, confidence, pipeline_run_id, source_run_id,
            market_cap, trailing_pe, forward_pe, free_cashflow, gross_margin,
            operating_margin, profit_margins, revenue_growth, debt_to_equity,
            net_cash, current_ratio, roe, roic, fifty_day_ma, two_hundred_day_ma,
            fifty_two_week_high, fifty_two_week_low, current_price, avg_dollar_volume
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            "AAPL",
            "2026-06-06T08:45:00",
            "test",
            0.9,
            1,
            1,
            4_500_000_000_000.0,
            30.0,
            28.0,
            100_000_000_000.0,
            0.47,
            0.32,
            0.27,
            0.16,
            80.0,
            -15_000_000_000.0,
            1.07,
            1.41,
            0.26,
            272.8,
            262.3,
            313.2,
            195.0,
            312.5,
            13_000_000_000.0,
        ),
    )
    factors = {
        "market_cap": 4_500_000_000_000.0,
        "trailing_pe": 30.0,
        "forward_pe": 28.0,
        "free_cashflow": 100_000_000_000.0,
        "gross_margin": 0.47,
        "operating_margin": 0.32,
        "profit_margins": 0.27,
        "revenue_growth": 0.16,
        "debt_to_equity": 80.0,
        "net_cash": -15_000_000_000.0,
        "current_ratio": 1.07,
        "roe": 1.41,
        "roic": 0.26,
        "fifty_day_ma": 272.8,
        "two_hundred_day_ma": 262.3,
        "fifty_two_week_high": 313.2,
        "fifty_two_week_low": 195.0,
        "current_price": 312.5,
        "avg_dollar_volume": 13_000_000_000.0,
    }
    conn.execute(
        """
        INSERT INTO factor_snapshots(
            ticker, pipeline_run_id, source_run_id, model_id, data_as_of,
            factors_json, reasons_json, coverage_json, missing_data_json, actionable
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            "AAPL",
            1,
            1,
            "v1",
            "2026-06-06T08:45:00",
            json.dumps(factors),
            json.dumps(["seeded test row"]),
            json.dumps({"core_missing": []}),
            json.dumps([]),
            1,
        ),
    )
    conn.execute(
        "INSERT OR REPLACE INTO score_model_versions (model_id, version, config_json) VALUES (?, ?, ?)",
        ("v1", "v1", json.dumps({"source": "test"})),
    )
    conn.execute(
        """
        INSERT INTO score_snapshots(
            ticker, pipeline_run_id, factor_snapshot_id, score_model_id,
            compounder_score, tactical_score, actionability_state, warnings
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        ("AAPL", 1, 1, "v1", 82.0, 74.0, "fresh_actionable", "[]"),
    )
    conn.commit()


class TestDecisionWorkflow:
    """Verify persona scoring behaves deterministically and persists outputs."""

    def test_calculate_persona_score_returns_bounded_score(self) -> None:
        model = load_persona_model()
        persona = next(p for p in model["personas"] if p["id"] == "buffett")
        result = calculate_persona_score(
            persona,
            {
                "market_cap": 1_000_000_000_000.0,
                "free_cashflow": 50_000_000_000.0,
                "gross_margin": 0.60,
                "operating_margin": 0.28,
                "profit_margins": 0.24,
                "revenue_growth": 0.12,
                "current_ratio": 1.8,
                "debt_to_equity": 40.0,
                "roic": 0.22,
                "roe": 0.30,
                "forward_pe": 18.0,
                "trailing_pe": 20.0,
                "net_cash": 2_000_000_000.0,
                "fifty_day_ma": 110.0,
                "two_hundred_day_ma": 100.0,
                "fifty_two_week_high": 125.0,
                "current_price": 105.0,
            },
        )
        assert 0.0 <= result["score"] <= 100.0
        assert result["persona_id"] == "buffett"
        assert isinstance(result["rationale"], list)
        assert "moat_strength" in result["inputs"]

    def test_run_persona_scoring_persists_four_rows_for_one_ticker(self) -> None:
        fd, tmp_name = tempfile.mkstemp(suffix=".db")
        os.close(fd)
        db_path = Path(tmp_name)
        try:
            conn = connect(db_path)
            _seed_factor_snapshot(conn)
            conn.close()

            results = run_persona_scoring(db_path)
            assert len(results) == 4

            verify_conn = connect(db_path, must_exist=True)
            rows = verify_conn.execute(
                "SELECT ticker, persona_id, score FROM persona_score_snapshots ORDER BY persona_id"
            ).fetchall()
            verify_conn.close()
        finally:
            db_path.unlink(missing_ok=True)
            db_path.with_name(f"{db_path.name}-wal").unlink(missing_ok=True)
            db_path.with_name(f"{db_path.name}-shm").unlink(missing_ok=True)

        assert len(rows) == 4
        assert {str(row["persona_id"]) for row in rows} == {
            "buffett",
            "hohn",
            "joseph_carlson",
            "micha_stocks",
        }
        assert all(0.0 <= float(row["score"]) <= 100.0 for row in rows)

    def test_decisions_and_health_checks_persist(self) -> None:
        fd, tmp_name = tempfile.mkstemp(suffix=".db")
        os.close(fd)
        db_path = Path(tmp_name)
        try:
            conn = connect(db_path)
            _seed_factor_snapshot(conn)
            conn.close()

            run_persona_scoring(db_path)
            decisions = persist_decision_briefs(db_path)

            import scripts.research_engine.decision_workflow as workflow

            original_loader = workflow._load_portfolio_positions
            workflow._load_portfolio_positions = lambda: (
                [
                    {
                        "symbol": "AAPL",
                        "positionValue": 20_000.0,
                        "costBasisMoney": 30_000.0,
                        "unrealizedPnL": -10_000.0,
                    }
                ],
                100_000.0,
            )
            try:
                health = persist_portfolio_health_checks(db_path)
            finally:
                workflow._load_portfolio_positions = original_loader

            verify_conn = connect(db_path, must_exist=True)
            decision_row = verify_conn.execute(
                "SELECT decision_type, primary_persona FROM decision_briefs WHERE ticker = 'AAPL'"
            ).fetchone()
            health_rows = verify_conn.execute(
                "SELECT check_type, triggered FROM portfolio_health_checks WHERE ticker = 'AAPL' ORDER BY check_type"
            ).fetchall()
            verify_conn.close()
        finally:
            db_path.unlink(missing_ok=True)
            db_path.with_name(f"{db_path.name}-wal").unlink(missing_ok=True)
            db_path.with_name(f"{db_path.name}-shm").unlink(missing_ok=True)

        assert len(decisions) == 1
        assert decision_row is not None
        assert str(decision_row["decision_type"]) in {"ignore", "watch", "long_candidate"}
        assert str(decision_row["primary_persona"]) in {
            "buffett",
            "hohn",
            "joseph_carlson",
            "micha_stocks",
        }
        assert len(health) == 4
        triggered = {str(row["check_type"]): int(row["triggered"]) for row in health_rows}
        assert triggered["trim"] == 1
        assert triggered["stop_loss"] == 1
        assert "sector_concentration" in triggered
