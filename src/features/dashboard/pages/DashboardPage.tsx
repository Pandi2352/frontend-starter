import {
  Activity,
  ArrowUpRight,
  LayoutGrid,
  ShieldCheck,
  ShoppingBag,
  Users,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AreaChart, BarChart, DonutChart, LineChart, RadarChart } from '@/components/charts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/services/storage';
import { formatCurrency, formatNumber } from '@/utils/format';

import { DashboardCustomizerModal } from '../components/DashboardCustomizerModal';
import { type DashboardLayoutState, DEFAULT_DASHBOARD_LAYOUT } from '../types/layout';

// --- Demo Chart Data ---
const revenueData = [
  { month: 'Jan', revenue: 24000, cost: 14000 },
  { month: 'Feb', revenue: 31000, cost: 18000 },
  { month: 'Mar', revenue: 28000, cost: 16000 },
  { month: 'Apr', revenue: 42000, cost: 22000 },
  { month: 'May', revenue: 39000, cost: 20000 },
  { month: 'Jun', revenue: 54000, cost: 26000 },
  { month: 'Jul', revenue: 62000, cost: 30000 },
  { month: 'Aug', revenue: 58000, cost: 28000 },
];

const ordersData = [
  { month: 'Jan', orders: 420, customers: 310 },
  { month: 'Feb', orders: 580, customers: 430 },
  { month: 'Mar', orders: 510, customers: 390 },
  { month: 'Apr', orders: 790, customers: 610 },
  { month: 'May', orders: 840, customers: 670 },
  { month: 'Jun', orders: 980, customers: 780 },
  { month: 'Jul', orders: 1250, customers: 940 },
];

const categorySales = [
  { name: 'Electronics', value: 45000, color: '#4f46e5' },
  { name: 'Software', value: 32000, color: '#059669' },
  { name: 'Services', value: 21000, color: '#7c3aed' },
  { name: 'Hardware', value: 16000, color: '#d97706' },
  { name: 'Accessories', value: 12000, color: '#0891b2' },
];

const systemRadarData = [
  { subject: 'Uptime', current: 99, target: 100 },
  { subject: 'Speed', current: 92, target: 95 },
  { subject: 'Security', current: 98, target: 100 },
  { subject: 'Storage', current: 75, target: 90 },
  { subject: 'API Health', current: 95, target: 98 },
  { subject: 'Reliability', current: 96, target: 99 },
];

const trafficTrendData = [
  { day: 'Mon', active: 1400, sessions: 2200 },
  { day: 'Tue', active: 1800, sessions: 2900 },
  { day: 'Wed', active: 2200, sessions: 3400 },
  { day: 'Thu', active: 2600, sessions: 4100 },
  { day: 'Fri', active: 3100, sessions: 4800 },
  { day: 'Sat', active: 2400, sessions: 3600 },
  { day: 'Sun', active: 2900, sessions: 4300 },
];

