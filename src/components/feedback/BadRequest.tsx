import { AlertTriangle, RotateCcw } from 'lucide-react';

import { ErrorLayout } from './ErrorLayout';

export function BadRequest() {
  return (
    <ErrorLayout
      code="400"
      title="Bad Request"
      description="The request parameters or payload sent to the server were invalid or incomplete. Please verify your input and try again."
      icon={<AlertTriangle aria-hidden className="size-4 text-warning" />}
      actions={
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface-hover"
        >
          <RotateCcw aria-hidden className="size-4" />
          Try Again
        </button>
      }
    />
  );
}
