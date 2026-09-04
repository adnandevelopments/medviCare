import { getProduct, type Product } from "@/lib/content";

export type ProductDetailContent = {
  badge: string;
  rating: string;
  reviewCount: string;
  headline: string;
  description: string;
  howItWorks: string;
  howToUse: string;
  formulations: string[];
  science: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  why: { title: string; points: string[] }[];
  testimonials: { name: string; quote: string; condition: string }[];
  faqs: { q: string; a: string }[];
};

const sharedSteps = [
  {
    title: "Complete a short online visit",
    body: "Share your goals, history, and concerns so a clinician can review what’s appropriate.",
  },
  {
    title: "Get a personalized plan",
    body: "If approved, your option is selected or compounded to match your care path.",
  },
  {
    title: "Discreet delivery + support",
    body: "Medication ships to your door with portal support for questions and refills.",
  },
];

const detailsBySlug: Record<string, ProductDetailContent> = {
  "anti-aging-cream": {
    badge: "Dermatologist formulated",
    rating: "Clinician reviewed",
    reviewCount: "Comments on this page",
    headline: "The Anti-Aging Cream",
    description:
      "Treat fine lines and wrinkles, uneven skin tone, and collagen support with a solution personalized for your skin.",
    howItWorks:
      "Prescription-strength renewal actives help accelerate cell turnover, support collagen, brighten tone, and soften the look of lines with consistent use.",
    howToUse:
      "Start 2–3 nights per week, then increase as tolerated. Apply a pea-sized amount at night, follow with moisturizer, and use sunscreen daily.",
    formulations: [
      "Custom strength matched after clinical review",
      "Renewal complex for cell turnover",
      "Antioxidant support for tone and barrier",
    ],
    science: [
      {
        title: "Current aging skin",
        body: "When collagen support declines, fine lines and uneven texture become more visible.",
      },
      {
        title: "Active repair",
        body: "A clinician-guided renewal plan helps jump-start smoother texture and brighter tone.",
      },
      {
        title: "Restored & protected",
        body: "With consistency, skin can look firmer, more even, and better supported day to day.",
      },
    ],
    steps: sharedSteps,
    why: [
      {
        title: "More potent",
        points: [
          "Clinician-guided strengths",
          "Pharmaceutical-grade pathways",
          "Personalized for your skin goals",
        ],
      },
      {
        title: "More accessible",
        points: [
          "100% online intake",
          "Portal messaging support",
          "Delivered to your door",
        ],
      },
      {
        title: "Clear pricing",
        points: [
          "Transparent monthly ranges",
          "No clinic wait rooms",
          "Pause or update through support",
        ],
      },
    ],
    testimonials: [
      {
        name: "Nate",
        quote:
          "After 6–7 weeks the creases around my mouth softened and my skin had a healthier glow. People thought I had a facelift.",
        condition: "Anti-aging",
      },
      {
        name: "Ella",
        quote:
          "My skin looks smoother and plumper, and fine lines are less pronounced after a few months of consistent use.",
        condition: "Anti-aging",
      },
      {
        name: "Robert",
        quote:
          "Easy to start, products that actually fit a routine, and results I can stick with.",
        condition: "Anti-aging",
      },
    ],
    faqs: [
      {
        q: "How does this cream help with anti-aging?",
        a: "It combines clinician-selected actives that support cell turnover, collagen pathways, brightness, and smoother texture over time.",
      },
      {
        q: "When will I start seeing results?",
        a: "Some people notice smoother, brighter skin in 4–6 weeks. More visible improvements often appear after about 12 weeks of consistent use.",
      },
      {
        q: "Can I use it every night?",
        a: "If you’re new, start 2–3 nights per week and increase as tolerated. Your clinician may tailor the schedule.",
      },
      {
        q: "Will it cause irritation or peeling?",
        a: "Mild dryness, flaking, or redness can happen early on. A gentle cleanser, moisturizer, and sunscreen usually help as your skin adjusts.",
      },
      {
        q: "Can I use this if I’m pregnant or breastfeeding?",
        a: "Prescription retinoid-class treatments are typically not recommended in pregnancy or breastfeeding. Ask a clinician about safer alternatives.",
      },
    ],
  },
  "acne-cream": {
    badge: "Dermatologist informed",
    rating: "Clinician reviewed",
    reviewCount: "Comments on this page",
    headline: "The Acne Cream",
    description:
      "Target breakouts, clogged pores, and uneven texture with a prescription pathway matched to your skin.",
    howItWorks:
      "Clinician-guided acne formulas help clear active breakouts, reduce congestion, and support clearer-looking skin with a routine you can follow.",
    howToUse:
      "Apply a thin layer to affected areas as directed. Pair with a gentle cleanser and non-comedogenic moisturizer. Use sunscreen daily.",
    formulations: [
      "Multiple strengths after clinical review",
      "Targets congestion and inflammation pathways",
      "Built for ongoing refill support",
    ],
    science: [
      {
        title: "Congested skin",
        body: "Clogged pores and inflammation drive breakouts and leftover marks.",
      },
      {
        title: "Active clearing",
        body: "Prescription pathways help reduce active acne and support clearer texture.",
      },
      {
        title: "Calmer routine",
        body: "With consistency and check-ins, many people see fewer flares and smoother skin.",
      },
    ],
    steps: sharedSteps,
    why: [
      {
        title: "Targeted care",
        points: [
          "Strengths matched to your skin",
          "Clinician review before prescribing",
          "Guidance when irritation shows up",
        ],
      },
      {
        title: "Private & online",
        points: ["No waiting room", "Discreet packaging", "Portal follow-ups"],
      },
      {
        title: "Practical pricing",
        points: [
          "Clear monthly ranges",
          "Refills when approved",
          "Support included in your plan",
        ],
      },
    ],
    testimonials: [
      {
        name: "Mary",
        quote:
          "I tried everything for acne and nothing stuck — until a clinician-guided plan finally made a difference for my skin and confidence.",
        condition: "Acne",
      },
      {
        name: "Jordan",
        quote:
          "Clear instructions, discreet delivery, and fewer breakouts after sticking with the routine.",
        condition: "Acne",
      },
    ],
    faqs: [
      {
        q: "How fast can acne improve?",
        a: "Many people notice fewer new breakouts within several weeks, with clearer texture building over 8–12 weeks.",
      },
      {
        q: "Can it dry my skin out?",
        a: "Some dryness is possible. Your clinician may adjust strength or frequency and recommend a gentler moisturizer.",
      },
      {
        q: "Do I still need sunscreen?",
        a: "Yes. Daily sunscreen helps protect healing skin and reduce leftover marks.",
      },
    ],
  },
  "hyperpigmentation-cream": {
    badge: "Tone & clarity focused",
    rating: "Clinician reviewed",
    reviewCount: "Comments on this page",
    headline: "The Hyperpigmentation Cream",
    description:
      "Help fade dark spots and uneven tone with a brightening plan reviewed by a licensed clinician.",
    howItWorks:
      "Actives that support pigment pathways and cell turnover can gradually even tone when used consistently with sun protection.",
    howToUse:
      "Apply as directed, usually at night. Always use broad-spectrum sunscreen in the daytime — UV exposure can reverse progress.",
    formulations: [
      "Brightening actives selected for your concern",
      "Strength options after clinical review",
      "Pairs with a simple gentle routine",
    ],
    science: [
      {
        title: "Uneven pigment",
        body: "Extra melanin in spots or patches creates a blotchy, uneven look.",
      },
      {
        title: "Guided brightening",
        body: "Clinician-selected actives help fade discoloration and support clearer tone.",
      },
      {
        title: "Protected progress",
        body: "Daily SPF helps lock in gains and reduce new dark spots.",
      },
    ],
    steps: sharedSteps,
    why: [
      {
        title: "Focused on tone",
        points: [
          "Targets dark spots and unevenness",
          "Personalized after intake",
          "Follow-up when you need adjustments",
        ],
      },
      {
        title: "Easy access",
        points: ["Online consult", "Home delivery", "Ongoing portal support"],
      },
      {
        title: "Transparent plan",
        points: [
          "Clear monthly pricing",
          "No spa upsell maze",
          "Clinician oversight included",
        ],
      },
    ],
    testimonials: [
      {
        name: "Sam",
        quote:
          "Dark spots from old breakouts finally started fading once I had a real plan and stuck with SPF.",
        condition: "Hyperpigmentation",
      },
      {
        name: "Ava",
        quote:
          "Tone looks more even after a few months — packaging was discreet and instructions were clear.",
        condition: "Hyperpigmentation",
      },
    ],
    faqs: [
      {
        q: "How long until dark spots fade?",
        a: "Pigment changes are gradual. Many people see improvement over 8–12+ weeks with consistent use and daily sunscreen.",
      },
      {
        q: "Can I use it with retinol or acids?",
        a: "Keep the routine simple unless your clinician says otherwise. Layering strong actives can increase irritation.",
      },
      {
        q: "Is sunscreen required?",
        a: "Yes. Without daily SPF, hyperpigmentation often returns or worsens.",
      },
    ],
  },
  zonnic: {
    badge: "Health Canada–authorized NRT",
    rating: "Clinician reviewed",
    reviewCount: "Comments on this page",
    headline: "ZONNIC Nicotine Pouches",
    description:
      "A pouch-format nicotine replacement therapy to help adults quit smoking — measured 4 mg doses, mint flavours, and discreet online care.",
    howItWorks:
      "Place a pouch under your upper lip. Nicotine is absorbed gradually to temporarily relieve cravings and withdrawal while you break the smoking habit. Relief can last up to about 60 minutes per pouch.",
    howToUse:
      "Month 1: 1 pouch every 1–2 hours (max 15/day). Month 2: every 2–4 hours. Month 3: every 4–8 hours. Do not chew or swallow. Avoid acidic drinks while a pouch is in place. Dispose of used pouches in the lid compartment.",
    formulations: [
      "Classic Taste (mint)",
      "Balanced Spearmint",
      "Bold Peppermint",
      "4 mg nicotine per pouch · tobacco-free",
    ],
    science: [
      {
        title: "Cravings hit hard",
        body: "Withdrawal symptoms like irritability and restlessness make quitting feel impossible without support.",
      },
      {
        title: "Measured nicotine",
        body: "ZONNIC delivers a controlled oral dose so you can manage urges without lighting up.",
      },
      {
        title: "Step down over time",
        body: "A 3-month dosing schedule helps you reduce frequency as the habit weakens.",
      },
    ],
    steps: sharedSteps,
    why: [
      {
        title: "Pouch format",
        points: [
          "Only pouch NRT authorized in Canada",
          "No smoke, no vapour, no chewing",
          "Discreet under the lip",
        ],
      },
      {
        title: "Quit-focused",
        points: [
          "For adults motivated to quit",
          "Not for non-smokers or under 18",
          "Clinician / pharmacy pathway",
        ],
      },
      {
        title: "Clear plan",
        points: [
          "Transparent pricing from $12.50 per tin",
          "Home delivery",
          "Portal support for questions",
        ],
      },
    ],
    testimonials: [
      {
        name: "Marcus",
        quote:
          "Having a pouch ready when a craving hit made quitting feel manageable for the first time.",
        condition: "Quit smoking",
      },
      {
        name: "Daniel",
        quote:
          "Discreet, no smoke, and clear dosing. Faster than booking a clinic visit.",
        condition: "Quit smoking",
      },
      {
        name: "Chris",
        quote:
          "I stepped down over three months following the schedule — still smoke-free.",
        condition: "Quit smoking",
      },
    ],
    faqs: [
      {
        q: "Is ZONNIC tobacco?",
        a: "No. ZONNIC does not contain tobacco. It is authorized as a nicotine replacement therapy to help adults quit smoking.",
      },
      {
        q: "Who should not use ZONNIC?",
        a: "Not for people under 18, pregnant or breastfeeding individuals, non-smokers, or those with certain medical conditions. Ask a clinician if you have heart disease, high blood pressure, or other ongoing issues.",
      },
      {
        q: "How many pouches per day?",
        a: "Do not exceed 15 pouches in 24 hours. Follow the month-by-month schedule on the product page or your care instructions.",
      },
    ],
  },
};

