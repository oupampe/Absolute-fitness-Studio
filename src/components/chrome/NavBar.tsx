"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";
import { ButtonLink } from "@/components/ui/Button";

export function NavBar() {
  const pathname = usePathname();
  const { status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auth pages and the dashboard render their own chrome — hide the marketing nav.
  const hideOn = ["/login", "/signup", "/forgot-password"];
  if (hideOn.some((p) => pathname.startsWith(p)) || pathname.startsWith("/dashboard")) {
    return null;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-300",
          scrolled ? "bg-bg/90 shadow-card backdrop-blur" : "bg-bg",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-6 lg:px-8">
          <Wordmark />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors",
                    isActive(link.href)
                      ? "font-bold text-text"
                      : "font-normal text-text-muted hover:text-text",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            {status === "authenticated" ? (
              <UserMenu />
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <ButtonLink href="/login" variant="outline" size="sm">
                  Log In
                </ButtonLink>
                <ButtonLink href="/signup" variant="primary" size="sm">
                  Join Now
                </ButtonLink>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text hover:bg-surface-2 md:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isActive={isActive}
        authenticated={status === "authenticated"}
      />
    </>
  );
}
