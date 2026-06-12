"use client";

import Script from "next/script";

declare global {
  interface Window {
    WindowIntro?: { play: (opts?: object) => () => void };
  }
}

function startIntro() {
  if (!window.WindowIntro) return;
  try {
    if (sessionStorage.getItem("aw-intro-played")) return;
    sessionStorage.setItem("aw-intro-played", "1");
  } catch {
    /* sessionStorage unavailable */
  }
  window.WindowIntro.play({});
}

/** Landing-page cabin window intro. Plays once per session. */
export function WindowIntro() {
  return (
    <Script
      id="window-intro"
      src="/intro/window-intro.js"
      strategy="afterInteractive"
      data-once="session"
      data-auto="false"
      onLoad={startIntro}
    />
  );
}
