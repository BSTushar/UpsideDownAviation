"use client";

import { mission } from "@/content/sections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function WhyAviation() {
  return (
    <section id="why" className="relative scroll-mt-24 bg-void py-section">
      <div className="absolute inset-0 bg-sky-radial opacity-15" aria-hidden />

      <div className="section-container relative">
        <Reveal className="mx-auto max-w-3xl">
          <SectionHeader eyebrow={mission.eyebrow} headline={mission.headline} />
        </Reveal>

        <Stagger className="mx-auto mt-10 flex max-w-3xl flex-col gap-6">
          {mission.body.map((paragraph, i) => (
            <StaggerItem key={i}>
              <p className="type-body max-w-prose text-slate">{paragraph}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-card border border-accent/25 bg-surface/70 p-6">
            <p className="type-body-sm font-semibold text-accent">{mission.parentsCallout.title}</p>
            <p className="mt-2 type-body-sm text-slate">{mission.parentsCallout.body}</p>
          </div>
        </Reveal>

        <Stagger className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          {mission.points.map((point) => (
            <StaggerItem key={point.title}>
              <div className="h-full rounded-card border border-graphite bg-surface/60 p-5">
                <p className="type-body-sm font-semibold text-bone-white">{point.title}</p>
                <p className="mt-1.5 type-body-sm text-slate">{point.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
