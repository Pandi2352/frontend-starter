import type { ReactNode } from 'react';

interface PageActionsProps {
  children: ReactNode;
}

export function PageActions({ children }: PageActionsProps) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}
