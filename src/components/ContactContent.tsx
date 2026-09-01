"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ContactForm, { type ContactTopicId } from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { brand } from "@/lib/content";

const quickHelp = [
  {
    id: "plan" as const,
    title: "A plan or medication",
    note: "Dosing, side effects, or whether a path is right for you.",
  },
  {
    id: "order" as const,
    title: "An order in transit",
    note: "Tracking, delays, packaging, or a missing shipment.",
  },
  {
    id: "account" as const,
    title: "Portal or account",
    note: "Login, messages, refills, or updating your details.",
  },
  {
    id: "billing" as const,
    title: "A charge on your statement",
    note: "Receipts, descriptors, or a billing question.",
  },
];

const contactFaqs = [
  {
    q: "How fast do you reply?",
    a: "Most notes get a response within one business day, Monday to Friday. After hours, your message waits in the queue and we pick it up when the team is back.",
  },
  {
    q: "Can this replace a clinician visit?",
    a: "No. Support can help with the platform, shipping, and account questions. Treatment decisions still go through a licensed clinician via intake.",
  },
  {
    q: "What if I already have an active plan?",
    a: "Mention that in your message (and an order ID if you have one). We’ll route it to the people already involved in your care.",
  },
];

function supportIsOpen(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const mins = hour * 60 + minute;
  const isWeekday = weekday !== "Sat" && weekday !== "Sun";
  return isWeekday && mins >= 9 * 60 && mins < 18 * 60;
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5h16v11H4v-11z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 7.2L12 13l7.5-5.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPress() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7h14v12H5V7zM8 7V5.5A2.5 2.5 0 0110.5 3h3A2.5 2.5 0 0116 5.5V7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 12h8M8 15.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 005 9.8C5 14.8 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.8" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function ContactContent() {
  const [topic, setTopic] = useState<ContactTopicId | "">("");
  const [deskOpen, setDeskOpen] = useState<boolean | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    setDeskOpen(supportIsOpen());
    const id = window.setInterval(() => setDeskOpen(supportIsOpen()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const pickTopic = (id: ContactTopicId) => {
    setTopic(id);
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const channels = [
    {
      title: "Care support",
      detail: brand.email,
      note: "Plans, prescriptions, shipping, and portal help.",
      icon: <IconMail />,
      href: `mailto:${brand.email}`,
    },
    {
      title: "Press & partners",
      detail: brand.press,
      note: "Media requests and collaboration.",
      icon: <IconPress />,
      href: `mailto:${brand.press}`,
    },
    {
      title: "Service area",
      detail: brand.address,
      note: "Clinician-guided care with discreet delivery.",
      icon: <IconMap />,
      href: "/treatments",
    },
  ];

  return (
    <>
      <section className="border-b border-ppc-border bg-ppc-mint py-6 md:py-7">
        <div className="site-inner flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <span
              className={`relative flex h-2.5 w-2.5 ${
                deskOpen ? "text-emerald-500" : "text-ppc-accent"
              }`}
              aria-hidden
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-current" />
            </span>
            <p className="min-w-0 text-[14px] font-medium text-ppc-primary">
              {deskOpen == null
                ? "Checking support hours…"
                : deskOpen
                  ? "The desk is in — we usually reply the same business day."
                  : "We’re away right now. Messages wait in queue until 9am ET."}
            </p>
          </div>
          <p className="shrink-0 text-[13px] text-ppc-primary/70">
            Mon–Fri, 9am–6pm ET · Privacy-minded handling
          </p>
        </div>
      </section>

      <section className="site-section overflow-x-clip">
        <div className="site-inner grid min-w-0 gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start xl:gap-12">
          <div className="min-w-0 w-full">
            <Reveal>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
                Reach us
              </p>
              <h2 className="font-display text-[30px] text-ppc-primary md:text-[36px]">
                Write the team that can actually help.
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ppc-primary/80">
                Tap an email to open your mail app. Prefer a form? Use the
                message box below, or on the right on larger screens.
              </p>
            </Reveal>

            <div className="mt-8 space-y-3">
              {channels.map((channel, i) => (
                <Reveal key={channel.title} delay={80 + i * 70} variant="fade-up">
                  <Link
                    href={channel.href}
                    className="group relative block overflow-hidden rounded-2xl bg-ppc-accent p-5 text-white transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ppc-accent-soft via-transparent to-ppc-dark opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="relative flex items-start gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                        {channel.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/75">
                          {channel.title}
                        </span>
                        <span className="mt-1 block break-all text-[16px] font-medium text-white underline-offset-4 group-hover:underline">
                          {channel.detail}
                        </span>
                        <span className="mt-1 block text-[13px] text-white/80">
                          {channel.note}
                        </span>
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="min-w-0 w-full">
            <Reveal delay={80} variant="fade-up" className="block w-full min-w-0">
              <ContactForm
                topic={topic}
                onTopicChange={(id) => setTopic(id)}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="site-section-sm border-t border-ppc-border">
        <div className="site-inner">
          <Reveal variant="blur-up">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
              Start here
            </p>
            <h2 className="max-w-xl font-display text-[28px] leading-[1.12] text-ppc-primary md:text-[36px]">
              What do you need help with?
            </h2>
            <p className="mt-3 max-w-lg text-[15px] text-ppc-primary/80">
              Tap a card to open the form with the right topic already selected.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickHelp.map((item, i) => (
              <Reveal key={item.id} delay={60 + i * 70} variant="rise">
                <button
                  type="button"
                  onClick={() => pickTopic(item.id)}
                  className={`motion-card h-full w-full rounded-2xl border-2 p-5 text-left transition-all ${
                    topic === item.id
                      ? "border-ppc-accent bg-ppc-mint"
                      : "border-ppc-accent/30 bg-ppc-surface hover:border-ppc-accent"
                  }`}
                >
                  <p className="font-display text-[18px] font-medium text-ppc-primary">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ppc-primary/78">
                    {item.note}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-ppc-accent">
                    Write about this
                    <span aria-hidden>→</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section border-t border-ppc-border bg-ppc-mint">
        <div className="site-inner grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
              Before you write
            </p>
            <h2 className="font-display text-[28px] text-ppc-primary md:text-[36px]">
              A few things people ask first
            </h2>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ppc-primary/80">
              If you already know you need a clinician, skip the inbox and start
              an intake.
            </p>
            <Link
              href="/treatments"
              className="motion-press mt-6 inline-flex items-center gap-2 rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
            >
              Start an intake
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="divide-y divide-ppc-border border-y border-ppc-border">
            {contactFaqs.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
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
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
    </>
  );
}
