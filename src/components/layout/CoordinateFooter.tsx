"use client";

import { Heart } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

const SECTION_COORDS: Record<string, string> = {
  welcome: "12.9716° N, 77.5946° E",
  why: "12.9500° N, 77.5800° E",
  journey: "12.9300° N, 77.5600° E",
  programs: "12.9100° N, 77.5400° E",
  vision: "12.8900° N, 77.5200° E",
  contact: "12.8700° N, 77.5000° E",
};

type Props = {
  section?: keyof typeof SECTION_COORDS;
  className?: string;
};

/** Persistent coordinate footer — aviation metaphor per design.pdf */
export function CoordinateFooter({ section = "welcome", className }: Props) {
  const coords = SECTION_COORDS[section] ?? SECTION_COORDS.welcome;

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 border-t border-iron bg-void/80 backdrop-blur-sm",
        className
      )}
      aria-label="Flight coordinates"
    >
      <div className="section-container flex items-center justify-between py-2">
        <span className="type-caption text-slate normal-case tracking-normal">
          + Fly Direct {SITE.tagline}
        </span>
        <span className="flex items-center gap-2 type-caption text-slate normal-case tracking-normal">
          {coords}
          <Heart className="h-3 w-3 text-plum" strokeWidth={1.5} aria-hidden />
        </span>
      </div>
    </footer>
  );
}
