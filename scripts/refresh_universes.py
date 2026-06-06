import sys
import os
import sqlite3
import subprocess

# Add current dir to path to import collect_evidence
sys.path.append(os.path.dirname(__file__))
from collect_evidence import collect_evidence

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'northstar.db')
SCRIPTS_DIR = os.path.dirname(__file__)

def run_script(script_name):
    script_path = os.path.join(SCRIPTS_DIR, script_name)
    print(f"Running {script_name}...")
    subprocess.run([sys.executable, script_path], check=True)

def refresh():
    print("=== Refreshing Constituent Lists ===")
    try:
        run_script('seed-sp500.py')
        run_script('seed-qqq.py')
        run_script('seed-dow30.py')
        run_script('seed-themes.py')
    except subprocess.CalledProcessError as e:
        print(f"Error running seed script: {e}")
        # Continue anyway
        pass

    print("\n=== Finding Missing Fundamentals ===")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Find active securities in universe memberships that lack fundamentals or current_price
    cursor.execute("""
        SELECT DISTINCT um.ticker 
        FROM universe_memberships um
        JOIN securities s ON um.ticker = s.ticker
        LEFT JOIN fundamentals f ON um.ticker = f.ticker
        WHERE s.active = 1 
          AND (f.ticker IS NULL OR f.current_price IS NULL OR f.market_cap IS NULL)
    """)
    
    missing_tickers = [row[0] for row in cursor.fetchall()]
    conn.close()
    
    print(f"Found {len(missing_tickers)} tickers missing basic fundamentals.")
    
    for i, ticker in enumerate(missing_tickers):
        print(f"\n--- [{i+1}/{len(missing_tickers)}] Fetching {ticker} ---")
        try:
            collect_evidence(ticker)
        except Exception as e:
            print(f"Failed to fetch {ticker}: {e}")

if __name__ == "__main__":
    refresh()
