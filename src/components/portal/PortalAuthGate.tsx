"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PORTAL_SESSION_KEY } from "@/lib/constants";

export function PortalAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const demo = process.env.NEXT_PUBLIC_PORTAL_DEMO === "true";
    const session = sessionStorage.getItem(PORTAL_SESSION_KEY);
    if (demo || session === "1") {
      setAllowed(true);
      return;
    }
    router.replace("/portal/login?reason=auth");
  }, [router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <p className="type-body text-slate">Checking access…</p>
      </div>
    );
  }

  return <>{children}</>;
}
