import React from 'react';

interface FearGreedGaugeProps {
  value: number;
  classification: string;
  updatedAt?: string;
  size?: number;
}

type SegmentKey = 'extreme fear' | 'fear' | 'neutral' | 'greed' | 'extreme greed';

interface SegmentConfig {
  key: SegmentKey;
  label: [string] | [string, string];
  startAngle: number;
  endAngle: number;
  activeFill: string;
  activeText: string;
}

const SEGMENTS: SegmentConfig[] = [
  { key: 'extreme fear', label: ['EXTREME', 'FEAR'], startAngle: 180, endAngle: 216, activeFill: '#ff5f56', activeText: '#0b0f17' },
  { key: 'fear', label: ['FEAR'], startAngle: 216, endAngle: 252, activeFill: '#ff9f43', activeText: '#0b0f17' },
  { key: 'neutral', label: ['NEUTRAL'], startAngle: 252, endAngle: 288, activeFill: '#d8dee9', activeText: '#0b0f17' },
  { key: 'greed', label: ['GREED'], startAngle: 288, endAngle: 324, activeFill: '#86efac', activeText: '#0b0f17' },
  { key: 'extreme greed', label: ['EXTREME', 'GREED'], startAngle: 324, endAngle: 360, activeFill: '#34d399', activeText: '#0b0f17' },
];

