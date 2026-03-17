import { SignJWT, jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is not set. Please configure it in the environment.");
  }
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-in-production-min-32-chars");
export const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function signToken(payload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
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

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE * 1000, // maxAge in res.cookie is in milliseconds
    path: "/",
  };
}
