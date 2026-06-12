"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

type TypeTextProps = {
  /** Text to type. Use "\n" for line breaks. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Milliseconds per character */
  speed?: number;
  /** Delay before typing starts (ms) */
  delay?: number;
  /** Show a blinking caret while typing */
  caret?: boolean;
  /** Start immediately — for loaders/overlays instead of scroll reveal */
  immediate?: boolean;
};

/**
 * Typewriter headline — types character by character once scrolled into view.
 * Reserves the full text's space up front so the layout never shifts, and
 * renders instantly for users who prefer reduced motion.
 */
export function TypeText({
  text,
  as: Tag = "span",
  className,
  speed = 42,
  delay = 150,
  caret = true,
  immediate = false,
}: TypeTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const active = immediate || inView;
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!active || reduced) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [active, reduced, text.length, speed, delay]);

  const visibleCount = reduced ? text.length : count;
  const done = visibleCount >= text.length;
  const lines = text.split("\n");
  const typed = text.slice(0, visibleCount).split("\n");

  return (
    <Tag className={cn("relative inline-block", className)} aria-label={text.replace(/\n/g, " ")}>
      {/* Invisible full text reserves the final size — no layout shift while typing */}
      <span ref={ref} aria-hidden className="invisible">
        {lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </span>
      <span aria-hidden className="absolute inset-0">
        {typed.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
            {caret && !done && i === typed.length - 1 && <span className="type-caret" />}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
