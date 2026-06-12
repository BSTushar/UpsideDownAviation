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

export function Programs() {
  return (
    <section id="programs" className="scroll-mt-24 bg-surface py-section">
      <div className="section-container">
        <Reveal className="mb-16">
          <SectionHeader eyebrow={programs.eyebrow} headline={programs.headline} sub={programs.sub} />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.cards.map((card) => {
            const Icon = card.icon;

            return (
              <StaggerItem key={card.n}>
                <Card
                  variant="default"
                  className={cn(
                    "interactive-surface group relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-[#081827] shadow-[0_20px_60px_rgba(0,0,0,0.18)]",
                    card.comingSoon && "border-dashed"
                  )}
                  as="article"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-accent/70 opacity-0 transition-opacity duration-standard group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <CardNumber className="text-accent/30">{card.n}</CardNumber>
                    {card.comingSoon && <Badge variant="coming-soon">Coming soon</Badge>}
                  </div>
                  <div>
                    <Icon className="mb-4 h-7 w-7 text-accent transition-transform duration-standard group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.5} />
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className="mt-3 text-bone-white/75">{card.desc}</CardDescription>
                    <p className="mt-3 type-body-sm text-accent/90">{card.outcome}</p>
                    <p className="mt-1 type-caption text-slate normal-case tracking-normal">{card.audience}</p>
                    {!card.comingSoon && (
                      <Link
                        href={enquireHref(card.interest)}
                        className="mt-5 inline-flex items-center gap-2 type-body-sm font-semibold text-accent"
                      >
                        {card.cta}
                        <ArrowRight className="h-4 w-4 transition-transform duration-standard group-hover:translate-x-1" strokeWidth={1.5} />
                      </Link>
                    )}
                    {card.comingSoon && (
                      <div className="mt-5 inline-flex items-center rounded-pill border border-graphite px-4 py-2 type-body-sm font-semibold text-bone-white/70">
                        {card.cta}
                      </div>
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
