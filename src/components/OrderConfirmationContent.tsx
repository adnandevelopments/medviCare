"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CA_PROVINCES,
  formatMoney,
  readLastOrder,
  type PlacedOrder,
} from "@/lib/orders";

export default function OrderConfirmationContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    const last = readLastOrder();
    if (last && (!id || last.id === id)) setOrder(last);
  }, [id]);

  if (!order) {
    return (
      <div className="rounded-2xl border border-dashed border-ppc-border bg-ppc-mint/40 px-6 py-14 text-center">
        <p className="font-display text-[28px] text-ppc-primary">No order found</p>
        <p className="mt-2 text-[15px] text-ppc-primary/75">
          If you just checked out, refresh once — or return to your cart.
        </p>
        <Link
          href="/checkout"
          className="motion-press mt-6 inline-flex rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
        >
          Go to checkout
        </Link>
      </div>
    );
  }

  const provinceLabel =
    CA_PROVINCES.find((p) => p.code === order.address.province)?.label ||
    order.address.province;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-ppc-accent/30 bg-ppc-mint/50 px-5 py-6 md:px-8 md:py-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
          Order confirmed
        </p>
        <h1 className="mt-2 font-display text-[30px] leading-tight text-ppc-primary md:text-[40px]">
          Thanks, {order.address.fullName.split(" ")[0]}
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ppc-primary/80">
          Your COD order is in. A licensed clinician will review it next. You’ll pay cash
          when the courier delivers — only if the plan is approved and shipped.
        </p>
        <p className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ppc-primary ring-1 ring-ppc-border">
          Order ID · {order.id}
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-ppc-border bg-ppc-surface p-5">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-ppc-primary/70">
            Delivery
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ppc-primary">
            {order.address.fullName}
            <br />
            {order.address.address1}
            {order.address.address2 ? (
              <>
                <br />
                {order.address.address2}
              </>
            ) : null}
            <br />
            {order.address.city}, {provinceLabel} {order.address.postalCode}
            <br />
            {order.address.phone}
            <br />
            {order.address.email}
          </p>
        </section>

        <section className="rounded-2xl border border-ppc-border bg-ppc-surface p-5">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-ppc-primary/70">
            Payment
          </h2>
          <p className="mt-3 text-[16px] font-semibold text-ppc-primary">
            Cash on delivery
          </p>
          <p className="mt-1 text-[14px] text-ppc-primary/75">
            Amount due on delivery:{" "}
            <span className="font-semibold text-ppc-accent">
              {formatMoney(order.total)}
            </span>
          </p>
          <p className="mt-3 text-[13px] text-ppc-primary/65">
            Status: pending clinician review + shipping
          </p>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-ppc-border bg-white p-5 md:p-6">
        <h2 className="font-display text-[22px] text-ppc-primary">Items</h2>
        <ul className="mt-4 space-y-3">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 border-b border-ppc-border/70 pb-3 last:border-0 last:pb-0"
            >
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
                <p className="text-[14px] font-semibold text-ppc-primary">{item.title}</p>
                <p className="text-[12px] text-ppc-primary/65">
                  Qty {item.qty} · {item.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-ppc-border pt-4 text-[15px]">
          <span className="text-ppc-primary/75">Total (COD)</span>
          <span className="font-semibold text-ppc-accent">{formatMoney(order.total)}</span>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/medications"
          className="motion-press inline-flex rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
        >
          Continue shopping
        </Link>
        <Link
          href="/contact"
          className="motion-press inline-flex rounded-full border border-ppc-border bg-white px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ppc-primary hover:border-ppc-accent"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
