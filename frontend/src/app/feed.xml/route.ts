import { NextResponse } from "next/server";
import { fetchApi } from "@/lib/api-client";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";

export const revalidate = 300;

function escXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function GET() {
  const base = getSiteUrl();
  let posts: BlogPost[] = [];
  try {
    const res = await fetchApi("/blogs");
    if (res.ok) posts = await res.json();
  } catch {
    /* RSS channel still valid */
  }

  const items = posts
    .filter((p) => p.slug && p.title)
    .map((post) => {
      const link = `${base}/blog/${post.slug}`;
      const pub = post.updatedAt || post.createdAt || new Date().toISOString();
      const desc = escXml((post.excerpt || "").slice(0, 800));
      return [
        "<item>",
        `<title>${escXml(post.title)}</title>`,
        `<link>${link}</link>`,
        `<guid isPermaLink="true">${link}</guid>`,
        `<pubDate>${new Date(pub).toUTCString()}</pubDate>`,
        `<description>${desc}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escXml(`${SITE_NAME} — Neurosurgery blog`)}</title>
<link>${base}/blog</link>
<description>${escXml(`Brain and spine articles from ${SITE_NAME} — neurosurgeon in Surat, Ahmedabad, Gujarat.`)}</description>
<language>en-in</language>
<atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
