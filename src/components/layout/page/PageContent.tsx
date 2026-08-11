import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return <div className={cn('flex flex-col gap-4', className)}>{children}</div>;
}
