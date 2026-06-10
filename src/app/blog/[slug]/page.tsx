import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CTABand } from "@/components/marketing/CTABand";
import { POSTS, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const dateLabel = new Date(post.date).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted transition hover:text-text"
          >
            <ArrowLeft size={16} /> Back to blog
          </Link>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-label text-text-muted">
              <span>{dateLabel}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-text-bright sm:text-4xl">
              {post.title}
            </h1>
          </div>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-card shadow-card">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="mt-10 flex flex-col gap-6">
            {post.body.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-text-muted">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/5 pt-8">
            <span className="text-sm text-text-muted">Ready to put this into practice?</span>
            <ButtonLink href="/signup" variant="primary" size="md">
              Join Now
            </ButtonLink>
          </div>
        </Container>
      </article>

      <CTABand />
    </>
  );
}
