import { getAdminFromCookie, type AdminUser } from "@/lib/auth-jwt";

export type Session = { user: AdminUser } | null;

/**
 * Get current admin session from JWT cookie (server-only).
 */
export async function getSession(): Promise<Session> {
  const user = await getAdminFromCookie();
  return user ? { user } : null;
}

/**
 * Require admin session. Throws Response 401/403 if not authenticated or not admin.
 * Use in API Route Handlers.
 */
export async function requireAdmin(): Promise<{ user: AdminUser }> {
  const session = await getSession();
  if (!session?.user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (session.user.role !== "admin") {
    throw new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  return session;
}
