import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { AppRoutes } from '@/routes/AppRoutes';

import { AppProviders } from './providers';

export function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </ErrorBoundary>
  );
}
