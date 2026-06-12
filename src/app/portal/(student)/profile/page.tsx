"use client";

import { PageHeader, CommandPanel, CommandGrid } from "@/components/portal/CommandPanel";
import { Label, Input } from "@/components/ui/FormElements";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { usePreviewUser } from "@/components/portal/PreviewProvider";

export default function ProfilePage() {
  const user = usePreviewUser();
  return (
    <>
      <PageHeader title="Profile" description="Your enrollment details and contact information." />

      <CommandGrid className="md:grid-cols-2">
        <CommandPanel title="Identity">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-aubergine type-heading text-iris">
              {user.name.charAt(0)}
            </span>
            <div>
              <h2 className="type-subheading text-bone-white">{user.name}</h2>
              <Badge variant="outline" className="mt-1">Student</Badge>
            </div>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user.email} disabled className="mt-1 opacity-70" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue={user.phone} className="mt-1" />
            </div>
            <Button variant="ghost" size="sm" className="self-start">
              Save changes
            </Button>
          </form>
        </CommandPanel>

        <CommandPanel title="Enrollment">
          <dl className="space-y-4">
            {[
              ["Program", user.program],
              ["Batch", user.batch],
              ["Enrolled", user.enrollmentDate],
              ["Email", user.email],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="type-caption text-slate">{label}</dt>
                <dd className="type-body-sm text-bone-white">{value}</dd>
              </div>
            ))}
          </dl>
        </CommandPanel>

        <CommandPanel title="Future records" className="md:col-span-2">
          <p className="type-body-sm text-slate">
            Coming as your journey progresses: DGCA results, flight hours, certifications, and medical records.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["DGCA Results", "Flight Hours", "Certifications", "Medical Records"].map((f) => (
              <Badge key={f} variant="coming-soon">{f}</Badge>
            ))}
          </ul>
        </CommandPanel>
      </CommandGrid>
    </>
  );
}
