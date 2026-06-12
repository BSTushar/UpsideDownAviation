export const SITE = {
  name: "Upside Down Aviation",
  tagline: "Train. Prepare. Fly.",
  url: "https://upsidedownaviation.com",
  email: "info@upsidedownaviation.com",
  location: "Bengaluru",
  coordinates: {
    lat: "12.97",
    lon: "77.59",
    heading: 198,
  },
  /** Set when a real number is available; footer hides phone until then */
  phone: null as string | null,
  whatsapp: null as string | null,
  socials: {
    instagram: "https://www.instagram.com/upsidedown_aviation/",
    threads: "https://threads.net/@upsidedown_aviation",
  },
} as const;

export const NAV_LINKS = [
  { label: "Programs", href: "/#programs" },
  { label: "Journey", href: "/#journey" },
  { label: "About", href: "/#why" },
  { label: "Vision", href: "/#vision" },
] as const;

export function whatsappLink(prefill = "Hi Upside Down Aviation, I'd like to know more.") {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(prefill)}`;
}

export const PORTAL_SESSION_KEY = "uda-portal-demo";
