import test from 'node:test';
import assert from 'node:assert/strict';
import {parseStatement} from './sync';

const validXml = `<?xml version="1.0" encoding="UTF-8"?>
<FlexQueryResponse>
  <FlexStatements>
    <FlexStatement>
      <ChangeInNAV
        fromDate="2026-05-21"
        toDate="2026-05-22"
        startingValue="100000"
        endingValue="101500"
        depositsWithdrawals="0"
        twr="1.50"
        mtm="1500"
      />
      <CashReport>
        <CashReportCurrency
          startingCash="1000"
          endingCash="1200"
          endingSettledCash="1100"
          depositWithdrawals="0"
          dividends="20"
          netTradesSales="400"
          netTradesPurchases="200"
        />
      </CashReport>
      <OpenPositions>
        <OpenPosition
          symbol="AAPL"
          position="10"
          costBasisMoney="1700"
          markPrice="180"
          positionValue="1800"
          fifoPnlUnrealized="100"
          reportDate="2026-05-22"
          currency="USD"
          assetCategory="STK"
        />
      </OpenPositions>
    </FlexStatement>
  </FlexStatements>
</FlexQueryResponse>`;

test('parseStatement parses valid IBKR XML', () => {
  const snapshot = parseStatement(validXml);
  assert.equal(snapshot.source, 'ibkr-flex');
  assert.equal(snapshot.positions.length, 1);
  assert.equal(snapshot.positions[0]?.symbol, 'AAPL');
  assert.equal(snapshot.positions[0]?.unrealizedPnL, 100);
  assert.equal(snapshot.nav.twr, 1.5);
  assert.equal(snapshot.nav.markToMarket, 1500);
  assert.equal(snapshot.cash.depositsWithdrawals, 0);
  assert.equal(snapshot.cash.endingCash, 1200);
});

test('parseStatement fails fast when required structure is missing', () => {
  const invalidXml = '<FlexQueryResponse><FlexStatements><FlexStatement></FlexStatement></FlexStatements></FlexQueryResponse>';
  assert.throws(
    () => parseStatement(invalidXml),
    /Missing FlexStatements\.FlexStatement payload|Missing FlexStatement\.ChangeInNAV payload/,
  );
});

test('parseStatement rejects mismatched position data instead of silently writing', () => {
  const invalidPositionXml = `<?xml version="1.0" encoding="UTF-8"?>
  <FlexQueryResponse>
    <FlexStatements>
      <FlexStatement>
        <ChangeInNAV
          fromDate="2026-05-21"
          toDate="2026-05-22"
          startingValue="100000"
          endingValue="101500"
          depositsWithdrawals="0"
          twr="1.50"
          mtm="1500"
        />
        <CashReport>
          <CashReportCurrency
            startingCash="1000"
            endingCash="1200"
            endingSettledCash="1100"
            depositWithdrawals="0"
            dividends="20"
            netTradesSales="400"
            netTradesPurchases="200"
          />
        </CashReport>
        <OpenPositions>
          <OpenPosition
            symbol=""
            position="10"
            costBasisMoney="1700"
            markPrice="180"
            positionValue="1800"
            fifoPnlUnrealized="100"
            reportDate="2026-05-22"
            currency="USD"
            assetCategory="STK"
          />
        </OpenPositions>
      </FlexStatement>
    </FlexStatements>
  </FlexQueryResponse>`;

  assert.throws(
    () => parseStatement(invalidPositionXml),
    /positions\[0\]\.symbol must be non-empty string/,
  );
});
