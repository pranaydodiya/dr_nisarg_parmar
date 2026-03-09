import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

if (!process.env.JWT_SECRET) {
  // In a real deployment this must be set via env; we only allow missing in local dev.
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is not set. Please configure it in the environment.");
  }
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-in-production-min-32-chars");
const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function signToken(payload: AdminUser): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const { id, email, name, role } = payload;
    if (typeof id === "string" && typeof email === "string" && role === "admin") {
      return { id, email, name: typeof name === "string" ? name : "", role };
    }
    return null;
  } catch {
    return null;
  }
}

export function getCookieName() {
  return COOKIE_NAME;
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  };
}

/**
 * Get admin user from JWT in cookie (server-only).
 */
export async function getAdminFromCookie(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
