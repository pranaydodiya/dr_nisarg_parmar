import { SignJWT, jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error(
    "JWT_SECRET environment variable is required. " +
    "Set a strong random string (min 32 chars) in your .env file."
  );
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long.");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
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
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax", // "none" needed for cross-domain cookies
    maxAge: COOKIE_MAX_AGE * 1000, // maxAge in res.cookie is in milliseconds
    path: "/",
  };
}
