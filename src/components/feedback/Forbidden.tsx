import { KeyRound, ShieldAlert } from 'lucide-react';

import { ErrorLayout } from './ErrorLayout';

export function Forbidden() {
  return (
    <ErrorLayout
      code="403"
      title="Access Denied"
      description="You don't have authorization to access this page or resource. Please contact your system administrator if you believe this is an error."
      icon={<ShieldAlert aria-hidden className="size-4 text-warning" />}
      actions={
        <button
          type="button"
          onClick={() => alert('Access request submitted to workspace administrator.')}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface-hover"
        >
          <KeyRound aria-hidden className="size-4" />
          Request Access
        </button>
      }
    />
  );
}
