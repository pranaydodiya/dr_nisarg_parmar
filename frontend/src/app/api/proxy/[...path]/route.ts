import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const COOKIE_NAME = "admin_token";

function isAllowedPath(segments: string[]): boolean {
  if (segments.length === 0) return false;
  if (segments[0] !== "admin") return false;
  if (segments.some((s) => s === ".." || s === "." || s === "")) return false;
  return true;
}

async function proxyRequest(request: Request, pathSegments: string[]) {
  if (!isAllowedPath(pathSegments)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const joined = pathSegments.join("/");
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const incoming = new URL(request.url);
  const targetUrl = `${API_URL}/${joined}${incoming.search}`;

  const headers = new Headers();
  headers.set("cookie", `${COOKIE_NAME}=${token.value}`);

  const contentType = request.headers.get("content-type");
  const method = request.method;
  if (contentType && method !== "GET" && method !== "HEAD") {
    headers.set("content-type", contentType);
  }

  if (method !== "GET" && method !== "HEAD") {
    headers.set("X-Requested-With", "XMLHttpRequest");
  }

  const init: RequestInit = {
    method,
    headers,
    cache: "no-store",
  };

  if (method !== "GET" && method !== "HEAD") {
    const body = await request.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
    }
  }

  const backendRes = await fetch(targetUrl, init);

  const outHeaders = new Headers();
  const outCt = backendRes.headers.get("content-type");
  if (outCt) {
    outHeaders.set("content-type", outCt);
  }

  return new NextResponse(backendRes.body, {
    status: backendRes.status,
    headers: outHeaders,
  });
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(request: Request, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxyRequest(request, path);
}

export async function POST(request: Request, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxyRequest(request, path);
}

export async function PUT(request: Request, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxyRequest(request, path);
}

export async function PATCH(request: Request, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxyRequest(request, path);
}

export async function DELETE(request: Request, ctx: Ctx) {
  const { path } = await ctx.params;
  return proxyRequest(request, path);
}
