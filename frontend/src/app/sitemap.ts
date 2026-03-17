import { MetadataRoute } from "next";
import { fetchApi } from "@/lib/api-client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://drnisargparmar.com";

  // Define static routes
  const staticRoutes = ["", "/about", "/contact", "/testimonials", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: (route === "" || route === "/blog") ? "weekly" : "monthly" as any,
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch dynamic blog routes
  let dynamicRoutes: any[] = [];
  try {
    const res = await fetchApi("/blogs");
    if (res.ok) {
      const blogs = await res.json();
      dynamicRoutes = blogs.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
        changeFrequency: "monthly" as any,
        priority: 0.6,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch blogs for sitemap:", err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
