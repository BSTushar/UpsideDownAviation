import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";
import { mockUpcomingClasses, formatClassTime } from "@/lib/portal/mock-data";

export default function AdminClassesPage() {
  return (
    <>
      <PageHeader title="Classes" description="Sessions, meeting links, and instructors." action={<Button variant="accent" size="sm">Schedule class</Button>} />
      <ul className="flex flex-col gap-3">
        {mockUpcomingClasses.map((c) => (
          <li key={c.id}>
            <CommandPanel>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="type-subheading text-bone-white">{c.title}</h3>
                  <p className="type-body-sm text-slate">{c.instructor} · {formatClassTime(c.startsAt)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Attendance</Button>
                </div>
              </div>
            </CommandPanel>
          </li>
        ))}
      </ul>
    </>
  );
}
