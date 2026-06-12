import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TypeText } from "@/components/motion/TypeText";

type Props = {
  eyebrow: string;
  headline: string;
  sub?: string;
  className?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

/** Disciplined section header — sans-serif only, no decorative fonts */
export function SectionHeader({ eyebrow, headline, sub, className, align = "left", children }: Props) {
  const centered = align === "center";
  return (
    <header className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <div className="mb-4 flex items-center gap-4">
        {centered && <span className="h-px flex-1 bg-graphite" aria-hidden />}
        <span className="type-caption text-accent">{eyebrow}</span>
        <span className="h-px flex-1 bg-graphite" aria-hidden />
      </div>
      <TypeText as="h2" text={headline} speed={26} className="type-heading-lg text-bone-white" />
      {sub && <p className={cn("mt-4 type-body text-slate", centered && "mx-auto")}>{sub}</p>}
      {children}
    </header>
  );
}
