import { cn } from "@/lib/cn";

type Props = {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  variant?: "default" | "accent";
};

export function ProgressBar({ value, max = 100, label, className, variant = "default" }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <div className="flex justify-between type-mono-label text-slate">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-1 w-full overflow-hidden rounded-full bg-graphite">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-reveal ease-signature",
            variant === "accent" ? "bg-iris" : "bg-bone-white"
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  strokeWidth = 2,
  className,
}: Props & { size?: number; strokeWidth?: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg width={size} height={size} className={cn("-rotate-90", className)} aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-graphite)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-iris)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-reveal ease-signature"
      />
    </svg>
  );
}

export function ProgressSteps({
  steps,
  current,
  className,
}: {
  steps: string[];
  current: number;
  className?: string;
}) {
  return (
    <ol className={cn("flex items-center gap-2", className)}>
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border type-mono-label text-caption",
              i <= current
                ? "border-iris text-iris"
                : "border-storm-gray text-slate"
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          {i < steps.length - 1 && (
            <span
              className={cn(
                "h-px w-8",
                i < current ? "bg-iris" : "bg-graphite"
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
