import { createElement } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

import { Loading } from '@/components/feedback/Loading';
import { MainLayout } from '@/components/layout/MainLayout';
import { ROUTES } from '@/constants/routes';
import { dashboardRoutes } from '@/features/dashboard/routes';
import { demoRoutes } from '@/features/demo/routes';
import { errorRoutes, standaloneErrorRoutes } from '@/features/errors/routes';
import { ordersRoutes } from '@/features/orders/routes';
import { settingsRoutes } from '@/features/settings/routes';
import { usersRoutes } from '@/features/users/routes';

/**
 * Central route tree composed from feature route modules.
 * All pages are lazy-loaded for code-splitting.
 */
export const appRoutes: RouteObject[] = [
  {
    hydrateFallbackElement: createElement(Loading, { fullScreen: true }),
    children: [
      {
        element: createElement(MainLayout),
        children: [
          {
            index: true,
            element: createElement(Navigate, { to: ROUTES.DASHBOARD, replace: true }),
          },
          ...dashboardRoutes,
          ...usersRoutes,
          ...ordersRoutes,
          ...settingsRoutes,
          ...demoRoutes,
          ...errorRoutes,
        ],
      },
      ...standaloneErrorRoutes,
    ],
  },
];
