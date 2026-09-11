/** Local medviCare media — files that exist in /public. */
export const media = {
  heroPeople: "/images/patients-home.jpg",
  patients: "/images/patients-home.jpg",
  blogBg: "/images/faq-care.jpg",
  faqSidebar: "/images/faq-sidebar.jpg",
  footerCta: "/images/footer-cta-warm.jpg",
  heroHome: "/images/hero2.jpg",
  heroSide: "/images/hero6.jpg",
  pageHeroes: {
    about: "/images/hero6.jpg",
    contact: "/images/hero4.png",
    faqs: "/images/faq-care.jpg",
    howItWorks: "/images/process-share-story.jpg",
    treatments: "/images/hero3.jpg",
    medications: "/images/why-clinical.jpg",
    blog: "/images/faq-care.jpg",
    lifestyle: "/images/patients-home.jpg",
    legal: "/images/hero6.jpg",
    skin: "/images/skin-glow.png",
    mental: "/images/mental.jpg",
    habit: "/images/quit-smoking-male.png",
    longevity: "/images/live-longer-new.png",
  },
  treatments: {
    weight: "/images/weight-tablet-close.png",
    hair: "/images/regrow-hair.png",
    skin: "/images/skin-glow.png",
    longevity: "/images/live-longer-new.png",
    sex: "/images/sexual-health.png",
    mental: "/images/hair.png",
    smoking: "/images/quit-smoking-male.png",
  },
  steps: {
    step1: "/images/process-step1.jpg",
    step2: "/images/process-share-story.jpg",
    step3: "/images/process-step3.jpg",
  },
  solutions: [
    "/images/why-online.jpg",
    "/images/why-clinical.jpg",
    "/images/why-providers.jpg",
  ],
  team: [
    {
      name: "Dr. Aisha Rahman",
      title: "MD, Family Medicine",
      image: "/images/team-priya.jpg",
      badges: ["CFPC", "U of T"],
    },
    {
      name: "Jordan Lee",
      title: "Clinical Pharmacist",
      image: "/images/team-omar.jpg",
      badges: ["RPh", "OCP"],
    },
    {
      name: "Dr. Sam Okonkwo",
      title: "MD, Mental Health",
      image: "/images/team-elena.jpg",
      badges: ["APA", "RCPSC"],
    },
  ],
};

export const brand = {
  name: "medviCare",
  legal: "medviCare Health Inc.",
  email: "hello@medvicare.care",
  press: "press@medvicare.care",
  tagline: "Private care. Practical plans. Delivered.",
  address:
    "Online care for adults in Canada. Availability varies by province and care path.",
};

export type Treatment = {
  slug: string;
  title: string;
  accent: string;
  href: string;
  image: string;
  span: string;
  summary: string;
  benefits: string[];
  /** Product category keys shown on this treatment page */
  productCategories: string[];
};

export type Product = {
  slug: string;
  name: string;
  image: string;
  category: string;
  blurb: string;
  href: string;
  price?: string;
  priceLabel?: string;
  tag?: string;
};

