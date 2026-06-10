import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import { LEGAL, getLegal } from "@/lib/legal";

export function generateStaticParams() {
  return LEGAL.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doc = getLegal(params.slug);
  if (!doc) return { title: "Not found" };
  return { title: doc.title, description: doc.intro };
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = getLegal(params.slug);
  if (!doc) notFound();

  const updated = new Date(doc.updated).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} description={doc.intro} />
      <section className="py-16">
        <Container className="max-w-3xl">
          <p className="text-xs uppercase tracking-label text-text-muted">Last updated {updated}</p>
          <div className="mt-10 flex flex-col gap-10">
            {doc.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-feature-heading text-text-bright">{section.heading}</h2>
                {section.body.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-text-muted">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
