import { Outlet } from 'react-router-dom';

/**
 * Bare layout with no chrome — for standalone pages.
 */
export function BlankLayout() {
  return (
    <div className="min-h-dvh bg-background">
      <Outlet />
    </div>
  );
}
