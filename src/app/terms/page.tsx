import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — medviCare",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="September 4, 2026"
      blocks={[
        {
          heading: "Using medviCare",
          body: "By using this website you agree to these terms. Provide accurate information if you request care. This site is published in English. Availability of specific paths depends on province, clinician judgment, and pharmacy supply.",
        },
        {
          heading: "Not emergency care",
          body: "medviCare does not replace emergency services. If you are in danger, having chest pain, severe allergic reaction, or thoughts of self-harm, call 911 or your local emergency number immediately.",
        },
        {
          heading: "Clinical services",
          body: "The website helps you learn about options and contact the team. Treatment decisions are made by licensed clinicians. Medication is dispensed only if approved and filled through licensed pharmacy partners. Product pages describe possible pathways — they are not a prescription.",
        },
        {
          heading: "Trademarks",
          body: "Cialis®, Viagra®, Ozempic®, Mounjaro®, ZONNIC, and other brand names belong to their owners. medviCare is not affiliated with or endorsed by those owners unless a partnership is stated in writing.",
        },
        {
          heading: "Accounts, cart, and messages",
          body: "You are responsible for the accuracy of emails you send through your mail app. The on-site cart is a request list, not a paid order. Checkout is a clinician-review request via Contact until a full checkout is launched.",
        },
        {
          heading: "Limitation of liability",
          body: "Information on this website is general and may change. We are not liable for decisions you make solely from marketing copy. Follow your clinician and pharmacy label if you receive an approved plan.",
        },
        {
          heading: "Changes",
          body: "We may update these terms. The date at the top of this page is the latest version. Continued use after an update means you accept the revised terms.",
        },
      ]}
    />
  );
}
