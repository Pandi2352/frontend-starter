import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/cn';

import { SidebarItem } from './SidebarItem';
import type { SidebarGroupConfig } from './types';

interface SidebarGroupProps {
  group: SidebarGroupConfig;
  collapsed?: boolean | undefined;
  onNavigate?: (() => void) | undefined;
  onExpandSidebar?: (() => void) | undefined;
}

export function SidebarGroup({ group, collapsed, onNavigate, onExpandSidebar }: SidebarGroupProps) {
  const { t } = useTranslation();
  const groupTitle = group.translationKey ? t(group.translationKey) : group.title;

  return (
    <div className="flex flex-col">
      {groupTitle && (
        <>
          <p
            className={cn(
              'px-4 pt-5 pb-1.5 text-[11px] font-semibold tracking-wider text-sidebar-muted uppercase',
              collapsed && 'lg:hidden',
            )}
          >
            {groupTitle}
          </p>
          {collapsed && (
            <span
              aria-hidden
              className="mx-3 my-2 hidden border-t border-sidebar-border lg:block"
            />
          )}
        </>
      )}
      {group.items.map((item) => (
        <SidebarItem
          key={item.path}
          item={item}
          collapsed={collapsed}
          onNavigate={onNavigate}
          onExpandSidebar={onExpandSidebar}
        />
      ))}
    </div>
  );
}
