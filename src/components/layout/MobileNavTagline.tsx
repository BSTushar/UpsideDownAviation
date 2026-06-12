"use client";

import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

type Props = {
  variant?: "light" | "dark";
};

/** Compact single-line tagline for mobile nav — no empty vertical gap. */
export function MobileNavTagline({ variant = "light" }: Props) {
  return (
    <p
      className={cn(
        "min-w-0 truncate text-center font-inktrap text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[11px] lg:hidden",
        variant === "dark" ? "text-white/80" : "text-[#07111F]/75"
      )}
      aria-hidden
    >
      {SITE.tagline}
    </p>
  );
}
