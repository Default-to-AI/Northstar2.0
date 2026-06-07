# Feature Specification: Command Center Decision Workflow

**Feature Branch**: `feat/command-center-decision-workflow`
**Spec Source**: Standing goal + user requirements in chat (2026-06-06)
**Created**: 06-06-2026
**Status**: Draft

## User Stories

### User Story 1 — Action-ready morning brief (Priority: P1)

As a user opening Northstar before the US market open, I want a morning brief that ends in explicit actions, not just information, so that I know what to ignore, what to watch, and what is actually on the table for today.

**Why this priority**: The product KPI is decision quality, not dashboard completeness. A briefing that does not terminate in clear actions fails the market-open job.

**Independent Test**: Opening the Command Center shows a morning brief summary with a single top daily idea plus an action queue containing normalized actions such as `Ignore`, `Watch`, `Long candidate`, `Trim`, `Stop-loss review`, or `Restructure`.

**Acceptance Scenarios**:
1. **Given** the briefing pipeline has completed, **When** the user opens the Command Center, **Then** the morning brief shows readiness, key events, top daily idea, and a decision queue with explicit action labels.
2. **Given** a ticker qualifies only for observation, **When** it appears in the action queue, **Then** it is labeled `Watch` and includes a concrete trigger or parameter to monitor.
3. **Given** no candidate meets the quality/setup threshold, **When** the brief renders, **Then** the top daily idea section clearly says there is no action-ready idea today rather than fabricating one.
4. **Given** source freshness is degraded, **When** the brief renders, **Then** the action queue shows visible data-quality warnings and any affected ideas are penalized or withheld.

---

### User Story 2 — Persona-informed scorecard (Priority: P1)

As a user, I want each important ticker evaluated through a transparent persona scorecard inspired by Warren Buffett, Chris Hohn, Micha Stocks, and Joseph Carlson so that I can compare styles without losing deterministic rigor.

**Why this priority**: The user's stated workflow explicitly blends multiple investor lenses. Northstar needs to model those lenses as heuristics, not ad hoc prose.

**Independent Test**: For a qualifying ticker, the Command Center or supporting API returns persona-aligned scores plus a blended Northstar interpretation, with missing-data penalties and visible factor inputs.

**Acceptance Scenarios**:
1. **Given** factor data exists for a ticker, **When** the persona score pipeline runs, **Then** it stores scores for Buffett, Hohn, Micha Stocks, and Joseph Carlson using a versioned model config.
2. **Given** one or more required factor inputs are missing, **When** the persona score is computed, **Then** the response records missing-data penalties instead of silently filling values.
3. **Given** two tickers have different quality, valuation, and catalyst profiles, **When** persona scores are compared, **Then** their score breakdowns differ in a way that matches the published heuristic weights.
4. **Given** the user inspects a decision, **When** persona scores are shown, **Then** the app exposes the numeric result and a brief deterministic explanation of what drove it.

---

### User Story 3 — Watchlist scenario decisions (Priority: P1)

As a user, I want watchlist ideas to include explicit scenarios and triggers so that a ticker can move from passive watch to active review only when predefined conditions are met.

**Why this priority**: The user explicitly asked for `Add to the watch list` decisions with clear parameters such as price triggers.

**Independent Test**: A watch-designated ticker renders with structured watch conditions like entry zone, breakout level, valuation threshold, catalyst, or invalidation rule.

**Acceptance Scenarios**:
1. **Given** a ticker is not buy-ready but deserves monitoring, **When** the decision engine classifies it, **Then** it returns `Watch` with at least one explicit trigger.
2. **Given** a trigger depends on price, **When** the decision renders, **Then** the app shows the exact level or range being watched.
3. **Given** a trigger depends on an event, **When** the decision renders, **Then** the app shows the catalyst and review timing.
4. **Given** a watched ticker no longer meets minimum quality or freshness criteria, **When** the workflow reruns, **Then** the decision is downgraded or removed rather than lingering indefinitely.

---

### User Story 4 — Long-term decision framing (Priority: P1)

As a user, I want long-duration ideas to include price targets, stop-losses, risk-reward, invalidation, and review triggers so that promising names become disciplined playbooks rather than vibes.

**Why this priority**: The user explicitly requested long-term decisions including price target, risk-reward ratio, and stop-loss.

