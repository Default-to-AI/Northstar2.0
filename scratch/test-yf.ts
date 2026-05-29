import YahooFinance from 'yahoo-finance2';

async function main() {
  try {
    const yf = new YahooFinance();
    console.log('Fetching modules for AAPL...');
    
    const result = await yf.quoteSummary('AAPL', {
      modules: ['insiderTransactions', 'earningsTrend']
    });
    console.log("Insider transactions:", result.insiderTransactions?.transactions?.length);
    if (result.insiderTransactions?.transactions?.length) {
       console.log("Sample insider transaction:", result.insiderTransactions.transactions[0]);
    }
    console.log("Earnings trend:", result.earningsTrend?.trend?.length);
    if (result.earningsTrend?.trend?.length) {
       console.log("Sample earnings trend:", result.earningsTrend.trend[0]);
    }
    
    const history = await yf.historical('AAPL', {
      period1: '2023-01-01',
      interval: '1d'
    });
    console.log('History length:', history.length);
    if (history.length > 0) {
      console.log('Sample history:', history[0]);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
