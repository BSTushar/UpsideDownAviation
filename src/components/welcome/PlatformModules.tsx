"use client";

import { Plane, Clock, FileText, Briefcase, LayoutGrid } from "lucide-react";
import { platform } from "@/content/sections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";

const icons = [Plane, Clock, FileText, Briefcase, LayoutGrid] as const;

export function PlatformModules() {
  return (
    <section id="platform" className="relative scroll-mt-24 overflow-hidden border-y border-graphite bg-surface py-section">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="section-container relative">
        <Reveal className="mb-12">
          <SectionHeader
            eyebrow={platform.eyebrow}
            headline={platform.headline}
            sub={platform.sub}
            align="center"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platform.modules.map((mod, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={mod.id}>
                <article
                  className={cn(
                    "interactive-surface flex h-full flex-col rounded-card border border-graphite bg-void p-6",
                    mod.status === "roadmap" && "opacity-90"
                  )}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-nav border border-graphite bg-surface">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <Badge variant={mod.status === "active" ? "accent" : "coming-soon"}>
                      {mod.status === "active" ? "Available now" : "Coming soon"}
                    </Badge>
                  </div>

                  <h3 className="type-subheading text-bone-white">{mod.title}</h3>
                  <p className="mt-2 flex-1 type-body-sm text-slate">{mod.desc}</p>

                  <ul className="mt-4 flex flex-col gap-1.5 border-t border-graphite pt-4">
                    {mod.capabilities.map((cap) => (
                      <li key={cap} className="type-body-sm text-slate">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
