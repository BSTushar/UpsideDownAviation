"use client";

/** Stylised preview of the student dashboard for the login page. */
export function PortalLoginTeaser() {
  return (
    <div
      className="mt-6 overflow-hidden rounded-card border border-graphite bg-[#081827] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-graphite px-4 py-2.5">
        <span className="type-caption text-accent">Command Center</span>
        <span className="type-caption text-slate">Preview</span>
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-lg border border-accent/20 bg-surface/80 p-3">
          <p className="type-caption text-slate">Welcome back</p>
          <p className="type-body-sm font-semibold text-bone-white">Arjun · Stage 03 Training</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-graphite">
            <div className="h-full w-[68%] rounded-full bg-accent" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-graphite bg-void/80 p-2.5">
            <p className="type-caption text-slate">Next class</p>
            <p className="type-body-sm text-bone-white">Technical General</p>
          </div>
          <div className="rounded-lg border border-graphite bg-void/80 p-2.5">
            <p className="type-caption text-slate">Attendance</p>
            <p className="type-body-sm text-accent">94%</p>
          </div>
        </div>
        <div className="flex gap-1">
          {["01", "02", "03", "04", "05", "06", "07"].map((n, i) => (
            <span
              key={n}
              className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-accent" : "bg-graphite"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
