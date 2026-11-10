"use client";

import { useEffect, useRef } from "react";

export default function TimelineProgress({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--fill", "100%");
      return;
    }

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh * 0.75 - rect.top) / (rect.height + vh * 0.25);
      const clamped = Math.max(0, Math.min(1, progress));
      el.style.setProperty("--fill", (clamped * 100).toFixed(1) + "%");
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      <span className="timeline-line" aria-hidden="true" />
      <span className="timeline-fill" aria-hidden="true" />
      {children}
    </div>
  );
}
