import {useEffect, useState} from 'react';

import type {ArchiveSession} from '../types';

async function fetchArchiveSessions(): Promise<ArchiveSession[]> {
  const response = await fetch('/api/research/archive/sessions');
  if (!response.ok) {
    throw new Error('Failed to fetch archive sessions');
  }
  const data = (await response.json()) as {sessions: ArchiveSession[]};
  return data.sessions;
}

export function useArchive() {
  const [sessions, setSessions] = useState<ArchiveSession[]>([]);

  useEffect(() => {
    fetchArchiveSessions()
      .then((rows) => setSessions(rows))
      .catch(() => setSessions([]));
  }, []);

  const updateSession = async (updated: ArchiveSession) => {
    const response = await fetch(`/api/research/archive/sessions/${updated.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updated),
    });

    if (!response.ok) {
      throw new Error('Failed to update archive session');
    }

    setSessions((prev) => prev.map((session) => (session.id === updated.id ? updated : session)));
  };

  const addSession = async (session: ArchiveSession) => {
    const response = await fetch('/api/research/archive/sessions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(session),
    });

    if (!response.ok) {
      throw new Error('Failed to save archive session');
    }

    setSessions((prev) => [session, ...prev]);
  };

  return {
    sessions,
    updateSession,
    addSession,
  };
}
