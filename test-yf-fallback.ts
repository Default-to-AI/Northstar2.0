import YahooFinance from 'yahoo-finance2';
async function test() {
  try {
    const yf = new YahooFinance();
    const res = await yf.quoteSummary('AMZN', {
      modules: [
        'incomeStatementHistory', 'incomeStatementHistoryQuarterly',
        'balanceSheetHistory', 'balanceSheetHistoryQuarterly',
        'cashflowStatementHistory', 'cashflowStatementHistoryQuarterly'
      ]
    });
    console.log(JSON.stringify(res.incomeStatementHistoryQuarterly?.incomeStatementHistory?.slice(0, 2), null, 2));
    console.log(JSON.stringify(res.balanceSheetHistoryQuarterly?.balanceSheetStatements?.slice(0, 2), null, 2));
    console.log(JSON.stringify(res.cashflowStatementHistoryQuarterly?.cashflowStatements?.slice(0, 2), null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
