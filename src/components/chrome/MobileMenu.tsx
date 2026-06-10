"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { ButtonLink, Button } from "@/components/ui/Button";

/** Slide-in mobile menu with a focus trap + Esc-to-close. */
export function MobileMenu({
  open,
  onClose,
  isActive,
  authenticated,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
  authenticated: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    // Focus the first focusable element in the panel
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <div
        className={cn(
          "absolute inset-0 bg-black/70 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-surface px-6 pb-8 pt-5 shadow-dialog transition-transform duration-300 ease-out-soft",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Wordmark />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text hover:bg-surface-2"
          >
            <X size={22} />
          </button>
        </div>

        <ul className="mt-8 flex flex-1 flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(
                  "block rounded-card-sm px-3 py-3 text-lg transition-colors",
                  isActive(link.href)
                    ? "font-bold text-text"
                    : "font-normal text-text-muted hover:bg-surface-2 hover:text-text",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/5 pt-6">
          {authenticated ? (
            <>
              <ButtonLink href="/dashboard" variant="primary" size="lg" onClick={onClose}>
                Dashboard
              </ButtonLink>
              <Button variant="outline" size="lg" onClick={() => signOut({ callbackUrl: "/" })}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <ButtonLink href="/signup" variant="primary" size="lg" onClick={onClose}>
                Join Now
              </ButtonLink>
              <ButtonLink href="/login" variant="outline" size="lg" onClick={onClose}>
                Log In
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
