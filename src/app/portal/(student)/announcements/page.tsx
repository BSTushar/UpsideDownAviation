"use client";

import { useState } from "react";
import { Paperclip } from "lucide-react";
import { PageHeader, CommandPanel } from "@/components/portal/CommandPanel";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/FormElements";
import { mockAnnouncements, formatClassTime } from "@/lib/portal/mock-data";
import { cn } from "@/lib/cn";

const priorityVariant = {
  urgent: "accent" as const,
  important: "default" as const,
  normal: "outline" as const,
};

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [query, setQuery] = useState("");

  const items = mockAnnouncements.filter((a) => {
    if (filter === "unread" && a.read) return false;
    if (query && !a.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader title="Announcements" description="Important notices from your program." />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search announcements…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-pill border px-4 py-2 type-body-sm transition-colors",
              filter === "all" ? "border-iris text-bone-white" : "border-storm-gray text-slate"
            )}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={cn(
              "rounded-pill border px-4 py-2 type-body-sm transition-colors",
              filter === "unread" ? "border-iris text-bone-white" : "border-storm-gray text-slate"
            )}
          >
            Unread
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((a) => (
          <li key={a.id} id={a.id}>
            <CommandPanel>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  {!a.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-iris" />}
                  <div>
                    <h3 className="type-subheading text-bone-white">{a.title}</h3>
                    <p className="mt-1 type-body-sm text-slate">{a.excerpt}</p>
                  </div>
                </div>
                <Badge variant={priorityVariant[a.priority]}>{a.priority}</Badge>
              </div>
              <p className="mt-3 type-body-sm text-bone-white/80">{a.body}</p>
              <div className="mt-4 flex items-center justify-between type-caption text-slate normal-case">
                <span>{formatClassTime(a.publishedAt)}</span>
                {a.hasAttachment && (
                  <span className="flex items-center gap-1">
                    <Paperclip className="h-3 w-3" strokeWidth={1.5} />
                    Attachment
                  </span>
                )}
              </div>
            </CommandPanel>
          </li>
        ))}
      </ul>
    </>
  );
}
