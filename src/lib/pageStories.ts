import { media } from "@/lib/content";

export type PhotoReview = {
  name: string;
  quote: string;
  meta?: string;
  image?: string;
};

function note(
  name: string,
  quote: string,
  meta: string,
  n: number,
): PhotoReview {
  return {
    name,
    quote,
    meta,
    image: `/images/reviews/review-${String(n).padStart(2, "0")}.jpg`,
  };
}

/** Unique full-bleed hero per treatment path — not the shared catalog photo. */
export const treatmentHeroes: Record<string, string> = {
  "weight-loss": "/images/weightLoss.png",
  "hair-loss": media.treatments.hair,
  skin: media.treatments.skin,
  longevity: media.treatments.longevity,
  "sexual-health": media.treatments.sex,
  "mental-health": media.pageHeroes.mental,
  "quit-smoking": media.treatments.smoking,
};

export const productHeroes: Record<string, string> = {
  "weight-loss": "/images/weightLoss.png",
  "hair-loss": "/images/hero-hair-foam.jpg",
  skin: media.treatments.skin,
  longevity: media.treatments.longevity,
  "sexual-health": media.treatments.sex,
  "mental-health": media.pageHeroes.mental,
  "quit-smoking": media.treatments.smoking,
};

/** Unique product-page heroes so hair options do not share the treatment graphic. */
export const productPageHeroes: Record<string, string> = {
  "hair-foam": "/images/hero-hair-foam.jpg",
  "hair-topical": "/images/hero-hair-topical.jpg",
  "hair-tablet": "/images/hero-hair-tablet.jpg",
  "hair-tablet-topical": "/images/hero-hair-combo.jpg",
  "anti-aging-cream": "/images/hero-skin-antiaging.jpg",
  "acne-cream": "/images/hero-skin-acne.jpg",
  "hyperpigmentation-cream": "/images/hero-skin-pigment.jpg",
};

export const treatmentNotes: Record<string, PhotoReview[]> = {
  "weight-loss": [
    note("Lena Ortiz", "The plan felt realistic. Check-ins kept me honest without making it feel like a diet club.", "Weight", 1),
    note("Malik Reeves", "I knew what to expect on side effects before I started. That made it easier to stay with it.", "Weight", 2),
    note("Hannah Cho", "Discreet delivery and a clinician who explained titration in plain language. That’s all I wanted.", "Weight", 3),
  ],
  "hair-loss": [
    note("Marcus Trent", "They set the timeline early — months, not weeks. Sticking with the foam got easier after that.", "Hair", 4),
    note("Dev Rahman", "Shedding slowed in the shower. Packaging stayed private, which mattered more than I expected.", "Hair", 5),
    note("Luca Bianchi", "I compared foam vs tablet on the page, then a clinician confirmed the fit. No pressure.", "Hair", 6),
  ],
  skin: [
    note("Ella Voss", "My routine is three steps now. Texture looks calmer than it has in years.", "Skin", 7),
    note("Nate Okada", "They told me to go slow at night. That advice saved me from overdoing the cream.", "Skin", 8),
    note("Priya Nair", "Marks are fading. I finally have a plan I can follow after work instead of guessing.", "Skin", 9),
  ],
  longevity: [
    note("Ruth Keller", "Labs first, then a written plan. I liked that nothing was sold as a miracle.", "Longevity", 10),
    note("Simon Adeyemi", "The action list was boring in a good way — sleep, bloodwork, then optional add-ons.", "Longevity", 11),
    note("Mei Tan", "Clear about what NAD+ can and cannot do. That honesty made me trust the rest.", "Longevity", 12),
  ],
  "sexual-health": [
    note("Omar Diaz", "Intake was straightforward and private. I didn’t have to explain myself in a waiting room.", "Sexual health", 13),
    note("Cole Bennett", "They asked about other meds first. Felt like a real visit, not a checkout.", "Sexual health", 14),
    note("Yasmin Farouk", "Instructions were plain. I knew when to message vs when to stop and get help.", "Sexual health", 15),
  ],
  "mental-health": [
    note("Avery Kim", "Consultation first — not a prescription dumped in a cart. That order mattered.", "Mental health", 16),
    note("Noel Santos", "Province questions were annoying until I understood why. Then the process made sense.", "Mental health", 17),
    note("Imani Brooks", "Follow-up in the portal felt safer than repeating my story to a new person each time.", "Mental health", 18),
  ],
  "quit-smoking": [
    note("Daniel Cruz", "Pouches plus a schedule beat another round of willpower-only advice.", "Quit smoking", 19),
    note("Chris Walsh", "Flavour options and a step-down plan. I still slipped once; the team didn’t lecture.", "Quit smoking", 20),
    note("Samira Haddad", "Kept it away from my kids and followed the daily cap. Cravings got quieter by month two.", "Quit smoking", 21),
  ],
};

