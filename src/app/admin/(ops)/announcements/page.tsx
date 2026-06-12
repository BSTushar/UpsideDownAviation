import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockAnnouncements } from "@/lib/portal/mock-data";

export default function AdminAnnouncementsPage() {
  return (
    <>
      <PageHeader title="Announcements" description="Notices, attachments, and priorities." action={<Button variant="accent" size="sm">Create notice</Button>} />
      <ul className="flex flex-col gap-3">
        {mockAnnouncements.map((a) => (
          <li key={a.id}>
            <CommandPanel>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="type-subheading text-bone-white">{a.title}</h3>
                <Badge variant={a.priority === "urgent" ? "accent" : "outline"}>{a.priority}</Badge>
              </div>
              <p className="mt-2 type-body-sm text-slate">{a.excerpt}</p>
              <Button variant="ghost" size="sm" className="mt-3">Edit</Button>
            </CommandPanel>
          </li>
        ))}
      </ul>
    </>
  );
}
