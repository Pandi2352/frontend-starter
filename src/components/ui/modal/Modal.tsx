import { X } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';

import { cn } from '@/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

/**
 * Common Modal Dialog Component.
 * Rules enforced:
 * - NO shadow utilities (border border-border bg-surface)
 * - Strict rounded-md corners
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
  className,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-text/30 backdrop-blur-xs animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed left-1/2 top-20 z-50 w-full -translate-x-1/2 rounded-md border border-border bg-surface p-6 shadow-none animate-in zoom-in-95 fade-in-0 duration-200',
          maxWidthMap[maxWidth],
          className,
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between border-b border-border pb-4 mb-4">
            <div>
              {title && <h2 className="text-lg font-bold text-text">{title}</h2>}
              {description && <p className="text-xs text-muted mt-1">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-md border border-border p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-text"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="text-sm text-text">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-4">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
