"""Deterministic decision-workflow scorer for persona snapshots.

Initial scope:
- load persona weighting config
- read latest factor snapshots per ticker
- compute one normalized score per persona
- persist rows into ``persona_score_snapshots``

This deliberately stops short of decision classification and portfolio-health writes.
Those land in the next slice steps once the score contract is stable.
"""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from scripts.research_engine.db import connect, resolve_db_path
from scripts.research_engine.migrations import migrate

logger = logging.getLogger(__name__)


REPO_ROOT = Path(__file__).resolve().parents[2]
PERSONA_MODEL_PATH = REPO_ROOT / "config" / "persona-model" / "v1.json"
PORTFOLIO_HEALTH_PATH = REPO_ROOT / "config" / "portfolio-health" / "v1.json"


def load_persona_model(path: Path | None = None) -> dict[str, Any]:
    """Load and minimally validate the persona model config."""
    model_path = path or PERSONA_MODEL_PATH
    model = json.loads(model_path.read_text(encoding="utf-8"))
    personas = model.get("personas")
    if model.get("version") != "v1" or not isinstance(personas, list) or not personas:
        raise ValueError("Invalid persona model config")
    return model


def load_portfolio_health_model(path: Path | None = None) -> dict[str, Any]:
    """Load and minimally validate the portfolio-health config."""
    model_path = path or PORTFOLIO_HEALTH_PATH
    model = json.loads(model_path.read_text(encoding="utf-8"))
    checks = model.get("checks")
    if model.get("version") != "v1" or not isinstance(checks, list) or not checks:
        raise ValueError("Invalid portfolio-health config")
    return model


def _clamp(value: float, floor: float = 0.0, ceiling: float = 100.0) -> float:
    """Clamp a score into the configured score range."""
    return max(floor, min(ceiling, value))


def _safe_number(value: Any) -> float | None:
    """Return a float for numeric inputs, otherwise None."""
    if isinstance(value, (int, float)):
        return float(value)
    return None


def _score_higher_better(value: float | None, low: float, high: float) -> float:
    """Normalize a metric where higher values are better."""
    if value is None:
        return 50.0
    if high <= low:
        return 50.0
    normalized = ((value - low) / (high - low)) * 100.0
    return _clamp(normalized)


def _score_lower_better(value: float | None, low: float, high: float) -> float:
    """Normalize a metric where lower values are better."""
    if value is None:
        return 50.0
    if high <= low:
        return 50.0
    normalized = ((high - value) / (high - low)) * 100.0
    return _clamp(normalized)


def _average(values: list[float]) -> float:
    """Return the arithmetic mean, defaulting to a neutral score."""
    if not values:
        return 50.0
    return sum(values) / len(values)


def _free_cash_flow_yield(factors: dict[str, Any]) -> float | None:
    """Compute free-cash-flow yield when market cap and FCF are present."""
    free_cashflow = _safe_number(factors.get("free_cashflow"))
    market_cap = _safe_number(factors.get("market_cap"))
    if free_cashflow is None or market_cap in (None, 0.0):
        return None
    return free_cashflow / market_cap


def _distance_from_52_week_high(factors: dict[str, Any]) -> float | None:
    """Compute discount vs. 52-week high as a rough valuation/catalyst proxy."""
    current_price = _safe_number(factors.get("current_price"))
    high_52 = _safe_number(factors.get("fifty_two_week_high"))
    if current_price is None or high_52 in (None, 0.0):
        return None
    return (high_52 - current_price) / high_52


def _momentum_gap(factors: dict[str, Any]) -> float | None:
    """Compute the moving-average spread as a momentum proxy."""
    ma_50 = _safe_number(factors.get("fifty_day_ma"))
    ma_200 = _safe_number(factors.get("two_hundred_day_ma"))
    if ma_50 is None or ma_200 in (None, 0.0):
        return None
    return (ma_50 - ma_200) / ma_200


