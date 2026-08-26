import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FullBleedHero from "@/components/FullBleedHero";
import { media } from "@/lib/content";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  extraCta?: ReactNode;
  /** Full background photo */
  image?: string;
  /** Optional product/treatment cutout on the right */
  sideImage?: string;
  sideImageAlt?: string;
  /** Homepage-style hero under a transparent header */
  underHeader?: boolean;
  /** Short banner — care-path pages */
  compact?: boolean;
  /** No background photo — product image only (medication heroes) */
  plain?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  cta,
  secondaryCta,
  extraCta,
  image = media.heroSide,
  sideImage,
  sideImageAlt = "",
  underHeader = false,
  compact = false,
  plain = false,
}: PageHeroProps) {
  return (
    <FullBleedHero
      image={plain ? undefined : image}
      underHeader={underHeader}
      compact={compact}
    >
      <div
        className={`grid items-center ${
          compact ? "gap-6" : "gap-10"
        } ${sideImage ? (compact ? "lg:grid-cols-[1.25fr_0.75fr]" : "lg:grid-cols-[1.15fr_0.85fr]") : ""}`}
      >
        <div className="max-w-[620px]">
          {eyebrow ? (
            <div className={`flex items-center gap-3 ${compact ? "mb-3" : "mb-5"}`}>
              <span className="h-px w-8 bg-ppc-accent-soft" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
                {eyebrow}
              </p>
            </div>
          ) : null}
          <h1
            className={`font-display font-semibold leading-[1.08] tracking-[-0.02em] text-white ${
              compact
                ? "text-[28px] md:text-[36px]"
                : "text-[36px] md:text-[52px]"
            }`}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={`max-w-[480px] leading-relaxed text-white ${
                compact
                  ? "mt-3 text-[15px] md:text-[16px]"
                  : "mt-5 text-[16px] md:text-[18px]"
              }`}
            >
              {description}
            </p>
          ) : null}
          {cta || secondaryCta || extraCta ? (
            <div className={`flex flex-wrap gap-3 ${compact ? "mt-5" : "mt-8"}`}>
              {cta ? (
                <Link
                  href={cta.href}
                  className="motion-press inline-flex items-center gap-2 rounded-full bg-ppc-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-ppc-dark"
                >
                  {cta.label}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="motion-press inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm hover:bg-white/20"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
              {extraCta}
            </div>
          ) : null}
        </div>

        {sideImage ? (
          <div
            className={`relative mx-auto aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-white/15 ${
              compact
                ? "max-w-[220px] bg-white md:max-w-[280px]"
                : "max-w-[380px] bg-ppc-dark/25 backdrop-blur-[2px]"
            }`}
          >
            <Image
              src={`${sideImage}?v=${media.cutoutVersion}`}
              alt={sideImageAlt || title}
              fill
              className="object-contain object-center p-8"
              sizes="380px"
              unoptimized
            />
          </div>
        ) : null}
      </div>
    </FullBleedHero>
  );
}
