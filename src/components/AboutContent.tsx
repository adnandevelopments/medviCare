"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ClinicianModal from "@/components/ClinicianModal";
import { motion } from "@/components/Motion";
import Reveal from "@/components/Reveal";
import {
  aboutPillars,
  faqs,
  leadershipTeam,
  media,
  medicalAdvisory,
  pharmacyAdvisory,
  type Clinician,
} from "@/lib/content";

function AdvisoryCard({ person }: { person: Clinician }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const close = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") setOpen(false);
        return;
      }
      if (!cardRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div
      ref={cardRef}
      className="group relative min-h-[340px] w-full overflow-hidden rounded-3xl bg-ppc-dark md:min-h-[360px]"
      onClick={() => {
        if (!open) setOpen(true);
      }}
    >
      <Image
        src={person.image}
        alt={person.name}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ppc-dark via-ppc-dark/35 to-transparent" />

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? `Hide ${person.name} bio` : `Read ${person.name} bio`}
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        className={`absolute inset-0 z-10 flex flex-col justify-start bg-ppc-dark/92 p-5 text-left text-white appearance-none transition-transform duration-500 ease-out md:p-6 ${
          open ? "translate-y-0" : "translate-y-[64%]"
        }`}
      >
        <div className="pr-14">
          <p className="font-display text-[17px] font-semibold leading-tight md:text-[18px]">
            {person.name}
          </p>
          <p className="mt-1 text-[13px] text-white/75">{person.credentials}</p>
          <p className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.12em] text-ppc-accent-soft">
            {person.role}
          </p>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            open ? "mt-4 max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="pr-1 text-[13px] leading-relaxed text-white/82 md:text-[14px]">
            {person.bio}
          </p>
        </div>
      </button>

      <button
        type="button"
        aria-label={open ? `Hide ${person.name} bio` : `Read ${person.name} bio`}
        onClick={() => setOpen((v) => !v)}
        className="absolute bottom-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-ppc-accent text-[22px] leading-none text-white shadow-[0_10px_24px_-10px_rgba(61,82,160,0.8)] transition-transform duration-300 hover:bg-ppc-accent-soft"
        style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
      >
        +
      </button>
    </div>
  );
}

