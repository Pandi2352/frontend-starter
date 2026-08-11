import { useId } from 'react';

import { cn } from '@/utils/cn';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Common Toggle Switch Component.
 * Rules enforced:
 * - NO shadow utilities
 * - Strict rounded-md styling
 */
export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
}: SwitchProps) {
  const id = useId();

  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      {(label || description) && (
        <label htmlFor={id} className="cursor-pointer select-none">
          {label && <div className="text-xs font-semibold text-text">{label}</div>}
          {description && <div className="text-[11px] text-muted">{description}</div>}
        </label>
      )}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-md border border-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring',
          checked ? 'bg-primary border-primary' : 'bg-surface-hover',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block size-3.5 transform rounded-md transition duration-200 ease-in-out',
            checked ? 'translate-x-4 bg-primary-foreground' : 'translate-x-0.5 bg-muted',
          )}
        />
      </button>
    </div>
  );
}
