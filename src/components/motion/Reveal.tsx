"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const shared = {
    className: cn(className),
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport,
    custom: delay,
    variants: fadeUp,
  };

  if (as === "section") return <motion.section {...shared}>{children}</motion.section>;
  if (as === "article") return <motion.article {...shared}>{children}</motion.article>;
  return <motion.div {...shared}>{children}</motion.div>;
}
