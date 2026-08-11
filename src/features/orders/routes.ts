import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

const OrdersPage = lazy(() =>
  import('./pages/OrdersPage').then((m) => ({ default: m.OrdersPage })),
);

export const ordersRoutes: RouteObject[] = [
  {
    path: ROUTES.ORDERS,
    element: createElement(OrdersPage),
  },
];
