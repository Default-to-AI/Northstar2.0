import sys
import yfinance as yf
from scripts.research_engine import db

ETFS = {
    'Information Technology': 'XLK',
    'Technology': 'XLK',
    'Health Care': 'XLV',
    'Healthcare': 'XLV',
    'Financials': 'XLF',
    'Financial': 'XLF',
    'Financial Services': 'XLF',
    'Energy': 'XLE',
    'Industrials': 'XLI',
    'Consumer Discretionary': 'XLY',
    'Consumer Cyclical': 'XLY',
    'Consumer Staples': 'XLP',
    'Consumer Defensive': 'XLP',
    'Utilities': 'XLU',
    'Materials': 'XLB',
    'Basic Materials': 'XLB',
    'Real Estate': 'XLRE',
    'Communication Services': 'XLC'
}

def collect_sector_metrics():
    print("Collecting sector P/E metrics...")
    conn = db.connect()
    
    # Ensure migrations have run
    from scripts.research_engine import migrations
    migrations.migrate(conn)
    
    for sector, ticker in ETFS.items():
        try:
            info = yf.Ticker(ticker).info
            pe = info.get('trailingPE')
            if pe is not None:
                conn.execute("""
                    INSERT INTO sector_metrics (sector_name, pe_ratio, updated_at)
                    VALUES (?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(sector_name) DO UPDATE SET
                        pe_ratio=excluded.pe_ratio,
                        updated_at=excluded.updated_at
                """, (sector, float(pe)))
                conn.commit()
                print(f"[{sector}] {ticker} P/E: {pe}")
            else:
                print(f"[{sector}] {ticker} P/E not found.")
        except Exception as e:
            print(f"[{sector}] {ticker} Error: {e}")
    
    conn.close()

if __name__ == '__main__':
    collect_sector_metrics()
