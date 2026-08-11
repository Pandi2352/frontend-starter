import {
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  Info,
  ShieldAlert,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'system' | 'orders' | 'security';
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'High Order Volume Alert',
    message: '125 new orders processed in the last 60 minutes.',
    time: '5m ago',
    read: false,
    type: 'orders',
  },
  {
    id: 'n2',
    title: 'System Security Verification',
    message: 'Admin session authenticated from IP 127.0.0.1.',
    time: '25m ago',
    read: false,
    type: 'security',
  },
  {
    id: 'n3',
    title: 'Automated Database Backup Completed',
    message: 'Daily PostgreSQL snapshot stored safely in cloud backup bucket.',
    time: '1h ago',
    read: false,
    type: 'system',
  },
  {
    id: 'n4',
    title: 'Scheduled System Maintenance Completed',
    message: 'All API server clusters updated to version 2.4.0.',
    time: '3h ago',
    read: true,
    type: 'system',
  },
];

export interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUnreadCount?: (count: number) => void;
}

export function NotificationDrawer({
  isOpen,
  onClose,
  onUpdateUnreadCount,
}: NotificationDrawerProps) {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'orders'>('all');

  if (!isOpen) return null;

  const unreadCount = items.filter((i) => !i.read).length;

  const handleMarkAllRead = () => {
    const updated = items.map((i) => ({ ...i, read: true }));
    setItems(updated);
    onUpdateUnreadCount?.(0);
  };

  const handleToggleRead = (id: string) => {
    const updated = items.map((i) => (i.id === id ? { ...i, read: !i.read } : i));
    setItems(updated);
    onUpdateUnreadCount?.(updated.filter((i) => !i.read).length);
  };

  const handleClearAll = () => {
    setItems([]);
    onUpdateUnreadCount?.(0);
  };

  const filtered = items.filter((item) => {
    if (filter === 'unread') return !item.read;
    if (filter === 'system') return item.type === 'system' || item.type === 'security';
    if (filter === 'orders') return item.type === 'orders';
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'orders':
        return <ShoppingBag className="size-4 text-primary" />;
      case 'security':
        return <ShieldAlert className="size-4 text-warning" />;
      default:
        return <Info className="size-4 text-success" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-text/20 backdrop-blur-xs animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-none animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-primary" />
            <h2 className="text-base font-bold text-text">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="danger" className="px-2 py-0.5 text-[10px]">
                {unreadCount} New
              </Badge>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
            className="rounded-md border border-border p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-text"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex items-center justify-between border-b border-border bg-surface-hover/50 px-4 py-2 text-xs">
          <div className="flex items-center gap-1">
            {(['all', 'unread', 'system', 'orders'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={cn(
                  'rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors',
                  filter === tab
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-muted hover:bg-surface-hover',
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleMarkAllRead}
              title="Mark all as read"
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text hover:bg-surface-hover"
            >
              <CheckCheck className="size-3" />
              <span>Read</span>
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              title="Clear all notifications"
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-medium text-danger hover:bg-danger-soft"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2 text-center text-muted">
              <AlertTriangle className="size-6" />
              <p className="text-xs font-medium">No notifications in this category.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-start gap-3 rounded-md border p-3 text-xs transition-colors',
                  item.read
                    ? 'border-border bg-surface text-muted'
                    : 'border-primary/40 bg-primary/5 text-text font-medium',
                )}
              >
                <div className="mt-0.5 shrink-0">{getIcon(item.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-text truncate">{item.title}</span>
                    <span className="text-[10px] text-muted shrink-0">{item.time}</span>
                  </div>
                  <p className="mt-1 text-muted leading-relaxed">{item.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleRead(item.id)}
                  className="shrink-0 p-1 text-muted hover:text-text"
                  title={item.read ? 'Mark as unread' : 'Mark as read'}
                >
                  <Check className={cn('size-3.5', item.read ? 'text-muted' : 'text-primary')} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
