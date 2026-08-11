export const STORAGE_KEYS = {
  THEME: 'app.theme',
  ACCENT_COLOR: 'app.accent_color',
  HIGH_CONTRAST: 'app.high_contrast',
  BORDER_WIDTH: 'app.border_width',
  SIDEBAR_COLLAPSED: 'app.sidebar_collapsed',
  DASHBOARD_LAYOUT: 'app.dashboard_layout',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
