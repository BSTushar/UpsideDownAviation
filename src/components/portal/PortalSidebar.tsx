"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_TOUR_IDS } from "@/lib/portal/tour-steps";
import type { NavItem } from "@/lib/portal/types";

type Props = {
  nav: NavItem[];
  open?: boolean;
  onClose?: () => void;
  footer?: React.ReactNode;
};

export function PortalSidebar({ nav, open, onClose, footer }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-void/60 backdrop-blur-sm transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        data-tour="tour-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-graphite bg-void transition-transform duration-reveal ease-signature md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex-1 overflow-y-auto p-3 pt-4">
          <span className="mb-3 block px-3 type-caption text-slate">Navigation</span>
          <ul className="flex flex-col gap-0.5">
            {nav.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href + "/")) ||
                (item.href === "/admin" && pathname === "/admin");

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-tour={NAV_TOUR_IDS[item.href]}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-nav px-3 py-2.5 type-body-sm transition-colors",
                      active
                        ? "border border-plum/30 bg-aubergine/30 text-bone-white"
                        : "text-slate hover:bg-graphite/30 hover:text-bone-white"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {footer && <div className="border-t border-graphite p-4">{footer}</div>}
      </aside>
    </>
  );
}
