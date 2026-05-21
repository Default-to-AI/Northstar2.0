import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FearGreedGauge } from './FearGreedGauge';

describe('FearGreedGauge', () => {
  it('renders clamped value and sentiment label', () => {
    const html = renderToStaticMarkup(<FearGreedGauge value={120} classification="Extreme Greed" />);

    assert.match(html, />100<\/text>/);
    assert.match(html, /Extreme Greed/);
    assert.match(html, /fearGreedGradient/);
  });
});
