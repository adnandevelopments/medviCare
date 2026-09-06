"use client";

import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/content";

export default function FooterCTA() {
  return (
    <section className="relative">
      <Link
        href="/treatments"
        className="group relative block min-h-[420px] overflow-hidden md:min-h-[560px] lg:min-h-[680px]"
        aria-label="Start private care — browse treatments"
      >
        <Image
          src={media.footerCta}
          alt="Start private online care with medviCare"
          fill
          className="object-cover object-[center_40%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-white/10 to-transparent" />
        <div className="site-inner relative flex min-h-[420px] items-center md:min-h-[560px] lg:min-h-[680px]">
          <div className="max-w-xl py-16">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-ppc-accent">
              Ready when you are
            </p>
            <h2 className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-ppc-primary md:text-[48px]">
              Private care starts with one tap
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ppc-primary/80">
              Browse clinician-guided paths, add a plan, and request a review —
              from home, on your time.
            </p>
            <span className="motion-press mt-7 inline-flex items-center gap-2 rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition group-hover:bg-ppc-dark">
              Explore treatments
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
