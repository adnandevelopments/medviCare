"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatCartTotal, useCart } from "@/components/CartProvider";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, clear, count } =
    useCart();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  const continueCare = () => {
    const lines = items.map((item) => `${item.qty}× ${item.title} (${item.price})`);
    try {
      sessionStorage.setItem(
        "medvicare-cart-note",
        lines.length
          ? `I would like a clinician review for:\n${lines.join("\n")}`
          : "",
      );
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[10000] bg-ppc-dark/45 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 z-[10001] flex h-full w-full max-w-[420px] flex-col border-l border-ppc-border bg-background shadow-[-20px_0_60px_rgba(15,23,42,0.18)]"
      >
        <div className="flex items-center justify-between border-b border-ppc-border px-5 py-4">
          <div>
            <p className="font-display text-[26px] text-ppc-primary">Cart</p>
            <p className="text-[12px] text-ppc-primary/75">
              {count === 0 ? "No items yet" : `${count} item${count === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ppc-border text-ppc-primary hover:bg-ppc-mint"
            aria-label="Close cart"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ppc-border bg-ppc-mint/40 px-4 py-10 text-center">
              <p className="text-[15px] font-medium text-ppc-primary">
                Your cart is empty
              </p>
              <p className="mt-2 text-[13px] text-ppc-primary/78">
                Browse care paths and add a plan to continue.
              </p>
              <Link
                href="/treatments"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ppc-accent px-4 py-2.5 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
              >
                View options
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-ppc-border bg-ppc-surface p-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ppc-mint">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-ppc-primary">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ppc-accent">
                      {item.supply}
                    </p>
                    <p className="mt-1 text-[14px] font-medium text-ppc-primary">
                      {item.price}
                      {item.compareAt ? (
                        <span className="ml-2 text-[12px] text-ppc-primary/70 line-through">
                          {item.compareAt}
                        </span>
                      ) : null}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded border border-ppc-border text-ppc-primary hover:bg-ppc-mint"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-[1.25rem] text-center text-[13px] text-ppc-primary">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded border border-ppc-border text-ppc-primary hover:bg-ppc-mint"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto inline-flex min-h-11 items-center text-[12px] text-ppc-primary/72 hover:text-ppc-accent"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ppc-border bg-ppc-mint/60 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-[14px]">
            <span className="text-ppc-primary/80">Estimated total</span>
            <span className="font-semibold text-ppc-primary">
              {formatCartTotal(items)}
            </span>
          </div>
          <p className="mb-3 text-[11px] leading-relaxed text-ppc-primary/72">
            Checkout starts a clinical intake. Medication is only dispensed if a
            licensed clinician approves.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/contact?from=cart"
              onClick={continueCare}
              className="inline-flex items-center justify-center rounded-full bg-ppc-accent px-4 py-3 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
            >
              {items.length ? "Request clinician review" : "Contact care team"}
            </Link>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="text-[13px] text-ppc-primary/75 hover:text-ppc-primary"
              >
                Clear cart
              </button>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
