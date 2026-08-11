import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

const segmentKeyMap: Record<string, string> = {
  dashboard: 'nav.dashboard',
  users: 'nav.users',
  products: 'nav.products',
  categories: 'nav.categories',
  orders: 'nav.orders',
  invoices: 'nav.invoices',
  analytics: 'nav.analytics',
  reports: 'nav.reports',
  settings: 'nav.settings',
  help: 'nav.help',
  errors: 'nav.errorPages',
};

function formatFallback(segment: string): string {
  return segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

export function Breadcrumb() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-sm sm:flex">
      <Link to={ROUTES.HOME} className="text-muted transition-colors hover:text-text">
        {t('nav.dashboard')}
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const key = segmentKeyMap[segment];
        const label = key ? t(key) : formatFallback(segment);

        return (
          <span key={path} className="flex items-center gap-1">
            <ChevronRight aria-hidden className="size-3.5 text-muted" />
            {isLast ? (
              <span aria-current="page" className="font-medium text-text">
                {label}
              </span>
            ) : (
              <Link to={path} className="text-muted transition-colors hover:text-text">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
