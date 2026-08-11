import type { ReactNode } from 'react';

interface QuickActionsProps {
  children?: ReactNode;
}

/**
 * Slot for page-agnostic quick actions rendered in the navbar.
 */
export function QuickActions({ children }: QuickActionsProps) {
  if (!children) return null;

  return <div className="flex items-center gap-2">{children}</div>;
}
