"use client";

import { PortalShell } from "@/components/portal/PortalShell";
import { PortalAuthGate } from "@/components/portal/PortalAuthGate";
import { DemoPreviewBanner } from "@/components/portal/DemoPreviewBanner";
import { PreviewProvider, usePreview } from "@/components/portal/PreviewProvider";
import { PreviewTour } from "@/components/portal/PreviewTour";
import { STUDENT_NAV } from "@/lib/portal/types";
import { mockAnnouncements, mockJourney, getActiveStage } from "@/lib/portal/mock-data";

function StudentPortalShell({ children }: { children: React.ReactNode }) {
  const { previewUser } = usePreview();
  const unread = mockAnnouncements.filter((a) => !a.read).length;
  const activeStage = getActiveStage(mockJourney);

  return (
    <>
      <DemoPreviewBanner />
      <PreviewTour />
      <PortalShell
        nav={STUDENT_NAV}
        user={previewUser}
        unreadCount={unread}
        variant="student"
        statusLabel={`Stage ${activeStage.code} · ${activeStage.title}`}
        statusCoords={null}
      >
        {children}
      </PortalShell>
    </>
  );
}

export default function StudentPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalAuthGate>
      <PreviewProvider>
        <StudentPortalShell>{children}</StudentPortalShell>
      </PreviewProvider>
    </PortalAuthGate>
  );
}
