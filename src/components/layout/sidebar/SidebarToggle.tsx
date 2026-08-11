import { Menu } from 'lucide-react';

import { useSidebar } from '@/hooks/useSidebar';

/**
 * Mobile hamburger — the desktop collapse toggle lives in SidebarHeader.
 */
export function SidebarToggle() {
  const { openMobile } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Open sidebar"
      onClick={openMobile}
      className="rounded-md border border-border p-2 text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text lg:hidden"
    >
      <Menu aria-hidden className="size-4" />
    </button>
  );
}
