import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { FooterHud } from "@/components/layout/FooterHud";
import { FooterRadar } from "@/components/layout/FooterRadar";
import { LoadingLink } from "@/components/motion/LoadingLink";

const QUICK_LINKS = NAV_LINKS.filter((l) => l.label !== "Vision");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <FooterRadar />
      <FooterHud />

      <div className="site-footer__main">
        <div className="site-footer__brand">
          <div className="site-footer__brandtop">
            <Image
              src="/logo-full.png"
              alt={SITE.name}
              width={52}
              height={52}
              className="site-footer__logo mix-blend-screen"
            />
            <div className="site-footer__name">
              Upside Down
              <br />
              Aviation
            </div>
          </div>
          <p className="site-footer__tag">{SITE.tagline}</p>
          <p className="site-footer__loc">
            <MapPin width={14} height={14} strokeWidth={2} aria-hidden />
            {SITE.location}
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Explore">
          <h4>Explore</h4>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h4>Engage</h4>
          <div className="site-footer__actions">
            <Link href="/enquire" className="site-footer__cta">
              Enquire
              <ArrowUpRight width={13} height={13} strokeWidth={2.5} aria-hidden />
            </Link>
            <LoadingLink href="/portal/login" className="site-footer__cta site-footer__cta--secondary">
              Student Portal
            </LoadingLink>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Connect</h4>
          <a href={`mailto:${SITE.email}`} className="site-footer__email">
            <Mail width={15} height={15} strokeWidth={2} aria-hidden />
            {SITE.email}
          </a>
          <div className="site-footer__social">
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={SITE.socials.threads} target="_blank" rel="noopener noreferrer">
              Threads
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__bar">
        <span>
          © {year} {SITE.name}. All rights reserved.
        </span>
        <div className="site-footer__legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>

      <p className="site-footer__made">
        Made with <span className="site-footer__heart">♥</span> in{" "}
        <span lang="hi">भारत</span> (India)
      </p>
    </footer>
  );
}
