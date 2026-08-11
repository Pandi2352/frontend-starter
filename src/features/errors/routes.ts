import { createElement } from 'react';
import type { RouteObject } from 'react-router-dom';

import { BadRequest } from '@/components/feedback/BadRequest';
import { Forbidden } from '@/components/feedback/Forbidden';
import { NotFound } from '@/components/feedback/NotFound';
import { ServerError } from '@/components/feedback/ServerError';
import { ServiceUnavailable } from '@/components/feedback/ServiceUnavailable';
import { ROUTES } from '@/constants/routes';

import { ErrorDemoPage } from './pages/ErrorDemoPage';

export const errorRoutes: RouteObject[] = [
  {
    path: ROUTES.ERRORS,
    element: createElement(ErrorDemoPage),
  },
];

export const standaloneErrorRoutes: RouteObject[] = [
  {
    path: ROUTES.FORBIDDEN,
    element: createElement(Forbidden),
  },
  {
    path: ROUTES.SERVER_ERROR,
    element: createElement(ServerError),
  },
  {
    path: ROUTES.BAD_REQUEST,
    element: createElement(BadRequest),
  },
  {
    path: ROUTES.SERVICE_UNAVAILABLE,
    element: createElement(ServiceUnavailable),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: createElement(NotFound),
  },
];
