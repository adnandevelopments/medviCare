import type { Metadata } from "next";
import CarePathPage from "@/components/CarePathPage";

export const metadata: Metadata = {
  title: "Sexual Health — Choose Your Plan — medviCare",
  description:
    "Choose Cialis, Viagra, Dissolvable Cialis, or combo plans with generic/brand options, discreet delivery, and clinician review.",
};

export default function SexualHealthRoute() {
  return <CarePathPage slug="sexual-health" />;
}
