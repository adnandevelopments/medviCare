"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { type Product } from "@/lib/content";

export default function ProductCardGrid({
  products,
  columns = "default",
}: {
  products: Product[];
  columns?: "default" | "dense";
}) {
  const { addItem } = useCart();

  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 ${
        columns === "dense" ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {products.map((product) => {
        const price = product.price ?? "Varies";
        const priceLabel = product.priceLabel ?? product.price ?? "Clinician-guided";
        return (
          <article
            key={product.slug}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ppc-border bg-ppc-surface ring-1 ring-ppc-accent/20 transition-all duration-300 hover:-translate-y-1 hover:ring-ppc-accent hover:shadow-[0_18px_40px_-18px_rgba(61,82,160,0.4)]"
          >
            <Link
              href={product.href}
              className="relative aspect-[4/5] w-full overflow-hidden bg-white"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center p-8 transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent px-4 pb-4 pt-10 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View details
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <Link href={product.href}>
                <h3 className="text-[17px] font-semibold leading-tight text-ppc-primary md:text-[18px]">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ppc-primary/78 md:text-[14px]">
                {product.blurb}
              </p>
              <p className="mt-3 text-[16px] font-semibold text-ppc-accent">
                {priceLabel}
              </p>
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
                className="motion-press mt-4 w-full rounded-full bg-ppc-accent px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-ppc-dark"
              >
                Add to cart
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
