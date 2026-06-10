import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "./BlogCard";
import { POSTS } from "@/lib/blog";

/** Latest Tips teaser — the three seed posts (PROMPT §3.1.3). */
export function BlogTeaser() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="From the blog" title="Latest Tips" />
          <ButtonLink href="/blog" variant="secondary" size="sm">
            View All
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal as="article" key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
