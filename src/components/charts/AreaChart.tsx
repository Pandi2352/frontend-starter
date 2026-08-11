import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CHART_PALETTE } from '@/constants/colors';

import { CustomTooltip } from './CustomTooltip';
import { useChartAnimation } from './useChartAnimation';

export interface AreaChartSeries {
  dataKey: string;
  name: string;
  color?: string;
}

export interface AreaChartProps {
  data: Array<Record<string, unknown>>;
  xAxisKey?: string;
  series: AreaChartSeries[];
  height?: number;
  valueFormatter?: (value: number) => string;
}

export function AreaChart({
  data,
  xAxisKey = 'name',
  series,
  height = 300,
  valueFormatter,
}: AreaChartProps) {
  const animate = useChartAnimation(1500);

  return (
    <div style={{ width: '100%', height }} className="animate-in fade-in-0 duration-500">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {series.map((s, index) => {
              const color =
                s.color ?? CHART_PALETTE[index % CHART_PALETTE.length] ?? 'var(--chart-1)';
              const gradientId = `area-gradient-${s.dataKey}-${index}`;
              return (
                <linearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                </linearGradient>
              );
            })}
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
          <XAxis
            dataKey={xAxisKey}
            stroke="var(--muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />

          {series.map((s, index) => {
            const color =
              s.color ?? CHART_PALETTE[index % CHART_PALETTE.length] ?? 'var(--chart-1)';
            const gradientId = `area-gradient-${s.dataKey}-${index}`;
            return (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${gradientId})`}
                isAnimationActive={animate}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
