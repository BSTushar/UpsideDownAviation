import { SITE } from "@/lib/constants";

type Props = {
  coords?: string | null;
};

export function PortalStatusBar({ coords }: Props) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-graphite bg-surface/95 backdrop-blur-sm md:left-64">
      <div className="flex items-center justify-center px-4 py-2 md:px-6">
        <span className="type-caption text-slate normal-case tracking-normal">
          {SITE.tagline}
        </span>
      </div>
    </footer>
  );
}
