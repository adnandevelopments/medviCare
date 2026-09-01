"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

export const CONTACT_TOPICS = [
  {
    id: "plan",
    label: "Care plan",
    hint: "Treatment, dosing, eligibility",
    routesTo: "Care support",
  },
  {
    id: "order",
    label: "Order & delivery",
    hint: "Tracking, packaging, delays",
    routesTo: "Care support",
  },
  {
    id: "account",
    label: "Account & portal",
    hint: "Login, messages, refills",
    routesTo: "Care support",
  },
  {
    id: "billing",
    label: "Billing",
    hint: "Charges, receipts, coverage",
    routesTo: "Care support",
  },
  {
    id: "press",
    label: "Press & partners",
    hint: "Media and collaboration",
    routesTo: "Press desk",
  },
  {
    id: "other",
    label: "Something else",
    hint: "We’ll route it for you",
    routesTo: "Care support",
  },
] as const;

export type ContactTopicId = (typeof CONTACT_TOPICS)[number]["id"];

const MAX_MESSAGE = 800;

const COUNTRIES = [
  { iso: "ca", name: "Canada", dial: "+1" },
  { iso: "us", name: "United States", dial: "+1" },
  { iso: "gb", name: "United Kingdom", dial: "+44" },
  { iso: "au", name: "Australia", dial: "+61" },
  { iso: "in", name: "India", dial: "+91" },
  { iso: "pk", name: "Pakistan", dial: "+92" },
  { iso: "bd", name: "Bangladesh", dial: "+880" },
  { iso: "ae", name: "United Arab Emirates", dial: "+971" },
  { iso: "sa", name: "Saudi Arabia", dial: "+966" },
  { iso: "ph", name: "Philippines", dial: "+63" },
  { iso: "ng", name: "Nigeria", dial: "+234" },
  { iso: "za", name: "South Africa", dial: "+27" },
  { iso: "de", name: "Germany", dial: "+49" },
  { iso: "fr", name: "France", dial: "+33" },
  { iso: "mx", name: "Mexico", dial: "+52" },
] as const;

type CountryIso = (typeof COUNTRIES)[number]["iso"];

function Flag({ iso }: { iso: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      alt=""
      width={20}
      height={15}
      className="h-[15px] w-5 rounded-[2px] object-cover"
    />
  );
}

