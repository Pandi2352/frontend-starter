import { ArrowRight, Lock, X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/utils/cn';

interface SidebarFooterProps {
  collapsed?: boolean | undefined;
}

/**
 * Dismissible promo card pinned to the bottom of the sidebar (demo content).
 */
export function SidebarFooter({ collapsed = false }: SidebarFooterProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={cn('shrink-0 p-3', collapsed && 'lg:hidden')}>
      <div className="relative rounded-md bg-sidebar-hover p-4">
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 rounded-md p-1 text-sidebar-muted transition-colors hover:text-sidebar-text"
        >
          <X aria-hidden className="size-3.5" />
        </button>

        <span
          aria-hidden
          className="flex size-9 items-center justify-center rounded-full bg-sidebar-active text-sidebar-text"
        >
          <Lock aria-hidden className="size-4" />
        </span>

        <p className="mt-3 text-sm text-sidebar-text">
          Upgrade to <span className="font-semibold">Pro plan</span> to unlock all available
          features
        </p>

        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          Upgrade now
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
