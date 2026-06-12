"use client";

import Link, { type LinkProps } from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import { useLoading } from "@/components/motion/LoadingProvider";

type Props = LinkProps & ComponentPropsWithoutRef<"a">;

/** Triggers the opening loader animation before client navigation. */
export function LoadingLink({ href, onClick, ...rest }: Props) {
  const { startLoading } = useLoading();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) startLoading();
      }}
      {...rest}
    />
  );
}