export const productNotes: Record<string, PhotoReview[]> = {
  cialis: [
    note("Hugo Patel", "Timing was explained clearly. I didn’t feel rushed to pick a dose myself.", "Cialis", 22),
    note("Elena Brooks", "Private from form to box. The clinician asked about heart meds before anything else.", "Cialis", 23),
    note("Ravi Nair", "I wanted a plan I could keep. This was calmer than the clinic visit I kept putting off.", "Cialis", 24),
  ],
  viagra: [
    note("Theo Marsh", "They checked other prescriptions first. Felt like a visit, not a vending machine.", "Viagra", 25),
    note("Nina Alvarez", "Straight answers on timing and food. No awkward waiting room.", "Viagra", 26),
    note("Owen Blake", "Portal follow-up made it easy to ask one more question after the box arrived.", "Viagra", 27),
  ],
  chewalis: [
    note("Micah Cole", "Chewable option was the whole point for me. Instructions were short and usable.", "Chewalis", 28),
    note("Sofia Grant", "They confirmed it was even appropriate before talking flavour or format.", "Chewalis", 29),
    note("Jonah Reid", "Discreet packaging, clear max dose. That’s the bar.", "Chewalis", 30),
  ],
  ozempic: [
    note("Clara Nguyen", "Titration was written down. I wasn’t guessing week to week.", "Ozempic", 31),
    note("Andre Holt", "Side-effect talk happened before I started. That changed whether I even wanted it.", "Ozempic", 32),
    note("Pia Rosen", "Check-ins kept the plan honest. If it wasn’t a fit, they said so.", "Ozempic", 33),
  ],
  mounjaro: [
    note("Gavin Shaw", "They compared options instead of pushing one brand. I stayed because of that.", "Mounjaro", 34),
    note("Nia Okonkwo", "Injection timing + nausea tips in one note. Practical.", "Mounjaro", 35),
    note("Felix Ward", "I wanted clinician review, not a checkout. That’s what I got.", "Mounjaro", 36),
  ],
  "anti-aging-cream": [
    note("Ivy Laurent", "Pea-sized, nights only at first. Following that avoided the freeze-peel I feared.", "Anti-aging", 37),
    note("Seth Moreau", "SPF every morning became non-negotiable. Texture improved after I actually listened.", "Anti-aging", 38),
    note("Dana Voss", "Strength was matched after photos. Not a one-jar-fits-all.", "Anti-aging", 39),
  ],
  "acne-cream": [
    note("Maren Pike", "Fewer new breakouts after the slow start. Dryness was flagged up front.", "Acne", 40),
    note("Cody Ellis", "They adjusted frequency when my barrier complained. That save mattered.", "Acne", 41),
    note("Leila Hof", "Routine is boring now. That’s a compliment.", "Acne", 42),
  ],
  "hyperpigmentation-cream": [
    note("Rina Das", "Marks faded slower than ads promise — and they told me that on day one.", "Tone", 43),
    note("Paul Kenney", "Sunscreen lecture was deserved. The cream only works if I don’t undo it.", "Tone", 44),
    note("Amara Singh", "Evenness improved around month two. I kept photos so I wouldn’t quit early.", "Tone", 45),
  ],
  "hair-foam": [
    note("Brett Lang", "Foam fit mornings. Shedding talk was honest, which kept me from panicking week three.", "Hair foam", 46),
    note("Keisha Moore", "I wanted topical only. They didn’t upsell a tablet I didn’t ask for.", "Hair foam", 47),
    note("Omar Stein", "Two-month supply showed up without a logo on the box. Fine by me.", "Hair foam", 48),
  ],
  zonnic: [
    note("Helen Park", "Pouches plus a cap. I treated it like NRT, not a snack.", "ZONNIC", 49),
    note("Marcus Vail", "Mint option and a month-by-month step down. Cravings got shorter.", "ZONNIC", 50),
    note("Tessa Quinn", "They asked if I actually smoke. That filter made it feel legitimate.", "ZONNIC", 51),
  ],
  semaglutide: [
    note("Ibrahim Cole", "Generic path was explained without pretending it’s identical magic.", "Semaglutide", 52),
    note("Molly Grant", "Food noise quieted after titration. Check-ins caught the nausea early.", "Semaglutide", 53),
    note("Drew Phelps", "I needed a clinician yes/no, not a cart. That’s why I stayed.", "Semaglutide", 54),
  ],
  "hair-tablet-topical": [
    note("Nolan Berg", "Combo was the suggestion after the quiz. Clinician still had the last word.", "Hair combo", 55),
    note("Sasha Reid", "Tablet plus solution sounded like a lot. The calendar they sent helped.", "Hair combo", 56),
    note("Vic Raman", "Three-month view beat hopping products every week.", "Hair combo", 57),
  ],
  "hair-topical": [
    note("Eden Choi", "Solution only — that’s what I asked for. No extra pill in the box.", "Hair topical", 58),
    note("Miles Hart", "Scalp instructions were specific. I was doing it wrong before.", "Hair topical", 59),
    note("Anika Bose", "Quiet packaging, clear apply-and-wash timing.", "Hair topical", 60),
  ],
  "hair-tablet": [
    note("Rohan Mehta", "Once-daily tablet was the whole request. They checked family planning questions first.", "Hair tablet", 61),
    note("Claire Dunn", "Side-effect list was short and serious. I appreciated not being sold a miracle.", "Hair tablet", 62),
    note("Benito Cruz", "Refill reminder in the portal. I didn’t have to hunt a pharmacy.", "Hair tablet", 63),
  ],
  "longevity-program": [
    note("Harlow Zeng", "Bloodwork before any add-on. That’s the only reason I signed the intake.", "Longevity", 64),
    note("Otto Klein", "Written plan, not a stack of bottles. I still had homework.", "Longevity", 65),
    note("Nadine Shah", "Biological age talk was cautious. I trusted that more than a sales graph.", "Longevity", 66),
  ],
  "nad-plus": [
    note("Quinn Adler", "Optional add-on after labs — they said skip it if the basics weren’t done.", "NAD+", 67),
    note("Vera Okafor", "Energy talk was modest. No one promised I’d feel 25.", "NAD+", 68),
    note("Seth Lang", "I added it later. Order of operations was the useful part.", "NAD+", 69),
  ],
  "mh-consult": [
    note("Juniper Hale", "Consult-only first. I needed that pause before medication talk.", "MH consult", 70),
    note("Arlo Perez", "Province eligibility was explicit. Better than finding out after payment.", "MH consult", 71),
    note("Willa Chen", "I could say I wasn’t ready for meds. They still completed the visit.", "MH consult", 72),
  ],
  "mh-medication": [
    note("Eden Vargas", "Medication only after the consult notes. That sequence felt safer.", "MH medication", 73),
    note("Pax Drummond", "Side-effect watch list was in the portal. I used it twice.", "MH medication", 74),
    note("Sloane Hart", "They were clear this is not emergency care. I kept 911 in my notes anyway.", "MH medication", 75),
  ],
};

export function notesForTreatment(slug: string): PhotoReview[] {
  return treatmentNotes[slug] ?? [];
}

export function notesForProduct(slug: string): PhotoReview[] {
  return productNotes[slug] ?? [];
}

export function heroForTreatment(slug: string): string {
  return treatmentHeroes[slug] ?? media.pageHeroes.treatments;
}

export function heroForProductCategory(category: string): string {
  return productHeroes[category] ?? media.pageHeroes.medications;
}

export function heroForProduct(slug: string, category: string): string {
  return productPageHeroes[slug] ?? heroForProductCategory(category);
}
