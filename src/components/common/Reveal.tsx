import { Box, BoxProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface RevealProps extends BoxProps {
  /** Delay in milliseconds before the reveal transition starts. */
  delay?: number;
}

/**
 * Fades and lifts its children into view the first time they enter the
 * viewport. Respects prefers-reduced-motion and degrades gracefully without
 * JavaScript (see the noscript rule in _document).
 */
export const Reveal = ({ children, delay = 0, sx, ...rest }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      className="reveal"
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
