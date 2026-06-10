"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

/** Authenticated avatar + dropdown (Dashboard, Profile, Log out). */
export function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const user = session?.user;
  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-surface-2 text-sm font-bold text-text ring-2 ring-transparent transition hover:ring-border-light focus-visible:ring-accent"
      >
        {user?.image ? (
          // Avatar URLs are user-provided / arbitrary OAuth hosts — plain img avoids the
          // next/image remotePatterns allowlist.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" width={36} height={36} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden>{initial}</span>
        )}
      </button>

      <div
        role="menu"
        className={cn(
          "absolute right-0 top-12 w-56 origin-top-right rounded-card bg-card p-2 shadow-dialog transition-all",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="border-b border-white/5 px-3 py-2">
          <p className="truncate text-sm font-bold text-text">{user?.name || "Member"}</p>
          {user?.email ? <p className="truncate text-xs text-text-muted">{user.email}</p> : null}
        </div>
        <MenuItem href="/dashboard" icon={<LayoutDashboard size={16} />} label="Dashboard" onClick={() => setOpen(false)} />
        <MenuItem href="/dashboard/profile" icon={<User size={16} />} label="Profile" onClick={() => setOpen(false)} />
        <button
          role="menuitem"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-1 flex w-full items-center gap-3 rounded-card-sm px-3 py-2 text-left text-sm text-text-muted transition hover:bg-surface-2 hover:text-text"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
}

function MenuItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      role="menuitem"
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-card-sm px-3 py-2 text-sm text-text-muted transition hover:bg-surface-2 hover:text-text"
    >
      {icon}
      {label}
    </Link>
  );
}
