export type SpotlightStep = {
  /** data-tour attribute value — null = centred finish card */
  target: string | null;
  title: string;
  body: string;
};

export function buildSpotlightSteps(firstName: string): SpotlightStep[] {
  return [
    {
      target: "tour-preview-banner",
      title: `Welcome, ${firstName}`,
      body: "You are in preview mode with sample student data. The preview bar stays visible so nobody mistakes this for a live account.",
    },
    {
      target: "tour-page-header",
      title: "Command Center",
      body: "This is the student home screen — one place to see where you are, what is next, and what needs attention today.",
    },
    {
      target: "tour-welcome",
      title: "Your dashboard greeting",
      body: "Shows your name, DGCA program, batch, current training stage, and overall journey progress as a percentage bar.",
    },
    {
      target: "tour-journey-strip",
      title: "Journey stages",
      body: "A quick view of all seven stages from Dream to Flight Deck. The highlighted stage is where you are right now.",
    },
    {
      target: "tour-next-class",
      title: "Next class",
      body: "The upcoming session with subject, time, instructor, and a Join button when the class goes live online.",
    },
    {
      target: "tour-upcoming",
      title: "Upcoming schedule",
      body: "A short list of classes ahead — online or on campus. Tap View all for the full calendar with add-to-calendar links.",
    },
    {
      target: "tour-attendance",
      title: "Attendance",
      body: "Overall presence across sessions. DGCA eligibility usually requires a minimum attendance percentage — tracked here automatically.",
    },
    {
      target: "tour-nav-journey",
      title: "My Journey",
      body: "Opens the full seven-stage timeline with descriptions, mentor notes, and completion status for each stage.",
    },
    {
      target: "tour-nav-schedule",
      title: "Schedule",
      body: "The complete class calendar — join links, offline locations, and timeline or calendar views.",
    },
    {
      target: "tour-announcements-bell",
      title: "Announcements",
      body: "The bell shows unread batch updates. Exam dates, schedule changes, and mentor sessions land here.",
    },
    {
      target: "tour-mentor",
      title: "Mentor checkpoint",
      body: "Recent feedback from your assigned aviator mentor — surfaced on the dashboard so students never miss guidance.",
    },
    {
      target: "tour-nav-profile",
      title: "Profile",
      body: "Enrollment details, contact info, and future slots for DGCA records, flight hours, and certifications.",
    },
    {
      target: null,
      title: "You are ready to explore",
      body: `Click anything freely, ${firstName}. Use Exit preview in the preview bar when your team is done.`,
    },
  ];
}

/** Map portal nav hrefs to tour anchor ids */
export const NAV_TOUR_IDS: Record<string, string> = {
  "/portal/dashboard": "tour-nav-dashboard",
  "/portal/journey": "tour-nav-journey",
  "/portal/schedule": "tour-nav-schedule",
  "/portal/attendance": "tour-nav-attendance",
  "/portal/announcements": "tour-nav-announcements",
  "/portal/progress": "tour-nav-progress",
  "/portal/mentorship": "tour-nav-mentorship",
  "/portal/profile": "tour-nav-profile",
};
