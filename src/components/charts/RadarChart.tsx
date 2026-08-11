import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { CHART_PALETTE } from '@/constants/colors';

import { CustomTooltip } from './CustomTooltip';
import { useChartAnimation } from './useChartAnimation';

export interface RadarSeries {
  dataKey: string;
  name: string;
  color?: string;
}

export interface RadarChartProps {
  data: Array<Record<string, unknown>>;
  angleKey?: string;
  series: RadarSeries[];
  height?: number;
  valueFormatter?: (value: number) => string;
}

export function RadarChart({
  data,
  angleKey = 'subject',
  series,
  height = 300,
  valueFormatter,
}: RadarChartProps) {
  const animate = useChartAnimation(1500);

  return (
    <div style={{ width: '100%', height }} className="animate-in fade-in-0 duration-500">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="var(--border)" opacity={0.6} />
          <PolarAngleAxis dataKey={angleKey} stroke="var(--text)" fontSize={11} />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} stroke="var(--muted)" fontSize={10} />
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />

          {series.map((s, index) => {
            const color =
              s.color ?? CHART_PALETTE[index % CHART_PALETTE.length] ?? 'var(--chart-1)';
            return (
              <Radar
                key={s.dataKey}
                name={s.name}
                dataKey={s.dataKey}
                stroke={color}
                fill={color}
                fillOpacity={0.35}
                isAnimationActive={animate}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            );
          })}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
