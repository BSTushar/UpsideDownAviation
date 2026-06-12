# UPSIDE DOWN AVIATION — DEVELOPER HANDOVER
### Train. Prepare. Fly.

> **Read me first.** This file is the single source of truth for building the Upside Down Aviation prototype/website. It contains the approved Prototype Specification, Content Architecture (final copy), and the Figma Build Guide (design system + per-section specs). Build from this top to bottom.
>
> **Companion file:** `frontend_build_spec.md` — the actual frontend build spec (tech stack, components, animation architecture, folder/route/SEO/a11y structure, implementation roadmap). Use this design doc for *what it looks like*, the build spec for *how to build it*.

---

## 0. PROJECT CONTEXT (1-minute brief)

- **What:** Premium aviation-education brand. A hub for pilot/aviation-professional training ("JEE/NEET equivalent for aviation"), expanding into a flying school later.
- **This phase:** A **visual prototype only** — 6 scrollable sections to validate the look & feel before full development.
- **NOT in this phase:** e-commerce, student portal/login, full nav/footer, forms logic. (Portal comes later, after revenue — do not build now.)
- **Launch strategy:** Public marketing site first (lead-gen via "Enquire / Speak to an Advisor" + WhatsApp). No direct course sales.
- **Audience reality:** Mostly mobile traffic (Instagram). Build **desktop-rich, mobile-graceful** — simplify heavy parallax/pinning on mobile.

### Recommended stack (when development begins)
| Layer | Tool |
|---|---|
| Framework | Next.js |
| Animations | GSAP ScrollTrigger / Framer Motion |
| Marketing content | Sanity CMS (optional) |
| Hosting | Vercel |

> For a lean startup launch, Framer or Webflow are acceptable alternatives that reproduce ~80% of the scroll experience at lower cost. Next.js is the future-proof choice if the flying-school platform/portal will follow.

### Tone of voice (enforce in all copy)
- ❌ Avoid: "courses," "students," "coaching," "crack the exam," "100% results," "enroll now," "best institute," EdTech language.
- ✅ Use: "training," "preparation," "command," "discipline," "ascent," "those who fly," "the path to the flight deck."
- Feel: luxury aviation / aerospace. Confident, sparse, cinematic. No exclamation marks. Sell with silence and precision.

---

## 1. DESIGN SYSTEM

**Canvas:** Desktop 1440px · Mobile 390px · **Base unit:** 8px · **Max content width:** 1200px (120px side margins desktop)

### Colors
| Token | Hex | Use |
|---|---|---|
| `bg/black` | `#0B0B0D` | Page background |
| `surface/carbon` | `#15161A` | Cards, panels |
| `surface/slate` | `#1E2026` | Secondary panels, hover bg |
| `accent/gold` | `#C9A84C` | CTAs, accent lines, emphasis |
| `accent/gold-soft` | `#E3CB87` | Hover glow, gradients |
| `text/white` | `#F5F5F0` | Headlines, body on dark |
| `text/grey` | `#9A9CA3` | Secondary text, captions |
| `depth/indigo` | `#1B2A3A` | Atmospheric gradient base |
| `line/hairline` | `rgba(245,245,240,0.12)` | Dividers, flight-path, borders |

**Gold usage cap:** ≤5% of any screen. Accent only. Imagery uniformly dark-graded; gold is the only warm note. ~50–60% negative space ("air") in Hero, Future Vision, Final CTA.

### Typography
- **Display:** geometric/technical sans (Clash Display / Neue Haas Grotesk Display)
- **Body:** Inter

| Style | Desktop | Mobile | Weight | Tracking |
|---|---|---|---|---|
| Display XL | 96 / 100 | 44 / 48 | 600 | -2% |
| Display L | 56 / 62 | 32 / 38 | 600 | -1% |
| Heading M | 32 / 40 | 24 / 30 | 600 | 0 |
| Heading S | 24 / 32 | 20 / 28 | 500 | 0 |
| Body L | 18 / 29 | 16 / 26 | 400 | 0 |
| Body M | 16 / 26 | 15 / 24 | 400 | 0 |
| Eyebrow | 13 / 18 | 12 / 16 | 500 | +12%, UPPERCASE |

Max 2 weights per screen. Tight tracking on display; generous on small uppercase labels.

### Buttons
| Type | Spec |
|---|---|
| **Primary** | Fill `accent/gold`, text `bg/black`, padding 18×40, radius 100px (pill), Body M 500 |
| **Secondary** | 1px `accent/gold` border, text `accent/gold`, transparent fill, same padding/radius |
| **Ghost / text-link** | Text `text/grey` → `text/white` on hover, optional trailing → arrow |
| **Min height** | 52px desktop / 48px mobile · full-width on mobile |

### Cards
| Property | Value |
|---|---|
| Background | `surface/carbon` |
| Border | 1px `line/hairline` |
| Radius | 16px |
| Padding | 24px |
| Image header | top, full-bleed, 16:10, dark-graded |
| Index number | top-corner, Eyebrow style, `accent/gold` |
| Title | Heading S |
| Descriptor | Body M `text/grey` |

