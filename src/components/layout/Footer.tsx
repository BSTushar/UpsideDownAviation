import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Heart } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { FooterWatermark } from "@/components/layout/FooterWatermark";

const QUICK_LINKS = NAV_LINKS.filter((l) => l.label !== "Vision");

const colHeading =
  "mb-4 font-inktrap text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8eb4d4]";

const bodyLink =
  "inline-flex items-center gap-2 font-inktrap text-body-sm font-normal text-slate transition-colors duration-standard hover:text-bone-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-void">
      {/* Depth gradient — bottom-left → top-right */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top_right,#050d18_0%,#07111f_38%,#0c1a2e_72%,#0e2038_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(110,163,212,0.07),transparent_55%)]"
        aria-hidden
      />

      <FooterWatermark />

      {/* Wing silhouette — top-right watermark */}
      <svg
        className="pointer-events-none absolute -right-8 top-8 h-48 w-48 text-white/[0.022] sm:h-64 sm:w-64"
        viewBox="0 0 200 120"
        fill="currentColor"
        aria-hidden
      >
        <path d="M10 95 C40 70 70 55 100 50 C130 45 160 52 190 65 L190 75 C155 62 125 58 100 60 C75 62 45 78 20 98 Z" />
        <path d="M100 50 L100 20 L108 48 Z" opacity="0.6" />
      </svg>

      <div className="section-container relative z-10 pt-14 pb-10 sm:pt-16 sm:pb-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex w-fit flex-col gap-3">
              <span className="relative inline-block w-fit">
                <span className="brand-halo" aria-hidden />
                <Image
                  src="/logo-full.png"
                  alt="Upside Down Aviation"
                  width={96}
                  height={96}
                  className="relative h-20 w-20 rounded-[18px] object-contain mix-blend-screen transition-transform duration-standard group-hover:scale-[1.02] sm:h-24 sm:w-24"
                />
              </span>
              <span className="font-inktrap text-subheading font-semibold tracking-tight text-bone-white">
                {SITE.name}
              </span>
            </Link>
            <p className="font-inktrap text-body-sm font-medium text-accent">{SITE.tagline}</p>
            <p className="inline-flex items-start gap-2 font-inktrap text-body-sm font-normal text-slate">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.5] text-[#8eb4d4]" aria-hidden />
              {SITE.location}
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <nav className="flex flex-col" aria-label="Quick links">
            <span className={colHeading}>Explore</span>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={bodyLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Engage */}
          <nav className="flex flex-col" aria-label="Engage">
            <span className={colHeading}>Engage</span>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/enquire" className="gold-ring inline-flex rounded-pill">
                  <span className="relative z-[1] inline-flex min-h-[44px] items-center justify-center rounded-pill bg-void px-6 py-2.5 font-inktrap text-body-sm font-semibold text-bone-white transition-colors hover:bg-surface">
                    Enquire
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portal/login" className={bodyLink}>
                  Student Portal
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4 — Contact & Social */}
          <div className="flex flex-col">
            <span className={colHeading}>Connect</span>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`mailto:${SITE.email}`} className={bodyLink}>
                  <Mail className="h-4 w-4 shrink-0 stroke-[1.5] text-[#8eb4d4]" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="mb-1 block font-inktrap text-body-sm font-medium text-slate">Follow us</span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-inktrap text-body-sm">
                  <a
                    href={SITE.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-bone-white transition-colors hover:text-[#8eb4d4]"
                  >
                    Instagram
                  </a>
                  <span className="text-graphite" aria-hidden>
                    |
                  </span>
                  <a
                    href={SITE.socials.threads}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-bone-white transition-colors hover:text-[#8eb4d4]"
                  >
                    Threads
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Whitespace separator — no hard border */}
        <div className="mt-14 sm:mt-16" aria-hidden />

        {/* Footer strip */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-inktrap text-[12px] font-normal leading-relaxed text-slate/80">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="font-inktrap text-body-sm font-semibold text-bone-white transition-colors hover:text-[#8eb4d4]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-inktrap text-body-sm font-semibold text-bone-white transition-colors hover:text-[#8eb4d4]"
            >
              Terms
            </Link>
          </div>
        </div>

        {/* Made in Bharat */}
        <p className="mt-8 flex flex-wrap items-center justify-center gap-1.5 font-inktrap text-[12px] font-medium text-slate/70 sm:justify-start">
          <span>Made with</span>
          <Heart className="h-3.5 w-3.5 fill-accent text-accent" aria-label="love" />
          <span>in</span>
          <span className="font-semibold text-accent/90" lang="hi">
            भारत
          </span>
          <span className="text-slate/55">(India)</span>
        </p>
      </div>
    </footer>
  );
}
