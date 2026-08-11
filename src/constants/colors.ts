/**
 * Programmatic color references — always point at the CSS design tokens,
 * never at raw hex values. Useful for charts/canvas where CSS classes
 * cannot be used.
 */
export const COLOR_TOKENS = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
  background: 'var(--background)',
  surface: 'var(--surface)',
  border: 'var(--border)',
  text: 'var(--text)',
  muted: 'var(--muted)',
} as const;

/**
 * Categorical chart palette (tokens defined in styles/theme.css, light + dark).
 * The slot ORDER is the colorblind-safety mechanism — assign series in this
 * fixed order, never cycle or re-sort. Past 6 series, fold into "Other".
 */
export const CHART_PALETTE: readonly string[] = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
];
