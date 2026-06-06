# 02 - API Endpoints & Requests

Loading a single Insights page triggers multiple concurrent requests to the Node.js backend. This allows the UI to render progressively as different modules resolve.

## Primary Payload
### `GET /api/insights/:ticker`
- **Purpose:** The heaviest and most critical request. 
- **Response:** Returns aggregated data, live quotes, normalized valuations, margins, and historical chart arrays.
- **Dependencies:** Relies on the `dataAggregator.ts` engine which performs a fan-out to Yahoo, Finnhub, FMP, and a local Python process.

## Auxiliary Endpoints
### `GET /api/insights/:ticker/insider-trades`
- **Purpose:** Fetches recent insider trading activity for the specified ticker.

### `GET /api/insights/:ticker/analyst-estimates`
- **Purpose:** Fetches Wall Street consensus estimates (Revenue & EPS targets).

### `GET /api/insights/sector-pe`
- **Purpose:** Fetches sector-average P/E ratios.
- **Usage:** Used by the frontend to provide contextual tooltips and adjust the color-coding logic (e.g., a P/E of 30 might be "Green" for Technology but "Red" for Utilities).

### `GET /api/logo/ticker/:ticker`
- **Purpose:** Image `src` proxy request.
- **Usage:** Bypasses CORS and prevents exposing the `logo.dev` API token to the client-side browser.

### `POST /api/insights/:ticker/refresh`
- **Purpose:** Forces a cache invalidation and fresh data pull for the ticker.

### `GET /api/insights/:ticker/dev-patch`
- **Purpose:** Development-only endpoint used to patch missing data fields (like trailing PE, PS, PB, or dividend yield) to ensure the UI renders correctly when third-party APIs return null during local testing.
