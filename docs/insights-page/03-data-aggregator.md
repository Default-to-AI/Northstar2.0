# 03 - Data Aggregator Engine

The true complexity of the Insights page lies in the backend `aggregateInsightsData` function located in `src/services/dataAggregator.ts`. It performs a massive fan-out to multiple third-party providers and sanitizes the data before sending it to the client.

## Third-Party API Usage
- **Yahoo Finance (`yahoo-finance2`)**: Fetches current quotes, summary details, and earnings trends (used to mathematically project 2027 P/E).
- **Financial Modeling Prep (FMP)**: The primary source for deep fundamentals (income statements, balance sheets, cash flows).
- **AlphaVantage**: Used as a structural fallback if FMP fails. The engine includes a robust `mapAVToFMP` adapter to normalize AV data into the exact FMP schema.
- **Finnhub**: Fetches alternative valuation metrics (like `peExclExtraTTM`) and recent company news.
- **YFinance Python Script**: Spawns a local Python process (`scripts/research_engine/fetch_history.py`) to fetch robust historical pricing data.

## Cross-Source Normalization & Data Quality
Because financial APIs often report conflicting or anomalous numbers, the aggregator uses a **Data Normalization Engine**:

1. It pulls the same critical metric (e.g., `PE_TTM` or `EV_EBITDA`) from Yahoo, FMP, and Finnhub concurrently.
2. It calculates the median of the valid sources.
3. If any source deviates from the median by more than `2%`, it triggers a `DataNormalizationEvent`.
4. The engine falls back to using the median value to protect the UI from bad data.
5. **UI Surfacing:** These events are passed to the frontend and rendered as yellow warning triangles (⚠). Hovering over the warning explains exactly which source was the outlier and by what percentage.

## Stock-Based Compensation (SBC) Adjustments
The engine explicitly extracts Stock-Based Compensation from cash flow statements (attempting Yahoo first, then falling back to FMP/AV). 
This is used to compute two crucial "truthful" metrics:
- **SBC-Adjusted EV/EBITDA**
- **SBC-Adjusted FCF Yield**

This provides a much more accurate picture of a company's cash generation by heavily penalizing companies that rely on high stock issuance to fund operations.
