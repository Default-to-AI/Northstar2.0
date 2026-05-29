# Plan: Insights Ticker Page (/insights/:ticker)

**Spec**: `specs/006-insights-ticker-page/spec.md`
**Created**: 29-05-2026
**Status**: Draft

## Summary

Implement a first-class per-ticker Insights page at `/insights/:ticker` with a dark, card-based dashboard matching the captured Qualtrim reference layout:
- Header identity + quote (regular + after-hours)
- KPI band (valuation / cash flow / margins & growth / balance / dividend)
- Chart grid with timeframe toggle (Quarterly / TTM / Annual)
- Narrative cards (Competitive Advantages, Investment Risks, Qualtrim Brief equivalent)
- Tables (Insider Trades, Analyst Estimates)
- News list with thumbnails

This plan is deliberately structured to separate concerns:
1) Frontend route + UI skeleton
2) Backend endpoints + provider adapters
3) Shared types + parsing
4) Tests + reliability behavior for missing data

## Reference artifacts (ground truth)

Captured reference (GOOGL):
- HTML shell: `tmp/Qualtrim - Insights Page/www.qualtrim.com/app/insights/GOOGL.html`
- Captured data contracts (examples):
  - `tmp/Qualtrim - Insights Page/www.qualtrim.com/api/insights/GOOGL/overview-flexible.html`
  - `tmp/Qualtrim - Insights Page/www.qualtrim.com/api/insights/GOOGL/news.html`
  - `tmp/Qualtrim - Insights Page/www.qualtrim.com/api/insights/GOOGL/insider-trades.html`
  - `tmp/Qualtrim - Insights Page/www.qualtrim.com/api/insights/GOOGL/chart-flex/*/quarter.html`
  - `tmp/Qualtrim - Insights Page/www.qualtrim.com/api/quotes/GOOGL/quote/flexible.html`
  - `tmp/Qualtrim - Insights Page/www.qualtrim.com/api/quotes/GOOGL/after-market-quote.html`

Screenshots in chat show the intended module layout.

## Key Technical Decisions

1. **Data contracts**: Define Northstar-owned API contracts under `/api/insights/:ticker/*` that mirror the *shape* needed by the UI modules (not Qualtrim1).
2. **Fetch model**: Use TanStack Query on the frontend to parallelize module fetches and show per-card skeletons.
3. **Timeframes**: Define a small enum for chart timeframe: `quarter`, `ttm`, `annual`. Backend must accept timeframe and return a uniform chart series shape.
4. **Partial data**: Every module is optional. The page must render even if some endpoints fail (render empty state per card).

## API surface (proposed)

- `GET /api/insights/:ticker/overview` > header identity + KPI band
- `GET /api/insights/:ticker/brief` > short bullet list summary (template-driven)
- `GET /api/insights/:ticker/narrative` > competitive advantages + risks (if available)
- `GET /api/insights/:ticker/news?limit=20`
- `GET /api/insights/:ticker/insider-trades?limit=50`
- `GET /api/insights/:ticker/analyst-estimates` (EPS/Revenue split can be query param)
- `GET /api/insights/:ticker/charts?timeframe=quarter` returning multiple chart series (or separate endpoints per chart if simpler)

## Implementation Units

### U1. Add frontend route + page shell for `/insights/:ticker`

**Goal:** Add new route and initial layout skeleton matching the reference grid.

**Files:**
- `src/pages/InsightsTicker.tsx` (new)
- `src/pages/CommandCenter.tsx` or existing router entry (where routes are defined)
- `src/components/insights/*` (new module components; exact structure to follow existing conventions)

**Approach:**
- Implement page-level layout: header row, KPI band, chart grid, narrative cards, tables, and news column.
- Use placeholder components with consistent card styling.

**Test scenarios:**
- Route renders for valid ticker param.
- Unknown ticker param still renders page shell.

### U2. Define shared TypeScript types for Insights page contracts

**Goal:** Create typed contracts for each module response.

**Files:**
- `src/shared/insights/types.ts` (or closest existing shared types location)

**Approach:**
- Define types: `Overview`, `Quote`, `KpiBand`, `ChartSeries`, `NewsItem`, `InsiderTrade`, `AnalystEstimates`.

**Test scenarios:**
- Type-level only (no runtime test required) > ensure compilation in CI.

### U3. Implement backend endpoints under `/api/insights/:ticker/*`

**Goal:** Provide the server API endpoints required by the frontend.

**Files:**
- `src/server/routes/insights.ts` (new or existing insights router)
- `src/server/app.ts` (wire router)
- `src/server/services/insights/*` (provider adapters)

**Approach:**
- Use existing provider patterns (yfinance/finnhub/etc.) where present.
- Implement per-endpoint error isolation > one failing module should not cascade to others.

**Test scenarios:**
- Endpoint returns 200 with mocked provider for known ticker.
- Endpoint returns 404/empty for unknown ticker without throwing.
- Endpoint returns consistent schema with missing optional fields.

### U4. Implement chart aggregation with timeframe toggle

**Goal:** Support chart grids updated by timeframe.

**Files:**
- `src/server/services/insights/charts.ts`
- `src/pages/InsightsTicker.tsx` (wire toggle)

**Approach:**
- Backend: accept `timeframe` and return a list of `ChartSeries`.
- Frontend: toggle triggers refetch; charts re-render.

**Test scenarios:**
- Switching timeframe refetches and updates charts.
- Invalid timeframe handled with 400 + message.

### U5. Tests + UI empty states + basic styling parity

**Goal:** Make the page reliable and visually consistent with the reference.

**Files:**
- `src/server/routes/__tests__/insights.test.ts` (or equivalent)
- `src/pages/__tests__/InsightsTicker.test.tsx` (if frontend tests exist) or skip if not in repo
- `src/styles/*` or component-level styling

**Approach:**
- Add server tests for contracts.
- Ensure each card handles: loading, empty, error.

**Test scenarios:**
- Simulate missing news > renders "No recent news" state.
- Simulate provider error > renders error state in-card, page continues.

## Risks / Open Questions

- Data provider parity: some Qualtrim modules (e.g., narrative advantages/risks, KPI-specific charts like Cloud backlog) may not be available from current providers. We can stub or omit those cards initially, but keep layout.
- Frontend routing structure: need to confirm existing router strategy in this repo.

## Deferred to Follow-Up Work

- Add `/insights` landing page enhancements (search, watchlist integration)
- Add caching layer for provider calls
- Add index pills market overview to header if not already present elsewhere
