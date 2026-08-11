import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CHART_PALETTE } from '@/constants/colors';

import { CustomTooltip } from './CustomTooltip';
import { useChartAnimation } from './useChartAnimation';

export interface BarChartSeries {
  dataKey: string;
  name: string;
  color?: string;
}

export interface BarChartProps {
  data: Array<Record<string, unknown>>;
  xAxisKey?: string;
  series: BarChartSeries[];
  height?: number;
  valueFormatter?: (value: number) => string;
  barColors?: readonly string[];
}

export function BarChart({
  data,
  xAxisKey = 'name',
  series,
  height = 300,
  valueFormatter,
  barColors = CHART_PALETTE,
}: BarChartProps) {
  const animate = useChartAnimation(1400);

  return (
    <div style={{ width: '100%', height }} className="animate-in fade-in-0 duration-500">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

          {series.map((s, seriesIndex) => {
            const seriesColor =
              s.color ?? barColors[seriesIndex % barColors.length] ?? 'var(--chart-1)';

            return (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                fill={seriesColor}
                radius={[4, 4, 0, 0]}
                isAnimationActive={animate}
                animationDuration={1400}
                animationEasing="ease-out"
              >
                {/* If single series, colorize each bar individually */}
                {series.length === 1 &&
                  data.map((_, index) => (
                    <Cell key={`bar-cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
              </Bar>
            );
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
