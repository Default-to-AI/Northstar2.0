# Feature Specification: Research & Evidence Pipeline

**Feature Branch**: `001-research-evidence-pipeline`
**Created**: 26-05-2026
**Status**: Draft

## User Stories

### User Story 1 — Stock Screening & Discovery (Priority: P1)

As a retail investor, I want to screen stocks across multiple criteria (price, volume, sector, technical signals) so that I can discover potential investment opportunities I would otherwise miss.

**Why this priority**: Without a screening layer, the dashboard has no way to surface opportunities. Everything else builds on this.

**Independent Test**: A user can open the dashboard, set 3 filter criteria (e.g., P/E < 20, volume > 1M, positive momentum), and see a table of matching tickers with their key stats.

**Acceptance Scenarios**:
1. **Given** no filters are set, **When** the dashboard loads, **Then** it shows a default screener view with the top 50 stocks by market cap with key metrics (price, change, volume, P/E).
2. **Given** a user selects sector = "Technology" and P/E < 25, **When** they click "Screen", **Then** results show only tech stocks meeting the P/E threshold.
3. **Given** the screener returns results, **When** a user clicks a ticker, **Then** they navigate to that stock's detailed view.

---

### User Story 2 — Evidence Collection & Research (Priority: P1)

As a user, I want to collect research evidence about a specific stock (financials, news sentiment, analyst ratings, technical indicators) so that I can make informed investment decisions without visiting 5 different websites.

**Why this priority**: Evidence collection is the core value proposition — turning scattered research into a unified view.

**Independent Test**: When the user opens a stock detail view, they see at minimum: latest price + change, recent news headlines with sentiment, key financial ratios (P/E, EPS, revenue growth), and 3 technical indicators (RSI, MACD, SMA).

**Acceptance Scenarios**:
1. **Given** a user navigates to a stock (e.g., AAPL), **When** the detail view loads, **Then** they see real-time price, daily change, and volume.
2. **Given** the stock detail view is open, **When** the research module loads, **Then** they see recent news articles with positive/negative/neutral sentiment labels.
3. **Given** financial data is available for the stock, **When** the fundamentals panel loads, **Then** they see P/E, EPS, revenue growth, and debt-to-equity ratios.
4. **Given** price history is available, **When** the technical analysis panel loads, **Then** they see RSI (14-day), MACD, and 50/200-day SMA.

---

### User Story 3 — Decision Recommendations (Priority: P2)

As a user, I want the dashboard to aggregate evidence into clear buy/sell/hold recommendations with rationale so that I can act quickly on opportunities.

**Why this priority**: Recommendations are the highest-value output but depend on P1 collectors being in place first.

**Independent Test**: For any watched stock, the dashboard shows a recommendation (Buy/Sell/Hold) with a confidence score and a bullet-point evidence summary explaining the reasoning.

**Acceptance Scenarios**:
1. **Given** a stock has sufficient data collected, **When** the recommendation panel loads, **Then** it shows one of: Strong Buy, Buy, Hold, Sell, Strong Sell.
2. **Given** a recommendation is displayed, **When** the user clicks "Show Evidence", **Then** each supporting data point is shown with source and timestamp.
3. **Given** conflicting signals exist (e.g., positive sentiment but negative technicals), **When** the recommendation renders, **Then** it explains the conflict rather than suppressing it.

---

### User Story 4 — Watchlist & Alerts (Priority: P3)

As a user, I want to maintain a watchlist and receive alerts when evidence signals cross defined thresholds so that I don't need to monitor constantly.

**Why this priority**: Adds ongoing value but depends on the core pipeline working first.

**Independent Test**: A user adds a stock to their watchlist, and the next time a condition triggers (e.g., RSI drops below 30), the dashboard highlights the alert.

## Success Criteria

- **SC-001**: Screener loads results within 5 seconds
- **SC-002**: Stock detail view with all evidence panels loads within 10 seconds
- **SC-003**: Recommendation system produces explainable output with cited evidence
- **SC-004**: All collector modules run independently without crashing the pipeline
- **SC-005**: Raw data is preserved immutably — evidence can be traced back to source

## Out of Scope (v1)

- Real-time streaming data (daily/near-daily refresh is sufficient)
- Portfolio tracking / P&L
- Options analysis
- Paper trading or broker integration
- Multi-user / authentication
- Mobile app

## Assumptions

- Yahoo Finance and free tier financial APIs remain available
- User has a local machine for running data collection (not cloud-only)
- 15-minute delayed data from free APIs is acceptable for decision support
- User is comfortable with a self-hosted local dashboard
- Python 3.11+ is available with standard data science libraries