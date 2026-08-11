import { BarChart3 } from 'lucide-react';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartProps {
  title?: string;
  data: ChartDataPoint[];
  height?: number;
  className?: string;
}

/**
 * Internal placeholder rendered by all chart components until a charting
 * library (e.g. Recharts) is added to the project.
 */
export function ChartPlaceholder({ title, height = 280, kind }: ChartProps & { kind: string }) {
  return (
    <div
      role="img"
      aria-label={title ? `${title} (${kind})` : kind}
      style={{ height }}
      className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border p-6 text-center"
    >
      <BarChart3 aria-hidden className="size-8 text-muted" />
      {title && <p className="font-medium text-text">{title}</p>}
      <p className="text-sm text-muted">
        {kind} — install a chart library (e.g. Recharts) to render data.
      </p>
    </div>
  );
}
