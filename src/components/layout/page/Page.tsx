import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface PageProps {
  children: ReactNode;
  className?: string;
}

export function Page({ children, className }: PageProps) {
  return <div className={cn('flex flex-col gap-6', className)}>{children}</div>;
}
