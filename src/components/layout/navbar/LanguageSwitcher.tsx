import { Check, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@/components/ui/tooltip';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import { cn } from '@/utils/cn';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    SUPPORTED_LANGUAGES.find((lang) => i18n.language.startsWith(lang.code)) ??
    SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <Tooltip content={`Language: ${currentLang.label}`} side="bottom">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`Select language. Current: ${currentLang.label}`}
          className="flex items-center gap-1.5 rounded-md border border-border p-2 text-sm text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text"
        >
          <Globe aria-hidden className="size-4 shrink-0" />
          <span className="hidden text-xs font-semibold sm:block uppercase">
            {currentLang.code}
          </span>
        </button>
      </Tooltip>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-md border border-border bg-surface py-1 text-text">
          <div className="border-b border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Select Language
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLang.code === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={cn(
                  'flex w-full items-center justify-between px-3 py-2 text-xs font-medium transition-colors hover:bg-surface-hover',
                  isSelected && 'bg-primary/10 text-primary font-semibold',
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {isSelected && <Check className="size-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
