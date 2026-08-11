import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const variantConfig: Record<AlertVariant, { className: string; icon: ReactNode }> = {
  info: {
    className: 'border-border bg-surface text-text',
    icon: <Info aria-hidden className="size-4 shrink-0 text-primary" />,
  },
  success: {
    className: 'border-success/30 bg-success-soft text-success',
    icon: <CheckCircle2 aria-hidden className="size-4 shrink-0" />,
  },
  warning: {
    className: 'border-warning/30 bg-warning-soft text-warning',
    icon: <AlertTriangle aria-hidden className="size-4 shrink-0" />,
  },
  danger: {
    className: 'border-danger/30 bg-danger-soft text-danger',
    icon: <XCircle aria-hidden className="size-4 shrink-0" />,
  },
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}

export function Alert({ variant = 'info', title, className, children, ...props }: AlertProps) {
  const config = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn('flex gap-3 rounded-md border p-4 text-sm', config.className, className)}
      {...props}
    >
      {config.icon}
      <div className="flex flex-col gap-1">
        {title && <p className="font-medium">{title}</p>}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
