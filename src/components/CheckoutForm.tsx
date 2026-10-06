"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useCart } from "@/components/CartProvider";
import {
  CA_PROVINCES,
  cartSubtotal,
  formatMoney,
  makeOrderId,
  parseMoney,
  saveLastOrder,
  shippingForSubtotal,
  type CheckoutAddress,
  type PlacedOrder,
} from "@/lib/orders";

type FieldErrors = Partial<Record<keyof CheckoutAddress | "form", string>>;

const empty: CheckoutAddress = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  province: "ON",
  postalCode: "",
  notes: "",
};

function fieldClass(hasError?: boolean) {
  return `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ppc-primary outline-none transition-colors placeholder:text-ppc-primary/40 ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-ppc-border focus:border-ppc-accent"
  }`;
}

function ProvincePicker({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (code: string) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected =
    CA_PROVINCES.find((p) => p.code === value) ?? CA_PROVINCES[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative mt-1.5">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-[15px] text-ppc-primary outline-none transition-colors ${
          hasError
            ? "border-red-400"
            : open
              ? "border-ppc-accent ring-2 ring-ppc-accent/20"
              : "border-ppc-border hover:border-ppc-accent/60"
        }`}
      >
        <span>
          <span className="font-medium">{selected.label}</span>
          <span className="ml-2 text-[12px] text-ppc-primary/50">{selected.code}</span>
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={`shrink-0 text-ppc-accent transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-ppc-border bg-white py-1.5 shadow-[0_18px_40px_-18px_rgba(61,82,160,0.45)]"
        >
          {CA_PROVINCES.map((p) => {
            const active = p.code === value;
            return (
              <li key={p.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(p.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] transition-colors ${
                    active
                      ? "bg-ppc-mint font-semibold text-ppc-primary"
                      : "text-ppc-primary hover:bg-ppc-mint/70"
                  }`}
                >
                  <span>{p.label}</span>
                  <span className="text-[12px] text-ppc-primary/50">{p.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, clear, setOpen } = useCart();
  const [form, setForm] = useState<CheckoutAddress>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);

  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const shipping = useMemo(() => shippingForSubtotal(subtotal), [subtotal]);
  const total = subtotal + shipping;

  const set =
    (key: keyof CheckoutAddress) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
    };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!form.fullName.trim()) next.fullName = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Valid email is required";
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Valid phone is required";
    }
    if (!form.address1.trim()) next.address1 = "Street address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.province) next.province = "Province is required";
    if (!form.postalCode.trim() || form.postalCode.trim().length < 5) {
      next.postalCode = "Postal code is required";
    }
    if (!agree) next.form = "Please confirm clinician review and COD terms";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!items.length) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    const order: PlacedOrder = {
      id: makeOrderId(),
      createdAt: new Date().toISOString(),
      paymentMethod: "cod",
      status: "pending_cod",
      items: items.map((item) => ({ ...item })),
      subtotal,
      shipping,
      total,
      currency: "CAD",
      address: {
        ...form,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address1: form.address1.trim(),
        address2: form.address2?.trim() || undefined,
        city: form.city.trim(),
        postalCode: form.postalCode.trim().toUpperCase(),
        notes: form.notes?.trim() || undefined,
      },
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: order.id,
          ...order.address,
          paymentMethod: "cod",
          items: order.items,
          total: order.total,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErrors({ form: data.error || "Could not place order. Try again." });
        setSubmitting(false);
        return;
      }

      saveLastOrder(order);
      clear();
      setOpen(false);
      router.push(`/order-confirmation?id=${encodeURIComponent(order.id)}`);
    } catch {
      setErrors({ form: "Network error. Please try again." });
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-ppc-border bg-ppc-mint/50 px-6 py-14 text-center">
        <p className="font-display text-[28px] text-ppc-primary">Your cart is empty</p>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-ppc-primary/75">
          Add a medication or care plan first, then come back to checkout with cash on delivery.
        </p>
        <Link
          href="/medications"
          className="motion-press mt-6 inline-flex rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
        >
          Browse medications
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start lg:gap-10"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-ppc-border bg-ppc-surface p-5 md:p-7">
          <h2 className="font-display text-[22px] text-ppc-primary md:text-[26px]">
            Delivery details
          </h2>
          <p className="mt-1 text-[14px] text-ppc-primary/70">
            We’ll ship after a licensed clinician reviews your request.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-[13px] font-medium text-ppc-primary">Full name</span>
              <input
                className={fieldClass(!!errors.fullName)}
                value={form.fullName}
                onChange={set("fullName")}
                autoComplete="name"
                placeholder="Alex Taylor"
              />
              {errors.fullName ? (
                <span className="mt-1 block text-[12px] text-red-600">{errors.fullName}</span>
              ) : null}
            </label>

            <label>
              <span className="text-[13px] font-medium text-ppc-primary">Email</span>
              <input
                type="email"
                className={fieldClass(!!errors.email)}
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
                placeholder="you@email.com"
              />
              {errors.email ? (
                <span className="mt-1 block text-[12px] text-red-600">{errors.email}</span>
              ) : null}
            </label>

            <label>
              <span className="text-[13px] font-medium text-ppc-primary">Phone</span>
              <input
                type="tel"
                className={fieldClass(!!errors.phone)}
                value={form.phone}
                onChange={set("phone")}
                autoComplete="tel"
                placeholder="(416) 555-0123"
              />
              {errors.phone ? (
                <span className="mt-1 block text-[12px] text-red-600">{errors.phone}</span>
              ) : null}
            </label>

            <label className="sm:col-span-2">
              <span className="text-[13px] font-medium text-ppc-primary">Street address</span>
              <input
                className={fieldClass(!!errors.address1)}
                value={form.address1}
                onChange={set("address1")}
                autoComplete="address-line1"
                placeholder="123 Main Street"
              />
              {errors.address1 ? (
                <span className="mt-1 block text-[12px] text-red-600">{errors.address1}</span>
              ) : null}
            </label>

            <label className="sm:col-span-2">
              <span className="text-[13px] font-medium text-ppc-primary">
                Apt / suite <span className="text-ppc-primary/50">(optional)</span>
              </span>
              <input
                className={fieldClass()}
                value={form.address2}
                onChange={set("address2")}
                autoComplete="address-line2"
                placeholder="Unit 4"
              />
            </label>

            <label>
              <span className="text-[13px] font-medium text-ppc-primary">City</span>
              <input
                className={fieldClass(!!errors.city)}
                value={form.city}
                onChange={set("city")}
                autoComplete="address-level2"
                placeholder="Toronto"
              />
              {errors.city ? (
                <span className="mt-1 block text-[12px] text-red-600">{errors.city}</span>
              ) : null}
            </label>

            <div>
              <span className="text-[13px] font-medium text-ppc-primary">Province</span>
              <ProvincePicker
                value={form.province}
                hasError={!!errors.province}
                onChange={(code) => {
                  setForm((prev) => ({ ...prev, province: code }));
                  setErrors((prev) => ({
                    ...prev,
                    province: undefined,
                    form: undefined,
                  }));
                }}
              />
              {errors.province ? (
                <span className="mt-1 block text-[12px] text-red-600">
                  {errors.province}
                </span>
              ) : null}
            </div>

            <label className="sm:col-span-2 sm:max-w-[220px]">
              <span className="text-[13px] font-medium text-ppc-primary">Postal code</span>
              <input
                className={fieldClass(!!errors.postalCode)}
                value={form.postalCode}
                onChange={set("postalCode")}
                autoComplete="postal-code"
                placeholder="M5V 2T6"
              />
              {errors.postalCode ? (
                <span className="mt-1 block text-[12px] text-red-600">{errors.postalCode}</span>
              ) : null}
            </label>

            <label className="sm:col-span-2">
              <span className="text-[13px] font-medium text-ppc-primary">
                Delivery notes <span className="text-ppc-primary/50">(optional)</span>
              </span>
              <textarea
                className={`${fieldClass()} min-h-[96px] resize-y`}
                value={form.notes}
                onChange={set("notes")}
                placeholder="Gate code, preferred delivery window…"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-ppc-border bg-ppc-surface p-5 md:p-7">
          <h2 className="font-display text-[22px] text-ppc-primary md:text-[26px]">
            Payment
          </h2>
          <p className="mt-1 text-[14px] text-ppc-primary/70">
            Online card checkout is coming soon. For now, pay when your order arrives.
          </p>

          <div className="mt-5 rounded-2xl border-2 border-ppc-accent bg-ppc-mint/60 p-4 md:p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="radio"
                name="payment"
                checked
                readOnly
                className="mt-1 size-4 accent-[var(--ppc-accent)]"
              />
              <span>
                <span className="block text-[16px] font-semibold text-ppc-primary">
                  Cash on delivery (COD)
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-ppc-primary/75">
                  Pay the courier in cash when your package is delivered. No card charge
                  today.
                </span>
              </span>
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-ppc-border bg-white p-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                setErrors((prev) => ({ ...prev, form: undefined }));
              }}
              className="mt-1 size-4 accent-[var(--ppc-accent)]"
            />
            <span className="text-[13px] leading-relaxed text-ppc-primary/85">
              I understand a licensed clinician must approve this plan before anything
              ships, and I will pay by cash on delivery if approved.
            </span>
          </label>
        </section>
      </div>

      <aside className="lg:sticky lg:top-[100px]">
        <div className="rounded-2xl border border-ppc-border bg-white p-5 shadow-[0_18px_40px_-24px_rgba(61,82,160,0.35)] md:p-6">
          <h2 className="font-display text-[22px] text-ppc-primary">Order summary</h2>

          <ul className="mt-4 max-h-[280px] space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ppc-mint">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-ppc-primary">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-ppc-primary/65">
                    Qty {item.qty} · {item.supply}
                  </p>
                </div>
                <p className="shrink-0 text-[14px] font-medium text-ppc-primary">
                  {formatMoney(parseMoney(item.price) * item.qty)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-ppc-border pt-4 text-[14px]">
            <div className="flex justify-between text-ppc-primary/80">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ppc-primary/80">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-ppc-border pt-3 text-[16px] font-semibold text-ppc-primary">
              <span>Total (COD)</span>
              <span className="text-ppc-accent">{formatMoney(total)}</span>
            </div>
          </div>

          {errors.form ? (
            <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-[13px] text-red-700">
              {errors.form}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="motion-press mt-5 flex w-full items-center justify-center rounded-full bg-ppc-accent px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place COD order"}
          </button>

          <Link
            href="/medications"
            className="mt-3 block text-center text-[13px] text-ppc-primary/70 hover:text-ppc-accent"
          >
            ← Continue shopping
          </Link>

          <p className="mt-4 text-[11px] leading-relaxed text-ppc-primary/60">
            Free shipping on orders $150+. Medication is only dispensed if clinically
            appropriate.
          </p>
        </div>
      </aside>
    </form>
  );
}
