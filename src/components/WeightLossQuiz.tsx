"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { getProduct, type Product } from "@/lib/content";

type Choice = { id: string; label: string };

type Step =
  | { kind: "bmi"; id: "bmi"; question: string; hint: string }
  | { kind: "goal"; id: "goal"; question: string; hint: string }
  | { kind: "question"; id: string; question: string; choices: Choice[] }
  | { kind: "birthday"; id: "birthday"; question: string }
  | { kind: "conditions"; id: "conditions"; question: string; hint: string }
  | { kind: "result"; id: "result" };

const CONDITION_OPTIONS = [
  { id: "t2d", label: "Type 2 diabetes" },
  { id: "bp", label: "High blood pressure" },
  { id: "chol", label: "High cholesterol" },
  { id: "apnea", label: "Sleep apnea" },
  { id: "pcos", label: "PCOS" },
  { id: "none", label: "None of these" },
] as const;

const steps: Step[] = [
  {
    kind: "bmi",
    id: "bmi",
    question: "What is your height and weight?",
    hint: "This helps calculate your BMI, a general screening tool for body composition.",
  },
  {
    kind: "goal",
    id: "goal",
    question: "What is your goal weight?",
    hint: "A target helps a clinician understand how far you want to go — not a promise of that number.",
  },
  {
    kind: "question",
    id: "sex",
    question: "Which best describes you?",
    choices: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
    ],
  },
  {
    kind: "birthday",
    id: "birthday",
    question: "Let’s make sure you’re eligible for treatment",
  },
  {
    kind: "question",
    id: "pregnancy",
    question: "Are you pregnant, breastfeeding, or planning pregnancy soon?",
    choices: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes" },
      { id: "na", label: "Not applicable" },
    ],
  },
  {
    kind: "conditions",
    id: "conditions",
    question: "Have you been diagnosed with any of the following?",
    hint: "Select all that apply. A clinician still reviews whether a plan is appropriate.",
  },
  {
    kind: "question",
    id: "prior",
    question: "Have you used a GLP-1 medicine before?",
    choices: [
      { id: "never", label: "No, never" },
      { id: "past", label: "Yes, in the past" },
      { id: "current", label: "Yes, I’m currently using one" },
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

function toKg(weight: number, unit: "imperial" | "metric") {
  return unit === "metric" ? weight : weight * 0.45359237;
}

function toMeters(
  height: number,
  inches: number,
  unit: "imperial" | "metric",
) {
  if (unit === "metric") return height / 100;
  return (height * 12 + inches) * 0.0254;
}

function calcBmi(
  unit: "imperial" | "metric",
  feet: number,
  inches: number,
  cm: number,
  weight: number,
) {
  const meters =
    unit === "metric" ? toMeters(cm, 0, "metric") : toMeters(feet, inches, "imperial");
  const kg = toKg(weight, unit);
  if (meters <= 0 || kg <= 0) return 0;
  return kg / (meters * meters);
}

function suggestProduct(
  bmi: number,
  prior: string,
  conditions: string[],
): Product | undefined {
  const mounjaro = getProduct("mounjaro");
  const ozempic = getProduct("ozempic");
  const sema = getProduct("semaglutide");
  const hasCondition = conditions.some((id) => id !== "none");
  if (prior === "current" || (bmi >= 32 && hasCondition)) return mounjaro ?? ozempic ?? sema;
  if (bmi >= 30 || (bmi >= 27 && hasCondition)) return ozempic ?? sema ?? mounjaro;
  return sema ?? ozempic ?? mounjaro;
}

export default function WeightLossQuiz({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("8");
  const [cm, setCm] = useState("173");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [birthday, setBirthday] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setAnswers({});
    setUnit("imperial");
    setFeet("5");
    setInches("8");
    setCm("173");
    setWeight("");
    setGoalWeight("");
    setBirthday("");
    setConditions([]);
    setError("");
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
  const weightNum = Number(weight);
  const bmi = calcBmi(unit, Number(feet) || 0, Number(inches) || 0, Number(cm) || 0, weightNum);

  const progress = useMemo(() => {
    if (step.kind === "result") return 100;
    return Math.round(((stepIndex + 1) / steps.length) * 100);
  }, [step, stepIndex]);

  if (!open) return null;

  const goNext = () => {
    setError("");
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const pick = (choiceId: string) => {
    if (step.kind !== "question") return;
    if (step.id === "pregnancy" && choiceId === "yes") {
      setAnswers((prev) => ({ ...prev, pregnancy: choiceId }));
      setError("GLP-1 plans are typically not used in pregnancy or breastfeeding. A clinician can discuss other options.");
      return;
    }
    setAnswers((prev) => ({ ...prev, [step.id]: choiceId }));
    window.setTimeout(goNext, 160);
  };

  const submitBmi = () => {
    if (!weightNum || weightNum < (unit === "metric" ? 30 : 70) || weightNum > (unit === "metric" ? 400 : 800)) {
      setError("Enter a valid current weight.");
      return;
    }
    if (unit === "metric" && (!(Number(cm) >= 120) || Number(cm) > 250)) {
      setError("Enter a valid height in centimetres.");
      return;
    }
    if (bmi < 10 || bmi > 80) {
      setError("Check height and weight — BMI looks off.");
      return;
    }
    setAnswers((prev) => ({
      ...prev,
      unit,
      height:
        unit === "metric"
          ? `${cm} cm`
          : `${feet} ft ${inches} in`,
      weight: `${weight} ${unit === "metric" ? "kg" : "lb"}`,
      bmi: bmi.toFixed(1),
    }));
    goNext();
  };

  const submitGoal = () => {
    const goal = Number(goalWeight);
    if (!goal || goal < (unit === "metric" ? 30 : 70) || goal > (unit === "metric" ? 400 : 800)) {
      setError("Enter a valid goal weight.");
      return;
    }
    if (goal >= weightNum) {
      setError("Goal weight should be lower than your current weight.");
      return;
    }
    setAnswers((prev) => ({
      ...prev,
      goal: `${goalWeight} ${unit === "metric" ? "kg" : "lb"}`,
    }));
    goNext();
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
    if (answers.sex === "male") {
      setError("");
      setStepIndex(5);
      return;
    }
    goNext();
  };

  const submitConditions = () => {
    if (!conditions.length) {
      setError("Select at least one option — including “None of these” if needed.");
      return;
    }
    setAnswers((prev) => ({ ...prev, conditions: conditions.join(",") }));
    goNext();
  };

  const toggleCondition = (id: string) => {
    setError("");
    setConditions((prev) => {
      if (id === "none") return prev.includes("none") ? [] : ["none"];
      const withoutNone = prev.filter((item) => item !== "none");
      return withoutNone.includes(id)
        ? withoutNone.filter((item) => item !== id)
        : [...withoutNone, id];
    });
  };

  const goBack = () => {
    if (stepIndex === 0) {
      onClose();
      return;
    }
    setError("");
    if (step.id === "conditions" && answers.sex === "male") {
      setStepIndex(3);
      return;
    }
    setStepIndex((i) => i - 1);
  };

  const medicine = suggestProduct(
    Number(answers.bmi) || bmi,
    answers.prior ?? "",
    (answers.conditions ?? conditions.join(",")).split(",").filter(Boolean),
  );
  const weightLabel = unit === "metric" ? "kg" : "lb";

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

        {step.kind === "bmi" ? (
          <>
            <h1 className="mb-3 font-display text-[28px] font-[400] leading-tight tracking-[-0.02em] text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>
            <p className="mb-6 text-[15px] leading-relaxed text-ppc-primary/80">
              {step.hint}
            </p>

            <div className="mb-6 inline-flex rounded-full border border-ppc-border bg-ppc-surface p-1">
              {(["imperial", "metric"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setUnit(item)}
                  className={`min-h-11 rounded-full px-4 text-[13px] font-semibold ${
                    unit === item
                      ? "bg-ppc-accent text-white"
                      : "text-ppc-primary hover:bg-ppc-mint"
                  }`}
                >
                  {item === "imperial" ? "ft / lb" : "cm / kg"}
                </button>
              ))}
            </div>

            <label className="mb-4 block">
              <span className="mb-2 block text-[14px] font-medium text-ppc-primary/88">
                How tall are you?
              </span>
              {unit === "imperial" ? (
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="min-h-12 rounded-xl border border-ppc-border bg-ppc-surface px-4 text-[16px] outline-none hover:border-ppc-accent focus:border-ppc-accent"
                  >
                    {[4, 5, 6, 7].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} ft
                      </option>
                    ))}
                  </select>
                  <select
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className="min-h-12 rounded-xl border border-ppc-border bg-ppc-surface px-4 text-[16px] outline-none hover:border-ppc-accent focus:border-ppc-accent"
                  >
                    {Array.from({ length: 12 }, (_, n) => (
                      <option key={n} value={String(n)}>
                        {n} in
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  type="number"
                  inputMode="decimal"
                  min={120}
                  max={250}
                  value={cm}
                  onChange={(e) => setCm(e.target.value)}
                  className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 text-[16px] outline-none hover:border-ppc-accent focus:border-ppc-accent"
                  placeholder="Height in cm"
                />
              )}
            </label>

            <label className="mb-6 block">
              <span className="mb-2 block text-[14px] font-medium text-ppc-primary/88">
                How much do you currently weigh?
              </span>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min={70}
                  max={800}
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 pr-14 text-[16px] outline-none hover:border-ppc-accent focus:border-ppc-accent"
                  placeholder={unit === "metric" ? "Weight in kg" : "Weight in lb"}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-ppc-primary/60">
                  {weightLabel}
                </span>
              </div>
            </label>

            <div className="mb-6 rounded-2xl border border-ppc-border bg-ppc-surface px-5 py-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ppc-accent">
                Your BMI
              </p>
              <p className="mt-1 font-display text-[44px] font-semibold leading-none text-ppc-primary">
                {bmi > 0 ? bmi.toFixed(1) : "0"}
              </p>
              <p className="mt-2 text-[13px] text-ppc-primary/72">
                BMI is a screening number only. A licensed clinician decides
                whether treatment is appropriate.
              </p>
            </div>

            {error ? (
              <p className="mb-3 text-[13px] font-medium text-red-500">{error}</p>
            ) : null}

            <button
              type="button"
              onClick={submitBmi}
              className="w-full rounded-full bg-ppc-accent px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-ppc-accent-soft"
            >
              Continue
            </button>
          </>
        ) : null}

        {step.kind === "goal" ? (
          <>
            <h1 className="mb-3 font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>
            <p className="mb-6 text-[15px] leading-relaxed text-ppc-primary/80">
              {step.hint}
            </p>
            <label className="mb-6 block">
              <span className="mb-2 block text-[14px] font-medium text-ppc-primary/88">
                Goal weight
              </span>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min={70}
                  max={800}
                  value={goalWeight}
                  onChange={(e) => {
                    setGoalWeight(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-ppc-border bg-ppc-surface px-4 py-4 pr-14 text-[16px] outline-none hover:border-ppc-accent focus:border-ppc-accent"
                  placeholder={`Target in ${weightLabel}`}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-ppc-primary/60">
                  {weightLabel}
                </span>
              </div>
            </label>
            {error ? (
              <p className="mb-3 text-[13px] font-medium text-red-500">{error}</p>
            ) : null}
            <button
              type="button"
              onClick={submitGoal}
              className="w-full rounded-full bg-ppc-accent px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-ppc-accent-soft"
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
            {error ? (
              <p className="mt-4 text-[13px] font-medium text-red-500">{error}</p>
            ) : null}
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

        {step.kind === "conditions" ? (
          <>
            <h1 className="mb-3 font-display text-[28px] font-[400] leading-tight text-ppc-primary md:text-[34px]">
              {step.question}
            </h1>
            <p className="mb-6 text-[15px] leading-relaxed text-ppc-primary/80">
              {step.hint}
            </p>
            <div className="flex flex-col gap-3">
              {CONDITION_OPTIONS.map((item) => {
                const on = conditions.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCondition(item.id)}
                    className={`w-full rounded-xl border px-4 py-4 text-left text-[16px] font-semibold transition ${
                      on
                        ? "border-ppc-accent bg-ppc-mint text-ppc-primary"
                        : "border-ppc-border bg-ppc-surface text-ppc-primary hover:border-ppc-accent/45"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {error ? (
              <p className="mt-4 text-[13px] font-medium text-red-500">{error}</p>
            ) : null}
            <button
              type="button"
              onClick={submitConditions}
              className="mt-8 w-full rounded-full bg-ppc-accent px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-ppc-accent-soft"
            >
              Continue
            </button>
          </>
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
              Your BMI is {answers.bmi ?? bmi.toFixed(1)}. This is a starting
              match for clinician review — not a prescription. A licensed
              clinician decides if treatment is appropriate.
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
                      `Weight-loss quiz suggestion: ${medicine.name}\nAnswers: ${JSON.stringify(answers)}`,
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
                href="/body-optimization#options"
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
            through Contact. BMI is a screening tool, not a diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}
