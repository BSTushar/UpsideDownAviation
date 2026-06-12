"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
};

export function Stagger({ children, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag className={cn(className)} variants={staggerItem}>
      {children}
    </Tag>
  );
}