### Section Spacing
| Token | Desktop | Mobile |
|---|---|---|
| Section vertical padding | 160px | 80px |
| Block gap (intro → content) | 64px | 40px |
| Element gap (within block) | 24px | 16px |
| Grid gutter | 32px | 16px |

### Border Radius
| Element | Radius |
|---|---|
| Cards / panels | 16px |
| Images | 12px |
| Buttons / tags | 100px |

### Shadows (minimal — dark UI uses borders + glow)
| Token | Value |
|---|---|
| `shadow/card-hover` | `0 12px 40px rgba(0,0,0,0.45)` |
| `glow/gold` | `0 0 24px rgba(201,168,76,0.30)` |

### Icon Style
Line icons, 1.5px stroke, rounded caps, `text/white` default / `accent/gold` active, 24px grid. Aviation set: instrument, cloud/met, regulation badge, briefcase, aircraft, mentor.

---

## 2. MOTION SYSTEM

### Tokens
| Token | Value |
|---|---|
| `ease-signature` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `dur-reveal` | 700ms |
| `dur-micro` | 250–300ms |
| `stagger` | 80–120ms |

**Personality:** smooth, weighted, confident. Motion settles, never snaps. No bounce/elastic, no fast spins, no aggressive parallax.

### Scroll Animations
- **Entrance:** opacity 0→1 + translateY 24px→0, `ease-signature`, `dur-reveal`, trigger ~20% in viewport.
- **Stagger:** sequential children 80–120ms apart (reading order).
- **Parallax:** BG drifts 1.05–1.15× scroll (Hero, Future Vision).
- **Pinned:** Journey section only — path draw + node reveal bound to scroll progress.
- **Animate only** `transform` + `opacity`. Respect reduced-motion (→ instant fade). Mobile: simplify/remove pinning & heavy parallax.

### Hover States
| Element | Effect |
|---|---|
| Primary button | fill→`gold-soft`, scale 1.04, 250ms |
| Card | lift -8px, gold border glow, image 1.0→1.04 |
| Text-link | `text/grey`→`text/white`, arrow nudge +4px |
| Nav item | gold underline-draw L→R |

### Page Transitions
- Continuous single-page vertical scroll, no hard cuts. "Window" panels slide up between Hero→Why (the windows-scroll metaphor).

### Figma vs Development split
- **Prototype in Figma:** full vertical scroll, Hero load, scroll-reveals (Why/Programs), Journey flight-path mock (start/mid/end via Smart Animate), card hover, CTA button hover, mobile walkthrough.
- **Defer to development:** true scroll-bound parallax, pinned scroll-scrubbing, real SVG path self-draw, background video/Ken Burns loops, custom cursor, fluid clamp scaling, form/WhatsApp deep-links.

---

## 3. SECTIONS (Layout + Content + Motion)

Order: Hero → Why → Aviation Journey → Aviation Ecosystem → Future Vision → Final CTA.
Grid: 12-col / 120px margins / 32px gutter desktop · 4-col / 20px margins mobile.

---

### SECTION 1 — HERO
**Emotional objective:** Arrest in 2s. Serious aviation institution, not an education site.

**Headlines (pick 1, A recommended):**
- A: **Train. Prepare. Fly.**
- B: The path to the flight deck begins here.
- C: Aviation, learned the right way up.

**Supporting copy:**
> Where India's next generation of pilots and aviation professionals is prepared — with the discipline, knowledge, and standards the flight deck demands.

**CTA:** Begin the Ascent / Speak to an Advisor (understated here).

**Desktop:** Full 100vh. Full-bleed dark aviation image + bottom-up gradient overlay. Logo top-left (120px margin), nav top-right. Headline (Display XL) anchored ~40% from bottom, left 7 cols. Sub-copy (Body L `text/grey`) below, max 6 cols. Scroll cue bottom-center (chevron + "SCROLL").
**Mobile:** Full 100vh portrait crop. Logo top-left, hamburger top-right. Headline (XL/44) lower third, copy below, scroll cue bottom-center.
**Spacing:** headline→copy 24px; scroll cue anchored bottom 48px.
**Hierarchy:** Logo · Nav · BG image · Gradient overlay · Headline · Sub-copy · Scroll cue.
**Visuals:** Cinematic dark aviation (cockpit at dawn / wing in cloud / runway at first light). Thin gold horizon line under headline. Gradient `180° rgba(11,11,13,0)→rgba(11,11,13,0.85)`. No posed/smiling stock.
**Motion:** BG fade-up 800ms. Headline word-stagger (rise 24px + fade, 120ms). Horizon line draws L→R. Ken Burns 1.0→1.05 / 12s. Scroll cue 4px bob loop. On scroll-out: text exits faster than image; window panel slides up.

---

### SECTION 2 — WHY UPSIDE DOWN AVIATION EXISTS
**Emotional objective:** Conviction & trust. A standard the industry was missing.

