"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const AGE_GATE_KEY = "medvicare-age-ok";

export function readAgeGate() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(AGE_GATE_KEY) === "yes";
  } catch {
    return false;
  }
}

export default function AgeDisclaimerGate() {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [ageOk, setAgeOk] = useState(false);
  const [legalOk, setLegalOk] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    setOpen(!readAgeGate());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const enterSite = () => {
    if (!ageOk || !legalOk) return;
    try {
      localStorage.setItem(AGE_GATE_KEY, "yes");
      window.dispatchEvent(new Event("medvicare-age-ok"));
    } catch {
      /* ignore */
    }
    setOpen(false);
    router.push("/");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[14000] flex items-center justify-center bg-[#0c1430]/80 p-4 backdrop-blur-md">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className="relative w-full max-w-[440px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-28px_rgba(8,14,40,0.55)]"
      >
        <div className="relative overflow-hidden bg-ppc-dark px-7 pb-8 pt-8 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-ppc-accent/40" />
          <div className="pointer-events-none absolute -bottom-12 left-10 h-24 w-24 rounded-full bg-ppc-accent-soft/30" />
          <p className="relative font-display text-[20px] font-semibold tracking-tight">
            medvi<span className="text-ppc-accent-soft">Care</span>
          </p>
          <div className="relative mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Welcome
            </p>
            <h2
              id="age-gate-title"
              className="mt-1 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[32px]"
            >
              {blocked ? "Adults only" : "Before you continue"}
            </h2>
          </div>
        </div>

        <div className="px-6 py-6 md:px-7 md:py-7">
          {blocked ? (
            <div>
              <p className="text-[15px] leading-relaxed text-ppc-primary/80">
                You must be 18 years old or older to use medviCare. Please leave
                this website if you are under 18.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[15px] leading-relaxed text-ppc-primary/82">
                You must be <span className="font-semibold text-ppc-primary">18 years old</span>{" "}
                to enter. This site is for eligible adults requesting clinician
                review — not a prescription and not a completed purchase until a
                licensed clinician approves a plan.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-ppc-primary/65">
                Continuing means you agree to our Terms and Privacy Policy.
                Some products may have a higher age limit.
              </p>

              <div className="mt-6 space-y-2.5">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition ${
                    ageOk
                      ? "border-ppc-accent bg-ppc-mint"
                      : "border-ppc-border/70 bg-ppc-mint/40 hover:border-ppc-accent/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={ageOk}
                    onChange={(e) => setAgeOk(e.target.checked)}
                    className="h-5 w-5 shrink-0 accent-[#3d52a0]"
                  />
                  <span className="text-[14px] font-medium leading-snug text-ppc-primary">
                    I am 18 years of age or older
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition ${
                    legalOk
                      ? "border-ppc-accent bg-ppc-mint"
                      : "border-ppc-border/70 bg-ppc-mint/40 hover:border-ppc-accent/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={legalOk}
                    onChange={(e) => setLegalOk(e.target.checked)}
                    className="h-5 w-5 shrink-0 accent-[#3d52a0]"
                  />
                  <span className="text-[14px] font-medium leading-snug text-ppc-primary">
                    I agree to the legal disclaimer
                  </span>
                </label>
              </div>

              <button
                type="button"
                disabled={!ageOk || !legalOk}
                onClick={enterSite}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ppc-accent text-[15px] font-semibold text-white transition hover:bg-ppc-dark disabled:cursor-not-allowed disabled:bg-ppc-mint disabled:text-ppc-primary/35"
              >
                Enter homepage
              </button>
              <button
                type="button"
                onClick={() => setBlocked(true)}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-[13px] font-medium text-ppc-primary/55 hover:text-ppc-primary"
              >
                I am under 18
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
