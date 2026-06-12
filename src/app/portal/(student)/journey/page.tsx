import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { JourneyTimeline } from "@/components/portal/journey/JourneyTimeline";
import { mockJourney, getActiveStage, computeOverallProgress } from "@/lib/portal/mock-data";
import { ProgressBar } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";

export default function JourneyPage() {
  const active = getActiveStage(mockJourney);
  const overall = computeOverallProgress(mockJourney);

  return (
    <>
      <PageHeader
        title="My Journey"
        description="Dream → Learning → Training → Examination → Mentorship → Career → Flight Deck"
      />

      <CommandPanel className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="type-caption text-plum">Current altitude</span>
            <h2 className="type-heading-sm text-bone-white">{active.title}</h2>
            <p className="type-body-sm text-slate">{active.description}</p>
          </div>
          <Badge variant="accent">Stage {active.code}</Badge>
        </div>
        <ProgressBar value={overall} label="Overall journey progress" variant="accent" className="mt-4" />
      </CommandPanel>

      <CommandPanel title="Milestone timeline">
        <JourneyTimeline stages={mockJourney} />
      </CommandPanel>
    </>
  );
}
