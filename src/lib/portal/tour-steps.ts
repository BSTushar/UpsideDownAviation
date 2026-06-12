export type SpotlightStep = {
  /** data-tour attribute value — null = centred finish card */
  target: string | null;
  title: string;
  body: string;
};

/** Targets in the sidebar — mobile menu opens for these */
export const SIDEBAR_TOUR_TARGETS = new Set(["tour-sidebar"]);

export function buildSpotlightSteps(firstName: string): SpotlightStep[] {
  return [
    {
      target: "tour-preview-banner",
      title: `Welcome, ${firstName}`,
      body: "Preview mode with sample student data. The gold bar stays visible so nobody mistakes this for a live account.",
    },
    {
      target: "tour-sidebar",
      title: "Navigation",
      body: "Your portal menu: Command Center (home), My Journey, Schedule, Attendance, Announcements, Course Progress, Mentorship, and Profile. On mobile, tap the menu icon if the sidebar is hidden.",
    },
    {
      target: "tour-page-header",
      title: "Command Center",
      body: "Your dashboard home — today's overview and current training stage at a glance.",
    },
    {
      target: "tour-welcome",
      title: "Your greeting",
      body: "Name, DGCA program, batch, current stage, and overall journey progress.",
    },
    {
      target: "tour-journey-strip",
      title: "Journey stages",
      body: "All seven stages from Dream to Flight Deck — the highlighted one is where you are now.",
    },
    {
      target: "tour-next-class",
      title: "Next class",
      body: "Upcoming session with subject, time, instructor, and Join when live.",
    },
    {
      target: "tour-upcoming",
      title: "Upcoming schedule",
      body: "Classes ahead this week. View all opens the full calendar.",
    },
    {
      target: "tour-attendance",
      title: "Attendance",
      body: "Overall presence across sessions — important for DGCA eligibility.",
    },
    {
      target: "tour-announcements-bell",
      title: "Announcements",
      body: "Bell icon shows unread batch updates — exam dates, schedule changes, mentor notes.",
    },
    {
      target: "tour-mentor",
      title: "Mentor checkpoint",
      body: "Latest feedback from your assigned aviator mentor on the dashboard.",
    },
    {
      target: null,
      title: "You're ready",
      body: `Explore freely, ${firstName}. Tap Exit preview in the gold bar when your team is done.`,
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
