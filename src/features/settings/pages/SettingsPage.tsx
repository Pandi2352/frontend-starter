import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/layout/navbar/LanguageSwitcher';
import { ThemeToggle } from '@/components/layout/navbar/ThemeToggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';

import { AccentPicker } from '../components/AccentPicker';
import { AccessibilitySettings } from '../components/AccessibilitySettings';

export function SettingsPage() {
  const { t } = useTranslation();
  const { accentConfig } = useTheme();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text">{t('settings.title')}</h1>
        <p className="text-sm text-muted">{t('settings.subtitle')}</p>
      </div>

      {/* Theme Appearance Mode */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.appearance')}</CardTitle>
          <CardDescription>{t('settings.appearanceDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-sm text-muted">
            {t('common.theme')}: {t('settings.appearanceDesc')}
          </span>
        </CardContent>
      </Card>

      {/* Accent Color Palette Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Accent Color Palette</CardTitle>
          <CardDescription>
            Customize your primary brand color scheme. Active accent:{' '}
            <span className="font-semibold text-primary">{accentConfig.label}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccentPicker />
        </CardContent>
      </Card>

      {/* High Contrast & Border Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility &amp; Borders</CardTitle>
          <CardDescription>
            Configure visual contrast modes and border outline styles across all components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccessibilitySettings />
        </CardContent>
      </Card>

      {/* Language & Region Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.language')}</CardTitle>
          <CardDescription>{t('settings.languageDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <LanguageSwitcher />
          <span className="text-sm text-muted">{t('common.language')}</span>
        </CardContent>
      </Card>
    </div>
  );
}
