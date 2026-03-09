import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { compare } from "bcryptjs";
import { signToken, getCookieOptions } from "@/lib/auth-jwt";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }
    const { email, password } = parsed.data;

    const db = getDb();
    const user = await db.collection("users").findOne({
      email: email.toLowerCase(),
      role: "admin",
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordHash = user.passwordHash as string | undefined;
    if (!passwordHash || !(await compare(password, passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signToken({
      id: String(user._id),
      email: user.email as string,
      name: (user.name as string) || "",
      role: (user.role as string) || "admin",
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, getCookieOptions());
    return res;
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
