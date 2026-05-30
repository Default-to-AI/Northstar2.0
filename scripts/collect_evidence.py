from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import sys
from typing import Any

import yfinance as yf
from dotenv import load_dotenv

from research_engine.db import connect
from research_engine.migrations import migrate

load_dotenv()


FUNDAMENTAL_COLUMNS = [
    "market_cap", "trailing_pe", "forward_pe", "price_to_book", "price_to_sales",
    "ev_to_ebitda", "ev_to_gross_profit", "peg_ratio", "free_cashflow",
    "operating_cash_flow", "gross_margin", "operating_margin", "profit_margins",
    "revenue_growth", "eps", "ebitda", "diluted_net_income", "debt_to_equity",
    "net_cash", "current_ratio", "roe", "roic", "revenue_per_employee",
    "fifty_day_ma", "two_hundred_day_ma", "fifty_two_week_high",
    "fifty_two_week_low", "current_price", "avg_dollar_volume", "momentum_history", "valuation_history",
    "sbc_add_back", "ev_to_ebitda_normalized",
]


def _finite_or_none(value: Any) -> float | None:
    """Convert provider numeric values into SQLite-safe floats."""
    if value is None or isinstance(value, bool):
        return None
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return None
    return parsed if math.isfinite(parsed) else None


def _collect_histories(stock: yf.Ticker) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """Collect compact history arrays without failing core evidence collection."""
    momentum_history: list[dict[str, Any]] = []
    try:
        quarterly = stock.quarterly_financials
        if not quarterly.empty:
            for column in quarterly.columns[:8]:
                quarter_data: dict[str, Any] = {"date": str(column)[:10]}
                for index in quarterly.index:
                    parsed = _finite_or_none(quarterly.loc[index, column])
                    if parsed is not None:
                        quarter_data[str(index)] = parsed
                momentum_history.append(quarter_data)
    except Exception as exc:  # provider sidecar is non-core; preserve core collection
        print(f"Warning: failed to fetch momentum history: {exc}")

    valuation_history: list[dict[str, Any]] = []
    try:
        history = stock.history(period="5y", interval="3mo")
        for index, row in history.iterrows():
            close = _finite_or_none(row.get("Close"))
            if close is not None:
                valuation_history.append({"date": str(index)[:10], "close": close})
    except Exception as exc:
        print(f"Warning: failed to fetch valuation history: {exc}")
    return momentum_history, valuation_history


