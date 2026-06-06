import sqlite3
import urllib.request
import re
import os
from datetime import date

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'northstar.db')

def fetch_dow30_tickers():
    url = "https://en.wikipedia.org/wiki/Dow_Jones_Industrial_Average"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
    
    table_match = re.search(r'<table.*?id="constituents".*?>(.*?)</table>', html, re.DOTALL)
    if not table_match:
        print("Could not find constituents table on Wikipedia.")
        return []
    
    table_html = table_match.group(1)
    rows = re.findall(r'<tr.*?>(.*?)</tr>', table_html, re.DOTALL)
    
    tickers = []
    for row in rows:
        cells = re.findall(r'<(?:td|th).*?>(.*?)</(?:td|th)>', row, re.DOTALL)
        if len(cells) >= 3:
            company = re.sub(r'<[^>]+>', '', cells[0]).strip()
            ticker_raw = re.sub(r'<[^>]+>', '', cells[2]).strip()
            
            ticker = ticker_raw.replace('.', '-')
            # Only add if it looks like a valid ticker
            if ticker and len(ticker) <= 6 and (ticker.isalpha() or '-' in ticker):
                # Wikipedia sometimes puts 'Symbol' as the header row
                if ticker != 'Symbol':
                    tickers.append((ticker, company))
                
    return tickers

def main():
    print("Fetching Dow 30 constituents from Wikipedia...")
    tickers = fetch_dow30_tickers()
    print(f"Found {len(tickers)} tickers.")
    
    if not tickers:
        print("No tickers found, aborting.")
        return

    print(f"Connecting to database at {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS universe_memberships (
        universe TEXT NOT NULL,
        ticker TEXT NOT NULL,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        as_of_date TEXT,
        source TEXT,
        PRIMARY KEY (universe, ticker)
    )
    """)
    
    inserted_securities = 0
    inserted_memberships = 0
    deleted_memberships = 0
    
    today = date.today().isoformat()
    
    current_tickers = set(t[0] for t in tickers)
    
    cursor.execute("SELECT ticker FROM universe_memberships WHERE universe = 'dow30'")
    existing_members = set(row[0] for row in cursor.fetchall())
    
    to_remove = existing_members - current_tickers
    if to_remove:
        for t in to_remove:
            cursor.execute("DELETE FROM universe_memberships WHERE universe = 'dow30' AND ticker = ?", (t,))
            deleted_memberships += cursor.rowcount
    
    for ticker, company in tickers:
        cursor.execute("INSERT OR IGNORE INTO securities (ticker, name, exchange, active) VALUES (?, ?, 'NYSE', 1)", (ticker, company))
        if cursor.rowcount > 0:
            inserted_securities += cursor.rowcount
            
        cursor.execute("INSERT OR IGNORE INTO universe_memberships (universe, ticker, as_of_date, source) VALUES ('dow30', ?, ?, 'wikipedia')", (ticker, today))
        if cursor.rowcount > 0:
            inserted_memberships += cursor.rowcount
            
    conn.commit()
    conn.close()
    
    print(f"Done! Inserted {inserted_securities} new securities.")
    print(f"Memberships: {inserted_memberships} added, {deleted_memberships} removed.")

if __name__ == "__main__":
    main()
