"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CommandPanel } from "@/components/portal/CommandPanel";
import { PreviewNameGate } from "@/components/portal/PreviewNameGate";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { startPreviewSession } from "@/lib/portal/preview";
import { TypeText } from "@/components/motion/TypeText";
import { useLoading } from "@/components/motion/LoadingProvider";

export default function PortalLoginPage() {
  const router = useRouter();
  const { startLoading } = useLoading();
  const [showNameGate, setShowNameGate] = useState(false);

  const enterPreview = (name: string) => {
    startLoading();
    startPreviewSession(name);
    router.push("/portal/dashboard");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void p-6">
      <div className="absolute inset-0 bg-sky-radial opacity-40" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <span className="relative inline-block">
              <span className="brand-halo" aria-hidden />
              <Image
                src="/logo-full.png"
                alt="Upside Down Aviation"
                width={112}
                height={112}
                priority
                className="relative h-28 w-28 rounded-[28px] object-contain mix-blend-screen"
              />
            </span>
            <span className="type-subheading text-bone-white">{SITE.name}</span>
            <span className="type-caption text-accent">{SITE.tagline}</span>
          </Link>
          <div className="mt-4">
            <TypeText as="p" text="Student Portal" speed={55} delay={300} className="type-heading-sm text-bone-white" />
          </div>
          <p className="type-body-sm text-slate">For enrolled students only</p>
        </div>

        <CommandPanel>
          <p className="type-body text-slate">
            Access your schedule, progress, announcements, and mentorship — all in one place.
          </p>
          <Button variant="primary" fullWidth className="mt-6" disabled>
            Student login coming soon
          </Button>
          <p className="mt-4 text-center type-caption text-slate normal-case tracking-normal">
            Google sign-in and live student access are being connected. Enrolled students can contact their advisor for access updates.
          </p>

          <div className="my-6 flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-graphite" />
            <span className="type-caption text-slate">or</span>
            <span className="h-px flex-1 bg-graphite" />
          </div>

          <Button variant="ghost" fullWidth onClick={() => setShowNameGate(true)}>
            View the experience
          </Button>
          <p className="mt-3 text-center type-caption text-slate normal-case tracking-normal">
            Enter your name for a personalised walkthrough with sample student data.
          </p>
          <p className="mt-6 text-center">
            <Link href={`mailto:${SITE.email}`} className="type-body-sm text-accent hover:underline">
              {SITE.email}
            </Link>
          </p>
        </CommandPanel>

        <p className="mt-6 text-center">
          <Link href="/" className="type-body-sm text-slate hover:text-accent">
            ← Back to website
          </Link>
        </p>
      </div>

      {showNameGate && (
        <PreviewNameGate
          onSubmit={enterPreview}
          onCancel={() => setShowNameGate(false)}
        />
      )}
    </div>
  );
}
