# 04 - Friction Points & Known Issues

While the Insights page provides a highly comprehensive view of a security, its aggressive data aggregation approach introduces several friction points and bottlenecks.

## 1. Latency & "Fan-Out" Fragility
Because `/api/insights/:ticker` awaits `fetchYahooQuote`, `fetchFinnhubNews`, `fetchPriceHistoryYFinance`, and fundamental endpoints (FMP/AV) simultaneously, the endpoint is strictly bottlenecked by the slowest third-party API. 
If Finnhub rate-limits the server or FMP takes 4 seconds to respond, the entire primary payload stalls, leading to a degraded user experience.

## 2. Python Process Spawning in Node
`fetchPriceHistoryYFinance` uses Node's `execPromise` to spin up a local Python shell (`python3 -m scripts.research_engine.fetch_history`). 
- **Risk:** Under heavy concurrent load (e.g., refreshing 10 tickers at once), spawning dozens of Python processes per minute can severely spike CPU/Memory and cause application-level timeouts.

## 3. Yahoo Finance Rate Limits & Scraping Flakiness
The `yahoo-finance2` library relies on scraping Yahoo's undocumented APIs rather than official commercial endpoints. 
- **Risk:** Excessive usage during active market hours can result in temporary IP bans from Yahoo, causing the critical "Quote" data to silently fail or return missing values.

## 4. Missing Sector PE Data
The Sector P/E matching relies on fuzzy string matching (`includes()`) between Yahoo's sector classification strings and the local sector P/E database. 
- **Risk:** If a company's sector string is categorized slightly differently, the match fails, leaving the frontend tooltip unavailable.

## 5. P/E 2027 Extrapolation Fragility
The `peFy2027` metric is mathematically extrapolated using the current NTM EPS and Yahoo's reported "Long Term Growth" (+5y) rate. 
- **Risk:** If the long-term growth rate reported by analysts is missing, deeply anomalous, or negative, this metric will return `null` or produce highly unrealistic valuations.
