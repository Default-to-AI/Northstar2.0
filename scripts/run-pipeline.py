import sqlite3
import os
import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'northstar.db')

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pipeline_name TEXT NOT NULL,
            started_at DATETIME NOT NULL,
            completed_at DATETIME,
            status TEXT NOT NULL,
            error_message TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ticker_evidence (
            ticker TEXT PRIMARY KEY,
            market_cap REAL,
            trailing_pe REAL,
            forward_pe REAL,
            price_to_book REAL,
            profit_margins REAL,
            revenue_growth REAL,
            fifty_day_ma REAL,
            two_hundred_day_ma REAL,
            fifty_two_week_high REAL,
            fifty_two_week_low REAL,
            current_price REAL,
            last_updated DATETIME,
            free_cashflow REAL,
            free_cashflow_margin REAL,
            free_cashflow_yield REAL
        )
    ''')
    conn.commit()
    return conn

def record_pipeline_run():
    conn = init_db()
    cursor = conn.cursor()
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    cursor.execute('''
        INSERT INTO runs (pipeline_name, started_at, completed_at, status, error_message)
        VALUES (?, ?, ?, ?, ?)
    ''', ('pre-open-pipeline', now, now, 'success', None))
    conn.commit()
    print(f"Recorded successful pipeline run at {now}")
    conn.close()

if __name__ == '__main__':
    record_pipeline_run()
