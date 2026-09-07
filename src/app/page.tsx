import HeroTreatments from "@/components/HeroTreatments";
import PartnerBanner from "@/components/PartnerBanner";
import BetterCare from "@/components/BetterCare";
import PatientsCTA from "@/components/PatientsCTA";
import TrustMarquee from "@/components/TrustMarquee";
import HowItWorks from "@/components/HowItWorks";
import DoctorTrusted from "@/components/DoctorTrusted";
import Team from "@/components/Team";
import Trustpilot from "@/components/Trustpilot";
import BlogCTA from "@/components/BlogCTA";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <HeroTreatments />
      <PartnerBanner />
      <BetterCare />
      <PatientsCTA />
      <TrustMarquee />
      <HowItWorks />
      <DoctorTrusted />
      <Team />
      <Trustpilot />
      <BlogCTA />
      <FAQ />
    </>
  );
}
