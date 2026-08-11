import { ArrowLeft, Home, LifeBuoy } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { appConfig } from '@/config/app';
import { ROUTES } from '@/constants/routes';

export interface ErrorLayoutProps {
  code: string | number;
  title: string;
  description: string;
  icon?: ReactNode;
  actions?: ReactNode;
  showGoBack?: boolean;
  showHome?: boolean;
  children?: ReactNode;
}

/**
 * Reusable layout for error pages (404, 403, 500, 400, 503).
 * Adheres strictly to:
 * - NO shadow utilities (shadow-none / border-border)
 * - Strict rounded-md corners
 */
export function ErrorLayout({
  code,
  title,
  description,
  icon,
  actions,
  showGoBack = true,
  showHome = true,
  children,
}: ErrorLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4 sm:p-6 text-center">
      {/* Brand Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
          {appConfig.name.charAt(0)}
        </span>
        <span className="text-base font-semibold text-text">{appConfig.name}</span>
      </div>

      {/* Main Error Card */}
      <div className="w-full max-w-lg rounded-md border border-border bg-surface p-6 sm:p-8">
        {/* Status Code / Icon Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-surface-hover px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
          {icon}
          <span>Error {code}</span>
        </div>

        {/* Code Display */}
        <h1 className="text-5xl font-black tracking-tight text-text sm:text-6xl">{code}</h1>

        {/* Error Title */}
        <h2 className="mt-2 text-xl font-bold text-text sm:text-2xl">{title}</h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

        {/* Custom Children / Details */}
        {children && <div className="mt-4">{children}</div>}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {showGoBack && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface-hover hover:text-text"
            >
              <ArrowLeft aria-hidden className="size-4" />
              Go Back
            </button>
          )}

          {showHome && (
            <Link
              to={ROUTES.HOME}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover"
            >
              <Home aria-hidden className="size-4" />
              Dashboard
            </Link>
          )}

          {actions}
        </div>
      </div>

      {/* Footer Navigation Help */}
      <div className="mt-6 flex items-center gap-4 text-xs text-muted">
        <Link
          to={ROUTES.HELP}
          className="inline-flex items-center gap-1 transition-colors hover:text-text"
        >
          <LifeBuoy aria-hidden className="size-3.5" />
          Help & Support
        </Link>
        <span>•</span>
        <Link to={ROUTES.HOME} className="transition-colors hover:text-text">
          System Status
        </Link>
      </div>
    </div>
  );
}
