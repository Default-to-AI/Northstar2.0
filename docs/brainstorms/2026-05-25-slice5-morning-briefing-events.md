---
date: 2026-05-25
topic: slice5-morning-briefing-events
---

# Slice 5: Morning Briefing + Events Dashboard

## Summary

Add a pre-open Hermes cron job that generates a template-driven morning briefing (pipeline readiness, pre-market context, top 3–5 opportunities, portfolio snapshot) stored in SQLite, served via `GET /api/research/briefing`, and displayed as a new card on the Command Center. Pair it with a parallel events collector that ingests earnings calendar (yfinance), macro calendar (hardcoded known dates), and SEC filing deadlines (SEC EDGAR JSON API) for the watchlist/holdings, served via `GET /api/research/events`. A "Run briefing now" button on the Command Center executes the briefing inline when the pre-open run is missed.

---

## Problem Frame

Robert opens the Command Center before the US market open and needs a single-pane snapshot of data readiness, overnight context, today's top setups, and portfolio state — all refreshed before 9:30 ET. Right now these data points are scattered across separate API calls (readiness, scanner, portfolio, market news). There's no consolidated "start here" view. The existing alert card is reactive (problems to acknowledge), not proactive (here's what to know today). Events (earnings, macro, filings) are not tracked at all — they're manual calendar lookups.

---

## Actors

- A1. **Robert (user)**: Opens the Command Center pre-open; may also trigger briefing mid-session if stale.
- A2. **Hermes cron (scheduler)**: Pre-open job that runs the briefing and events collectors before 9:30 ET.
- A3. **Pre-open pipeline (batch process)**: Python scripts that collect briefing data and events into SQLite.
- A4. **UI (Command Center)**: Renders the briefing card and events card with necessary interactive controls.

---

## Key Flows

### F1. Pre-open briefing generation

- **Trigger:** Hermes cron fires (e.g., 8:45 ET Mon–Fri)
- **Actors:** A2, A3
- **Steps:**
  1. Cron invokes `python3 -m scripts.research_engine.briefing`
  2. Script reads pipeline readiness, scanner top-5, IBKR portfolio snapshot, pre-market prices (S&P futures, SPY overnight)
  3. Composes a template-driven JSON brief into a new `morning_briefs` SQLite table row
  4. Script also runs `python3 -m scripts.research_engine.collect_events`
  5. Events collector fetches earnings calendar (yfinance), macro calendar data, SEC filing deadlines for watchlist+holdings
  6. Writes event rows into a new `market_events` SQLite table
- **Outcome:** Fresh briefing and events available at `GET /api/research/briefing` and `GET /api/research/events`
- **Covered by:** R1, R2, R3, R5, R6

### F2. Manual briefing execution

- **Trigger:** Robert clicks "Run briefing now" button on Command Center when briefing hasn't run today
- **Actors:** A1, A4, A3
- **Steps:**
  1. UI POSTs to `/api/research/briefing/refresh`
  2. Backend spawns the briefing Python process, waits for completion
  3. On success, briefing row is written, response returns with fresh data
  4. UI replaces warning card with briefing content
  5. On failure, UI shows error message with fallback terminal command display
- **Outcome:** Manual execution bypasses cron and produces a fresh briefing inline
- **Covered by:** R4

### F3. Events calendar viewing

- **Trigger:** Robert views Command Center events card
- **Actors:** A1, A4
- **Steps:**
  1. UI fetches `GET /api/research/events`
  2. Groups events by date and type (earnings, macro, filings)
  3. Highlights events affecting watchlist/holdings
- **Outcome:** Robert sees today's and upcoming events affecting his portfolio and candidates
- **Covered by:** R6

---

## Requirements

**Briefing endpoint + storage**

- R1. The system MUST store the day's briefing as a single SQLite row in a `morning_briefs` table, keyed by date. Each run replaces the previous day's entry.
- R2. `GET /api/research/briefing` MUST return the stored briefing JSON, or `{ status: 'not_generated', date: '2026-05-25' }` if none exists for today.
- R3. The briefing MUST contain four sections: pipeline readiness (from existing readiness endpoint), pre-market context (S&P futures direction, significant overnight moves, key macro events today), top opportunities (top 3–5 compounder/tactical picks from scanner), and portfolio snapshot (NAV, cash %, exposure vs risk limits from IBKR).

**Manual refresh**

- R4. `POST /api/research/briefing/refresh` MUST execute the briefing Python script inline (not via cron), wait for completion, and return the fresh briefing JSON or an error. MUST respect a reasonable timeout and return a clear error if the job hangs.

**Pre-open scheduling**

- R5. A Hermes cron job MUST be configured to run `python3 -m scripts.research_engine.briefing` and `python3 -m scripts.research_engine.collect_events` before US market open (approx 9:00–9:15 ET Mon–Fri). Weekend/holiday runs SHOULD produce a "no trading today" status and skip heavy collection.

**Events collector + endpoint**

- R6. `GET /api/research/events` MUST return a curated list of upcoming market events (earnings dates, macro economic releases, SEC filing deadlines) relevant to the user's holdings, watchlist, and top scanner candidates. Events MUST be grouped by date and type.

**Events data sources**

- R7. Earnings calendar MUST be sourced from yfinance (free, no API key) for the relevant watchlist + holdings universe. No full-market earnings scraping — only symbols the user cares about.
- R8. Macro calendar MUST be a maintainable hardcoded list of known 2026 dates (Fed decisions, FOMC minutes, CPI, NFP, GDP, PCE, JOLTS) stored as a reference file, refreshed periodically.
- R9. SEC filing deadlines MUST be sourced from the SEC EDGAR JSON API (free) for upcoming 10-Q / 10-K due dates and recent 8-K filings for watchlist + holdings. MUST respect rate limits (< 5 req/s).

**UI — briefing card**

- R10. The Command Center MUST display a Morning Briefing card at the top of the page, above the existing alerts card.
- R11. When today's briefing hasn't run, the card MUST show a warning message with a "Run briefing now" button and a fallback terminal command displayed in a monospace code block.
- R12. When the briefing is available, the card MUST show the four sections (readiness, pre-market, opportunities, portfolio) in a compact terminal-style layout consistent with the existing Command Center design.

**UI — events card**

- R13. The Command Center MUST display an Upcoming Events card (below or beside the briefing) showing today's and this week's events.
- R14. Each event MUST show date, type (earnings, macro, filing), ticker/symbol where relevant, and a brief description.
- R15. Events affecting current holdings or watchlist MUST be visually highlighted (badge or accent color).

---

## Acceptance Examples

- AE1. **Covers R4, R10, R11.** Given no briefing exists for today, when Robert navigates to Command Center, the briefing card shows a warning "No briefing for today" with a "Run briefing now" button and a code block showing `python3 -m scripts.research_engine.briefing`.
- AE2. **Covers R4, R3, R12.** Given the briefing has run (via cron or manual button), when Robert navigates to Command Center, the briefing card shows the four sections with live data and no stale-data badge.
- AE3. **Covers R4.** Given the briefing hasn't run, when Robert clicks "Run briefing now", the button shows a loading state, the job executes, and on success the card renders the fresh briefing. On failure, the card shows an error message.
- AE4. **Covers R6, R14.** Given events have been collected, when Robert views the events card, AAPL earnings next Wednesday appears with the correct date and a "Holding" badge.

---

## Success Criteria

- Robert can open Command Center 15 minutes before market open and see a complete briefing + events calendar within one page load.
- The "Run briefing now" button works end-to-end: click → job runs → data refreshes → no cron involvement.
- Events calendar shows upcoming earnings and filings for at least the active watchlist + holdings symbols.
- All existing tests continue to pass. New endpoints have dedicated tests.

---

## Scope Boundaries

- No intraday briefing updates or real-time events — deferred to Slice 6.
- No event-driven alerts — alerts remain the existing 4-type system. Events are calendar-only for now.
- No Telegram/email delivery — Command Center UI only.
- No full SEC EDGAR document text parsing or XBRL extraction.
- No LLM-generated briefing prose — template-driven composition from existing data.
- No stale briefing display — if cron missed, show warning + manual refresh only.
- No historical event tracking — current and upcoming only.
- No browser notifications or push for events.
- No changes to the existing alert system, committee, outcomes, or portfolio dashboard.

---

## Key Decisions

- **Template-driven briefing, not LLM-synthesized**: Deterministic composition from existing APIs. Follows evidence-first design and avoids LLM-as-source-of-truth.
- **Python collectors for briefing/events, Express serving**: Consistent with existing architecture (Python batch, Express API reads SQLite).
- **Single-day briefing storage**: Replace each pre-open run. No history — briefings are ephemeral by design.
- **Manual run bypasses cron entirely**: POST endpoint executes the Python script inline. No cron API indirection.
- **SEC EDGAR for filing deadlines only**: Shallow queries, rate-limited, free. Full document parsing is deferred.

---

## Dependencies / Assumptions

- Hermes cron is available and configurable for the pre-open scheduling (R5).
- yfinance provides reliable earnings calendar data for US-listed symbols (R7).
- SEC EDGAR JSON API is accessible and rate limits are manageable for small symbol sets (R9).
- The existing `openResearchDb()` function works for the briefing storage (SQLite).
- The existing IBKR portfolio snapshot path (`data/ibkr-portfolio.json`) is correct for portfolio data (R3).
- The existing scanner/pre-market/readiness endpoints are available and working (R3).

---

## Outstanding Questions

### Deferred to Planning

- [Affects R1][Technical] What exactly should the `morning_briefs` table schema look like (JSON column vs normalized columns)?
- [Affects R6][Technical] Events table schema — single `market_events` table with a type discriminator, or separate tables per event type?
- [Affects R7][Needs research] yfinance earnings calendar — confirm it returns forward-looking earnings dates reliably enough for curated calendar use.
- [Affects R9][Needs research] SEC EDGAR JSON API — exact endpoint and response shape for filing deadline queries.
- [Affects R5][Technical] Exact Hermes cron job configuration for pre-open scheduling.