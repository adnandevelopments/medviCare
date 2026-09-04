/** Mental health landing + quiz. */

export const MH_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "Ontario",
  "Quebec",
  "Saskatchewan",
] as const;

export const mentalHealth = {
  hero: {
    eyebrow: "100% private, online & discreet",
    title: "Mental health support",
    description:
      "Skip long wait times and get 1:1 support from a licensed healthcare practitioner — online.",
  },
  trust: [
    "CA-certified pharmacy pathways",
    "Licensed medical providers",
    "Health Canada–authorized options",
    "Discreet portal support",
  ],
  steps: [
    {
      step: "01",
      title: "Take the quiz",
      body: "Answer a short eligibility and goals questionnaire about anxiety or depression support.",
    },
    {
      step: "02",
      title: "Clinician review",
      body: "A licensed clinician reviews your answers and recommends a personalized plan when appropriate.",
    },
    {
      step: "03",
      title: "Ongoing support",
      body: "Stay connected through the portal for follow-ups, questions, and prescription updates.",
    },
  ],
  pillars: [
    {
      title: "Your mental health matters",
      body: "Access tools and clinician support when you need them — without stigma or clinic wait rooms.",
    },
    {
      title: "Anxiety & depression pathways",
      body: "Manage anxiety or depression with dedicated support from licensed healthcare practitioners.",
    },
  ],
  pricing: [
    {
      title: "Initial consultation",
      value: "$60",
      detail: "Virtual review to determine whether a treatment plan is appropriate.",
    },
    {
      title: "Medication",
      value: "$15–$40/mo",
      detail: "Typical monthly ranges when a clinician approves a prescription pathway.",
    },
    {
      title: "Follow-up",
      value: "$40",
      detail: "Most patients need 1–2 follow-ups per year, based on clinical need.",
    },
  ],
  results: [
    {
      title: "Clearer next steps",
      body: "The quiz made it easy to share what I was dealing with — and I knew what to expect before talking to a clinician.",
      name: "Alex M.",
    },
    {
      title: "Private and calm",
      body: "No waiting room. Messaging stayed in the portal and the process felt respectful.",
      name: "Sam K.",
    },
    {
      title: "Support that stuck",
      body: "Having a plan and follow-up options made day-to-day anxiety feel more manageable.",
      name: "Jordan L.",
    },
  ],
  faqs: [
    {
      q: "What is anxiety?",
      a: "Anxiety is your body’s response to stress. If persistent worry or fear disrupts daily life, you may be dealing with an anxiety disorder — a clinician can help assess options.",
    },
    {
      q: "Do I need anxiety treatment?",
      a: "If anxiety feels uncontrollable, persistent, or gets in the way of functioning — or you have frequent panic attacks — speaking with a healthcare provider can help.",
    },
    {
      q: "What anxiety treatments are available?",
      a: "Depending on eligibility, clinicians may consider Health Canada–authorized medications for longer-term management, plus guidance on self-help resources.",
    },
    {
      q: "What is depression?",
      a: "Depression can include prolonged sadness, loss of interest, sleep changes, guilt, or feeling purposeless. A clinician reviews symptoms in context before recommending care.",
    },
    {
      q: "How can depression be addressed?",
      a: "Approaches can include medication, therapy, or specialist guidance. Your clinician helps match a path to your needs after assessment.",
    },
    {
      q: "Does health insurance cover my treatment?",
      a: "Coverage varies by plan and province. We can share an invoice after purchase so you can submit for reimbursement if your plan allows it.",
    },
  ],
};