**Headlines (A recommended):**
- A: **Most are taught to pass. We prepare you to fly.**
- B: Aviation deserves better than rote learning.
- C: We exist to raise the standard of the cockpit.

**Supporting copy:**
> Upside Down Aviation was founded on a simple belief: that the people who will one day command aircraft deserve preparation built on rigor, not shortcuts.
>
> We turn theory into instinct — the numbers, the regulations, the judgment — so that what is learned on the ground becomes second nature in the air. This is not preparation for an exam. It is preparation for a career, and for the responsibility of the flight deck.

**CTA:** None (pure conviction).

**Desktop:** Manifesto block, centered or left-anchored, max-width 60ch (~720px). Eyebrow "WHY WE EXIST" + gold hairline above. Headline Display L. Paragraph Body L `text/grey`. Optional side image (right, 35% width, bleeds off edge). Section padding 160px. Near-black bg + 6%-opacity cloud/contour texture.
**Mobile:** Single column. Eyebrow → Headline (L/32) → paragraph. Side image full-width above/below.
**Grid:** cols 3–10 (center) or 1–7 (left); 4-col mobile.
**Spacing:** eyebrow→headline 16px; headline→paragraph 24px.
**Hierarchy:** Eyebrow + hairline · Headline · Paragraph · (Side image).
**Visuals:** Faint cloud/contour texture. Gold underline-draw on 1–2 emphasized words. Note the brand cue: "upside down" ties to the attitude/artificial-horizon instrument — use it subtly.
**Motion:** Line-by-line reveal (rise + fade, 100ms stagger) on scroll-in. Gold underline draws on emphasized words. Texture drifts subtly.

---

### SECTION 3 — AVIATION JOURNEY
**Emotional objective:** A clear, dignified path from first principles to the cockpit. The signature "wow" moment.

**Headlines (A recommended):**
- A: **From first principles to first officer.**
- B: Every flight begins on the ground.
- C: The climb, charted.

**Supporting copy:**
> The journey to the flight deck is not a single leap — it is a disciplined climb, stage by stage. We map every phase, so you always know your altitude and your heading.

**Stages (waypoints):**
| # | Title | Descriptor |
|---|---|---|
| 01 | Ground Foundations | The principles every aviator must own |
| 02 | Technical Mastery | Navigation, meteorology, systems, regulations |
| 03 | Examination Readiness | Preparation built for command, not memorization |
| 04 | Career Preparation | Interviews, airline standards, the path to a cockpit seat |
| 05 | The Flight Deck | Where preparation becomes profession |

**CTA:** None inline (optional cue: "And the journey doesn't stop at qualification →").

**Desktop:** Full-viewport pinned canvas. Eyebrow "THE JOURNEY" top-left. Ascending gold flight-path arc (low-left → high-right). 5 waypoint nodes along arc, labels alternating above/below (number + title + descriptor). Aircraft glyph rides path.
**Mobile:** Vertical climbing timeline (top→bottom). Continuous gold line, nodes icon-left/label-right. No pin — sequential reveal.
**Grid:** Full-bleed canvas (path ignores columns); labels snap to nearest column. Mobile: line at 32px from left.
**Spacing:** nodes evenly distributed; label internal number→title 8px, title→descriptor 8px.
**Hierarchy:** Eyebrow · Flight-path SVG · Waypoint nodes ×5 · Node labels · Aircraft glyph.
**Visuals:** Gold arc 1.5px (dashed→solid as drawn). White node dots 8px with gold ring. Line icon per stage. Aesthetic: aeronautical chart meets luxury infographic.
**Motion:** **Pinned scroll** — path draws with scroll progress; nodes fade+scale in as line reaches them; aircraft glyph travels path; release on completion. Figma: mock start/mid/end via Smart Animate. Mobile: simple sequential reveal, no pin.

---

### SECTION 4 — AVIATION ECOSYSTEM
**Emotional objective:** Scope & seriousness — a complete environment, not a single offering.

**Headlines (A recommended):**
- A: **An entire ecosystem, built around the aviator.**
- B: Not a single subject. A complete preparation.
- C: Everything the flight deck demands, in one place.

**Supporting copy:**
> Becoming a professional aviator requires more than passing a paper. It demands command of theory, fluency in regulation, readiness for the airline floor, and the judgment that only disciplined preparation builds. We bring all of it under one standard.

**Cards (6):**
| # | Pillar | Descriptor |
|---|---|---|
| 01 | Ground Training | The complete theoretical foundation of flight |
| 02 | Technical & Regulatory | Systems, navigation, meteorology, and air law |
| 03 | Examination Preparation | Disciplined readiness for licensing standards |
| 04 | Career & Airline Readiness | From qualification to the right-hand seat |
| 05 | Mentorship | Guidance from those who fly |
| 06 | Flying School | *On the horizon* — coming soon (dimmed + gold tag) |

**CTA (per card, visual only):** Enquire / Speak to an Advisor.

