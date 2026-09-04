"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { faqs, media } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="site-section bg-background">
      <div className="site-inner grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display text-[32px] font-[400] leading-[1.1] tracking-[-0.02em] text-ppc-primary md:text-[44px]">
              Your questions, answered
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ppc-primary/80 md:text-[16px]">
              Clear answers about how medviCare works, who supports you, and how we
              protect your care.
            </p>
          </Reveal>
          <Reveal delay={140} variant="image-in" className="mt-8 hidden lg:block">
            <div className="group relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                    src={media.pageHeroes.faqs}
                alt="Clinician and patient conversation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ppc-dark/40 to-transparent" />
            </div>
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-ppc-accent hover:text-ppc-accent-soft"
            >
              See all FAQs
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <Link
            href="/faqs"
            className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-ppc-accent hover:text-ppc-accent-soft lg:hidden"
          >
            See all FAQs
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div>
          <Reveal variant="fade-up">
          <div className="divide-y divide-ppc-border border-y border-ppc-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left md:py-6"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] font-medium text-ppc-primary md:text-[18px]">
                      {item.q}
                    </span>
                    <span
                      className={`mt-1 shrink-0 text-[20px] leading-none text-ppc-accent transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-[15px] leading-relaxed text-ppc-primary/82 md:pb-6">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
            );
          })}
          </div>
          </Reveal>

        <div className="mt-8 rounded-2xl border border-ppc-border bg-ppc-mint px-5 py-5 md:mt-10 md:px-6">
          <p className="text-[16px] font-medium text-ppc-primary md:text-[18px]">
            Have more questions? We’ve got answers.
          </p>
          <Link
            href="/faqs"
            className="motion-press mt-3 inline-flex items-center gap-2 rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
          >
            See all FAQs
            <span aria-hidden>→</span>
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
