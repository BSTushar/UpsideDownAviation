"use client";

import { Heart } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

const SECTION_COORDS: Record<string, string> = {
  welcome: "28.6139° N, 77.2090° E",
  why: "28.5562° N, 77.1000° E",
  journey: "28.4595° N, 77.0266° E",
  programs: "28.3949° N, 76.9754° E",
  vision: "28.3200° N, 76.8900° E",
  contact: "28.2500° N, 76.8000° E",
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
