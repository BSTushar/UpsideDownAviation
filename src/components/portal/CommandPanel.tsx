import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  dataTour?: string;
};

/** Command center panel — glass variant of design system Card */
export function CommandPanel({ title, children, className, action, dataTour }: Props) {
  return (
    <section data-tour={dataTour} className={cn("glass-panel", className)}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="type-caption text-plum">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function CommandGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-3", className)}>
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
  dataTour,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  dataTour?: string;
}) {
  return (
    <header
      data-tour={dataTour}
      className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <h1 className="type-heading-sm text-bone-white md:type-heading">{title}</h1>
        {description && <p className="mt-1 type-body-sm text-slate">{description}</p>}
      </div>
      {action}
    </header>
  );
}
