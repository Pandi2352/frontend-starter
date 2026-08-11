import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  onClick: () => void;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

/**
 * Common Dropdown Menu Component.
 * Rules enforced:
 * - NO shadow utilities (border border-border bg-surface)
 * - Strict rounded-md corners
 */
export function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full mt-1.5 z-40 w-48 rounded-md border border-border bg-surface p-1 shadow-none animate-in zoom-in-95 fade-in-0 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
            className,
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setIsOpen(false);
                item.onClick();
              }}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-semibold transition-colors duration-150',
                item.danger
                  ? 'text-danger hover:bg-danger-soft'
                  : 'text-text hover:bg-surface-hover',
              )}
            >
              {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
