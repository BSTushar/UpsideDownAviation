"use client";

import Script from "next/script";

/** Landing-page-only cabin window intro. Plays once per session via data-once on the script. */
export function WindowIntro() {
  return (
    <Script
      id="window-intro"
      src="/intro/window-intro.js"
      strategy="afterInteractive"
      data-once="session"
    />
  );
}
