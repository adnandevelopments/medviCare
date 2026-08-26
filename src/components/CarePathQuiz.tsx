"use client";

import { useState } from "react";
import HairLossQuiz from "@/components/HairLossQuiz";
import MentalHealthQuiz from "@/components/MentalHealthQuiz";

export default function CarePathQuiz({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const isHair = slug === "hair-loss";
  const isMental = slug === "mental-health";

  if (!isHair && !isMental) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="motion-press inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm hover:bg-white/20"
      >
        Take quiz
      </button>
      {isHair ? (
        <HairLossQuiz open={open} onClose={() => setOpen(false)} />
      ) : (
        <MentalHealthQuiz open={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
