"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { vision } from "@/content/sections";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TypeText } from "@/components/motion/TypeText";

export function FutureVision() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="vision" className="relative scroll-mt-24 overflow-hidden py-section">
      <div className="absolute inset-0 bg-void">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] to-void" aria-hidden />
        {!imgError && (
          <Image
            src="/images/vision.jpg"
            alt=""
            fill
            className="object-cover opacity-25 mix-blend-luminosity"
            sizes="100vw"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-transparent" />
        <div className="absolute inset-0 bg-sky-radial opacity-30" />
      </div>

      <div className="section-container relative">
        <Reveal className="max-w-2xl">
          <Badge variant="accent" className="mb-6">
            {vision.stamp}
          </Badge>

          <TypeText as="h2" text={vision.headline} speed={26} className="type-heading-lg text-bone-white" />

          <Stagger className="mb-10 mt-8 flex flex-col gap-6">
            {vision.body.map((paragraph, i) => (
              <StaggerItem key={i}>
                <p className="type-body max-w-prose text-slate">{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <ol className="flex flex-col gap-3 border-t border-graphite pt-8">
            {vision.phases.map((phase, i) => (
              <motion.li
                key={phase}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="type-mono-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className={cnPhase(i)}>{phase}</span>
              </motion.li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function cnPhase(index: number) {
  const base = "type-body-sm transition-colors duration-standard";
  if (index === 0) return `${base} text-bone-white`;
  if (index === 3) return `${base} text-accent`;
  return `${base} text-slate`;
}
