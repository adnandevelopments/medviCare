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
  initial = { opacity: 0, x: 0 },
  whileInView = { opacity: 1, x: 0 },
  transition = { duration: 0.5, delay: 0 },
  viewport = { once: true, amount: 0.12 },
  ...rest
}: MotionDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [skipAnim, setSkipAnim] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduce) {
      setSkipAnim(true);
      setVisible(true);
      return;
    }

    setSkipAnim(false);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (viewport.once !== false) observer.unobserve(el);
        } else if (viewport.once === false) {
          setVisible(false);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "120px 0px",
      },
    );

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.95) setVisible(false);

    observer.observe(el);
    return () => observer.disconnect();
  }, [viewport.once]);

  const from = skipAnim || visible ? whileInView : initial;
  const duration = skipAnim ? 0 : (transition.duration ?? 0.5);
  const delay = skipAnim ? 0 : (transition.delay ?? 0);

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
