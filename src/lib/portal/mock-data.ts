import type {
  Announcement,
  AttendanceRecord,
  ClassSession,
  JourneyStage,
  MentorInfo,
  PortalUser,
  SubjectProgress,
} from "./types";

/** Mock data — replace with Supabase queries when auth is wired */

export const mockStudent: PortalUser = {
  id: "stu-001",
  name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  phone: "+91 98765 43210",
  role: "student",
  program: "DGCA Ground Training",
  batch: "B-07",
  enrollmentDate: "2025-08-12",
};

export const mockJourney: JourneyStage[] = [
  { id: "dream", code: "01", title: "Dream", description: "Free advisory call — eligibility, costs, and timeline", status: "complete", percent: 100 },
  { id: "learning", code: "02", title: "Learning", description: "Weeks 1–12: navigation, meteorology, regulations", status: "complete", percent: 100 },
  { id: "training", code: "03", title: "Training", description: "Batch classes, progress tracking, mentor check-ins", status: "active", percent: 68, mentorNote: "Strong progress in navigation modules." },
  { id: "examination", code: "04", title: "Examination", description: "Mock papers, weak-area drills, exam-day prep", status: "upcoming", percent: 0 },
  { id: "mentorship", code: "05", title: "Mentorship", description: "One-on-one sessions with working pilots", status: "upcoming" },
  { id: "career", code: "06", title: "Career", description: "Airline readiness, interview prep, career mapping", status: "upcoming" },
  { id: "flight_deck", code: "07", title: "Flight Deck", description: "Flying school — hours, check rides, command", status: "upcoming" },
];

export const mockNextClass: ClassSession = {
  id: "cls-101",
  title: "Technical General",
  subject: "Aircraft Systems",
  instructor: "Capt. Rajesh Nair",
  startsAt: "2026-06-12T18:00:00+05:30",
  endsAt: "2026-06-12T19:30:00+05:30",
  mode: "online",
  meetingLink: "https://meet.google.com/abc-defg-hij",
  canJoin: true,
};

export const mockUpcomingClasses: ClassSession[] = [
  mockNextClass,
  {
    id: "cls-102",
    title: "Air Navigation",
    subject: "Navigation",
    instructor: "Capt. Priya Sharma",
    startsAt: "2026-06-14T10:00:00+05:30",
    endsAt: "2026-06-14T11:30:00+05:30",
    mode: "online",
    meetingLink: "https://meet.google.com/klm-nopq-rst",
    canJoin: false,
  },
  {
    id: "cls-103",
    title: "Meteorology",
    subject: "Weather Systems",
    instructor: "Capt. Rajesh Nair",
    startsAt: "2026-06-16T16:00:00+05:30",
    endsAt: "2026-06-16T17:30:00+05:30",
    mode: "offline",
    location: "UDA Ground Campus, Block A",
    canJoin: false,
  },
];

export const mockAttendanceSummary = {
  percent: 92,
  present: 23,
  absent: 2,
  excused: 1,
  total: 26,
};

export const mockAttendanceHistory: AttendanceRecord[] = [
  { id: "att-1", date: "2026-06-10", classTitle: "Regulations", subject: "Air Law", status: "present" },
  { id: "att-2", date: "2026-06-08", classTitle: "Technical General", subject: "Aircraft Systems", status: "present" },
  { id: "att-3", date: "2026-06-05", classTitle: "Navigation", subject: "Air Navigation", status: "absent" },
  { id: "att-4", date: "2026-06-03", classTitle: "Meteorology", subject: "Weather Systems", status: "present" },
  { id: "att-5", date: "2026-06-01", classTitle: "Radio Telephony", subject: "Communications", status: "excused" },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "DGCA Paper 2 mock examination — June 20",
    excerpt: "All B-07 students must register for the scheduled mock exam.",
    body: "The mock examination for DGCA Paper 2 will be held on June 20 at 10:00 IST. Report to Block A by 09:30. Bring your student ID and approved materials.",
    priority: "urgent",
    publishedAt: "2026-06-11T09:00:00+05:30",
    read: false,
    hasAttachment: true,
  },
  {
    id: "ann-2",
    title: "Mentorship session — career pathways in regional aviation",
    excerpt: "Optional session with Capt. Sharma this Friday.",
    body: "Join us for an open mentorship session covering regional airline pathways, interview preparation, and DGCA licensing timelines.",
    priority: "important",
    publishedAt: "2026-06-09T14:00:00+05:30",
    read: false,
  },
  {
    id: "ann-3",
    title: "Updated class schedule for monsoon week",
    excerpt: "Minor timing adjustments for offline sessions.",
    body: "Due to weather conditions, offline sessions on June 16–18 will start 30 minutes earlier. Check your schedule for details.",
    priority: "normal",
    publishedAt: "2026-06-07T11:00:00+05:30",
    read: true,
  },
];

export const mockSubjects: SubjectProgress[] = [
  { id: "sub-1", name: "Air Regulations", modulesTotal: 12, modulesComplete: 12, percent: 100, mentorFeedback: "Exam-ready." },
  { id: "sub-2", name: "Air Navigation", modulesTotal: 14, modulesComplete: 9, percent: 64, upcomingTask: "Complete wind triangle exercises" },
  { id: "sub-3", name: "Technical General", modulesTotal: 16, modulesComplete: 11, percent: 68, mentorFeedback: "Focus on powerplant systems." },
  { id: "sub-4", name: "Meteorology", modulesTotal: 10, modulesComplete: 6, percent: 60, upcomingTask: "Weather chart interpretation quiz" },
];

export const mockMentor: MentorInfo = {
  id: "men-1",
  name: "Capt. Priya Sharma",
  title: "Senior Mentor · Regional Airline Captain",
  email: "priya.sharma@upsidedownaviation.com",
  nextSession: "2026-06-14T15:00:00+05:30",
  recentNote: "Strong analytical skills in navigation. Recommend increasing mock exam frequency before Paper 2.",
};

export function computeOverallProgress(stages: JourneyStage[]): number {
  const weighted = stages.filter((s) => s.percent !== undefined);
  if (!weighted.length) return 0;
  return Math.round(weighted.reduce((sum, s) => sum + (s.percent ?? 0), 0) / stages.length);
}

export function getActiveStage(stages: JourneyStage[]): JourneyStage {
  return stages.find((s) => s.status === "active") ?? stages[0];
}

export function formatClassTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

export function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
