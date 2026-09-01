"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, media } from "@/lib/content";
import { motion } from "@/components/Motion";

export default function HeroTreatments() {
  return (
    <section className="relative -mt-[72px] min-h-svh overflow-clip bg-ppc-dark">
      <Image
        src={media.heroHome}
        alt="medviCare — private online care"
        fill
        priority
        className="object-cover object-[78%_center] md:object-[70%_center]"
        sizes="100vw"
        quality={70}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/25" />

      <div className="site-inner relative flex min-h-svh flex-col justify-center pb-16 pt-28 md:pb-20">
        <div className="max-w-[620px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-ppc-accent-soft" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
              {brand.name}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-[64px] lg:text-[72px]">
              Private care.
              <br />
              Practical plans.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-white md:text-[18px]">
              Licensed clinicians, personalized plans, and discreet delivery —
              without the waiting room.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
          >
            {[
              "Personalized treatment plans",
              "Unlimited medical support",
              "100% online & discreet",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-[13px] font-medium text-white/90 md:text-[14px]"
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ppc-accent text-[10px] text-white"
                  aria-hidden
                >
                  ✓
                </span>
                {item}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-8"
          >
            <Link
              href="/treatments"
              className="motion-press inline-flex items-center gap-2 rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
            >
              Explore care
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
