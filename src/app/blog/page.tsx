import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/marketing/BlogCard";
import { PageHeader } from "@/components/marketing/PageHeader";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips on training, flexible memberships and personalised plans from the coaches at Absolute Fitness Studio.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="From the blog"
        title="Latest Tips"
        description="Practical advice on training, consistency and getting the most from your membership."
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, i) => (
              <Reveal as="article" key={post.slug} delay={i * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