function defaultDetail(product: Product): ProductDetailContent {
  const byCategory: Record<
    string,
    { howItWorks: string; howToUse: string; formulations: string[] }
  > = {
    "weight-loss": {
      howItWorks:
        "GLP-1 and related metabolic options are considered only after a clinician reviews your history, goals, and any required labs. They are not over-the-counter weight products.",
      howToUse:
        "If approved, follow the injection or tablet schedule in your plan, including missed-dose rules from the pharmacy label. Do not change dose without clinician guidance. Message the portal for nausea, hydration, or refill timing.",
      formulations: [
        "Brand or generic option selected after review",
        "Dose titration is clinician-directed",
        "Lifestyle support sits beside medication, not instead of it",
      ],
    },
    "sexual-health": {
      howItWorks:
        "PDE5 and related options increase blood flow when sexual stimulation is present. A clinician checks heart health, nitrates, and other medications before recommending a product.",
      howToUse:
        "Take only as directed on your approved label — often before anticipated activity, not as a daily vitamin unless prescribed that way. Avoid nitrates. Alcohol can worsen side effects.",
      formulations: [
        "On-demand or daily regimens when appropriate",
        "Tablet or chewable formats depending on the product",
        "Strength chosen after clinical review",
      ],
    },
    "hair-loss": {
      howItWorks:
        "Finasteride and minoxidil pathways target DHT-related thinning or follicle stimulation. Results are gradual and typically assessed over months, not days.",
      howToUse:
        "Use tablets or topical exactly as labeled if approved. Topicals go on a dry scalp; wash hands after. Tell the clinician about pregnancy plans — some hair medicines are not appropriate if someone in the household could become pregnant.",
      formulations: [
        "Oral, topical, or combined paths",
        "Supply windows shown on the product card",
        "Follow-up if shedding or irritation appears",
      ],
    },
    longevity: {
      howItWorks:
        "Longevity programs start with labs and a plan — not a single supplement sold as a cure. Optional add-ons are only used when a clinician agrees they fit.",
      howToUse:
        "Complete recommended bloodwork first. Follow the action plan you receive. Add-ons such as NAD+ are optional and are not a substitute for sleep, movement, and metabolic care.",
      formulations: [
        "Biomarker panel and written plan",
        "Optional add-ons after review",
        "Recheck intervals set by the care team",
      ],
    },
    "mental-health": {
      howItWorks:
        "Care starts with a consultation. Medication is only added if a clinician decides it is appropriate for your symptoms, history, and province of residence.",
      howToUse:
        "Keep follow-up appointments and report worsening mood, agitation, or thoughts of self-harm immediately — call local emergency services if you are in danger. Do not stop a prescribed medicine abruptly unless told to.",
      formulations: [
        "Consultation-first path",
        "Medication plan only when approved",
        "Portal check-ins for side effects",
      ],
    },
    "quit-smoking": {
      howItWorks:
        "Nicotine replacement can reduce withdrawal while you change the smoking habit. ZONNIC is authorized in Canada as NRT — not as a recreational pouch.",
      howToUse:
        "Follow the month-by-month pouch schedule on the product page if approved. Do not exceed the daily maximum. Keep away from children. Not for non-smokers or people under 18.",
      formulations: [
        "Measured nicotine pouches",
        "Mint flavour options",
        "Step-down schedule over months",
      ],
    },
    skin: {
      howItWorks:
        "Prescription creams use clinician-selected strengths for acne, tone, or aging concerns. Barrier care and sunscreen are part of the plan.",
      howToUse:
        "Start slowly if directed, moisturize, and use daily SPF. Pause and message the team for severe peeling, swelling, or eye irritation.",
      formulations: [
        "Custom strength after review",
        "Simple supporting routine",
        "Adjustments via portal if needed",
      ],
    },
  };

  const extra = byCategory[product.category];

  return {
    badge: "Clinician reviewed",
    rating: "Review after intake",
    reviewCount: "No public star rating listed",
    headline: product.name,
    description: product.blurb,
    howItWorks:
      extra?.howItWorks ??
      `${product.name} is considered during a clinician review of your goals, history, and whether this option is appropriate for you.`,
    howToUse:
      extra?.howToUse ??
      "Follow the directions on your approved plan and pharmacy label. Message the care team about timing or side effects — do not change dose on your own.",
    formulations: extra?.formulations ?? [
      "Option selected after clinical review",
      "Clear expectations before you start",
      "Support available for refills and follow-ups",
    ],
    science: [
      {
        title: "Your goals first",
        body: "Intake captures what you want to change so clinicians can recommend a fit — or an alternative.",
      },
      {
        title: "Clinical review",
        body: "A licensed clinician decides whether this medication pathway is appropriate.",
      },
      {
        title: "Ongoing support",
        body: "Portal messaging helps with questions, titration notes, and refill timing.",
      },
    ],
    steps: sharedSteps,
    why: [
      {
        title: "Private care",
        points: ["Online intake", "Discreet fulfillment", "Judgment-free support"],
      },
      {
        title: "Licensed clinicians",
        points: [
          "Review before prescribing",
          "Canadian care pathways",
          "Safety-first decisions",
        ],
      },
      {
        title: "Practical delivery",
        points: [
          "Shipped to your door",
          "Clear instructions",
          "Easy follow-up questions",
        ],
      },
    ],
    testimonials: [
      {
        name: "Alex",
        quote:
          "The process was clear from intake to delivery, and I always knew who to ask when I had a question.",
        condition: product.category,
      },
      {
        name: "Jordan",
        quote:
          "Private, straightforward, and easier than booking a clinic visit for a basic follow-up.",
        condition: product.category,
      },
    ],
    faqs: [
      {
        q: `How do I get started with ${product.name}?`,
        a: "Complete a short intake. A licensed clinician reviews whether this option is appropriate before anything is prescribed.",
      },
      {
        q: "Is approval guaranteed?",
        a: "No. Approval depends on your history, goals, and clinical judgment.",
      },
      {
        q: "How is medication delivered?",
        a: "If approved, fulfillment is discreet and shipped through partner pharmacy pathways.",
      },
    ],
  };
}

