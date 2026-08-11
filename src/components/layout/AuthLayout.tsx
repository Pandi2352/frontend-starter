import { Outlet } from 'react-router-dom';

import { appConfig } from '@/config/app';

export function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-text">{appConfig.name}</h1>
        <Outlet />
      </div>
    </div>
  );
}