export const treatments: Treatment[] = [
  {
    slug: "weight-loss",
    title: "Lose",
    accent: "weight",
    href: "/body-optimization",
    image: media.treatments.weight,
    span: "md:col-span-4",
    summary:
      "Clinician-guided metabolic support with clear goals, discreet delivery, and ongoing check-ins.",
    benefits: [
      "Personalized plan after medical review",
      "Progress tracking through the portal",
      "Discreet pharmacy fulfillment",
    ],
    productCategories: ["weight-loss"],
  },
  {
    slug: "hair-loss",
    title: "Regrow",
    accent: "hair",
    href: "/hairloss",
    image: media.treatments.hair,
    span: "md:col-span-2",
    summary:
      "Evidence-based hair care options reviewed by licensed clinicians for lasting results.",
    benefits: [
      "Targeted topical and oral options",
      "Clear expectations on timelines",
      "Follow-up support included",
    ],
    productCategories: ["hair-loss"],
  },
  {
    slug: "skin",
    title: "Get glowing",
    accent: "skin",
    href: "/skincare",
    image: media.treatments.skin,
    span: "md:col-span-2",
    summary:
      "Dermatology-informed routines and prescriptions for clearer, calmer skin — online.",
    benefits: [
      "Plans matched to your skin goals",
      "Ingredient guidance you can trust",
      "Convenient refills when approved",
    ],
    productCategories: ["skin"],
  },
  {
    slug: "longevity",
    title: "Live",
    accent: "longer",
    href: "/longevity",
    image: media.treatments.longevity,
    span: "md:col-span-2",
    summary:
      "Longevity-focused care that prioritizes energy, recovery, and sustainable habits.",
    benefits: [
      "Clinician-reviewed wellness plans",
      "Practical daily routines",
      "Support when questions come up",
    ],
    productCategories: ["longevity"],
  },
  {
    slug: "sexual-health",
    title: "Sexual",
    accent: "health",
    href: "/sexual-health",
    image: media.treatments.sex,
    span: "md:col-span-2",
    summary:
      "Private sexual health care with licensed providers and discreet packaging.",
    benefits: [
      "Judgment-free clinical intake",
      "Trusted medication options",
      "100% discreet delivery",
    ],
    productCategories: ["sexual-health"],
  },
  {
    slug: "mental-health",
    title: "Tackle",
    accent: "mental health",
    href: "/mental-health",
    image: media.treatments.mental,
    span: "md:col-span-2",
    summary:
      "Thoughtful mental health support with clinicians who listen before they prescribe.",
    benefits: [
      "Secure intake and messaging",
      "Care plans built around you",
      "Ongoing check-ins available",
    ],
    productCategories: ["mental-health"],
  },
  {
    slug: "quit-smoking",
    title: "Quit",
    accent: "smoking",
    href: "/zonnic",
    image: media.treatments.smoking,
    span: "md:col-span-2",
    summary:
      "Habit-change support designed to help you quit with structure and clinical guidance.",
    benefits: [
      "Step-by-step quit pathway",
      "Medication options when suitable",
      "Accountability through the portal",
    ],
    productCategories: ["quit-smoking"],
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Pick your goal",
    description: "Browse care paths or start a short health quiz in minutes.",
    image: media.steps.step1,
  },
  {
    step: "02",
    title: "Share your story",
    description:
      "A licensed clinician reviews your history before anything is prescribed.",
    image: media.steps.step2,
  },
  {
    step: "03",
    title: "Care at your door",
    description:
      "Approved plans ship discreetly — with ongoing chat support included.",
    image: media.steps.step3,
  },
];

export const expertPoints = [
  {
    title: "Certified Specialists",
    description: "Over 20 years of experience in specialized medicine.",
  },
  {
    title: "Healthcare Reimagined",
    description:
      "Revolutionizing traditional medicine to deliver personalized care for all.",
  },
  {
    title: "Technology-Powered Care",
    description:
      "Advanced digital solutions making healthcare more convenient, effective and patient-centered.",
  },
];

export const faqs = [
  {
    q: "What does medviCare offer?",
    a: "medviCare is a Canadian digital clinic. You complete a private intake, a licensed clinician reviews it, and — if treatment is appropriate — a personalized plan can be fulfilled through partner pharmacies and delivered discreetly. Paths include metabolic health, hair, skin, sexual health, mental health, and habit support.",
  },
  {
    q: "What happens after I start?",
    a: "You answer focused questions about your goals, history, and current medications. A clinician decides whether a treatment path is suitable. If it is, the plan is prepared, shipped, and you can follow up in the portal instead of booking another in-person visit.",
  },
  {
    q: "Who is on the care team?",
    a: "Physicians, nurse practitioners, and pharmacists guide treatment and fulfillment. Support staff help with portal messages, delivery questions, and refills so clinical details stay with the people responsible for your plan.",
  },
  {
    q: "How is my information kept private?",
    a: "Personal and medical details are limited to the professionals managing your care. Systems are set up to meet applicable privacy expectations, and packaging and billing are designed to stay discreet wherever possible.",
  },
];

export const productFaqs = [
  {
    q: "How long does shipping take?",
    a: "Once a clinician approves your plan, partner pharmacies typically prepare and ship within a few business days. You’ll receive tracking updates in your portal.",
  },
  {
    q: "Can I message my care team?",
    a: "Yes. Secure portal messaging lets you ask about dosing, side effects, or refill timing without booking another appointment.",
  },
  {
    q: "What if a medication isn’t right for me?",
    a: "Your clinician may recommend an alternative, adjust the plan, or advise against treatment if it’s not clinically appropriate.",
  },
  {
    q: "Are packaging and billing discreet?",
    a: "Shipments use plain packaging. Billing descriptors are designed to stay private on your statement where possible.",
  },
];

export const trustItems = [
  "Licensed pharmacy partners",
  "Clinician-reviewed plans",
  "Regulated medications",
  "Discreet home delivery",
];

