"use client";

import { useRouter } from "next/navigation";
import { usePreview } from "@/components/portal/PreviewProvider";
import { clearPreviewSession } from "@/lib/portal/preview";

/** Slim bar shown while the portal is being viewed in preview mode with sample data. */
export function DemoPreviewBanner() {
  const router = useRouter();
  const { isPreview, visitorName } = usePreview();

  if (!isPreview) return null;

  const first = visitorName?.split(" ")[0];

  const exit = () => {
    clearPreviewSession();
    router.push("/portal/login");
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-accent/25 bg-accent/10 px-4 py-2" data-tour="tour-preview-banner">
      <span className="type-caption text-accent">
        {first ? `Welcome, ${first} · ` : ""}Preview mode · sample student data
      </span>
      <button
        type="button"
        onClick={exit}
        className="type-caption text-slate underline-offset-2 transition-colors duration-200 hover:text-bone-white hover:underline"
      >
        Exit preview
      </button>
    </div>
  );
}
