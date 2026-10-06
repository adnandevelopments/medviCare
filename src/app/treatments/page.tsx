import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { media, treatments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Treatments — medviCare",
  description: "Explore clinician-guided care paths for weight, hair, skin, and more.",
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Care paths"
        title="Treatments built around your goals"
        description="Browse clinician-guided paths for weight, hair, skin, sexual health, mental health, longevity, and habit support."
        image={media.pageHeroes.treatments}
        cta={{ label: "See medications", href: "/medications" }}
      />
      <section className="site-section">
        <div className="site-inner grid gap-5 md:grid-cols-2 md:gap-6">
          {treatments.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="motion-card group grid grid-cols-[140px_1fr] overflow-hidden rounded-2xl border-2 border-ppc-accent/35 bg-ppc-surface transition-all hover:border-ppc-accent md:grid-cols-[180px_1fr]"
            >
              <div className="relative h-full min-h-[160px] self-stretch overflow-hidden bg-ppc-mint md:min-h-[180px]">
                <Image
                  src={item.image}
                  alt={`${item.title} ${item.accent}`}
                  fill
                  className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 140px, 180px"
                />
              </div>
              <div className="flex flex-col justify-center p-5 md:p-7">
                <h2 className="font-display text-[22px] text-ppc-primary md:text-[26px]">
                  {item.title}{" "}
                  <span className="text-ppc-accent">{item.accent}</span>
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-ppc-primary/82">
                  {item.summary}
                </p>
                <span className="mt-3 inline-flex text-[13px] font-medium text-ppc-accent opacity-80 group-hover:opacity-100">
                  View path →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