export const reviews = [
  {
    title: "Clear and supportive",
    body: "The intake was simple and the clinician explained everything before my plan started. Felt private and professional the whole way.",
    name: "Alex M.",
  },
  {
    title: "Fantastic team!",
    body: "Quick responses in the portal and delivery showed up when expected. medviCare made the process feel easy from day one.",
    name: "Priya S.",
  },
  {
    title: "Truly reliable care",
    body: "I asked follow-up questions after starting treatment and got helpful answers fast. Exactly the kind of support I needed.",
    name: "Jordan K.",
  },
  {
    title: "Discreet and straightforward",
    body: "No awkward clinic visits — just a clear plan, solid guidance, and packaging that stayed private. Would recommend medviCare.",
    name: "Sam R.",
  },
  {
    title: "Real service",
    body: "From quiz to delivery everything felt organized. The care team was kind and the instructions were easy to follow.",
    name: "Taylor W.",
  },
];

/** Only the medications shown in the reference catalog image. */
export const products: Product[] = [
  {
    slug: "cialis",
    name: "Cialis®",
    image: "/images/meds/med-cialis.png",
    category: "sexual-health",
    blurb: "Longer-acting support for sexual health when clinically appropriate.",
    href: "/medications/cialis",
    price: "$48",
    priceLabel: "From $48",
  },
  {
    slug: "viagra",
    name: "Viagra®",
    image: "/images/meds/med-viagra.png",
    category: "sexual-health",
    blurb: "Trusted option reviewed by licensed clinicians.",
    href: "/medications/viagra",
    price: "$42",
    priceLabel: "From $42",
  },
  {
    slug: "chewalis",
    name: "Chewalis",
    image: "/images/meds/med-chewalis.png",
    category: "sexual-health",
    blurb: "Convenient chewable format for discreet daily life.",
    href: "/medications/chewalis",
    price: "$138",
    priceLabel: "From $138",
  },
  {
    slug: "ozempic",
    name: "Ozempic®",
    image: "/images/meds/med-ozempic.png",
    category: "weight-loss",
    blurb: "GLP-1 option as part of a supervised metabolic plan.",
    href: "/medications/ozempic",
    price: "$299",
    priceLabel: "Program pricing from $299",
  },
  {
    slug: "mounjaro",
    name: "Mounjaro®",
    image: "/images/meds/med-mounjaro.png",
    category: "weight-loss",
    blurb: "Clinician-guided dual-agonist pathway for eligible patients.",
    href: "/medications/mounjaro",
    price: "$329",
    priceLabel: "Program pricing from $329",
  },
  {
    slug: "anti-aging-cream",
    name: "Anti-aging Cream",
    image: "/images/meds/med-skin-antiaging.jpg",
    category: "skin",
    blurb: "Treat fine lines, uneven tone, and support collagen with a clinician-guided formula.",
    href: "/anti-aging-cream",
    price: "$110",
    priceLabel: "For only $110/month",
    tag: "Prescription · 3 strengths",
  },
  {
    slug: "acne-cream",
    name: "Acne Cream",
    image: "/images/meds/med-skin-acne.jpg",
    category: "skin",
    blurb: "Prescription-strength support for breakouts, texture, and clearer-looking skin.",
    href: "/acne-cream",
    price: "$95",
    priceLabel: "For only $95/month",
    tag: "Prescription · 3 strengths",
  },
  {
    slug: "hyperpigmentation-cream",
    name: "Hyperpigmentation Cream",
    image: "/images/meds/med-skin-pigment.jpg",
    category: "skin",
    blurb: "Target dark spots and uneven tone with a dermatologist-informed brightening plan.",
    href: "/hyperpigmentation-cream",
    price: "$105",
    priceLabel: "For only $105/month",
    tag: "3 strengths",
  },
  {
    slug: "hair-foam",
    name: "Finasteride & Minoxidil Foam",
    image: "/images/meds/med-hair-foam.jpg",
    category: "hair-loss",
    blurb: "Targeted topical support for hair regrowth paths.",
    href: "/medications/hair-foam",
    price: "$185",
    priceLabel: "From $185 · 2 months",
  },
  {
    slug: "zonnic",
    name: "ZONNIC Nicotine Pouches",
    image: "/images/meds/med-zonnic.png",
    category: "quit-smoking",
    blurb:
      "Health Canada–authorized nicotine pouches to help manage cravings while you quit.",
    href: "/medications/zonnic",
    price: "$12.50",
    priceLabel: "From $12.50 / tin · 24 × 4 mg",
    tag: "NRT · mint flavours",
  },
  {
    slug: "semaglutide",
    name: "Semaglutide (Generic Ozempic)",
    image: "/images/meds/med-semaglutide.png",
    category: "weight-loss",
    blurb: "Generic GLP-1 pathway when a clinician approves it.",
    href: "/medications/semaglutide",
    price: "$249",
    priceLabel: "Program pricing from $249",
  },
  {
    slug: "hair-tablet-topical",
    name: "Tablet & topical",
    image: "/images/meds/med-hair-combo-w.jpg",
    category: "hair-loss",
    blurb: "Finasteride tablets with minoxidil solution — a combined 3-month path.",
    href: "/medications/hair-tablet-topical",
    priceLabel: "From $180 · 3 months",
    tag: "3 Months Supply",
  },
  {
    slug: "hair-topical",
    name: "Minoxidil solution",
    image: "/images/meds/med-hair-topical-w.jpg",
    category: "hair-loss",
    blurb: "Topical minoxidil to support density at the crown and hairline.",
    href: "/medications/hair-topical",
    priceLabel: "From $101.25 · 3 months",
    tag: "3 Months Supply",
  },
  {
    slug: "hair-tablet",
    name: "Finasteride tablets",
    image: "/images/meds/med-hair-tablet-w.jpg",
    category: "hair-loss",
    blurb: "Oral finasteride when a clinician approves it for pattern hair loss.",
    href: "/medications/hair-tablet",
    priceLabel: "From $165 · 3 months",
    tag: "3 Months Supply",
  },
  {
    slug: "longevity-program",
    name: "Longevity Program",
    image: media.treatments.longevity,
    category: "longevity",
    blurb: "38+ biomarker testing, biological age, and a personalized action plan.",
    href: "/medications/longevity-program",
    price: "$299",
    priceLabel: "From $299",
    tag: "Program",
  },
  {
    slug: "nad-plus",
    name: "NAD+",
    image: media.treatments.longevity,
    category: "longevity",
    blurb: "Optional NAD+ pathway for cellular energy when clinically appropriate.",
    href: "/medications/nad-plus",
    price: "$200",
    priceLabel: "From $200 / month",
    tag: "Add-on",
  },
  {
    slug: "mh-consult",
    name: "Initial consultation",
    image: media.treatments.mental,
    category: "mental-health",
    blurb: "Private virtual review to see whether a treatment plan is appropriate.",
    href: "/medications/mh-consult",
    price: "$60",
    priceLabel: "From $60",
    tag: "Consultation",
  },
  {
    slug: "mh-medication",
    name: "Medication plan",
    image: media.treatments.mental,
    category: "mental-health",
    blurb: "Monthly prescription pathway when a clinician approves treatment.",
    href: "/medications/mh-medication",
    price: "$40",
    priceLabel: "From $15–$40 / month",
    tag: "Monthly",
  },
];

