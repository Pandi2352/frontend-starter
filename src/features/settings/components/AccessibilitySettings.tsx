import { Eye, Layers } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import type { BorderWidth } from '@/types/common';
import { cn } from '@/utils/cn';

const borderWidthOptions: Array<{ id: BorderWidth; label: string; desc: string }> = [
  { id: 'thin', label: 'Thin (1px)', desc: 'Default subtle border lines' },
  { id: 'medium', label: 'Medium (2px)', desc: 'Defined border lines for high visibility' },
  { id: 'thick', label: 'Thick (3px)', desc: 'Prominent high-contrast outlines' },
];

export function AccessibilitySettings() {
  const { highContrast, setHighContrast, borderWidth, setBorderWidth } = useTheme();

  return (
    <div className="space-y-6">
      {/* High Contrast Toggle Row */}
      <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-surface p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md border border-border bg-surface-hover text-text">
            <Eye className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">High Contrast Mode</h3>
            <p className="text-xs text-muted">
              Enhance contrast ratios for text, borders, and focused elements.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setHighContrast(!highContrast)}
          className={cn(
            'inline-flex h-9 items-center justify-center rounded-md px-4 text-xs font-semibold transition-colors duration-200',
            highContrast
              ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
              : 'border border-border bg-surface text-text hover:bg-surface-hover',
          )}
        >
          {highContrast ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      {/* Border Width Selector */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-muted" />
          <h3 className="text-sm font-semibold text-text">Border Thickness</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {borderWidthOptions.map((opt) => {
            const isSelected = borderWidth === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBorderWidth(opt.id)}
                className={cn(
                  'flex flex-col items-start gap-1 rounded-md border p-3.5 text-left transition-colors duration-200',
                  isSelected
                    ? 'border-primary bg-primary/10 font-semibold text-text'
                    : 'border-border bg-surface hover:bg-surface-hover text-muted hover:text-text',
                )}
              >
                <span className="text-xs font-bold text-text">{opt.label}</span>
                <span className="text-[11px] text-muted">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
