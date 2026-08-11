import { FileQuestion, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorLayout } from './ErrorLayout';

export function NotFound() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search or dashboard
      navigate(`/dashboard?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <ErrorLayout
      code="404"
      title="Page Not Found"
      description="The requested page could not be found. It may have been moved, deleted, or the URL might be incorrect."
      icon={<FileQuestion aria-hidden className="size-4" />}
    >
      <form onSubmit={handleSearch} className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search application..."
            className="w-full rounded-md border border-border bg-surface pl-9 pr-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="rounded-md border border-border bg-surface-hover px-4 text-sm font-medium text-text transition-colors hover:bg-secondary-hover"
        >
          Search
        </button>
      </form>
    </ErrorLayout>
  );
}
