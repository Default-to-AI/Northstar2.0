import { useState, useEffect } from 'react';
import { ArchiveSession } from '../types';

const SEED_ARCHIVE: ArchiveSession[] = [
  {
    id: '1',
    ticker: 'NVDA',
    date: '2024-04-28',
    verdict: 'BUY',
    convictionScore: 8.6,
    summary: 'The committee consensus remains highly bullish on Blackwell ramp. Datacenter demand shows no signs of saturation as CSPs accelerate AI infra spend.',
    personaScores: { M: 8.2, H: 9.1, C: 7.8, Mi: 9.0, Ca: 9.3 },
    outcome: 'CORRECT',
    outcomeText: 'Price is up 18% since this session.',
    fullTranscript: { session_id: "NVDA-0428", attendees: ["Mahaney", "Hohn", "Cohen", "Micha", "Carlson"], key_debate: "Scaling laws vs physical power constraints." }
  },
  {
    id: '2',
    ticker: 'TSLA',
    date: '2024-04-07',
    verdict: 'HOLD',
    convictionScore: 5.2,
    summary: 'Wait-and-see approach. FSD v12 showing promise but delivery metrics are under pressure. Competitive landscape in China is deteriorating.',
    personaScores: { M: 4.2, H: 6.1, C: 4.8, Mi: 5.0, Ca: 5.9 },
    outcome: 'PENDING',
    outcomeText: 'Waiting for next earnings call.',
    fullTranscript: { session_id: "TSLA-0407", focus: "Robotaxi event vs low-cost model." }
  },
  {
    id: '3',
    ticker: 'FICO',
    date: '2024-03-19',
    verdict: 'ADD',
    convictionScore: 7.9,
    summary: 'Strong pricing power in scores business. Market underestimating the low-churn nature of enterprise software during credit tightening.',
    personaScores: { M: 7.2, H: 8.1, C: 7.8, Mi: 8.5, Ca: 7.9 },
    outcome: 'CORRECT',
    outcomeText: 'Stock hit new ATH post-session.',
    fullTranscript: { session_id: "FICO-0319", focus: "B2B segment growth." }
  }
];

export function useArchive() {
  const [sessions, setSessions] = useState<ArchiveSession[]>(() => {
    const saved = localStorage.getItem('northstar_archive');
    return saved ? JSON.parse(saved) : SEED_ARCHIVE;
  });

  useEffect(() => {
    localStorage.setItem('northstar_archive', JSON.stringify(sessions));
  }, [sessions]);

  const updateSession = (updated: ArchiveSession) => {
    setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const addSession = (session: ArchiveSession) => {
    setSessions(prev => [session, ...prev]);
  };

  return {
    sessions,
    updateSession,
    addSession
  };
}