export function DashboardPage() {
  const { t } = useTranslation();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [layout, setLayout] = useState<DashboardLayoutState>(
    () =>
      storage.get<DashboardLayoutState>(STORAGE_KEYS.DASHBOARD_LAYOUT) ?? DEFAULT_DASHBOARD_LAYOUT,
  );

  const stats = [
    {
      label: t('dashboard.revenue'),
      value: formatCurrency(62000),
      subtext: 'vs last month',
      icon: Wallet,
      trend: '+14.2%',
    },
    {
      label: t('dashboard.totalUsers'),
      value: formatNumber(3100),
      subtext: 'active accounts',
      icon: Users,
      trend: '+11.8%',
    },
    {
      label: 'Total Orders',
      value: formatNumber(1250),
      subtext: 'processed items',
      icon: ShoppingBag,
      trend: '+8.4%',
    },
    {
      label: t('dashboard.growth'),
      value: '99.9%',
      subtext: 'system health',
      icon: ShieldCheck,
      trend: '+0.5%',
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Header Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">{t('dashboard.title')}</h1>
          <p className="text-sm text-muted">
            Real-time analytics overview and operational performance metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCustomizerOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-surface-hover"
          >
            <LayoutGrid className="size-3.5 text-primary" />
            Customize Widgets
          </button>
          <Badge variant="default" className="gap-1 px-3 py-1 text-xs">
            <Activity className="size-3.5 text-success" />
            Live System Stream
          </Badge>
        </div>
      </div>

      {/* Top Key Metric Cards */}
      {layout.showMetrics && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="transition-colors hover:border-primary/50">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-text">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.subtext}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex size-10 items-center justify-center rounded-md border border-border bg-surface-hover text-primary">
                      <Icon className="size-5" />
                    </div>
                    <Badge variant="success" className="gap-0.5 font-bold">
                      <ArrowUpRight className="size-3" />
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Main Revenue Area Chart */}
      {layout.showRevenueArea && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue &amp; Expenditure Growth</CardTitle>
              <CardDescription>
                Monthly revenue streams vs operational expenditures for current fiscal year.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-muted">
                <span className="size-2.5 rounded-full bg-[var(--primary)]" /> Revenue
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-muted">
                <span className="size-2.5 rounded-full bg-[#10b981]" /> Cost
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <AreaChart
              data={revenueData}
              xAxisKey="month"
              series={[
                { dataKey: 'revenue', name: 'Revenue', color: 'var(--primary)' },
                { dataKey: 'cost', name: 'Operational Cost', color: '#10b981' },
              ]}
              height={320}
              valueFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
            />
          </CardContent>
        </Card>
      )}

      {/* Two Column Grid: Bar Chart & Donut Chart */}
      {(layout.showOrdersBar || layout.showCategoryDonut) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Monthly Orders Bar Chart */}
          {layout.showOrdersBar && (
            <Card>
              <CardHeader>
                <CardTitle>Order Fulfillment &amp; New Accounts</CardTitle>
                <CardDescription>
                  Volume of completed orders and new customer acquisitions per month.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <BarChart
                  data={ordersData}
                  xAxisKey="month"
                  series={[
                    { dataKey: 'orders', name: 'Orders Processed', color: 'var(--primary)' },
                    { dataKey: 'customers', name: 'New Customers', color: '#7c3aed' },
                  ]}
                  height={280}
                />
              </CardContent>
            </Card>
          )}

          {/* Category Sales Donut Chart */}
          {layout.showCategoryDonut && (
            <Card>
              <CardHeader>
                <CardTitle>Sales Breakdown by Category</CardTitle>
                <CardDescription>
                  Proportional distribution of total gross revenue across product lines.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <DonutChart
                  data={categorySales}
                  height={280}
                  centerValue="$126k"
                  centerLabel="Total Sales"
                  valueFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Two Column Grid: System Radar Chart & Traffic Line Chart */}
      {(layout.showSystemRadar || layout.showTrafficLine) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* System Health Radar Chart */}
          {layout.showSystemRadar && (
            <Card>
              <CardHeader>
                <CardTitle>System Performance &amp; SLA Audit</CardTitle>
                <CardDescription>
                  Operational health benchmarks vs target performance objectives.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <RadarChart
                  data={systemRadarData}
                  angleKey="subject"
                  series={[
                    { dataKey: 'current', name: 'Current Status', color: 'var(--primary)' },
                    { dataKey: 'target', name: 'Target Objective', color: '#059669' },
                  ]}
                  height={280}
                  valueFormatter={(val) => `${val}%`}
                />
              </CardContent>
            </Card>
          )}

          {/* Traffic & Active Sessions Line Chart */}
          {layout.showTrafficLine && (
            <Card>
              <CardHeader>
                <CardTitle>Weekly User Traffic &amp; Active Sessions</CardTitle>
                <CardDescription>
                  Daily active users and total session volume trends for the past 7 days.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <LineChart
                  data={trafficTrendData}
                  xAxisKey="day"
                  series={[
                    { dataKey: 'active', name: 'Active Users', color: '#0891b2' },
                    { dataKey: 'sessions', name: 'Total Sessions', color: '#d97706' },
                  ]}
                  height={280}
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Widget Layout Customizer Modal */}
      <DashboardCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        layout={layout}
        onUpdateLayout={setLayout}
      />
    </div>
  );
}
