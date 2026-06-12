# Upside Down Aviation — Design System Architecture

> Lead Frontend Architect deliverable. Visual system sourced from `design.pdf` (dusk terminal / violet void). Brand content from Upside Down Aviation specs.

---

## Folder Tree

```
avac/
├── public/
│   ├── fonts/              # Licensed WOFF2 drop zone (Whyte Inktrap, GrandSlang)
│   ├── images/             # hero.jpg, vision.jpg, cta.jpg, logo.png
│   ├── og/                 # Social share cards
│   └── video/              # Optional atmospheric loops
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── layout.tsx                # Fonts, metadata, SmoothScroll provider
│   │   ├── page.tsx                  # Welcome experience entry
│   │   ├── enquire/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── api/inquiry/route.ts
│   ├── components/
│   │   ├── ui/                       # Design system primitives
│   │   │   ├── Button.tsx            # Ghost, filled, accent, icon
│   │   │   ├── Card.tsx              # Default, gradient, feature, outlined
│   │   │   ├── GlassPanel.tsx        # Boarding pass / liquid glass
│   │   │   ├── Modal.tsx             # Framer AnimatePresence overlay
│   │   │   ├── Badge.tsx
│   │   │   ├── FormElements.tsx      # Input, Select, Textarea, Checkbox
│   │   │   ├── Progress.tsx          # Bar, ring, steps
│   │   │   ├── Timeline.tsx          # Vertical, horizontal, flight-path, FeatureRow
│   │   │   ├── Typography.tsx        # Type scale + HeroHeadline
│   │   │   └── index.ts              # Barrel export
│   │   ├── layout/
│   │   │   ├── Navigation.tsx        # Top nav (transparent → void on scroll)
│   │   │   ├── Sidebar.tsx           # Slide-in secondary nav
│   │   │   ├── CoordinateFooter.tsx  # GPS + "Fly Direct" persistent bar
│   │   │   └── Footer.tsx
│   │   ├── welcome/                  # Public first-visit experience
│   │   │   ├── OpeningStory.tsx      # §1 Cinematic intro
│   │   │   ├── WelcomeScreen.tsx     # §2 Hero + boarding pass
│   │   │   ├── WhyAviation.tsx       # §3 Manifesto
│   │   │   ├── StudentJourney.tsx    # §4 Timeline / departure board
│   │   │   ├── Programs.tsx          # §5 Feature rows + gradient cards
│   │   │   ├── FutureVision.tsx      # §6 Atmospheric vision
│   │   │   ├── FinalCta.tsx          # §7 Conversion
│   │   │   └── WelcomeExperience.tsx # Orchestrator + section tracking
│   │   ├── forms/
│   │   ├── motion/                   # Lenis, GSAP, Reveal
│   │   └── intro/                    # Legacy CinematicIntro (SVG takeoff)
│   ├── content/
│   │   └── sections.ts               # CMS-ready copy
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   └── useScrollDirection.ts
│   ├── lib/
│   │   ├── tokens/index.ts           # Programmatic color/motion/layout tokens
│   │   ├── theme/index.ts            # Dark-only theme config
│   │   ├── cn.ts
│   │   └── constants.ts
│   └── styles/
│       ├── tokens.css                # CSS custom properties (source of truth)
│       ├── typography.css            # Type pairing utilities
│       └── globals.css               # Base, glass, reduced-motion
├── tailwind.config.ts                # Token → Tailwind mapping
└── ARCHITECTURE.md                   # This file
```

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js 15 App Router** | SSR/SSG for marketing, file-based routing, `next/font` for typography |
| **CSS variables first** | `tokens.css` is canonical; Tailwind extends tokens — no duplicate hex values |
| **Dark-only theme** | design.pdf: "Don't add a light theme variant" — void canvas is the brand |
| **No Material UI** | Custom primitives built from spec (ghost pills, glass panels, hairline borders) |
| **Section-mixed styles** | Each welcome section uses the style treatment that suits its emotional job |
| **Framer Motion + Lenis** | Component entrances/hover; Lenis drives smooth scroll (existing stack) |
| **Typography substitutes** | Inter/JetBrains Mono/Playfair until licensed Whyte Inktrap + GrandSlang files |
| **Coordinate footer** | Load-bearing aviation metaphor — GPS updates per scroll section |
| **One serif moment per hero** | GrandSlang editorial rule enforced in Welcome + Why + Vision |

---

## Design Token Mapping

### Colors (`tokens.css` → Tailwind)

