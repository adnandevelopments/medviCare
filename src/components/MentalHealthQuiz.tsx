"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { getProduct } from "@/lib/content";
import { MH_PROVINCES } from "@/lib/mentalHealth";

type Choice = { id: string; label: string };

type Step =
  | { kind: "eligibility"; id: "eligibility"; question: string }
  | { kind: "question"; id: string; question: string; choices: Choice[] }
  | { kind: "blocked"; id: "blocked"; reason: "age" | "province" | "crisis" }
  | { kind: "result"; id: "result" };

const steps: Step[] = [
  {
    kind: "eligibility",
    id: "eligibility",
    question: "Let’s make sure you’re eligible for treatment",
  },
  {
    kind: "question",
    id: "concern",
    question: "What are you looking for support with?",
    choices: [
      { id: "anxiety", label: "Anxiety" },
      { id: "depression", label: "Depression" },
      { id: "both", label: "Both anxiety and depression" },
      { id: "unsure", label: "Not sure — I want guidance" },
    ],
  },
  {
    kind: "question",
    id: "diagnosed",
    question: "Have you been diagnosed with anxiety or depression by a clinician?",
    choices: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
      { id: "unsure", label: "Not sure" },
    ],
  },
  {
    kind: "question",
    id: "meds",
    question: "Are you currently taking medication for mental health?",
    choices: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
      { id: "past", label: "I used to, but not now" },
    ],
  },
  {
    kind: "question",
    id: "duration",
    question: "How long have you been dealing with this?",
    choices: [
      { id: "under-3", label: "Less than 3 months" },
      { id: "3-12", label: "3 to 12 months" },
      { id: "over-12", label: "More than a year" },
    ],
  },
  {
    kind: "question",
    id: "impact",
    question: "How much is this affecting your daily life?",
    choices: [
      { id: "mild", label: "Mild — noticeable but manageable" },
      { id: "moderate", label: "Moderate — it often gets in the way" },
      { id: "severe", label: "Severe — it’s hard to function" },
    ],
  },
  {
    kind: "question",
    id: "prior",
    question: "Have you tried treatment for this before?",
    choices: [
      { id: "never", label: "No, this is my first time seeking care" },
      { id: "therapy", label: "Yes — therapy or counselling" },
      { id: "medication", label: "Yes — medication" },
      { id: "both", label: "Yes — both" },
    ],
  },
  {
    kind: "question",
    id: "crisis",
    question: "Are you in crisis right now?",
    choices: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes — I need help now" },
    ],
  },
  { kind: "result", id: "result" },
];

function parseBirthday(value: string): Date | null {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!iso) return null;
  const d = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function isAtLeast18(date: Date) {
  const eighteenth = new Date(date);
  eighteenth.setFullYear(date.getFullYear() + 18);
  return eighteenth <= new Date();
}

