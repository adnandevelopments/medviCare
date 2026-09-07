"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { getProduct, type Product } from "@/lib/content";

type Choice = { id: string; label: string };

type Step =
  | { kind: "question"; id: string; question: string; choices: Choice[] }
  | { kind: "birthday"; id: "birthday"; question: string }
  | { kind: "result"; id: "result" }
  | { kind: "blocked"; id: "blocked" };

const steps: Step[] = [
  {
    kind: "question",
    id: "past",
    question: "Have you taken ED medication in the past?",
    choices: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  },
  {
    kind: "question",
    id: "which",
    question: "Which have you tried?",
    choices: [
      { id: "cialis", label: "Cialis (tadalafil)" },
      { id: "viagra", label: "Viagra (sildenafil)" },
      { id: "both", label: "Both" },
      { id: "other", label: "Something else" },
    ],
  },
  {
    kind: "question",
    id: "worked",
    question: "How did it work for you?",
    choices: [
      { id: "well", label: "It worked well" },
      { id: "somewhat", label: "It helped somewhat" },
      { id: "no", label: "It didn’t help enough" },
      { id: "side", label: "It helped, but side effects were a problem" },
    ],
  },
  {
    kind: "question",
    id: "goal",
    question: "What are you hoping to improve?",
    choices: [
      { id: "firm", label: "Getting or staying firm" },
      { id: "last", label: "Lasting longer" },
      { id: "both", label: "Both" },
      { id: "daily", label: "Feeling ready more of the time" },
    ],
  },
  {
    kind: "question",
    id: "timing",
    question: "How would you prefer to take treatment?",
    choices: [
      { id: "long", label: "Longer-acting tablet (up to a day)" },
      { id: "short", label: "On-demand tablet before sex" },
      { id: "chew", label: "Chewable / dissolvable tablet" },
      { id: "either", label: "Whatever my clinician recommends" },
    ],
  },
  {
    kind: "birthday",
    id: "birthday",
    question: "Let’s make sure you’re eligible for treatment",
  },
  {
    kind: "question",
    id: "nitrates",
    question: "Do you take nitrates for chest pain, or has a clinician told you not to use ED pills?",
    choices: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
      { id: "unsure", label: "I’m not sure" },
    ],
  },
  { kind: "result", id: "result" },
];

const WHICH_INDEX = 1;
const GOAL_INDEX = 3;
const RESULT_INDEX = steps.length - 1;

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

function suggestProduct(answers: Record<string, string>): Product | undefined {
  const cialis = getProduct("cialis");
  const viagra = getProduct("viagra");
  const chew = getProduct("chewalis");

  if (answers.timing === "chew") return chew ?? cialis ?? viagra;
  if (answers.timing === "short") return viagra ?? cialis ?? chew;
  if (answers.timing === "long" || answers.goal === "daily" || answers.goal === "last") {
    return cialis ?? chew ?? viagra;
  }
  if (answers.which === "viagra" && answers.worked === "well") return viagra ?? cialis;
  if (answers.which === "cialis" && answers.worked === "well") return cialis ?? viagra;
  if (answers.which === "both") return cialis ?? viagra;
  if (answers.worked === "side" || answers.worked === "no") return chew ?? cialis ?? viagra;
  return cialis ?? viagra ?? chew;
}

