"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Calendar,
  MessageSquare,
  DollarSign,
  Star,
  Users,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/services", label: "Services", icon: Package },
  { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { href: "/dashboard/dms", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
  { href: "/dashboard/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-56 flex-col border-r border-border bg-surface">
        <div className="p-4 border-b border-border">
          <Link href="/" className="text-lg font-bold">
            creatorhub
          </Link>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-surface-alt text-foreground"
                    : "text-muted hover:text-foreground hover:bg-surface-alt"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border bg-surface flex items-center px-6 md:hidden">
          <Link href="/" className="text-lg font-bold">
            creatorhub
          </Link>
        </header>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-border px-4 py-2 md:hidden">
          {navItems.slice(0, 5).map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                  active
                    ? "bg-foreground text-background"
                    : "bg-surface-alt text-muted"
                )}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
