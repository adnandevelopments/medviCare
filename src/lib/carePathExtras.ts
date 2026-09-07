import { bodyOptimization, hairLoss, howItWorks } from "@/lib/content";
import { longevity } from "@/lib/longevity";
import { mentalHealth } from "@/lib/mentalHealth";
import { skincare } from "@/lib/productDetails";
import { quitSmoking } from "@/lib/quitSmoking";
import { sexualHealth } from "@/lib/sexualHealth";

export type PathStep = { step: string; title: string; body: string };
export type PathFaq = { q: string; a: string };
export type PathPrice = { title: string; value: string; detail: string };
export type PathPattern = { title: string; body: string };

export type CarePathExtra = {
  trust: string[];
  steps: PathStep[];
  faqs: PathFaq[];
  notice?: string;
  pricing?: PathPrice[];
  patterns?: PathPattern[];
};

function fromHomeSteps(): PathStep[] {
  return howItWorks.map((item) => ({
    step: item.step,
    title: item.title,
    body: item.description,
  }));
}

export function extrasForPath(slug: string): CarePathExtra {
  if (slug === "weight-loss") {
    return {
      trust: bodyOptimization.trust,
      steps: bodyOptimization.steps.map((item) => ({
        step: item.step,
        title: item.title,
        body: item.description,
      })),
      faqs: bodyOptimization.faqs,
      notice: bodyOptimization.hero.note,
      pricing: bodyOptimization.pricing,
    };
  }
  if (slug === "hair-loss") {
    return {
      trust: hairLoss.trust,
      steps: hairLoss.steps.map((item) => ({
        step: item.step,
        title: item.title,
        body: item.description,
      })),
      faqs: hairLoss.faqs,
      patterns: hairLoss.patterns,
    };
  }
  if (slug === "skin") {
    return {
      trust: skincare.trust,
      steps: skincare.steps,
      faqs: skincare.faqs,
    };
  }
  if (slug === "sexual-health") {
    return {
      trust: sexualHealth.trust,
      steps: sexualHealth.steps,
      faqs: sexualHealth.faqs,
      notice:
        "ED medicines in Canada need a prescription. Unlabeled tablets sold without a clinician review can be unsafe. A licensed clinician reviews every medviCare intake before anything can ship.",
    };
  }
  if (slug === "mental-health") {
    return {
      trust: mentalHealth.trust,
      steps: mentalHealth.steps,
      faqs: mentalHealth.faqs,
      pricing: mentalHealth.pricing,
    };
  }
  if (slug === "longevity") {
    return {
      trust: [
        "38+ biomarker testing",
        "Biological age insights",
        "Personalized action plan",
        "Online follow-up",
      ],
      steps: longevity.steps,
      faqs: longevity.faqs,
    };
  }
  if (slug === "quit-smoking") {
    return {
      trust: [
        "Health Canada–authorized NRT",
        "Clinician-guided quit plan",
        "Discreet delivery",
        "Portal support",
      ],
      steps: fromHomeSteps(),
      faqs: [...quitSmoking.faqs],
    };
  }
  return {
    trust: [],
    steps: fromHomeSteps(),
    faqs: [],
  };
}
