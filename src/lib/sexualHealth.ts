/** Sexual health plan chooser content. */

export type EdPlan = {
  id: string;
  title: string;
  image: string;
  dosages: string;
  pillOptions: number[];
  /** combo uses "4/4" style labels */
  pillLabels?: string[];
  note?: string;
  /** Base price for generic · 1 month · lowest qty */
  baseGeneric: number;
  brandExtra: number;
  threeMonthMultiplier: number;
  perPillStep: number;
};

export const sexualHealth = {
  hero: {
    eyebrow: "Sexual health",
    title: "Private care that works around your life",
    description:
      "Clinician-reviewed ED options with discreet delivery. Choose a plan, then complete a short questionnaire.",
  },
  trust: [
    "Licensed Canadian clinicians",
    "Generic or brand options",
    "Pause or cancel anytime",
    "100% discreet packaging",
  ],
  plans: [
    {
      id: "cialis",
      title: "Cialis",
      image: "/images/meds/med-cialis.png",
      dosages: "Available in: 10mg & 20mg",
      pillOptions: [6, 8, 12],
      baseGeneric: 107,
      brandExtra: 40,
      threeMonthMultiplier: 2.7,
      perPillStep: 12,
    },
    {
      id: "viagra",
      title: "Viagra",
      image: "/images/meds/med-viagra.png",
      dosages: "Available in: 50mg & 100mg",
      pillOptions: [6, 8, 12],
      baseGeneric: 84,
      brandExtra: 36,
      threeMonthMultiplier: 2.7,
      perPillStep: 10,
    },
    {
      id: "dissolvable-cialis",
      title: "Dissolvable Cialis",
      image: "/images/meds/med-chewalis.png",
      dosages: "Available in: 10mg & 20mg",
      pillOptions: [6, 8, 12],
      baseGeneric: 107,
      brandExtra: 40,
      threeMonthMultiplier: 2.7,
      perPillStep: 12,
    },
    {
      id: "cialis-viagra",
      title: "Cialis + Viagra",
      image: "/images/meds/med-cialis.png",
      dosages: "*Subject to patient consultation",
      pillOptions: [4, 6],
      pillLabels: ["4/4", "6/6"],
      note: "*Subject to patient consultation",
      baseGeneric: 134,
      brandExtra: 48,
      threeMonthMultiplier: 2.7,
      perPillStep: 18,
    },
  ] satisfies EdPlan[],
  steps: [
    {
      step: "01",
      title: "Choose your plan",
      body: "Pick medication, generic or brand, supply length, and pill count.",
    },
    {
      step: "02",
      title: "Complete questionnaire",
      body: "Share your history so a licensed clinician can review eligibility and dose.",
    },
    {
      step: "03",
      title: "Discreet delivery",
      body: "If approved, your plan ships privately with ongoing portal support.",
    },
  ],
  faqs: [
    {
      q: "Is generic as effective as brand?",
      a: "Yes — generic contains the same active ingredient and is typically much more affordable. Brand is available if you prefer it.",
    },
    {
      q: "Can I change my dose later?",
      a: "Dose requests can be made during the questionnaire, and your clinician may adjust based on response and safety.",
    },
    {
      q: "Can I pause or cancel?",
      a: "Yes. You can pause or cancel future shipments anytime through support.",
    },
  ],
};

export function calcEdPrice(
  plan: EdPlan,
  opts: {
    preference: "generic" | "brand";
    frequency: "1" | "3";
    pills: number;
  },
) {
  const pillIndex = Math.max(0, plan.pillOptions.indexOf(opts.pills));
  let price = plan.baseGeneric + pillIndex * plan.perPillStep;
  if (opts.preference === "brand") price += plan.brandExtra;
  if (opts.frequency === "3") price = Math.round(price * plan.threeMonthMultiplier);
  return price;
}
