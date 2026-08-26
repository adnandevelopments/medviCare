import type { Metadata } from "next";
import CarePathPage from "@/components/CarePathPage";

export const metadata: Metadata = {
  title: "Longevity Program — Live Longer — medviCare",
  description:
    "Test 38+ biomarkers, reveal your biological age, and get a personalized longevity action plan with clinician support.",
};

export default function LongevityRoute() {
  return <CarePathPage slug="longevity" />;
}
