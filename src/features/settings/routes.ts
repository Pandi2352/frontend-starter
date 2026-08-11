import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

export const settingsRoutes: RouteObject[] = [
  {
    path: ROUTES.SETTINGS,
    lazy: async () => ({
      Component: (await import('./pages/SettingsPage')).SettingsPage,
    }),
  },
];
