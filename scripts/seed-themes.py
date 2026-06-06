import sqlite3
import os
from datetime import date

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'northstar.db')

# Explicitly curated thematic lists
THEMES = {
    'space': [
        'RKLB', 'LMT', 'BA', 'NOC', 'ASTS', 'PL', 'IRDM', 'LLAP', 'SPCE', 'MAXR', 'BKSY', 'SPIR', 'RTX', 'GD'
    ],
    'ai_chips': [
        'NVDA', 'AMD', 'TSM', 'AVGO', 'QCOM', 'MU', 'MRVL', 'ARM', 'INTC', 'TXN', 'ADI', 'NXPI'
    ],
    'ai_data': [
        'EQIX', 'DLR', 'VRT', 'SMCI', 'ANET', 'DELL', 'HPE', 'PSTG', 'NTAP', 'IRM', 'CORZ', 'WDC', 'STX'
    ],
    'ai_software': [
        'MSFT', 'GOOG', 'META', 'PLTR', 'CRM', 'NOW', 'CRWD', 'SNOW', 'DDOG', 'PATH', 'MNDY', 'ADBE', 'HUBS', 'PANW'
    ],
    'moat': [
        'V', 'MA', 'ASML', 'LLY', 'NVO', 'COST', 'ORLY', 'SPGI', 'MCO', 'MSFT', 'GOOG', 'META', 'UNP', 'WM', 'CPRT'
    ],
    'compounders': [
        'CPRT', 'TDG', 'ROP', 'MCO', 'HEI', 'DHR', 'FICO', 'AME', 'MSCI', 'TYL', 'ODFL', 'CTAS', 'FAST', 'ANSS'
    ]
}

def seed_theme(cursor, today, universe_id, tickers):
    inserted_securities = 0
    inserted_memberships = 0
    deleted_memberships = 0

    current_tickers = set(tickers)

    # Clean up stale memberships
    cursor.execute("SELECT ticker FROM universe_memberships WHERE universe = ?", (universe_id,))
    existing_members = set(row[0] for row in cursor.fetchall())

    to_remove = existing_members - current_tickers
    if to_remove:
        for t in to_remove:
            cursor.execute("DELETE FROM universe_memberships WHERE universe = ? AND ticker = ?", (universe_id, t))
            deleted_memberships += cursor.rowcount

    # Insert new ones
    for ticker in tickers:
        cursor.execute("INSERT OR IGNORE INTO securities (ticker, name, exchange, active) VALUES (?, ?, 'US', 1)", (ticker, ticker))
        if cursor.rowcount > 0:
            inserted_securities += cursor.rowcount
            
        cursor.execute("INSERT OR IGNORE INTO universe_memberships (universe, ticker, as_of_date, source) VALUES (?, ?, ?, 'curated')", (universe_id, ticker, today))
        if cursor.rowcount > 0:
            inserted_memberships += cursor.rowcount
            
    print(f"[{universe_id}] Memberships: {inserted_memberships} added, {deleted_memberships} removed. New securities: {inserted_securities}")


def main():
    print("Seeding explicitly curated themes...")
    
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
    
    today = date.today().isoformat()
    
    for theme_id, tickers in THEMES.items():
        seed_theme(cursor, today, theme_id, tickers)
        
    conn.commit()
    conn.close()
    print("Done seeding curated themes.")

if __name__ == "__main__":
    main()
