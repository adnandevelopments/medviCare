"use client";

import Image from "next/image";
import { useState } from "react";
import type { PhotoReview } from "@/lib/pageStories";

export type { PhotoReview };

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

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
          Notes from this path
        </p>
        <h2 className="font-display text-[24px] text-ppc-primary md:text-[30px]">
          Notes written for this care path
        </h2>
        <p className="mt-2 max-w-2xl text-[14px] text-ppc-primary/75">
          Stories from people on similar plans — tap a photo to read their note.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className={`group min-h-11 overflow-hidden rounded-2xl text-left transition-all ${
                  on
                    ? "ring-2 ring-ppc-accent"
                    : "ring-1 ring-ppc-border hover:ring-ppc-accent/60"
                }`}
              >
                <div className="relative aspect-[4/3] bg-ppc-accent/15">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-display text-[28px] font-semibold text-ppc-accent">
                      {initials(item.name)}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-[15px] font-semibold text-white">
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
          <footer className="mt-4 flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-ppc-mint">
              {current.image ? (
                <Image
                  src={current.image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="44px"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-[12px] font-semibold text-ppc-accent">
                  {initials(current.name)}
                </span>
              )}
            </span>
            <p className="text-[14px] font-medium text-ppc-primary">
              {current.name}
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
