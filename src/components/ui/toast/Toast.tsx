import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

import type { ToastItem, ToastVariant } from '@/providers/toast-context';
import { cn } from '@/utils/cn';

const variantConfig: Record<ToastVariant, { className: string; icon: ReactNode }> = {
  info: {
    className: 'border-border',
    icon: <Info aria-hidden className="size-4 shrink-0 text-primary" />,
  },
  success: {
    className: 'border-success/30',
    icon: <CheckCircle2 aria-hidden className="size-4 shrink-0 text-success" />,
  },
  warning: {
    className: 'border-warning/30',
    icon: <AlertTriangle aria-hidden className="size-4 shrink-0 text-warning" />,
  },
  danger: {
    className: 'border-danger/30',
    icon: <XCircle aria-hidden className="size-4 shrink-0 text-danger" />,
  },
};

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const config = variantConfig[toast.variant];

  return (
    <div
      role="status"
      className={cn(
        'flex w-80 items-start gap-3 rounded-md border bg-surface p-4 text-sm',
        config.className,
      )}
    >
      {config.icon}
      <div className="flex-1">
        {toast.title && <p className="font-medium text-text">{toast.title}</p>}
        <p className="text-muted">{toast.message}</p>
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="rounded-md p-0.5 text-muted transition-colors hover:text-text"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}
