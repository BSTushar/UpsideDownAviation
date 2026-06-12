import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { TypeText } from "@/components/motion/TypeText";

export const metadata: Metadata = {
  title: "Speak to an Advisor",
  description: "Request a free consultation with Upside Down Aviation — ground training, DGCA exam preparation, and career guidance.",
};

export default function EnquirePage() {
  return (
    <div className="min-h-screen bg-void">
      <Navigation />
      <main id="main" className="section-container max-w-2xl pb-section pt-28 md:pt-32">
        <p className="type-caption text-accent">Admissions</p>
        <TypeText as="h1" text="Speak to an advisor." speed={40} delay={250} className="mt-3 type-heading-lg text-bone-white" />
        <p className="mt-4 type-body text-slate">
          Share your background and goals. An advisor will help you find the right program and
          timeline — with no pressure and no obligations.
        </p>
        <div className="mt-12 rounded-card border border-graphite bg-surface p-card">
          <InquiryForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
