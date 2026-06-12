import { PORTAL_SESSION_KEY } from "@/lib/constants";

export const PORTAL_PREVIEW_NAME_KEY = "uda-portal-preview-name";
export const PORTAL_TOUR_DONE_KEY = "uda-portal-tour-done";

export function isPreviewSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(PORTAL_SESSION_KEY) === "1";
}

export function getPreviewName(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PORTAL_PREVIEW_NAME_KEY);
}

export function isTourDone(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(PORTAL_TOUR_DONE_KEY) === "1";
}

export function startPreviewSession(name: string) {
  sessionStorage.setItem(PORTAL_SESSION_KEY, "1");
  sessionStorage.setItem(PORTAL_PREVIEW_NAME_KEY, name.trim());
  sessionStorage.removeItem(PORTAL_TOUR_DONE_KEY);
}

export function markTourDone() {
  sessionStorage.setItem(PORTAL_TOUR_DONE_KEY, "1");
}

export function clearPreviewSession() {
  sessionStorage.removeItem(PORTAL_SESSION_KEY);
  sessionStorage.removeItem(PORTAL_PREVIEW_NAME_KEY);
  sessionStorage.removeItem(PORTAL_TOUR_DONE_KEY);
}
