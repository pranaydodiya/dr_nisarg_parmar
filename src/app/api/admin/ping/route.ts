import { requireAdmin } from "@/lib/auth-server";
import { NextResponse } from "next/server";

/**
 * GET /api/admin/ping — Admin-only test route. Returns 200 + session info if admin.
 */
export async function GET() {
  try {
    const session = await requireAdmin();
    return NextResponse.json({
      ok: true,
      message: "Admin authenticated",
      user: { id: session.user.id, email: session.user.email, role: (session.user as { role?: string }).role },
    });
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }
}
