import sanitizeHtml from "sanitize-html";

/**
 * Sanitize rich HTML content (blog posts, etc.).
 * Allows common formatting tags but strips scripts, event handlers, etc.
 */
export function sanitizeRichHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "figure",
      "figcaption",
      "video",
      "source",
      "iframe",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
      a: ["href", "target", "rel", "title"],
      iframe: ["src", "width", "height", "frameborder", "allowfullscreen", "loading", "title", "style"],
      video: ["src", "controls", "width", "height", "poster"],
      source: ["src", "type"],
      "*": ["class", "id", "style"],
    },
    allowedIframeHostnames: [
      "www.youtube.com",
      "youtube.com",
      "www.google.com",
      "maps.google.com",
      "player.vimeo.com",
    ],
    allowedSchemes: ["http", "https", "mailto"],
  });
}

/**
 * Sanitize Google Maps embed code — only allow iframe tags from Google.
 */
export function sanitizeGmapEmbed(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: ["iframe"],
    allowedAttributes: {
      iframe: [
        "src",
        "width",
        "height",
        "style",
        "frameborder",
        "allowfullscreen",
        "loading",
        "referrerpolicy",
        "title",
      ],
    },
    allowedIframeHostnames: [
      "www.google.com",
      "maps.google.com",
      "google.com",
    ],
  });
}

/**
 * Strip ALL HTML tags — for plain-text fields (names, phones, emails, etc.).
 */
export function stripHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

/**
 * Safely serialize data for embedding inside a <script> tag.
 * Prevents `</script>` breakout attacks in JSON-LD.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/<\//g, "<\\/");
}
