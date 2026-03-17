import { fetchApi } from "./api-client";
import { cookies } from "next/headers";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type Session = { user: AdminUser } | null;

/**
 * Get current admin session from the Express backend using the current request's cookies.
 */
export async function getSession(): Promise<Session> {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token");
    
    if (!adminToken) return null;

    const res = await fetchApi("/auth/session", {
      headers: {
        cookie: `admin_token=${adminToken.value}`
      },
      cache: "no-store"
    });

    if (res.ok) {
      const data = await res.json();
      return data.user ? { user: data.user } : null;
    }
  } catch (error) {
    console.error("Error getting session:", error);
  }
  return null;
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
