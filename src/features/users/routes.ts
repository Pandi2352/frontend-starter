import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

export const usersRoutes: RouteObject[] = [
  {
    path: ROUTES.USERS,
    lazy: async () => ({
      Component: (await import('./pages/UsersPage')).UsersPage,
    }),
  },
];
