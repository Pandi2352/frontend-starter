import {
  AlertOctagon,
  Eye,
  FileQuestion,
  Globe,
  KeyRound,
  LayoutDashboard,
  Moon,
  Palette,
  Search,
  ServerCrash,
  Settings,
  Sun,
  Terminal,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ACCENT_COLORS } from '@/constants/accent';
import { ROUTES } from '@/constants/routes';
import { logStreamService } from '@/features/system/services/logStreamService';
import { useTheme } from '@/hooks/useTheme';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import type { AccentColor } from '@/types/common';
import { cn } from '@/utils/cn';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogs?: () => void;
}

interface CommandItem {
  id: string;
  group: 'navigation' | 'actions' | 'accents' | 'languages';
  label: string;
  description?: string | undefined;
  icon: typeof Search;
  action: () => void;
  badge?: string | undefined;
}

export function CommandPalette({ isOpen, onClose, onOpenLogs }: CommandPaletteProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme, setTheme, accent, setAccent, highContrast, setHighContrast } = useTheme();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: CommandItem[] = [
    // Navigation Group
    {
      id: 'nav-dashboard',
      group: 'navigation',
      label: t('nav.dashboard'),
      description: 'Overview metrics and live system charts',
      icon: LayoutDashboard,
      action: () => navigate(ROUTES.DASHBOARD),
    },
    {
      id: 'nav-users',
      group: 'navigation',
      label: t('nav.users'),
      description: 'Manage workspace users and access',
      icon: Users,
      action: () => navigate(ROUTES.USERS),
    },
    {
      id: 'nav-settings',
      group: 'navigation',
      label: t('nav.settings'),
      description: 'Appearance, accent colors, and regional preferences',
      icon: Settings,
      action: () => navigate(ROUTES.SETTINGS),
    },
    {
      id: 'nav-errors',
      group: 'navigation',
      label: t('nav.errorPages'),
      description: 'Interactive showcase of 404, 403, 500 error pages',
      icon: AlertOctagon,
      action: () => navigate(ROUTES.ERRORS),
    },
    {
      id: 'nav-404',
      group: 'navigation',
      label: '404 Page Not Found',
      description: 'Preview standalone 404 error page',
      icon: FileQuestion,
      action: () => navigate('/404'),
    },
    {
      id: 'nav-403',
      group: 'navigation',
      label: '403 Access Denied',
      description: 'Preview standalone 403 forbidden page',
      icon: KeyRound,
      action: () => navigate(ROUTES.FORBIDDEN),
    },
    {
      id: 'nav-500',
      group: 'navigation',
      label: '500 Server Error',
      description: 'Preview standalone 500 server crash page',
      icon: ServerCrash,
      action: () => navigate(ROUTES.SERVER_ERROR),
    },

    // Actions Group
    {
      id: 'act-logs',
      group: 'actions',
      label: 'Open Live System Logs',
      description: 'Stream NestJS backend server API events & database queries',
      icon: Terminal,
      action: () => onOpenLogs?.(),
      badge: 'Live',
    },
    {
      id: 'act-export-logs',
      group: 'actions',
      label: 'Export System Log File',
      description: 'Download .log file of recent audit records',
      icon: Terminal,
      action: () => logStreamService.exportLogs(),
    },
    {
      id: 'act-toggle-theme',
      group: 'actions',
      label: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      description: 'Toggle visual appearance theme mode',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'act-toggle-contrast',
      group: 'actions',
      label: highContrast ? 'Disable High Contrast Mode' : 'Enable High Contrast Mode',
      description: 'Toggle accessibility high visibility mode',
      icon: Eye,
      action: () => setHighContrast(!highContrast),
    },

    // Accent Colors Group
    ...Object.values(ACCENT_COLORS).map((acc) => ({
      id: `acc-${acc.name}`,
      group: 'accents' as const,
      label: `Accent Color: ${acc.label}`,
      description: `Apply ${acc.label} brand theme palette`,
      icon: Palette,
      action: () => setAccent(acc.name as AccentColor),
      badge: accent === acc.name ? 'Active' : undefined,
    })),

    // Languages Group
    ...SUPPORTED_LANGUAGES.map((lang) => ({
      id: `lang-${lang.code}`,
      group: 'languages' as const,
      label: `Language: ${lang.label} (${lang.flag})`,
      description: `Switch display language to ${lang.label}`,
      icon: Globe,
      action: () => void i18n.changeLanguage(lang.code),
      badge: i18n.language.startsWith(lang.code) ? 'Active' : undefined,
    })),
  ];

  const filteredItems = items.filter((item) => {
    const q = query.trim().toLowerCase();
    return (
      !q ||
      item.label.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (item: CommandItem) => {
    onClose();
    item.action();
  };

  const handleKeyDownDialog = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length),
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        handleSelect(selected);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-text/30 backdrop-blur-xs animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Dialog Panel */}
      <div
        role="dialog"
        aria-label="Command Palette"
        onKeyDown={handleKeyDownDialog}
        className="fixed left-1/2 top-20 z-50 w-full max-w-xl -translate-x-1/2 rounded-md border border-border bg-surface p-0 shadow-none animate-in zoom-in-95 fade-in-0 duration-200"
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="size-5 shrink-0 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search (e.g. Dashboard, Dark mode, Indigo, Spanish)..."
            className="w-full bg-transparent text-sm font-medium text-text placeholder:text-muted focus:outline-none"
            autoFocus
          />
          <kbd className="rounded-md border border-border bg-surface-hover px-2 py-0.5 font-mono text-[10px] font-semibold text-muted">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted">No commands or pages found.</div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-xs transition-colors duration-150',
                    isSelected
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'text-text hover:bg-surface-hover',
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Icon
                      className={cn(
                        'size-4 shrink-0',
                        isSelected ? 'text-primary-foreground' : 'text-muted',
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{item.label}</div>
                      {item.description && (
                        <div
                          className={cn(
                            'truncate text-[11px]',
                            isSelected ? 'text-primary-foreground/80' : 'text-muted',
                          )}
                        >
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        'ml-2 shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase',
                        isSelected
                          ? 'border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground'
                          : 'border-border bg-surface-hover text-muted',
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-border bg-surface-hover px-4 py-2 text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-bold">
                ↑↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-bold">
                ↵
              </kbd>{' '}
              Select
            </span>
          </div>
          <span>
            Shortcut:{' '}
            <kbd className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-bold">
              Ctrl+K
            </kbd>
          </span>
        </div>
      </div>
    </>
  );
}
