from __future__ import annotations

import sqlite3

SCHEMA_VERSION = 6


def migrate(conn: sqlite3.Connection) -> None:
    """Apply idempotent V1 research-store migrations without destructive drops."""
    with conn:
        conn.execute("CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS pipeline_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pipeline_name TEXT NOT NULL,
                scheduled_at TEXT,
                started_at TEXT NOT NULL,
                completed_at TEXT,
                trigger TEXT NOT NULL DEFAULT 'manual',
                status TEXT NOT NULL CHECK(status IN ('started','ready','degraded','failed','superseded','success')),
                last_good_run_id INTEGER,
                error_summary TEXT,
                FOREIGN KEY(last_good_run_id) REFERENCES pipeline_runs(id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS source_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pipeline_run_id INTEGER NOT NULL,
                source_name TEXT NOT NULL,
                tier TEXT NOT NULL DEFAULT 'core',
                started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                completed_at TEXT,
                data_as_of TEXT,
                status TEXT NOT NULL CHECK(status IN ('started','ready','degraded','failed','skipped','success')),
                retry_count INTEGER NOT NULL DEFAULT 0,
                error_message TEXT,
                FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS securities (
                ticker TEXT PRIMARY KEY,
                name TEXT,
                type TEXT,
                active INTEGER NOT NULL DEFAULT 1,
                exchange TEXT,
                sector TEXT,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS security_identifiers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticker TEXT NOT NULL,
                provider TEXT NOT NULL,
                identifier TEXT NOT NULL,
                UNIQUE(provider, identifier),
                FOREIGN KEY(ticker) REFERENCES securities(ticker)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS universe_memberships (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticker TEXT NOT NULL,
                universe TEXT NOT NULL,
                as_of_date TEXT NOT NULL,
                source TEXT NOT NULL,
                UNIQUE(ticker, universe, as_of_date),
                FOREIGN KEY(ticker) REFERENCES securities(ticker)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS daily_prices (
                ticker TEXT NOT NULL,
                date TEXT NOT NULL,
                source TEXT NOT NULL,
                open REAL, high REAL, low REAL, close REAL, adjusted_close REAL, volume REAL,
                pipeline_run_id INTEGER, source_run_id INTEGER,
                PRIMARY KEY (ticker, date, source),
                FOREIGN KEY(ticker) REFERENCES securities(ticker),
                FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id),
                FOREIGN KEY(source_run_id) REFERENCES source_runs(id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS fundamentals (
                ticker TEXT PRIMARY KEY,
                data_as_of TEXT,
                source TEXT NOT NULL,
                confidence REAL NOT NULL DEFAULT 0.7,
                missing_reason TEXT,
                pipeline_run_id INTEGER, source_run_id INTEGER,
                market_cap REAL, trailing_pe REAL, forward_pe REAL, price_to_book REAL,
                price_to_sales REAL, ev_to_ebitda REAL, ev_to_gross_profit REAL, peg_ratio REAL,
                free_cashflow REAL, operating_cash_flow REAL, gross_margin REAL, operating_margin REAL,
                profit_margins REAL, revenue_growth REAL, eps REAL, ebitda REAL, diluted_net_income REAL,
                debt_to_equity REAL, net_cash REAL, current_ratio REAL, roe REAL, roic REAL,
                revenue_per_employee REAL, fifty_day_ma REAL, two_hundred_day_ma REAL,
                fifty_two_week_high REAL, fifty_two_week_low REAL, current_price REAL,
                avg_dollar_volume REAL,
                momentum_history TEXT, valuation_history TEXT,
                FOREIGN KEY(ticker) REFERENCES securities(ticker),
                FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id),
                FOREIGN KEY(source_run_id) REFERENCES source_runs(id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS factor_snapshots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticker TEXT NOT NULL,
                pipeline_run_id INTEGER,
                source_run_id INTEGER,
                model_id TEXT NOT NULL,
                data_as_of TEXT,
                factors_json TEXT NOT NULL,
                reasons_json TEXT NOT NULL,
                coverage_json TEXT NOT NULL,
                missing_data_json TEXT NOT NULL,
                actionable INTEGER NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(ticker) REFERENCES securities(ticker),
                FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id),
                FOREIGN KEY(source_run_id) REFERENCES source_runs(id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS score_model_versions (
                model_id TEXT PRIMARY KEY,
                version TEXT NOT NULL,
                config_json TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS score_snapshots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticker TEXT NOT NULL,
                pipeline_run_id INTEGER,
                factor_snapshot_id INTEGER,
                score_model_id TEXT NOT NULL DEFAULT 'v1',
                compounder_score REAL, tactical_score REAL,
                actionability_state TEXT NOT NULL DEFAULT 'blocked_core_stale',
                warnings TEXT NOT NULL DEFAULT '[]',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(ticker) REFERENCES securities(ticker),
                FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id),
                FOREIGN KEY(factor_snapshot_id) REFERENCES factor_snapshots(id),
                FOREIGN KEY(score_model_id) REFERENCES score_model_versions(model_id)
            )
        """)
        _migrate_v2(conn)
        _migrate_v3(conn)
        _migrate_v4(conn)
        _migrate_v5(conn)
        _migrate_v6(conn)
        _ensure_columns(conn)
        _backfill_legacy(conn)
        conn.execute("INSERT OR IGNORE INTO schema_migrations (version) VALUES (?)", (SCHEMA_VERSION,))


def _table_columns(conn: sqlite3.Connection, table_name: str) -> set[str]:
    """Return column names for an existing SQLite table."""
    return {str(row[1]) for row in conn.execute(f"PRAGMA table_info({table_name})")}


def _add_column_if_missing(conn: sqlite3.Connection, table_name: str, column_name: str, definition: str) -> None:
    """Add a nullable/defaulted column to tolerate earlier partial V1 schemas."""
    if column_name not in _table_columns(conn, table_name):
        conn.execute(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {definition}")


def _migrate_v2(conn: sqlite3.Connection) -> None:
    """V2: decision_outcomes table for tracking forward returns."""
    conn.execute("""
        CREATE TABLE IF NOT EXISTS decision_outcomes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_type TEXT NOT NULL CHECK(source_type IN ('scanner_signal','committee_playbook','user_decision','alert')),
            source_id INTEGER NOT NULL,
            horizon_days INTEGER NOT NULL DEFAULT 5,
            ticker TEXT NOT NULL,
            decision_date TEXT NOT NULL,
            decision_price REAL,
            spy_price REAL,
            sector_benchmark TEXT,
            sector_return REAL,
            forward_price REAL,
            forward_return REAL,
            benchmark_return REAL,
            status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','computed','partial','terminal')),
            score_snapshot_id INTEGER,
            evidence_packet_id TEXT,
            committee_session_id TEXT,
            score_model_id TEXT,
            source_freshness TEXT,
            notes TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            computed_at TEXT,
            UNIQUE(source_type, source_id, horizon_days),
            FOREIGN KEY(ticker) REFERENCES securities(ticker)
        )
    """)


def _migrate_v3(conn: sqlite3.Connection) -> None:
    """V3: morning_briefs and market_events tables for Slice 5 (Morning Briefing + Events)."""
    conn.execute("""
        CREATE TABLE IF NOT EXISTS morning_briefs (
            date TEXT PRIMARY KEY,
            pipeline_readiness_json TEXT,
            pre_market_context_json TEXT,
            top_opportunities_json TEXT,
            portfolio_snapshot_json TEXT,
            status TEXT NOT NULL DEFAULT 'generated',
            source TEXT NOT NULL DEFAULT 'cron',
            generated_at TEXT NOT NULL
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS market_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL CHECK(event_type IN ('earnings','macro','filing')),
            ticker TEXT,
            event_date TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            source TEXT NOT NULL,
            relevant_holdings TEXT NOT NULL DEFAULT '[]',
            created_at TEXT NOT NULL
        )
    """)
    conn.execute("""
        CREATE INDEX IF NOT EXISTS idx_market_events_date_type
        ON market_events(event_date, event_type)
    """)


def _migrate_v4(conn: sqlite3.Connection) -> None:
    """V4: SBC-adjusted EV/EBITDA + data normalization events for cross-source validation."""
    _add_column_if_missing(conn, "fundamentals", "sbc_add_back", "REAL")
    _add_column_if_missing(conn, "fundamentals", "ev_to_ebitda_normalized", "REAL")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS data_normalization_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticker TEXT NOT NULL,
            metric TEXT NOT NULL,
            sources_json TEXT NOT NULL,
            median_value REAL NOT NULL,
            outlier_source TEXT NOT NULL,
            deviation_pct REAL NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(ticker) REFERENCES securities(ticker)
        )
    """)
    conn.execute("""
        CREATE INDEX IF NOT EXISTS idx_norm_events_ticker_date
        ON data_normalization_events(ticker, created_at)
    """)


def _migrate_v5(conn: sqlite3.Connection) -> None:
    """V5: Sector metrics table for dynamic sector P/E automation."""
    conn.execute("""
        CREATE TABLE IF NOT EXISTS sector_metrics (
            sector_name TEXT PRIMARY KEY,
            pe_ratio REAL NOT NULL,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    """)


def _migrate_v6(conn: sqlite3.Connection) -> None:
    """V6: Decision workflow tables - persona scores, decision briefs, portfolio health checks."""
    # Persona score snapshots - one row per ticker per persona per run
    conn.execute("""
        CREATE TABLE IF NOT EXISTS persona_score_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticker TEXT NOT NULL,
            pipeline_run_id INTEGER,
            persona_id TEXT NOT NULL,
            model_version TEXT NOT NULL DEFAULT 'v1',
            score REAL NOT NULL,
            rationale_json TEXT NOT NULL,
            inputs_json TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(ticker) REFERENCES securities(ticker),
            FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id)
        )
    """)
    conn.execute("""
        CREATE INDEX IF NOT EXISTS idx_persona_scores_ticker_run
        ON persona_score_snapshots(ticker, pipeline_run_id)
    """)
    conn.execute("""
        CREATE INDEX IF NOT EXISTS idx_persona_scores_persona_run
        ON persona_score_snapshots(persona_id, pipeline_run_id)
    """)

    # Decision briefs - daily action classification per ticker
    conn.execute("""
        CREATE TABLE IF NOT EXISTS decision_briefs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            ticker TEXT NOT NULL,
            pipeline_run_id INTEGER,
            decision_type TEXT NOT NULL CHECK(decision_type IN ('ignore','watch','long_candidate','trim','stop_review','restructure')),
            primary_persona TEXT NOT NULL,
            compounder_score REAL,
            tactical_score REAL,
            threshold_met INTEGER NOT NULL DEFAULT 0,
            rationale_json TEXT NOT NULL,
            evidence_json TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(ticker) REFERENCES securities(ticker),
            FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id),
            UNIQUE(date, ticker)
        )
    """)
    conn.execute("""
        CREATE INDEX IF NOT EXISTS idx_decision_briefs_date_type
        ON decision_briefs(date, decision_type)
    """)

    # Portfolio health checks - governance output per holding
    conn.execute("""
        CREATE TABLE IF NOT EXISTS portfolio_health_checks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            ticker TEXT NOT NULL,
            pipeline_run_id INTEGER,
            check_type TEXT NOT NULL CHECK(check_type IN ('trim','stop_loss','restructure','position_sizing','sector_concentration')),
            triggered INTEGER NOT NULL DEFAULT 0,
            current_value REAL,
            threshold_value REAL,
            rationale_json TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(ticker) REFERENCES securities(ticker),
            FOREIGN KEY(pipeline_run_id) REFERENCES pipeline_runs(id),
            UNIQUE(date, ticker, check_type)
        )
    """)
    conn.execute("""
        CREATE INDEX IF NOT EXISTS idx_portfolio_health_date_type
        ON portfolio_health_checks(date, check_type)
    """)


def _ensure_columns(conn: sqlite3.Connection) -> None:
    """Upgrade partial tables created by earlier Slice 1-3 attempts."""
    if conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='pipeline_runs'").fetchone():
        _add_column_if_missing(conn, "pipeline_runs", "scheduled_at", "TEXT")
        _add_column_if_missing(conn, "pipeline_runs", "trigger", "TEXT NOT NULL DEFAULT 'manual'")
        _add_column_if_missing(conn, "pipeline_runs", "last_good_run_id", "INTEGER")
        _add_column_if_missing(conn, "pipeline_runs", "error_summary", "TEXT")

    if conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='source_runs'").fetchone():
        _add_column_if_missing(conn, "source_runs", "tier", "TEXT NOT NULL DEFAULT 'core'")
        _add_column_if_missing(conn, "source_runs", "started_at", "TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP")
        _add_column_if_missing(conn, "source_runs", "completed_at", "TEXT")
        _add_column_if_missing(conn, "source_runs", "retry_count", "INTEGER NOT NULL DEFAULT 0")

    if conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='fundamentals'").fetchone():
        _add_column_if_missing(conn, "fundamentals", "confidence", "REAL NOT NULL DEFAULT 0.7")
        _add_column_if_missing(conn, "fundamentals", "missing_reason", "TEXT")
        _add_column_if_missing(conn, "fundamentals", "pipeline_run_id", "INTEGER")
        _add_column_if_missing(conn, "fundamentals", "source_run_id", "INTEGER")
        _add_column_if_missing(conn, "fundamentals", "avg_dollar_volume", "REAL")
        _add_column_if_missing(conn, "fundamentals", "sbc_add_back", "REAL")
        _add_column_if_missing(conn, "fundamentals", "ev_to_ebitda_normalized", "REAL")

    if conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='score_snapshots'").fetchone():
        _add_column_if_missing(conn, "score_snapshots", "factor_snapshot_id", "INTEGER")
        _add_column_if_missing(conn, "score_snapshots", "score_model_id", "TEXT NOT NULL DEFAULT 'v1'")
        _add_column_if_missing(conn, "score_snapshots", "actionability_state", "TEXT NOT NULL DEFAULT 'blocked_core_stale'")


def _backfill_legacy(conn: sqlite3.Connection) -> None:
    """Copy legacy ticker_evidence rows into normalized tables when present."""
    legacy = conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='ticker_evidence'").fetchone()
    if legacy is None:
        return
    cols = {row[1] for row in conn.execute("PRAGMA table_info(ticker_evidence)")}
    if "ticker" not in cols:
        return
    for row in conn.execute("SELECT * FROM ticker_evidence"):
        data = dict(row)
        ticker = str(data.get("ticker") or "").upper()
        if not ticker:
            continue
        now = data.get("last_updated")
        conn.execute("""
            INSERT INTO securities (ticker, name, type, active, updated_at) VALUES (?, ?, 'UNKNOWN', 1, COALESCE(?, CURRENT_TIMESTAMP))
            ON CONFLICT(ticker) DO UPDATE SET updated_at=excluded.updated_at
        """, (ticker, ticker, now))
        conn.execute("""
            INSERT INTO fundamentals (ticker, data_as_of, source, confidence, missing_reason, market_cap, trailing_pe, forward_pe, price_to_book, profit_margins, revenue_growth, fifty_day_ma, two_hundred_day_ma, fifty_two_week_high, fifty_two_week_low, current_price, free_cashflow)
            VALUES (?, ?, 'legacy', 0.5, 'legacy_backfill', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(ticker) DO NOTHING
        """, (ticker, now, data.get("market_cap"), data.get("trailing_pe"), data.get("forward_pe"), data.get("price_to_book"), data.get("profit_margins"), data.get("revenue_growth"), data.get("fifty_day_ma"), data.get("two_hundred_day_ma"), data.get("fifty_two_week_high"), data.get("fifty_two_week_low"), data.get("current_price"), data.get("free_cashflow")))
