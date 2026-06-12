import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-void">
      <Navigation />
      <main id="main" className="section-container max-w-2xl pb-section pt-28 md:pt-32">
        <h1 className="type-heading text-bone-white">Terms &amp; Conditions</h1>
        <p className="mt-2 type-caption text-slate">Last updated: June 2026</p>

        <div className="mt-8 flex flex-col gap-6 type-body text-slate">
          <section>
            <h2 className="type-subheading text-bone-white">Agreement</h2>
            <p className="mt-2">
              By using the {SITE.name} website and enquiry services, you agree to these terms. Program
              enrollment, fees, and training schedules are governed by separate agreements provided at the
              time of admission.
            </p>
          </section>
          <section>
            <h2 className="type-subheading text-bone-white">Services</h2>
            <p className="mt-2">
              We provide aviation ground training, examination preparation, mentorship, and related educational
              services. Program availability, schedules, and pricing may change. Information on this website
              is for general guidance and does not constitute a binding offer until confirmed in writing.
            </p>
          </section>
          <section>
            <h2 className="type-subheading text-bone-white">Student portal</h2>
            <p className="mt-2">
              Access to the student command center is invitation-only for enrolled students. You are responsible
              for maintaining the confidentiality of your login credentials.
            </p>
          </section>
          <section>
            <h2 className="type-subheading text-bone-white">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">{SITE.email}</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
