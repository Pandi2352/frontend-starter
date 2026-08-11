import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils/cn';

import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
import { SidebarMenu } from './SidebarMenu';

export function Sidebar() {
  const { isOpen, collapsed, closeMobile, toggleCollapsed } = useSidebar();
  const expandSidebar = collapsed ? toggleCollapsed : undefined;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-text/20 lg:hidden"
        />
      )}

      <aside
        aria-label="Sidebar navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar',
          // Mobile drawer slides; desktop collapse snaps instantly — animating
          // width reflows the whole content pane (and charts) on every frame
          'transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'lg:w-[4.5rem]' : 'lg:w-64',
        )}
      >
        <SidebarHeader
          onClose={closeMobile}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed}
        />
        <SidebarMenu
          collapsed={collapsed}
          onNavigate={closeMobile}
          onExpandSidebar={expandSidebar}
        />
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}
