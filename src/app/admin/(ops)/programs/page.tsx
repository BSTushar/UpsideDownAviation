import { PageHeader, CommandGrid, CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";

const programs = [
  { name: "DGCA Ground Training", batches: 3, stages: 7 },
  { name: "Examination Intensive", batches: 1, stages: 4 },
];

export default function AdminProgramsPage() {
  return (
    <>
      <PageHeader title="Programs" description="Aviation programs and curriculum structure." action={<Button variant="accent" size="sm">New program</Button>} />
      <CommandGrid>
        {programs.map((p) => (
          <CommandPanel key={p.name} title={p.name}>
            <p className="type-body-sm text-slate">{p.batches} active batches · {p.stages} journey stages</p>
            <Button variant="ghost" size="sm" className="mt-4">Edit curriculum</Button>
          </CommandPanel>
        ))}
      </CommandGrid>
    </>
  );
}
