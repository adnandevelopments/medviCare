"use client";

import { useState } from "react";
import HeroAddToCart from "@/components/HeroAddToCart";
import PageHero from "@/components/PageHero";
import PhotoReviews from "@/components/PhotoReviews";
import ProductCardGrid from "@/components/ProductCardGrid";
import UsageGuide from "@/components/UsageGuide";
import {
  getProductsByCategories,
  type Product,
} from "@/lib/content";
import type { ProductDetailContent } from "@/lib/productDetails";

const reviewPhotos = [
  "/images/team-maya.png",
  "/images/team-chris.png",
  "/images/team-nora.png",
];

export default function ProductDetailPage({
  product,
  detail,
}: {
  product: Product;
  detail: ProductDetailContent;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const related = getProductsByCategories([product.category]).filter(
    (p) => p.slug !== product.slug,
  );
  const price = product.price ?? "Varies";
  const priceLabel = product.priceLabel ?? "Clinician-guided pricing";

  const reviews = detail.testimonials.slice(0, 3).map((item, i) => ({
    name: item.name,
    quote: item.quote,
    meta: item.condition,
    image: reviewPhotos[i % reviewPhotos.length],
  }));

  return (
    <>
      <PageHero
        compact
        plain
        eyebrow={detail.badge}
        title={detail.headline}
        description={detail.description}
        sideImage={product.image}
        sideImageAlt={product.name}
        cta={{ label: "How to use", href: "#usage" }}
        extraCta={
          <HeroAddToCart
            product={product}
            price={price}
            priceLabel={priceLabel}
          />
        }
      />

      <UsageGuide
        items={[
          {
            slug: product.slug,
            name: product.name,
            image: product.image,
            formulations: detail.formulations,
            howToUse: detail.howToUse,
            howItWorks: detail.howItWorks,
          },
        ]}
        hideImage
        eyebrow="This medication"
        title="How to use, formulation, and how it works"
      />

      {reviews.length ? <PhotoReviews reviews={reviews} /> : null}

      <section className="site-section-sm border-t border-ppc-border">
        <div className="site-inner max-w-3xl">
          <h2 className="mb-2 font-display text-[24px] text-ppc-primary md:text-[30px]">
            Quick questions
          </h2>
          <div className="mt-6 divide-y divide-ppc-border border-y border-ppc-border">
            {detail.faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span className="text-[16px] font-medium text-ppc-primary md:text-[17px]">
                      {item.q}
                    </span>
                    <span
                      className={`mt-0.5 shrink-0 text-[20px] leading-none text-ppc-accent transition-transform ${
                        open ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-[15px] leading-relaxed text-ppc-primary/82">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="site-section-sm border-t border-ppc-border">
          <div className="site-inner">
            <h2 className="mb-6 font-display text-[24px] text-ppc-primary md:text-[30px]">
              More options on this path
            </h2>
            <ProductCardGrid products={related} columns="dense" />
          </div>
        </section>
      ) : null}
    </>
  );
}