def _build_metric_inputs(factors: dict[str, Any]) -> dict[str, float]:
    """Derive reusable normalized metric inputs from raw factors."""
    roic = _safe_number(factors.get("roic"))
    roe = _safe_number(factors.get("roe"))
    gross_margin = _safe_number(factors.get("gross_margin"))
    operating_margin = _safe_number(factors.get("operating_margin"))
    profit_margins = _safe_number(factors.get("profit_margins"))
    revenue_growth = _safe_number(factors.get("revenue_growth"))
    current_ratio = _safe_number(factors.get("current_ratio"))
    debt_to_equity = _safe_number(factors.get("debt_to_equity"))
    forward_pe = _safe_number(factors.get("forward_pe"))
    trailing_pe = _safe_number(factors.get("trailing_pe"))
    current_price = _safe_number(factors.get("current_price"))
    net_cash = _safe_number(factors.get("net_cash"))
    avg_dollar_volume = _safe_number(factors.get("avg_dollar_volume"))

    moat_strength = _average([
        _score_higher_better(roic, 0.05, 0.30),
        _score_higher_better(gross_margin, 0.20, 0.70),
        _score_higher_better(operating_margin, 0.05, 0.35),
    ])
    roic_quality = _score_higher_better(roic, 0.05, 0.30)
    fcf_yield = _score_higher_better(_free_cash_flow_yield(factors), 0.01, 0.08)
    earnings_consistency = _average([
        _score_higher_better(profit_margins, 0.05, 0.30),
        _score_higher_better(revenue_growth, 0.00, 0.25),
    ])
    capital_allocation = _average([
        _score_higher_better(roe, 0.08, 0.35),
        _score_lower_better(debt_to_equity, 25.0, 250.0),
    ])
    valuation_margin = _average([
        _score_lower_better(forward_pe, 10.0, 40.0),
        _score_lower_better(trailing_pe, 12.0, 45.0),
    ])
    balance_sheet = _average([
        _score_higher_better(current_ratio, 1.0, 2.5),
        _score_lower_better(debt_to_equity, 25.0, 250.0),
        _score_higher_better(net_cash, 0.0, 5_000_000_000.0),
    ])
    catalyst_proximity = _average([
        _score_higher_better(_distance_from_52_week_high(factors), 0.05, 0.30),
        _score_higher_better(_momentum_gap(factors), -0.10, 0.20),
    ])
    capital_return_potential = _average([
        fcf_yield,
        valuation_margin,
    ])
    governance_quality = _average([
        capital_allocation,
        balance_sheet,
    ])
    moat_durability = moat_strength
    liquidity = _score_higher_better(avg_dollar_volume, 10_000_000.0, 10_000_000_000.0)
    revenue_acceleration = _score_higher_better(revenue_growth, 0.00, 0.30)
    tam_expansion = _average([
        revenue_acceleration,
        _score_higher_better(_momentum_gap(factors), -0.10, 0.20),
    ])
    margin_trajectory = _average([
        _score_higher_better(operating_margin, 0.05, 0.35),
        _score_higher_better(profit_margins, 0.05, 0.30),
    ])
    unit_economics = _average([
        _score_higher_better(gross_margin, 0.20, 0.75),
        _score_higher_better(operating_margin, 0.05, 0.35),
    ])
    competitive_positioning = _average([
        moat_strength,
        roic_quality,
    ])
    valuation_context = valuation_margin
    earnings_quality = earnings_consistency
    dividend_safety = _average([
        _score_higher_better(profit_margins, 0.05, 0.30),
        balance_sheet,
    ])
    dividend_growth = _score_higher_better(revenue_growth, 0.00, 0.20)
    payout_stability = _average([
        dividend_safety,
        earnings_consistency,
    ])
    business_quality = moat_strength
    valuation_yield = fcf_yield
    total_return_potential = _average([
        valuation_margin,
        _score_higher_better(_momentum_gap(factors), -0.10, 0.20),
    ])
    valuation_discount = _average([
        valuation_margin,
        _score_higher_better(_distance_from_52_week_high(factors), 0.05, 0.30),
    ])

    return {
        "moat_strength": moat_strength,
        "roic_quality": roic_quality,
        "fcf_yield": fcf_yield,
        "earnings_consistency": earnings_consistency,
        "capital_allocation": capital_allocation,
        "valuation_margin": valuation_margin,
        "balance_sheet": balance_sheet,
        "catalyst_proximity": catalyst_proximity,
        "capital_return_potential": capital_return_potential,
        "governance_quality": governance_quality,
        "moat_durability": moat_durability,
        "liquidity": liquidity,
        "revenue_acceleration": revenue_acceleration,
        "tam_expansion": tam_expansion,
        "margin_trajectory": margin_trajectory,
        "unit_economics": unit_economics,
        "competitive_positioning": competitive_positioning,
        "valuation_context": valuation_context,
        "earnings_quality": earnings_quality,
        "dividend_safety": dividend_safety,
        "dividend_growth": dividend_growth,
        "payout_stability": payout_stability,
        "business_quality": business_quality,
        "valuation_yield": valuation_yield,
        "total_return_potential": total_return_potential,
        "valuation_discount": valuation_discount,
    }


