import { PageHeader, CommandPanel, CommandGrid } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";
import { mockMentor, formatClassTime } from "@/lib/portal/mock-data";

export default function MentorshipPage() {
  return (
    <>
      <PageHeader
        title="Mentorship"
        description="Your assigned mentor, session notes, and career guidance."
      />

      <CommandGrid className="md:grid-cols-2">
        <CommandPanel title="Assigned mentor">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-aubergine type-heading-sm text-iris">
              {mockMentor.name.charAt(0)}
            </span>
            <div>
              <h3 className="type-subheading text-bone-white">{mockMentor.name}</h3>
              <p className="type-body-sm text-slate">{mockMentor.title}</p>
              <a href={`mailto:${mockMentor.email}`} className="mt-2 block type-body-sm text-iris hover:underline">
                {mockMentor.email}
              </a>
            </div>
          </div>
          {mockMentor.nextSession && (
            <p className="mt-4 type-mono-label text-plum">
              Next session: {formatClassTime(mockMentor.nextSession)}
            </p>
          )}
          <Button variant="accent" size="sm" className="mt-4">
            Schedule session
          </Button>
        </CommandPanel>

        <CommandPanel title="Recent session note">
          <p className="type-body italic text-bone-white/90">&ldquo;{mockMentor.recentNote}&rdquo;</p>
          <p className="mt-4 type-body-sm text-slate">
            Career guidance focuses on DGCA licensing timelines, regional airline pathways, and examination strategy.
          </p>
        </CommandPanel>

        <CommandPanel title="Career guidance topics" className="md:col-span-2">
          <ul className="grid gap-2 sm:grid-cols-2 type-body-sm text-slate">
            <li>· DGCA examination strategy</li>
            <li>· Airline interview preparation</li>
            <li>· Licensing timeline planning</li>
            <li>· Industry networking</li>
          </ul>
        </CommandPanel>
      </CommandGrid>
    </>
  );
}
