import { createContext } from 'react';

import type { AccentConfig } from '@/constants/accent';
import type { AccentColor, BorderWidth, Theme } from '@/types/common';

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentConfig: AccentConfig;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  borderWidth: BorderWidth;
  setBorderWidth: (width: BorderWidth) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
