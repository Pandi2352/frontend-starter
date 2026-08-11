import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { SidebarContext } from './sidebar-context';

/**
 * Holds sidebar UI state so that toggling it re-renders ONLY the sidebar
 * and navbar consumers — never the routed page content. The provider's
 * `children` element stays referentially stable, so React skips it.
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useLocalStorage<boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED, false);

  const openMobile = useCallback(() => setIsOpen(true), []);
  const closeMobile = useCallback(() => setIsOpen(false), []);
  const toggleCollapsed = useCallback(() => setCollapsed(!collapsed), [collapsed, setCollapsed]);

  const value = useMemo(
    () => ({ isOpen, collapsed, openMobile, closeMobile, toggleCollapsed }),
    [isOpen, collapsed, openMobile, closeMobile, toggleCollapsed],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
