"use client";

import { finalCta } from "@/content/sections";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TypeText } from "@/components/motion/TypeText";

export function FinalCta() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-surface py-section">
      <div className="section-container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <TypeText as="h2" text={finalCta.headline} speed={32} className="type-heading-lg text-bone-white" />
          <p className="type-body mx-auto mt-6 max-w-md text-slate">{finalCta.sub}</p>
          <p className="type-body-sm mx-auto mt-4 max-w-md text-accent/90">{finalCta.parentsNote}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/enquire" variant="primary" size="lg">
              {finalCta.primary}
            </Button>
            <Button href="#programs" variant="ghost" size="lg">
              {finalCta.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
