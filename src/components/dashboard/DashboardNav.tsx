"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, CreditCard, Sparkles, User, ReceiptText, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/subscription", label: "My Subscription", icon: CreditCard },
  { href: "/dashboard/content", label: "My Content", icon: Sparkles },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/billing", label: "Billing", icon: ReceiptText },
];

export function DashboardNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => {
        const active = isActive(link.href, link.exact);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-card-sm px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-surface-2 font-bold text-text"
                : "font-normal text-text-muted hover:bg-surface-2 hover:text-text",
            )}
          >
            <link.icon size={18} className={active ? "text-accent" : ""} />
            {link.label}
          </Link>
        );
      })}

      <div className="my-2 h-px bg-white/5" />

      <Link
        href="/"
        className="flex items-center gap-3 rounded-card-sm px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
      >
        <Home size={18} />
        Back to site
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 rounded-card-sm px-3 py-2.5 text-left text-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
      >
        <LogOut size={18} />
        Log out
      </button>
    </nav>
  );
}