function AdvisoryBand({
  id,
  title,
  people,
  tinted = false,
}: {
  id: string;
  title: string;
  people: Clinician[];
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`site-section scroll-mt-[88px] ${tinted ? "bg-ppc-mint" : "bg-background"}`}
    >
      <div className="site-inner">
        <Reveal>
          <h2 className="mb-8 text-center font-display text-[22px] capitalize leading-tight text-ppc-primary md:mb-12 md:text-[30px]">
            {title}
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {people.map((person, i) => (
            <Reveal key={person.name} delay={40 + i * 40} variant="rise">
              <AdvisoryCard person={person} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [selected, setSelected] = useState<Clinician | null>(null);
  const [mission, goal, focus] = aboutPillars;

  return (
    <>
      {/* Mission — intro copy, then cinematic media (reference uses a video here) */}
      <section id="mission" className="site-section">
        <div className="site-inner">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="max-w-[720px]"
          >
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent md:text-[13px]">
              {mission.label}
            </p>
            <h2 className="font-display text-[32px] font-[400] leading-[1.12] tracking-[-0.02em] text-ppc-primary md:text-[48px]">
              {mission.title}
            </h2>
            <p className="mt-4 max-w-[591px] text-[16px] leading-relaxed text-ppc-primary/82 md:text-[18px]">
              {mission.body}
            </p>
          </motion.div>

          <motion.div
            className="group relative mt-8 overflow-hidden rounded-2xl md:mt-10 md:h-[560px]"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <div className="relative aspect-[16/10] w-full md:absolute md:inset-0 md:aspect-auto">
              <Image
                src="/images/hero5.jpg"
                alt="medviCare care experience"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 1180px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ppc-dark/35 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Goal — text left, tall portrait right */}
      <section id="goal" className="site-section bg-ppc-mint">
        <div className="site-inner grid items-center gap-10 md:grid-cols-[1fr_0.95fr] md:gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent md:text-[13px]">
              {goal.label}
            </p>
            <h2 className="max-w-[640px] font-display text-[32px] font-[400] leading-[1.12] tracking-[-0.02em] text-ppc-primary md:text-[48px]">
              {goal.title}
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-ppc-primary/82 md:text-[18px]">
              {goal.body}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl md:min-h-[560px]">
              <Image
                src={media.heroPeople}
                alt="Person using medviCare-style private care from home"
                fill
                className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ppc-dark/25 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Focus + Leadership — centred intro, then portraits */}
      <section id="leadership" className="site-section scroll-mt-[88px]">
        <div className="site-inner">
          <div className="mx-auto mb-12 max-w-[680px] text-center md:mb-16">
            <Reveal variant="blur-up">
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent md:text-[13px]">
                {focus.label}
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="font-display text-[32px] font-[400] leading-[1.12] tracking-[-0.02em] text-ppc-primary md:text-[48px]">
                {focus.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-4 max-w-[632px] text-[16px] leading-relaxed text-ppc-primary/82 md:text-[18px]">
                {focus.body}
              </p>
            </Reveal>
          </div>

          <Reveal>
            <h3 className="mb-2 text-center font-display text-[22px] capitalize text-ppc-primary md:mb-3 md:text-[30px]">
              Leadership team
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-center text-[14px] text-ppc-primary/75 md:mb-10">
              Sample profiles that show the kinds of licensed professionals involved.
              Your clinician is confirmed after intake.
            </p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {leadershipTeam.map((member, i) => (
              <Reveal key={member.name} delay={80 + i * 90} variant="fade-up">
                <button
                  type="button"
                  onClick={() => setSelected(member)}
                  className="motion-card group w-full appearance-none text-center"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-[22px] font-semibold leading-tight text-ppc-primary md:text-[24px]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium text-ppc-primary md:text-[16px]">
                    {member.credentials}
                  </p>
                  <p className="mt-1 text-[14px] text-ppc-primary/65 md:text-[16px]">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[14px] text-ppc-primary underline decoration-ppc-border underline-offset-4 transition-colors group-hover:text-ppc-accent group-hover:decoration-ppc-accent">
                    Read more
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AdvisoryBand
        id="medical-advisory"
        title="Medical advisory team"
        people={medicalAdvisory}
      />
      <AdvisoryBand
        id="pharmacy-advisory"
        title="Pharmaceutical advisory team"
        people={pharmacyAdvisory}
        tinted
      />

      {/* FAQ — two-column like the reference, with Meet grouping + CTA bar */}
      <section id="about-faqs" className="site-section">
        <div className="site-inner">
          <div className="mb-8 md:mb-12">
            <h2 className="font-display text-[36px] font-[400] leading-[1.12] tracking-[-0.02em] text-ppc-primary md:text-[48px]">
              Straight answers before you begin
            </h2>
            <p className="mt-3 text-[16px] text-ppc-primary/80 md:text-[18px]">
              How the platform, the team, and your privacy actually work
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:gap-16">
            <h3 className="shrink-0 font-display text-[20px] font-medium leading-snug text-ppc-primary md:max-w-[333px] md:pt-4 md:text-[24px]">
              About the platform
            </h3>
            <div className="w-full min-w-0 flex-1">
              <div className="divide-y divide-ppc-border border-y border-ppc-border">
                {faqs.map((item, i) => {
                  const isOpen = faqOpen === i;
                  return (
                    <div key={item.q}>
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-4 py-5 text-left md:py-6"
                        onClick={() => setFaqOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                      >
                        <span className="text-[16px] font-medium text-ppc-primary md:text-[18px]">
                          {item.q}
                        </span>
                        <span
                          className={`mt-0.5 shrink-0 text-[22px] leading-none text-ppc-accent transition-transform duration-300 ${
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
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-ppc-border bg-ppc-mint px-5 py-5 sm:mt-16 sm:flex-row sm:px-6 sm:py-5 md:mt-20">
            <p className="text-center text-[18px] font-medium leading-snug text-ppc-primary sm:text-left md:text-[20px]">
              Still looking for a detail we missed?
            </p>
            <Link
              href="/faqs"
              className="motion-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark sm:w-auto"
            >
              Open the full FAQ
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <ClinicianModal person={selected} onClose={() => setSelected(null)} />
    </>
  );
}
