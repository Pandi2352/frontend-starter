import { Users } from 'lucide-react';

import { EmptyState } from '@/components/ui/empty-state';

export function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Users</h1>
        <p className="text-sm text-muted">Manage the users of your workspace.</p>
      </div>
      <EmptyState
        icon={<Users aria-hidden className="size-10" />}
        title="No users yet"
        description="Connect your API to load and manage users here."
      />
    </div>
  );
}