**Desktop:** Left-aligned intro block (Eyebrow "THE ECOSYSTEM" + Heading M + Body L). Below: 3-col card grid, 2 rows (6 cards), numbered 01–06. Section padding 160px.
**Mobile:** Intro stacks. Cards single-column full-width (alt: swipe carousel).
**Grid:** Cards span 4 cols each (3-up); 32px gutter. Mobile 4-col full-width.
**Spacing:** intro→grid 64px; gutter 32px (16px mobile); card padding 24px.
**Hierarchy:** Eyebrow · Headline · Intro copy · Card grid → [index · image header · title · descriptor · "Enquire" link].
**Visuals:** Dark-graded image headers, gold hairline accent. No prices, no "buy."
**Motion:** Cards stagger-reveal (rise + fade, 80ms). Hover: lift -8px, gold border glow, image 1.0→1.04, 250ms. "Flying School" card: subtle pulse on tag.

---

### SECTION 5 — FUTURE VISION
**Emotional objective:** Ambition & permanence — culminates in a flying school. Join early, climb together.

**Headlines (A recommended):**
- A: **This is only the climb. The summit is a flying school.**
- B: We're not building a course. We're building an academy.
- C: The runway ahead.

**Supporting copy:**
> What begins as preparation will become a place. A flying school built on the same uncompromising standard — where ground training, mentorship, and flight come together under one banner.
>
> We are building the institution we wish had existed. Those who join us now climb with us.

**CTA:** Be part of what's next (soft, leads into Final CTA) — or none.

**Desktop:** Full-viewport. Brighter horizon image bg. Headline (Display L) center-left. Two-paragraph copy block (max 55ch). Gold date-stamp label "ON THE HORIZON — FLYING SCHOOL, [YEAR]". Max negative space.
**Mobile:** Portrait climbing visual. Headline (L/32) stacked, copy below, date-stamp beneath.
**Grid:** content cols 1–7 (left) or 3–10 (center); 4-col mobile.
**Spacing:** headline→copy 32px; copy→date-stamp 24px.
**Hierarchy:** BG image · light-glow overlay · Headline · Copy (2 paras) · Date-stamp chip.
**Visuals:** Climbing aircraft / sunrise horizon. Upper gold glow gradient. Date-stamp chip: gold border, Eyebrow text. Optional faint completing flight-path arc into horizon.
**Motion:** Headline fade-up. BG upward-drift parallax (climbing). Top gold glow intensifies on scroll. Mobile: drift → simple fade.

---

### SECTION 6 — FINAL CTA
**Emotional objective:** Arrival & invitation. Clear sky, open door. One action.

**Headlines (A recommended):**
- A: **Your flight path starts here.**
- B: Ready when you are.
- C: Take the first step toward the flight deck.

**Supporting copy:**
> Speak with an advisor about your path into aviation. We'll help you understand where you stand — and how to begin the climb.

**CTA:** Primary **Speak to an Advisor** · Secondary (quiet) **Or reach us on WhatsApp**.

**Desktop:** 100vh centered. Brightest clean-sky bg + localized dark overlay behind text. Headline (Display L) mid-frame, sub-copy (Body L `text/grey`) below, primary button centered below, WhatsApp text-link beneath. Vast air.
**Mobile:** Headline (L/32) centered upper-middle, copy below, full-width primary button (lower third), WhatsApp link beneath.
**Grid:** centered stack cols 4–9 desktop; 4-col mobile.
**Spacing:** headline→copy 24px; copy→button 40px; button→WhatsApp 16px.
**Hierarchy:** BG image · overlay · Headline · Sub-copy · Primary button · WhatsApp link.
**Visuals:** Takeoff/clear-sky image. Gold pill primary button. WhatsApp link = ghost text + icon.
**Motion:** Headline fade-up. Button breathing `glow/gold` loop (2s). Hover: fill→`gold-soft`, scale 1.04, 250ms. BG slow light drift.

---

## 4. IMAGE / VIDEO REFERENCE GUIDE

All imagery: dark-graded, cinematic, "captured" not stock. Mood refs: Rolls-Royce Aerospace films, Emirates brand films, Bombardier private-aviation reels, Jesko Jets wing imagery, Patek/Leica text-led manifesto pages.

| Section | Imagery |
|---|---|
| Hero | Cockpit dashboard glow at dawn; wing in layered cloud; runway centerline in morning haze |
| Why | Faint cirrus texture (low opacity); pilot's hands on throttle/checklist; attitude indicator close-up |
| Journey | Navigation/sectional chart arcs; flight-tracker route lines; custom line icons |
| Ecosystem | Dark uniform card headers: instrument panels, charts, jet bridge, mentor (from behind/profile) |
| Future Vision | Aircraft in climb against open sky; sunrise over runway/hangar; subtle campus render hint |
| Final CTA | Aircraft at rotation/takeoff; clear runway to horizon; high-altitude clear sky |

---

## 5. FIGMA DELIVERABLE CHECKLIST

