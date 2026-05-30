import YahooFinance from 'yahoo-finance2';

async function test() {
  try {
    const yf = new YahooFinance();
    const result = await yf.fundamentalsTimeSeries('NVDA', {
      period1: '2019-01-01',
      module: 'all' // Try fetching all fundamental modules
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
