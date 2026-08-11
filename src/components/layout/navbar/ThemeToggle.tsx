import { Monitor, Moon, Sun } from 'lucide-react';

import { Tooltip } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';
import type { Theme } from '@/types/common';

const nextTheme: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

const themeLabels: Record<Theme, string> = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System preference',
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const icon =
    theme === 'light' ? (
      <Sun aria-hidden className="size-4" />
    ) : theme === 'dark' ? (
      <Moon aria-hidden className="size-4" />
    ) : (
      <Monitor aria-hidden className="size-4" />
    );

  return (
    <Tooltip content={`Theme: ${themeLabels[theme] ?? theme}`} side="bottom">
      <button
        type="button"
        onClick={() => setTheme(nextTheme[theme])}
        aria-label={`Theme: ${theme}. Click to change.`}
        className="rounded-md border border-border p-2 text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text"
      >
        {icon}
      </button>
    </Tooltip>
  );
}
