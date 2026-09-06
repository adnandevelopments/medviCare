"use client";

import { useEffect, useState } from "react";
import { readAgeGate } from "@/components/AgeDisclaimerGate";

export const CONSENT_KEY = "medvicare-consent";

export function readConsent() {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === "all" || value === "essential") return value;
  } catch {
    /* ignore */
  }
  return null;
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => {
      if (!readAgeGate()) {
        setOpen(false);
        return;
      }
      setOpen(!readConsent());
    };
    show();
    window.addEventListener("medvicare-age-ok", show);
    return () => window.removeEventListener("medvicare-age-ok", show);
  }, []);

  const choose = (value: "all" | "essential") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      window.dispatchEvent(new Event("medvicare-consent"));
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and storage preference"
      className="fixed inset-x-0 bottom-0 z-[12000] border-t border-ppc-border bg-white p-4 md:p-5"
    >
      <div className="site-inner flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-[14px] leading-relaxed text-ppc-primary/85">
          We store your cart on this device if you allow it. We do not use
          advertising cookies. See{" "}
          <a href="/privacy" className="font-medium text-ppc-accent underline">
            Privacy
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="min-h-11 rounded-full border border-ppc-border px-5 py-2.5 text-[14px] font-medium text-ppc-primary hover:border-ppc-accent"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="min-h-11 rounded-full bg-ppc-accent px-5 py-2.5 text-[14px] font-medium text-white hover:bg-ppc-dark"
          >
            Allow cart save
          </button>
        </div>
      </div>
    </div>
  );
}
