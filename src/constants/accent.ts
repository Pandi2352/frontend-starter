import type { AccentColor } from '@/types/common';

export interface AccentConfig {
  name: AccentColor;
  label: string;
  color: string;
  light: {
    primary: string;
    primaryHover: string;
    ring: string;
  };
  dark: {
    primary: string;
    primaryHover: string;
    ring: string;
  };
}

export const ACCENT_COLORS: Record<AccentColor, AccentConfig> = {
  indigo: {
    name: 'indigo',
    label: 'Indigo',
    color: '#4f46e5',
    light: { primary: '#4f46e5', primaryHover: '#4338ca', ring: '#6366f1' },
    dark: { primary: '#6366f1', primaryHover: '#818cf8', ring: '#818cf8' },
  },
  emerald: {
    name: 'emerald',
    label: 'Emerald',
    color: '#059669',
    light: { primary: '#059669', primaryHover: '#047857', ring: '#10b981' },
    dark: { primary: '#10b981', primaryHover: '#34d399', ring: '#34d399' },
  },
  violet: {
    name: 'violet',
    label: 'Violet',
    color: '#7c3aed',
    light: { primary: '#7c3aed', primaryHover: '#6d28d9', ring: '#8b5cf6' },
    dark: { primary: '#8b5cf6', primaryHover: '#a78bfa', ring: '#a78bfa' },
  },
  amber: {
    name: 'amber',
    label: 'Amber',
    color: '#d97706',
    light: { primary: '#d97706', primaryHover: '#b45309', ring: '#f59e0b' },
    dark: { primary: '#f59e0b', primaryHover: '#fbbf24', ring: '#fbbf24' },
  },
  rose: {
    name: 'rose',
    label: 'Rose',
    color: '#e11d48',
    light: { primary: '#e11d48', primaryHover: '#be123c', ring: '#f43f5e' },
    dark: { primary: '#f43f5e', primaryHover: '#fb7185', ring: '#fb7185' },
  },
  cyan: {
    name: 'cyan',
    label: 'Cyan',
    color: '#0891b2',
    light: { primary: '#0891b2', primaryHover: '#0e7490', ring: '#06b6d4' },
    dark: { primary: '#06b6d4', primaryHover: '#22d3ee', ring: '#22d3ee' },
  },
};

export const DEFAULT_ACCENT: AccentColor = 'indigo';
