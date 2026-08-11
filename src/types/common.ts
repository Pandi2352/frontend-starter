import type { LucideIcon } from 'lucide-react';

export type Theme = 'light' | 'dark' | 'system';
export type AccentColor = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan';
export type BorderWidth = 'thin' | 'medium' | 'thick';

export interface NavItem {
  label: string;
  translationKey?: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
  /** Secondary line shown under the label while the item is active */
  description?: string;
  children?: NavItem[];
}

export interface NavGroup {
  title?: string;
  translationKey?: string;
  items: NavItem[];
}

export interface SelectOption<T extends string = string> {
  label: string;
  value: T;
}
