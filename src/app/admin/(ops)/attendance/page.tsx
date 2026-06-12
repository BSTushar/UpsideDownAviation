import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";

export default function AdminAttendancePage() {
  return (
    <>
      <PageHeader title="Attendance" description="Mark and review attendance records." action={<Button variant="accent" size="sm">Bulk mark</Button>} />
      <CommandPanel title="Today's sessions">
        <p className="type-body-sm text-slate">Select a class from Classes to mark attendance for its batch roster.</p>
        <Button href="/admin/classes" variant="ghost" size="sm" className="mt-4">View classes</Button>
      </CommandPanel>
    </>
  );
}