| Token | CSS Variable | Tailwind | Role |
|-------|--------------|----------|------|
| Void | `--color-void` | `bg-void` | Page canvas |
| Bone White | `--color-bone-white` | `text-bone-white` | Primary text |
| Ash | `--color-ash` | `text-ash` | Display borders, decorative type |
| Slate | `--color-slate` | `text-slate` | Muted text |
| Graphite | `--color-graphite` | `border-graphite` | Card edges |
| Iris | `--color-iris` | `text-iris`, `ring-iris` | Primary accent, focus, glow |
| Plum | `--color-plum` | `text-plum` | Active nav indicator |
| Aubergine | `--color-aubergine` | `bg-aubergine` | Filled button border |
| Storm Gray | `--color-storm-gray` | `border-storm-gray` | Ghost button borders |

### Typography

| Spec Face | Substitute | CSS Class | Use |
|-----------|------------|-----------|-----|
| Whyte Inktrap | Inter | `.type-body`, `.type-display` | Nav, body, headlines |
| Whyte Inktrap Mono | JetBrains Mono | `.type-board`, `.type-mono-label` | Departure board, codes |
| GrandSlang | Playfair Display Italic | `.type-editorial` | One emotional moment per section |
| Karla | Karla | `--font-karla` | Button fallback |

### Motion

| Token | Value | Use |
|-------|-------|-----|
| `--ease-signature` | `cubic-bezier(0.16, 1, 0.3, 1)` | All reveals, hovers |
| `--dur-micro` | 250ms | Button borders, nav underline |
| `--dur-reveal` | 700ms | Section entrances |
| `--dur-cinematic` | 800ms | Opening story, hero load |
| `--stagger-sm` | 80ms | Card grid, timeline items |

### Spacing & Shape

| Token | Value | Element |
|-------|-------|---------|
| `--radius-cards` | 19.2px | Cards, glass panels |
| `--radius-buttons` | 9999px | All interactive pills |
| `--page-max-width` | 1280px | Content container |
| `--section-gap` | 80px | Vertical section rhythm |

---

## Component Hierarchy

```
WelcomeExperience
├── OpeningStory                    [overlay, z-200]
├── main
│   ├── WelcomeScreen
│   │   ├── Navigation
│   │   ├── HeroHeadline (editorial + display)
│   │   └── GlassPanel (boarding pass)
│   ├── WhyAviation
│   │   └── Typography (editorial accent)
│   ├── StudentJourney
│   │   ├── FeatureRow ×3 (mobile)
│   │   └── Timeline (flight-path / vertical)
│   ├── Programs
│   │   ├── FeatureRow ×3
│   │   └── Card[gradient] ×6
│   ├── FutureVision
│   │   └── Badge + editorial headline
│   ├── FinalCta
│   │   └── Button[accent, ghost]
│   └── Footer
└── CoordinateFooter                  [fixed, section-aware GPS]
```

### UI Primitive Dependencies

```
Button ──────────────────────────► used by Navigation, Modal, Welcome, CTA
Card ──► CardNumber, CardLabel ──► Programs section
GlassPanel ──────────────────────► WelcomeScreen boarding pass
Modal ───────────────────────────► Inquiry flows (forms/)
Timeline ──► FeatureRow ─────────► Journey + Programs
FormElements ────────────────────► InquiryForm
Progress ────────────────────────► Future student portal (reserved)
Sidebar ─────────────────────────► Secondary nav contexts
```

---

## Welcome Experience — Screen Layouts

### 1. Opening Story Animation
- **Layout:** Full viewport void canvas, centered editorial stack, runway horizon line
- **Motion:** Brand fade-up → aircraft traverse → violet radial atmosphere → fade to hero
- **Mobile:** Same sequence, skip at 2s, auto-complete at 7s; reduced-motion skips entirely

### 2. Welcome Screen
- **Layout:** Split — left headline stack (editorial + display), right boarding pass glass panel
- **Background:** Full-bleed hero photography + orchid radial + void gradient
- **Mobile:** Stacked — headline first, boarding pass below, scroll cue above coordinate footer

### 3. Why Aviation
- **Layout:** Centered manifesto, max 720px, eyebrow + hairline
- **Style:** Editorial serif "Most are taught" + bold sans continuation
- **Motion:** Paragraph stagger on scroll

### 4. Student Journey
- **Layout:** Desktop — flight-path timeline + vertical node list; Mobile — outlined FeatureRows
- **Style:** Airport departure board mono for mobile rows; GrandSlang outline numbers on desktop

### 5. Programs
- **Layout:** 3 feature rows + 3×2 gradient card grid
- **Style:** Outlined board rows for scanability; gradient cards for program depth

### 6. Future Vision
- **Layout:** Left-anchored copy over vision photography, amethyst band wash
- **Style:** Badge "On the Horizon" + editorial "This is only" + sans headline

### 7. Final CTA
- **Layout:** Centered, vast negative space, dual ghost/accent buttons
- **Background:** cta.jpg with void gradient — brighter horizon metaphor

---

## Storytelling Flow

