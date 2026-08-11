import { Check } from 'lucide-react';

import { ACCENT_COLORS } from '@/constants/accent';
import { useTheme } from '@/hooks/useTheme';
import type { AccentColor } from '@/types/common';
import { cn } from '@/utils/cn';

export function AccentPicker() {
  const { accent, setAccent } = useTheme();

  const accentOptions = Object.values(ACCENT_COLORS);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {accentOptions.map((item) => {
        const isSelected = accent === item.name;
        return (
          <button
            key={item.name}
            type="button"
            onClick={() => setAccent(item.name as AccentColor)}
            className={cn(
              'flex items-center gap-3 rounded-md border p-3 text-left transition-colors duration-200',
              isSelected
                ? 'border-primary bg-primary/10 font-semibold text-text'
                : 'border-border bg-surface hover:bg-surface-hover text-muted hover:text-text',
            )}
          >
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: item.color }}
            >
              {isSelected && <Check className="size-3.5" />}
            </span>
            <span className="truncate text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
