import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { Toast } from '@/components/ui/toast';

import { ToastContext, type ToastItem, type ToastOptions } from './toast-context';

const DEFAULT_DURATION_MS = 5000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = nextId.current++;
      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          variant: options?.variant ?? 'info',
          ...(options?.title ? { title: options.title } : {}),
        },
      ]);
      window.setTimeout(() => dismiss(id), options?.durationMs ?? DEFAULT_DURATION_MS);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed right-4 bottom-4 z-70 flex flex-col gap-2"
      >
        {toasts.map((item) => (
          <Toast key={item.id} toast={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
