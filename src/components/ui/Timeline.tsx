"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import { EASE, DURATION } from "@/lib/motion";

export type TimelineItem = {
  id: string;
  code: string;
  title: string;
  description?: string;
  status?: "complete" | "active" | "upcoming";
};

type Props = {
  items: TimelineItem[];
  variant?: "vertical" | "horizontal" | "flight-path";
  className?: string;
  /** Hide progress badges on the public marketing site */
  showStatus?: boolean;
};

export function Timeline({ items, variant = "vertical", className, showStatus = false }: Props) {
  if (variant === "flight-path") {
    return <FlightPathTimeline items={items} className={className} />;
  }

  if (variant === "horizontal") {
    return (
      <ol className={cn("flex flex-col gap-0 md:flex-row md:gap-8", className)}>
        {items.map((item, i) => (
          <TimelineNode key={item.id} item={item} index={i} isLast={i === items.length - 1} horizontal />
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("relative flex flex-col", className)}>
        {items.map((item, i) => (
          <TimelineNode key={item.id} item={item} index={i} isLast={i === items.length - 1} showStatus={showStatus} />
        ))}
    </ol>
  );
}

function TimelineNode({
  item,
  index,
  isLast,
  horizontal,
  showStatus,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
  horizontal?: boolean;
  showStatus?: boolean;
}) {
  const status = item.status ?? (showStatus && index === 0 ? "active" : "upcoming");

  return (
    <motion.li
      className={cn(
        "relative",
        horizontal ? "flex-1" : "pb-12 pl-8",
        !horizontal && !isLast && "border-l border-graphite"
      )}
      initial={{ opacity: 0, x: horizontal ? 0 : -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DURATION.slow, delay: index * 0.06, ease: EASE }}
    >
      {!horizontal && (
        <motion.span
          className={cn(
            "absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full border-2 transition-colors duration-standard",
            status === "complete" && "border-accent bg-accent",
            status === "active" && "border-accent bg-void shadow-accent-glow",
            status === "upcoming" && "border-graphite bg-void"
          )}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.base, delay: index * 0.06 + 0.1, ease: EASE }}
        />
      )}

      <div className={cn("flex flex-col gap-2", horizontal && "items-start")}>
        <span className="type-mono-label text-accent">{item.code}</span>
        <h4 className="type-subheading text-bone-white">{item.title}</h4>
        {item.description && (
          <p className="type-body-sm max-w-sm text-slate">{item.description}</p>
        )}
        {showStatus && status === "active" && (
          <Badge variant="accent">Current stage</Badge>
        )}
      </div>
    </motion.li>
  );
}

function FlightPathTimeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <path
          d="M 0 80 Q 25 60, 50 50 T 100 20"
          fill="none"
          stroke="var(--color-graphite)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 80 Q 25 60, 50 50 T 100 20"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
          className="opacity-60"
        />
      </svg>
      <ol className="relative grid gap-8 md:grid-cols-4 md:gap-4">
        {items.map((item, i) => (
          <li key={item.id} className="flex flex-col gap-2 pt-4">
            <span className="type-number-outline text-[3rem]">{item.code}</span>
            <span className="type-mono-label text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="type-heading-sm text-bone-white">{item.title}</h4>
            {item.description && (
              <p className="type-body-sm text-slate">{item.description}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FeatureRow({
  label,
  href,
  className,
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        "interactive-surface group flex items-center justify-between rounded-card border border-graphite bg-surface px-6 py-6 md:py-8",
        className
      )}
    >
      <span className="type-board-outlined text-[clamp(1.5rem,6vw,4.5rem)] tracking-[0.15em]">
        {label}
      </span>
      <span className="type-subheading text-slate transition-all duration-standard group-hover:translate-x-1 group-hover:text-accent">
        →
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }
  return content;
}
