import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view and returns its id.
 * Pass a stable array of element ids (define it at module scope).
 */
export const useActiveSection = (ids: string[]): string | null => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const ratios = new Map<string, number>();
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let best: string | null = null;
        let max = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > max) {
            max = ratio;
            best = id;
          }
        });

        if (best) setActive(best);
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: "-20% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
