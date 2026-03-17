export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const needsAuth = endpoint.startsWith("/admin") || endpoint.startsWith("/auth");
  const defaultOptions: RequestInit = {};

  if (needsAuth) {
    defaultOptions.credentials = "include";
  }

  // Handle absolute URL cases if someone passes something else, though unlikely.
  return fetch(`${NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });
}
