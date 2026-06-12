"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PortalTopBar } from "./PortalTopBar";
import { PortalSidebar } from "./PortalSidebar";
import { PortalStatusBar } from "./PortalStatusBar";
import { SIDEBAR_TOUR_TARGETS } from "@/lib/portal/tour-steps";
import type { NavItem, PortalUser } from "@/lib/portal/types";

type Props = {
  nav: NavItem[];
  user: PortalUser;
  children: ReactNode;
  unreadCount?: number;
  variant?: "student" | "admin";
  statusLabel?: string;
  statusCoords?: string | null;
};

export function PortalShell({
  nav,
  user,
  children,
  unreadCount,
  variant = "student",
  statusLabel,
  statusCoords,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const open = () => setSidebarOpen(true);
    const onStep = (e: Event) => {
      const target = (e as CustomEvent<string>).detail;
      if (target && SIDEBAR_TOUR_TARGETS.has(target)) setSidebarOpen(true);
    };
    window.addEventListener("uda-tour-open-sidebar", open);
    window.addEventListener("uda-tour-step", onStep);
    return () => {
      window.removeEventListener("uda-tour-open-sidebar", open);
      window.removeEventListener("uda-tour-step", onStep);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-void text-bone-white">
      <PortalTopBar
        nav={nav}
        user={user}
        unreadCount={unreadCount}
        variant={variant}
        onMenuToggle={() => setSidebarOpen(true)}
      />
      <div className="flex flex-1">
        <PortalSidebar
          nav={nav}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          footer={
            statusLabel ? (
              <p className="type-caption text-slate normal-case tracking-normal">{statusLabel}</p>
            ) : undefined
          }
        />
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 p-4 pb-20 md:p-6 md:pb-24">{children}</div>
          <PortalStatusBar coords={statusCoords} />
        </main>
      </div>
    </div>
  );
}
