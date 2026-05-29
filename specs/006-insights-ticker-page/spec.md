# Feature Specification: Insights Ticker Page (/insights/:ticker)

**Feature Branch**: `feat/insights-ticker-page`
**Spec Source**: `tmp/Qualtrim - Insights Page/` (+ screenshots in chat)
**Created**: 29-05-2026
**Status**: Draft

## User Stories

### User Story 1 — Ticker Insights Page (Priority: P1)

As a user researching a specific symbol, I want a dedicated Insights page at `/insights/:ticker` that consolidates company context, key KPIs, time-series charts, insider trades, analyst estimates, and news so that I can assess the business quickly without leaving the app.

**Why this priority**: Insights are first-class in the product navigation (per project direction) and serve as a research “command page” per ticker.

**Independent Test**: Navigating to `/insights/GOOGL` renders a dark-themed, card-based dashboard with a header summary, KPI band, chart grid, and supporting narrative + tables. Page loads without console errors and handles missing/unknown tickers gracefully.

**Acceptance Scenarios**:
1. **Given** the user visits `/insights/GOOGL`, **When** the page loads, **Then** it renders a header with company identity (name, ticker, exchange) and last price + daily change, plus after-hours price + change when available.
2. **Given** the ticker has overview data, **When** the page loads, **Then** it shows a KPI band including valuation, cash flow, margins & growth, balance, and dividend metrics.
3. **Given** the ticker has chart series, **When** the user switches timeframe (Quarterly / TTM / Annually), **Then** charts update to the selected timeframe while keeping the current ticker.
4. **Given** the ticker has insider trades data, **When** the user views the Insider Trading card, **Then** a table of recent transactions renders (name, date, type, price, shares/value).
5. **Given** the ticker has analyst estimates data, **When** the user toggles EPS/Revenue, **Then** the estimates table updates accordingly.
6. **Given** the ticker has news data, **When** the page loads, **Then** a news list renders with title, source, date, and thumbnail when available.
7. **Given** the user visits `/insights/THIS_TICKER_DOES_NOT_EXIST`, **When** the page loads, **Then** it shows a clear empty/error state ("Unknown ticker" / "No data") and does not crash.

---

## Success Criteria

- **SC-001**: `/insights/:ticker` renders and is navigable from the existing Insights entry point.
- **SC-002**: Page loads with parallelized data fetching and shows per-module skeleton/loading states.
- **SC-003**: All modules handle partial data (e.g., charts missing, news empty) without layout breakage.
- **SC-004**: No regression to existing `/insights` list/landing.
- **SC-005**: All new endpoints / parsing logic have dedicated tests (Node `--test`).

## Out of Scope (for this slice)

- Auth/walled-garden behavior (assume public / local access)
- Real-time streaming quotes (polling acceptable)
- LLM-generated narrative synthesis (use data-driven rendering only)
- Portfolio coupling (holdings badges, etc.)

## Assumptions

- We will implement a Northstar-native data contract (not reuse Qualtrim endpoints verbatim).
- Data providers are allowed to differ; UI parity is the priority, exact numbers are not.
- Dark mode, card-grid layout, and “Insights first-class” navigation are required.
