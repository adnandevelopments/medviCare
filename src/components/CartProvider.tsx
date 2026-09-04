"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: string;
  compareAt?: string;
  supply: string;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "medvicare-cart";

const CartContext = createContext<CartContextValue | null>(null);

function parsePrice(value: string) {
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatCartTotal(items: CartItem[]) {
  const total = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0,
  );
  return total.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: total % 1 === 0 ? 0 : 2,
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("medvicare-consent");
      if (consent === "all") {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CartItem[];
          if (Array.isArray(parsed)) setItems(parsed);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const persist = () => {
      try {
        const consent = localStorage.getItem("medvicare-consent");
        if (consent === "all") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } else if (consent === "essential") {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        /* ignore */
      }
    };
    persist();
    window.addEventListener("medvicare-consent", persist);
    return () => window.removeEventListener("medvicare-consent", persist);
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      open,
      setOpen,
      addItem,
      removeItem,
      updateQty,
      clear,
    }),
    [items, count, open, addItem, removeItem, updateQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
