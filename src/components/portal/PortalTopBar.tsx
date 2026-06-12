"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/constants";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV_TOUR_IDS } from "@/lib/portal/tour-steps";
import type { NavItem, PortalUser } from "@/lib/portal/types";

type Props = {
  nav: NavItem[];
  user: PortalUser;
  unreadCount?: number;
  onMenuToggle?: () => void;
  variant?: "student" | "admin";
};

export function PortalTopBar({ nav, user, unreadCount = 0, onMenuToggle, variant = "student" }: Props) {
  const pathname = usePathname();
  const announcementsHref = variant === "student" ? "/portal/announcements" : "/admin/announcements";

  return (
    <header className="sticky top-0 z-40 border-b border-graphite bg-void/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-icon border border-storm-gray p-2 text-bone-white md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <Link href={variant === "student" ? "/portal/dashboard" : "/admin"} className="flex items-center gap-2.5">
            <BrandLogo size="sm" className="hidden h-8 w-8 rounded-[10px] sm:block" />
            <span className="flex flex-col">
              <span className="type-caption text-accent">{variant === "admin" ? "Operations" : "Command Center"}</span>
              <span className="font-inktrap text-body-sm font-medium text-bone-white">{SITE.name}</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          {nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-tour={NAV_TOUR_IDS[item.href]}
              className={cn(
                "rounded-nav px-3 py-1.5 type-body-sm transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-aubergine/40 text-bone-white"
                  : "text-slate hover:text-bone-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={announcementsHref}
            data-tour="tour-announcements-bell"
            className="relative rounded-icon border border-storm-gray p-2 text-bone-white transition-colors hover:border-iris"
            aria-label={`Announcements${unreadCount ? `, ${unreadCount} unread` : ""}`}
          >
            <Bell className="h-4 w-4" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-iris text-[10px] font-medium text-void">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link
            href={variant === "student" ? "/portal/profile" : "/admin/settings"}
            data-tour="tour-nav-profile"
            className="hidden items-center gap-2 rounded-pill border border-graphite px-3 py-1.5 sm:flex"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-aubergine type-caption text-iris">
              {user.name.charAt(0)}
            </span>
            <span className="type-body-sm text-bone-white">{user.name.split(" ")[0]}</span>
          </Link>
          <Link
            href="/portal/login"
            className="rounded-icon border border-storm-gray p-2 text-slate transition-colors hover:border-iris hover:text-bone-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
