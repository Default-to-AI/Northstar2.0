import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Committee, {
  buildArchiveSessionDraft,
  buildAdvisoryWarnings,
  canStartCommitteeGate,
  CommitteeCompletePanel,
  getCommitteeGateMessage,
  loadPacketActionabilityStatus,
  loadReadinessStatus,
} from './Committee.tsx';

describe('Committee page grounded-evidence UX', () => {
  it('renders core grounded committee UI', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/committee?ticker=NVDA&evidencePacketId=pkt_NVDA_123']}>
        <Committee />
      </MemoryRouter>,
    );

    assert.match(html, /Frozen Evidence Packet ID/);
    assert.match(html, /Ticker \(for readiness check\)/);
    assert.match(html, /external LLM provider/i);
  });

  it('renders risk governance bounded size range and advisory warnings in complete panel', () => {
    const html = renderToStaticMarkup(
      <CommitteeCompletePanel
        report={{
          category: 'WATCH',
          market_implication: 'Stay patient',
          playbook: {
            entry: 'Wait for confirmation',
            stop: 'No position',
            target: 'Recheck next packet',
            size: '2%',
            invalidation: 'Fundamental break',
            review_trigger: 'Next refresh',
            confidence: 'medium',
          },
        }}
        riskBoundedSizeLabel={'0.00% - 2.50%'}
        advisoryWarnings={buildAdvisoryWarnings(['latency warning'], ['max_position_exceeded'])}
      />,
    );

    assert.match(html, /risk-bounded size range: 0\.00% - 2\.50%/i);
    assert.match(html, /advisory warnings/i);
    assert.match(html, /risk:max_position_exceeded/i);
  });

  it('disables START when selected packet is stale', () => {
    const canStart = canStartCommitteeGate({
      evidencePacketId: 'pkt_NVDA_123',
      readinessStatus: 'fresh_actionable',
      packetActionabilityStatus: 'stale_usable',
      sessionState: 'IDLE',
    });
    assert.equal(canStart, false);
  });

  it('enables START only when packet + readiness are fresh and idle', () => {
    const canStart = canStartCommitteeGate({
      evidencePacketId: 'pkt_NVDA_123',
      readinessStatus: 'fresh_actionable',
      packetActionabilityStatus: 'fresh_actionable',
      sessionState: 'IDLE',
    });
    assert.equal(canStart, true);
  });

  it('disables START when selected packet id is empty', () => {
    const canStart = canStartCommitteeGate({
      evidencePacketId: '   ',
      readinessStatus: 'fresh_actionable',
      packetActionabilityStatus: 'fresh_actionable',
      sessionState: 'IDLE',
    });
    assert.equal(canStart, false);
  });

  it('keeps START disabled with stale packet fetch failure and shows warning copy', async () => {
    const mockFetch = async () => {
      throw new Error('network down');
    };
    const readinessStatus = 'fresh_actionable';
    const packetActionabilityStatus = await loadPacketActionabilityStatus(mockFetch, 'pkt_NVDA_123');

    const canStart = canStartCommitteeGate({
      evidencePacketId: 'pkt_NVDA_123',
      readinessStatus,
      packetActionabilityStatus,
      sessionState: 'IDLE',
    });
    const gateMessage = getCommitteeGateMessage({
      evidencePacketId: 'pkt_NVDA_123',
      readinessStatus,
      packetActionabilityStatus,
    });

    assert.equal(packetActionabilityStatus, 'error');
    assert.equal(canStart, false);
    assert.match(gateMessage ?? '', /Selected packet stale \(error\)\./);
  });

  it('enables START when readiness and packet actionability are fresh from async loaders', async () => {
    const mockFetch = async (input: string) => {
      if (input.includes('/readiness')) {
        return {
          ok: true,
          json: async () => ({status: 'fresh_actionable'}),
        };
      }
      return {
        ok: true,
        json: async () => ({actionabilityState: 'fresh_actionable'}),
      };
    };

    const readinessStatus = await loadReadinessStatus(mockFetch);
    const packetActionabilityStatus = await loadPacketActionabilityStatus(mockFetch, 'pkt_NVDA_123');

    const canStart = canStartCommitteeGate({
      evidencePacketId: 'pkt_NVDA_123',
      readinessStatus,
      packetActionabilityStatus,
      sessionState: 'IDLE',
    });
    assert.equal(canStart, true);
  });

  it('builds archive commit payload using ticker from committee response lineage', () => {
    const payload = buildArchiveSessionDraft({
      sessionLineage: {
        sessionId: 'cms_123',
        evidencePacketId: 'pkt_NVDA_123',
        ticker: 'NVDA',
        model: 'gemini-2.5-flash',
        externalLlm: true,
      },
      report: {
        category: 'WATCH',
        market_implication: 'Monitor trend changes.',
        playbook: {
          entry: 'Wait for confirmation',
          stop: 'No position',
          target: 'Re-evaluate next run',
          size: '0%',
          invalidation: 'Fundamentals deteriorate',
          review_trigger: 'Next refresh',
          confidence: 'medium',
          citations: ['evidence_packet:pkt_NVDA_123'],
        },
      },
      dateIso: '2026-05-25T10:00:00.000Z',
    });

    assert.equal(payload.ticker, 'NVDA');
    assert.equal(payload.committeeSessionId, 'cms_123');
    assert.equal(payload.evidencePacketId, 'pkt_NVDA_123');
    assert.equal(payload.committeeModel, 'gemini-2.5-flash');
    assert.equal(payload.committeeExternalLlm, true);
  });
});
