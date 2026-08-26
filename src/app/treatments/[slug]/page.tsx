import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CarePathPage from "@/components/CarePathPage";
import { getTreatment, treatments } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return { title: "Treatment — medviCare" };
  return {
    title: `${treatment.title} ${treatment.accent} — medviCare`,
    description: treatment.summary,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!getTreatment(slug)) notFound();
  return <CarePathPage slug={slug} />;
}