export default function SexualHealthQuiz({
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
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setAnswers({});
    setBirthday("");
    setError("");
    setBlocked(false);
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
    ? { kind: "blocked", id: "blocked" }
    : steps[stepIndex];

  const progress = useMemo(() => {
    if (blocked) return 85;
    if (step.kind === "result") return 100;
    return Math.round(((stepIndex + 1) / steps.length) * 100);
  }, [blocked, step, stepIndex]);

  if (!open) return null;

  const goTo = (index: number) => {
    setError("");
    setStepIndex(Math.max(0, Math.min(index, RESULT_INDEX)));
  };

  const afterPast = (past: string) => {
    if (past === "no") goTo(GOAL_INDEX);
    else goTo(WHICH_INDEX);
  };

  const pick = (choiceId: string) => {
    if (step.kind !== "question") return;
    setAnswers((prev) => ({ ...prev, [step.id]: choiceId }));

    if (step.id === "past") {
      window.setTimeout(() => afterPast(choiceId), 160);
      return;
    }
    if (step.id === "nitrates") {
      if (choiceId === "yes") {
        window.setTimeout(() => setBlocked(true), 160);
        return;
      }
    }
    window.setTimeout(() => goTo(stepIndex + 1), 160);
  };

  const submitBirthday = () => {
    const date = parseBirthday(birthday);
    if (!date) {
      setError("Enter a valid birthday.");
      return;
    }
    if (!isAtLeast18(date)) {
      setError("Must be 18 years old or above");
      return;
    }
    setAnswers((prev) => ({ ...prev, birthday }));
    goTo(stepIndex + 1);
  };

  const goBack = () => {
    if (blocked) {
      setBlocked(false);
      setError("");
      return;
    }
    if (stepIndex === 0) {
      onClose();
      return;
    }
    setError("");
    if (step.id === "goal" && answers.past === "no") {
      goTo(0);
      return;
    }
    goTo(stepIndex - 1);
  };

  const medicine = suggestProduct(answers);

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
                  className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 text-left text-[16px] font-semibold text-ppc-primary transition hover:border-ppc-accent/45 hover:bg-ppc-mint"
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step.kind === "birthday" ? (
          <>
            <h1 className="mb-6 font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>
            <label className="block">
              <span className="mb-2 block text-[14px] font-medium text-ppc-primary/88">
                My birthday is
              </span>
              <input
                type="date"
                value={birthday}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => {
                  setBirthday(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 text-[16px] outline-none hover:border-ppc-accent focus:border-ppc-accent [color-scheme:light]"
              />
            </label>
            {error ? (
              <p className="mt-3 text-[13px] font-medium text-red-500">{error}</p>
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

        {step.kind === "blocked" ? (
          <div className="rounded-2xl border border-ppc-border bg-ppc-surface p-6 md:p-8">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent">
              Safety first
            </p>
            <h1 className="font-display text-[28px] font-[400] text-ppc-primary md:text-[32px]">
              This path needs a clinician conversation
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ppc-primary/82">
              ED tablets are usually not combined with nitrates, and we will not
              suggest a product here. Send a note through Contact so a licensed
              clinician can review what’s safe.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-ppc-accent px-6 py-3.5 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
              >
                Continue to contact
              </Link>
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center justify-center rounded-full border border-ppc-border px-6 py-3.5 text-[14px] font-medium text-ppc-primary hover:border-ppc-accent/40"
              >
                Go back
              </button>
            </div>
          </div>
        ) : null}

        {step.kind === "result" && medicine ? (
          <div className="rounded-2xl border border-ppc-border bg-ppc-surface p-6 md:p-8">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent">
              100% complete · Suggested option
            </p>
            <h1 className="font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[32px]">
              We suggest {medicine.name}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ppc-primary/82">
              Based on your answers, this is a starting match for clinician
              review — not a prescription. A licensed clinician decides if
              treatment is appropriate.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-ppc-border bg-white">
              <div className="relative mx-auto aspect-square w-full max-w-[220px]">
                <Image
                  src={medicine.image}
                  alt={medicine.name}
                  fill
                  className="object-contain p-6"
                  sizes="220px"
                />
              </div>
              <div className="border-t border-ppc-border px-5 py-4 text-center">
                <p className="text-[17px] font-semibold text-ppc-primary">
                  {medicine.name}
                </p>
                <p className="mt-1 text-[13px] text-ppc-primary/80">
                  {medicine.blurb}
                </p>
                <p className="mt-2 text-[13px] font-medium text-ppc-accent">
                  {medicine.priceLabel ?? medicine.price}
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
                      `Sexual-health quiz suggestion: ${medicine.name}\nAnswers: ${JSON.stringify(answers)}`,
                    );
                  } catch {
                    /* ignore */
                  }
                  addItem({
                    id: medicine.slug,
                    title: medicine.name,
                    price: medicine.price ?? "Varies",
                    supply: medicine.tag ?? "Clinician-approved plan",
                    image: medicine.image,
                  });
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-full bg-ppc-accent px-6 py-3.5 text-[14px] font-medium text-white hover:bg-ppc-accent-soft"
              >
                Add to cart
                {medicine.price ? ` — ${medicine.price}` : ""}
              </button>
              <Link
                href="/sexual-health#options"
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
            through Contact. ED medicines need a clinician review and are not
            for emergencies.
          </p>
        </div>
      </div>
    </div>
  );
}