function polarToCartesian(cx: number, cy: number, radius: number, angleDegrees: number): { x: number; y: number } {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeRingSegment(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

function describeNeedle(cx: number, cy: number, length: number, angleDegrees: number, baseHalfWidth: number): string {
  const radians = (angleDegrees * Math.PI) / 180;
  const tip = polarToCartesian(cx, cy, length, angleDegrees);
  const baseLeft = {
    x: cx + baseHalfWidth * Math.cos(radians + Math.PI / 2),
    y: cy + baseHalfWidth * Math.sin(radians + Math.PI / 2),
  };
  const baseRight = {
    x: cx + baseHalfWidth * Math.cos(radians - Math.PI / 2),
    y: cy + baseHalfWidth * Math.sin(radians - Math.PI / 2),
  };

  return `M ${baseLeft.x} ${baseLeft.y} L ${tip.x} ${tip.y} L ${baseRight.x} ${baseRight.y} Z`;
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function valueToAngle(value: number): number {
  const clamped = Math.max(0, Math.min(100, value));
  return 180 + (clamped / 100) * 180;
}

function getSegmentKey(value: number, classification: string): SegmentKey {
  const normalized = classification.trim().toLowerCase();
  const directMatch = SEGMENTS.find((segment) => segment.key === normalized);
  if (directMatch) {
    return directMatch.key;
  }

  const clamped = Math.max(0, Math.min(100, value));
  if (clamped < 25) {
    return 'extreme fear';
  }
  if (clamped < 45) {
    return 'fear';
  }
  if (clamped < 55) {
    return 'neutral';
  }
  if (clamped < 75) {
    return 'greed';
  }
  return 'extreme greed';
}

function formatUpdatedAt(updatedAt?: string): string | null {
  if (!updatedAt) {
    return null;
  }

  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const dayLabel = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    month: 'short',
    day: 'numeric',
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);

  return `${dayLabel} · ${timeLabel} ET`;
}

function renderSegmentLabel(
  segment: SegmentConfig,
  cx: number,
  cy: number,
  radius: number,
  isActive: boolean,
): React.JSX.Element {
  const angle = (segment.startAngle + segment.endAngle) / 2;
  const { x, y } = polarToCartesian(cx, cy, radius, angle);
  const fill = isActive ? segment.activeText : '#7d8595';
  const [firstLine, secondLine] = segment.label;

  return (
    <text
      key={segment.key}
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="12"
      fontWeight="700"
      fill={fill}
      letterSpacing="0.08em"
    >
      {secondLine ? (
        <>
          <tspan x={x} y={y - 4}>{firstLine}</tspan>
          <tspan x={x} y={y + 10}>{secondLine}</tspan>
        </>
      ) : (
        <tspan x={x} y={y + 4}>{firstLine}</tspan>
      )}
    </text>
  );
}

export function FearGreedGauge({ value, classification, updatedAt, size = 360 }: FearGreedGaugeProps): React.JSX.Element {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const activeKey = getSegmentKey(clamped, classification);
  const activeSegment = SEGMENTS.find((segment) => segment.key === activeKey) ?? SEGMENTS[2];
  const width = size;
  const height = size * 0.66;
  const cx = width / 2;
  const cy = height * 0.95;
  const outerRadius = width * 0.41;
  const innerRadius = outerRadius * 0.6;
  const segmentLabelRadius = outerRadius * 0.78;
  const guideArcRadius = outerRadius * 0.72;
  const tickRadius = outerRadius * 0.65;
  const endpointLabelRadius = outerRadius * 1.03;
  const needleLength = outerRadius * 0.79;
  const centerCircleRadius = outerRadius * 0.2;
  const angle = valueToAngle(clamped);
  const updatedLabel = formatUpdatedAt(updatedAt);

  return (
    <div className="w-full" data-active-segment={activeKey}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Fear and Greed gauge, ${clamped}, ${classification}`}
      >
        {SEGMENTS.map((segment) => {
          const isActive = segment.key === activeKey;
          return (
            <path
              key={segment.key}
              d={describeRingSegment(cx, cy, innerRadius, outerRadius, segment.startAngle, segment.endAngle)}
              fill={isActive ? segment.activeFill : '#171c27'}
              fillOpacity={isActive ? 0.96 : 1}
              stroke={isActive ? segment.activeFill : '#2a3140'}
              strokeWidth={isActive ? 2.5 : 1.5}
              data-active={isActive ? 'true' : 'false'}
            />
          );
        })}

        <path
          d={describeArc(cx, cy, guideArcRadius, 180, 360)}
          fill="none"
          stroke="#2a3140"
          strokeWidth="1.25"
          strokeDasharray="2 8"
          opacity="0.95"
        />

        {Array.from({ length: 21 }, (_, index) => index * 5).map((tick) => {
          const tickAngle = valueToAngle(tick);
          const point = polarToCartesian(cx, cy, tickRadius, tickAngle);
          const isMajor = tick % 25 === 0;
          return (
            <circle
              key={`tick-${tick}`}
              cx={point.x}
              cy={point.y}
              r={isMajor ? 2.6 : 1.4}
              fill={isMajor ? '#a4acbb' : '#586274'}
            />
          );
        })}

        {[0, 100].map((tick) => {
          const tickAngle = valueToAngle(tick);
          const point = polarToCartesian(cx, cy, endpointLabelRadius, tickAngle);
          return (
            <text
              key={`endpoint-${tick}`}
              x={point.x}
              y={point.y + 4}
              textAnchor="middle"
              fontSize="12"
              fill="#a4acbb"
              fontWeight="600"
            >
              {tick}
            </text>
          );
        })}

        {SEGMENTS.map((segment) => renderSegmentLabel(segment, cx, cy, segmentLabelRadius, segment.key === activeKey))}

        <path d={describeNeedle(cx, cy, needleLength, angle, width * 0.013)} fill="#f8fafc" />
        <circle cx={cx} cy={cy} r={centerCircleRadius} fill="#f8fafc" />
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fontSize={centerCircleRadius * 0.82}
          fontWeight="800"
          fill="#0f172a"
        >
          {clamped}
        </text>
      </svg>

      <div className="mt-3 border-t border-border/70 pt-3">
        <div
          className="text-[11px] font-mono uppercase tracking-[0.24em]"
          style={{ color: activeSegment.activeFill }}
        >
          {classification.toUpperCase()}
        </div>
        {updatedLabel ? <div className="mt-1 text-[11px] font-mono text-muted-foreground">{updatedLabel}</div> : null}
      </div>
    </div>
  );
}
