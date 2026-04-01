import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { fetchApi } from "@/lib/api-client";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCAL_KEYWORDS_PRIMARY } from "@/content/local-seo";
import { buildPageMetadata, getSiteUrl, SITE_NAME } from "@/lib/seo";

const blogMeta = buildPageMetadata({
  path: "/blog",
  title: `Neurosurgery Blog | Brain & Spine Articles | ${SITE_NAME}`,
  description:
    "Expert articles on brain tumors, spine surgery, neurotrauma, and recovery from NIMHANS-trained neurosurgeon Dr. Nisarg Parmar — Surat, Ahmedabad, Gujarat.",
  keywords: [
    "neurosurgery blog India",
    "spine health articles",
    "brain tumor information",
    ...LOCAL_KEYWORDS_PRIMARY.slice(0, 6),
  ],
});

export const metadata: Metadata = {
  ...blogMeta,
  alternates: {
    ...blogMeta.alternates,
    types: {
      "application/rss+xml": `${getSiteUrl()}/feed.xml`,
    },
  },
};

function formatDate(dateStr: string | undefined) {
  if (!dateStr?.trim()) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const revalidate = 120;

type BlogCard = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  createdAt?: string;
  featuredImage?: string;
};

export default async function BlogListPage() {
  let blogs: BlogCard[] = [];
  try {
    const res = await fetchApi("/blogs");
    if (res.ok) {
      blogs = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  }

  const base = getSiteUrl();
  const blogListLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} — Neurosurgery & spine blog`,
    url: `${base}/blog`,
    description:
      "Articles on brain and spine conditions, surgery, and recovery for patients in Gujarat.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: base,
    },
    blogPost: blogs.slice(0, 40).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${base}/blog/${post.slug}`,
      ...(post.createdAt ? { datePublished: post.createdAt } : {}),
    })),
  };

  return (
    <div className="pt-10 pb-20 md:pt-16 md:pb-24">
      <JsonLd data={blogListLd} />
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Blog"
          subtitle="Insights on brain and spine care, surgery, and recovery — written for patients and families in Surat, Ahmedabad, and across Gujarat."
          className="mb-12"
        />
        <p className="max-w-2xl mx-auto text-center text-sm text-muted-foreground mb-10 -mt-6">
          Subscribe via{" "}
          <a href="/feed.xml" className="text-secondary underline-offset-2 hover:underline font-medium">
            RSS feed
          </a>{" "}
          for new posts. Topics include neurosurgery, spine health, and brain health.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block focus-visible:ring-2 ring-ring rounded-xl overflow-hidden"
            >
              <Card className="border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative aspect-video bg-muted">
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:opacity-95 transition-opacity pt-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <CardContent className="pt-5 pb-5 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground mb-1">
                    {[
                      post.category,
                      formatDate(post.createdAt),
                    ]
                      .filter(Boolean)
                      .join(" • ") || "Article"}
                  </p>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="text-secondary font-medium text-sm mt-2 inline-block">
                    Read more →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
