import { Check, LayoutGrid, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';

import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/services/storage';
import { cn } from '@/utils/cn';

import { type DashboardLayoutState, DEFAULT_DASHBOARD_LAYOUT } from '../types/layout';

export interface DashboardCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  layout: DashboardLayoutState;
  onUpdateLayout: (nextLayout: DashboardLayoutState) => void;
}

const widgetOptions: Array<{ key: keyof DashboardLayoutState; label: string; desc: string }> = [
  {
    key: 'showMetrics',
    label: 'Summary Metric Cards',
    desc: 'Revenue, Total Users, Orders, System Growth stats',
  },
  {
    key: 'showRevenueArea',
    label: 'Revenue & Cost Stream (Area Chart)',
    desc: 'Monthly income vs expenditure curves',
  },
  {
    key: 'showOrdersBar',
    label: 'Order Fulfillment (Bar Chart)',
    desc: 'Processed orders and customer acquisition bars',
  },
  {
    key: 'showCategoryDonut',
    label: 'Category Sales Breakdown (Donut Chart)',
    desc: 'Proportional product line revenue',
  },
  {
    key: 'showSystemRadar',
    label: 'System SLA Audit (Radar Chart)',
    desc: 'Uptime, Speed, Security, Storage metrics',
  },
  {
    key: 'showTrafficLine',
    label: 'Weekly Traffic & Sessions (Line Chart)',
    desc: 'Daily active user traffic trends',
  },
];

export function DashboardCustomizerModal({
  isOpen,
  onClose,
  layout,
  onUpdateLayout,
}: DashboardCustomizerModalProps) {
  const [draft, setDraft] = useState<DashboardLayoutState>(layout);

  if (!isOpen) return null;

  const handleToggle = (key: keyof DashboardLayoutState) => {
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    storage.set(STORAGE_KEYS.DASHBOARD_LAYOUT, draft);
    onUpdateLayout(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft(DEFAULT_DASHBOARD_LAYOUT);
    storage.set(STORAGE_KEYS.DASHBOARD_LAYOUT, DEFAULT_DASHBOARD_LAYOUT);
    onUpdateLayout(DEFAULT_DASHBOARD_LAYOUT);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-text/20 backdrop-blur-xs animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-label="Customize Dashboard Layout"
        className="fixed left-1/2 top-20 z-50 w-full max-w-lg -translate-x-1/2 rounded-md border border-border bg-surface p-5 shadow-none animate-in zoom-in-95 fade-in-0 duration-200"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="size-5 text-primary" />
            <h2 className="text-base font-bold text-text">Customize Dashboard Layout</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border p-1 text-muted transition-colors hover:bg-surface-hover hover:text-text"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-2 text-xs text-muted">
          Select which metrics and chart cards you want displayed on your dashboard.
        </p>

        <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
          {widgetOptions.map((opt) => {
            const isEnabled = draft[opt.key];
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleToggle(opt.key)}
                className={cn(
                  'flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors duration-200',
                  isEnabled
                    ? 'border-primary bg-primary/10 text-text'
                    : 'border-border bg-surface text-muted hover:bg-surface-hover',
                )}
              >
                <div>
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[11px] text-muted">{opt.desc}</div>
                </div>

                <div
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-md border text-xs transition-colors',
                    isEnabled
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-surface text-transparent',
                  )}
                >
                  <Check className="size-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-text"
          >
            <RotateCcw className="size-3.5" />
            Reset Default
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface-hover"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Apply Layout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
