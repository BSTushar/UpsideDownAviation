# Upside Down Aviation — Developer Handoff

**Repository:** https://github.com/BSTushar/UpsideDownAviation  
**Project owner / GitHub:** BSTushar  
**Contact:** tusharsbapu@gmail.com  
**Brand:** Upside Down Aviation · *Train. Prepare. Fly.*  
**Location:** New Delhi NCR, India  
**Production URL (planned):** https://upsidedownaviation.com  

This document is the single source of truth for continuing development without tribal knowledge. Read it end-to-end before changing architecture, brand, or portal auth.

---

## 1. What this project is

A **Next.js 15 marketing website** plus a **student portal UI prototype** (mock data, no real auth yet) and an **admin ops shell** (placeholder pages).

| Area | Status |
|------|--------|
| Public marketing site | Functional — hero, programs, journey, globe, enquire |
| Inquiry API | Validates + honeypot; **email delivery not wired** |
| Student portal | Demo via “View the experience” + spotlight tour |
| Admin portal | Static mock UI |
| Real Google auth / DB | **Not implemented** |

---

## 2. Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 3 + CSS variables (`src/styles/tokens.css`) |
| Motion | Framer Motion, Lenis smooth scroll |
| Icons | Lucide React |
| Validation | Zod (`src/lib/validation.ts`) |
| Fonts | Inter + JetBrains Mono (Google Fonts, `layout.tsx`) |
| Container | Docker (standalone Next.js build) |

**Not in active use (legacy docs may mention):** GSAP, Three.js — current homepage uses Canvas globe in `GlobeSection.tsx`, not react-three-fiber.

---

## 3. Quick start (local)

```bash
cd UpsideDownAviation   # or your clone path
npm install
cp .env.example .env.local    # optional until inquiry email is wired
npm run dev                     # http://localhost:3000
```

**Share with teammates on same Wi‑Fi:**

```bash
npm run dev:share               # binds 0.0.0.0 — use Network URL from terminal
```

**Demo links to send:**

- Site: `http://<your-ip>:3000/`
- Enquire: `/enquire`
- Portal preview: `/portal/login` → click **View the experience** → enter name → guided tour

---

## 4. Docker

### Production container

```bash
docker compose build web
docker compose up web
# → http://localhost:3000
```

Uses multi-stage `Dockerfile` + Next.js `output: "standalone"` in `next.config.mjs`.

### Development container (hot reload)

```bash
docker compose --profile dev up web-dev
```

Mounts source + named volumes for `node_modules` and `.next`.

### npm shortcuts

| Script | Action |
|--------|--------|
| `npm run docker:build` | Build production image |
| `npm run docker:up` | Run production container |
| `npm run docker:dev` | Run dev container with HMR |

Create `.env.local` from `.env.example` before production if inquiry email is enabled.

---

## 5. Environment variables

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Email delivery (not wired yet) |
| `INQUIRY_TO_EMAIL` | Recipient for enquire form |
| `INQUIRY_WEBHOOK_URL` | Optional CRM/Sheets webhook |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (optional) |

---

## 6. Repository layout

```
src/
  app/
    layout.tsx              # Root: fonts, metadata, LoadingProvider, SmoothScroll, JsonLd
    page.tsx                # Homepage → WelcomeExperience
    enquire/                # Lead capture page
    privacy/  terms/        # Legal stubs — replace copy before launch
    api/inquiry/route.ts    # POST enquire handler
    portal/
      login/                # Portal entry + preview name gate
      (student)/            # Dashboard, schedule, journey, profile, etc.
    admin/(ops)/            # Admin mock pages
  components/
    brand/BrandLogo.tsx     # Original logo-mark.png (do not recolor assets)
    layout/                 # Navigation, Footer, MobileNavTicker, FooterWatermark
    welcome/                # Homepage sections
    motion/                 # LoadingProvider, OpeningStory, TypeText, SmoothScroll
    forms/InquiryForm.tsx
    portal/                 # Preview tour, auth gate, dashboard widgets
    ui/                     # Button, GlassPanel, SectionHeader, etc.
  content/sections.ts       # Marketing copy (CMS-ready shape)
  lib/
    constants.ts            # SITE, NAV_LINKS, socials
    validation.ts           # Zod schemas
    portal/                 # Mock data, tour steps, preview session keys
  styles/
    tokens.css              # Color system
    globals.css             # Utilities, brand-halo, glass panels
public/
  logo-mark.png, logo-full.png   # Original brand assets — do not modify
  images/, og/, fonts/
Dockerfile
docker-compose.yml
```

