import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "gradient" | "feature" | "outlined";

const variants: Record<CardVariant, string> = {
  default: "bg-surface border border-graphite rounded-card p-card transition-all duration-standard",
  gradient: "rounded-card border border-accent/20 p-card text-bone-white transition-all duration-standard",
  feature: "bg-surface border border-graphite rounded-card px-6 py-6 md:py-8 transition-all duration-standard",
  outlined: "bg-surface border border-graphite rounded-card p-card transition-all duration-standard",
};

const gradientClasses: Record<string, string> = {
  "dawn-violet": "bg-dawn-violet",
  "violet-magenta": "bg-violet-magenta",
  "teal-violet": "bg-teal-violet",
  "pink-purple": "bg-pink-purple",
  "amethyst-band": "bg-amethyst-band",
};

type Props = {
  variant?: CardVariant;
  gradient?: keyof typeof gradientClasses;
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function Card({ variant = "default", gradient, children, className, as: Tag = "div" }: Props) {
  const gradientClass =
    variant === "gradient" && gradient ? gradientClasses[gradient] : "";

  return (
    <Tag className={cn(variants[variant], gradientClass, className)}>
      {children}
    </Tag>
  );
}

export function CardNumber({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("type-number-outline block", className)}>{children}</span>;
}

export function CardLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("type-caption text-bone-white", className)}>
      {children}
    </span>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("type-subheading text-bone-white", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("type-body text-slate", className)}>
      {children}
    </p>
  );
}
