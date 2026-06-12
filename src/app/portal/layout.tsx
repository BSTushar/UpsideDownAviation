import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal",
  robots: { index: false, follow: false },
};

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-void">{children}</div>;
}
