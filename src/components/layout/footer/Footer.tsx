import { appConfig } from '@/config/app';

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-4 sm:px-6">
      <p className="text-xs text-muted">
        © {new Date().getFullYear()} {appConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
