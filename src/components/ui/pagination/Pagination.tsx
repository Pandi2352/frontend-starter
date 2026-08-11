import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number;
  className?: string;
}

/**
 * Common Pagination Control Component.
 * Rules enforced:
 * - NO shadow utilities
 * - Strict rounded-md corners
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs',
        className,
      )}
    >
      {totalItems !== undefined && (
        <div className="text-muted">
          Showing{' '}
          <span className="font-semibold text-text">
            {Math.min((currentPage - 1) * (pageSize ?? 10) + 1, totalItems)}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-text">
            {Math.min(currentPage * (pageSize ?? 10), totalItems)}
          </span>{' '}
          of <span className="font-semibold text-text">{totalItems}</span> items
        </div>
      )}

      <div className="flex items-center gap-2">
        {onPageSizeChange && pageSize && (
          <div className="flex items-center gap-1.5 mr-2">
            <span className="text-muted font-medium">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-text focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
            className="flex size-8 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" />
          </button>

          {pages.map((page) => {
            const isSelected = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={cn(
                  'flex size-8 items-center justify-center rounded-md border text-xs font-semibold transition-colors duration-150',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-text hover:bg-surface-hover',
                )}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            className="flex size-8 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
