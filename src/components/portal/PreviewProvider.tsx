"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { mockStudent } from "@/lib/portal/mock-data";
import type { PortalUser } from "@/lib/portal/types";
import {
  getPreviewName,
  isPreviewSession,
  isTourDone,
  markTourDone,
} from "@/lib/portal/preview";

type PreviewContextValue = {
  isPreview: boolean;
  visitorName: string | null;
  previewUser: PortalUser;
  showTour: boolean;
  skipTour: () => void;
  finishTour: () => void;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [tourDone, setTourDoneState] = useState(true);

  useEffect(() => {
    const preview = isPreviewSession();
    setIsPreview(preview);
    setVisitorName(preview ? getPreviewName() ?? "Guest" : null);
    setTourDoneState(preview ? isTourDone() : true);
    setReady(true);
  }, []);

  const previewUser = useMemo(() => {
    if (!visitorName) return mockStudent;
    return { ...mockStudent, name: visitorName };
  }, [visitorName]);

  const skipTour = () => {
    markTourDone();
    setTourDoneState(true);
  };

  const finishTour = () => {
    markTourDone();
    setTourDoneState(true);
  };

  const value: PreviewContextValue = {
    isPreview,
    visitorName,
    previewUser,
    showTour: ready && isPreview && !tourDone,
    skipTour,
    finishTour,
  };

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("usePreview must be used within PreviewProvider");
  return ctx;
}

/** Preview-aware student — uses visitor name when in demo mode. */
export function usePreviewUser(): PortalUser {
  const { previewUser } = usePreview();
  return previewUser;
}
