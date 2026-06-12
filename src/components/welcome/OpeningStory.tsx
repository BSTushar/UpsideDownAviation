"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TypeText } from "@/components/motion/TypeText";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SITE } from "@/lib/constants";

type Props = {
  active: boolean;
  onComplete?: () => void;
};

const MIN_LOAD_MS = 2200;
const MAX_LOAD_MS = 12000;
const EXIT_MS = 700;

function waitForPageReady(): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    };
    const fonts = document.fonts?.ready ?? Promise.resolve();
    if (document.readyState === "complete") {
      fonts.then(finish);
      return;
    }
    window.addEventListener("load", () => fonts.then(finish), { once: true });
  });
}

export function OpeningStory({ active, onComplete }: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("done");
  const completed = useRef(false);
  const runId = useRef(0);

  const finish = () => {
    if (completed.current) return;
    completed.current = true;
    setPhase("done");
    onComplete?.();
  };

  useEffect(() => {
    if (!active) {
      setPhase("done");
      completed.current = false;
      return;
    }

    if (reduced) {
      finish();
      return;
    }

    completed.current = false;
    setPhase("loading");
    runId.current += 1;
    const id = runId.current;
    let cancelled = false;
    const started = Date.now();

    const beginExit = () => {
      if (cancelled || completed.current || id !== runId.current) return;
      setPhase("exit");
      window.setTimeout(finish, EXIT_MS);
    };

    const maxTimer = window.setTimeout(beginExit, MAX_LOAD_MS);

    waitForPageReady().then(() => {
      if (cancelled || id !== runId.current) return;
      const wait = Math.max(0, MIN_LOAD_MS - (Date.now() - started));
      window.setTimeout(beginExit, wait);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
    };
  }, [active, reduced]);

  useEffect(() => {
    if (phase === "loading" || phase === "exit") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [phase]);

  if (!active || phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-void"
        aria-live="polite"
        aria-busy={phase === "loading"}
        aria-label="Loading Upside Down Aviation"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#102b49] via-void to-void"
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-px w-[min(720px,80vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: phase === "loading" ? Infinity : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden
        />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrandLogo size="lg" />
          <span className="type-caption text-accent">{SITE.name}</span>
          <TypeText
            as="p"
            text={SITE.tagline}
            speed={40}
            delay={200}
            immediate
            className="type-heading-lg text-bone-white"
          />
          <p className="type-body-sm text-slate">DGCA ground training · career mentorship</p>

          {phase === "loading" && (
            <motion.div
              className="mt-6 flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1, 0.85] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="absolute left-[12%] top-1/2 h-2 w-2 rounded-full bg-accent shadow-accent-glow"
          animate={{ x: ["-18vw", "88vw"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: phase === "loading" ? Infinity : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden
        />
      </motion.div>
    </AnimatePresence>
  );
}
