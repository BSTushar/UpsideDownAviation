import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/Progress";
import { CommandPanel } from "../CommandPanel";
import type { ClassSession, JourneyStage, PortalUser } from "@/lib/portal/types";
import { formatClassTime, greeting } from "@/lib/portal/mock-data";

export function WelcomeCard({
  user,
  activeStage,
  overallProgress,
}: {
  user: PortalUser;
  activeStage: JourneyStage;
  overallProgress: number;
}) {
  return (
    <CommandPanel className="md:col-span-2" dataTour="tour-welcome">
      <p className="type-caption text-plum">{greeting()}</p>
      <h2 className="type-heading-sm mt-1 text-bone-white">{user.name}</h2>
      <p className="mt-2 type-body-sm text-slate">
        {user.program} · Batch {user.batch}
      </p>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="type-mono-label text-plum">Stage {activeStage.code}</span>
          <Badge variant="accent">{activeStage.title}</Badge>
        </div>
        <ProgressBar value={overallProgress} label="Journey progress" variant="accent" />
      </div>
    </CommandPanel>
  );
}

export function NextClassCard({ session }: { session: ClassSession }) {
  return (
    <CommandPanel title="Next class" dataTour="tour-next-class">
      <h3 className="type-subheading text-bone-white">{session.title}</h3>
      <p className="type-body-sm text-slate">{session.subject}</p>
      <p className="mt-3 type-mono-label text-plum">{formatClassTime(session.startsAt)}</p>
      <p className="type-body-sm text-slate">{session.instructor}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {session.canJoin && session.meetingLink ? (
          <Button href={session.meetingLink} variant="accent" size="sm">
            <Video className="h-4 w-4" strokeWidth={1.5} />
            Join class
          </Button>
        ) : (
          <Badge variant="outline">Opens 10 min before</Badge>
        )}
        <Button href={`/portal/schedule`} variant="ghost" size="sm">
          Schedule
        </Button>
      </div>
    </CommandPanel>
  );
}

export function UpcomingClassesList({ sessions }: { sessions: ClassSession[] }) {
  return (
    <CommandPanel
      title="Upcoming schedule"
      dataTour="tour-upcoming"
      action={
        <Link href="/portal/schedule" className="type-body-sm text-iris hover:underline">
          View all →
        </Link>
      }
    >
      <ul className="flex flex-col gap-3">
        {sessions.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-4 border-b border-graphite pb-3 last:border-0 last:pb-0">
            <div>
              <p className="type-body-sm font-medium text-bone-white">{s.title}</p>
              <p className="type-caption text-slate normal-case">{formatClassTime(s.startsAt)}</p>
            </div>
            {s.canJoin && s.meetingLink ? (
              <Button href={s.meetingLink} variant="ghost" size="sm">
                Join
              </Button>
            ) : (
              <span className="type-mono-label text-slate">{s.mode}</span>
            )}
          </li>
        ))}
      </ul>
    </CommandPanel>
  );
}

export function AttendanceSummaryCard({
  percent,
  present,
  absent,
}: {
  percent: number;
  present: number;
  absent: number;
}) {
  return (
    <CommandPanel
      title="Attendance"
      dataTour="tour-attendance"
      action={
        <Link href="/portal/attendance" className="type-body-sm text-iris hover:underline">
          History →
        </Link>
      }
    >
      <p className="type-display-light text-iris">{percent}%</p>
      <p className="mt-2 type-body-sm text-slate">
        Present {present} · Absent {absent}
      </p>
      <ProgressBar value={percent} className="mt-4" variant="accent" />
    </CommandPanel>
  );
}

export function AnnouncementsPreview({
  items,
}: {
  items: { id: string; title: string; priority: string; read: boolean }[];
}) {
  return (
    <CommandPanel
      title="Announcements"
      action={
        <Link href="/portal/announcements" className="type-body-sm text-iris hover:underline">
          All →
        </Link>
      }
    >
      <ul className="flex flex-col gap-3">
        {items.map((a) => (
          <li key={a.id}>
            <Link href={`/portal/announcements#${a.id}`} className="group flex items-start gap-2">
              {!a.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris" />}
              <span className={a.read ? "type-body-sm text-slate" : "type-body-sm text-bone-white"}>
                {a.title}
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </CommandPanel>
  );
}

export function MentorMessageCard({ note, mentorName }: { note: string; mentorName: string }) {
  return (
    <CommandPanel
      title="Mentor checkpoint"
      dataTour="tour-mentor"
      action={
        <Link href="/portal/mentorship" className="type-body-sm text-iris hover:underline">
          Mentorship →
        </Link>
      }
    >
      <p className="type-body-sm italic text-bone-white/90">&ldquo;{note}&rdquo;</p>
      <p className="mt-3 type-caption text-slate normal-case">— {mentorName}</p>
    </CommandPanel>
  );
}

export function QuickActions() {
  const actions = [
    { label: "My Journey", href: "/portal/journey" },
    { label: "Schedule", href: "/portal/schedule" },
    { label: "Mentorship", href: "/portal/mentorship" },
    { label: "Profile", href: "/portal/profile" },
  ];

  return (
    <CommandPanel title="Quick actions" className="col-span-full">
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <Button key={a.href} href={a.href} variant="ghost" size="sm">
            {a.label}
          </Button>
        ))}
      </div>
    </CommandPanel>
  );
}
