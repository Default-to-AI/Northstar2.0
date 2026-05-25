import yfinance as yf
import json

stock = yf.Ticker('AAPL')
info = stock.info

print("--- EPS & Margins ---")
print("Gross Margin:", info.get('grossMargins'))
print("Operating Margin:", info.get('operatingMargins'))
print("Trailing EPS:", info.get('trailingEps'))
print("EBITDA:", info.get('ebitda'))
print("Net Income:", info.get('netIncomeToCommon'))

print("\n--- Valuation ---")
print("PriceToSales:", info.get('priceToSalesTrailing12Months'))
print("EV/EBITDA:", info.get('enterpriseToEbitda'))
print("PEG Ratio:", info.get('pegRatio'))

print("\n--- Cash Flow & Balance ---")
print("Operating Cash Flow:", info.get('operatingCashflow'))
print("Debt to Equity:", info.get('debtToEquity'))
print("Total Cash:", info.get('totalCash'))
print("Total Debt:", info.get('totalDebt'))
print("Current Ratio:", info.get('currentRatio'))
print("ROE:", info.get('returnOnEquity'))
print("ROA:", info.get('returnOnAssets'))

print("\n--- History Data (Quarterly) ---")
qf = stock.quarterly_financials
print(qf.head() if qf is not None else "None")

print("\n--- Valuation History ---")
hist = stock.history(period="5y", interval="3mo")
print(hist[['Close']].tail())