def calculate_persona_score(persona: dict[str, Any], factors: dict[str, Any]) -> dict[str, Any]:
    """Calculate a weighted 0-100 persona score from normalized metric inputs."""
    weights = persona.get("weights", {})
    metric_inputs = _build_metric_inputs(factors)

    weighted_total = 0.0
    rationale: list[str] = []
    for metric_name, weight in weights.items():
        metric_score = metric_inputs.get(metric_name, 50.0)
        weighted_total += metric_score * float(weight)
        rationale.append(f"{metric_name}={metric_score:.1f} × {float(weight):.2f}")

    thresholds = persona.get("thresholds", {})
    final_score = round(_clamp(weighted_total), 2)
    return {
        "persona_id": str(persona["id"]),
        "score": final_score,
        "passes_minimum": final_score >= float(thresholds.get("minimum_score", 0)),
        "passes_strong": final_score >= float(thresholds.get("strong_score", 100)),
        "rationale": rationale,
        "inputs": {key: round(value, 2) for key, value in metric_inputs.items()},
    }


def _latest_factor_rows(conn: Any) -> list[Any]:
    """Return the latest factor snapshot per ticker."""
    return conn.execute(
        """
        SELECT fs.*
        FROM factor_snapshots fs
        WHERE fs.id IN (
            SELECT MAX(id) FROM factor_snapshots GROUP BY ticker
        )
        ORDER BY fs.ticker ASC
        """
    ).fetchall()


def run_persona_scoring(db_path: str | Path | None = None) -> list[dict[str, Any]]:
    """Compute persona scores from latest factor snapshots and persist them."""
    resolved = Path(db_path) if db_path else resolve_db_path()
    conn = connect(resolved)
    model = load_persona_model()

    try:
        migrate(conn)
        personas = model["personas"]
        persisted: list[dict[str, Any]] = []
        rows = _latest_factor_rows(conn)

        with conn:
            for row in rows:
                factors = json.loads(str(row["factors_json"]))
                for persona in personas:
                    result = calculate_persona_score(persona, factors)
                    conn.execute(
                        """
                        INSERT INTO persona_score_snapshots(
                            ticker, pipeline_run_id, persona_id, model_version, score,
                            rationale_json, inputs_json
                        ) VALUES (?, ?, ?, ?, ?, ?, ?)
                        """,
                        (
                            str(row["ticker"]),
                            row["pipeline_run_id"],
                            result["persona_id"],
                            model["version"],
                            result["score"],
                            json.dumps(result["rationale"]),
                            json.dumps(result["inputs"]),
                        ),
                    )
                    persisted.append(
                        {
                            "ticker": str(row["ticker"]),
                            "pipeline_run_id": row["pipeline_run_id"],
                            **result,
                        }
                    )

        logger.info("Persisted %s persona score snapshots across %s tickers", len(persisted), len(rows))
        return persisted
    finally:
        conn.close()


def _portfolio_path() -> Path:
    """Return the portfolio snapshot path."""
    return REPO_ROOT / "data" / "ibkr-portfolio.json"


def _load_portfolio_positions() -> tuple[list[dict[str, Any]], float | None]:
    """Load portfolio positions and NAV from the IBKR snapshot if present."""
    path = _portfolio_path()
    if not path.exists():
        return [], None
    payload = json.loads(path.read_text(encoding="utf-8"))
    positions = payload.get("positions") if isinstance(payload.get("positions"), list) else []
    nav_section = payload.get("nav") if isinstance(payload.get("nav"), dict) else {}
    nav_value = nav_section.get("endingValue")
    return positions, float(nav_value) if isinstance(nav_value, (int, float)) else None


def _latest_score_rows(conn: Any) -> dict[str, Any]:
    """Return the latest compounder/tactical score row for each ticker."""
    rows = conn.execute(
        """
        SELECT *
        FROM score_snapshots
        WHERE id IN (
            SELECT MAX(id) FROM score_snapshots GROUP BY ticker
        )
        """
    ).fetchall()
    return {str(row["ticker"]): row for row in rows}


def _latest_persona_rows(conn: Any) -> dict[str, list[Any]]:
    """Return the latest persona-score rows grouped by ticker."""
    rows = conn.execute(
        """
        SELECT pss.*
        FROM persona_score_snapshots pss
        JOIN (
            SELECT ticker, persona_id, MAX(id) AS max_id
            FROM persona_score_snapshots
            GROUP BY ticker, persona_id
        ) latest ON latest.max_id = pss.id
        ORDER BY pss.ticker ASC, pss.score DESC
        """
    ).fetchall()
    grouped: dict[str, list[Any]] = {}
    for row in rows:
        grouped.setdefault(str(row["ticker"]), []).append(row)
    return grouped


