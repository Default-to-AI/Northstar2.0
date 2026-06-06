import sqlite3
import urllib.request
import re
import os
import json

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'northstar.db')

def fetch_qqq_tickers():
    url = "https://en.wikipedia.org/wiki/Nasdaq-100"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
    
    # Extract table constituents
    # Wikipedia table format: <td><a href="...">Company Name</a></td><td>Ticker</td>...
    table_match = re.search(r'<table.*?id="constituents".*?>(.*?)</table>', html, re.DOTALL)
    if not table_match:
        print("Could not find constituents table on Wikipedia.")
        return []
    
    table_html = table_match.group(1)
    
    # Find all rows
    rows = re.findall(r'<tr.*?>(.*?)</tr>', table_html, re.DOTALL)
    
    tickers = []
    for row in rows:
        cells = re.findall(r'<td.*?>(.*?)</td>', row, re.DOTALL)
        if len(cells) >= 2:
            # Ticker is in cells[0], Company in cells[1]
            ticker = re.sub(r'<[^>]+>', '', cells[0]).strip()
            company = re.sub(r'<[^>]+>', '', cells[1]).strip()
            if ticker and ticker != 'Ticker':
                tickers.append((ticker, company))
                
    return tickers

def main():
    print("Fetching QQQ (Nasdaq-100) constituents from Wikipedia...")
    tickers = fetch_qqq_tickers()
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
        PRIMARY KEY (universe, ticker)
    )
    """)
    
    # Insert or ignore into securities
    inserted_securities = 0
    inserted_memberships = 0
    deleted_memberships = 0
    
    from datetime import date
    today = date.today().isoformat()
    
    current_tickers = set(t[0].replace('.', '-') for t in tickers)
    
    cursor.execute("SELECT ticker FROM universe_memberships WHERE universe = 'qqq'")
    existing_members = set(row[0] for row in cursor.fetchall())
    
    to_remove = existing_members - current_tickers
    if to_remove:
        for t in to_remove:
            cursor.execute("DELETE FROM universe_memberships WHERE universe = 'qqq' AND ticker = ?", (t,))
            deleted_memberships += cursor.rowcount
            
    for ticker, company in tickers:
        # Fix ticker if needed (e.g. replacing . with - for yahoo finance)
        ticker = ticker.replace('.', '-')
        
        cursor.execute("INSERT OR IGNORE INTO securities (ticker, name, exchange, active) VALUES (?, ?, 'NASDAQ', 1)", (ticker, company))
        if cursor.rowcount > 0:
            inserted_securities += cursor.rowcount
            
        cursor.execute("INSERT OR IGNORE INTO universe_memberships (universe, ticker, as_of_date, source) VALUES ('qqq', ?, ?, 'wikipedia')", (ticker, today))
        if cursor.rowcount > 0:
            inserted_memberships += cursor.rowcount
            
    conn.commit()
    conn.close()
    
    print(f"Done! Inserted {inserted_securities} new securities.")
    print(f"Memberships: {inserted_memberships} added, {deleted_memberships} removed.")

if __name__ == "__main__":
    main()
