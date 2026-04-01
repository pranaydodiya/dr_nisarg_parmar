import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/api-client";
import { sanitizeRichHtml } from "@/lib/sanitize";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, getSiteUrl, SITE_NAME } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
    return { title: { absolute: "Post not found" }, robots: { index: false, follow: false } };
  }

  let post: Record<string, unknown> | null = null;
  try {
    const res = await fetchApi(`/blogs/${slug}`);
    if (res.ok) post = await res.json();
  } catch {
    /* empty */
  }

  if (!post || typeof post.title !== "string") {
    return { title: { absolute: "Post not found" }, robots: { index: false, follow: false } };
  }

  const excerpt = typeof post.excerpt === "string" ? post.excerpt : "";
  const featuredImage = typeof post.featuredImage === "string" ? post.featuredImage : undefined;
  const createdAt = typeof post.createdAt === "string" ? post.createdAt : undefined;
  const updatedAt = typeof post.updatedAt === "string" ? post.updatedAt : createdAt;

  return buildPageMetadata({
    path: `/blog/${slug}`,
    title: `${post.title} | Blog`,
    description: excerpt || `${post.title} — neurosurgery and spine care insights from ${SITE_NAME}.`,
    imageUrl: featuredImage,
    ogType: "article",
    publishedTime: createdAt,
    modifiedTime: updatedAt,
    keywords: ["neurosurgery blog", "spine health", "brain health", "Gujarat neurosurgeon"],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) notFound();

  let post: Record<string, unknown> | null = null;
  try {
    const res = await fetchApi(`/blogs/${slug}`);
    if (res.ok) post = await res.json();
  } catch {
    /* empty */
  }

  if (!post || typeof post.title !== "string") notFound();

  const body = sanitizeRichHtml(
    typeof post.content === "string" ? post.content : "<p>Content coming soon.</p>",
  );
  const base = getSiteUrl();
  const url = `${base}/blog/${slug}`;
  const title = post.title as string;
  const excerpt = typeof post.excerpt === "string" ? post.excerpt : "";
  const featuredImage = typeof post.featuredImage === "string" ? post.featuredImage : undefined;
  const createdAt = typeof post.createdAt === "string" ? post.createdAt : new Date().toISOString();
  const updatedAt = typeof post.updatedAt === "string" ? post.updatedAt : createdAt;
  const category = typeof post.category === "string" ? post.category : "Health";

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: createdAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: base,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(featuredImage && { image: [featuredImage] }),
    articleSection: category,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={blogPosting} />
      <JsonLd data={breadcrumbs} />
      <article className="py-16 md:py-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block focus-visible:ring-2 ring-ring rounded"
          >
            ← Back to Blog
          </Link>
          <header className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              {category} • {formatDate(createdAt)}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
            {excerpt ? (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{excerpt}</p>
            ) : null}
          </header>
          {featuredImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-8">
              <Image
                src={featuredImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          )}
          <div
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-p:text-muted-foreground prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div className="mt-10 pt-6 border-t border-border">
            <Button variant="outline" size="sm" className="rounded-full" asChild>
              <Link href="/blog">All posts</Link>
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full ml-3" asChild>
              <Link href="/appointments">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
