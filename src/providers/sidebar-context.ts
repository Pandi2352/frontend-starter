import { createContext } from 'react';

export interface SidebarContextValue {
  /** Mobile drawer open state */
  isOpen: boolean;
  /** Desktop icon-only collapsed state (persisted) */
  collapsed: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  toggleCollapsed: () => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);
