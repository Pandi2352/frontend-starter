import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

export const dashboardRoutes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    lazy: async () => ({
      Component: (await import('./pages/DashboardPage')).DashboardPage,
    }),
  },
];
