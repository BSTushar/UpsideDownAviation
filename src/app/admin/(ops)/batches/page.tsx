import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const batches = [
  { id: "B-07", program: "DGCA Ground Training", students: 14, schedule: "Mon / Wed / Fri" },
  { id: "B-06", program: "DGCA Ground Training", students: 12, schedule: "Tue / Thu / Sat" },
];

export default function AdminBatchesPage() {
  return (
    <>
      <PageHeader title="Batches" description="Batch creation and scheduling." action={<Button variant="accent" size="sm">Create batch</Button>} />
      <ul className="flex flex-col gap-3">
        {batches.map((b) => (
          <li key={b.id}>
            <CommandPanel>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="type-mono-label text-iris">{b.id}</h3>
                    <Badge variant="outline">{b.program}</Badge>
                  </div>
                  <p className="mt-1 type-body-sm text-slate">{b.students} students · {b.schedule}</p>
                </div>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
            </CommandPanel>
          </li>
        ))}
      </ul>
    </>
  );
}
