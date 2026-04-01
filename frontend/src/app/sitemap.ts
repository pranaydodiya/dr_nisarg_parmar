import type { MetadataRoute } from "next";
import { fetchApi } from "@/lib/api-client";
import { getSiteUrl } from "@/lib/seo";

type ChangeFreq = MetadataRoute.Sitemap[0]["changeFrequency"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const staticEntries: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/neurosurgeon-in-surat", changeFrequency: "weekly", priority: 0.95 },
    { path: "/neurosurgeon-in-ahmedabad", changeFrequency: "weekly", priority: 0.95 },
    { path: "/about", changeFrequency: "monthly", priority: 0.85 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
    { path: "/testimonials", changeFrequency: "weekly", priority: 0.85 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
    { path: "/specialties", changeFrequency: "monthly", priority: 0.9 },
    { path: "/appointments", changeFrequency: "monthly", priority: 0.85 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticEntries.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? baseUrl : `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetchApi("/blogs");
    if (res.ok) {
      const blogs = await res.json();
      blogRoutes = (blogs as { slug: string; updatedAt?: string; createdAt?: string }[]).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt
          ? new Date(post.updatedAt)
          : post.createdAt
            ? new Date(post.createdAt)
            : new Date(),
        changeFrequency: "monthly" as ChangeFreq,
        priority: 0.65,
      }));
    }
  } catch {
    /* sitemap still valid without dynamic posts */
  }

  return [...staticRoutes, ...blogRoutes];
}
