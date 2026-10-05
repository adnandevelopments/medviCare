import type { CartItem } from "@/components/CartProvider";

export const ORDER_STORAGE_KEY = "medvicare-last-order";
export const ORDERS_HISTORY_KEY = "medvicare-orders";

export const CA_PROVINCES = [
  { code: "AB", label: "Alberta" },
  { code: "BC", label: "British Columbia" },
  { code: "MB", label: "Manitoba" },
  { code: "NB", label: "New Brunswick" },
  { code: "NL", label: "Newfoundland and Labrador" },
  { code: "NS", label: "Nova Scotia" },
  { code: "NT", label: "Northwest Territories" },
  { code: "NU", label: "Nunavut" },
  { code: "ON", label: "Ontario" },
  { code: "PE", label: "Prince Edward Island" },
  { code: "QC", label: "Quebec" },
  { code: "SK", label: "Saskatchewan" },
  { code: "YT", label: "Yukon" },
] as const;

export type PaymentMethod = "cod";

export type CheckoutAddress = {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
};

export type PlacedOrder = {
  id: string;
  createdAt: string;
  paymentMethod: PaymentMethod;
  status: "pending_cod";
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: "CAD";
  address: CheckoutAddress;
};

export function parseMoney(value: string) {
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatMoney(amount: number) {
  return amount.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + parseMoney(item.price) * item.qty, 0);
}

/** Flat COD shipping for demo — free over $150 CAD. */
export function shippingForSubtotal(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= 150 ? 0 : 12;
}

export function makeOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MC-${stamp}-${rand}`;
}

export function saveLastOrder(order: PlacedOrder) {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    const raw = localStorage.getItem(ORDERS_HISTORY_KEY);
    const prev = raw ? (JSON.parse(raw) as PlacedOrder[]) : [];
    const next = [order, ...(Array.isArray(prev) ? prev : [])].slice(0, 20);
    localStorage.setItem(ORDERS_HISTORY_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function readLastOrder(): PlacedOrder | null {
  try {
    const raw = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlacedOrder;
  } catch {
    return null;
  }
}
