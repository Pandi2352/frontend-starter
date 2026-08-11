import {
  AlertOctagon,
  Boxes,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Tags,
  TrendingUp,
  Users,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import type { NavGroup } from '@/types/common';

export const navGroups: NavGroup[] = [
  {
    title: 'General',
    translationKey: 'nav.general',
    items: [
      {
        label: 'Dashboard',
        translationKey: 'nav.dashboard',
        path: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        label: 'Users',
        translationKey: 'nav.users',
        path: ROUTES.USERS,
        icon: Users,
      },
    ],
  },
  {
    title: 'Management',
    translationKey: 'nav.management',
    items: [
      {
        label: 'Products',
        translationKey: 'nav.products',
        path: ROUTES.PRODUCTS,
        icon: Package,
        children: [
          {
            label: 'All Products',
            translationKey: 'nav.allProducts',
            path: ROUTES.PRODUCTS,
            icon: Boxes,
          },
          {
            label: 'Categories',
            translationKey: 'nav.categories',
            path: ROUTES.PRODUCT_CATEGORIES,
            icon: Tags,
          },
        ],
      },
      {
        label: 'Orders',
        translationKey: 'nav.orders',
        path: ROUTES.ORDERS,
        icon: ShoppingCart,
        badge: '12',
      },
      {
        label: 'Invoices',
        translationKey: 'nav.invoices',
        path: ROUTES.INVOICES,
        icon: Receipt,
      },
    ],
  },
  {
    title: 'Insights',
    translationKey: 'nav.insights',
    items: [
      {
        label: 'Analytics',
        translationKey: 'nav.analytics',
        path: ROUTES.ANALYTICS,
        icon: TrendingUp,
      },
      {
        label: 'Reports',
        translationKey: 'nav.reports',
        path: ROUTES.REPORTS,
        icon: FileText,
        badge: 'New',
      },
    ],
  },
  {
    title: 'System',
    translationKey: 'nav.system',
    items: [
      {
        label: 'Error Pages',
        translationKey: 'nav.errorPages',
        path: ROUTES.ERRORS,
        icon: AlertOctagon,
      },
      {
        label: 'Settings',
        translationKey: 'nav.settings',
        path: ROUTES.SETTINGS,
        icon: Settings,
      },
      {
        label: 'Help',
        translationKey: 'nav.help',
        path: ROUTES.HELP,
        icon: LifeBuoy,
      },
    ],
  },
];
