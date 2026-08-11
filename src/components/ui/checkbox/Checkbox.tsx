import { Check } from 'lucide-react';
import { type InputHTMLAttributes, useId } from 'react';

import { cn } from '@/utils/cn';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  error?: string;
}

/**
 * Common Checkbox Component.
 * Rules enforced:
 * - NO shadow utilities
 * - Strict rounded-md corners
 */
export function Checkbox({
  checked,
  onChange,
  label,
  description,
  error,
  disabled,
  className,
  id: externalId,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer select-none">
        <div className="relative flex items-center mt-0.5">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'flex size-4 items-center justify-center rounded-md border border-border bg-surface transition-colors duration-150 peer-focus:ring-2 peer-focus:ring-ring',
              checked && 'bg-primary border-primary text-primary-foreground',
              error && 'border-danger',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {checked && <Check className="size-3 stroke-[3]" />}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-xs font-semibold text-text">{label}</span>}
            {description && <span className="text-[11px] text-muted">{description}</span>}
          </div>
        )}
      </label>

      {error && <span className="text-[11px] font-medium text-danger">{error}</span>}
    </div>
  );
}
