import { PageHeader, CommandGrid, CommandPanel } from "@/components/portal/CommandPanel";
import { ProgressBar } from "@/components/ui/Progress";

export default function AdminAnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Attendance trends, engagement, and program performance." />
      <CommandGrid>
        <CommandPanel title="Attendance trend">
          <ProgressBar value={91} label="30-day average" variant="accent" />
        </CommandPanel>
        <CommandPanel title="Engagement">
          <ProgressBar value={78} label="Portal active rate" variant="accent" />
        </CommandPanel>
        <CommandPanel title="Program performance">
          <ul className="space-y-2 type-body-sm text-slate">
            <li>DGCA Ground Training — 68% avg progress</li>
            <li>Examination Intensive — 82% avg progress</li>
          </ul>
        </CommandPanel>
      </CommandGrid>
    </>
  );
}
