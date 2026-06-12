import Link from "next/link";
import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const students = [
  { name: "Arjun Mehta", email: "arjun.mehta@example.com", batch: "B-07", status: "active" },
  { name: "Meera Kapoor", email: "meera.k@example.com", batch: "B-07", status: "invited" },
  { name: "Rohan Das", email: "rohan.d@example.com", batch: "B-06", status: "active" },
];

export default function AdminStudentsPage() {
  return (
    <>
      <PageHeader
        title="Students"
        description="Manage profiles, enrollment, and batch assignment."
        action={<Button variant="accent" size="sm">Invite student</Button>}
      />
      <CommandPanel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-graphite type-caption text-slate">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Batch</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.email} className="border-b border-graphite/50">
                  <td className="py-3 pr-4 type-body-sm text-bone-white">{s.name}</td>
                  <td className="py-3 pr-4 type-body-sm text-slate">{s.email}</td>
                  <td className="py-3 pr-4 type-mono-label text-plum">{s.batch}</td>
                  <td className="py-3 pr-4"><Badge variant={s.status === "active" ? "accent" : "outline"}>{s.status}</Badge></td>
                  <td className="py-3"><Link href="#" className="type-body-sm text-iris hover:underline">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CommandPanel>
    </>
  );
}
