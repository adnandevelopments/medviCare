"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { hairLoss } from "@/lib/content";

type HairIcon = "receding" | "crown" | "overall" | "full";

type Choice = {
  id: string;
  label: string;
  icon?: HairIcon;
};

type Step =
  | {
      kind: "question";
      id: string;
      question: string;
      choices: Choice[];
    }
  | {
      kind: "birthday";
      id: "birthday";
      question: string;
    }
  | { kind: "result"; id: "result" };

const steps: Step[] = [
  {
    kind: "question",
    id: "pattern",
    question: "What best describes your hair?",
    choices: [
      { id: "receding", label: "Receding hairline", icon: "receding" },
      { id: "crown", label: "Thinning at the crown", icon: "crown" },
      { id: "overall", label: "Overall hair loss/thinning", icon: "overall" },
      { id: "full", label: "Full head of hair", icon: "full" },
    ],
  },
  {
    kind: "question",
    id: "results",
    question: "What sort of results are you looking for?",
    choices: [
      { id: "regrow", label: "Regrowing my hair" },
      { id: "prevent", label: "Preventing future hair loss" },
      { id: "both", label: "Both" },
    ],
  },
  {
    kind: "birthday",
    id: "birthday",
    question: "Let’s make sure you’re eligible for treatment",
  },
  {
    kind: "question",
    id: "gender",
    question: "Which best describes you?",
    choices: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
    ],
  },
  {
    kind: "question",
    id: "duration",
    question: "How long have you noticed changes?",
    choices: [
      { id: "under-6", label: "Less than 6 months" },
      { id: "6-24", label: "6 months to 2 years" },
      { id: "over-2", label: "More than 2 years" },
      { id: "unsure", label: "Not sure / just starting" },
    ],
  },
  {
    kind: "question",
    id: "format",
    question: "How would you prefer to treat?",
    choices: [
      { id: "foam", label: "Topical foam (no daily pill)" },
      { id: "pill", label: "Once-daily tablet" },
      { id: "combo", label: "Tablet + topical solution" },
      { id: "either", label: "Whatever my clinician recommends" },
    ],
  },
  { kind: "result", id: "result" },
];

const TOTAL_PROGRESS_STEPS = steps.length;

function HairPatternIcon({ type }: { type: HairIcon }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className="text-ppc-primary"
    >
      <ellipse
        cx="32"
        cy="36"
        rx="18"
        ry="20"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-80"
      />
      {type === "full" ? (
        <>
          <path d="M16 30c4-14 28-14 32 0" stroke="var(--ppc-accent)" strokeWidth="3" fill="none" />
          <path d="M18 34c6-10 22-10 28 0" stroke="var(--ppc-accent)" strokeWidth="2.5" fill="none" />
          <path d="M20 38c5-7 19-7 24 0" stroke="var(--ppc-accent)" strokeWidth="2" fill="none" />
        </>
      ) : null}
      {type === "receding" ? (
        <>
          <path d="M22 28c3-8 17-8 20 0" stroke="var(--ppc-accent)" strokeWidth="2.5" fill="none" />
          <path d="M16 34c2-4 6-6 10-5M48 34c-2-4-6-6-10-5" stroke="var(--ppc-accent)" strokeWidth="2.5" fill="none" />
          <path d="M24 40c4-5 12-5 16 0" stroke="var(--ppc-accent)" strokeWidth="2" fill="none" />
        </>
      ) : null}
      {type === "crown" ? (
        <>
          <path d="M16 32c6-12 26-12 32 0" stroke="var(--ppc-accent)" strokeWidth="2.5" fill="none" />
          <circle cx="32" cy="30" r="6" stroke="var(--ppc-accent)" strokeWidth="2" fill="none" />
          <path d="M20 40c5-4 19-4 24 0" stroke="var(--ppc-accent)" strokeWidth="2" fill="none" />
        </>
      ) : null}
      {type === "overall" ? (
        <>
          <path d="M18 30c2-6 8-9 14-9M46 30c-2-6-8-9-14-9" stroke="var(--ppc-accent)" strokeWidth="2" fill="none" />
          <path d="M20 36c3-4 8-5 12-5M44 36c-3-4-8-5-12-5" stroke="var(--ppc-accent)" strokeWidth="2" fill="none" />
          <path d="M22 42c4-3 10-3 14 0" stroke="var(--ppc-accent)" strokeWidth="2" fill="none" />
        </>
      ) : null}
    </svg>
  );
}

