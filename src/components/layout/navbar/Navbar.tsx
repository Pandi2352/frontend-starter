import { useState } from 'react';

import { CommandPalette } from '@/components/ui/command-palette/CommandPalette';
import { SystemLogDrawer } from '@/features/system/components/SystemLogDrawer';

import { SidebarToggle } from '../sidebar/SidebarToggle';
import { Breadcrumb } from './Breadcrumb';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Notification } from './Notification';
import { NotificationDrawer } from './NotificationDrawer';
import { SearchBar } from './SearchBar';
import { SystemLogToggle } from './SystemLogToggle';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isLogsDrawerOpen, setIsLogsDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
        <SidebarToggle />
        <Breadcrumb />

        <div className="ml-auto flex items-center gap-3">
          <SearchBar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
          <SystemLogToggle />
          <Notification count={unreadCount} onClick={() => setIsNotificationDrawerOpen(true)} />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      {/* Interactive Global Drawers & Dialogs */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenLogs={() => setIsLogsDrawerOpen(true)}
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onUpdateUnreadCount={setUnreadCount}
      />

      <SystemLogDrawer isOpen={isLogsDrawerOpen} onClose={() => setIsLogsDrawerOpen(false)} />
    </>
  );
}
