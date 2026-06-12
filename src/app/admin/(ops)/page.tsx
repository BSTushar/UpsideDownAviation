import { PageHeader, CommandGrid, CommandPanel } from "@/components/portal/CommandPanel";
import { Badge } from "@/components/ui/Badge";

const kpis = [
  { label: "Active students", value: "48", delta: "+3 this month" },
  { label: "Active batches", value: "4", delta: "B-05 to B-08" },
  { label: "Avg attendance", value: "91%", delta: "Last 30 days" },
  { label: "Classes today", value: "6", delta: "2 online · 4 offline" },
];

const activity = [
  { time: "10:32", text: "Attendance marked — Technical General, B-07" },
  { time: "09:15", text: "Announcement published — DGCA mock exam" },
  { time: "Yesterday", text: "New student invited — Meera Kapoor" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader title="Operations Overview" description="At-a-glance metrics across programs and batches." />

      <CommandGrid className="mb-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <CommandPanel key={k.label}>
            <p className="type-caption text-plum">{k.label}</p>
            <p className="type-heading-sm mt-1 text-bone-white">{k.value}</p>
            <p className="type-body-sm text-slate">{k.delta}</p>
          </CommandPanel>
        ))}
      </CommandGrid>

      <CommandGrid className="md:grid-cols-2">
        <CommandPanel title="Recent activity">
          <ul className="space-y-3">
            {activity.map((a) => (
              <li key={a.text} className="flex gap-3 border-b border-graphite pb-3 last:border-0">
                <span className="type-mono-label text-plum">{a.time}</span>
                <span className="type-body-sm text-slate">{a.text}</span>
              </li>
            ))}
          </ul>
        </CommandPanel>
        <CommandPanel title="Pending tasks">
          <ul className="space-y-2 type-body-sm text-slate">
            <li className="flex justify-between"><span>Mark attendance — Met B-06</span><Badge variant="accent">Today</Badge></li>
            <li className="flex justify-between"><span>Review mentor notes — 2 pending</span><Badge variant="outline">Open</Badge></li>
            <li className="flex justify-between"><span>Batch B-08 schedule draft</span><Badge variant="coming-soon">Draft</Badge></li>
          </ul>
        </CommandPanel>
      </CommandGrid>
    </>
  );
}
