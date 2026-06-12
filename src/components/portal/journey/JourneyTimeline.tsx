import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import type { JourneyStage, JourneyStageStatus } from "@/lib/portal/types";

const statusStyles: Record<JourneyStageStatus, string> = {
  complete: "border-iris/50 bg-iris/10",
  active: "border-iris bg-aubergine/40 shadow-iris-glow",
  upcoming: "border-graphite bg-void",
};

export function JourneyTimeline({ stages }: { stages: JourneyStage[] }) {
  return (
    <ol className="relative flex flex-col gap-0">
      {stages.map((stage, i) => (
        <li key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
          {i < stages.length - 1 && (
            <span
              className={cn(
                "absolute left-[15px] top-8 h-[calc(100%-16px)] w-px",
                stage.status === "complete" ? "bg-iris/60" : "bg-graphite"
              )}
            />
          )}
          <span
            className={cn(
              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 type-mono-label text-caption",
              statusStyles[stage.status],
              stage.status === "active" && "text-iris",
              stage.status === "complete" && "text-iris",
              stage.status === "upcoming" && "text-slate"
            )}
          >
            {stage.code}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="type-subheading text-bone-white">{stage.title}</h3>
              {stage.status === "active" && <Badge variant="accent">Current stage</Badge>}
              {stage.status === "complete" && <Badge variant="default">Complete</Badge>}
            </div>
            <p className="type-body-sm text-slate">{stage.description}</p>
            {stage.percent !== undefined && stage.percent > 0 && (
              <p className="mt-1 type-mono-label text-plum">{stage.percent}% complete</p>
            )}
            {stage.mentorNote && (
              <p className="mt-2 rounded-nav border border-graphite bg-cinder/30 p-3 type-body-sm text-bone-white/80">
                {stage.mentorNote}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function JourneyStageStrip({ stages }: { stages: JourneyStage[] }) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-2">
      {stages.map((s) => (
        <div
          key={s.id}
          className={cn(
            "flex min-w-[100px] flex-col items-center gap-1 rounded-nav border px-3 py-2",
            statusStyles[s.status]
          )}
        >
          <span className="type-mono-label text-caption text-plum">{s.code}</span>
          <span className="type-caption text-bone-white normal-case">{s.title}</span>
        </div>
      ))}
    </div>
  );
}
