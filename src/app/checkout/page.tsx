import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — medviCare",
  description:
    "Complete your medviCare order with cash on delivery. A licensed clinician reviews every plan before shipping.",
};

export default function CheckoutPage() {
  return (
    <section className="site-section">
      <div className="site-inner">
        <div className="mb-8 max-w-2xl md:mb-10">
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
            Checkout
          </p>
          <h1 className="font-display text-[32px] font-[400] leading-[1.1] tracking-[-0.02em] text-ppc-primary md:text-[44px]">
            Place your order
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ppc-primary/78 md:text-[16px]">
            Cash on delivery for now — pay when your package arrives. A clinician still
            reviews every request before anything ships.
          </p>
        </div>
        <CheckoutForm />
      </div>
    </section>
  );
}
