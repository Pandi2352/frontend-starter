import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router';

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
