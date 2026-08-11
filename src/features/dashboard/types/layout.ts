export interface DashboardLayoutState {
  showMetrics: boolean;
  showRevenueArea: boolean;
  showOrdersBar: boolean;
  showCategoryDonut: boolean;
  showSystemRadar: boolean;
  showTrafficLine: boolean;
}

export const DEFAULT_DASHBOARD_LAYOUT: DashboardLayoutState = {
  showMetrics: true,
  showRevenueArea: true,
  showOrdersBar: true,
  showCategoryDonut: true,
  showSystemRadar: true,
  showTrafficLine: true,
};
