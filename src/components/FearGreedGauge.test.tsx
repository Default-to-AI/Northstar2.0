import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FearGreedGauge } from './FearGreedGauge';

describe('FearGreedGauge', () => {
  it('renders the active segment, rounded score, and updated label', () => {
    const html = renderToStaticMarkup(
      <FearGreedGauge
        value={58.0571428571429}
        classification="Greed"
        updatedAt="2026-05-21T15:37:38+00:00"
      />,
    );

    assert.match(html, /data-active-segment="greed"/);
    assert.match(html, /data-active="true"/);
    assert.match(html, />58<\/text>/);
    assert.match(html, /May 21/);
    assert.match(html, />GREED<\/(div|span)>/);
  });
});
