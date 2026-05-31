import yfinance as yf
import sys
import json
import warnings

# Suppress specific yfinance/pandas warnings that might pollute stdout
warnings.filterwarnings("ignore")

def get_history(ticker):
    try:
        t = yf.Ticker(ticker)
        hist = t.history(period="10y", interval="1d")
        if hist.empty:
            print(json.dumps([]))
            return
            
        data = []
        for date, row in hist.iterrows():
            data.append({
                "date": date.strftime("%Y-%m-%d"),
                "price": float(row["Close"])
            })
        print(json.dumps(data[::-1]))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_history(sys.argv[1])
    else:
        print(json.dumps([]))
