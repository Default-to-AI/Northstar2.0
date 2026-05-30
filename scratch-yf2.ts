import YahooFinance from 'yahoo-finance2';

async function test() {
  try {
    const yf = new YahooFinance();
    const result = await yf.fundamentalsTimeSeries('NVDA', {
      period1: '2019-01-01',
      module: 'all',
      type: 'quarterly'
    });
    console.log(result.map(r => ({ date: r.date, type: r.periodType })));
  } catch (e) {
    console.error(e);
  }
}
test();
