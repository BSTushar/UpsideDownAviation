import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "ghost" | "filled" | "accent" | "icon" | "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative z-[1] inline-flex items-center justify-center gap-2 font-inktrap font-medium transition-all duration-standard ease-signature focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  ghost:
    "rounded-pill border border-graphite bg-transparent px-6 py-3 text-body text-bone-white hover:border-accent hover:shadow-accent-glow",
  filled:
    "rounded-pill border border-bone-white bg-void px-[18px] py-2 text-body font-semibold text-bone-white hover:shadow-subtle",
  accent:
    "rounded-pill border border-accent bg-surface px-6 py-3 text-body text-bone-white hover:bg-accent/10 hover:shadow-accent-glow",
  icon:
    "rounded-icon border border-storm-gray bg-transparent p-2 text-bone-white hover:border-iris hover:shadow-iris-glow",
  primary:
    "rounded-pill border-0 bg-accent px-6 py-3 text-body font-semibold text-void hover:bg-[#e8d5b0] hover:shadow-accent-glow",
  secondary:
    "rounded-pill border border-storm-gray bg-transparent px-6 py-3 text-body text-bone-white hover:border-iris hover:shadow-iris-glow",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-body-sm px-4 py-2 min-h-[40px]",
  md: "text-body px-6 py-3 min-h-[48px]",
  lg: "text-subheading px-8 py-4 min-h-[52px]",
};

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
} & ({ href: string } & Partial<ComponentProps<typeof Link>> | ComponentProps<"button">);

function GoldRing({
  children,
  fullWidth,
  className,
}: {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("gold-ring inline-flex rounded-pill", fullWidth && "w-full", className)}>
      {children}
    </span>
  );
}

export function Button({
  variant = "ghost",
  size = "md",
  children,
  className,
  fullWidth,
  ...props
}: Props) {
  const classes = cn(
    base,
    variant !== "icon" && sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className
  );

  const useGoldRing = variant === "primary";

  const inner =
    "href" in props && props.href ? (
      <Link className={classes} {...(props as ComponentProps<typeof Link>)}>
        {children}
      </Link>
    ) : (
      <button className={classes} type="button" {...(props as ComponentProps<"button">)}>
        {children}
      </button>
    );

  if (useGoldRing) {
    return (
      <GoldRing fullWidth={fullWidth} className={className}>
        {inner}
      </GoldRing>
    );
  }

  return inner;
}
