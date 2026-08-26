import type { Metadata } from "next";
import CarePathPage from "@/components/CarePathPage";

export const metadata: Metadata = {
  title: "Prescription Skincare Online — medviCare",
  description:
    "Personalized skincare for acne, anti-aging, and hyperpigmentation with clinician review and discreet delivery.",
};

export default function SkincareRoute() {
  return <CarePathPage slug="skin" />;
}
