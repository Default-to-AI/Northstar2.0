import React from 'react';

interface FearGreedGaugeProps {
  value: number;
  classification: string;
  size?: number;
}

const START_ANGLE = -Math.PI;
const END_ANGLE = 0;

function polarToCartesian(cx: number, cy: number, radius: number, angle: number): { x: number; y: number } {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function describeArc(cx: number, cy: number, radius: number): string {
  const start = polarToCartesian(cx, cy, radius, START_ANGLE);
  const end = polarToCartesian(cx, cy, radius, END_ANGLE);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

function valueToAngle(value: number): number {
  const clamped = Math.max(0, Math.min(100, value));
  const ratio = clamped / 100;
  return START_ANGLE + ratio * (END_ANGLE - START_ANGLE);
}

export function FearGreedGauge({ value, classification, size = 220 }: FearGreedGaugeProps): React.JSX.Element {
  const clamped = Math.max(0, Math.min(100, value));
  const width = size;
  const height = size * 0.62;
  const cx = width / 2;
  const cy = width / 2;
  const radius = width * 0.38;
  const needleLength = radius * 0.9;
  const angle = valueToAngle(clamped);
  const needleEnd = polarToCartesian(cx, cy, needleLength, angle);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Fear and Greed gauge">
        <defs>
          <linearGradient id="fearGreedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        <path d={describeArc(cx, cy, radius)} fill="none" stroke="url(#fearGreedGradient)" strokeWidth={width * 0.07} strokeLinecap="round" />

        <line x1={cx} y1={cy} x2={needleEnd.x} y2={needleEnd.y} stroke="#e2e8f0" strokeWidth={3} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={6} fill="#e2e8f0" />

        <text x={cx} y={cy - 20} textAnchor="middle" className="fill-foreground text-[20px] font-bold">
          {clamped}
        </text>
        <text x={cx} y={cy + 2} textAnchor="middle" className="fill-muted-foreground text-[10px] uppercase tracking-wide">
          {classification}
        </text>
      </svg>
    </div>
  );
}
