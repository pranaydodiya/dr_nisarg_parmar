import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_BLOG_POSTS } from "@/content/mock-data";

export const metadata: Metadata = {
  title: "Blog | Dr. Nisarg Parmar - Neurosurgeon",
  description: "Articles on brain and spine care, neurosurgery, and patient information from Dr. Nisarg Parmar.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogListPage() {
  return (
    <div className="pt-10 pb-20 md:pt-16 md:pb-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Blog"
          subtitle="Insights on brain and spine care, surgery, and recovery."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block focus-visible:ring-2 ring-ring rounded-xl overflow-hidden"
            >
              <Card className="border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={post.featuredImage}
                    alt=""
                    fill
                    className="object-cover group-hover:opacity-95 transition-opacity"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="pt-5 pb-5 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground mb-1">
                    {post.category} • {formatDate(post.publishDate)}
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
