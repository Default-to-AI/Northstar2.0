import YahooFinance from 'yahoo-finance2';

async function test() {
  try {
    const yf = new YahooFinance();
    const result = await yf.quoteSummary('NVDA', { 
      modules: ['financialData', 'defaultKeyStatistics'] 
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
