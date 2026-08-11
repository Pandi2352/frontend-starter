import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { ACCENT_COLORS, DEFAULT_ACCENT } from '@/constants/accent';
import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/services/storage';
import type { AccentColor, BorderWidth, Theme } from '@/types/common';

import { ThemeContext } from './theme-context';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

function applyTheme(resolved: 'light' | 'dark'): void {
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

function applyAccent(accentKey: AccentColor, resolvedTheme: 'light' | 'dark'): void {
  const config = ACCENT_COLORS[accentKey] ?? ACCENT_COLORS[DEFAULT_ACCENT];
  const values = resolvedTheme === 'dark' ? config.dark : config.light;
  const root = document.documentElement;

  root.style.setProperty('--primary', values.primary);
  root.style.setProperty('--primary-hover', values.primaryHover);
  root.style.setProperty('--ring', values.ring);

  root.style.setProperty('--color-primary', values.primary);
  root.style.setProperty('--color-primary-hover', values.primaryHover);
  root.style.setProperty('--color-ring', values.ring);
}

function applyHighContrast(enabled: boolean): void {
  document.documentElement.classList.toggle('high-contrast', enabled);
}

function applyBorderWidth(width: BorderWidth): void {
  const root = document.documentElement;
  root.classList.remove('border-width-thin', 'border-width-medium', 'border-width-thick');
  root.classList.add(`border-width-${width}`);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(
    () => storage.get<Theme>(STORAGE_KEYS.THEME) ?? 'system',
  );

  const [accent, setAccentState] = useState<AccentColor>(
    () => storage.get<AccentColor>(STORAGE_KEYS.ACCENT_COLOR) ?? DEFAULT_ACCENT,
  );

  const [highContrast, setHighContrastState] = useState<boolean>(
    () => storage.get<boolean>(STORAGE_KEYS.HIGH_CONTRAST) ?? false,
  );

  const [borderWidth, setBorderWidthState] = useState<BorderWidth>(
    () => storage.get<BorderWidth>(STORAGE_KEYS.BORDER_WIDTH) ?? 'thin',
  );

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

  useEffect(() => {
    applyTheme(resolvedTheme);
    applyAccent(accent, resolvedTheme);
    applyHighContrast(highContrast);
    applyBorderWidth(borderWidth);
  }, [resolvedTheme, accent, highContrast, borderWidth]);

  // Follow OS theme changes while in "system" mode
  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      const sysTheme = getSystemTheme();
      applyTheme(sysTheme);
      applyAccent(accent, sysTheme);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme, accent]);

  const setTheme = useCallback((next: Theme) => {
    storage.set(STORAGE_KEYS.THEME, next);
    setThemeState(next);
  }, []);

  const setAccent = useCallback((next: AccentColor) => {
    storage.set(STORAGE_KEYS.ACCENT_COLOR, next);
    setAccentState(next);
  }, []);

  const setHighContrast = useCallback((next: boolean) => {
    storage.set(STORAGE_KEYS.HIGH_CONTRAST, next);
    setHighContrastState(next);
  }, []);

  const setBorderWidth = useCallback((next: BorderWidth) => {
    storage.set(STORAGE_KEYS.BORDER_WIDTH, next);
    setBorderWidthState(next);
  }, []);

  const accentConfig = ACCENT_COLORS[accent] ?? ACCENT_COLORS[DEFAULT_ACCENT];

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      accent,
      setAccent,
      accentConfig,
      highContrast,
      setHighContrast,
      borderWidth,
      setBorderWidth,
    }),
    [
      theme,
      resolvedTheme,
      setTheme,
      accent,
      setAccent,
      accentConfig,
      highContrast,
      setHighContrast,
      borderWidth,
      setBorderWidth,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