**Related docs (older, partial overlap):**

- `frontend_build_spec.md` — original build spec  
- `to_next_developer.md` — design token notes  
- `STUDENT_PORTAL_V1_SPEC.md` — portal product spec  
- `public/design.pdf` — brand/design reference  

---

## 7. Routes

| Route | Type | Notes |
|-------|------|-------|
| `/` | SSG | Full marketing homepage |
| `/enquire` | SSG | InquiryForm → POST `/api/inquiry` |
| `/privacy`, `/terms` | SSG | Replace placeholder legal copy |
| `/portal/login` | Client | Real login stub; **View the experience** starts demo |
| `/portal/dashboard` | Client | Mock student dashboard |
| `/portal/*` | Client | Schedule, journey, profile, announcements, etc. |
| `/admin/*` | Client | Ops mock UI |
| `/api/inquiry` | API | Zod + honeypot |
| `/sitemap.xml`, `/robots.txt` | Generated | SEO |

---

## 8. Brand & design system

**Do not edit logo PNG files.** Site colors were aligned to complement logo gold.

| Token | Value | Usage |
|-------|-------|--------|
| Void (background) | `#07111F` | Page background |
| Surface | `#0E1C2F` | Cards, panels |
| Accent | `#D4AF7A` | Champagne gold — buttons, links, highlights |
| Footer headings | `#8EB4D4` | Soft sky blue column labels |
| Text | `#FFFFFF` / `#8BA3BF` (slate) | Body hierarchy |

Defined in `src/styles/tokens.css`. Tailwind maps via `tailwind.config.ts` (`bg-void`, `text-accent`, etc.).

**Logo usage:**

- Nav / portal header: `BrandLogo` → `/logo-mark.png`  
- Footer / portal login: `/logo-full.png` + `.brand-halo` + `mix-blend-screen`  

**Typography:** Inter as `--font-inktrap`. Type scale in `tokens.css` + `typography.css`.

---

## 9. Homepage sections

Composed in `WelcomeExperience.tsx`:

1. **WelcomeScreen** — Hero, boarding-pass card, floating nav  
2. **WhyAviation** — Mission  
3. **Programs** — `#programs`  
4. **StudentJourney** — `#journey`  
5. **PlatformModules** — Platform overview  
6. **GlobeSection** — Interactive canvas globe  
7. **FutureVision** — `#vision`  
8. **FinalCta** — Enquire CTA  
9. **Footer** — 4-column layout, compass watermark, Made with ♥ in भारत  

**Motion highlights:**

- `TypeText` — scroll-triggered typewriter on headlines  
- `AltitudeIndicator` — scroll-linked altitude, lands at 0 ft  
- `Navigation` — morphs to floating white pill on scroll; mobile center ticker fills gap  

---

## 10. Loading screen behavior

`LoadingProvider` (`src/components/motion/LoadingProvider.tsx`) wraps the app in `layout.tsx`.

Shows `OpeningStory` **only when:**

1. Browser **refresh** (F5), or  
2. **`startLoading()`** called — enquire form submit, portal preview entry  

Does **not** run on normal client-side navigation or first visit.

---

## 11. Student portal demo (no real auth)

**Flow:**

