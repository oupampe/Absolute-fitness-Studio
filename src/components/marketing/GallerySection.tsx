import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "./GalleryGrid";

/** Connect with Us / gallery (PROMPT §3.1.6). */
export function GallerySection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Connect with us"
          title="Inside the Studio"
          description="A look at the space, the sessions and the community you'll be joining."
          align="center"
          className="mx-auto items-center"
        />
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </Container>
    </section>
  );
}
