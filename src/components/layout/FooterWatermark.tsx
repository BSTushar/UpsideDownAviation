/** Faint compass rose watermark for footer background (~2.5% opacity). */
export function FooterWatermark() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 h-[min(520px,90vw)] w-[min(520px,90vw)] -translate-x-[18%] translate-y-[22%] text-white/[0.025]"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
    >
      <circle cx="200" cy="200" r="168" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M200 24 L212 168 L200 200 L188 168 Z M200 376 L188 232 L200 200 L212 232 Z M24 200 L168 188 L200 200 L168 212 Z M376 200 L232 212 L200 200 L232 188 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M200 56 L218 184 L200 200 L182 184 Z M344 200 L216 182 L200 200 L216 218 Z M200 344 L182 216 L200 200 L218 216 Z M56 200 L184 218 L200 200 L184 182 Z"
        fill="currentColor"
        opacity="0.45"
      />
      <circle cx="200" cy="200" r="10" fill="currentColor" />
    </svg>
  );
}
