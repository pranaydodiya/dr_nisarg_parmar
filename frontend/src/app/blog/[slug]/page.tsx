import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/api-client";
import { sanitizeRichHtml } from "@/lib/sanitize";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) return { title: "Post not found" };
  
  let post = null;
  try {
    const res = await fetchApi(`/blogs/${slug}`);
    if (res.ok) post = await res.json();
  } catch(e) {}

  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Dr. Nisarg Parmar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) notFound();

  let post = null;
  try {
    const res = await fetchApi(`/blogs/${slug}`);
    if (res.ok) post = await res.json();
  } catch(e) {}

  if (!post) notFound();

  const body = sanitizeRichHtml(post.content ?? "<p>Content coming soon.</p>");

  return (
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
            {post.category} • {formatDate(post.createdAt)}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {post.title}
          </h1>
        </header>
        {post.featuredImage && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-8">
            <Image
              src={post.featuredImage}
              alt={post.title}
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
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full ml-3"
            asChild
          >
            <Link href="/appointments">Book Appointment</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
