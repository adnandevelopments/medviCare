import type { Metadata } from "next";
import CarePathPage from "@/components/CarePathPage";

export const metadata: Metadata = {
  title: "Stop Hair Loss — Online Care — medviCare",
  description:
    "Clinician-reviewed hair loss treatments online: foam, oral, and topical pathways with discreet delivery and ongoing support.",
};

export default function HairLossRoute() {
  return <CarePathPage slug="hair-loss" />;
}
