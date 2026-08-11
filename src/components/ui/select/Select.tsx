import { ChevronDown } from 'lucide-react';
import { type SelectHTMLAttributes, useId } from 'react';

import { cn } from '@/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

/**
 * Common Select Component.
 * Rules enforced:
 * - NO shadow utilities (border border-border bg-surface)
 * - Strict rounded-md corners
 */
export function Select({
  label,
  options,
  error,
  helperText,
  className,
  id: externalId,
  disabled,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-text">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <select
          id={id}
          disabled={disabled}
          className={cn(
            'w-full appearance-none rounded-md border bg-surface py-2 pl-3 pr-8 text-xs text-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring',
            error ? 'border-danger focus:ring-danger' : 'border-border',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-hover',
            className,
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>

      {error && <span className="text-[11px] font-medium text-danger">{error}</span>}
      {!error && helperText && <span className="text-[11px] text-muted">{helperText}</span>}
    </div>
  );
}