**Independent Test**: A `Long candidate` decision includes required trade-playbook fields and renders without freeform ambiguity.

**Acceptance Scenarios**:
1. **Given** a ticker passes both quality and setup thresholds, **When** the decision engine marks it `Long candidate`, **Then** the output includes entry zone, stop-loss, target, risk-reward, and invalidation.
2. **Given** risk-reward cannot be justified from current levels, **When** a ticker is evaluated, **Then** it is not labeled `Long candidate`.
3. **Given** a long candidate has a near-term catalyst, **When** the brief renders, **Then** the review trigger references that catalyst explicitly.
4. **Given** a long candidate later breaches its invalidation logic, **When** the workflow reruns, **Then** the decision changes away from long rather than remaining stale.

---

### User Story 5 — Portfolio liveness and trim checks (Priority: P1)

As a user, I want the command center to actively check whether current holdings have run too far, become too large, or otherwise need review so that portfolio context informs daily decisions.

**Why this priority**: The user explicitly requested liveness, health, and trim checks for existing positions.

**Independent Test**: The Command Center renders a portfolio-health section listing holdings that require `Trim`, `Stop-loss review`, or `Restructure` actions, with reason codes.

**Acceptance Scenarios**:
1. **Given** a holding exceeds configured concentration or run-up limits, **When** the portfolio-health workflow runs, **Then** it emits a `Trim` action with the reason.
2. **Given** a holding remains valid but the stop level is stale, **When** the workflow runs, **Then** it emits a `Stop-loss review` action.
3. **Given** a holding faces a near-term event risk that conflicts with current sizing, **When** the workflow runs, **Then** the review reason appears in the health section.
4. **Given** all holdings are within guardrails, **When** the health section renders, **Then** it explicitly states that no holdings need action.

---

### User Story 6 — Stop-loss and restructuring governance (Priority: P2)

As a user, I want the system to detect stop governance issues and basic restructure candidates so that Northstar flags risk-management work, not just opportunity discovery.

**Why this priority**: Risk governance is part of the user's requested morning workflow, but it sits slightly behind the action queue and liveness checks in leverage.

**Independent Test**: The workflow can emit `Stop-loss review` and `Restructure` decisions when deterministic rules are triggered.

**Acceptance Scenarios**:
1. **Given** a holding stop is missing or clearly inconsistent with the current thesis/risk model, **When** the workflow runs, **Then** it emits `Stop-loss review`.
2. **Given** a holding no longer matches portfolio intent or factor quality deteriorates materially, **When** the workflow runs, **Then** it emits `Restructure`.
3. **Given** there is insufficient evidence to justify a restructure call, **When** the workflow runs, **Then** it withholds that action and records the data gap.

---

## Success Criteria

- **SC-001**: Command Center exposes a decision queue with normalized action labels, not just raw opportunities.
- **SC-002**: Persona scoring is deterministic, versioned, and backed by explicit factor inputs and penalties.
- **SC-003**: `Watch` decisions always include a concrete trigger or review parameter.
- **SC-004**: `Long candidate` decisions always include entry, stop, target, risk-reward, invalidation, and review trigger.
- **SC-005**: Portfolio-health checks can emit `Trim`, `Stop-loss review`, and `Restructure` actions with explicit reason codes.
- **SC-006**: If no action-ready idea exists, the system says so explicitly rather than fabricating conviction.
- **SC-007**: All new route and workflow logic has dedicated automated tests.
- **SC-008**: The implementation does not rely on freeform LLM-generated morning prose as the source of truth.

## Out of Scope (for this slice)

- Broker execution or order placement.
- Options, crypto, or non-US asset expansion.
- Real-time streaming intraday alerts beyond the current alert system.
- Using scraped YouTube transcripts as an unverified primary data source.
- Persona simulation as pure narrative roleplay without deterministic scoring.
- Public-cloud multi-user workflows or SaaS auth.

## Assumptions

- Existing research DB already contains enough factor/score/evidence context to support a first deterministic persona layer.
- Persona modeling is heuristic and configurable, not a claim to perfectly reproduce any investor's real process.
- Existing morning brief, events, and alert cards remain part of the Command Center rather than being replaced.
- The command center should prefer conservative withholding of action over false precision when data is missing.
