import { PageHeader, CommandPanel, CommandGrid } from "@/components/portal/CommandPanel";
import { ProgressBar } from "@/components/ui/Progress";
import { mockSubjects } from "@/lib/portal/mock-data";

export default function CourseProgressPage() {
  return (
    <>
      <PageHeader
        title="Course Progress"
        description="Subjects, modules, completion, and mentor feedback."
      />

      <CommandGrid>
        {mockSubjects.map((s) => (
          <CommandPanel key={s.id} title={s.name}>
            <p className="type-mono-label text-plum">
              {s.modulesComplete} / {s.modulesTotal} modules
            </p>
            <ProgressBar value={s.percent} variant="accent" className="mt-3" />
            {s.mentorFeedback && (
              <p className="mt-4 rounded-nav border border-graphite bg-cinder/20 p-3 type-body-sm text-bone-white/80">
                <span className="type-caption text-plum">Mentor feedback · </span>
                {s.mentorFeedback}
              </p>
            )}
            {s.upcomingTask && (
              <p className="mt-3 type-body-sm text-slate">
                <span className="text-plum">Next: </span>
                {s.upcomingTask}
              </p>
            )}
          </CommandPanel>
        ))}
      </CommandGrid>
    </>
  );
}
