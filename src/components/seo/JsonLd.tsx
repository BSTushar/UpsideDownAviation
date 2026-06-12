import { SITE } from "@/lib/constants";

export function JsonLd() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE.name,
    description: "Aviation education and career ecosystem — ground training, DGCA preparation, and mentorship.",
    url: SITE.url,
    logo: `${SITE.url}/logo-mark.png`,
    slogan: SITE.tagline,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Delhi NCR",
      addressCountry: "IN",
    },
    sameAs: [SITE.socials.instagram, SITE.socials.threads],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      email: SITE.email,
      availableLanguage: ["en", "hi"],
    },
  };

  if (SITE.phone) {
    schema.telephone = SITE.phone;
    (schema.contactPoint as Record<string, unknown>).telephone = SITE.phone;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
