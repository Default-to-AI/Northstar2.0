# Feature Specification: Morning Briefing + Events Dashboard

**Feature Branch**: `feat/slice-5-morning-briefing-events`
**Spec Source**: `docs/brainstorms/2026-05-25-slice5-morning-briefing-events.md`
**Created**: 26-05-2026
**Status**: Draft

## User Stories

### User Story 1 — Morning Briefing (Priority: P1)

As a user opening the Command Center before US market open, I want a single-pane morning briefing that shows pipeline readiness, pre-market context, top 3–5 opportunities, and portfolio snapshot so that I have everything I need to start the trading day in one view.

**Why this priority**: Without a consolidated briefing, the user has to piece together data from separate API calls (readiness, scanner, portfolio, market news). This is the "start here" view.

**Independent Test**: User opens the Command Center and sees a Morning Briefing card at the top showing four sections: readiness status (green/yellow/red), pre-market context (S&P futures direction, overnight moves), top opportunities (ticker + score + reason), and portfolio snapshot (NAV, cash %, exposure).

**Acceptance Scenarios**:
1. **Given** no briefing exists for today, **When** the Command Center loads, **Then** the briefing card shows a warning "No briefing for today" with a "Run briefing now" button and a fallback terminal command.
2. **Given** the briefing has run (via cron or manual), **When** the Command Center loads, **Then** the briefing card shows the four sections with live data and no stale-data badge.
3. **Given** the user clicks "Run briefing now", **When** the job executes successfully, **Then** the card renders the fresh briefing. On failure, shows an error message.
4. **Given** the briefing is stale (yesterday's data), **When** the Command Center loads before the pre-open run, **Then** the card shows a "stale data" warning.

---

### User Story 2 — Events Calendar (Priority: P1)

As a user, I want to see upcoming market events (earnings, macro economic releases, SEC filing deadlines) for my holdings and watchlist so that I don't miss time-sensitive catalysts.

**Why this priority**: Events are currently a manual calendar lookup. Automating this removes a significant friction point and ensures the user never misses an earnings date or macro event.

**Independent Test**: User opens the Command Center and sees an Upcoming Events card showing today's and this week's events, grouped by date and type, with holdings/watchlist symbols highlighted.

**Acceptance Scenarios**:
1. **Given** events have been collected, **When** the user views the events card, **Then** AAPL earnings next Wednesday appears with the correct date and a "Holding" badge.
2. **Given** a macro event (e.g., Fed decision) is in the hardcoded calendar, **When** the events card renders, **Then** it shows the event with its type, date, and description.
3. **Given** no events are collected for today, **When** the events card renders, **Then** it shows "No upcoming events" with a warning if the events collector hasn't run.

---

### User Story 3 — Pre-Open Scheduling (Priority: P2)

As a user, I want the briefing and events to be generated automatically before market open so that fresh data is waiting when I open the Command Center.

**Why this priority**: Automation is core to the product's value — the user should never have to remember to run the pipeline.

**Independent Test**: A Hermes cron job fires before 9:30 ET on trading days, runs the briefing and events collectors, and stores results in SQLite. The next Command Center load shows fresh data.

**Acceptance Scenarios**:
1. **Given** it's a weekday before 9:30 ET, **When** the cron job fires, **Then** `python3 -m scripts.research_engine.briefing` and `python3 -m scripts.research_engine.collect_events` execute successfully.
2. **Given** it's a weekend or holiday, **When** the cron job fires, **Then** it produces a "no trading today" status and skips heavy collection.

---

## Success Criteria

- **SC-001**: Command Center loads with briefing + events cards visible within one page load
- **SC-002**: "Run briefing now" button works end-to-end: click → job runs → data refreshes
- **SC-003**: Events calendar shows upcoming earnings and filings for active watchlist + holdings
- **SC-004**: All existing tests continue to pass. New endpoints have dedicated tests.
- **SC-005**: No LLM-generated briefing prose — template-driven composition from existing data

## Out of Scope (Slice 5)

- Intraday briefing updates or real-time events (→ Slice 6)
- Event-driven alerts (existing 4-type alert system is unchanged)
- Telegram/email delivery (Command Center UI only)
- Full SEC EDGAR document text parsing or XBRL extraction
- LLM-generated briefing prose — template-driven only
- Historical event tracking (current and upcoming only)
- Browser notifications or push for events

## Assumptions

- Hermes cron is available and configurable for pre-open scheduling
- yfinance provides reliable earnings calendar data for US-listed symbols
- SEC EDGAR JSON API is accessible with manageable rate limits for small symbol sets
- The existing `openResearchDb()` function works for the briefing storage
- The existing IBKR portfolio snapshot path (`data/ibkr-portfolio.json`) is correct
- The existing scanner/pre-market/readiness endpoints are available and working
- Template-driven briefing (not LLM-synthesized) is sufficient for v1