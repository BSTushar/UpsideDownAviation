"use client";

import { PortalShell } from "@/components/portal/PortalShell";
import { ADMIN_NAV } from "@/lib/portal/types";
import { mockStudent } from "@/lib/portal/mock-data";

const mockAdmin = { ...mockStudent, name: "Admin User", role: "admin" as const };

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      nav={ADMIN_NAV}
      user={mockAdmin}
      variant="admin"
      statusLabel="Operations · UDA Admin"
      statusCoords="12.9716° N, 77.5946° E"
    >
      {children}
    </PortalShell>
  );
}
