import { ArrowLeftRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@/components/ui/tooltip';
import { appConfig } from '@/config/app';
import { cn } from '@/utils/cn';

interface SidebarHeaderProps {
  onClose: () => void;
  collapsed?: boolean | undefined;
  onToggleCollapse?: (() => void) | undefined;
}

export function SidebarHeader({
  onClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarHeaderProps) {
  const { t } = useTranslation();
  const toggleText = collapsed ? t('nav.expandSidebar') : t('nav.collapseSidebar');

  return (
    <div
      className={cn(
        'flex h-16 shrink-0 items-center gap-2.5 bg-sidebar-header px-4',
        collapsed && 'lg:justify-center lg:px-2',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground',
          collapsed && 'lg:hidden',
        )}
      >
        {appConfig.name.charAt(0)}
      </span>
      <span
        className={cn(
          'flex-1 truncate text-base font-semibold text-sidebar-text',
          collapsed && 'lg:hidden',
        )}
      >
        {appConfig.name}
      </span>

      {/* Desktop: collapse / expand */}
      {onToggleCollapse && (
        <Tooltip
          content={toggleText}
          side={collapsed ? 'right' : 'bottom'}
          className="hidden lg:inline-flex"
        >
          <button
            type="button"
            aria-label={toggleText}
            onClick={onToggleCollapse}
            className="rounded-md p-2 text-sidebar-muted transition-colors duration-200 hover:bg-sidebar-hover hover:text-sidebar-text"
          >
            <ArrowLeftRight aria-hidden className="size-4" />
          </button>
        </Tooltip>
      )}

      {/* Mobile: close the drawer */}
      <button
        type="button"
        aria-label={t('nav.closeSidebar')}
        onClick={onClose}
        className="rounded-md p-1.5 text-sidebar-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-text lg:hidden"
      >
        <X aria-hidden className="size-4" />
      </button>
    </div>
  );
}
