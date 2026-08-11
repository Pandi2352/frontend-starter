import { RefreshCw, Wrench } from 'lucide-react';

import { ErrorLayout } from './ErrorLayout';

export function ServiceUnavailable() {
  const handleCheckConnection = () => {
    window.location.reload();
  };

  return (
    <ErrorLayout
      code="503"
      title="Service Maintenance"
      description="Our services are currently undergoing scheduled maintenance or system updates. Normal operations will resume shortly."
      icon={<Wrench aria-hidden className="size-4 text-primary" />}
      actions={
        <button
          type="button"
          onClick={handleCheckConnection}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface-hover"
        >
          <RefreshCw aria-hidden className="size-4" />
          Check Status
        </button>
      }
    >
      <div className="mt-4 rounded-md border border-border bg-surface-hover p-3 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-text">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-warning" />
          </span>
          Maintenance in progress
        </div>
        <p className="mt-1 text-xs text-muted">
          Estimated completion time: <span className="font-mono font-medium">15 minutes</span>
        </p>
      </div>
    </ErrorLayout>
  );
}
