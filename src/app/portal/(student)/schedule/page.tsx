"use client";

import { useState } from "react";
import { Video, MapPin, CalendarPlus } from "lucide-react";
import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockUpcomingClasses, formatClassTime } from "@/lib/portal/mock-data";
import { cn } from "@/lib/cn";

export default function SchedulePage() {
  const [view, setView] = useState<"timeline" | "calendar">("timeline");

  return (
    <>
      <PageHeader
        title="Schedule"
        description="Upcoming classes, meeting links, and calendar sync."
        action={
          <div className="flex gap-2">
            <Button
              variant={view === "timeline" ? "accent" : "ghost"}
              size="sm"
              onClick={() => setView("timeline")}
            >
              Timeline
            </Button>
            <Button
              variant={view === "calendar" ? "accent" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
            >
              Calendar
            </Button>
          </div>
        }
      />

      {view === "calendar" ? (
        <CommandPanel title="June 2026">
          <div className="grid grid-cols-7 gap-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="type-caption text-slate py-2">{d}</span>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const hasClass = [12, 14, 16].includes(day);
              return (
                <div
                  key={day}
                  className={cn(
                    "rounded-nav py-2 type-body-sm",
                    hasClass ? "bg-aubergine/40 text-iris" : "text-slate",
                    day === 12 && "ring-1 ring-iris"
                  )}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <p className="mt-4 type-body-sm text-slate">Google Calendar sync available after OAuth setup.</p>
        </CommandPanel>
      ) : (
        <ul className="flex flex-col gap-4">
          {mockUpcomingClasses.map((s) => (
            <li key={s.id}>
              <CommandPanel>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="type-subheading text-bone-white">{s.title}</h3>
                      <Badge variant="outline">{s.mode}</Badge>
                    </div>
                    <p className="type-body-sm text-slate">{s.subject} · {s.instructor}</p>
                    <p className="mt-2 type-mono-label text-plum">{formatClassTime(s.startsAt)}</p>
                    {s.location && (
                      <p className="mt-1 flex items-center gap-1 type-body-sm text-slate">
                        <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {s.location}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.meetingLink && s.canJoin && (
                      <Button href={s.meetingLink} variant="accent" size="sm">
                        <Video className="h-4 w-4" strokeWidth={1.5} />
                        Join
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <CalendarPlus className="h-4 w-4" strokeWidth={1.5} />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </CommandPanel>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