- [ ] 6 desktop frames @ 1440px (Hero, Why, Journey, Ecosystem, Future Vision, Final CTA)
- [ ] 6 mobile frames @ 390px
- [ ] Animation state mocks: Hero (3 states), Journey flight-path (start/mid/end), Ecosystem card hover, CTA button hover
- [ ] Color + type styles set as Figma variables/styles per Design System
- [ ] Components: Button (primary/secondary/ghost), Card, Eyebrow label, Date-stamp chip, Nav, Scroll cue
- [ ] Imagery dark-graded uniformly; gold ≤5%
- [ ] Final-voice copy placed (above) — not lorem
- [ ] Min 50–60% negative space in Hero / Future Vision / Final CTA
- [ ] 2 revision rounds before sign-off

**Out of scope for this build:** nav menu logic, footer, course detail pages, enquiry form fields, login, any portal screen.

---

## 6. SUCCESS CRITERIA (prototype approval gate)
1. Reads as premium/serious/trustworthy/aspirational — unprompted.
2. Represents Upside Down Aviation, not a generic coaching brand.
3. Windows-scroll reveal concept lands without explanation.
4. Motion pacing approved (not fast/gimmicky).
5. Black/gold/white + type direction signed off.
6. Holds up on mobile.
7. Explicit written go-ahead to proceed to full design system + development.

**Failure signals (→ revision, not rebuild):** "looks like everyone else," "feels cheap," "too busy," "doesn't feel like aviation."

---

*End of handover. Build top-to-bottom: Design System → Motion System → Sections in order. Everything needed to begin Figma screens (and later, development) is contained above.*

---

