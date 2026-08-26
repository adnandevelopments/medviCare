"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { media, type Product } from "@/lib/content";

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
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-ppc-border bg-ppc-surface ring-1 ring-ppc-accent/20 transition-all duration-300 hover:-translate-y-1 hover:ring-ppc-accent hover:shadow-[0_18px_40px_-18px_rgba(61,82,160,0.4)]"
          >
            <Link
              href={product.href}
              className="relative aspect-[4/5] w-full bg-white"
            >
              <Image
                src={`${product.image}?v=${media.cutoutVersion}`}
                alt={product.name}
                fill
                className="object-contain object-center p-8 transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
              />
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
