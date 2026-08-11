import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

const demoPaths: string[] = [
  ROUTES.PRODUCTS,
  ROUTES.PRODUCT_CATEGORIES,
  ROUTES.ORDERS,
  ROUTES.INVOICES,
  ROUTES.ANALYTICS,
  ROUTES.REPORTS,
  ROUTES.HELP,
];

export const demoRoutes: RouteObject[] = demoPaths.map((path) => ({
  path,
  lazy: async () => ({
    Component: (await import('./pages/PlaceholderPage')).PlaceholderPage,
  }),
}));
