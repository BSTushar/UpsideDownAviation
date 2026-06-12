"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    WindowIntro?: { play: (opts?: object) => () => void };
  }
}

function startIntro() {
  if (typeof window === "undefined" || !window.WindowIntro) return;
  const path = window.location.pathname;
  if (path !== "/" && path !== "") return;
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
  useEffect(() => {
    const onReady = () => startIntro();
    if (window.WindowIntro) startIntro();
    window.addEventListener("aw-intro-ready", onReady);
    return () => window.removeEventListener("aw-intro-ready", onReady);
  }, []);

  return (
    <Script
      id="window-intro"
      src="/intro/window-intro.js"
      strategy="afterInteractive"
      data-once="session"
      data-auto="false"
      onReady={startIntro}
    />
  );
}
