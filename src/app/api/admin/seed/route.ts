import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { hashSync } from "bcryptjs";

const DEFAULT_EMAIL = "admin@example.com";
const DEFAULT_NAME = "Admin";

/**
 * One-time seed: create admin user in MongoDB.
 * Call with: GET /api/admin/seed?secret=YOUR_JWT_SECRET
 * Requires JWT_SECRET and SEED_ADMIN_PASSWORD to be set in the environment.
 * Uses the app's MongoDB connection (avoids DNS issues when running the script locally).
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.JWT_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "JWT_SECRET is not set on the server" },
      { status: 500 }
    );
  }
  if (secret !== expected) {
    return NextResponse.json({ error: "Invalid or missing secret" }, { status: 401 });
  }

  try {
    const db = getDb();
    const users = db.collection("users");
    const email = (process.env.SEED_ADMIN_EMAIL || DEFAULT_EMAIL).toLowerCase();
    const password = process.env.SEED_ADMIN_PASSWORD;
    const name = process.env.SEED_ADMIN_NAME || DEFAULT_NAME;

    if (!password) {
      return NextResponse.json(
        { error: "SEED_ADMIN_PASSWORD is not set on the server" },
        { status: 500 }
      );
    }

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Admin user already exists", email });
    }

    const passwordHash = hashSync(password, 10);
    await users.insertOne({
      email,
      passwordHash,
      name,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "Admin user created", email });
  } catch (err) {
    console.error("[admin/seed]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Seed failed" },
      { status: 500 }
    );
  }
}
