import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward login request to Express backend
    const backendRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json().catch(() => ({}));

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data.error || "Login failed" },
        { status: backendRes.status }
      );
    }

    // Extract the admin_token from backend's Set-Cookie header
    const setCookie = backendRes.headers.get("set-cookie") || "";
    const tokenMatch = setCookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    const token = tokenMatch?.[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
    }

    // Set the cookie on the Vercel domain so the Next.js server can read it
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Login proxy error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
