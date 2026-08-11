import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * Simple page-level header for content sections.
 */
export function Header({ title, description, actions }: HeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-text">{title}</h1>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
