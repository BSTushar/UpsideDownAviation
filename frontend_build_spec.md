# UPSIDE DOWN AVIATION — FRONTEND BUILD SPECIFICATION

> Build companion to `to_next_developer.md` (design system, motion tokens, copy live there — not repeated here). This file = how to build the actual site.

## TECH STACK (final)
| Tool | Role |
|---|---|
| Next.js (App Router) | Framework, SSR/SSG, routing |
| TypeScript | Type safety |
| Tailwind CSS | Styling (design tokens → `tailwind.config.ts`) |
| GSAP + ScrollTrigger | Scroll-bound: flight-path draw, pinned Journey, parallax |
| Framer Motion | Component-level: entrances, hover, layout, AnimatePresence |
| Lenis | Smooth scroll (drives ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`) |

**Rule of thumb:** Lenis = scroll engine · GSAP = scroll-tied/timeline · Framer = enter/exit/hover/state. Don't double-animate one element with both.

---

## GLOBAL LAYOUT

### Navigation
- Fixed top, transparent over Hero → solid `bg/black` + hairline border after 80px scroll.
- Left: logo. Center/right (desktop): anchor links (About, Ecosystem, Journey, Vision) + RU lang chip. Right: "Speak to an Advisor" (secondary button).
- Mobile: logo + hamburger → full-screen overlay menu (Framer `AnimatePresence`, stagger links, gold underline-draw on tap).
- Component: `<Navbar>` with `useScrollDirection` (hide on scroll-down, show on up) + `scrolled` state.

### Footer
- `bg/black`, hairline top border, 3 zones: brand/tagline · quick links · contact (phone, email, WhatsApp, socials: Instagram, Threads).
- Bottom row: ©2025 Upside Down Aviation · Privacy · Terms · "Made by".
- Mobile: stacked single column, WhatsApp CTA prominent.

### Contact / Lead Capture Flow
- No e-commerce. Every "Enquire / Speak to an Advisor" → opens `<InquiryModal>` (Framer modal) OR routes to `/enquire`.
- Fields: Name, Phone, Email, Interest (select: Ground Training / Technical / Exam Prep / Career / Mentorship / General), Message (optional). Consent checkbox (links Privacy).
- Submit → serverless route (`/api/inquiry`) → email (Resend) + optional Google Sheet/CRM. Success state inline. Honeypot + rate-limit for spam.

### WhatsApp Integration Strategy
- Primary fast-path conversion (audience lives on mobile/IG).
- Floating WhatsApp FAB bottom-right (mobile: bottom bar). `https://wa.me/<number>?text=<prefilled>` — prefill: "Hi Upside Down Aviation, I'd like to know more about ___".
- Each Ecosystem card "Enquire" can deep-link with card-specific prefilled text.
- Use official WhatsApp Business number. No third-party chat widget for v1 (keeps it fast).

### Inquiry Flow (funnel)
`CTA click → Modal/Page → fill → validate → submit → success + WhatsApp nudge → email/CRM notify team → manual close offline.`

---

## SECTIONS (build-level)
Order: Hero → Why → Journey → Ecosystem → Future Vision → Final CTA. Layout/copy/visuals in `to_next_developer.md §3`. Below = component + motion build only.

### 1. Hero `<HeroSection>`
- Layout: 100vh, full-bleed `<BgMedia>` + `<GradientOverlay>`, content lower-left.
- Components: `Navbar`, `BgMedia`, `Headline` (split into words), `SubCopy`, `ScrollCue`.
- Motion: Framer on-load word stagger; GSAP horizon-line draw; GSAP parallax on BG (yPercent on scroll). ScrollCue bob loop.
- Desktop: headline Display XL, left 7 cols. Mobile: portrait crop, XL/44, lower third, simplified parallax.

### 2. Why `<MissionSection>`
- Components: `SectionHeader` (eyebrow+hairline), `ManifestoText` (line-split), optional `SideImage`.
- Motion: GSAP ScrollTrigger line-by-line reveal (stagger 100ms); gold underline-draw on emphasized words.
- Desktop: centered 60ch. Mobile: stacked, faster reveals.

### 3. Aviation Journey `<JourneySection>` — signature
- Components: `SectionHeader`, `FlightPath` (SVG `<path>`), `JourneyNode` ×5, `AircraftGlyph`.
- Motion: **GSAP pinned ScrollTrigger.** Pin section; `strokeDashoffset` draws path tied to scroll progress; nodes fade+scale via timeline; aircraft glyph moves along path (`MotionPathPlugin` or path-length sampling).
- Desktop: horizontal ascending arc, pinned. Mobile: vertical timeline, **no pin** — IntersectionObserver/Framer `whileInView` sequential reveal.

### 4. Aviation Ecosystem `<EcosystemSection>`
- Components: `SectionHeader`, `EcosystemCard` ×6 (one variant = "on the horizon" dimmed + tag).
- Motion: Framer `whileInView` stagger (80ms). Hover: lift -8px + gold glow + image scale (CSS/Framer).
- Desktop: 3-col × 2 grid. Mobile: single-col stack (or swipe carousel via Embla — flag for A/B).

### 5. Future Vision `<VisionSection>`
- Components: `BgMedia`, `GlowOverlay`, `Headline`, `CopyBlock`, `DateStampChip`.
- Motion: GSAP upward-drift parallax; gold glow opacity tied to scroll; Framer headline fade-up.
- Desktop: center-left, max air. Mobile: portrait, drift→fade.

### 6. Final CTA `<FinalCtaSection>`
- Components: `BgMedia`, `Overlay`, `Headline`, `SubCopy`, `Button` (primary), `WhatsAppLink`.
- Motion: Framer fade-up; button breathing gold glow loop (2s); BG slow drift.
- Desktop: centered, vast air. Mobile: full-width button lower third.

---

## COMPONENT LIBRARY
| Component | Variants / Props |
|---|---|
| `Button` | primary / secondary / ghost · size sm/md · `as` link/button · trailing icon |
| `Card` | `EcosystemCard` (index, image, title, desc, cta, `comingSoon?`) |
| `Navbar` | `scrolled`, `hidden`, `mobileOpen` |
| `MobileMenu` | AnimatePresence overlay |
| `SectionHeader` | eyebrow, headline, align, hairline? |
| `Timeline` / `FlightPath` | SVG path + progress |
| `JourneyNode` | number, icon, title, descriptor, side (above/below) |
| `CtaBlock` | headline, copy, primary, secondary(WhatsApp) |
| `InquiryForm` / `InquiryModal` | fields, validation, status |
| `WhatsAppFab` | number, prefill |
| `BgMedia` | image/video, gradient, parallax? |
| `Eyebrow`, `DateStampChip`, `ScrollCue` | atomic |

All components: TypeScript props, `forwardRef` where animated, `prefers-reduced-motion` aware.

---

## ANIMATION ARCHITECTURE
- **GSAP ScrollTrigger:** flight-path draw + pin (Journey), parallax (Hero/Vision), scroll-bound glow. Register plugins client-only. Use `gsap.context()` scoped per section; `ctx.revert()` on unmount.
- **Framer Motion:** entrances (`whileInView`, `viewport={{once:true, amount:0.2}}`), hover (`whileHover`), mobile menu (`AnimatePresence`), modal.
- **Lenis:** init in root client provider; sync `ScrollTrigger.update`; `lerp ~0.1`; disable on reduced-motion.
- **Hover states:** per design system (button fill/scale, card lift+glow, link arrow nudge, nav underline).
- **Page transitions:** single-page scroll v1; if multi-route, Framer page-transition wrapper (fade) in `template.tsx`.
- **Performance:** animate only `transform`/`opacity`; `will-change` sparingly; lazy-init heavy ScrollTriggers; kill on unmount; cap parallax on mobile; `prefers-reduced-motion` → instant fades, no pin.

---

## PROJECT STRUCTURE

### Folder
```
/src
  /app
    layout.tsx        # fonts, metadata, providers
    page.tsx          # home (all sections)
    /enquire/page.tsx
    /privacy/page.tsx
    /terms/page.tsx
    /api/inquiry/route.ts
  /components
    /sections         # Hero, Mission, Journey, Ecosystem, Vision, FinalCta
    /ui               # Button, Card, Eyebrow, Chip, ScrollCue...
    /layout           # Navbar, MobileMenu, Footer
    /forms            # InquiryForm, InquiryModal
    /motion           # SmoothScroll(Lenis), Reveal, useScrollTrigger
  /lib                # utils, validation (zod), constants (nav, ecosystem data)
  /hooks              # useScrollDirection, useReducedMotion, useMediaQuery
  /styles             # globals.css
  /content            # sections copy (or Sanity later)
/public
  /images /video /icons /fonts /og
```

### Route
| Route | Purpose |
|---|---|
| `/` | Home (6 sections) |
| `/enquire` | Full inquiry page (modal fallback) |
| `/privacy`, `/terms` | Legal |
| `/api/inquiry` | Form handler |

### Asset
- Images: `next/image`, AVIF/WebP, responsive `sizes`, dark-graded exports. Hero ≤ ~250KB.
- Video (if Hero video): muted, `playsInline`, poster, ≤2–3MB, lazy. Provide image fallback.
- Icons: SVG sprite or per-file React components (1.5px stroke set).
- Fonts: `next/font/local` (Display) + `next/font/google` Inter; `display:swap`; preload Display.

### SEO
- Per-page `metadata` (title, description, OG/Twitter, canonical). Default OG image in `/public/og`.
- `app/sitemap.ts`, `app/robots.ts`. JSON-LD `EducationalOrganization` (name, logo, sameAs socials, contactPoint).
- Semantic landmarks, one `<h1>`/page, descriptive alt text, `lang` + RU `hreflang` if RU added.

### Performance
- Lighthouse target ≥90 all. SSG home. Code-split GSAP/heavy sections (`dynamic`, `ssr:false` where needed).
- Defer below-fold media; preconnect fonts; minimize client JS; Lenis only client.
- Test mid-range Android — degrade pin/parallax there.

### Accessibility (WCAG 2.1 AA)
- Contrast: white/gold on black pass AA. Keyboard nav + visible focus rings (gold). Skip-to-content link.
- Modal: focus-trap, `Esc` close, `aria-modal`. Form: labels, `aria-invalid`, error text linked.
- `prefers-reduced-motion`: no pin/parallax/auto-motion. Alt text all imagery. Motion never sole information carrier.

---

## IMPLEMENTATION ROADMAP (Figma → Launch)
| Stage | Work | Output |
|---|---|---|
| 1. Setup | Next.js+TS+Tailwind, tokens→config, fonts, Lenis provider, ESLint/Prettier | Running shell |
| 2. UI primitives | Button, Card, Eyebrow, SectionHeader, Navbar, Footer | Component library |
| 3. Static sections | Build all 6 sections desktop, no motion | Pixel-matched static |
| 4. Responsive | Mobile 390 + breakpoints | Responsive site |
| 5. Motion | Framer entrances/hover → GSAP parallax → Journey pin/path | Animated site |
| 6. Forms + WhatsApp | InquiryModal, `/api/inquiry`, WhatsApp FAB/deep-links | Working leads |
| 7. SEO + a11y | Metadata, sitemap, JSON-LD, focus/reduced-motion audit | Compliant |
| 8. QA | Cross-browser, devices, Lighthouse ≥90, link/form tests | QA pass |
| 9. Launch | Vercel, domain/SSL, GA4 + Search Console, 48h monitor | Live |

**Definition of done per section:** matches Figma · responsive · motion + reduced-motion fallback · keyboard-accessible · Lighthouse-safe.
