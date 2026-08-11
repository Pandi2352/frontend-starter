import {
  CheckCircle2,
  Clock,
  DollarSign,
  Filter,
  Receipt,
  Search,
  ShoppingBag,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format';

import { InvoiceModal } from '../components/InvoiceModal';
import { MOCK_ORDERS } from '../data/mockOrders';
import type { Order, OrderStatus, PaymentStatus } from '../types/order';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || ord.paymentStatus === paymentFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.customerEmail.toLowerCase().includes(q);
    return matchesStatus && matchesPayment && matchesQuery;
  });

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const completedCount = orders.filter((o) => o.status === 'completed').length;
  const processingCount = orders.filter((o) => o.status === 'processing').length;

  const handleUpdateStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'processing':
        return <Badge variant="default">Processing</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'cancelled':
      case 'refunded':
        return <Badge variant="danger">{status.toUpperCase()}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">PAID</Badge>;
      case 'unpaid':
        return <Badge variant="warning">UNPAID</Badge>;
      case 'refunded':
        return <Badge variant="danger">REFUNDED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Header Banner */}
      <div>
        <h1 className="text-2xl font-bold text-text">Orders &amp; Invoice Management</h1>
        <p className="text-sm text-muted">
          Manage customer transactions, order fulfillments, and download invoices.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Total Orders
              </p>
              <p className="text-2xl font-bold text-text">{orders.length}</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-md border border-border bg-surface-hover text-primary">
              <ShoppingBag className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-text">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-md border border-border bg-surface-hover text-success">
              <DollarSign className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Completed</p>
              <p className="text-2xl font-bold text-text">{completedCount}</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-md border border-border bg-surface-hover text-success">
              <CheckCircle2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Processing
              </p>
              <p className="text-2xl font-bold text-text">{processingCount}</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-md border border-border bg-surface-hover text-warning">
              <Clock className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, customer name, email..."
              className="w-full rounded-md border border-border bg-surface pl-9 pr-3 py-1.5 text-xs text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted">
              <Filter className="size-3.5" />
              <span className="font-medium">Filter:</span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Data Table */}
      <div className="rounded-md border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-hover/50 text-muted font-semibold">
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-center">Items</th>
                <th className="p-3.5 text-right">Total</th>
                <th className="p-3.5 text-center">Payment</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted">
                    No order records found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="transition-colors hover:bg-surface-hover/40">
                    <td className="p-3.5 font-bold text-text font-mono">{ord.orderNumber}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-text">{ord.customerName}</div>
                      <div className="text-[11px] text-muted">{ord.customerEmail}</div>
                    </td>
                    <td className="p-3.5 text-muted">{ord.date}</td>
                    <td className="p-3.5 text-center font-medium text-text">{ord.items.length}</td>
                    <td className="p-3.5 text-right font-bold text-text">
                      {formatCurrency(ord.totalAmount)}
                    </td>
                    <td className="p-3.5 text-center">{getPaymentBadge(ord.paymentStatus)}</td>
                    <td className="p-3.5 text-center">{getStatusBadge(ord.status)}</td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceOrder(ord)}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-surface-hover"
                        >
                          <Receipt className="size-3.5" />
                          <span>Invoice</span>
                        </button>

                        <select
                          value={ord.status}
                          onChange={(e) =>
                            handleUpdateStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="rounded-md border border-border bg-surface px-1.5 py-1 text-[11px] font-medium text-muted hover:text-text focus:outline-none"
                        >
                          <option value="completed">Completed</option>
                          <option value="processing">Processing</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
}
