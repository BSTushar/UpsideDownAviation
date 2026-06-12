"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/content/sections";
import { cn } from "@/lib/cn";
import { Card, CardNumber, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

function enquireHref(interest: string) {
  return `/enquire?interest=${encodeURIComponent(interest)}`;
}

const ctaBase =
  "mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 type-body-sm font-semibold transition-colors duration-standard";

export function Programs() {
  return (
    <section id="programs" className="scroll-mt-24 bg-surface py-section">
      <div className="section-container">
        <Reveal className="mb-16">
          <SectionHeader eyebrow={programs.eyebrow} headline={programs.headline} sub={programs.sub} />
        </Reveal>

        <Stagger className="grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.cards.map((card) => {
            const Icon = card.icon;

            return (
              <StaggerItem key={card.n} className="h-full">
                <Card
                  variant="default"
                  className={cn(
                    "interactive-surface group relative flex h-full min-h-[22rem] flex-col overflow-hidden bg-[#081827] p-card shadow-[0_20px_60px_rgba(0,0,0,0.18)]",
                    card.comingSoon && "border-dashed"
                  )}
                  as="article"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-accent/70 opacity-0 transition-opacity duration-standard group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-3">
                    <CardNumber className="text-accent/30">{card.n}</CardNumber>
                    {card.comingSoon && <Badge variant="coming-soon">Coming soon</Badge>}
                  </div>

                  <div className="mt-4 flex flex-1 flex-col">
                    <Icon
                      className="mb-4 h-7 w-7 shrink-0 text-accent transition-transform duration-standard group-hover:-translate-y-1 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className="mt-3 text-bone-white/75">{card.desc}</CardDescription>
                    <p className="mt-3 type-body-sm text-accent/90">{card.outcome}</p>
                    <p className="mt-1 type-caption text-slate normal-case tracking-normal">{card.audience}</p>

                    {!card.comingSoon ? (
                      <Link
                        href={enquireHref(card.interest)}
                        className={cn(
                          ctaBase,
                          "border-accent/35 bg-accent/8 text-accent hover:border-accent/55 hover:bg-accent/14"
                        )}
                      >
                        {card.cta}
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-standard group-hover:translate-x-0.5" strokeWidth={1.5} />
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          ctaBase,
                          "border-graphite bg-void/40 text-bone-white/70"
                        )}
                      >
                        {card.cta}
                      </span>
                    )}
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
