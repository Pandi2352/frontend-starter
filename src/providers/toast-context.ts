import { createContext } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastItem {
  id: number;
  message: string;
  title?: string;
  variant: ToastVariant;
}

export interface ToastOptions {
  title?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

export interface ToastContextValue {
  toast: (message: string, options?: ToastOptions) => void;
  dismiss: (id: number) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
