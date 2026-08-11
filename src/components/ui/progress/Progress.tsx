import { cn } from '@/utils/cn';

export interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercent?: boolean;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantMap = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

const sizeMap = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

/**
 * Common Progress Bar Component.
 * Rules enforced:
 * - NO shadow utilities
 * - Strict rounded-md corners
 */
export function Progress({
  value,
  max = 100,
  label,
  showPercent = false,
  variant = 'primary',
  size = 'md',
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-semibold text-text">{label}</span>}
          {showPercent && <span className="font-bold text-muted">{percentage.toFixed(0)}%</span>}
        </div>
      )}

      <div
        className={cn(
          'w-full overflow-hidden rounded-md border border-border bg-surface-hover/60',
          sizeMap[size],
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-md',
            variantMap[variant],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
