import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navigation />
      <main id="main" className="section-container max-w-2xl pb-section pt-28 md:pt-32">
        <h1 className="type-heading text-bone-white">Privacy Policy</h1>
        <p className="mt-2 type-caption text-slate">Last updated: June 2026</p>

        <div className="mt-8 flex flex-col gap-6 type-body text-slate">
          <section>
            <h2 className="type-subheading text-bone-white">Who we are</h2>
            <p className="mt-2">
              {SITE.name} ({SITE.location}) provides aviation education, ground training, and career guidance.
              Contact: <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">{SITE.email}</a>.
            </p>
          </section>
          <section>
            <h2 className="type-subheading text-bone-white">Information we collect</h2>
            <p className="mt-2">
              When you enquire through our website, we may collect your name, phone number, email address,
              area of interest, and any message you provide. We use this solely to respond to your enquiry
              and provide relevant information about our programs.
            </p>
          </section>
          <section>
            <h2 className="type-subheading text-bone-white">How we use your data</h2>
            <p className="mt-2">
              We use your information to contact you about aviation training and mentorship, schedule advisor
              conversations, and improve our services. We do not sell your personal data to third parties.
            </p>
          </section>
          <section>
            <h2 className="type-subheading text-bone-white">Your rights</h2>
            <p className="mt-2">
              Under applicable Indian law including the Digital Personal Data Protection Act, 2023, you may
              request access, correction, or deletion of your personal data by emailing us at {SITE.email}.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
