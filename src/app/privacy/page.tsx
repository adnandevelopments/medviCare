import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — medviCare",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 4, 2026"
      blocks={[
        {
          heading: "Who this applies to",
          body: "This policy describes how medviCare Health Inc. handles personal information when you use this website, submit a contact form, join email updates, or start a care request. If we later operate a full clinical portal, that product may have additional notices.",
        },
        {
          heading: "Information we collect",
          body: "We may collect your name, email, phone number, province, message content, quiz answers you choose to send, and cart items you ask us to review. Technical data can include browser type and pages visited. We do not require advertising cookies to use the site.",
        },
        {
          heading: "How we use information",
          body: "We use information to reply to support requests, route care questions to the right team, remember your cart on this device if you allow it, and improve the website. Clinical use (assessing treatment suitability and pharmacy fulfillment) happens only if you proceed with a clinician-reviewed intake.",
        },
        {
          heading: "Legal basis and Canadian privacy",
          body: "We handle personal information in line with applicable Canadian privacy law, including PIPEDA for commercial activities and, where health information is involved, provincial health-privacy rules such as PHIPA in Ontario. We do not sell your clinical details for advertising.",
        },
        {
          heading: "Who can access details",
          body: "Support staff see what they need to answer tickets and ship approved orders. Licensed clinicians and pharmacy partners see clinical details required to review or dispense a plan. Processors (email, hosting) only get what they need to run those services.",
        },
        {
          heading: "Storage, cart, and consent",
          body: "A banner lets you choose essential-only or allowing the cart to save in this browser. Quiz and cart notes used on Contact are stored in session storage on your device until you send the message. You can clear site data in your browser.",
        },
        {
          heading: "Retention and your choices",
          body: "Support emails are kept as long as needed to finish the request and meet legal duties, then deleted or archived. You may request access, correction, or deletion of personal information we hold, or ask privacy questions, by writing to the address on the Contact page.",
        },
        {
          heading: "Children",
          body: "This service is for adults 18 and over. We do not knowingly collect information from children.",
        },
      ]}
    />
  );
}
