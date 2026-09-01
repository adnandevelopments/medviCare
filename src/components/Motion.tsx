"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  initial?: { opacity?: number; x?: number; y?: number; scale?: number };
  whileInView?: { opacity?: number; x?: number; y?: number; scale?: number };
  transition?: { duration?: number; delay?: number; ease?: number[] | string };
  viewport?: { once?: boolean; amount?: number };
};

function MotionDiv({
  children,
  className = "",
  style,
  initial = { opacity: 0, y: 16 },
  whileInView = { opacity: 1, x: 0, y: 0, scale: 1 },
  transition = { duration: 0.45, delay: 0 },
  viewport = { once: true, amount: 0.12 },
  ...rest
}: MotionDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setSkip(true);
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const inView = el.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (inView) {
      setVisible(true);
      return;
    }

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (viewport.once !== false) observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [viewport.once]);

  const shown = skip || visible;
  const from = shown ? whileInView : {
    opacity: initial.opacity ?? 0,
    x: 0,
    y: Math.min(Math.abs(initial.y ?? 16), 20),
    scale: 1,
  };
  const duration = skip ? 0 : Math.min(transition.duration ?? 0.45, 0.55);
  const delay = skip ? 0 : Math.min(transition.delay ?? 0, 0.16);

  const motionStyle: CSSProperties = {
    ...style,
    opacity: from.opacity ?? 1,
    transform: `translate3d(${from.x ?? 0}px, ${from.y ?? 0}px, 0) scale(${from.scale ?? 1})`,
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}s`,
    transitionDelay: `${delay}s`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div ref={ref} className={className} style={motionStyle} {...rest}>
      {children}
    </div>
  );
}

export const motion = {
  div: MotionDiv,
};
