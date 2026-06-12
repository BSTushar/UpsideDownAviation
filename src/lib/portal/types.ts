import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Route,
  Calendar,
  ClipboardCheck,
  Megaphone,
  TrendingUp,
  Users,
  User,
  GraduationCap,
  Layers,
  BookOpen,
  BarChart3,
  Settings,
} from "lucide-react";

/** Seven-stage aviation journey — shared with public site */
export type JourneyStageId =
  | "dream"
  | "learning"
  | "training"
  | "examination"
  | "mentorship"
  | "career"
  | "flight_deck";

export type JourneyStageStatus = "complete" | "active" | "upcoming";

export type JourneyStage = {
  id: JourneyStageId;
  code: string;
  title: string;
  description: string;
  status: JourneyStageStatus;
  percent?: number;
  mentorNote?: string;
};

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: "student" | "mentor" | "admin" | "super_admin";
  program: string;
  batch: string;
  enrollmentDate: string;
};

export type ClassSession = {
  id: string;
  title: string;
  subject: string;
  instructor: string;
  startsAt: string;
  endsAt: string;
  mode: "online" | "offline";
  meetingLink?: string;
  location?: string;
  canJoin: boolean;
};

export type AttendanceRecord = {
  id: string;
  date: string;
  classTitle: string;
  subject: string;
  status: "present" | "absent" | "excused";
};

export type Announcement = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  priority: "normal" | "important" | "urgent";
  publishedAt: string;
  read: boolean;
  hasAttachment?: boolean;
};

export type SubjectProgress = {
  id: string;
  name: string;
  modulesTotal: number;
  modulesComplete: number;
  percent: number;
  mentorFeedback?: string;
  upcomingTask?: string;
};

export type MentorInfo = {
  id: string;
  name: string;
  title: string;
  email: string;
  avatarUrl?: string;
  nextSession?: string;
  recentNote?: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const STUDENT_NAV: NavItem[] = [
  { label: "Command Center", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "My Journey", href: "/portal/journey", icon: Route },
  { label: "Schedule", href: "/portal/schedule", icon: Calendar },
  { label: "Attendance", href: "/portal/attendance", icon: ClipboardCheck },
  { label: "Announcements", href: "/portal/announcements", icon: Megaphone },
  { label: "Course Progress", href: "/portal/progress", icon: TrendingUp },
  { label: "Mentorship", href: "/portal/mentorship", icon: Users },
  { label: "Profile", href: "/portal/profile", icon: User },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Programs", href: "/admin/programs", icon: BookOpen },
  { label: "Batches", href: "/admin/batches", icon: Layers },
  { label: "Classes", href: "/admin/classes", icon: Calendar },
  { label: "Attendance", href: "/admin/attendance", icon: ClipboardCheck },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const JOURNEY_STAGE_LABELS: Record<JourneyStageId, string> = {
  dream: "Dream",
  learning: "Learning",
  training: "Training",
  examination: "Examination",
  mentorship: "Mentorship",
  career: "Career",
  flight_deck: "Flight Deck",
};
