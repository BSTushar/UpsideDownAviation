"use client";

import {
  WelcomeScreen,
  WhyAviation,
  StudentJourney,
  Programs,
  FutureVision,
  FinalCta,
  PlatformModules,
  GlobeSection,
} from "@/components/welcome";
import { Footer } from "@/components/layout/Footer";
import { AltitudeIndicator } from "@/components/motion/AltitudeIndicator";

export function WelcomeExperience() {
  return (
    <div className="relative min-h-screen bg-void">
      <AltitudeIndicator />
      <main id="main" className="relative z-10 text-bone-white">
        <WelcomeScreen />
        <Programs />
        <StudentJourney />
        <WhyAviation />
        <PlatformModules />
        <FutureVision />
        <GlobeSection />
        <FinalCta />
        <Footer />
      </main>
    </div>
  );
}