def _choose_decision_type(primary_score: float, strong: bool, minimum: bool, actionability_state: str | None) -> tuple[str, bool]:
    """Map scores into a deterministic daily action."""
    is_actionable = actionability_state == "fresh_actionable"
    if strong and is_actionable and primary_score >= 75.0:
        return "long_candidate", True
    if minimum and primary_score >= 60.0:
        return "watch", True
    return "ignore", False


def persist_decision_briefs(db_path: str | Path | None = None) -> list[dict[str, Any]]:
    """Persist daily decision classifications from latest scores and persona snapshots."""
    resolved = Path(db_path) if db_path else resolve_db_path()
    conn = connect(resolved)
    try:
        migrate(conn)
        score_rows = _latest_score_rows(conn)
        persona_rows = _latest_persona_rows(conn)
        persisted: list[dict[str, Any]] = []

        with conn:
            for ticker, personas in persona_rows.items():
                primary = personas[0]
                score_row = score_rows.get(ticker)
                actionability_state = str(score_row["actionability_state"]) if score_row is not None else None
                compounder_score = float(score_row["compounder_score"]) if score_row is not None and score_row["compounder_score"] is not None else None
                tactical_score = float(score_row["tactical_score"]) if score_row is not None and score_row["tactical_score"] is not None else None
                primary_score = float(primary["score"])
                minimum_threshold = primary_score >= 60.0
                strong_threshold = primary_score >= 80.0
                decision_type, threshold_met = _choose_decision_type(
                    primary_score,
                    strong_threshold,
                    minimum_threshold,
                    actionability_state,
                )
                rationale = json.loads(str(primary["rationale_json"]))
                evidence = {
                    "topPersonaScore": primary_score,
                    "actionabilityState": actionability_state,
                    "personaCount": len(personas),
                }
                conn.execute(
                    """
                    INSERT OR REPLACE INTO decision_briefs(
                        id, date, ticker, pipeline_run_id, decision_type, primary_persona,
                        compounder_score, tactical_score, threshold_met, rationale_json,
                        evidence_json, created_at
                    ) VALUES (
                        COALESCE((SELECT id FROM decision_briefs WHERE date = date('now') AND ticker = ?), NULL),
                        date('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')
                    )
                    """,
                    (
                        ticker,
                        ticker,
                        primary["pipeline_run_id"],
                        decision_type,
                        str(primary["persona_id"]),
                        compounder_score,
                        tactical_score,
                        1 if threshold_met else 0,
                        json.dumps(rationale),
                        json.dumps(evidence),
                    ),
                )
                persisted.append(
                    {
                        "ticker": ticker,
                        "decision_type": decision_type,
                        "primary_persona": str(primary["persona_id"]),
                        "threshold_met": threshold_met,
                    }
                )
        return persisted
    finally:
        conn.close()


