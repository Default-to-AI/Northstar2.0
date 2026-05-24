import React from 'react';

type DataSourceMode = 'ibkr' | 'seed';

type DataSourceIndicatorProps = {
  mode: DataSourceMode;
  timestamp: string;
};

export default function DataSourceIndicator({ mode, timestamp }: DataSourceIndicatorProps) {
  const dotColor: string = mode === 'ibkr' ? '#22c55e' : '#6b7280';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        paddingTop: 4,
      }}
    >
      {/* Status dot */}
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: dotColor,
          flexShrink: 0,
        }}
      />
      {/* "Via:" label — gold */}
      <span
        style={{
          color: '#C9A84C',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          fontWeight: 'bold',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}
      >
        Via:
      </span>
      {/* Mode text */}
      <span
        style={{
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          fontWeight: 'bold',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}
      >
        {mode === 'ibkr' ? 'IBKR' : 'Seed'}
      </span>
      {/* Timestamp suffix */}
      <span
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          letterSpacing: 0.2,
          textTransform: 'uppercase',
        }}
      >
        at {timestamp}
      </span>
    </div>
  );
}
