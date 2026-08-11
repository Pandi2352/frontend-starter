import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border p-10 text-center',
        className,
      )}
    >
      <span className="text-muted">{icon ?? <Inbox aria-hidden className="size-10" />}</span>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-text">{title}</p>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
