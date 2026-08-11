import { useState } from 'react';

import { cn } from '@/utils/cn';

export interface AvatarProps {
  src?: string | undefined;
  alt?: string | undefined;
  name?: string | undefined;
  size?: 'sm' | 'md' | 'lg' | 'xl' | undefined;
  status?: 'online' | 'offline' | 'away' | undefined;
  className?: string | undefined;
}

const sizeMap = {
  sm: 'size-7 text-xs',
  md: 'size-9 text-xs',
  lg: 'size-11 text-sm',
  xl: 'size-14 text-base',
};

const statusMap = {
  online: 'bg-success',
  offline: 'bg-muted',
  away: 'bg-warning',
};

function getInitials(name?: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
  }
  return (name[0] ?? 'U').toUpperCase();
}

/**
 * Common Avatar Component.
 * Rules enforced:
 * - NO shadow utilities
 * - Strict rounded-md corners
 */
export function Avatar({ src, alt, name, size = 'md', status, className }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-md border border-border bg-surface-hover font-bold text-text overflow-hidden',
          sizeMap[size],
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt ?? name ?? 'Avatar'}
            onError={() => setImageError(true)}
            className="size-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface',
            statusMap[status],
          )}
        />
      )}
    </div>
  );
}
