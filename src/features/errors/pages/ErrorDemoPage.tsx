import {
  AlertTriangle,
  ExternalLink,
  FileQuestion,
  ServerCrash,
  ShieldAlert,
  Wrench,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BadRequest } from '@/components/feedback/BadRequest';
import { Forbidden } from '@/components/feedback/Forbidden';
import { NotFound } from '@/components/feedback/NotFound';
import { ServerError } from '@/components/feedback/ServerError';
import { ServiceUnavailable } from '@/components/feedback/ServiceUnavailable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

type ErrorType = '404' | '403' | '500' | '400' | '503';

const errorOptions: Array<{
  id: ErrorType;
  label: string;
  code: string;
  path: string;
  icon: typeof FileQuestion;
  description: string;
}> = [
  {
    id: '404',
    label: 'Not Found',
    code: '404',
    path: '/404',
    icon: FileQuestion,
    description: 'Triggered when a page or API endpoint does not exist.',
  },
  {
    id: '403',
    label: 'Forbidden',
    code: '403',
    path: ROUTES.FORBIDDEN,
    icon: ShieldAlert,
    description: 'Triggered when user lacks permissions for a page or resource.',
  },
  {
    id: '500',
    label: 'Server Error',
    code: '500',
    path: ROUTES.SERVER_ERROR,
    icon: ServerCrash,
    description: 'Triggered during unhandled backend or system errors.',
  },
  {
    id: '400',
    label: 'Bad Request',
    code: '400',
    path: ROUTES.BAD_REQUEST,
    icon: AlertTriangle,
    description: 'Triggered when payload syntax or parameters are invalid.',
  },
  {
    id: '503',
    label: 'Service Maintenance',
    code: '503',
    path: ROUTES.SERVICE_UNAVAILABLE,
    icon: Wrench,
    description: 'Triggered during scheduled updates or system outages.',
  },
];

export function ErrorDemoPage() {
  const [activeError, setActiveError] = useState<ErrorType>('404');

  return (
    <div className="space-y-6">
      {/* Page Title Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Error Pages Showcase</h1>
          <p className="text-sm text-muted">
            Interactive preview of all standardized error pages adhering strictly to zero shadows
            &amp; rounded-md layout rules.
          </p>
        </div>
      </div>

      {/* Grid of Error Options */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {errorOptions.map((item) => {
          const Icon = item.icon;
          const isActive = activeError === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveError(item.id)}
              className={cn(
                'flex flex-col items-start gap-2 rounded-md border p-4 text-left transition-colors duration-200',
                isActive
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-surface hover:bg-surface-hover text-text',
              )}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  {item.code}
                </span>
                <Icon className="size-4 shrink-0" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="line-clamp-2 mt-1 text-xs text-muted">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preview Container */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-surface-hover py-3">
          <div>
            <CardTitle className="text-sm font-medium">Live Preview: Error {activeError}</CardTitle>
            <CardDescription className="text-xs">
              Standalone route URL:{' '}
              <code className="font-mono text-primary">
                {errorOptions.find((e) => e.id === activeError)?.path}
              </code>
            </CardDescription>
          </div>
          <Link
            to={errorOptions.find((e) => e.id === activeError)?.path ?? ROUTES.HOME}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-hover"
          >
            Open Standalone Page
            <ExternalLink className="size-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-border">
            {activeError === '404' && <NotFound />}
            {activeError === '403' && <Forbidden />}
            {activeError === '500' && <ServerError />}
            {activeError === '400' && <BadRequest />}
            {activeError === '503' && <ServiceUnavailable />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
