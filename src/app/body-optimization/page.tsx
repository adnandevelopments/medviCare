import type { Metadata } from "next";
import CarePathPage from "@/components/CarePathPage";

export const metadata: Metadata = {
  title: "Body Optimization & GLP-1 Weight Loss — medviCare",
  description:
    "Doctor-led GLP-1 weight loss programs with clinician review, discreet delivery, and ongoing support.",
};

export default function BodyOptimizationRoute() {
  return <CarePathPage slug="weight-loss" />;
}
