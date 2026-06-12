"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

type Props = {
  /** Floating white nav (scrolled) vs hero overlay (dark). */
  variant?: "light" | "dark";
};

/** Fills the mobile nav gap — tagline + sliding accent line. */
export function MobileNavTicker({ variant = "light" }: Props) {
  const isDark = variant === "dark";

  return (
    <div
      className="relative flex min-w-0 flex-1 flex-col items-center justify-center overflow-hidden px-2 lg:hidden"
      aria-hidden
    >
      <motion.p
        className={cn(
          "truncate font-inktrap text-[11px] font-semibold uppercase tracking-[0.14em]",
          isDark ? "text-white/90" : "text-[#07111F]/85"
        )}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {SITE.tagline}
      </motion.p>

      <div
        className={cn(
          "relative mt-1.5 h-px w-full max-w-[140px] overflow-hidden rounded-full",
          isDark ? "bg-white/15" : "bg-[#e8dfd0]"
        )}
      >
        <motion.span
          className="absolute inset-y-0 w-8 rounded-full bg-accent shadow-accent-glow"
          animate={{ x: ["-32px", "140px"] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
            repeatDelay: 0.35,
          }}
        />
      </div>

      <motion.span
        className={cn("mt-1 type-caption", isDark ? "text-white/45" : "text-[#07111F]/45")}
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        Aviation careers
      </motion.span>
    </div>
  );
}
