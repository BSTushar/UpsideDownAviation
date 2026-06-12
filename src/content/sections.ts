import { BookOpen, Gauge, FileCheck, Briefcase, Users, Plane, type LucideIcon } from "lucide-react";

export const brand = {
  guidingPrinciple:
    "Upside Down Aviation helps aspiring pilots build structured careers in aviation — from ground school to the flight deck.",
  journeyStages: [
    "Dream",
    "Learning",
    "Training",
    "Examination",
    "Mentorship",
    "Career",
    "Flight Deck",
  ] as const,
} as const;

export const hero = {
  eyebrow: "DGCA ground training · New Delhi NCR",
  headline: "Train for your aviation career.",
  sub: "Structured ground school, DGCA exam preparation, and mentorship — with a clear path from your first class to the flight deck.",
  points: ["Ground school", "DGCA exam prep", "Career mentorship"],
  cta: "Speak to an Advisor",
  secondaryCta: "View programs",
  boardingPass: {
    origin: "GROUND",
    destination: "COCKPIT",
    passenger: "Future pilot",
    class: "DGCA",
    gate: "A1",
    cta: "See the journey",
  },
};

export const mission = {
  eyebrow: "What we do",
  headline: "Aviation training with a full career path — not just classes.",
  body: [
    "Upside Down Aviation helps aspiring pilots and DGCA students build real careers in aviation. We combine ground training, examination preparation, and mentorship under one standard — so you always know what comes next.",
    "For parents and career-changers: we focus on clarity first. Speak with an advisor to understand timelines, costs, and outcomes before you commit to anything.",
  ],
  points: [
    { title: "One structured path", desc: "Seven defined stages from first class to flight deck." },
    { title: "Clarity before commitment", desc: "Timelines, costs, and outcomes explained up front." },
    { title: "Mentors who fly", desc: "Guidance from working aviation professionals." },
  ],
};

export type JourneyStage = { n: string; title: string; desc: string };

export const journey = {
  eyebrow: "How it works",
  headline: "Seven stages from first interest to flight deck.",
  sub: "Every student follows the same structured path — adapted to your pace and goals.",
  stages: [
    { n: "01", title: "Dream", desc: "Where every aviation career begins" },
    { n: "02", title: "Learning", desc: "Structured aviation theory & ground foundations" },
    { n: "03", title: "Training", desc: "Skills, systems, and disciplined preparation" },
    { n: "04", title: "Examination", desc: "DGCA licensing readiness" },
    { n: "05", title: "Mentorship", desc: "Guidance from those who fly" },
    { n: "06", title: "Career", desc: "Industry readiness & opportunity" },
    { n: "07", title: "Flight Deck", desc: "Command & professional flight" },
  ] satisfies JourneyStage[],
};

export type ProgramCard = { n: string; title: string; desc: string; icon: LucideIcon; comingSoon?: boolean };

export const programs = {
  eyebrow: "Programs",
  headline: "What you can train for today.",
  sub: "Ground training, examination preparation, mentorship, and career readiness — designed for aspiring pilots, DGCA students, and parents evaluating aviation as a career.",
  cards: [
    { n: "01", title: "Ground Training", desc: "Complete theoretical foundation — navigation, meteorology, regulations, and systems", icon: BookOpen },
    { n: "02", title: "Technical & Regulatory", desc: "Deep fluency in the standards the industry demands", icon: Gauge },
    { n: "03", title: "Examination Preparation", desc: "Structured, disciplined readiness for DGCA licensing", icon: FileCheck },
    { n: "04", title: "Career Readiness", desc: "From qualification to real aviation opportunities", icon: Briefcase },
    { n: "05", title: "Mentorship", desc: "One-on-one guidance from working aviation professionals", icon: Users },
    { n: "06", title: "Flying School", desc: "Practical flight training — the next phase of our expansion", icon: Plane, comingSoon: true },
  ] satisfies ProgramCard[],
};

export const vision = {
  headline: "Ground school today. A complete flying school tomorrow.",
  body: [
    "We are building an aviation institution that grows with its students — from education and mentorship to flight training and full operations.",
    "Those who join us now train on the same platform and standards that will power our flying school when it launches.",
  ],
  stamp: "Next phase — Flying School",
  phases: [
    "Ground training & DGCA preparation",
    "Mentorship & career guidance",
    "Student command center",
    "Flying school operations",
    "Complete aviation ecosystem",
  ],
};

export const finalCta = {
  headline: "Not sure where to start?",
  sub: "Book a free advisory conversation. We will help you understand eligibility, timelines, and the right program — with no pressure to enroll.",
  primary: "Speak to an Advisor",
  secondary: "View programs",
};

export type PlatformModule = {
  id: string;
  code: string;
  title: string;
  desc: string;
  status: "active" | "roadmap";
  capabilities: string[];
};

export const platform = {
  eyebrow: "Growing with you",
  headline: "Training today. Flying school and full operations tomorrow.",
  sub: "Students start with ground training and mentorship. As we expand, the same platform will support flight hours, DGCA records, and flying-school operations.",
  modules: [
    {
      id: "flying-school",
      code: "MOD-FSO",
      title: "Flying School Operations",
      desc: "Fleet scheduling, instructor assignments, and student flight progression.",
      status: "roadmap",
      capabilities: ["Fleet scheduling", "Instructor assignments", "Dispatch workflows"],
    },
    {
      id: "flight-hours",
      code: "MOD-FHT",
      title: "Flight Hour Tracking",
      desc: "Logbook integration, hour accumulation, and syllabus completion.",
      status: "roadmap",
      capabilities: ["Digital logbook", "Stage milestones", "Hour summaries"],
    },
    {
      id: "dgca-records",
      code: "MOD-DGC",
      title: "DGCA Records",
      desc: "Examination history, batch records, and compliance-ready documentation.",
      status: "active",
      capabilities: ["Exam readiness tracking", "Batch records", "Progress reports"],
    },
    {
      id: "career-services",
      code: "MOD-CRS",
      title: "Career Services",
      desc: "Mentorship matching, airline readiness, and industry opportunities.",
      status: "active",
      capabilities: ["Mentor matching", "Interview prep", "Career guidance"],
    },
    {
      id: "aviation-erp",
      code: "MOD-ERP",
      title: "Student Portal",
      desc: "Attendance, announcements, schedules, and progress — in one place for enrolled students.",
      status: "roadmap",
      capabilities: ["Class schedules", "Attendance", "Announcements"],
    },
  ] satisfies PlatformModule[],
};

export const intro = {
  label: "Upside Down Aviation",
  editorialAccent: "Every dream",
  headline: "begins here.",
};