```
[Black void]
    ↓ OpeningStory: "Your ascent begins here"
[Atmospheric hero — you are at the gate]
    ↓ WelcomeScreen: boarding pass issued (DREAM → DECK)
[Conviction — why this exists]
    ↓ WhyAviation: manifesto, no CTA
[The path — seven stages]
    ↓ StudentJourney: departure board → flight path
[What we offer]
    ↓ Programs: scan rows → explore cards
[Where we're going]
    ↓ FutureVision: flying school on horizon
[Convert]
    ↓ FinalCta → /enquire or WhatsApp
[Site continues via Footer links]
```

---

## Motion Concepts

| Section | Entrance | Scroll | Hover |
|---------|----------|--------|-------|
| Opening | Timed timeline, aircraft traverse | N/A | Skip button |
| Welcome | Hero stagger 300–600ms delay | Parallax on BG (future GSAP) | Play button iris glow |
| Why | Fade-up 24px | Line stagger | — |
| Journey | FeatureRow border iris | Flight-path draw (GSAP-ready) | Row arrow nudge |
| Programs | Card grid stagger 80ms | — | Card link arrow |
| Vision | Editorial fade-up | BG parallax | — |
| CTA | Center fade-up | — | Button iris glow |

---

## Mobile Adaptations

| Pattern | Desktop | Mobile |
|---------|---------|--------|
| Navigation | Center links + dual CTAs | Hamburger → full overlay |
| Hero | Side-by-side headline + glass | Stacked, reduced display size via clamp |
| Journey | Flight-path + 2-col timeline | FeatureRow stack only |
| Programs | 3-col card grid | 1-col stack |
| Coordinate footer | Full GPS string | Abbreviated, same bar |
| Opening story | Full cinematic | Skip prominent, reduced layers |

---

## UX Rationale

1. **Intro before content** — First visit earns emotional investment before navigation appears; skip respects return visitors.
2. **Boarding pass as conversion metaphor** — Glass panel makes abstract "begin training" tangible; origin/destination codes reinforce journey narrative.
3. **One editorial moment per section** — Prevents serif fatigue; each italic phrase marks an emotional beat, not decoration.
4. **Departure board for journey** — Mono outlined type signals "system voice" — authoritative, not marketing fluff.
5. **Gradient cards for programs** — Violet washes differentiate offerings without competing chroma (design.pdf rule).
6. **Coordinate footer** — Persistent spatial metaphor; GPS shifts imply progress through the story.
7. **No student portal chrome on public site** — Welcome experience is lead-gen only; portal lives at `/portal`.

---

## Student Portal — Aviation Command Center

> UI scaffold with mock data. Auth/data layer per `STUDENT_PORTAL_V1_SPEC.md` (Supabase + Google OAuth).

### Routes

| Route | Purpose |
|-------|---------|
| `/portal/login` | Google sign-in, invitation-only messaging |
| `/portal/pending` | Unauthorized / pending approval |
| `/portal/dashboard` | Command Center — welcome, next class, attendance, announcements |
| `/portal/journey` | 7-stage timeline with mentor checkpoints |
| `/portal/schedule` | Timeline + calendar views, join/add-to-calendar |
| `/portal/attendance` | Percentage, history table, monthly summary |
| `/portal/announcements` | Search, filters, read/unread, attachments |
| `/portal/progress` | Subjects, modules, mentor feedback |
| `/portal/mentorship` | Assigned mentor, notes, schedule session |
| `/portal/profile` | Enrollment details, editable phone, future fields |
| `/admin/*` | Operations overview, students, programs, batches, classes, etc. |

### Design continuity

- Same void canvas, iris accent, glass panels, mono stage codes
- **Command Center** naming (not "Dashboard" in nav)
- Journey strip visible on dashboard — seven stages always present
- `PortalStatusBar` continues the coordinate footer metaphor
- No Material UI, no generic admin template patterns

### Component hierarchy

```
PortalShell
├── PortalTopBar (bell, avatar, quick nav)
├── PortalSidebar (full nav, stage label)
├── Page content (CommandPanel grid)
└── PortalStatusBar (Fly Direct + GPS)
```

### Next portal steps

1. Supabase Auth (Google OAuth, invite-only gate)
2. RLS-backed data replacing `lib/portal/mock-data.ts`
3. Google Calendar sync server actions
4. Mentor role views (subset of admin)
5. Middleware guards on `/portal/*` and `/admin/*`

---

## Next Steps (Public Site)

1. Drop licensed Whyte Inktrap + GrandSlang WOFF2 into `public/fonts/`
2. Replace hero/vision/cta placeholder images per `public/images/README.md`
3. Wire GSAP ScrollTrigger for journey flight-path pin (see `frontend_build_spec.md`)
4. Connect InquiryForm to Modal on CTA clicks
