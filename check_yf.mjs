import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance();
yf.quoteSummary('NVDA', { modules: ['defaultKeyStatistics', 'summaryDetail'] })
  .then(r => { console.log(JSON.stringify({pegRatio: r.defaultKeyStatistics?.pegRatio})); process.exit(0); })
  .catch(e => { console.error(e); process.exit(1); });
