"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MobileNavTicker } from "@/components/layout/MobileNavTicker";
import { cn } from "@/lib/cn";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 36);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-[900ms] ease-signature",
        scrolled || open ? "top-3 px-4" : "top-0 px-0"
      )}
    >
      <motion.nav
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          "mx-auto flex w-full items-center transition-all duration-[900ms] ease-signature lg:justify-between",
          scrolled || open
            ? "max-w-[980px] gap-2 rounded-[22px] border border-white bg-white px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
            : "max-w-none justify-between gap-4 rounded-none border-b border-white/10 bg-surface/96 px-[max(2rem,calc((100vw-1040px)/2))] py-3 shadow-none"
        )}
      >
          <Link
            href="/"
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-[16px] px-2 py-1.5 transition-colors sm:gap-3",
              scrolled || open ? "hover:bg-[#f9f4ea]" : "hover:bg-white/10"
            )}
          >
            <BrandLogo size="sm" priority />
            <span
              className={cn(
                "max-w-[108px] truncate whitespace-nowrap font-inktrap text-body-sm font-semibold tracking-tight transition-colors duration-[900ms] ease-signature sm:max-w-none",
                scrolled || open ? "text-[#07111F] lg:inline" : "hidden text-white sm:inline"
              )}
            >
              {SITE.name}
            </span>
          </Link>

          <MobileNavTicker variant={scrolled || open ? "light" : "dark"} />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setActiveHref(l.href)}
                  className={cn(
                    "whitespace-nowrap rounded-[14px] px-4 py-2 font-inktrap text-body-sm font-semibold transition-all duration-[900ms] ease-signature",
                    scrolled || open
                      ? "text-[#07111F] hover:bg-[#f9f4ea]"
                      : "text-white/90 hover:bg-white/10 hover:text-white",
                    activeHref === l.href && (scrolled || open ? "bg-[#07111F] text-white" : "bg-white text-[#07111F]")
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/portal/login"
              className={cn(
                "hidden whitespace-nowrap rounded-[16px] border px-4 py-2.5 font-inktrap text-body-sm font-semibold transition-all duration-[900ms] ease-signature hover:-translate-y-0.5 md:inline-flex",
                scrolled || open
                  ? "border-[#e8dfd0] text-[#07111F] hover:bg-[#f9f4ea]"
                  : "border-white/25 text-white hover:bg-white/10"
              )}
            >
              Student Portal
            </Link>
            <Link
              href="/enquire"
              className={cn(
                "hidden whitespace-nowrap rounded-[16px] px-5 py-2.5 font-inktrap text-body-sm font-semibold transition-all duration-[900ms] ease-signature hover:-translate-y-0.5 md:inline-flex",
                scrolled || open
                  ? "bg-[#07111F] text-white hover:bg-[#0E1C2F] hover:shadow-[0_10px_28px_rgba(7,17,31,0.25)]"
                  : "bg-accent text-[#07111F] hover:bg-[#e8d5b0]"
              )}
            >
              Speak to an Advisor
            </Link>
            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-[14px] border transition-colors duration-[900ms] ease-signature lg:hidden",
                scrolled || open
                  ? "border-[#e8dfd0] text-[#07111F] hover:bg-[#f9f4ea]"
                  : "border-white/25 text-white hover:bg-white/10"
              )}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-[860px] overflow-hidden rounded-[22px] border border-white bg-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[16px] px-4 py-3 font-inktrap text-subheading text-[#07111F] transition-colors hover:bg-[#f9f4ea]"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="flex flex-col gap-2 pt-6">
                <Link
                  href="/portal/login"
                  onClick={() => setOpen(false)}
                  className="flex w-full justify-center rounded-[16px] border border-[#e8dfd0] px-5 py-3 font-inktrap text-body-sm font-semibold text-[#07111F]"
                >
                  Student Portal
                </Link>
                <Link
                  href="/enquire"
                  onClick={() => setOpen(false)}
                  className="flex w-full justify-center rounded-[16px] bg-[#07111F] px-5 py-3 font-inktrap text-body-sm font-semibold text-white"
                >
                  Speak to an Advisor
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** @deprecated Use Navigation */
export const Navbar = Navigation;
