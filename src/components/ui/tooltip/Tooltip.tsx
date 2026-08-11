import {
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { cn } from '@/utils/cn';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

const sideClasses: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
};

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  disabled?: boolean;
  className?: string;
  delay?: number;
}

/**
 * Interactive React tooltip that correctly manages hover, focus-visible, and click states.
 * - Shows on hover after a delay
 * - Shows on keyboard focus (:focus-visible)
 * - Immediately hides on click / pointer interaction to prevent lingering tooltips
 * - Immediately hides on Escape key press
 */
export function Tooltip({
  content,
  children,
  side = 'right',
  disabled = false,
  className,
  delay = 200,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (disabled || !content) return;
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimer();
    setIsVisible(false);
  };

  const handleFocus = (e: FocusEvent) => {
    if (disabled || !content) return;
    try {
      if (e.target.matches(':focus-visible')) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    clearTimer();
    setIsVisible(false);
  };

  const handleClick = () => {
    clearTimer();
    setIsVisible(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearTimer();
      setIsVisible(false);
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const shouldShow = isVisible && !disabled && Boolean(content);

  if (disabled || !content) {
    return <>{children}</>;
  }

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
      {shouldShow && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-[60] whitespace-nowrap',
            'rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text',
            'animate-in fade-in-0 duration-150',
            sideClasses[side],
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
