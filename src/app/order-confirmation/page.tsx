import type { Metadata } from "next";
import { Suspense } from "react";
import OrderConfirmationContent from "@/components/OrderConfirmationContent";

export const metadata: Metadata = {
  title: "Order confirmation — medviCare",
  description: "Your medviCare cash-on-delivery order was received.",
};

export default function OrderConfirmationPage() {
  return (
    <section className="site-section">
      <div className="site-inner">
        <Suspense
          fallback={
            <p className="text-center text-[15px] text-ppc-primary/70">Loading order…</p>
          }
        >
          <OrderConfirmationContent />
        </Suspense>
      </div>
    </section>
  );
}
