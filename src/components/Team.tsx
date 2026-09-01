"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import TeamCarousel from "@/components/TeamCarousel";
import { clinicians, expertPoints } from "@/lib/content";

export default function Team() {
  return (
    <section id="team" className="site-section bg-ppc-mint">
      <div className="site-inner">
        <div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <Reveal variant="blur-up">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
                Clinicians
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="max-w-xl font-display text-[32px] font-[400] leading-[1.08] tracking-[-0.02em] text-ppc-primary md:text-[46px]">
                Guided by top health professionals
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} variant="fade-up">
            <p className="max-w-md text-[16px] leading-relaxed text-ppc-primary md:justify-self-end md:text-[17px]">
              Licensed physicians, pharmacists, and nurse practitioners review
              every plan — so care stays clinical, private, and easy to follow.
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade-up">
        <div className="mb-12 grid gap-px overflow-hidden rounded-2xl border border-ppc-border bg-ppc-border md:mb-14 md:grid-cols-3">
          {expertPoints.map((point, i) => (
              <div key={point.title} className="h-full bg-white p-6 md:p-8">
                <p className="mb-4 font-display text-[13px] font-semibold tracking-[0.14em] text-ppc-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[18px] font-semibold text-ppc-primary md:text-[20px]">
                  {point.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ppc-primary/85 md:text-[15px]">
                  {point.description}
                </p>
              </div>
          ))}
        </div>
        </Reveal>

        <TeamCarousel people={clinicians} />

        <Reveal delay={180} className="mt-10">
          <Link
            href="/about#leadership"
            className="motion-press inline-flex items-center gap-2 rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
          >
            Meet our team
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