def collect_evidence(ticker: str) -> None:
    """Collect Yahoo evidence for one ticker into normalized V1 tables."""
    normalized_ticker = ticker.upper().strip()
    print(f"Collecting evidence for {normalized_ticker}...")
    stock = yf.Ticker(normalized_ticker)
    info = stock.info
    if not info or "symbol" not in info:
        print(f"Failed to fetch data for {normalized_ticker}")
        sys.exit(1)

    total_revenue = _finite_or_none(info.get("totalRevenue"))
    free_cashflow = _finite_or_none(info.get("freeCashflow"))
    total_cash = _finite_or_none(info.get("totalCash")) or 0.0
    total_debt = _finite_or_none(info.get("totalDebt")) or 0.0
    full_time_employees = _finite_or_none(info.get("fullTimeEmployees"))
    momentum_history, valuation_history = _collect_histories(stock)
    now = dt.datetime.now(dt.timezone.utc).isoformat()

    fundamentals: dict[str, Any] = {
        "market_cap": _finite_or_none(info.get("marketCap")),
        "trailing_pe": _finite_or_none(info.get("trailingPE")),
        "forward_pe": _finite_or_none(info.get("forwardPE")),
        "price_to_book": _finite_or_none(info.get("priceToBook")),
        "price_to_sales": _finite_or_none(info.get("priceToSalesTrailing12Months")),
        "ev_to_ebitda": _finite_or_none(info.get("enterpriseToEbitda")),
        "ev_to_gross_profit": None,
        "peg_ratio": _finite_or_none(info.get("pegRatio")),
        "free_cashflow": free_cashflow,
        "operating_cash_flow": _finite_or_none(info.get("operatingCashflow")),
        "gross_margin": _finite_or_none(info.get("grossMargins")),
        "operating_margin": _finite_or_none(info.get("operatingMargins")),
        "profit_margins": _finite_or_none(info.get("profitMargins")),
        "revenue_growth": _finite_or_none(info.get("revenueGrowth")),
        "eps": _finite_or_none(info.get("trailingEps")),
        "ebitda": _finite_or_none(info.get("ebitda")),
        "diluted_net_income": _finite_or_none(info.get("netIncomeToCommon")),
        "debt_to_equity": _finite_or_none(info.get("debtToEquity")),
        "net_cash": total_cash - total_debt,
        "current_ratio": _finite_or_none(info.get("currentRatio")),
        "roe": _finite_or_none(info.get("returnOnEquity")),
        "roic": _finite_or_none(info.get("returnOnAssets")),
        "revenue_per_employee": (total_revenue / full_time_employees) if total_revenue and full_time_employees else None,
        "fifty_day_ma": _finite_or_none(info.get("fiftyDayAverage")),
        "two_hundred_day_ma": _finite_or_none(info.get("twoHundredDayAverage")),
        "fifty_two_week_high": _finite_or_none(info.get("fiftyTwoWeekHigh")),
        "fifty_two_week_low": _finite_or_none(info.get("fiftyTwoWeekLow")),
        "current_price": _finite_or_none(info.get("currentPrice") or info.get("regularMarketPrice")),
        "avg_dollar_volume": None,
        "momentum_history": json.dumps(momentum_history),
        "valuation_history": json.dumps(valuation_history),
        "sbc_add_back": None,
        "ev_to_ebitda_normalized": None,
    }

    # Extract SBC from cash flow statement for EV/EBITDA normalization
    try:
        cf_annual = stock.cashflow
        if cf_annual is not None and not cf_annual.empty:
            # Look for Stock Based Compensation row
            sbc_row_names = [idx for idx in cf_annual.index if "stock" in str(idx).lower() and "comp" in str(idx).lower()]
            if sbc_row_names:
                sbc_val = _finite_or_none(cf_annual.loc[sbc_row_names[0]].iloc[0])
                if sbc_val is not None:
                    fundamentals["sbc_add_back"] = abs(sbc_val)
    except Exception as exc:
        print(f"Warning: failed to extract SBC from cash flow: {exc}")

    # Compute normalized EV/EBITDA (EBITDA inclusive of SBC add-back)
    ebitda_val = fundamentals.get("ebitda")
    sbc_val = fundamentals.get("sbc_add_back")
    ev_to_ebitda_raw = fundamentals.get("ev_to_ebitda")
    enterprise_value = _finite_or_none(info.get("enterpriseValue"))
    if ebitda_val is not None and sbc_val is not None and enterprise_value is not None:
        normalized_ebitda = ebitda_val + sbc_val
        if normalized_ebitda > 0:
            fundamentals["ev_to_ebitda_normalized"] = enterprise_value / normalized_ebitda
    elif ev_to_ebitda_raw is not None:
        # Fallback: use raw if SBC not available
        fundamentals["ev_to_ebitda_normalized"] = ev_to_ebitda_raw
    average_volume = _finite_or_none(info.get("averageVolume") or info.get("averageVolume10days"))
    current_price = fundamentals.get("current_price")
    if average_volume is not None and isinstance(current_price, float):
        fundamentals["avg_dollar_volume"] = average_volume * current_price
    missing_core = [key for key in ("current_price", "revenue_growth") if fundamentals.get(key) is None]
    status = "degraded" if missing_core else "ready"
    missing_reason = f"missing core fields: {', '.join(missing_core)}" if missing_core else None

    conn = connect()
    try:
        migrate(conn)
        with conn:
            run_cursor = conn.execute(
                """
                INSERT INTO pipeline_runs (pipeline_name, started_at, completed_at, trigger, status, error_summary)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                ("collect-evidence", now, now, "manual", status, missing_reason),
            )
            if run_cursor.lastrowid is None:
                raise RuntimeError("Failed to record collect-evidence pipeline run")
            pipeline_run_id = int(run_cursor.lastrowid)
            source_cursor = conn.execute(
                """
                INSERT INTO source_runs (pipeline_run_id, source_name, tier, started_at, completed_at, data_as_of, status, retry_count, error_message)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (pipeline_run_id, "yfinance", "core", now, now, now, status, 0, missing_reason),
            )
            if source_cursor.lastrowid is None:
                raise RuntimeError("Failed to record yfinance source run")
            source_run_id = int(source_cursor.lastrowid)
            conn.execute(
                """
                INSERT INTO securities (ticker, name, type, active, exchange, sector, updated_at)
                VALUES (?, ?, ?, 1, ?, ?, ?)
                ON CONFLICT(ticker) DO UPDATE SET
                    name=excluded.name,
                    type=excluded.type,
                    exchange=excluded.exchange,
                    sector=excluded.sector,
                    active=excluded.active,
                    updated_at=excluded.updated_at
                """,
                (
                    normalized_ticker,
                    info.get("shortName") or normalized_ticker,
                    info.get("quoteType") or "Unknown",
                    info.get("exchange") or "Unknown",
                    info.get("sector") or "Unknown",
                    now,
                ),
            )
            assignments = ", ".join(f"{column}=excluded.{column}" for column in FUNDAMENTAL_COLUMNS)
            placeholders = ", ".join("?" for _ in FUNDAMENTAL_COLUMNS)
            conn.execute(
                f"""
                INSERT INTO fundamentals (
                    ticker, data_as_of, source, confidence, missing_reason, pipeline_run_id, source_run_id,
                    {", ".join(FUNDAMENTAL_COLUMNS)}
                ) VALUES (?, ?, ?, ?, ?, ?, ?, {placeholders})
                ON CONFLICT(ticker) DO UPDATE SET
                    data_as_of=excluded.data_as_of,
                    source=excluded.source,
                    confidence=excluded.confidence,
                    missing_reason=excluded.missing_reason,
                    pipeline_run_id=excluded.pipeline_run_id,
                    source_run_id=excluded.source_run_id,
                    {assignments}
                """,
                (
                    normalized_ticker, now, "yfinance", 0.85 if status == "ready" else 0.55,
                    missing_reason, pipeline_run_id, source_run_id,
                    *(fundamentals[column] for column in FUNDAMENTAL_COLUMNS),
                ),
            )
        print(f"Successfully stored normalized evidence for {normalized_ticker} ({status}).")
    finally:
        conn.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Collect evidence for a ticker.")
    parser.add_argument("--ticker", required=True, help="Ticker symbol (e.g., AAPL)")
    args = parser.parse_args()
    collect_evidence(args.ticker)
