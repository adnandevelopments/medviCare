import CarePathExtras from "@/components/CarePathExtras";
import CarePathQuiz from "@/components/CarePathQuiz";
import PageHero from "@/components/PageHero";
import PhotoReviews from "@/components/PhotoReviews";
import ProductCardGrid from "@/components/ProductCardGrid";
import UsageGuide from "@/components/UsageGuide";
import {
  getProductsByCategories,
  getTreatment,
} from "@/lib/content";
import { getProductDetail } from "@/lib/productDetails";
import { heroForTreatment, notesForTreatment } from "@/lib/pageStories";
import { notFound } from "next/navigation";

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

  const reviews = notesForTreatment(slug);

  return (
    <>
      <PageHero
        compact
        eyebrow="Care path"
        title={`${treatment.title} ${treatment.accent}`}
        description={treatment.summary}
        image={heroForTreatment(slug)}
        cta={{ label: "See options", href: "#options" }}
        extraCta={<CarePathQuiz slug={slug} />}
      />

      <CarePathExtras slug={slug} part="intro" />

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

      <CarePathExtras slug={slug} part="more" />
    </>
  );
}
