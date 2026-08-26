import CarePathQuiz from "@/components/CarePathQuiz";
import PageHero from "@/components/PageHero";
import PhotoReviews from "@/components/PhotoReviews";
import ProductCardGrid from "@/components/ProductCardGrid";
import UsageGuide from "@/components/UsageGuide";
import {
  getProductsByCategories,
  getTreatment,
  media,
} from "@/lib/content";
import { getProductDetail } from "@/lib/productDetails";
import { notFound } from "next/navigation";

const heroBySlug: Record<string, string> = {
  "weight-loss": media.pageHeroes.treatments,
  "hair-loss": media.pageHeroes.treatments,
  skin: media.pageHeroes.skin,
  longevity: media.pageHeroes.longevity,
  "sexual-health": media.pageHeroes.treatments,
  "mental-health": media.pageHeroes.mental,
  "quit-smoking": media.pageHeroes.habit,
};

const reviewPhotos = [
  "/images/team-maya.png",
  "/images/team-chris.png",
  "/images/team-nora.png",
  "/images/patients-care.png",
  "/images/team-elena.png",
];

export default function CarePathPage({ slug }: { slug: string }) {
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const categoryProducts = getProductsByCategories(treatment.productCategories);
  const usageItems = categoryProducts.flatMap((product) => {
    const detail = getProductDetail(product.slug);
    if (!detail) return [];
    return [
      {
        slug: product.slug,
        name: product.name,
        image: product.image,
        formulations: detail.formulations,
        howToUse: detail.howToUse,
        howItWorks: detail.howItWorks,
      },
    ];
  });

  const reviews = categoryProducts
    .flatMap((product) => getProductDetail(product.slug)?.testimonials ?? [])
    .filter(
      (item, i, arr) => arr.findIndex((other) => other.name === item.name) === i,
    )
    .slice(0, 3)
    .map((item, i) => ({
      name: item.name,
      quote: item.quote,
      meta: item.condition,
      image: reviewPhotos[i % reviewPhotos.length],
    }));

  return (
    <>
      <PageHero
        compact
        eyebrow="Care path"
        title={`${treatment.title} ${treatment.accent}`}
        description={treatment.summary}
        image={heroBySlug[slug] ?? media.pageHeroes.treatments}
        cta={{ label: "See options", href: "#options" }}
        extraCta={<CarePathQuiz slug={slug} />}
      />

      <section
        id="options"
        className="site-section-sm scroll-mt-[88px]"
      >
        <div className="site-inner">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-display text-[24px] text-ppc-primary md:text-[30px]">
              Options for this path
            </h2>
            <p className="mt-1 text-[14px] text-ppc-primary/78">
              Price, details, and add to cart — all here. A licensed clinician
              still reviews every plan before it ships.
            </p>
          </div>
          {categoryProducts.length ? (
            <ProductCardGrid products={categoryProducts} columns="dense" />
          ) : (
            <p className="text-[15px] text-ppc-primary/80">
              Options for this path are reviewed during intake.
            </p>
          )}
        </div>
      </section>

      {usageItems.length ? (
        <UsageGuide
          items={usageItems}
          title="How to use, formulation, and why it works"
        />
      ) : null}

      {reviews.length ? <PhotoReviews reviews={reviews} /> : null}
    </>
  );
}
