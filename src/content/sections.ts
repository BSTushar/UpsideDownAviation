import { BookOpen, Gauge, FileCheck, Briefcase, Users, Plane, type LucideIcon } from "lucide-react";

export const brand = {
  nameMeaning:
    "We flip how pilot training works — clarity first, mentors who fly, costs in the open.",
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
  eyebrow: "DGCA ground training · Bengaluru",
  brandLine: brand.nameMeaning,
  headline: "Train for your aviation career.",
  thesis:
    "Most training paths hide the timeline, the costs, and what comes next. We built Upside Down Aviation to flip that — one structured path from ground school to the flight deck.",
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
  eyebrow: "Why we exist",
  headline: "We named it Upside Down for a reason.",
  body: [
    "Like an attitude indicator in turbulence, we flip the usual training script: clarity before commitment, mentors who actually fly, and a path where you always know what stage you are in.",
    "We are not selling opaque ground classes. We are building aviators — and the school systems to support them — starting in Bengaluru.",
  ],
  points: [
    { title: "One structured path", desc: "Seven defined stages from first class to flight deck." },
    { title: "Clarity before commitment", desc: "Timelines, costs, and outcomes explained up front." },
    { title: "Mentors who fly", desc: "Guidance from working aviation professionals." },
  ],
  parentsCallout: {
    title: "For parents & families",
    body: "A DGCA path is a major investment. We explain timelines, costs, and outcomes before you commit — and you can speak with an advisor with zero pressure to enroll.",
  },
};

export type JourneyStage = { n: string; title: string; desc: string; detail: string };

export const journey = {
  eyebrow: "How it works",
  headline: "Seven stages from first interest to flight deck.",
  sub: "Every student follows the same structured path — adapted to your pace and goals.",
  stages: [
    { n: "01", title: "Dream", desc: "Where every aviation career begins", detail: "Free advisory call — eligibility, costs, and timeline in plain language" },
    { n: "02", title: "Learning", desc: "Structured aviation theory & ground foundations", detail: "Weeks 1–12: navigation, meteorology, regulations, and systems" },
    { n: "03", title: "Training", desc: "Skills, systems, and disciplined preparation", detail: "Batch classes, progress tracking, and weekly mentor check-ins" },
    { n: "04", title: "Examination", desc: "DGCA licensing readiness", detail: "Mock papers, weak-area drills, and exam-day preparation" },
    { n: "05", title: "Mentorship", desc: "Guidance from those who fly", detail: "One-on-one sessions with working pilots and instructors" },
    { n: "06", title: "Career", desc: "Industry readiness & opportunity", detail: "Airline readiness, interview prep, and career mapping" },
    { n: "07", title: "Flight Deck", desc: "Command & professional flight", detail: "Flying school phase — hours, check rides, and command training" },
  ] satisfies JourneyStage[],
};

export type ProgramCard = {
  n: string;
  title: string;
  desc: string;
  outcome: string;
  audience: string;
  cta: string;
  interest: string;
  icon: LucideIcon;
  comingSoon?: boolean;
};

export const programs = {
  eyebrow: "Programs",
  headline: "What you can train for today.",
  sub: "Ground training, examination preparation, mentorship, and career readiness — designed for aspiring pilots, DGCA students, and parents evaluating aviation as a career.",
  cards: [
    {
      n: "01",
      title: "Ground Training",
      desc: "Complete theoretical foundation — navigation, meteorology, regulations, and systems",
      outcome: "DGCA ground-school foundation across all core subjects",
      audience: "First-time students & career-changers starting from zero",
      cta: "Ask about ground school",
      interest: "Ground Training",
      icon: BookOpen,
    },
    {
      n: "02",
      title: "Technical & Regulatory",
      desc: "Deep fluency in the standards the industry demands",
      outcome: "Technical General & Air Regulations exam readiness",
      audience: "Students who need focused technical depth",
      cta: "Discuss technical track",
      interest: "Technical & Regulatory",
      icon: Gauge,
    },
    {
      n: "03",
      title: "Examination Preparation",
      desc: "Structured, disciplined readiness for DGCA licensing",
      outcome: "Mock exams, weak-area drills, and licensing strategy",
      audience: "Students approaching DGCA written papers",
      cta: "Plan exam prep",
      interest: "Examination Preparation",
      icon: FileCheck,
    },
    {
      n: "04",
      title: "Career Readiness",
      desc: "From qualification to real aviation opportunities",
      outcome: "Airline readiness, interview prep, and career mapping",
      audience: "Licensed students targeting airline or charter roles",
      cta: "Explore career path",
      interest: "Career & Airline Readiness",
      icon: Briefcase,
    },
    {
      n: "05",
      title: "Mentorship",
      desc: "One-on-one guidance from working aviation professionals",
      outcome: "Personal mentor matched to your stage and goals",
      audience: "Students who want direct access to working aviators",
      cta: "Meet a mentor",
      interest: "Mentorship",
      icon: Users,
    },
    {
      n: "06",
      title: "Flying School",
      desc: "Practical flight training — the next phase of our expansion",
      outcome: "Flight hours, check rides, and command training",
      audience: "Ground-school graduates ready for the cockpit",
      cta: "Join the waitlist",
      interest: "General",
      icon: Plane,
      comingSoon: true,
    },
  ] satisfies ProgramCard[],
};

export type VisionPhase = {
  label: string;
  status: "now" | "next" | "future";
};

export const vision = {
  headline: "Ground school today. A complete flying school tomorrow.",
  body: [
    "We are building an aviation institution that grows with its students — from education and mentorship to flight training and full operations.",
    "Those who join us now train on the same standards and student systems that will power our flying school when it launches.",
  ],
  stamp: "Next phase — Flying School",
  phases: [
    { label: "Ground training & DGCA preparation", status: "now" },
    { label: "Mentorship & career guidance", status: "now" },
    { label: "Student command center", status: "next" },
    { label: "Flying school operations", status: "future" },
    { label: "Complete aviation ecosystem", status: "future" },
  ] satisfies VisionPhase[],
};

export const finalCta = {
  headline: "Not sure where to start?",
  sub: "Book a free advisory conversation. We will help you understand eligibility, timelines, and the right program — with no pressure to enroll.",
  primary: "Speak to an Advisor",
  secondary: "View programs",
  parentsNote:
    "Parents welcome — we explain costs, timelines, and outcomes before any commitment.",
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
  headline: "The system that runs our school — built in phases.",
  sub: "These are not separate products. They are the operating backbone we are building to run Upside Down Aviation — so students who train with us today grow into the same platform when our flying school launches.",
  modules: [
    {
      id: "career-services",
      code: "MOD-CRS",
      title: "Career Services",
      desc: "Mentorship matching, airline readiness, and industry opportunities for enrolled students.",
      status: "active",
      capabilities: ["Mentor matching", "Interview prep", "Career guidance"],
    },
    {
      id: "aviation-erp",
      code: "MOD-ERP",
      title: "Student Portal",
      desc: "Schedule, attendance, announcements, and progress — one command center for enrolled students.",
      status: "active",
      capabilities: ["Class schedules", "Attendance", "Announcements"],
    },
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
      status: "roadmap",
      capabilities: ["Exam readiness tracking", "Batch records", "Progress reports"],
    },
  ] satisfies PlatformModule[],
};

export const intro = {
  label: "Upside Down Aviation",
  editorialAccent: "Every dream",
  headline: "begins here.",
};
