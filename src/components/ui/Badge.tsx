import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  variant?: "default" | "accent" | "outline" | "coming-soon";
  className?: string;
};

const variants = {
  default: "bg-surface text-accent border border-accent/30",
  accent: "bg-accent/10 text-accent border border-accent/40",
  outline: "bg-transparent text-bone-white border border-graphite",
  "coming-soon": "bg-bone-white/10 text-bone-white border border-bone-white/20",
};

export function Badge({ children, variant = "default", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-badge px-3 py-1 type-caption",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
