import sqlite3

def run():
    conn = sqlite3.connect('data/northstar.db')
    c = conn.cursor()
    columns = [
        ("gross_margin", "REAL"),
        ("operating_margin", "REAL"),
        ("eps", "REAL"),
        ("ebitda", "REAL"),
        ("diluted_net_income", "REAL"),
        ("price_to_sales", "REAL"),
        ("ev_to_ebitda", "REAL"),
        ("ev_to_gross_profit", "REAL"),
        ("peg_ratio", "REAL"),
        ("operating_cash_flow", "REAL"),
        ("debt_to_equity", "REAL"),
        ("net_cash", "REAL"),
        ("current_ratio", "REAL"),
        ("roe", "REAL"),
        ("roic", "REAL"),
        ("revenue_per_employee", "REAL"),
        ("earnings_revisions", "TEXT"),
        ("share_buybacks", "REAL"),
        ("insider_transactions", "TEXT"),
        ("momentum_history", "TEXT"),
        ("valuation_history", "TEXT")
    ]
    for col, dtype in columns:
        try:
            c.execute(f"ALTER TABLE ticker_evidence ADD COLUMN {col} {dtype}")
        except sqlite3.OperationalError:
            pass # Column already exists
    conn.commit()
    conn.close()

if __name__ == '__main__':
    run()
