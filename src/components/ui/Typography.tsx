import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "display" | "display-light" | "heading" | "heading-lg" | "subheading" | "body" | "body-sm" | "caption" | "board" | "mono-label";

const variantClass: Record<Variant, string> = {
  display: "type-display",
  "display-light": "type-display-light",
  heading: "type-heading",
  "heading-lg": "type-heading-lg",
  subheading: "type-subheading",
  body: "type-body",
  "body-sm": "type-body-sm",
  caption: "type-caption",
  board: "type-board-outlined",
  "mono-label": "type-mono-label",
};

type Props = {
  variant?: Variant;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export function Typography({ variant = "body", as: Tag = "p", children, className, muted }: Props) {
  return (
    <Tag
      className={cn(
        variantClass[variant],
        muted && "text-slate",
        !muted && "text-bone-white",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Hero headline — single accessible h1, sans-serif discipline */
export function HeroHeadline({
  accent,
  headline,
  className,
}: {
  accent: string;
  headline: string;
  className?: string;
}) {
  return (
    <h1 className={cn("mt-4", className)}>
      <span className="type-heading block text-bone-white">{accent}</span>
      <span className="type-display block text-bone-white">{headline}</span>
    </h1>
  );
}