function PhoneField({
  phone,
  country,
  onPhoneChange,
  onCountryChange,
}: {
  phone: string;
  country: CountryIso;
  onPhoneChange: (value: string) => void;
  onCountryChange: (iso: CountryIso) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = COUNTRIES.find((c) => c.iso === country) ?? COUNTRIES[0];

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative w-full min-w-0">
      <div className="flex min-w-0 overflow-hidden rounded-xl border border-ppc-border bg-background transition-all focus-within:border-ppc-accent focus-within:ring-4 focus-within:ring-ppc-accent/15 hover:border-ppc-accent/70">
        <button
          type="button"
          aria-label="Country code"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 items-center gap-1.5 border-r border-ppc-border px-2.5 py-3 text-sm text-ppc-primary hover:bg-ppc-mint sm:gap-2 sm:px-3"
        >
          <Flag iso={selected.iso} />
          <span className="font-medium">{selected.dial}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M2.5 4.5L6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          type="tel"
          name="phone"
          autoComplete="tel-national"
          inputMode="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value.replace(/[^\d\s()-]/g, ""))}
          placeholder="416 555 0123"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-ppc-primary outline-none placeholder:text-ppc-primary/35 sm:px-4"
        />
      </div>
      <input type="hidden" name="phoneCountry" value={`${selected.iso}:${selected.dial}`} />

      {open ? (
        <ul className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-ppc-border bg-white py-1 shadow-[0_16px_40px_-20px_rgba(18,26,56,0.4)]">
          {COUNTRIES.map((item) => {
            const active = item.iso === selected.iso;
            return (
              <li key={item.iso}>
                <button
                  type="button"
                  onClick={() => {
                    onCountryChange(item.iso);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-[13px] ${
                    active
                      ? "bg-ppc-mint font-medium text-ppc-primary"
                      : "text-ppc-primary hover:bg-ppc-mint/70"
                  }`}
                >
                  <Flag iso={item.iso} />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-ppc-primary/65">{item.dial}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

const fieldClass =
  "w-full min-w-0 max-w-full rounded-xl border bg-background px-3 py-3 text-sm text-ppc-primary outline-none transition-all placeholder:text-ppc-primary/35 hover:border-ppc-accent/70 focus:border-ppc-accent focus:ring-4 focus:ring-ppc-accent/15 sm:px-4";

function fieldBorder(error?: string) {
  return error ? "border-red-400/80" : "border-ppc-border";
}

export default function ContactForm({
  topic,
  onTopicChange,
}: {
  topic?: ContactTopicId | "";
  onTopicChange?: (id: ContactTopicId | "") => void;
}) {
  const [sentName, setSentName] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<CountryIso>("ca");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [internalTopic, setInternalTopic] = useState<ContactTopicId | "">("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const activeTopic = topic ?? internalTopic;
  const setTopic = (id: ContactTopicId) => {
    onTopicChange?.(id);
    setInternalTopic(id);
  };

  const selected = CONTACT_TOPICS.find((item) => item.id === activeTopic);
  const showOrder = activeTopic === "order";

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Add your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Use a valid email so we can reply.";
    }
    if (!activeTopic) next.topic = "Pick a topic so we can route this.";
    if (message.trim().length < 12) {
      next.message = "A little more detail helps us help you.";
    }
    if (message.length > MAX_MESSAGE) next.message = "Keep it under 800 characters.";
    return next;
  }, [name, email, activeTopic, message]);

  const show = (key: string) =>
    Boolean((touched[key] || submitted) && errors[key]);

  const reset = () => {
    setSentName("");
    setName("");
    setEmail("");
    setPhone("");
    setCountry("ca");
    setOrderId("");
    setMessage("");
    setInternalTopic("");
    onTopicChange?.("");
    setTouched({});
    setSubmitted(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSentName(name.trim());
    }, 700);
  };

  if (sentName) {
    return (
      <div
        id="contact-form"
        className="scroll-mt-[88px] w-full min-w-0 max-w-full rounded-2xl border border-ppc-accent/30 bg-ppc-surface p-4 shadow-[0_16px_40px_-28px_rgba(18,26,56,0.35)] sm:p-6 md:p-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ppc-accent text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.2 4.2L19 7.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-5 font-display text-[26px] text-ppc-primary md:text-[30px]">
          Thanks, {sentName.split(" ")[0]}.
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ppc-primary/80">
          Your note is staged for the{" "}
          <span className="font-medium text-ppc-primary">
            {selected?.routesTo ?? "care team"}
          </span>
          . We’ll reply at <span className="font-medium text-ppc-primary">{email}</span>{" "}
          within one business day.
        </p>
        <ul className="mt-6 space-y-2 text-[14px] text-ppc-primary/80">
          <li>Keep an eye on your inbox — including spam.</li>
          <li>Need care now? Start an intake while you wait.</li>
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="motion-press rounded-full bg-ppc-accent px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
          >
            Send another
          </button>
          <a
            href="/treatments"
            className="motion-press inline-flex items-center rounded-full border border-ppc-border px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ppc-primary hover:border-ppc-accent"
          >
            Browse treatments
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      className="@container scroll-mt-[88px] w-full min-w-0 max-w-full space-y-5 overflow-x-clip rounded-2xl border border-ppc-border bg-ppc-surface p-4 shadow-[0_16px_40px_-28px_rgba(18,26,56,0.35)] sm:p-6 md:p-8"
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <h2 className="font-display text-[26px] text-ppc-primary md:text-[30px]">
          Send a message
        </h2>
        <p className="mt-1 text-[14px] text-ppc-primary/78">
          Pick a topic, add a few details, and we’ll route it.
        </p>
      </div>

      <fieldset>
        <legend className="mb-2.5 block text-[12px] font-medium text-ppc-primary/80">
          Topic
        </legend>
        <div className="flex max-w-full flex-wrap gap-2">
          {CONTACT_TOPICS.map((item) => {
            const on = activeTopic === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTopic(item.id)}
                className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all ${
                  on
                    ? "border-ppc-accent bg-ppc-accent text-white shadow-[0_8px_20px_-12px_rgba(61,82,160,0.8)]"
                    : "border-ppc-border bg-background text-ppc-primary hover:border-ppc-accent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {show("topic") ? (
          <p className="mt-2 text-[12px] text-red-600">{errors.topic}</p>
        ) : selected ? (
          <p className="mt-2 text-[12px] text-ppc-primary/70">
            Routes to {selected.routesTo} · {selected.hint}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-4 @min-[420px]:grid-cols-2">
        <label className="block min-w-0">
          <span className="mb-1.5 block text-[12px] font-medium text-ppc-primary/80">
            Full name
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Alex Morgan"
            className={`${fieldClass} ${fieldBorder(show("name") ? errors.name : "")}`}
          />
          {show("name") ? (
            <p className="mt-1.5 text-[12px] text-red-600">{errors.name}</p>
          ) : null}
        </label>
        <label className="block min-w-0">
          <span className="mb-1.5 block text-[12px] font-medium text-ppc-primary/80">
            Email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="you@email.com"
            className={`${fieldClass} ${fieldBorder(show("email") ? errors.email : "")}`}
          />
          {show("email") ? (
            <p className="mt-1.5 text-[12px] text-red-600">{errors.email}</p>
          ) : null}
        </label>
      </div>

      <div className={`grid min-w-0 gap-4 ${showOrder ? "@min-[420px]:grid-cols-2" : ""}`}>
        <label className="block min-w-0">
          <span className="mb-1.5 block text-[12px] font-medium text-ppc-primary/80">
            Phone <span className="font-normal text-ppc-primary/50">(optional)</span>
          </span>
          <PhoneField
            phone={phone}
            country={country}
            onPhoneChange={setPhone}
            onCountryChange={setCountry}
          />
        </label>
        {showOrder ? (
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-ppc-primary/80">
              Order ID <span className="font-normal text-ppc-primary/50">(if you have one)</span>
            </span>
            <input
              type="text"
              name="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. MV-10482"
              className={`${fieldClass} border-ppc-border`}
            />
          </label>
        ) : null}
      </div>

      <label className="block">
        <span className="mb-1.5 flex items-center justify-between text-[12px] font-medium text-ppc-primary/80">
          How can we help?
          <span
            className={`font-normal ${
              message.length > MAX_MESSAGE ? "text-red-600" : "text-ppc-primary/50"
            }`}
          >
            {message.length}/{MAX_MESSAGE}
          </span>
        </span>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          placeholder="Share what you need — order issues, plan questions, or account help."
          rows={5}
          className={`${fieldClass} resize-y ${fieldBorder(show("message") ? errors.message : "")}`}
        />
        {show("message") ? (
          <p className="mt-1.5 text-[12px] text-red-600">{errors.message}</p>
        ) : null}
      </label>

      <p className="rounded-xl bg-ppc-mint px-4 py-3 text-[13px] leading-relaxed text-ppc-primary/80">
        This form is for support, not emergencies. If you feel unsafe or need
        urgent care, call 911.
      </p>

      <button
        type="submit"
        disabled={busy}
        className="motion-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark disabled:opacity-70 sm:w-auto"
      >
        {busy ? "Sending…" : "Submit message"}
        {!busy ? <span aria-hidden>→</span> : null}
      </button>
    </form>
  );
}