/** Lightweight list used in menus/home chips */
export const meds = products.map((p) => ({
  name: p.name,
  href: p.href,
  blurb: p.blurb,
  image: p.image,
}));

export function getProductsByCategories(categories: string[]) {
  return products.filter((p) => categories.includes(p.category));
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const blogPosts = [
  {
    slug: "starting-online-care",
    title: "What to expect when you start online care",
    category: "Lifestyle",
    excerpt:
      "A simple walkthrough of intake, clinician review, and how discreet delivery works.",
    body: [
      "Starting online care is meant to feel like a structured visit, not a checkout page. You answer questions about your goals, history, and current medications so a licensed clinician can review whether a path is appropriate.",
      "If a plan is approved, fulfillment typically goes through a licensed pharmacy partner. Packaging is plain, and follow-up happens in a private portal rather than a waiting room.",
      "You can pause and message the care team if something is unclear — dosing windows, side effects, or shipping timing. Emergency symptoms still belong with local urgent care or 911, not the inbox.",
      "Bring a current medication list and any recent labs you already have. That shortens review time and reduces back-and-forth after you submit.",
    ],
  },
  {
    slug: "habits-that-stick",
    title: "Building habits that stick with treatment",
    category: "Lifestyle",
    excerpt:
      "Small routines that make weight, hair, and mental health plans easier to follow.",
    body: [
      "Most plans fail on ordinary Tuesdays, not on day one. Pair a new medication or topical with something you already do: after brushing teeth, with breakfast, or when you set an evening alarm.",
      "Write down one friction point — travel, shift work, or remembering refills — and solve that first. Portal reminders help, but a calendar block you already respect works better than a new app.",
      "If a side effect or schedule clash shows up, message the team before you stop on your own. Clinicians can often adjust timing or strength instead of abandoning a plan that was otherwise a fit.",
      "Track only what you will actually look at: sleep, appetite, or a weekly photo for hair. More data is not always better if you never open the note.",
    ],
  },
  {
    slug: "privacy-matters",
    title: "Why privacy matters in modern healthcare",
    category: "Health notes",
    excerpt:
      "How medviCare approaches confidentiality from intake through packaging and billing.",
    body: [
      "Health details should travel on a need-to-know path: you, the reviewing clinician, and the pharmacy team filling an approved order. Support staff see what they need to ship and answer tickets — not a full chart dump in an open inbox.",
      "Packaging is designed to look like ordinary mail. Billing descriptors can still appear on statements; if you share a card, ask support how charges typically display before you start.",
      "You can request access updates or ask privacy questions through the Contact page. We do not sell clinical information for advertising.",
      "Use a personal email you control. Shared family inboxes are the most common privacy leak in digital care — not the courier.",
    ],
  },
  {
    slug: "skin-basics",
    title: "Skincare basics before starting a prescription plan",
    category: "Skincare",
    excerpt:
      "What clinicians look for and how to prepare questions for your intake.",
    body: [
      "Prescription skincare is easier to review when you already have a gentle cleanser, moisturizer, and daily sunscreen. Strong actives on a stripped barrier usually look like “the cream isn’t working.”",
      "Photos in even indoor light — front and both sides — help more than filters. Mention pregnancy, isotretinoin history, and anything that stings on your current routine.",
      "Expect a slow build. Many pigment and acne plans need several weeks before you judge them. Daytime SPF is part of the treatment, not an optional extra.",
      "Write three questions before intake: what to pause, how often to apply, and what dryness is normal versus a reason to message the team.",
    ],
  },
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

/** Body optimization / weight-loss landing (reference sections). */
export const bodyOptimization = {
  hero: {
    eyebrow: "GLP-1 weight loss programs",
    title: "End your weight war — for good",
    description:
      "Doctor-led, personalized body optimization with clinician review, discreet delivery, and ongoing support.",
    highlight: "Lose up to 22.5% of your body weight*",
    note: "*Results vary. Based on published GLP-1 study outcomes; individual results depend on clinical eligibility and adherence.",
  },
  trust: [
    "Licensed Canadian clinicians",
    "Partner pharmacy fulfillment",
    "Discreet temperature-aware shipping",
    "Ongoing portal support",
  ],
  steps: [
    {
      step: "01",
      title: "Choose treatment",
      description:
        "Browse GLP-1 options like Ozempic®, Mounjaro®, or Semaglutide and start a focused weight-loss intake.",
    },
    {
      step: "02",
      title: "Create your profile",
      description:
        "Share your history, goals, and labs if needed. A licensed clinician reviews whether a plan is right for you.",
    },
    {
      step: "03",
      title: "Fast & discreet delivery",
      description:
        "If approved, your medication ships discreetly — with messaging support for titration and questions.",
    },
  ],
  results: [
    {
      title: "Clearer structure",
      body: "Having a clinician-guided plan made dosing and check-ins feel manageable from week one.",
      name: "Alex M.",
    },
    {
      title: "Support that responds",
      body: "I asked about side effects in the portal and got practical guidance quickly.",
      name: "Priya S.",
    },
    {
      title: "Private and straightforward",
      body: "No awkward clinic wait — just a clear path, discreet packaging, and steady follow-up.",
      name: "Jordan K.",
    },
  ],
  pricing: [
    {
      title: "Initial consult",
      value: "$99",
      detail: "One-time clinical review to assess eligibility and next steps.",
    },
    {
      title: "Program support",
      value: "$60/mo",
      detail: "Ongoing clinician access, prescription updates, and pharmacy counselling.",
    },
    {
      title: "Medication",
      value: "Varies",
      detail: "Medication cost depends on the approved option and dose.",
    },
  ],
  faqs: [
    {
      q: "How much does the weight loss program cost?",
      a: "The initial consultation fee is $99. Medication cost plus a $60 monthly program fee are charged when you continue. The program fee includes clinician access, prescription updates, and pharmacy counselling.",
    },
    {
      q: "Do you accept insurance?",
      a: "Coverage depends on your provider. We can share a detailed invoice on request so you can submit for reimbursement if your plan allows it.",
    },
    {
      q: "What can I expect after I sign up?",
      a: "After your intake, a licensed clinician reviews eligibility and may request labs. You’ll get updates and messages in your secure portal.",
    },
    {
      q: "Why do I need a blood test?",
      a: "Labs help your clinician understand metabolic health and tailor advice safely before prescribing.",
    },
    {
      q: "What are the side effects of GLP-1 medications?",
      a: "Common effects can include nausea, vomiting, abdominal pain, constipation, or diarrhea. Serious effects are uncommon but possible. Your clinician will review risks and whether treatment is appropriate.",
    },
    {
      q: "How do I schedule a call with my provider?",
      a: "After submitting your questionnaire, message your clinician in the portal to request a call. They’ll share a scheduling link when available.",
    },
    {
      q: "Can I cancel at any time?",
      a: "Yes. You can cancel to avoid future charges. Previously incurred monthly fees are typically non-refundable.",
    },
    {
      q: "How do GLP-1s work?",
      a: "GLP-1 medications mimic a natural hormone that helps regulate appetite and fullness, which can reduce food intake and support weight loss when clinically appropriate.",
    },
    {
      q: "Which GLP-1s does medviCare offer?",
      a: "Depending on eligibility, clinicians may consider options such as Ozempic®, Mounjaro®, and Semaglutide (generic pathways where available).",
    },
  ],
};

/** Hair loss landing content. */
export const hairLoss = {
  hero: {
    eyebrow: "Hair loss care online",
    title: "Make hair loss optional",
    description:
      "Clinician-reviewed treatments to help slow thinning, support regrowth, and keep your plan private — from intake to discreet delivery.",
    highlight: "Health Canada–authorized pathways when clinically appropriate",
    note: "Results vary. Hair treatments often need consistent use for 3–6+ months. A licensed clinician reviews eligibility before prescribing.",
  },
  trust: [
    "Licensed Canadian clinicians",
    "100% online & discreet",
    "Partner pharmacy fulfillment",
    "Ongoing clinical support",
  ],
  /** Priced offer cards for View options carousel (reference hairloss shop). */
  offers: [
    {
      id: "foam",
      title: "2-in-1 Foam",
      badge: "Most Popular",
      image: "/images/meds/med-hair-foam.jpg",
      lines: ["Finasteride & Minoxidil combination foam"],
      note: "*Subject to patient consultation",
      supply: "2 Months Supply",
      price: "$185",
      href: "/contact",
    },
    {
      id: "tablet-topical",
      title: "Tablet & Topical solution",
      image: "/images/meds/med-hair-combo-w.jpg",
      lines: [
        "Propecia (finasteride) Tablets*",
        "Minoxidil (Rogaine) Solution",
      ],
      note: "*Subject to patient consultation",
      supply: "3 Months Supply",
      price: "$180",
      href: "/contact",
    },
    {
      id: "topical",
      title: "Topical Solution",
      image: "/images/meds/med-hair-topical-w.jpg",
      lines: ["Minoxidil (Rogaine)"],
      supply: "3 Months Supply",
      price: "$101.25",
      compareAt: "$135",
      href: "/contact",
    },
    {
      id: "tablet",
      title: "Tablet Solution",
      image: "/images/meds/med-hair-tablet-w.jpg",
      lines: ["Finasteride (Propecia) Tablets*"],
      note: "*Subject to patient consultation",
      supply: "3 Months Supply",
      price: "$165",
      href: "/contact",
    },
  ],
  patterns: [
    {
      title: "All-over thinning",
      body: "If you’re seeing more scalp through the crown or top, treatments can help support follicle activity before more ground is lost.",
    },
    {
      title: "Receding hairline",
      body: "A higher forehead is common with family history and aging. Starting earlier often means more hair to protect.",
    },
    {
      title: "Crown thinning",
      body: "That spot everyone else notices first. Pattern hair loss here responds best when you act consistently over months.",
    },
  ],
  steps: [
    {
      step: "01",
      title: "Choose a path",
      description:
        "Explore foam, oral, or topical options and start a short hair-loss intake with your goals and history.",
    },
    {
      step: "02",
      title: "Clinician review",
      description:
        "A licensed clinician reviews eligibility, discusses expectations, and recommends a plan if appropriate.",
    },
    {
      step: "03",
      title: "Discreet delivery",
      description:
        "Approved medication ships to your door — with portal support for questions, refills, and follow-ups.",
    },
  ],
  results: [
    {
      title: "Simple daily routine",
      body: "The foam fit my morning routine. After a few months I was shedding less in the shower.",
      name: "Marcus T.",
    },
    {
      title: "Clear timelines",
      body: "They set expectations early — stick with it for months. That honesty made it easier to stay consistent.",
      name: "Dev R.",
    },
    {
      title: "Private from start to finish",
      body: "No waiting room. Packaging was discreet and check-ins stayed in the portal.",
      name: "Chris L.",
    },
  ],
  pricing: [
    {
      title: "Clinical review",
      value: "Included*",
      detail: "Intake reviewed by a licensed clinician before any prescription decision.",
    },
    {
      title: "2-in-1 foam",
      value: "From $70",
      detail: "Typical starting range for combination foam supply; exact pricing confirmed after approval.",
    },
    {
      title: "Ongoing support",
      value: "Portal",
      detail: "Message for refill timing, application questions, and plan adjustments.",
    },
  ],
  faqs: [
    {
      q: "How long until I see results?",
      a: "Most people need consistent use for about 3–6 months before meaningful changes show. Some notice reduced shedding sooner; denser regrowth can take longer.",
    },
    {
      q: "What’s the difference between foam and tablets?",
      a: "Oral finasteride targets DHT systemically. Topical minoxidil supports growth at the scalp. Combination foam aims to deliver both pathways topically for people who prefer to avoid daily pills when clinically appropriate.",
    },
    {
      q: "Is hair loss treatment right if I’m only starting to thin?",
      a: "Often yes — earlier intervention can help protect existing hair. Even with a full head of hair, family history of male pattern baldness is a reason many men ask about preventive plans.",
    },
    {
      q: "Do I need an in-person visit?",
      a: "Care starts online with a questionnaire and clinician review. Follow-ups stay in your secure portal unless your clinician asks for more information.",
    },
    {
      q: "Are treatments safe?",
      a: "Approved options have known benefits and risks. Side effects are uncommon for many users but possible. Your clinician will review whether a specific option is appropriate for you.",
    },
    {
      q: "Can I cancel or pause?",
      a: "Yes. You can stop future orders. Talk with your clinician before stopping prescription therapy, especially if you’ve been on treatment for a while.",
    },
  ],
};

export const aboutPillars = [
  {
    label: "Mission",
    title: "Make private care as easy to start as it is to need.",
    body: "Too many people wait on hair, weight, mood, or sexual health because the usual clinic path feels public and slow. medviCare is a licensed, online way to ask for help, get a clear plan, and keep follow-up in a space that stays yours.",
  },
  {
    label: "Goal",
    title: "Build every visit around the person, not the queue.",
    body: "We measure success by whether you feel understood and know what happens next. Intake, clinician review, and ongoing support are designed as one path — personal, practical, and easy to continue after day one.",
  },
  {
    label: "Focus",
    title: "Keep medicine, pharmacy, and support on the same team.",
    body: "Physicians, nurse practitioners, and pharmacists work together so your plan is reviewed, dispensed, and explained in one place. That mix of clinical, pharmacy, and mental-health expertise is how we keep care complete without sending you elsewhere.",
  },
];

export type Clinician = {
  name: string;
  credentials: string;
  role: string;
  image: string;
  bio?: string;
  badges?: string[];
  href?: string;
};

export const leadershipTeam: Clinician[] = [
  {
    name: "Dr. Aisha Rahman",
    credentials: "MD, CCFP",
    role: "Chief Medical Officer",
    image: "/images/team-priya.jpg",
    href: "/about#leadership",
    badges: ["CFPC", "U of T"],
    bio: "Leads clinical standards at medviCare so every plan is reviewed with the same care you would expect in clinic — private, practical, and easy to follow.",
  },
  {
    name: "Jordan Lee",
    credentials: "RPh, MPharm",
    role: "Chief Operating Officer",
    image: "/images/team-omar.jpg",
    href: "/about#leadership",
    badges: ["RPh", "OCP"],
    bio: "Licensed pharmacist focused on safe fulfillment, clear counseling, and getting approved plans to your door without extra steps.",
  },
  {
    name: "Dr. Sam Okonkwo",
    credentials: "MD, FAPA",
    role: "Chief Clinical Advisor",
    image: "/images/team-elena.jpg",
    href: "/about#leadership",
    badges: ["APA", "RCPSC"],
    bio: "Board-focused mental health clinician helping medviCare design private, stigma-free care pathways.",
  },
];

export const clinicians: Clinician[] = [
  ...leadershipTeam,
  {
    name: "Dr. Priya Mehta",
    credentials: "MD, FRCPC",
    role: "Endocrinology Advisor",
    image: "/images/team-priya.jpg",
    badges: ["FRCPC"],
    bio: "Advises on metabolic and hormone-related care pathways reviewed by licensed clinicians.",
  },
  {
    name: "Dr. Maya Chen",
    credentials: "MD, CCFP",
    role: "Family Medicine",
    image: "/images/team-maya.jpg",
    badges: ["CFPC"],
    bio: "Helps shape intake and follow-up so patients get clear next steps without clinic friction.",
  },
  {
    name: "Nora Patel",
    credentials: "NP",
    role: "Primary Care",
    image: "/images/team-nora.jpg",
    bio: "Experienced in community clinics and virtual platforms. Focused on making primary care easier to reach.",
  },
  {
    name: "Chris Adeyemi",
    credentials: "NP",
    role: "Family Medicine",
    image: "/images/team-chris.jpg",
    bio: "Specializes in family medicine and health promotion, with a steady, personal approach across ages.",
  },
  {
    name: "Amira Hassan",
    credentials: "RPh, PharmD",
    role: "Clinical Pharmacy",
    image: "/images/team-amira.jpg",
    badges: ["OCP"],
    bio: "Hospital and community pharmacy background with a focus on research-informed medication guidance.",
  },
  {
    name: "Dr. Omar Farid",
    credentials: "MD, CCFP",
    role: "Metabolic Health",
    image: "/images/team-omar.jpg",
    bio: "Supports metabolic and weight-related care with clear plans patients can actually stick to.",
  },
  {
    name: "Elena Vargas",
    credentials: "NP",
    role: "Weight Management",
    image: "/images/team-elena.jpg",
    bio: "Guides medical weight management with clinical plans and practical lifestyle support.",
  },
];

export const medicalAdvisory: Clinician[] = [
  {
    name: "Dr. Sam Okonkwo",
    credentials: "MD, FAPA",
    role: "Psychiatry Advisor",
    image: "/images/team-elena.jpg",
    bio: "Board-focused mental health clinician helping medviCare design private, stigma-free care pathways.",
  },
  {
    name: "Nora Patel",
    credentials: "Nurse Practitioner",
    role: "Primary Care",
    image: "/images/team-nora.jpg",
    bio: "Experienced in community clinics and virtual platforms. Focused on making primary care easier to reach.",
  },
  {
    name: "Chris Adeyemi",
    credentials: "Nurse Practitioner",
    role: "Family Medicine",
    image: "/images/team-chris.jpg",
    bio: "Specializes in family medicine and health promotion, with a steady, personal approach across ages.",
  },
  {
    name: "Morgan Blake",
    credentials: "Nurse Practitioner",
    role: "Primary Care",
    image: "/images/team-morgan.jpg",
    bio: "Supports comprehensive primary care and wellness, with a focus on discreet online options.",
  },
  {
    name: "Elena Vargas",
    credentials: "Nurse Practitioner",
    role: "Metabolic Health",
    image: "/images/team-elena.jpg",
    bio: "Guides medical weight management with clinical plans and practical lifestyle support.",
  },
  {
    name: "Dr. Priya Mehta",
    credentials: "MD, FRCPC",
    role: "Endocrinology",
    image: "/images/team-priya.jpg",
    bio: "Advises on metabolic and hormone-related care pathways reviewed by licensed clinicians.",
  },
  {
    name: "Dr. Maya Chen",
    credentials: "MD, CCFP",
    role: "Family Medicine",
    image: "/images/team-maya.jpg",
    bio: "Helps shape intake and follow-up so patients get clear next steps without clinic friction.",
  },
  {
    name: "Dr. James Okoye",
    credentials: "MD, CCFP",
    role: "Internal Medicine",
    image: "/images/team5.jpg",
    bio: "Supports clinical review standards so every plan stays appropriate and easy to follow.",
  },
];

export const pharmacyAdvisory: Clinician[] = [
  {
    name: "Jordan Lee",
    credentials: "RPh, PharmD",
    role: "Pharmacy Lead",
    image: "/images/team-omar.jpg",
    bio: "Licensed pharmacist focused on safe fulfillment, clear counseling, and practical patient support.",
  },
  {
    name: "Amira Hassan",
    credentials: "RPh, PharmD",
    role: "Clinical Pharmacy",
    image: "/images/team-amira.jpg",
    bio: "Hospital and community pharmacy background with a focus on research-informed medication guidance.",
  },
  {
    name: "Daniel Cho",
    credentials: "RPh, PharmD",
    role: "Retail Pharmacy",
    image: "/images/team-daniel.jpg",
    bio: "Brings retail and startup experience to keep everyday pharmacy workflows simple and reliable.",
  },
  {
    name: "Riley Quinn",
    credentials: "Fulfilment Coordinator",
    role: "Operations",
    image: "/images/team-riley.jpg",
    bio: "Keeps telehealth fulfillment organized — from order readiness to discreet shipping.",
  },
  {
    name: "Samira Noor",
    credentials: "Logistics Lead",
    role: "Growth Ops",
    image: "/images/team-samira.jpg",
    bio: "Connects clear patient messaging with smooth logistics so care is easy to receive.",
  },
  {
    name: "Omar Farid",
    credentials: "RPh, PharmD",
    role: "Dispensing Advisor",
    image: "/images/team-omar.jpg",
    bio: "Reviews dispensing quality and packaging standards for private, on-time delivery.",
  },
  {
    name: "Leah Brooks",
    credentials: "RPh",
    role: "Patient Counseling",
    image: "/images/team-leah.jpg",
    bio: "Helps patients understand dosing, timing, and what to do if a question comes up.",
  },
  {
    name: "Priya Shah",
    credentials: "RPh, PharmD",
    role: "Clinical Safety",
    image: "/images/team6.jpg",
    bio: "Focuses on interaction checks and clear instructions before a plan ships.",
  },
];
