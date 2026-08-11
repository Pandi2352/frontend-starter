export type OrderStatus = 'completed' | 'processing' | 'pending' | 'cancelled' | 'refunded';
export type PaymentStatus = 'paid' | 'unpaid' | 'refunded';

export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  date: string;
  totalAmount: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: string;
  items: OrderItem[];
}
