import os
import sys
import argparse
import datetime
import sqlite3
import yfinance as yf
from dotenv import load_dotenv

load_dotenv()

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'northstar.db')

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    return conn

def collect_evidence(ticker):
    print(f"Collecting evidence for {ticker}...")
    stock = yf.Ticker(ticker)
    info = stock.info

    if not info or 'symbol' not in info:
        print(f"Failed to fetch data for {ticker}")
        sys.exit(1)

    market_cap = info.get('marketCap')
    trailing_pe = info.get('trailingPE')
    forward_pe = info.get('forwardPE')
    price_to_book = info.get('priceToBook')
    profit_margins = info.get('profitMargins')
    revenue_growth = info.get('revenueGrowth')
    fifty_day_ma = info.get('fiftyDayAverage')
    two_hundred_day_ma = info.get('twoHundredDayAverage')
    fifty_two_week_high = info.get('fiftyTwoWeekHigh')
    fifty_two_week_low = info.get('fiftyTwoWeekLow')
    current_price = info.get('currentPrice') or info.get('regularMarketPrice')
    
    last_updated = datetime.datetime.now(datetime.timezone.utc).isoformat()

    conn = init_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO ticker_evidence (
            ticker, market_cap, trailing_pe, forward_pe, price_to_book,
            profit_margins, revenue_growth, fifty_day_ma, two_hundred_day_ma,
            fifty_two_week_high, fifty_two_week_low, current_price, last_updated
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(ticker) DO UPDATE SET
            market_cap=excluded.market_cap,
            trailing_pe=excluded.trailing_pe,
            forward_pe=excluded.forward_pe,
            price_to_book=excluded.price_to_book,
            profit_margins=excluded.profit_margins,
            revenue_growth=excluded.revenue_growth,
            fifty_day_ma=excluded.fifty_day_ma,
            two_hundred_day_ma=excluded.two_hundred_day_ma,
            fifty_two_week_high=excluded.fifty_two_week_high,
            fifty_two_week_low=excluded.fifty_two_week_low,
            current_price=excluded.current_price,
            last_updated=excluded.last_updated
    ''', (
        ticker, market_cap, trailing_pe, forward_pe, price_to_book,
        profit_margins, revenue_growth, fifty_day_ma, two_hundred_day_ma,
        fifty_two_week_high, fifty_two_week_low, current_price, last_updated
    ))
    conn.commit()
    conn.close()
    print(f"Successfully stored evidence for {ticker}.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Collect evidence for a ticker.")
    parser.add_argument('--ticker', required=True, help="Ticker symbol (e.g., AAPL)")
    args = parser.parse_args()
    collect_evidence(args.ticker.upper())
