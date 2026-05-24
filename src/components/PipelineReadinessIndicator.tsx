import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Database, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

type ReadinessResponse = {
  status: 'fresh' | 'stale' | 'error' | 'warning';
  sources: Array<{
    name: string;
    status: string;
    timestamp: string;
    error_message: string | null;
  }>;
  message?: string;
};

export default function PipelineReadinessIndicator() {
  const { data, isLoading, isError } = useQuery<ReadinessResponse>({
    queryKey: ['researchReadiness'],
    queryFn: async () => {
      const res = await fetch('/api/research/readiness');
      if (!res.ok) throw new Error('Failed to fetch readiness');
      return res.json();
    },
    refetchInterval: 60000, // Check every minute
  });

  if (isLoading) return <div className="text-xs text-muted-foreground">Checking pipeline...</div>;
  if (isError) return <div className="text-xs text-destructive flex items-center gap-1"><AlertTriangle size={12}/> Pipeline API Error</div>;
  if (!data) return null;

  let Icon = CheckCircle;
  let color = 'text-green-500';
  
  if (data.status === 'stale') {
    Icon = Clock;
    color = 'text-yellow-500';
  } else if (data.status === 'error') {
    Icon = AlertTriangle;
    color = 'text-destructive';
  } else if (data.status === 'warning') {
    Icon = AlertTriangle;
    color = 'text-orange-500';
  }

  const timestamp = data.sources?.[0]?.timestamp 
    ? new Date(data.sources[0].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Unknown';

  return (
    <div className={`flex items-center gap-1.5 text-xs font-mono border rounded px-2 py-1 bg-background/50 ${color} border-current/20`}>
      <Database size={12} />
      <span>{data.status === 'warning' && data.message ? data.message : `Pipeline: ${data.status.toUpperCase()}`}</span>
      {data.status !== 'warning' && (
        <span className="text-muted-foreground ml-1">
          {timestamp}
        </span>
      )}
    </div>
  );
}
