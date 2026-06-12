/** Theme configuration — dark-only per design.pdf */

export const theme = {
  name: "void",
  mode: "dark" as const,
  canvas: "var(--color-void)",
  textPrimary: "var(--color-bone-white)",
  textSecondary: "var(--color-slate)",
  accent: "var(--color-iris)",
  accentSecondary: "var(--color-plum)",
  borderDecorative: "var(--color-ash)",
  borderStructural: "var(--color-storm-gray)",
} as const;

export type Theme = typeof theme;