export default function MentalHealthQuiz({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [birthday, setBirthday] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState<"age" | "province" | "crisis" | null>(
    null,
  );

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setAnswers({});
    setBirthday("");
    setProvince("");
    setError("");
    setBlocked(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const step: Step = blocked
    ? { kind: "blocked", id: "blocked", reason: blocked }
    : steps[stepIndex];

  const progress = useMemo(() => {
    if (blocked === "crisis") return 90;
    if (blocked) return 15;
    if (step.kind === "result") return 100;
    if (stepIndex === 0) return 15;
    return Math.round(((stepIndex + 1) / steps.length) * 100);
  }, [blocked, step, stepIndex]);

  if (!open) return null;

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));

  const submitEligibility = () => {
    const date = parseBirthday(birthday);
    if (!date) {
      setError("Enter a valid birth date.");
      return;
    }
    if (!isAtLeast18(date)) {
      setError("Must be 18 years old or above");
      setBlocked("age");
      return;
    }
    if (!province) {
      setError("Please select your province.");
      return;
    }
    if (!MH_PROVINCES.includes(province as (typeof MH_PROVINCES)[number])) {
      setBlocked("province");
      return;
    }
    setError("");
    setAnswers((prev) => ({ ...prev, birthday, province }));
    goNext();
  };

  const pick = (choiceId: string) => {
    if (step.kind !== "question") return;
    setAnswers((prev) => ({ ...prev, [step.id]: choiceId }));
    if (step.id === "crisis" && choiceId === "yes") {
      window.setTimeout(() => setBlocked("crisis"), 160);
      return;
    }
    window.setTimeout(goNext, 160);
  };

  const goBack = () => {
    if (blocked) {
      setBlocked(null);
      setError("");
      return;
    }
    if (stepIndex === 0) {
      onClose();
      return;
    }
    setError("");
    setStepIndex((i) => i - 1);
  };

  const concernLabel =
    answers.concern === "anxiety"
      ? "anxiety support"
      : answers.concern === "depression"
        ? "depression support"
        : answers.concern === "both"
          ? "anxiety and depression support"
          : "mental health support";

  const consult = getProduct("mh-consult");
  const medication = getProduct("mh-medication");
  const suggestion =
    answers.meds === "yes" || answers.prior === "medication" || answers.prior === "both"
      ? medication ?? consult
      : consult ?? medication;

  return (
    <div className="fixed inset-0 z-[11000] overflow-y-auto bg-background text-ppc-primary">
      <div className="mx-auto flex min-h-full w-full max-w-[560px] flex-col px-5 pb-10 pt-5 sm:px-8">
        <div className="relative mb-7 flex h-10 items-center justify-center">
          <button
            type="button"
            onClick={goBack}
            className="absolute left-0 inline-flex h-10 w-10 items-center justify-center text-ppc-primary/88 hover:text-ppc-accent"
            aria-label="Back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 4.5L7 10l5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="font-display text-[26px] font-semibold tracking-tight">
            <span className="text-ppc-primary">medvi</span>
            <span className="text-ppc-accent-soft">Care</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 inline-flex min-h-11 items-center text-[13px] font-medium text-ppc-primary/72 hover:text-ppc-primary"
          >
            Close
          </button>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-[12px] font-medium text-ppc-accent">
            {progress}% complete
          </p>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-ppc-mint">
            <div
              className="h-full rounded-full bg-ppc-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step.kind === "eligibility" ? (
          <>
            <h1 className="mb-8 text-center font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>

            <label className="mb-6 block">
              <span className="mb-2 block text-[14px] font-medium text-ppc-accent">
                1. My birth date is
              </span>
              <input
                type="date"
                value={birthday}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => {
                  setBirthday(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 text-[16px] text-ppc-primary outline-none transition-colors hover:border-ppc-accent focus:border-ppc-accent [color-scheme:light]"
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-2 block text-[14px] font-medium text-ppc-accent">
                2. We currently provide mental health care in Alberta, British
                Columbia, Manitoba, Ontario, Quebec, and Saskatchewan. Please
                select your province
              </span>
              <select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 text-[16px] text-ppc-primary outline-none transition-colors hover:border-ppc-accent focus:border-ppc-accent"
              >
                <option value="">Select your province</option>
                {MH_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            {error ? (
              <p className="mb-3 text-[13px] font-medium text-red-500">{error}</p>
            ) : null}

            <button
              type="button"
              onClick={submitEligibility}
              disabled={!birthday || !province}
              className="mt-4 w-full rounded-full bg-ppc-accent px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-ppc-accent-soft disabled:cursor-not-allowed disabled:bg-ppc-mint disabled:text-ppc-primary/70"
            >
              Continue
            </button>
          </>
        ) : null}

        {step.kind === "question" ? (
          <>
            <h1 className="mb-6 font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>
            <div className="flex flex-col gap-3">
              {step.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => pick(choice.id)}
                  className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 text-left text-[16px] font-semibold text-ppc-primary transition hover:border-ppc-accent/45 hover:bg-ppc-mint"
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step.kind === "blocked" ? (
          <div className="rounded-2xl border border-ppc-border bg-ppc-surface p-6 md:p-8">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent">
              {step.reason === "crisis" ? "Support now" : "Eligibility"}
            </p>
            <h1 className="font-display text-[28px] font-[400] text-ppc-primary md:text-[32px]">
              {step.reason === "age"
                ? "Must be 18 years old or above"
                : step.reason === "province"
                  ? "Service isn’t available in your province yet"
                  : "Please reach someone now"}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ppc-primary/82">
              {step.reason === "age"
                ? "Mental health care through this pathway is only available for adults 18+."
                : step.reason === "province"
                  ? "We currently support Alberta, British Columbia, Manitoba, Ontario, Quebec, and Saskatchewan."
                  : "If you are in crisis, call or text 988 (Suicide & Crisis Lifeline). If you are in immediate danger, call local emergency services."}
            </p>
            {step.reason === "crisis" ? (
              <a
                href="tel:988"
                className="mt-8 inline-flex rounded-full bg-ppc-accent px-6 py-3.5 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
              >
                Call 988
              </a>
            ) : (
              <button
                type="button"
                onClick={goBack}
                className="mt-8 inline-flex rounded-full bg-ppc-accent px-6 py-3.5 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
              >
                Go back
              </button>
            )}
          </div>
        ) : null}

        {step.kind === "result" && suggestion ? (
          <div className="rounded-2xl border border-ppc-border bg-ppc-surface p-6 md:p-8">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent">
              100% complete · Suggested next step
            </p>
            <h1 className="font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[32px]">
              We suggest {suggestion.name}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ppc-primary/82">
              Based on your answers, a licensed clinician can review{" "}
              {concernLabel}
              {answers.province ? ` in ${answers.province}` : ""}. This is not a
              diagnosis or a prescription.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-ppc-border bg-white">
              <div className="relative mx-auto aspect-square w-full max-w-[220px]">
                <Image
                  src={suggestion.image}
                  alt={suggestion.name}
                  fill
                  className="object-contain p-6"
                  sizes="220px"
                />
              </div>
              <div className="border-t border-ppc-border px-5 py-4 text-center">
                <p className="text-[17px] font-semibold text-ppc-primary">
                  {suggestion.name}
                </p>
                <p className="mt-1 text-[13px] text-ppc-primary/80">
                  {suggestion.blurb}
                </p>
                <p className="mt-2 text-[13px] font-medium text-ppc-accent">
                  {suggestion.priceLabel ?? suggestion.price}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  try {
                    sessionStorage.setItem(
                      "medvicare-quiz",
                      `Mental-health quiz: ${concernLabel}${answers.province ? ` · ${answers.province}` : ""}\nAnswers: ${JSON.stringify(answers)}`,
                    );
                  } catch {
                    /* ignore */
                  }
                  addItem({
                    id: suggestion.slug,
                    title: suggestion.name,
                    price: suggestion.price ?? "Varies",
                    supply: suggestion.tag ?? "Clinician review",
                    image: suggestion.image,
                  });
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-full bg-ppc-accent px-6 py-3.5 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
              >
                Add to cart
                {suggestion.price ? ` — ${suggestion.price}` : ""}
              </button>
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-ppc-border px-6 py-3.5 text-[14px] font-medium text-ppc-primary hover:border-ppc-accent/40"
              >
                Continue to contact
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-10">
          <p className="text-center text-[11px] leading-relaxed text-ppc-primary/70">
            Quiz answers stay on this device until you choose to send them
            through Contact. If you are in crisis, call or text 988.
          </p>
        </div>
      </div>
    </div>
  );
}
