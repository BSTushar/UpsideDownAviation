"use client";

import { PageHeader, CommandGrid } from "@/components/portal/CommandPanel";
import {
  WelcomeCard,
  NextClassCard,
  UpcomingClassesList,
  AttendanceSummaryCard,
  AnnouncementsPreview,
  MentorMessageCard,
  QuickActions,
} from "@/components/portal/dashboard/DashboardWidgets";
import { JourneyStageStrip } from "@/components/portal/journey/JourneyTimeline";
import { usePreviewUser } from "@/components/portal/PreviewProvider";
import {
  mockJourney,
  mockNextClass,
  mockUpcomingClasses,
  mockAttendanceSummary,
  mockAnnouncements,
  mockMentor,
  computeOverallProgress,
  getActiveStage,
} from "@/lib/portal/mock-data";

export default function DashboardPage() {
  const user = usePreviewUser();
  const activeStage = getActiveStage(mockJourney);
  const progress = computeOverallProgress(mockJourney);

  return (
    <>
      <PageHeader
        title="Command Center"
        description="Where you are, what comes next, and what you need to do."
        dataTour="tour-page-header"
      />

      <div className="mb-6" data-tour="tour-journey-strip">
        <JourneyStageStrip stages={mockJourney} />
      </div>

      <CommandGrid>
        <WelcomeCard user={user} activeStage={activeStage} overallProgress={progress} />
        <NextClassCard session={mockNextClass} />
        <UpcomingClassesList sessions={mockUpcomingClasses} />
        <AttendanceSummaryCard
          percent={mockAttendanceSummary.percent}
          present={mockAttendanceSummary.present}
          absent={mockAttendanceSummary.absent}
        />
        <AnnouncementsPreview items={mockAnnouncements} />
        <MentorMessageCard note={mockMentor.recentNote!} mentorName={mockMentor.name} />
        <QuickActions />
      </CommandGrid>
    </>
  );
}
