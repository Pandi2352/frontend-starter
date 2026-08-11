import { Bell } from 'lucide-react';

interface NotificationProps {
  count?: number;
  onClick?: () => void;
}

export function Notification({ count = 0, onClick }: NotificationProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count > 0 ? `Notifications (${count} unread)` : 'Notifications'}
      className="relative rounded-md border border-border p-2 text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text"
    >
      <Bell aria-hidden className="size-4" />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-md bg-danger text-[10px] font-semibold text-danger-foreground"
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}
