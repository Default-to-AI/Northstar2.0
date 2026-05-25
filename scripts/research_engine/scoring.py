from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def load_model(path: Path | None = None) -> dict[str, Any]:
    """Load and minimally validate the score model config."""
    model_path = path or Path(__file__).resolve().parents[2] / "config" / "score-models" / "v1.json"
    model = json.loads(model_path.read_text())
    if not model.get("model_id") or "compounder" not in model or "tactical" not in model:
        raise ValueError("Invalid score model config")
    return model


def _has_number(factors: dict[str, Any], key: str) -> bool:
    value = factors.get(key)
    return isinstance(value, (int, float))


def calculate_scores(factors: dict[str, Any], model: dict[str, Any]) -> dict[str, Any]:
    """Calculate deterministic compounder/tactical scores and transparency metadata."""
    missing_core = [key for key in model.get("core_required", []) if not _has_number(factors, key)]
    reasons: list[str] = []
    compounder = float(model["compounder"].get("base", 50))
    tactical = float(model["tactical"].get("base", 50))

    if _has_number(factors, "roic") and factors["roic"] > 0.15:
        compounder += 10; reasons.append("ROIC above 15%")
    if _has_number(factors, "roe") and factors["roe"] > 0.20:
        compounder += 10; reasons.append("ROE above 20%")
    if _has_number(factors, "revenue_growth") and factors["revenue_growth"] > 0.10:
        compounder += 10; reasons.append("Revenue growth above 10%")
    if _has_number(factors, "operating_margin") and factors["operating_margin"] > 0.20:
        compounder += 10; reasons.append("Operating margin above 20%")
    if _has_number(factors, "current_ratio") and factors["current_ratio"] > 1.5:
        compounder += 10; reasons.append("Current ratio above 1.5")

    if _has_number(factors, "fifty_day_ma") and _has_number(factors, "two_hundred_day_ma"):
        if factors["fifty_day_ma"] > factors["two_hundred_day_ma"]:
            tactical += 15; reasons.append("50-day MA above 200-day MA")
        else:
            tactical -= 10; reasons.append("50-day MA below 200-day MA")
    if _has_number(factors, "current_price") and _has_number(factors, "fifty_two_week_low") and factors["fifty_two_week_low"] != 0:
        distance = (factors["current_price"] - factors["fifty_two_week_low"]) / factors["fifty_two_week_low"]
        if distance < 0.10:
            tactical += 20; reasons.append("Near 52-week low")
        elif distance > 0.50:
            tactical += 10; reasons.append("Strong distance from 52-week low")
    if _has_number(factors, "forward_pe") and factors["forward_pe"] < 20:
        tactical += 15; reasons.append("Forward P/E below 20")

    actionable = len(missing_core) == 0
    return {
        "compounder_score": max(0.0, min(100.0, compounder)),
        "tactical_score": max(0.0, min(100.0, tactical)),
        "actionable": actionable,
        "actionability_state": "fresh_actionable" if actionable else "blocked_core_stale",
        "warnings": [] if actionable else [f"Missing core inputs: {', '.join(missing_core)}"],
        "reasons": reasons,
        "coverage": {"core_missing": missing_core},
        "missing_data": missing_core,
    }
