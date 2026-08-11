import { Construction } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { EmptyState } from '@/components/ui/empty-state';

function toTitle(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean).pop() ?? 'Page';
  return segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Shared placeholder for demo sidebar menus — replace with real feature
 * modules as the project grows.
 */
export function PlaceholderPage() {
  const { pathname } = useLocation();
  const title = toTitle(pathname);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text">{title}</h1>
        <p className="text-sm text-muted">Demo page for sidebar navigation.</p>
      </div>
      <EmptyState
        icon={<Construction aria-hidden className="size-10" />}
        title={`${title} is a demo page`}
        description="Copy the feature-name template in src/features to build the real module."
      />
    </div>
  );
}
