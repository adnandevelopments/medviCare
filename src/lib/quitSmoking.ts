/** Quit smoking / ZONNIC product content. */
export const quitSmoking = {
  product: {
    title: "ZONNIC Nicotine Pouches",
    packageLine: "Package contains: 24 x 4mg nicotine pouches.",
    paragraphs: [
      "ZONNIC nicotine pouches offer a form of nicotine replacement therapy designed to help control cravings and support smoking cessation.",
      "Each pouch delivers a measured dose of nicotine through the lining of the mouth, helping manage withdrawal symptoms as you work toward quitting tobacco.",
    ],
    warning:
      "WARNING: This product contains nicotine. Nicotine is highly addictive. This product is intended for smoking cessation only. Do not use if you are under 19 years of age.",
    image: "/images/meds/med-zonnic.png",
    howToImage: "/images/habit.jpg",
    pricePerTin: 12.5,
  },
  flavors: [
    { id: "classic", name: "A Classic Taste" },
    { id: "peppermint", name: "A Bold Peppermint Profile" },
    { id: "spearmint", name: "A Balanced Spearmint Blend" },
  ],
  frequencies: [
    { id: "monthly", name: "Monthly Supply" },
    { id: "quarterly", name: "Quarterly Supply" },
  ],
  packs: [
    { id: "5", label: "5 tins", count: 5 },
    { id: "10", label: "10 tins", count: 10 },
    { id: "15", label: "15 tins", count: 15 },
  ],
  trust: [
    "2-day discreet delivery",
    "Health Canada–authorized NRT",
    "Pharmacy pathway support",
    "Unlimited care messaging",
  ],
  whyPanels: [
    {
      id: "why",
      title: "Why ZONNIC?",
      body: "ZONNIC is a form of Nicotine Replacement Therapy. It can help you quit smoking by delivering nicotine to your body, temporarily relieving cravings and nicotine withdrawal symptoms.",
    },
    {
      id: "how",
      title: "How does ZONNIC work?",
      body: "ZONNIC delivers measured doses of nicotine through small pouches placed under your lip. The nicotine is gradually absorbed, helping reduce cravings and withdrawal symptoms while you work toward becoming smoke-free. Each pouch provides relief for up to 60 minutes, with recommended use of about 8–12 pouches per day (max 15).",
    },
    {
      id: "help",
      title: "How does ZONNIC help smokers?",
      body: "ZONNIC is designed for smokers who are motivated to quit or reduce tobacco use. It helps manage withdrawal symptoms like intense cravings, irritability, difficulty concentrating, and restlessness — so you can focus on breaking the habit.",
    },
    {
      id: "ingredients",
      title: "What are ZONNIC’s ingredients?",
      body: "Each pouch uses a short list of ingredients: nicotine (active), plant-based fibres for a soft fit, water to keep the pouch moist, food-grade flavourings, and sweetener. No tobacco leaf.",
    },
  ],
  steps: [
    {
      step: "01",
      title: "Place it",
      body: "Place one pouch under your upper lip.",
    },
    {
      step: "02",
      title: "Leave it",
      body: "Leave the pouch under your lip for up to 60 minutes, you may feel a tingling sensation. Do not chew or swallow the pouch. Swallow saliva as needed.",
    },
    {
      step: "03",
      title: "Repeat dosage",
      body: "Repeat dose with a new pouch when the urge is felt to smoke again. Do not exceed 15 pouches a day.",
    },
  ],
  afterUse: "After use, put the pouch in the waste compartment.",
  ingredients: [
    "Plant-based fibres",
    "Water",
    "Sweetener",
    "Nicotine (4 mg)",
    "Flavouring",
  ],
  dosing: [
    "Month 1: 1 pouch every 1–2 hours (up to 15/day)",
    "Month 2: 1 pouch every 2–4 hours",
    "Month 3: 1 pouch every 4–8 hours",
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
        "Discreet, no smoke, and clear dosing. The online process was faster than booking a clinic.",
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
      q: "What are the potential side effects of using ZONNIC?",
      a: "Common effects can include burning or tingling at the placement site. Stop and seek medical advice for irregular heartbeat, allergic reaction, fainting, severe nausea, chest pain, seizures, or similar serious symptoms. ZONNIC may not suit people with certain heart, thyroid, circulation, stomach, or mouth issues, diabetes, seizures, those on insulin or other prescriptions, or who are pregnant or nursing. NRTs are not for occasional smokers, non-smokers, or non-nicotine users.",
    },
    {
      q: "Are there any precautions before using ZONNIC?",
      a: "Not recommended under 19, if pregnant or breastfeeding, for non-smokers, or with certain medical conditions. Talk to a clinician first if you have heart disease, high blood pressure, digestive issues, or other ongoing conditions.",
    },
    {
      q: "How do ZONNIC pouches compare to gum, lozenges, or sprays?",
      a: "Among NRTs available in Canada, ZONNIC is unique as a pouch format authorized by Health Canada. Like lozenges and gums, it provides nicotine via oral absorption for temporary relief from cravings and withdrawal.",
    },
    {
      q: "Is ZONNIC similar to smokeless tobacco?",
      a: "No. ZONNIC does not contain tobacco. It is authorized as a Nicotine Replacement Therapy to help adults quit smoking.",
    },
    {
      q: "What is the recommended dosing schedule?",
      a: "Month 1: 1 pouch every 1–2 hours (up to 15/day). Month 2: every 2–4 hours. Month 3: every 4–8 hours. Do not exceed 15 pouches in 24 hours.",
    },
    {
      q: "Any extra tips for use?",
      a: "Use one pouch at a time under the upper lip; do not chew or swallow. Avoid acidic drinks while using a pouch. Store in original packaging at room temperature, check expiry, keep away from children and pets, and dispose of used pouches in the lid compartment.",
    },
  ],
} as const;
