"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { media, meds, treatments, trustItems } from "@/lib/content";

export default function BetterCare() {
  const [tab, setTab] = useState<"paths" | "meds">("paths");

  return (
    <section id="care" className="site-section relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-ppc-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-ppc-accent-soft/10 blur-3xl"
        aria-hidden
      />

      <div className="site-inner relative">
        <div className="mb-12 grid gap-6 md:mb-14 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <Reveal variant="blur-up">
            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
                Services
              </p>
              <h2 className="max-w-xl font-display text-[32px] font-[400] leading-[1.08] tracking-[-0.02em] text-ppc-primary md:text-[46px]">
                Care built around{" "}
                <span className="text-ppc-accent">your goals</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120} variant="fade-up">
            <p className="max-w-md text-[15px] leading-relaxed text-ppc-primary/82 md:justify-self-end md:text-[16px]">
              Weight, hair, skin, longevity, sexual health, mental health, and
              habit support — clinician-guided, discreet, and easy to start.
            </p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="mb-8 inline-flex rounded-full border-2 border-ppc-accent/40 bg-ppc-surface p-1">
            {(
              [
                { id: "paths" as const, label: "Care paths" },
                { id: "meds" as const, label: "Medications" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`motion-press rounded-full px-5 py-2.5 text-[14px] font-medium transition-all ${
                  tab === item.id
                    ? "bg-ppc-accent text-white shadow-[0_8px_24px_-12px_rgba(112,145,230,0.8)]"
                    : "text-ppc-primary/80 hover:text-ppc-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        {tab === "paths" ? (
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {treatments.map((item) => (
              <Link
                key={`${item.title}-${item.accent}`}
                href={item.href}
                className="motion-card group flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border-2 border-ppc-accent/40 bg-ppc-surface transition-all hover:-translate-y-1 hover:border-ppc-accent hover:shadow-[0_18px_40px_-18px_rgba(61,82,160,0.45)]"
              >
                <div className="relative h-[200px] shrink-0 overflow-hidden bg-ppc-mint">
                  <Image
                    src={`${item.image}?v=${media.cutoutVersion}`}
                    alt={`${item.title} ${item.accent}`}
                    fill
                    className="object-contain object-center p-3 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ppc-surface via-ppc-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="font-helvetica-display text-[20px] font-medium leading-tight tracking-[-0.02em] text-ppc-primary md:text-[22px]">
                    {item.title}{" "}
                    <span className="text-ppc-accent">{item.accent}</span>
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ppc-primary/78 line-clamp-3 md:text-[14px]">
                    {item.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 border-t border-ppc-accent/25 pt-4 text-[13px] font-medium text-ppc-accent">
                    <span className="transition-all duration-300 group-hover:translate-x-0.5">
                      Explore
                    </span>
                    <span
                      aria-hidden
                      className="transition-all duration-300 group-hover:translate-x-1.5 group-hover:scale-110"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-ppc-mint/80 p-4 md:p-8">
            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {meds.map((med) => (
                <Link
                  key={med.name}
                  href={med.href}
                  className="motion-card group flex h-full flex-col overflow-hidden rounded-2xl border border-ppc-border bg-white transition-all hover:-translate-y-1 hover:border-ppc-accent hover:shadow-[0_18px_40px_-18px_rgba(61,82,160,0.45)]"
                >
                  <div className="relative h-[148px] shrink-0 overflow-hidden bg-white md:h-[160px]">
                    <Image
                      src={`${med.image}?v=${media.cutoutVersion}`}
                      alt={med.name}
                      fill
                      className="object-contain object-center p-5 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-ppc-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-1">
                    <span className="block text-[17px] font-medium leading-snug text-ppc-primary md:text-[19px]">
                      {med.name}
                    </span>
                    <span className="mt-2 flex-1 text-[12px] leading-relaxed text-ppc-primary/75 line-clamp-2 md:text-[13px]">
                      {med.blurb}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 border-t border-ppc-accent/25 pt-4 text-[13px] font-medium text-ppc-accent transition-transform group-hover:translate-x-1">
                      Learn more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Reveal delay={80} className="mt-10">
          <Link
            href="/treatments"
            className="motion-press inline-flex items-center gap-2 rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
          >
            Explore all treatments
            <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <div className="mt-14 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item}
              className="flex h-full min-h-[72px] items-center gap-3 rounded-2xl border-2 border-ppc-accent/30 bg-ppc-mint/70 px-4 py-4"
            >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ppc-accent/15 text-[12px] font-semibold text-ppc-accent"
                  aria-hidden
                >
                  ✓
                </span>
                <p className="text-[13px] font-medium leading-snug text-ppc-primary/92 md:text-[14px]">
                  {item}
                </p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