1. `/portal/login` → **View the experience**  
2. `PreviewNameGate` collects name  
3. `startPreviewSession(name)` writes `sessionStorage`  
4. Redirect to `/portal/dashboard`  
5. `PreviewTour` spotlight tour highlights real UI elements  
6. `DemoPreviewBanner` — champagne/gold accent bar, exit preview  

**Key files:**

| File | Role |
|------|------|
| `lib/portal/preview.ts` | Session keys, start/clear preview |
| `portal/PreviewProvider.tsx` | Overrides mock student name |
| `portal/PreviewTour.tsx` | Spotlight tour UI |
| `lib/portal/tour-steps.ts` | Tour copy + `data-tour` targets |
| `portal/PortalAuthGate.tsx` | Checks session for student routes |

**Mock data:** `lib/portal/mock-data.ts` — replace with API when backend exists.

---

## 12. Footer (latest design)

`src/components/layout/Footer.tsx`:

- 4 columns: Brand · Explore · Engage · Connect  
- Gradient background + compass/wing watermarks  
- Enquire = ghost CTA with aviation-blue hover  
- Bottom strip: muted copyright + bold Privacy/Terms  
- **Made with ♥ in भारत (India)**  

---

## 13. Mobile navigation

`MobileNavTicker.tsx` — center animation on phone (tagline + sliding gold line).  
Site name truncates next to logo on small screens when nav is floating white bar.

---

## 14. Content management

All marketing copy lives in **`src/content/sections.ts`**.  
Site-wide strings in **`src/lib/constants.ts`**.

To add a headless CMS later: fetch in server components and pass props — shapes are already typed.

---

## 15. Inquiry API

`POST /api/inquiry` — body validated by `inquirySchema`. Honeypot field `company` silently drops spam.

**TODO before launch** (`route.ts`):

```ts
// await sendEmail(parsed.data);      // Resend
// await appendToSheet(parsed.data);  // optional webhook
```

---

## 16. Deployment

### Vercel (recommended)

1. Push to GitHub  
2. Import repo in Vercel  
3. Set env vars from `.env.example`  
4. Connect domain `upsidedownaviation.com`  

### Docker / VPS

```bash
docker compose build web
docker compose up -d web
```

Reverse proxy (nginx/Caddy) → container port 3000, SSL via Let's Encrypt.

---

## 17. Common dev issues

### 500 / blank page / `Cannot find module './xxx.js'`

Stale `.next` cache — usually from running `npm run build` while `npm run dev` is active, or multiple node processes.

**Fix (PowerShell):**

```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .next
npm run dev
```

### Port already in use

Kill all node processes or use the alternate port Next.js suggests (e.g. 3001).

### Logo looks wrong

Never recolor or replace logo PNGs with SVG hacks. Use original files from `public/logo-mark.png` and `logo-full.png`.

---

## 18. Pre-launch checklist

- [ ] Replace Privacy/Terms placeholder copy (DPDP Act 2023)  
- [ ] Wire inquiry email in `api/inquiry/route.ts` + env vars  
- [ ] Add real phone/WhatsApp to `SITE` in `constants.ts` if needed  
- [ ] Replace `public/og/default.jpg` and hero/vision images if placeholders  
- [ ] Connect student portal to real auth (Google OAuth planned)  
- [ ] GA4 + Search Console  
- [ ] Production deploy + SSL  

---

## 19. Scripts reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run dev:share` | Dev on 0.0.0.0 for LAN sharing |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run docker:build` | Docker production image |
| `npm run docker:up` | Run production container |
| `npm run docker:dev` | Docker dev with HMR |

---

## 20. Git & ownership

```text
Remote:  https://github.com/BSTushar/UpsideDownAviation.git
Branch:  main
Owner:   BSTushar
Email:   tusharsbapu@gmail.com
```

When handing off: grant repo access, share `.env.local` values securely (never commit), and point the next developer to this file first.

---

*Last updated: June 2026 — reflects marketing site, portal demo, Docker, and champagne-gold design system.*