function parseBirthday(value: string): Date | null {
  const trimmed = value.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (iso) {
    const d = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const mdY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (mdY) {
    const d = new Date(Number(mdY[3]), Number(mdY[1]) - 1, Number(mdY[2]));
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function isAtLeast18(date: Date) {
  const today = new Date();
  const eighteenth = new Date(date);
  eighteenth.setFullYear(date.getFullYear() + 18);
  return eighteenth <= today;
}

function suggestMedicine(answers: Record<string, string>) {
  const offers = hairLoss.offers;
  if (answers.format === "combo") {
    return offers.find((o) => o.id === "tablet-topical") ?? offers[0];
  }
  if (answers.format === "pill" || answers.results === "prevent") {
    return offers.find((o) => o.id === "tablet") ?? offers[0];
  }
  if (answers.format === "foam" || answers.results === "regrow" || answers.results === "both") {
    return offers.find((o) => o.id === "foam") ?? offers[0];
  }
  if (answers.pattern === "full") {
    return offers.find((o) => o.id === "topical") ?? offers[0];
  }
  return offers.find((o) => o.id === "foam") ?? offers[0];
}

export default function HairLossQuiz({
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
  const [birthdayError, setBirthdayError] = useState("");

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setAnswers({});
    setBirthday("");
    setBirthdayError("");
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

  const step = steps[stepIndex];

  const progress = useMemo(() => {
    if (step.kind === "result") return 100;
    return Math.round(((stepIndex + 1) / TOTAL_PROGRESS_STEPS) * 100);
  }, [step, stepIndex]);

  if (!open) return null;

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));

  const pick = (choiceId: string) => {
    if (step.kind !== "question") return;
    setAnswers((prev) => ({ ...prev, [step.id]: choiceId }));
    window.setTimeout(goNext, 160);
  };

  const submitBirthday = () => {
    const date = parseBirthday(birthday);
    if (!date) {
      setBirthdayError("Enter a valid birthday (MM/DD/YYYY).");
      return;
    }
    if (!isAtLeast18(date)) {
      setBirthdayError("Must be 18 years old or above");
      return;
    }
    setBirthdayError("");
    setAnswers((prev) => ({ ...prev, birthday }));
    goNext();
  };

  const goBack = () => {
    if (stepIndex === 0) {
      onClose();
      return;
    }
    setBirthdayError("");
    setStepIndex((i) => i - 1);
  };

  const medicine = suggestMedicine(answers);

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

        {step.kind === "question" ? (
          <>
            <h1 className="mb-6 font-display text-[28px] font-[400] leading-tight tracking-[-0.02em] text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>
            <div className="flex flex-col gap-3">
              {step.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => pick(choice.id)}
                  className="flex w-full items-center gap-4 rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 text-left transition hover:border-ppc-accent/45 hover:bg-ppc-mint"
                >
                  {choice.icon ? (
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-ppc-mint">
                      <HairPatternIcon type={choice.icon} />
                    </span>
                  ) : null}
                  <span className="text-[16px] font-semibold text-ppc-primary md:text-[17px]">
                    {choice.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step.kind === "birthday" ? (
          <>
            <h1 className="mb-6 font-display text-[28px] font-[400] leading-tight tracking-[-0.02em] text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>
            <label className="block">
              <span className="mb-2 block text-[14px] font-medium text-ppc-primary/88">
                My birthday is
              </span>
              <div className="relative">
                <input
                  type="date"
                  value={birthday}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setBirthday(e.target.value);
                    setBirthdayError("");
                  }}
                  className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 pr-12 text-[16px] text-ppc-primary outline-none transition-colors hover:border-ppc-accent focus:border-ppc-accent [color-scheme:light]"
                />
                <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ppc-primary/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M3 10h18M8 3v4M16 3v4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </label>
            {birthdayError ? (
              <p className="mt-3 text-[13px] font-medium text-red-400">
                {birthdayError}
              </p>
            ) : (
              <p className="mt-3 text-[12px] text-ppc-primary/70">
                You must be 18 years old or above to continue.
              </p>
            )}
            <button
              type="button"
              onClick={submitBirthday}
              className="mt-8 w-full rounded-full bg-ppc-accent px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-ppc-accent-soft"
            >
              Continue
            </button>
          </>
        ) : null}

        {step.kind === "result" ? (
          <div className="rounded-2xl border border-ppc-border bg-ppc-surface p-6 md:p-8">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent">
              100% complete · Suggested medicine
            </p>
            <h1 className="font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[32px]">
              We suggest {medicine.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ppc-primary/82">
              Based on your quiz answers, this option is a starting match for
              clinician review. Hair loss looks different for everyone — including
              women — and a licensed clinician decides what is appropriate.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-ppc-border bg-ppc-mint">
              <div className="relative mx-auto aspect-square w-full max-w-[220px]">
                <Image
                  src={medicine.image}
                  alt={medicine.title}
                  fill
                  className="object-contain p-6"
                  sizes="220px"
                />
              </div>
              <div className="border-t border-ppc-border px-5 py-4 text-center">
                <p className="text-[17px] font-semibold text-ppc-primary">
                  {medicine.title}
                </p>
                {medicine.lines.map((line) => (
                  <p key={line} className="mt-1 text-[13px] text-ppc-primary/80">
                    {line}
                  </p>
                ))}
                <p className="mt-2 text-[13px] font-medium text-ppc-accent">
                  {medicine.supply} · {medicine.price}
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
                      `Hair-loss quiz suggestion: ${medicine.title}\nAnswers: ${JSON.stringify(answers)}`,
                    );
                  } catch {
                    /* ignore */
                  }
                  addItem({
                    id: medicine.id,
                    title: medicine.title,
                    price: medicine.price,
                    compareAt:
                      "compareAt" in medicine ? medicine.compareAt : undefined,
                    supply: medicine.supply,
                    image: medicine.image,
                  });
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-full bg-ppc-accent px-6 py-3.5 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
              >
                Add to cart — {medicine.price}
              </button>
              <Link
                href="/hairloss#options"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-ppc-border px-6 py-3.5 text-[14px] font-medium text-ppc-primary hover:border-ppc-accent/40"
              >
                Compare all options
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-10">
          <p className="text-center text-[11px] leading-relaxed text-ppc-primary/70">
            Quiz answers stay on this device until you choose to send them
            through Contact. Do not use this form for emergencies — call local
            emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}
