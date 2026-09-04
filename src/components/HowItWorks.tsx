"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { howItWorks } from "@/lib/content";

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const current = howItWorks[active] ?? howItWorks[0];
  const progress = ((active + 1) / howItWorks.length) * 100;

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + howItWorks.length) % howItWorks.length);
  };

  return (
    <section id="how-it-works" className="site-section scroll-mt-[88px] bg-ppc-dark text-white">
      <div className="site-inner">
        <div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <Reveal variant="blur-up">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent-soft">
                Process
              </p>
            </Reveal>
            <Reveal delay={80} variant="fade-up">
              <h2 className="max-w-xl font-display text-[32px] font-[400] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
                How medviCare works
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-md text-[16px] text-white/70 md:justify-self-end md:text-[17px]">
              Three clear steps from first question to a plan at your door.
              Click a step to preview it.
            </p>
          </Reveal>
        </div>

        <div className="mb-4 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-ppc-accent-soft transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Reveal variant="fade-up">
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {howItWorks.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-2xl border px-5 py-5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-ppc-accent/60 bg-white/10 shadow-[0_16px_40px_-24px_rgba(92,126,232,0.8)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold transition-all ${
                    isActive
                      ? "bg-ppc-accent text-white"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {step.step}
                </span>
                <h3 className="font-display text-[20px] leading-tight md:text-[22px]">
                  {step.title}
                </h3>
                <p
                  className={`mt-2 text-[14px] leading-relaxed transition-colors ${
                    isActive ? "text-white/80" : "text-white/45"
                  }`}
                >
                  {step.description}
                </p>
              </button>
            );
          })}
        </div>
        </Reveal>

        <Reveal delay={80} variant="scale-in">
          <div className="group relative overflow-hidden rounded-2xl">
            <div className="relative min-h-[280px] md:min-h-[460px]">
              <Image
                key={current.image}
                src={current.image}
                alt={current.title}
                fill
                className="animate-image-cross object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 1180px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ppc-dark via-ppc-dark/20 to-transparent" />

              <button
                type="button"
                aria-label="Previous step"
                onClick={() => go(-1)}
                className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white text-ppc-accent shadow-lg hover:bg-ppc-accent hover:text-white md:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M15 5L8 12l7 7"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next step"
                onClick={() => go(1)}
                className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white text-ppc-accent shadow-lg hover:bg-ppc-accent hover:text-white md:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                key={current.step}
                className="absolute inset-x-0 bottom-0 animate-fade-up p-6 md:p-8"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent-soft">
                  Step {current.step} of 03
                </p>
                <p className="mt-1 font-display text-[26px] md:text-[34px]">
                  {current.title}
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-ppc-dark/80 p-3 md:p-4">
              {howItWorks.map((step, i) => (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${step.title}`}
                  className={`relative h-16 flex-1 overflow-hidden rounded-xl md:h-20 ${
                    active === i
                      ? "ring-2 ring-ppc-accent-soft"
                      : "opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
