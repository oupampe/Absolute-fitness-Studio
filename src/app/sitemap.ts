import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { POSTS } from "@/lib/blog";
import { LEGAL } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = ["", "/about", "/classes", "/blog", "/videos", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogRoutes = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalRoutes = LEGAL.map((d) => ({
    url: `${base}/legal/${d.slug}`,
    lastModified: new Date(d.updated),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...blogRoutes, ...legalRoutes];
}
