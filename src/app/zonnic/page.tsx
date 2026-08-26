import type { Metadata } from "next";
import CarePathPage from "@/components/CarePathPage";

export const metadata: Metadata = {
  title: "Quit Smoking with ZONNIC — medviCare",
  description:
    "Mint-powered nicotine pouches to help you quit smoking — measured NRT, discreet delivery, clinician-guided online care.",
};

export default function ZonnicPage() {
  return <CarePathPage slug="quit-smoking" />;
}
