import type { Metadata } from "next";

export const SITE_NAME = "Dr. Nisarg Parmar";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://drnisargparmar.com";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function defaultOgImage(): string | undefined {
  const u = process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE?.trim();
  return u || undefined;
}

type PageSeoOptions = {
  path: string;
  title: string;
  description: string;
  /** Full URL or site-relative path to image */
  imageUrl?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

export function buildPageMetadata(opts: PageSeoOptions): Metadata {
  const canonical = absoluteUrl(opts.path);
  const absImage =
    opts.imageUrl &&
    (opts.imageUrl.startsWith("http") ? opts.imageUrl : absoluteUrl(opts.imageUrl));
  const fallbackOg = defaultOgImage();
  const ogImage = absImage || fallbackOg;

  const openGraph = {
    title: opts.title,
    description: opts.description,
    url: canonical,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: opts.ogType ?? "website",
    ...(ogImage && {
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
    }),
    ...(opts.ogType === "article" && opts.publishedTime
      ? { publishedTime: opts.publishedTime }
      : {}),
    ...(opts.ogType === "article" && opts.modifiedTime
      ? { modifiedTime: opts.modifiedTime }
      : {}),
  } satisfies NonNullable<Metadata["openGraph"]>;

  return {
    title: { absolute: opts.title },
    description: opts.description,
    ...(opts.keywords?.length && { keywords: opts.keywords }),
    alternates: { canonical },
    openGraph,
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: opts.title,
      description: opts.description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: { index: true, follow: true },
  };
}
