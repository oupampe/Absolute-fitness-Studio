"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";
import { NAV_LINKS, FOOTER_LEGAL, SITE } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  // The dashboard and auth screens have their own chrome — no marketing footer.
  const hidden = ["/dashboard", "/login", "/signup", "/forgot-password"];
  if (hidden.some((p) => pathname.startsWith(p))) return null;

  return (
    <footer className="mt-24 border-t border-white/5 bg-bg">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.4fr]">
          {/* Brand + blurb */}
          <div className="flex flex-col gap-4">
            <Wordmark className="text-xl" />
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Where health meets community. Tailored fitness solutions for busy lifestyles in Lawley
              and beyond.
            </p>
            <div className="mt-1 flex items-center gap-3">
              <SocialLink href={SITE.socials.facebook} label="Facebook">
                <Facebook size={18} />
              </SocialLink>
              <SocialLink href={SITE.socials.instagram} label="Instagram">
                <Instagram size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="eyebrow">Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted transition hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="eyebrow">Get in touch</h3>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              {SITE.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition hover:text-text">
                    <Phone size={15} className="shrink-0 text-accent" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 break-all transition hover:text-text">
                  <Mail size={15} className="shrink-0 text-accent" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>{SITE.address.full}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LEGAL.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-text-muted transition hover:text-text">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-text-muted">© 2025 {SITE.name}</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-text-muted transition hover:bg-card hover:text-text"
    >
      {children}
    </a>
  );
}
