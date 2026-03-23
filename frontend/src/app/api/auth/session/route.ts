import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const COOKIE_NAME = "admin_token";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME);

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Verify token with the Express backend
    const backendRes = await fetch(`${API_URL}/auth/session`, {
      headers: { cookie: `${COOKIE_NAME}=${token.value}` },
      cache: "no-store",
    });

    if (!backendRes.ok) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
