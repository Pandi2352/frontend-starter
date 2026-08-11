import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

import { env } from '@/config/env';

import { ErrorLayout } from './ErrorLayout';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    if (env.isDev) {
      console.error('ErrorBoundary caught exception:', error, info);
    }
  }

  override render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <ErrorLayout
        code="APP_ERROR"
        title="Application Exception"
        description="An unexpected runtime error occurred while rendering the application layout."
        icon={<AlertTriangle aria-hidden className="size-4 text-danger" />}
        actions={
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface-hover"
          >
            <RefreshCw aria-hidden className="size-4" />
            Reload Page
          </button>
        }
      >
        {env.isDev && this.state.error && (
          <div className="mt-4 rounded-md border border-border bg-sidebar-header p-3 text-left font-mono text-xs text-sidebar-text overflow-x-auto max-h-40">
            <p className="font-bold text-danger">
              {this.state.error.name}: {this.state.error.message}
            </p>
            {this.state.error.stack && (
              <pre className="mt-1 text-[11px] text-sidebar-muted whitespace-pre-wrap">
                {this.state.error.stack}
              </pre>
            )}
          </div>
        )}
      </ErrorLayout>
    );
  }
}
