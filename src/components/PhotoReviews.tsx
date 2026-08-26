"use client";

import Image from "next/image";
import { useState } from "react";

export type PhotoReview = {
  name: string;
  quote: string;
  meta?: string;
  image: string;
};

export default function PhotoReviews({
  reviews,
}: {
  reviews: PhotoReview[];
}) {
  const items = reviews.slice(0, 3);
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  if (!current) return null;

  return (
    <section className="site-section-sm border-t border-ppc-border bg-ppc-mint">
      <div className="site-inner">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
          Patients
        </p>
        <h2 className="font-display text-[24px] text-ppc-primary md:text-[30px]">
          A few notes from people on this path
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className={`group overflow-hidden rounded-2xl text-left transition-all ${
                  on
                    ? "ring-2 ring-ppc-accent"
                    : "ring-1 ring-ppc-border hover:ring-ppc-accent/60"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ppc-dark/70 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-[14px] font-semibold text-white">
                    {item.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <blockquote className="mt-6 max-w-3xl rounded-2xl bg-white px-5 py-5 md:px-7">
          {current.meta ? (
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ppc-accent">
              {current.meta}
            </p>
          ) : null}
          <p className="mt-2 text-[16px] leading-relaxed text-ppc-primary/88 md:text-[18px]">
            “{current.quote}”
          </p>
          <p className="mt-3 text-[14px] font-medium text-ppc-primary">
            — {current.name}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
