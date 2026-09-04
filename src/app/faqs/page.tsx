"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { faqs, media, productFaqs } from "@/lib/content";

export default function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [productOpen, setProductOpen] = useState<number | null>(null);
  const allGeneral = faqs;
  const allProduct = productFaqs;

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Your questions, answered"
        description="Clear answers about how medviCare works, medications, shipping, and privacy."
        image={media.pageHeroes.faqs}
      />

      <section className="site-section">
        <div className="site-prose">
          <h2 className="mb-6 font-display text-[28px] text-ppc-primary md:text-[34px]">
            General questions
          </h2>
          <div className="mb-14 divide-y divide-ppc-border border-y border-ppc-border">
            {allGeneral.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-start justify-between gap-4 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] font-medium text-ppc-primary md:text-[18px]">
                      {item.q}
                    </span>
                    <span className="text-ppc-accent">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <p className="pb-5 text-[15px] leading-relaxed text-ppc-primary/82">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <h2 className="mb-6 font-display text-[28px] text-ppc-primary md:text-[34px]">
            Product & delivery
          </h2>
          <div className="divide-y divide-ppc-border border-y border-ppc-border">
            {allProduct.map((item, i) => {
              const isOpen = productOpen === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-start justify-between gap-4 py-5 text-left"
                    onClick={() => setProductOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] font-medium text-ppc-primary md:text-[18px]">
                      {item.q}
                    </span>
                    <span className="text-ppc-accent">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <p className="pb-5 text-[15px] leading-relaxed text-ppc-primary/82">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-[14px] text-ppc-primary/80">
            Still stuck?{" "}
            <Link href="/contact" className="font-medium text-ppc-accent">
              Reach the care team
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
