import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CHART_PALETTE } from '@/constants/colors';

import { CustomTooltip } from './CustomTooltip';
import { useChartAnimation } from './useChartAnimation';

export interface LineChartSeries {
  dataKey: string;
  name: string;
  color?: string;
}

export interface LineChartProps {
  data: Array<Record<string, unknown>>;
  xAxisKey?: string;
  series: LineChartSeries[];
  height?: number;
  valueFormatter?: (value: number) => string;
}

export function LineChart({
  data,
  xAxisKey = 'name',
  series,
  height = 300,
  valueFormatter,
}: LineChartProps) {
  const animate = useChartAnimation(1600);

  return (
    <div style={{ width: '100%', height }} className="animate-in fade-in-0 duration-500">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            return (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: color, strokeWidth: 2, stroke: 'var(--surface)' }}
                activeDot={{ r: 6, stroke: 'var(--surface)', strokeWidth: 2 }}
                isAnimationActive={animate}
                animationDuration={1600}
                animationEasing="ease-out"
              />
            );
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
