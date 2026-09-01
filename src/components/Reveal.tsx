"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?:
    | "fade-up"
    | "fade-in"
    | "slide-left"
    | "slide-right"
    | "scale-in"
    | "blur-up"
    | "rise"
    | "image-in";
  /** Delay in ms */
  delay?: number;
  /** Duration in ms */
  duration?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 500,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  /** Visible on first paint so mobile never sits on a blank white block. */
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.05, rootMargin: "120px 0px" },
    );

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.95) setVisible(false);

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
