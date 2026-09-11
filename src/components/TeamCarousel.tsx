"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ClinicianModal from "@/components/ClinicianModal";
import type { Clinician } from "@/lib/content";

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "prev" ? "M15 5L8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TeamCarousel({
  people,
  showBio = false,
}: {
  people: Clinician[];
  showBio?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Clinician | null>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-clinician-card]");
    const amount = (card?.offsetWidth ?? 280) + 20;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const arrowClass =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ppc-border bg-white text-ppc-accent hover:bg-ppc-accent hover:text-white";

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous clinicians"
        onClick={() => scrollBy(-1)}
        className={`${arrowClass} left-2`}
      >
        <Chevron dir="prev" />
      </button>
      <button
        type="button"
        aria-label="Next clinicians"
        onClick={() => scrollBy(1)}
        className={`${arrowClass} right-2`}
      >
        <Chevron dir="next" />
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1"
      >
        {people.map((person) => (
          <button
            key={`${person.name}-${person.role}`}
            type="button"
            data-clinician-card
            onClick={() => setSelected(person)}
            className="group flex w-[min(78vw,280px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ppc-border bg-white p-0 text-left leading-none appearance-none transition-colors duration-300 hover:border-ppc-accent"
          >
            <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-ppc-mint">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover object-top"
                sizes="280px"
              />
            </div>
            <div className="w-full p-4 leading-normal">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ppc-accent">
                {person.role}
              </p>
              <h3 className="mt-1 font-display text-[18px] font-semibold leading-tight text-ppc-primary md:text-[20px]">
                {person.name}
              </h3>
              <p className="mt-1 text-[13px] font-medium text-ppc-primary/80">
                {person.credentials}
              </p>
              {person.badges?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {person.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-ppc-mint px-2.5 py-1 text-[11px] font-semibold text-ppc-primary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
              {showBio && person.bio ? (
                <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-ppc-primary/78">
                  {person.bio}
                </p>
              ) : null}
              <p className="mt-3 text-[12px] font-semibold text-ppc-accent">
                View profile →
              </p>
            </div>
          </button>
        ))}
      </div>

      <ClinicianModal person={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
