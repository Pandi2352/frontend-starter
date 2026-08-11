import { type ReactNode, useState } from 'react';

import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

/**
 * Common Tabs Component.
 * Rules enforced:
 * - NO shadow utilities (border border-border bg-surface)
 * - Strict rounded-md corners
 */
export function Tabs({ items, defaultTabId, onChange, className }: TabsProps) {
  const [activeId, setActiveId] = useState(() => defaultTabId ?? items[0]?.id ?? '');

  const handleSelect = (tabId: string) => {
    setActiveId(tabId);
    onChange?.(tabId);
  };

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Tab Navigation List */}
      <div className="flex items-center gap-1 rounded-md border border-border bg-surface-hover/50 p-1">
        {items.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelect(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150',
                isActive
                  ? 'border border-border bg-surface text-text font-bold'
                  : 'text-muted hover:bg-surface-hover hover:text-text',
              )}
            >
              {tab.icon && <span className="size-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="rounded-md border border-border bg-surface-hover px-1.5 py-0.5 text-[10px] font-bold text-muted">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content */}
      <div className="rounded-md border border-border bg-surface p-4 text-sm text-text animate-in fade-in-0 duration-200">
        {activeItem?.content}
      </div>
    </div>
  );
}
