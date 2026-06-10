import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import { ContactForm } from "@/components/marketing/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Absolute Fitness Studio in Lawley — phone, email, address and a contact form.",
};

const MAP_QUERY = encodeURIComponent(SITE.address.full);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk"
        description="Questions about classes, memberships or getting started? Send us a message or reach us directly."
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <DetailRow icon={<Phone size={18} />} label="Phone">
                <div className="flex flex-col gap-1">
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="text-text-muted transition hover:text-text">
                      {p}
                    </a>
                  ))}
                </div>
              </DetailRow>
              <DetailRow icon={<Mail size={18} />} label="Email">
                <a href={`mailto:${SITE.email}`} className="break-all text-text-muted transition hover:text-text">
                  {SITE.email}
                </a>
              </DetailRow>
              <DetailRow icon={<MapPin size={18} />} label="Address">
                <span className="text-text-muted">{SITE.address.full}</span>
              </DetailRow>
            </div>

            {/* Map embed placeholder */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card shadow-card">
              <iframe
                title="Absolute Fitness Studio location"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                className="h-full w-full border-0 grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </Container>
      </section>
    </>
  );
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-label text-text-muted">{label}</span>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
