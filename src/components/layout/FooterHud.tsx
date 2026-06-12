"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

/** Live IST clock for the footer telemetry strip */
export function FooterHud() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="site-footer__hud">
      <span>
        HDG&nbsp;<b>{SITE.coordinates.heading}°</b>
      </span>
      <span className="site-footer__hud-sep" aria-hidden>
        /
      </span>
      <span>
        {SITE.coordinates.lat}°N&nbsp;{SITE.coordinates.lon}°E
      </span>
      <span className="site-footer__hud-sep" aria-hidden>
        /
      </span>
      <span>
        LCL&nbsp;<b>{time}</b>&nbsp;IST
      </span>
      <span className="site-footer__hud-tail">
        <span className="site-footer__dot" aria-hidden />
        ALL&nbsp;SYSTEMS&nbsp;NOMINAL
      </span>
    </div>
  );
}
