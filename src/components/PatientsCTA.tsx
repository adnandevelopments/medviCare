"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { media } from "@/lib/content";

export default function PatientsCTA() {
  return (
    <section className="site-section bg-ppc-mint">
      <div className="site-inner">
        <Reveal variant="scale-in">
          <div className="group grid overflow-hidden rounded-2xl bg-ppc-dark md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[260px] overflow-hidden md:min-h-[420px]">
              <Image
                src={media.patients}
                alt="Person reviewing private care from home"
                fill
                className="motion-image object-cover object-[center_35%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ppc-dark/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-ppc-dark/20" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent-soft">
                Patients
              </p>
              <h2 className="font-display text-[28px] font-[400] leading-[1.12] text-white md:text-[42px]">
                Better care for a healthier, happier you
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70 md:text-[16px]">
                Private, clinician-guided plans for the health goals people
                often put off — with support that stays with you after day one.
              </p>
              <Link
                href="/treatments"
                className="motion-press mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-accent-soft"
              >
                Explore all treatments
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
