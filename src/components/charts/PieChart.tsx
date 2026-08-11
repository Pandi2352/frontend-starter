import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { CHART_PALETTE } from '@/constants/colors';

import { CustomTooltip } from './CustomTooltip';
import { useChartAnimation } from './useChartAnimation';

export interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
  valueFormatter?: (value: number) => string;
}

export function PieChart({ data, height = 300, valueFormatter }: PieChartProps) {
  const animate = useChartAnimation(1400);

  return (
    <div style={{ width: '100%', height }} className="animate-in fade-in-0 duration-500">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value: string) => (
              <span className="text-xs text-muted font-medium">{value}</span>
            )}
          />
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={85}
            dataKey="value"
            nameKey="name"
            paddingAngle={3}
            isAnimationActive={animate}
            animationDuration={1400}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`pie-cell-${entry.name}`}
                fill={entry.color ?? CHART_PALETTE[index % CHART_PALETTE.length]}
                stroke="var(--surface)"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
