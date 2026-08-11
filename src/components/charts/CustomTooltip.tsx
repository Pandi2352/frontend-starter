export interface TooltipPayloadItem {
  name?: string | undefined;
  value?: number | string | undefined;
  color?: string | undefined;
  fill?: string | undefined;
  dataKey?: string | undefined;
}

export interface CustomTooltipProps {
  active?: boolean | undefined;
  payload?: TooltipPayloadItem[] | undefined;
  label?: string | undefined;
  valueFormatter?: ((value: number) => string) | undefined;
}

/**
 * Custom tooltip component for Recharts charts.
 * Adheres strictly to:
 * - NO shadow utilities (border border-border bg-surface)
 * - Strict rounded-md corners
 */
export function CustomTooltip({ active, payload, label, valueFormatter }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium text-text animate-in fade-in-0 zoom-in-95 duration-150">
      {label && (
        <div className="mb-1 border-b border-border pb-1 font-bold text-muted">{label}</div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, index) => {
          const rawValue = typeof item.value === 'number' ? item.value : Number(item.value ?? 0);
          const formattedValue = valueFormatter
            ? valueFormatter(rawValue)
            : rawValue.toLocaleString();
          const color = item.color ?? item.fill ?? 'var(--primary)';

          return (
            <div key={item.name ?? index} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-muted">{item.name}:</span>
              </span>
              <span className="font-semibold text-text">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
