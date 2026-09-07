"use client";

import Image from "next/image";
import { useState } from "react";

export type UsageItem = {
  slug: string;
  name: string;
  image: string;
  formulations: string[];
  howToUse: string;
  howItWorks: string;
};

const TABS = [
  { id: "use", label: "How to use" },
  { id: "form", label: "Formulation" },
  { id: "how", label: "How it works" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function UsageGuide({
  items,
  eyebrow = "Usage",
  title = "Details without the extra pages",
  hideImage = false,
}: {
  items: UsageItem[];
  eyebrow?: string;
  title?: string;
  hideImage?: boolean;
}) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "");
  const [tab, setTab] = useState<TabId>("use");
  const current = items.find((item) => item.slug === activeSlug) ?? items[0];

  if (!current) return null;

  return (
    <section id="usage" className="site-section-sm scroll-mt-[88px] border-t border-ppc-border">
      <div className="site-inner">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
          {eyebrow}
        </p>
        <h2 className="max-w-xl font-display text-[24px] text-ppc-primary md:text-[30px]">
          {title}
        </h2>

        {items.length > 1 ? (
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {items.map((item) => {
              const on = item.slug === current.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => {
                    setActiveSlug(item.slug);
                    setTab("use");
                  }}
                  className={`shrink-0 min-h-11 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all ${
                    on
                      ? "border-ppc-accent bg-ppc-accent text-white"
                      : "border-ppc-border bg-ppc-surface text-ppc-primary hover:border-ppc-accent"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        ) : null}

        <div
          className={`mt-8 grid items-start gap-8 ${
            hideImage ? "" : "lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
          }`}
        >
          {hideImage ? null : (
            <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl bg-white ring-1 ring-ppc-border lg:max-w-none">
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-contain object-center p-8"
              sizes="(max-width: 1024px) 280px, 40vw"
            />
          </div>
          )}

          <div>
            <div className="flex flex-wrap gap-2">
              {TABS.map((item) => {
                const on = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`min-h-11 rounded-full px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all ${
                      on
                        ? "bg-ppc-accent text-white"
                        : "bg-ppc-mint text-ppc-primary hover:bg-ppc-accent/15"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 min-h-[140px]">
              {tab === "form" ? (
                <ul className="space-y-3">
                  {current.formulations.map((line) => (
                    <li
                      key={line}
                      className="rounded-xl border border-ppc-border bg-ppc-surface px-4 py-3 text-[15px] text-ppc-primary/85"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[16px] leading-relaxed text-ppc-primary/82">
                  {tab === "use" ? current.howToUse : current.howItWorks}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