def persist_portfolio_health_checks(db_path: str | Path | None = None) -> list[dict[str, Any]]:
    """Persist deterministic portfolio-governance checks from the IBKR snapshot."""
    resolved = Path(db_path) if db_path else resolve_db_path()
    conn = connect(resolved)
    model = load_portfolio_health_model()
    positions, nav = _load_portfolio_positions()
    persisted: list[dict[str, Any]] = []

    trim_cfg = next(check for check in model["checks"] if check["id"] == "trim")
    stop_cfg = next(check for check in model["checks"] if check["id"] == "stop_loss")
    restructure_cfg = next(check for check in model["checks"] if check["id"] == "restructure")
    sector_cfg = next(check for check in model["checks"] if check["id"] == "sector_concentration")

    try:
        migrate(conn)
        latest_scores = _latest_score_rows(conn)
        security_sectors = {
            str(row["ticker"]): str(row["sector"] or "unknown")
            for row in conn.execute("SELECT ticker, sector FROM securities").fetchall()
        }
        sector_values: dict[str, float] = {}

        with conn:
            for position in positions:
                ticker = str(position.get("symbol") or "").upper()
                if not ticker or ticker not in security_sectors:
                    continue
                position_value = float(position.get("positionValue") or 0.0)
                cost_basis = float(position.get("costBasisMoney") or 0.0)
                unrealized_pnl = float(position.get("unrealizedPnL") or 0.0)
                position_pct = (position_value / nav) if nav not in (None, 0.0) else 0.0
                score_row = latest_scores.get(ticker)
                compounder_score = float(score_row["compounder_score"]) if score_row is not None and score_row["compounder_score"] is not None else None

                drawdown_pct = abs(unrealized_pnl) / cost_basis if cost_basis > 0 and unrealized_pnl < 0 else 0.0
                trim_triggered = position_pct > float(trim_cfg["parameters"]["max_position_pct"])
                stop_triggered = drawdown_pct > float(stop_cfg["parameters"]["stop_loss_threshold"])
                restructure_triggered = compounder_score is not None and compounder_score < 40.0

                checks = [
                    ("trim", trim_triggered, position_pct, float(trim_cfg["parameters"]["max_position_pct"]), {"positionPct": round(position_pct, 4), "nav": nav}),
                    ("stop_loss", stop_triggered, drawdown_pct, float(stop_cfg["parameters"]["stop_loss_threshold"]), {"drawdownPct": round(drawdown_pct, 4), "costBasis": cost_basis}),
                    ("restructure", restructure_triggered, compounder_score, 40.0, {"compounderScore": compounder_score}),
                ]
                for check_type, triggered, current_value, threshold_value, rationale in checks:
                    conn.execute(
                        """
                        INSERT OR REPLACE INTO portfolio_health_checks(
                            id, date, ticker, pipeline_run_id, check_type, triggered,
                            current_value, threshold_value, rationale_json, created_at
                        ) VALUES (
                            COALESCE((SELECT id FROM portfolio_health_checks WHERE date = date('now') AND ticker = ? AND check_type = ?), NULL),
                            date('now'), ?, ?, ?, ?, ?, ?, ?, datetime('now')
                        )
                        """,
                        (
                            ticker,
                            check_type,
                            ticker,
                            score_row["pipeline_run_id"] if score_row is not None else None,
                            check_type,
                            1 if triggered else 0,
                            current_value,
                            threshold_value,
                            json.dumps(rationale),
                        ),
                    )
                    persisted.append({"ticker": ticker, "check_type": check_type, "triggered": triggered})

                sector = security_sectors.get(ticker, "unknown")
                sector_values[sector] = sector_values.get(sector, 0.0) + position_value

            if nav not in (None, 0.0):
                max_sector_pct = float(sector_cfg["parameters"]["max_sector_pct"])
                for position in positions:
                    ticker = str(position.get("symbol") or "").upper()
                    if not ticker or ticker not in security_sectors:
                        continue
                    sector = security_sectors.get(ticker, "unknown")
                    sector_value = sector_values.get(sector, 0.0)
                    sector_pct = sector_value / nav
                    conn.execute(
                        """
                        INSERT OR REPLACE INTO portfolio_health_checks(
                            id, date, ticker, pipeline_run_id, check_type, triggered,
                            current_value, threshold_value, rationale_json, created_at
                        ) VALUES (
                            COALESCE((SELECT id FROM portfolio_health_checks WHERE date = date('now') AND ticker = ? AND check_type = 'sector_concentration'), NULL),
                            date('now'), ?, ?, 'sector_concentration', ?, ?, ?, ?, datetime('now')
                        )
                        """,
                        (
                            ticker,
                            ticker,
                            latest_scores.get(ticker)["pipeline_run_id"] if latest_scores.get(ticker) is not None else None,
                            1 if sector_pct > max_sector_pct else 0,
                            sector_pct,
                            max_sector_pct,
                            json.dumps({"sector": sector, "sectorPct": round(sector_pct, 4), "sectorValue": sector_value}),
                        ),
                    )
                    persisted.append({"ticker": ticker, "check_type": "sector_concentration", "triggered": sector_pct > max_sector_pct})
        return persisted
    finally:
        conn.close()


def run_decision_workflow(db_path: str | Path | None = None) -> dict[str, int]:
    """Run persona scoring, decision synthesis, and portfolio-health persistence."""
    persona_rows = run_persona_scoring(db_path)
    decision_rows = persist_decision_briefs(db_path)
    health_rows = persist_portfolio_health_checks(db_path)
    return {
        "persona_rows": len(persona_rows),
        "decision_rows": len(decision_rows),
        "health_rows": len(health_rows),
    }


def main() -> None:
    """CLI entry point for persona-score generation."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%H:%M:%S",
    )
    result = run_decision_workflow()
    logger.info(
        "Decision workflow complete — persona_rows=%s decision_rows=%s health_rows=%s",
        result["persona_rows"],
        result["decision_rows"],
        result["health_rows"],
    )


if __name__ == "__main__":
    main()
