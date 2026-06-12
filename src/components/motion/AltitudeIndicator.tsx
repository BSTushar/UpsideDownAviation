"use client";

import { useEffect, useState } from "react";

const CRUISE_ALT = 38000;
const TICK_COUNT = 60;
const TICK_GAP = 14;
const TAPE_HEIGHT = 150;

const PHASES = [
  { at: 0, label: "TAXI" },
  { at: 0.05, label: "TAKEOFF" },
  { at: 0.14, label: "CLIMB" },
  { at: 0.4, label: "CRUISE" },
  { at: 0.62, label: "DESCENT" },
  { at: 0.84, label: "APPROACH" },
  { at: 0.97, label: "LANDED" },
] as const;

/** Climb → cruise → descend back to the runway as the page ends. */
function flightAltitude(progress: number): number {
  if (progress <= 0.4) {
    // Climb: ease toward cruise altitude
    const t = progress / 0.4;
    return CRUISE_ALT * (1 - Math.pow(1 - t, 2));
  }
  if (progress <= 0.6) return CRUISE_ALT;
  // Descend: ease back down to 0 at the bottom of the page
  const t = (progress - 0.6) / 0.4;
  return CRUISE_ALT * (1 - t * t * (3 - 2 * t));
}

/** Flight-instrument readout pinned to the right edge — altitude climbs as you scroll. */
export function AltitudeIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const altitude = Math.round(flightAltitude(progress) / 100) * 100;
  const heading = Math.round(120 + progress * 78);
  const phase = PHASES.reduce<string>(
    (acc, p) => (progress >= p.at ? p.label : acc),
    PHASES[0].label
  );

  // The tape tracks altitude, so it scrolls up during climb and back down on descent.
  const tapeTravel = TICK_COUNT * TICK_GAP - TAPE_HEIGHT;
  const tapeOffset = (altitude / CRUISE_ALT) * tapeTravel;

  return (
    <div
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
      aria-hidden
    >
      <span className="font-inktrap-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
        {phase}
      </span>
      <span className="font-inktrap text-2xl font-bold tabular-nums leading-none text-bone-white">
        {altitude.toLocaleString("en-US")}
      </span>
      <span className="font-inktrap-mono text-[9px] uppercase tracking-[0.2em] text-slate">
        ALT · FT
      </span>

      <div
        className="relative mt-2 w-7 overflow-hidden"
        style={{ height: TAPE_HEIGHT }}
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 transition-transform duration-150 ease-linear"
          style={{ transform: `translate(-50%, ${-tapeOffset}px)` }}
        >
          {Array.from({ length: TICK_COUNT }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{ height: TICK_GAP }}
            >
              <span
                className={
                  i % 5 === 0
                    ? "h-px w-5 bg-bone-white/45"
                    : "h-px w-2.5 bg-bone-white/20"
                }
              />
            </div>
          ))}
        </div>
        <span className="absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 -translate-y-1/2 bg-accent" />
        <span className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-void to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-void to-transparent" />
      </div>

      <span className="mt-2 font-inktrap-mono text-[10px] uppercase tracking-[0.18em] text-slate">
        HDG {heading}°
      </span>
    </div>
  );
}