export function getProductDetail(slug: string): ProductDetailContent | null {
  const product = getProduct(slug);
  if (!product) return null;
  return detailsBySlug[slug] ?? defaultDetail(product);
}

/** Skincare landing content. */
export const skincare = {
  hero: {
    eyebrow: "Prescription skincare",
    title: "Skincare, personalized",
    description:
      "Feel better in your skin with clinician-guided formulas for acne, anti-aging, and hyperpigmentation — online.",
  },
  trust: [
    "CA-certified pharmacy pathways",
    "Personalized treatments",
    "1:1 medical support",
    "Discreet delivery",
  ],
  concerns: [
    {
      id: "acne",
      title: "Acne",
      body: "Clearer-looking skin with a prescription pathway matched to your breakouts.",
      href: "/acne-cream",
      image: "/images/meds/med-acne.png",
    },
    {
      id: "anti-aging",
      title: "Anti-Aging",
      body: "Softened lines, brighter tone, and collagen-minded support.",
      href: "/anti-aging-cream",
      image: "/images/meds/med-anti-aging.png",
    },
    {
      id: "hyperpigmentation",
      title: "Hyperpigmentation",
      body: "Fade dark spots and uneven tone with a guided brightening plan.",
      href: "/hyperpigmentation-cream",
      image: "/images/meds/med-hyperpigmentation.png",
    },
  ],
  steps: [
    {
      step: "01",
      title: "Online consultation",
      body: "Answer simple questions about your skin, health, and treatment goals.",
    },
    {
      step: "02",
      title: "Thorough provider review",
      body: "A licensed clinician reviews your info and customizes a skincare plan when appropriate.",
    },
    {
      step: "03",
      title: "Direct shipping & easy refills",
      body: "If prescribed, medication ships to you — no pharmacy visit required.",
    },
  ],
  why: [
    "Clinically backed, personalized skin plans",
    "Regular check-ins with adjustments",
    "Dermatologist-informed treatments",
    "Skin type & concern profiling",
  ],
  faqs: [
    {
      q: "Is this real prescription skincare?",
      a: "When clinically appropriate, clinicians may prescribe personalized formulas. Over-the-counter advice alone is never a substitute for clinical review.",
    },
    {
      q: "How fast can I start?",
      a: "Complete an online intake, then a clinician reviews your information. Approved plans ship discreetly afterward.",
    },
    {
      q: "Can I pause or change my plan?",
      a: "Yes — message support to update, pause, or ask about formula adjustments.",
    },
  ],
};
