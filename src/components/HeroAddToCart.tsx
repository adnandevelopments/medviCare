"use client";

import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/content";

export default function HeroAddToCart({
  product,
  price,
  priceLabel,
}: {
  product: Product;
  price: string;
  priceLabel: string;
}) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-[15px] font-medium text-white">{priceLabel}</p>
      <button
        type="button"
        onClick={() =>
          addItem({
            id: product.slug,
            title: product.name,
            price,
            supply: product.tag ?? "Clinician-approved plan",
            image: product.image,
          })
        }
        className="motion-press inline-flex items-center justify-center rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
      >
        Add to cart
      </button>
    </div>
  );
}
