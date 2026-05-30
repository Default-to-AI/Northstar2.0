import YahooFinance from 'yahoo-finance2';
async function test() {
  try {
    const yf = new YahooFinance();
    const res = await yf.fundamentalsTimeSeries('AMZN', {
      period1: '2020-01-01',
      module: 'all',
      type: 'quarterlyNetIncome,annualNetIncome,quarterlyTotalRevenue,annualTotalRevenue'
    });
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
