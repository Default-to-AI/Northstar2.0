import yfinance as yf

etfs = {
    'Technology': 'XLK',
    'Health Care': 'XLV',
    'Financials': 'XLF',
    'Energy': 'XLE',
    'Industrials': 'XLI',
    'Consumer Discretionary': 'XLY',
    'Consumer Staples': 'XLP',
    'Utilities': 'XLU',
    'Materials': 'XLB',
    'Real Estate': 'XLRE',
    'Communication Services': 'XLC'
}

for sector, ticker in etfs.items():
    try:
        info = yf.Ticker(ticker).info
        pe = info.get('trailingPE')
        print(f"{sector} ({ticker}): {pe}")
    except Exception as e:
        print(f"{sector} ({ticker}): Error {e}")
