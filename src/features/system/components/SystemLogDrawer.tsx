import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  Pause,
  Play,
  Search,
  Terminal,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';

import { logStreamService } from '../services/logStreamService';
import type { LogEntry, LogLevel } from '../types/log';

export interface SystemLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterLevel = 'ALL' | LogLevel;

export function SystemLogDrawer({ isOpen, onClose }: SystemLogDrawerProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(() => logStreamService.getIsPaused());
  const [activeLevel, setActiveLevel] = useState<FilterLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = logStreamService.subscribe((newLogs) => {
      setLogs(newLogs);
    });

    return () => {
      unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTogglePause = () => {
    const paused = logStreamService.togglePause();
    setIsPaused(paused);
  };

  const handleClear = () => {
    logStreamService.clear();
  };

  const handleExport = () => {
    logStreamService.exportLogs();
  };

  const handleCopy = () => {
    const text = filteredLogs
      .map((l) => `[${l.timestamp}] [${l.level}] [${l.service}] ${l.message}`)
      .join('\n');
    void navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = activeLevel === 'ALL' || log.level === activeLevel;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      log.message.toLowerCase().includes(q) ||
      log.service.toLowerCase().includes(q) ||
      log.timestamp.includes(q);
    return matchesLevel && matchesQuery;
  });

  const levelBadgeStyle = (level: LogLevel) => {
    switch (level) {
      case 'INFO':
        return 'bg-success/15 text-success border-success/30';
      case 'WARN':
        return 'bg-warning/15 text-warning border-warning/30';
      case 'ERROR':
        return 'bg-danger/15 text-danger border-danger/30';
      case 'DEBUG':
        return 'bg-primary/15 text-primary border-primary/30';
      default:
        return 'bg-surface-hover text-muted border-border';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-text/30 backdrop-blur-xs animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-border bg-surface shadow-none animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-md border border-border bg-surface-hover text-primary">
              <Terminal className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-text">System Event &amp; Server Logs</h2>
                <Badge
                  variant={isPaused ? 'warning' : 'success'}
                  className="gap-1 px-2 py-0.5 text-[10px]"
                >
                  <span
                    className={cn(
                      'size-1.5 rounded-full',
                      isPaused ? 'bg-warning' : 'bg-success animate-pulse',
                    )}
                  />
                  {isPaused ? 'PAUSED' : 'LIVE STREAM'}
                </Badge>
              </div>
              <p className="text-xs text-muted">
                Real-time NestJS server API requests and system audit logs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close log drawer"
            className="rounded-md border border-border p-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-text"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-col gap-3 border-b border-border bg-surface-hover/50 p-4">
          {/* Level Filter Pills & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {(['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'] as FilterLevel[]).map((lvl) => {
                const isSelected = activeLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setActiveLevel(lvl)}
                    className={cn(
                      'rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors duration-200',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-surface text-muted hover:bg-surface-hover hover:text-text',
                    )}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleTogglePause}
                title={isPaused ? 'Resume live stream' : 'Pause live stream'}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text transition-colors hover:bg-surface-hover"
              >
                {isPaused ? (
                  <Play className="size-3.5 text-success" />
                ) : (
                  <Pause className="size-3.5 text-warning" />
                )}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                title="Copy filtered logs"
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text transition-colors hover:bg-surface-hover"
              >
                {isCopied ? (
                  <Check className="size-3.5 text-success" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleExport}
                title="Export .log file"
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text transition-colors hover:bg-surface-hover"
              >
                <Download className="size-3.5" />
                <span>Export</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                title="Clear current log buffer"
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-danger transition-colors hover:bg-danger-soft"
              >
                <Trash2 className="size-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Search Filter Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search log messages, services, timestamps..."
              className="w-full rounded-md border border-border bg-surface pl-9 pr-3 py-1.5 text-xs text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Terminal Console View */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#090d16] font-mono text-xs text-[#e2e8f0] space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2 text-muted">
              <AlertTriangle className="size-6 text-muted" />
              <p>No log records match the selected filter.</p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedId === log.id;
              return (
                <div
                  key={log.id}
                  className="rounded-md border border-[#1e293b] bg-[#0f172a] p-2.5 transition-colors hover:border-[#334155]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-[#64748b]">{log.timestamp}</span>
                      <span
                        className={cn(
                          'rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase',
                          levelBadgeStyle(log.level),
                        )}
                      >
                        {log.level}
                      </span>
                      <span className="rounded-md border border-[#334155] bg-[#1e293b] px-1.5 py-0.5 text-[10px] text-[#94a3b8]">
                        {log.service}
                      </span>
                      <span className="text-xs text-[#f1f5f9] break-all">{log.message}</span>
                    </div>

                    {log.details && (
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : log.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-[#334155] bg-[#1e293b] px-1.5 py-0.5 text-[10px] text-[#94a3b8] hover:text-[#f1f5f9]"
                      >
                        {isExpanded ? (
                          <ChevronDown className="size-3" />
                        ) : (
                          <ChevronRight className="size-3" />
                        )}
                        <span>JSON</span>
                      </button>
                    )}
                  </div>

                  {isExpanded && log.details && (
                    <pre className="mt-2 overflow-x-auto rounded-md border border-[#1e293b] bg-[#020617] p-2 text-[11px] text-[#38bdf8]">
                      {typeof log.details === 'string'
                        ? log.details
                        : JSON.stringify(log.details, null, 2)}
                    </pre>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
