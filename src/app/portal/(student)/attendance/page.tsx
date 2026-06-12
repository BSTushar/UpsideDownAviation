import { PageHeader, CommandGrid, CommandPanel } from "@/components/portal/CommandPanel";
import { ProgressRing, ProgressBar } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { mockAttendanceSummary, mockAttendanceHistory } from "@/lib/portal/mock-data";
import { cn } from "@/lib/cn";

export default function AttendancePage() {
  const { percent, present, absent, excused, total } = mockAttendanceSummary;

  return (
    <>
      <PageHeader
        title="Attendance"
        description="Your presence record across all scheduled classes."
      />

      <CommandGrid className="mb-6 md:grid-cols-3">
        <CommandPanel className="flex flex-col items-center text-center">
          <ProgressRing value={percent} size={80} />
          <p className="mt-4 type-heading-sm text-bone-white">{percent}%</p>
          <p className="type-caption text-slate">Overall attendance</p>
        </CommandPanel>
        <CommandPanel>
          <p className="type-caption text-plum">This month</p>
          <ProgressBar value={percent} variant="accent" className="mt-3" />
          <ul className="mt-4 space-y-2 type-body-sm text-slate">
            <li>Present: {present}</li>
            <li>Absent: {absent}</li>
            <li>Excused: {excused}</li>
            <li>Total sessions: {total}</li>
          </ul>
        </CommandPanel>
        <CommandPanel title="Target">
          <p className="type-body text-bone-white">Minimum 85% required for examination eligibility.</p>
          <Badge variant="accent" className="mt-3">On track</Badge>
        </CommandPanel>
      </CommandGrid>

      <CommandPanel title="Attendance history">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left">
            <thead>
              <tr className="border-b border-graphite type-caption text-slate">
                <th className="pb-3 pr-4 font-normal">Date</th>
                <th className="pb-3 pr-4 font-normal">Class</th>
                <th className="pb-3 pr-4 font-normal">Subject</th>
                <th className="pb-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAttendanceHistory.map((r) => (
                <tr key={r.id} className="border-b border-graphite/50">
                  <td className="py-3 pr-4 type-mono-label text-slate">{r.date}</td>
                  <td className="py-3 pr-4 type-body-sm text-bone-white">{r.classTitle}</td>
                  <td className="py-3 pr-4 type-body-sm text-slate">{r.subject}</td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "type-caption normal-case",
                        r.status === "present" && "text-iris",
                        r.status === "absent" && "text-slate",
                        r.status === "excused" && "text-plum"
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CommandPanel>
    </>
  );
}
