import Image from "next/image";
import { cn } from "@/lib/cn";

const SIZES = {
  sm: { px: 40, className: "h-10 w-10 rounded-[12px]" },
  md: { px: 56, className: "h-14 w-14 rounded-[14px]" },
  lg: { px: 72, className: "h-[72px] w-[72px] rounded-[18px]" },
  xl: { px: 112, className: "h-28 w-28 rounded-[28px]" },
} as const;

type Props = {
  size?: keyof typeof SIZES;
  className?: string;
  priority?: boolean;
};

/** Original logo mark — PNG untouched. */
export function BrandLogo({ size = "sm", className, priority }: Props) {
  const s = SIZES[size];

  return (
    <Image
      src="/logo-mark.png"
      alt="Upside Down Aviation"
      width={s.px}
      height={s.px}
      priority={priority}
      className={cn(s.className, "object-contain", className)}
    />
  );
}
