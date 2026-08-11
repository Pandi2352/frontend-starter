import { useMemo, useState } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
}

export function usePagination({
  totalItems,
  pageSize = 10,
  initialPage = 1,
}: UsePaginationOptions) {
  const [page, setPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return useMemo(
    () => ({
      page,
      pageSize,
      totalPages,
      hasPrevious: page > 1,
      hasNext: page < totalPages,
      goTo: (next: number) => setPage(Math.min(Math.max(1, next), totalPages)),
      previous: () => setPage((current) => Math.max(1, current - 1)),
      next: () => setPage((current) => Math.min(totalPages, current + 1)),
      reset: () => setPage(1),
    }),
    [page, pageSize, totalPages],
  );
}
