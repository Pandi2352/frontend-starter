import { cn } from '@/utils/cn';

import { sidebarGroups } from './sidebar.config';
import { SidebarGroup } from './SidebarGroup';

interface SidebarMenuProps {
  collapsed?: boolean | undefined;
  onNavigate?: (() => void) | undefined;
  onExpandSidebar?: (() => void) | undefined;
}

export function SidebarMenu({ collapsed, onNavigate, onExpandSidebar }: SidebarMenuProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'flex flex-1 flex-col overflow-y-auto custom-scrollbar pb-3',
        // Tooltips must not be clipped by the scroll container in icon-only mode
        collapsed && 'lg:overflow-visible',
      )}
    >
      {sidebarGroups.map((group, index) => (
        <SidebarGroup
          key={group.title ?? index}
          group={group}
          collapsed={collapsed}
          onNavigate={onNavigate}
          onExpandSidebar={onExpandSidebar}
        />
      ))}
    </nav>
  );
}
