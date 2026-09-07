"use client";

import { useState } from "react";
import Link from "next/link";
import { extrasForPath } from "@/lib/carePathExtras";
import { expertPoints } from "@/lib/content";

export default function CarePathExtras({
  slug,
  part,
}: {
  slug: string;
  part: "intro" | "more";
}) {
  const extra = extrasForPath(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (part === "intro") {
    if (!extra.notice) return null;
    return (
      <section className="border-b border-ppc-border bg-ppc-mint">
        <div className="site-inner py-5 md:py-6">
          <p className="max-w-3xl text-[13px] leading-relaxed text-ppc-primary/80 md:text-[14px]">
            {extra.notice}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {extra.steps.length ? (
        <section className="site-section-sm">
          <div className="site-inner">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
              Process
            </p>
            <h2 className="max-w-xl font-display text-[24px] text-ppc-primary md:text-[30px]">
              How this path works
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {extra.steps.map((item) => (
                <article
                  key={item.step}
                  className="rounded-2xl border border-ppc-border bg-ppc-surface p-6"
                >
                  <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ppc-accent text-[13px] font-semibold text-white">
                    {item.step}
                  </span>
                  <h3 className="font-display text-[20px] text-ppc-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ppc-primary/80">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {extra.patterns?.length ? (
        <section className="site-section-sm border-t border-ppc-border bg-ppc-mint">
          <div className="site-inner">
            <h2 className="max-w-xl font-display text-[24px] text-ppc-primary md:text-[30px]">
              What thinning can look like
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {extra.patterns.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-ppc-border bg-white p-6"
                >
                  <h3 className="text-[17px] font-semibold text-ppc-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ppc-primary/80">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {extra.pricing?.length ? (
        <section className="site-section-sm border-t border-ppc-border">
          <div className="site-inner">
            <h2 className="max-w-xl font-display text-[24px] text-ppc-primary md:text-[30px]">
              Transparent pricing
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {extra.pricing.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-ppc-border bg-ppc-surface p-6"
                >
                  <p className="text-[13px] font-medium text-ppc-accent">
                    {item.title}
                  </p>
                  <p className="mt-2 font-display text-[28px] text-ppc-primary">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ppc-primary/80">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {extra.faqs.length ? (
        <section className="site-section-sm border-t border-ppc-border">
          <div className="site-inner max-w-3xl">
            <h2 className="mb-2 font-display text-[24px] text-ppc-primary md:text-[30px]">
              Your questions, answered
            </h2>
            <div className="mt-6 divide-y divide-ppc-border border-y border-ppc-border">
              {extra.faqs.map((item, i) => {
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
      ) : null}

      <section className="site-section-sm border-t border-ppc-border bg-ppc-mint">
        <div className="site-inner">
          <h2 className="max-w-xl font-display text-[24px] text-ppc-primary md:text-[30px]">
            Guided by licensed clinicians
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ppc-border bg-ppc-border md:grid-cols-3">
            {expertPoints.map((point) => (
              <div key={point.title} className="bg-white p-6">
                <h3 className="text-[17px] font-semibold text-ppc-primary">
                  {point.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ppc-primary/80">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/about#leadership"
            className="motion-press mt-8 inline-flex items-center gap-2 rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
          >
            Meet our team
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
