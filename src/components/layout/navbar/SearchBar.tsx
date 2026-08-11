import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface SearchBarProps {
  onOpenCommandPalette?: () => void;
}

export function SearchBar({ onOpenCommandPalette }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onOpenCommandPalette}
      className="relative hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text sm:flex"
    >
      <Search aria-hidden className="size-4 text-muted" />
      <span className="font-medium">{t('common.search')}</span>
      <kbd className="ml-4 rounded-md border border-border bg-surface-hover px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted">
        Ctrl+K
      </kbd>
    </button>
  );
}
