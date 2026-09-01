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
  duration = 480,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      setReady(true);
      return;
    }

    const inView = el.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (inView) {
      setVisible(true);
      setReady(true);
      return;
    }

    setVisible(false);
    setReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const play = variant === "blur-up" || variant === "image-in" ? "fade-up" : variant;

  return (
    <div
      ref={ref}
      className={`reveal reveal-${play} ${ready ? "is-ready" : ""} ${visible ? "is-visible" : ""} ${className}`}
      style={{
        transitionDelay: `${Math.min(delay, 140)}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
