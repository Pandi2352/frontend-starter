import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { Tooltip } from '@/components/ui/tooltip';
import type { NavItem } from '@/types/common';
import { cn } from '@/utils/cn';

export interface SidebarItemProps {
  item: NavItem;
  collapsed?: boolean | undefined;
  onNavigate?: (() => void) | undefined;
  /** Called when a collapsed parent item needs the sidebar expanded to show its submenu */
  onExpandSidebar?: (() => void) | undefined;
}

const baseClasses =
  'group relative flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200';
const activeClasses = 'bg-sidebar-active text-sidebar-text';
const inactiveClasses = 'text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-text';

function ItemBadge({ badge, collapsed }: { badge: string; collapsed: boolean }) {
  return (
    <span
      className={cn(
        'rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground',
        collapsed && 'lg:hidden',
      )}
    >
      {badge}
    </span>
  );
}

function SidebarLink({
  item,
  collapsed = false,
  nested = false,
  onNavigate,
}: SidebarItemProps & { nested?: boolean }) {
  const { t } = useTranslation();
  const Icon = item.icon;
  const label = item.translationKey ? t(item.translationKey) : item.label;

  return (
    <Tooltip content={label} disabled={!collapsed || nested} className="w-full">
      <NavLink
        to={item.path}
        end
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            baseClasses,
            isActive ? activeClasses : inactiveClasses,
            nested && 'py-2 pl-8',
            collapsed && !nested && 'lg:justify-center lg:px-0',
          )
        }
      >
        {({ isActive }) => (
          <>
            <Icon aria-hidden className="size-4 shrink-0" />
            <span
              className={cn(
                'flex min-w-0 flex-1 flex-col text-left',
                collapsed && !nested && 'lg:hidden',
              )}
            >
              <span className="truncate">{label}</span>
              {item.description && isActive && (
                <span className="truncate text-xs font-normal text-sidebar-muted">
                  {item.description}
                </span>
              )}
            </span>
            {item.badge && <ItemBadge badge={item.badge} collapsed={collapsed && !nested} />}
          </>
        )}
      </NavLink>
    </Tooltip>
  );
}

export function SidebarItem({
  item,
  collapsed = false,
  onNavigate,
  onExpandSidebar,
}: SidebarItemProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const children = item.children ?? [];
  const hasChildren = children.length > 0;
  const childActive = children.some(
    (child) => pathname === child.path || pathname.startsWith(`${child.path}/`),
  );
  const [open, setOpen] = useState(childActive);

  if (!hasChildren) {
    return <SidebarLink item={item} collapsed={collapsed} onNavigate={onNavigate} />;
  }

  const Icon = item.icon;
  const label = item.translationKey ? t(item.translationKey) : item.label;

  const handleToggle = () => {
    if (collapsed) {
      // Icon-only mode cannot show a submenu — expand the sidebar first
      onExpandSidebar?.();
      setOpen(true);
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <Tooltip content={label} disabled={!collapsed} className="w-full">
        <button
          type="button"
          aria-expanded={open}
          onClick={handleToggle}
          className={cn(
            baseClasses,
            childActive ? activeClasses : inactiveClasses,
            collapsed && 'lg:justify-center lg:px-0',
          )}
        >
          <Icon aria-hidden className="size-4 shrink-0" />
          <span className={cn('min-w-0 flex-1 truncate text-left', collapsed && 'lg:hidden')}>
            {label}
          </span>
          {item.badge && <ItemBadge badge={item.badge} collapsed={collapsed} />}
          <ChevronRight
            aria-hidden
            className={cn(
              'size-4 shrink-0 transition-transform duration-200',
              open && 'rotate-90',
              collapsed && 'lg:hidden',
            )}
          />
        </button>
      </Tooltip>

      {open && (
        <div className={cn('flex flex-col bg-sidebar-header/60', collapsed && 'lg:hidden')}>
          {children.map((child) => (
            <SidebarLink
              key={child.path}
              item={child}
              collapsed={collapsed}
              nested
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
