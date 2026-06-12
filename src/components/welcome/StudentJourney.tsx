"use client";

import { journey } from "@/content/sections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function StudentJourney() {
  return (
    <section id="journey" className="scroll-mt-24 bg-void py-section">
      <div className="section-container">
        <Reveal className="mb-16">
          <SectionHeader
            eyebrow={journey.eyebrow}
            headline={journey.headline}
            sub={journey.sub}
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {journey.stages.map((stage, index) => (
            <StaggerItem key={stage.n}>
              <article className="interactive-surface group relative h-full min-h-[190px] overflow-hidden rounded-card border border-graphite bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
                <div className="absolute right-5 top-5 type-number-outline text-[3.25rem] text-accent/25 transition-all duration-standard group-hover:translate-y-1 group-hover:text-accent/40">
                  {stage.n}
                </div>
                <span className="type-caption text-accent">Stage {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 type-subheading text-bone-white">{stage.title}</h3>
                <p className="mt-3 type-body-sm text-bone-white/75">{stage.desc}</p>
                <p className="mt-2 type-caption text-accent/90 normal-case tracking-normal">{stage.detail}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
