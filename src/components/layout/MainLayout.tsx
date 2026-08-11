import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '@/providers/SidebarProvider';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />

        <div className="flex h-full min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="custom-scrollbar flex-1 overflow-y-auto p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
