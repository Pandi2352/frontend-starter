import { RefreshCw, ServerCrash } from 'lucide-react';

import { ErrorLayout } from './ErrorLayout';

export function ServerError() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <ErrorLayout
      code="500"
      title="Internal Server Error"
      description="Something went wrong on our servers while processing your request. Please try refreshing the page or check back in a few minutes."
      icon={<ServerCrash aria-hidden className="size-4 text-danger" />}
      actions={
        <button
          type="button"
          onClick={handleReload}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface-hover"
        >
          <RefreshCw aria-hidden className="size-4" />
          Reload Page
        </button>
      }
    />
  );
}
