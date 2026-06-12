/** Design token exports — mirrors tokens.css for programmatic use */

export const colors = {
  void: "#07111f",
  surface: "#0e1c2f",
  accent: "#d4af7a",
  boneWhite: "#ffffff",
  slate: "#8ba3bf",
  graphite: "#1a3049",
  smoke: "#6b8499",
  iron: "#243b55",
  cinder: "#0a1628",
  stormGray: "#2a4563",
} as const;

export const motion = {
  easeSignature: "cubic-bezier(0.16, 1, 0.3, 1)",
  durInstant: 150,
  durMicro: 250,
  durStandard: 300,
  durReveal: 700,
  durCinematic: 800,
  staggerSm: 80,
  staggerMd: 120,
} as const;

export const layout = {
  pageMaxWidth: 1280,
  sectionGap: 80,
  cardPadding: 24,
  elementGap: 16,
} as const;

export const radii = {
  nav: 8,
  cards: 19.2,
  badges: 8,
  inputs: 8,
  buttons: 9999,
} as const;

export type ColorToken = keyof typeof colors;
export type MotionToken = keyof typeof motion;
