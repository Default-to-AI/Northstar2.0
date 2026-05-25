from __future__ import annotations

import unittest

from scripts.research_engine.scoring import calculate_scores, load_model


class ScoringTests(unittest.TestCase):
    def test_complete_inputs_are_deterministic_and_actionable(self) -> None:
        model = load_model()
        factors = {"current_price": 100, "revenue_growth": 0.2, "roic": 0.2, "roe": 0.3, "operating_margin": 0.3, "current_ratio": 2, "fifty_day_ma": 110, "two_hundred_day_ma": 100, "fifty_two_week_low": 50, "forward_pe": 10}
        self.assertEqual(calculate_scores(factors, model), calculate_scores(factors, model))
        self.assertTrue(calculate_scores(factors, model)["actionable"])

    def test_missing_core_blocks_actionability(self) -> None:
        result = calculate_scores({"revenue_growth": 0.2}, load_model())
        self.assertFalse(result["actionable"])
        self.assertEqual(result["actionability_state"], "blocked_core_stale")


if __name__ == '__main__':
    unittest.main()
