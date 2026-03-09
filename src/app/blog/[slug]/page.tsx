import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MOCK_BLOG_POSTS, MOCK_BLOG_POST_BODIES } from "@/content/mock-data";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Dr. Nisarg Parmar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = MOCK_BLOG_POST_BODIES[post.slug] ?? "<p>Content coming soon.</p>";

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
            {post.category} • {formatDate(post.publishDate)}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {post.title}
          </h1>
        </header>
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-8">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
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
  );
}
