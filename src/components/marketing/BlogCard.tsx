import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

/** Album-style blog tile used on the home teaser and the blog listing. */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-4 rounded-card bg-surface p-4 transition-all duration-300 ease-out-soft hover:bg-surface-2 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card-sm shadow-card">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-base font-bold leading-snug text-text-bright group-hover:text-text">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">{post.excerpt}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={13} />
            {post.readTime}
          </span>
          <span className="label-voice text-text-muted transition-colors group-hover:text-accent">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}
