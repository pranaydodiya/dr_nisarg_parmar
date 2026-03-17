import sanitizeHtml from "sanitize-html";

export function sanitizeRichHtml(dirty) {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img", "h1", "h2", "h3", "figure", "figcaption", "video", "source", "iframe",
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
      "www.youtube.com", "youtube.com", "www.google.com", "maps.google.com", "player.vimeo.com",
    ],
    allowedSchemes: ["http", "https", "mailto"],
  });
}

export function sanitizeGmapEmbed(dirty) {
  return sanitizeHtml(dirty, {
    allowedTags: ["iframe"],
    allowedAttributes: {
      iframe: ["src", "width", "height", "style", "frameborder", "allowfullscreen", "loading", "referrerpolicy", "title"],
    },
    allowedIframeHostnames: ["www.google.com", "maps.google.com", "google.com"],
  });
}

export function stripHtml(dirty) {
  return sanitizeHtml(dirty, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

export function safeJsonLd(data) {
  return JSON.stringify(data).replace(/<\//g, "<\\/");
}
