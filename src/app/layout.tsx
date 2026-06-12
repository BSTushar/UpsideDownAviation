import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { LoadingProvider } from "@/components/motion/LoadingProvider";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inktrap",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-inktrap-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description:
    "Aviation operations platform — ground training, DGCA records, flight-hour tracking, career services, and flying-school operations under one standard.",
  keywords: [
    "aviation training",
    "pilot training India",
    "DGCA ground classes",
    "aviation ERP",
    "flight hour tracking",
    "flying school operations",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: "Your aviation journey starts here. Train. Prepare. Fly.",
    images: [{ url: "/logo-full.png", width: 512, height: 512, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE.name, images: ["/logo-full.png"] },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd />
        <LoadingProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SmoothScroll>{children}</SmoothScroll>
        </LoadingProvider>
      </body>
    </html>
  );
}