## CHANGELOG
- **2026-06-04** — Removed takeoff intro (temporarily — `IntroPreloader`+`CustomCursor` unmounted from layout, imports dropped; re-add later). Wired light-homepage nav to real anchors: NAV = Programs(#programs) · Journey(#journey) · Standards(#standards) · Contact(#contact); added matching section ids + `scroll-mt-24`. Secondary links now resolve: "Discover it"→#journey, "Know more"→/enquire, CTAs→/enquire + WhatsApp, footer→/privacy /terms /Instagram. Verified: intro absent on load, all 4 nav targets exist. Clean build. (Note: /enquire is still the OLD dark-themed page — restyle to light later for consistency.)
- **2026-06-04** — **FULL HOMEPAGE REDESIGN to Halo light-fintech direction** (per team reference data; user rejected the dark navy/gold theme). `page.tsx` rebuilt from scratch: light `#F5F5F5` bg, black text, Halo structure — absolute nav (logo + links + black "Speak to an Advisor" pill); h-screen hero with rounded sky-gradient card, "Train. Prepare. Fly." + black arrow-pill + aviation brand marquee; "Meet Upside Down Aviation" + bento program cards (navy/purple); "Aligned with the industry" marquee row; Journey navy media card (7-stage Dream→Flight Deck list); navy CTA card + gold pill; light footer. Aviation content + motto kept; numbers/copy illustrative. PillButton gained `black` variant. **Old dark sections (Hero/WhyWeExist/AviationJourney/AviationEcosystem/FutureVision/FinalCta/Navbar/Footer) are NO LONGER used by `page.tsx`** (kept on disk, orphaned). NOTE: layout still mounts IntroPreloader (dark takeoff)+CustomCursor+SmoothScroll over the light page — decide whether to keep/restyle. Clean build. If the dark Aura direction was wanted instead, flip from here.
- **2026-06-04** — **Premium restructure pass (Halo/Aura-inspired flow, aviation identity kept).** Added: `.liquid-glass` + `.marquee-track` utilities (globals.css, gold/navy-adapted); `PillButton` (pill + arrow-in-circle, Halo/Aura pattern) → wired into Hero + Final CTA; `TrustedMarquee` section ("Aligned with the industry" — infinite aviation-name logo-cloud: DGCA/IndiGo/Air India/Akasa/Vistara/ICAO/IATA/GMR in varied type) placed after Hero; ecosystem cards now use `liquid-glass`. Reduced-motion safe (marquee pauses). Clean build, verified. NEXT (proposed, not yet built): Student-Portal **product mockup** section (Aura-inbox equivalent — dashboard/schedule/attendance/progress in glass chrome), **testimonials** grid, **bento** card sizing for ecosystem.
- **2026-06-04** — Authored **STUDENT_PORTAL_V1_SPEC.md** — complete product spec (supersedes the earlier lite `STUDENT_PORTAL_SPEC.md`): architecture, RBAC (Super Admin/Admin/Student, invite-only Google OAuth), student dashboard UI, class mgmt, Google Calendar sync architecture, attendance/announcements/progress modules, extensible profile, full admin panel, complete Supabase SQL schema (11 table groups + RLS + views), API design (server actions/route handlers/services), security (RLS/audit/rate-limit/DPDP), mobile-first design, V2–V4 roadmap. Spec only — Phase 2 build.
- **2026-06-04** — **Removed Aviation Navigation Sphere; replaced with a clear horizontal Journey timeline.** Sphere (orbit paths, floating labels, circular concept) fully removed from the homepage. Journey section rebuilt (`AviationJourney.tsx`) as a single instantly-readable **horizontal timeline: Dream→Learning→Training→Examination→Mentorship→Career→Flight Deck** — gold line draws, aircraft (side-view) rides it on scroll (scrubbed, **reverses** verified: left 505→960px down, →506 up), nearest milestone glows, large display headline, minimal noise. **Mobile = vertical timeline** (toggleActions reverse). Ecosystem section reverted to clean cards (sphere removed there). Canonical 7-stage vocabulary now used everywhere (kills the earlier 5/6/7 mismatch). `AviationSphere.tsx` + `aviation-sphere.json` now orphaned (kept on disk, not imported) — prunable. Clean build.
- **2026-06-04** — **Fixed intro perspective mismatch (Option A: top-down takeoff).** The intro mixed a side-view jet with a top-down runway (plane perpendicular to runway). Replaced the IntroPreloader aircraft with a **top-down jet (nose pointing up the centerline)**, positioned at the runway threshold (bottom-center). New motion: appears at threshold → accelerates UP the centerline (`y 0→-180→-380→-560`) while **scaling down** (1→0.82→0.55→0.35, receding toward the horizon/vanishing point) with a slight `-4°` bank, then lifts into the rising clouds → sunrise → hero. Perspective is now consistent (top-down plane on top-down runway, travelling along the centerline). Centerline dashes stream toward viewer to sell speed. Clean build. (Intro frame is too brief for the preview screenshot tool to freeze; verified via typecheck + DOM during run.)
- **2026-06-04** — **Apple/Handshake motion-craft pass.** (1) Silkier scroll: Lenis `lerp 0.075`, `wheelMultiplier 0.9`, `touchMultiplier 1.5`. (2) Reveals upgraded to Apple-signature **rise + de-blur + fade** (`blur(8px)→0`, y 28→0, 0.9s ease-out), reduced-motion renders static. (3) Cinematic **hero recede**: content lifts/fades/blurs on scroll-out (scrubbed, reversible) so the hero hands off to the next section like Apple. All reduced-motion/?static safe; verified (hero content opacity 0.29 + blur at 0.5vh). Clean build.
- **2026-06-04** — **Intro-replay + logo + scroll-reverse fixes.** (1) IntroPreloader now plays on first visit AND **every hard refresh** (switched gate from localStorage to in-memory module flag `introPlayed`; resets on reload, persists across client nav). The old localStorage gate (polluted by testing) was why the takeoff never replayed. (2) Wired the **brand logo** (`/images/logo.png`) into Navbar + intro brand moment (placeholder present — replace the file with the supplied logo). (3) Verified scroll-reverse works: section reveals (`once:false`) and CTA flight are scrubbed — CTA plane flies forward on scroll-down (x 268→1026) and retreats on scroll-up (x→679). CTA path narrowed to 88%/max-w-4xl so the aircraft stays on-screen. Clean `.next` rebuild (prior PageNotFound errors were dev/build contention — stop dev before `next build`). NOTE the gold boxes in the client's CTA screenshot were just text ::selection highlight, not a bug.
- **2026-06-04** — **Final polish batch (Handshake pass + brand rebalance).** Whitespace: section padding 10→12.5rem. Hero: aircraft lowered+shrunk to clear nav (top-22/24%, w-50%), ghost wordmark faded (white/0.025) & repositioned off H1, jet float softened (14→8). Motion softened globally: Reveal now reverses on scroll-up (`once:false`), ecosystem cards reverse too, card hover lift 8→5, sphere float 16→8 (one calm motion). Sphere waypoint labels enlarged to 22px. CTA: flight-path now on-screen (w-88%/max-w-4xl, opacity 50%) so the aircraft arrival is visible and frames the text instead of crossing it. Clean tsc+build, Hero verified. REMAINING BLOCKERS (client-supplied assets only): real hero/vision/cta photos, brand logo file, real phone/email/WhatsApp in constants.ts — cannot fabricate. Color rebalance toward "education vs charter" left as a deliberate careful pass (not blind-changed) — whitespace+softer motion already shift the feel toward "considered institution."
- **2026-06-04** — **Fixed CTA aircraft orientation.** The flight-path `.plane-glyph` art points UP (`M0 -16`), so `autoRotate:true` left it 90° off the tangent (plane vertical while path horizontal). Fix: `motionPath.autoRotate: 90` (offset compensates the up-pointing nose → nose now tracks the path tangent: up-right ascending, down-right descending). Path draw + plane travel given identical `duration:1` so the path draws AS the plane flies; CTA content reveal moved to position 1.0 (after arrival); scrub keeps reverse-on-scroll-up. Verified: heading rotates dynamically along path (54°→135° element-x = nose on tangent). Audited other path-followers: sphere `#orbit-plane` is correct (its art has an inner `rotate(90)` pre-aligning nose to +x, so `autoRotate:true` is right there); intro has no path-following aircraft. Clean build.
- **2026-06-04** — **Clouds + Sphere + CTA flight redesign.** Clouds: Hero cloud-layer → opacity 0.08, `-z-[15]` (behind all content, ambience only); sphere internal clouds dimmed to 0.35. Sphere (`AviationSphere`): removed ALL decorative paths/rings/contrail (`display:none` via gsap.set), rerouted the ONE aircraft to follow `#journey-path` (Dream→Flight Deck) via MotionPath, enlarged container to max-w-1180/aspect-7-6 ×1.05 = primary focal point. CTA (`FinalCta`): rewrote to a **scrubbed** ScrollTrigger timeline — path draws + aircraft flies it + CTA reveals after arrival, **reverses on scroll-up**. Verified on a CLEAN dev server (normal mode): hero jet floats, sphere plane travels journey path, decoratives gone, CTA aircraft arrives. CAVEAT: heavy HMR churn during rapid edits can revert GSAP contexts in dev — always confirm on a fresh `next dev`, not after many Fast Refreshes.
- **2026-06-04** — **Fixed "no animation works" bug.** Root cause: ScrollTrigger positions were computed while the IntroPreloader locked `body` scroll (and before fonts/images settled), so every scroll-driven animation got bad start/end and jumped straight to its end state (ambient loops like the sphere still ran, masking it). Fix: `ScrollTrigger.refresh()` (a) in IntroPreloader `finish()` after overflow unlocks, (b) in SmoothScroll on +300ms / window `load` / `fonts.ready`. Verified live in NORMAL mode: Journey milestones now reveal progressively with scroll (0/0/0 → 1/1/1/0/0/0 → all). NOTE: my earlier "verified" captures were all in `?static` which disables GSAP — must test normal mode to confirm animations.
- **2026-06-04** — **Homepage hierarchy fix (message-first).** Moved Aviation Navigation Sphere OUT of Hero → into the Ecosystem section as its centerpiece (users learn the brand before the ecosystem viz). Hero is now brand/value-led: eyebrow + "Train. Prepare. Fly." + value-prop sub + 3 career-outcome points + CTA, with the **aircraft (aircraft-side-view) as the primary supporting visual** (float + engine-spin). Hero content `hero.points`/`hero.eyebrow` added. Both verified live (captured). Clean build.
- **2026-06-04** — **Replaced 3D Earth globe with the Aviation Navigation Sphere** (`AviationSphere.tsx`, SVG from files3 bundled to `aviation-sphere.json`): navy orb + isometric airport diorama, 7 waypoints (Dream→Flight Deck), orbiting jet (MotionPath), route illumination, rings, cloud drift, waypoint activation; reduced-motion/?static safe; Hero centerpiece at 95vh. **Removed Three.js from homepage bundle** (shared JS 103→102KB, fixes WebGL screenshot issue, mobile-perf win). Captured live — renders premium, zero errors. Added `STUDENT_PORTAL_SPEC.md` (Supabase + Google OAuth + Calendar) and `FINAL_REVIEW.md` (brutally honest audit + P1/P2/P3 action plan). Demo readiness ~70% — top gaps: placeholder bg images + fake contact info. NOTE: `three`/`@react-three/*` deps now unused (Globe.tsx orphaned) — can be pruned.
- **2026-06-04** — Shipped **IntroPreloader** (clean, self-contained 0→8s GSAP timeline + Framer exit, inline SVG placeholders, localStorage gate `uda-intro-seen`, skip @2s, 9.5s fail-safe, reduced-motion skip) and wired it as the active intro in layout (CinematicIntro kept as the asset-rich alternative). **Working browser preview confirmed: Intro + Hero + Journey all render** — Hero composites realistic Earth globe + orbiting plane + cloud-layer SVG + ghost wordmark + CTAs; Journey shows full career-path with 6 milestone badges. Clean tsc + build. DEPLOY: build is deploy-ready (Vercel); pending client hosting account (agency must not own it).
- **2026-06-04** — Replaced Framer takeoff intro with **CinematicIntro** (GSAP + SVG opening sequence, spec: `INTRO_SEQUENCE_SPEC.md`). Uses the opening-pack (`intro-svgs.json`, window-frame excluded per brief): black → brand → runway emerges → jet appears → accelerate → rotate/takeoff + gear retract → cloud breakthrough → contrail draw → sunrise → contrail→flight-path UI → continuous handoff to live Hero. Time-based timeline ~6.9s, skip after 2s, **9s fail-safe** (rAF throttles on backgrounded tabs — overlay can never trap user). Gating: module flag = plays on first visit + hard refresh, NOT on client nav (mounted in root layout); localStorage marker written but not the gate (documented tension). No video/Lottie/3D. Generated 4 new aircraft SVGs in `generated_svgs/` (top, bank L/R, climbing) matching pack style. DOM-verified all stage hooks (#runway-surface, #jet, #landing-gear, #sun, #contrail-core, clouds), completes + restores scroll + reveals hero, zero errors, clean build (220KB). Old `IntroSequence.tsx` removed.
- **2026-06-04** — Integrated the 10-asset SVG illustration system into scroll storytelling (spec: `SVG_ANIMATION_SPEC.md`). New infra: `svg/svgs.json` (bundled SVGs), `svg/InlineSVG.tsx` (inlines markup so GSAP targets hooks), `motion/gsap.ts` (ScrollTrigger + MotionPathPlugin reg + `setupDraw` = free drawSVG via strokeDashoffset). Wired: Hero (cloud-layer parallax), Why (nav-chart compass rotate + instruments needles online + airways draw), **Journey = pinned hero animation** (career-journey `#journey-path` scrub-draw + 6 milestone sequence), Future Vision (campus rise + tower-beacon pulse), Final CTA (flight-path draws into underline + plane-glyph motionPath fly-off). All section animations scoped via `gsap.context`, skip on reduced-motion + `?static`; Journey unpinned on mobile. DOM-verified all hooks present, zero console errors, clean tsc + build (home 221KB). Source SVGs in `_incoming_svgs/`. NOTE: Ecosystem islands asset wasn't in the delivered zip — waypoint-nodes/flight-path are the documented stand-ins (hooks ready, not yet wired).
- **2026-06-04** — Globe v3 + Intro. Globe now a **realistic lit Earth** (true-colour map + normal map for relief, blue atmosphere rim) — fixed the "black moon" look (removed over-darkening shader, raised lights). Replaced dot markers with a **low-poly airplane orbiting the globe** along a tilted flight path (`OrbitingPlane`), plus 2 faint decorative rings. Added **`IntroSequence`** — cinematic takeoff storytelling reveal (black → brand line → plane accelerates down a runway line and lifts off → curtain lifts to reveal site). Plays once/session, reduced-motion-skips, **skippable** via click/scroll/key/Skip button (fail-safe so the opaque overlay can never trap the user). Realistic-earth verified via screenshot. Earth + normal textures still CDN-loaded → self-host to `/textures/` for production. Build clean (202KB).
- **2026-06-04** — Globe v2: replaced abstract dot-sphere with a **realistic textured Earth** (graphite-desaturated via shader onBeforeCompile) + thin **white orbital rings** with traveling markers + gold atmosphere rim — to match the Jesko reference. Added Suspense boundary for the texture; `frameloop="demand"` under `?static` for QA capture. **Earth texture currently loads from a GitHub CDN (`raw.githubusercontent.com/.../earth_atmos_2048.jpg`) — must be self-hosted to `/textures/` for production**, and ideally swapped for a darker/greyscale earth map for the exact Jesko tone. Hero `<video>` removed (was 404-looping) → `<Image>` poster bg until `/video/hero.mp4` is added. NOTE: the embedded preview screenshot tool cannot capture this heavier WebGL frame; verify the globe live at localhost:3000.
- **2026-06-04** — Upgraded to showpiece motion to match Jesko reference. Added Three.js/react-three-fiber/drei. New: `three/Globe` (dot-matrix 3D globe + orbiting flight arcs with traveling nodes, auto-rotating, dynamic-imported ssr:false), `ui/GhostWord` (oversized scroll-drifting background wordmark), `motion/CustomCursor` (trailing gold cursor ring, touch/reduced-motion aware), `motion/Magnetic` (cursor-pull wrapper for CTAs). Hero rebuilt: video bg (poster fallback) + ghost word + globe + multi-layer parallax + magnetic CTA. Ghost words added to Why/Ecosystem. Build verified clean (home 202KB First Load; Three.js code-split). Add `/video/hero.mp4` for cinematic loop (poster shows until then).
- **2026-06-04** — Dev server verified rendering; captured all 6 sections (mobile). Added `?static` query-param escape hatch in `SmoothScroll` + `useGSAP` that disables Lenis/GSAP pin for reliable screenshotting & QA. Display font is Space Grotesk stand-in until Clash Display is added. Placeholder images in `public/images` (replace before launch).
- **2026-06-04** — Generated full production codebase (Next.js 15.5 App Router + TS + Tailwind + GSAP + Framer + Lenis + Lucide). Build verified: clean `tsc --noEmit` + `next build` (10 routes, home SSG ~200KB). Codebase map in `HANDOFF.md`. Display font uses Space Grotesk stand-in (swap to Clash Display via note in `layout.tsx`). Pre-launch stubs tracked in HANDOFF §12.
- **2026-06-04** — Added companion `frontend_build_spec.md` (tech stack: Next.js App Router + TS + Tailwind + GSAP + Framer Motion + Lenis; component library, animation architecture, folder/route/asset/SEO/performance/a11y structure, global nav/footer/contact/WhatsApp/inquiry flow, Figma→Launch roadmap).
- **2026-06-04** — Initial handover created (project context, design system, motion system, 6 section specs with final copy, image refs, Figma checklist, success criteria).
