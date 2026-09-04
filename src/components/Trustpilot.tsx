"use client";

import Reveal from "@/components/Reveal";
import { reviews } from "@/lib/content";

export default function Trustpilot() {
  const featured = reviews[0];
  const rest = reviews.slice(1);

  return (
    <section id="reviews" className="site-section bg-background">
      <div className="site-inner">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal variant="blur-up">
            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ppc-accent">
                Patient voices
              </p>
              <h2 className="font-display text-[32px] font-[400] leading-[1.1] tracking-[-0.02em] text-ppc-primary md:text-[44px]">
                What people say about the process
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100} variant="fade-up">
            <div className="md:justify-self-end md:text-right">
              <p className="text-[16px] font-medium text-ppc-primary">
                {reviews.length} illustrative comments on this site
              </p>
              <p className="mt-1 text-[14px] text-ppc-primary/78">
                Not a third-party star rating or verified review feed.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} variant="rise">
          <blockquote className="mb-8 rounded-2xl bg-ppc-dark p-7 text-white md:mb-10 md:p-12">
            <p className="font-display text-[22px] leading-[1.35] md:text-[32px]">
              “{featured.body}”
            </p>
            <footer className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
              <div>
                <p className="text-[15px] font-medium">{featured.name}</p>
                <p className="text-[13px] text-white/50">{featured.title}</p>
              </div>
              <p className="text-[13px] text-ppc-accent-soft">★★★★★</p>
            </footer>
          </blockquote>
        </Reveal>

        <Reveal variant="fade-up">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((review) => (
              <article
                key={review.title + review.name}
                className="motion-card flex h-full flex-col rounded-xl border border-ppc-border bg-ppc-surface p-5"
              >
                <p className="mb-3 text-[12px] text-ppc-accent">★★★★★</p>
                <h3 className="mb-2 text-[15px] font-semibold text-ppc-primary">
                  {review.title}
                </h3>
                <p className="flex-1 text-[14px] leading-relaxed text-ppc-primary/82">
                  {review.body}
                </p>
                <p className="mt-4 text-[13px] text-ppc-primary/72">{review.name}</p>
              </article>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
