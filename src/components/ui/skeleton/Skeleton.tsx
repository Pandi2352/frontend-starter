import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse rounded-md bg-secondary', className)}
      {...props}
    />
  );
}
