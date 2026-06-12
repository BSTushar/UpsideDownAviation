import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "boarding-pass" | "liquid";
  /** Boarding pass header label */
  label?: string;
  origin?: string;
  destination?: string;
};

export function GlassPanel({
  children,
  className,
  variant = "boarding-pass",
  label = "Boarding Pass",
  origin,
  destination,
}: Props) {
  const panelClass = variant === "liquid" ? "liquid-glass" : "glass-panel";

  return (
    <div className={cn(panelClass, "transition-all duration-standard", className)}>
      {(origin || destination) && (
        <header className="mb-6 flex items-start justify-between border-b border-white/10 pb-4">
          <span className="type-caption text-bone-white">{label}</span>
          <div className="flex gap-8 type-mono-label text-bone-white">
            {origin && <span>{origin}</span>}
            {origin && destination && <span className="text-slate">→</span>}
            {destination && <span>{destination}</span>}
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
