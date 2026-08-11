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

export interface DonutChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
  valueFormatter?: (value: number) => string;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  height = 300,
  valueFormatter,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const animate = useChartAnimation(1400);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative animate-in fade-in-0 duration-500" style={{ width: '100%', height }}>
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
            cy="42%"
            innerRadius={55}
            outerRadius={85}
            dataKey="value"
            nameKey="name"
            paddingAngle={4}
            isAnimationActive={animate}
            animationDuration={1400}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`donut-cell-${entry.name}`}
                fill={entry.color ?? CHART_PALETTE[index % CHART_PALETTE.length]}
                stroke="var(--surface)"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>

      {/* Center Label Overlay */}
      {(centerLabel || centerValue) && (
        <div className="pointer-events-none absolute left-1/2 top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
          <span className="text-lg font-bold text-text">
            {centerValue ?? total.toLocaleString()}
          </span>
          {centerLabel && <span className="text-[11px] font-medium text-muted">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}
