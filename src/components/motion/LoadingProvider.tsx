"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { OpeningStory } from "@/components/welcome/OpeningStory";

type LoadingContextValue = {
  startLoading: () => void;
  stopLoading: () => void;
  /** True while the opening loader animation is visible */
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

function isPageReload(): boolean {
  if (typeof window === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

/**
 * Loading screen runs only on:
 * 1. Browser refresh (F5 / reload)
 * 2. Explicit startLoading() — e.g. Student Portal nav, form submit
 */
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [reloadLoad, setReloadLoad] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isPageReload()) setReloadLoad(true);
    setReady(true);
  }, []);

  const active = ready && (reloadLoad || submitLoad);

  const finish = useCallback(() => {
    setReloadLoad(false);
    setSubmitLoad(false);
  }, []);

  const startLoading = useCallback(() => setSubmitLoad(true), []);
  const stopLoading = useCallback(() => setSubmitLoad(false), []);

  const value = useMemo(
    () => ({ startLoading, stopLoading, isLoading: active }),
    [startLoading, stopLoading, active]
  );

  return (
    <LoadingContext.Provider value={value}>
      <OpeningStory active={active} onComplete={finish} />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
}
