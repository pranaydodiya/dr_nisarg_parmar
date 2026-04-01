export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * Admin JWT lives in an httpOnly cookie on the Next.js host (e.g. Vercel).
 * Browser calls to the Render API origin cannot attach that cookie, so we use a same-origin proxy.
 */
function resolveFetchUrl(endpoint: string): string {
  if (isBrowser() && endpoint.startsWith("/admin")) {
    return `/api/proxy${endpoint}`;
  }
  return `${NEXT_PUBLIC_API_URL}${endpoint}`;
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const isAdmin = endpoint.startsWith("/admin");
  const isAuth = endpoint.startsWith("/auth");
  const defaultOptions: RequestInit = {};

  if (isAdmin) {
    defaultOptions.credentials = isBrowser() ? "same-origin" : "include";
  } else if (isAuth) {
    defaultOptions.credentials = "include";
  }

  const method = (options.method || "GET").toUpperCase();
  const needsCsrf = isAdmin && !["GET", "HEAD", "OPTIONS"].includes(method);

  const merged = { ...defaultOptions, ...options };
  if (needsCsrf) {
    const headers = new Headers(merged.headers);
    headers.set("X-Requested-With", "XMLHttpRequest");
    merged.headers = headers;
  }

  return fetch(resolveFetchUrl(endpoint), merged);
}

/** Use for client-side FormData / fetch to admin routes (cookie is on the Next.js host). */
export function browserAdminApiUrl(path: string): string {
  if (!path.startsWith("/admin")) {
    throw new Error("browserAdminApiUrl only supports /admin/* paths");
  }
  return `/api/proxy${path}`;
}
