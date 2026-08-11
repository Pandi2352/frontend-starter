import { CreditCard, Download, MapPin, Printer, Receipt, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/format';

import type { Order } from '../types/order';

export interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    const csvContent = [
      ['Order Number', 'Customer Name', 'Customer Email', 'Date', 'Total Amount', 'Status'],
      [
        order.orderNumber,
        order.customerName,
        order.customerEmail,
        order.date,
        order.totalAmount.toString(),
        order.status,
      ],
      [],
      ['Item Name', 'SKU', 'Quantity', 'Unit Price', 'Total Price'],
      ...order.items.map((item) => [
        item.productName,
        item.sku,
        item.quantity.toString(),
        item.unitPrice.toString(),
        item.totalPrice.toString(),
      ]),
    ]
      .map((row) => row.map((val) => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${order.orderNumber}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: Order['status']) => {
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-text/30 backdrop-blur-xs animate-in fade-in-0 duration-200 print:hidden"
        onClick={onClose}
      />

      {/* Invoice Modal Container */}
      <div
        role="dialog"
        aria-label={`Invoice for ${order.orderNumber}`}
        className="fixed left-1/2 top-10 z-50 w-full max-w-2xl -translate-x-1/2 rounded-md border border-border bg-surface p-6 shadow-none animate-in zoom-in-95 fade-in-0 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Header Toolbar (Hidden when printing) */}
        <div className="flex items-center justify-between border-b border-border pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Receipt className="size-5 text-primary" />
            <h2 className="text-base font-bold text-text">Official Invoice #{order.orderNumber}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text hover:bg-surface-hover"
            >
              <Printer className="size-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text hover:bg-surface-hover"
            >
              <Download className="size-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border p-1.5 text-muted hover:bg-surface-hover hover:text-text"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Invoice Document Body */}
        <div className="mt-4 space-y-6 text-xs text-text">
          {/* Top Invoice Banner */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-border pb-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-text">INVOICE</h1>
              <p className="text-muted font-medium mt-1">
                Invoice ID: <span className="font-semibold text-text">{order.orderNumber}</span>
              </p>
              <p className="text-muted">
                Date: <span className="font-semibold text-text">{order.date}</span>
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-muted">Order Status:</span>
                {getStatusBadge(order.status)}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-muted">Payment:</span>
                <Badge variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}>
                  {order.paymentStatus.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Billing & Shipping Address Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-md border border-border bg-surface-hover/50 p-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                Billed To
              </h3>
              <p className="font-bold text-text text-sm">{order.customerName}</p>
              <p className="text-muted">{order.customerEmail}</p>
              <div className="mt-2 flex items-center gap-1 text-muted">
                <CreditCard className="size-3.5 text-primary" />
                <span>{order.paymentMethod}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                Shipping Destination
              </h3>
              <div className="flex items-start gap-1.5 text-muted">
                <MapPin className="size-3.5 text-muted mt-0.5 shrink-0" />
                <p className="leading-relaxed">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          {/* Itemized Order Table */}
          <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-hover text-muted font-semibold">
                  <th className="p-3">Item Description</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-hover/30">
                    <td className="p-3 font-semibold text-text">{item.productName}</td>
                    <td className="p-3 text-muted font-mono">{item.sku}</td>
                    <td className="p-3 text-center text-text font-medium">{item.quantity}</td>
                    <td className="p-3 text-right text-muted">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-3 text-right font-bold text-text">
                      {formatCurrency(item.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Breakdown */}
          <div className="flex flex-col items-end pt-2">
            <div className="w-full sm:w-64 space-y-2 rounded-md border border-border p-3.5 bg-surface-hover/40">
              <div className="flex justify-between text-muted">
                <span>Subtotal:</span>
                <span className="font-semibold text-text">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Tax (8%):</span>
                <span className="font-semibold text-text">{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping Fee:</span>
                <span className="font-semibold text-text">{formatCurrency(order.shippingFee)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-sm font-bold text-text">
                <span>Grand Total:</span>
                <span className="text-primary">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Notice */}
          <div className="border-t border-border pt-4 text-center text-[11px] text-muted">
            <p>Thank you for your business! For any billing queries, contact support@techcorp.io</p>
          </div>
        </div>
      </div>
    </>
  );
}
