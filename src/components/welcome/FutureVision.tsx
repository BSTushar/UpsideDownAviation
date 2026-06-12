"use client";

import { motion } from "framer-motion";
import { vision, type VisionPhase } from "@/content/sections";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TypeText } from "@/components/motion/TypeText";
import { cn } from "@/lib/cn";

const STATUS_LABEL: Record<VisionPhase["status"], string> = {
  now: "Today",
  next: "Next",
  future: "Future",
};

export function FutureVision() {
  return (
    <section id="vision" className="relative scroll-mt-24 overflow-hidden py-section">
      <div className="absolute inset-0 bg-void">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] to-void" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-transparent" />
        <div className="absolute inset-0 bg-sky-radial opacity-30" />
      </div>

      <div className="section-container relative">
        <Reveal className="max-w-3xl">
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

          <div className="border-t border-graphite pt-10">
            <p className="type-caption mb-6 text-accent">Growth timeline</p>
            <ol className="relative space-y-5 border-l-2 border-graphite pl-8">
              {vision.phases.map((phase, i) => (
                <motion.li
                  key={phase.label}
                  className="relative"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className={cn(
                      "absolute -left-[2.55rem] top-1 h-3.5 w-3.5 rounded-full border-2",
                      phase.status === "now"
                        ? "border-accent bg-accent shadow-[0_0_12px_rgba(212,175,122,0.45)]"
                        : "border-graphite bg-void"
                    )}
                    aria-hidden
                  />
                  <div className="rounded-card border border-graphite bg-surface/50 p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="type-mono-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <Badge variant={phase.status === "now" ? "accent" : "coming-soon"}>
                        {STATUS_LABEL[phase.status]}
                      </Badge>
                    </div>
                    <p className={cn("type-body-sm", phase.status === "now" ? "text-bone-white" : "text-slate")}>
                      {phase.label}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
