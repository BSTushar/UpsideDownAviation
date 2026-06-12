"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { hero } from "@/content/sections";
import { SITE } from "@/lib/constants";
import { EASE, DURATION } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Navigation } from "@/components/layout/Navigation";
import { TypeText } from "@/components/motion/TypeText";

function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <div className="industrial-grid absolute inset-0 opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c2038] via-[#07111f] to-[#07111f]" aria-hidden />
      <div className="absolute inset-0 bg-horizon" />
      <div className="absolute inset-0 bg-sky-radial opacity-40" />
    </div>
  );
}

export function WelcomeScreen() {
  const bp = hero.boardingPass;

  return (
    <section id="welcome" className="relative min-h-[100svh] overflow-hidden bg-void">
      <Navigation />
      <HeroBackground />

      <div className="section-container relative z-10 flex min-h-[100svh] flex-col justify-center gap-10 py-28 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-24">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.12, ease: EASE }}
        >
          <motion.p
            className="type-caption text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.22, ease: EASE }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.p
            className="mt-2 type-body-sm font-medium text-bone-white/88"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.26, ease: EASE }}
          >
            {hero.brandLine}
          </motion.p>
          <motion.h1
            className="mt-4 type-display text-bone-white"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.3, ease: EASE }}
          >
            <TypeText text={hero.headline} speed={48} delay={500} />
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl type-body text-bone-white/78"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.4, ease: EASE }}
          >
            {hero.thesis}
          </motion.p>

          <motion.p
            className="mt-4 max-w-xl type-body-sm text-slate"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.46, ease: EASE }}
          >
            {hero.sub}
          </motion.p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {hero.points.map((point, index) => (
              <motion.li
                key={point}
                className="rounded-badge border border-accent/20 bg-surface px-3 py-1.5 type-body-sm text-bone-white/78"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.slow, delay: 0.48 + index * 0.06, ease: EASE }}
              >
                {point}
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-6 flex items-center gap-2 type-body-sm text-bone-white/74"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.64, ease: EASE }}
          >
            <MapPin className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
            <span>{SITE.location}</span>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.74, ease: EASE }}
          >
            <Button href="/enquire" variant="primary" size="lg">
              {hero.cta}
            </Button>
            <Button href="#programs" variant="ghost" size="lg">
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden w-full max-w-sm shrink-0 lg:block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.15, ease: EASE }}
        >
          <GlassPanel
            label="Your path"
            origin={bp.origin}
            destination={bp.destination}
            className="transition-transform duration-standard hover:-translate-y-1"
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="type-caption text-slate">Student</span>
                <p className="type-body-sm text-bone-white">{bp.passenger}</p>
              </div>
              <div>
                <span className="type-caption text-slate">Track</span>
                <p className="type-mono-label text-bone-white">{bp.class}</p>
              </div>
              <div>
                <span className="type-caption text-slate">Stage</span>
                <p className="type-mono-label text-accent">{bp.gate}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <Button href="#journey" variant="accent" fullWidth size="sm">
                {bp.cta}
              </Button>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      <a
        href="#programs"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-slate transition-colors duration-standard hover:text-accent"
      >
        <span className="type-caption">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
      </a>
    </section>
  );
}
