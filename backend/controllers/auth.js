import bcrypt from "bcryptjs";
import { getDb } from "../db.js";
import { signToken, verifyToken, getCookieOptions, COOKIE_NAME } from "../utils/auth-jwt.js";

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const db = getDb();
    const user = await db.collection("users").findOne({
      email: String(email).toLowerCase(),
      role: "admin",
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordHash = user.passwordHash;
    if (!passwordHash || !(await bcrypt.compare(password, passwordHash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await signToken({
      id: String(user._id),
      email: user.email,
      name: user.name || "",
      role: user.role || "admin",
    });

    res.cookie(COOKIE_NAME, token, getCookieOptions());
    return res.json({ success: true });
  } catch (err) {
    console.error("[auth/login]", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// POST /api/auth/logout
export async function logout(req, res) {
  res.cookie(COOKIE_NAME, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
  return res.json({ success: true });
}

// GET /api/auth/session
export async function session(req, res) {
  // If request comes here, auth middleware already verified user, or we can optionally check
  const user = req.user; // If we use it, but session could be unauthenticated and return null
  
  if (!user) {
    return res.status(401).json({ user: null });
  }
  
  return res.json({ user });
}

// Helper getter just for session checks
export async function getSession(req, res) {
  try {
    const cookieHeader = req.headers.cookie;
    let token = null;
    
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map(c => c.trim().split('='));
      const adminCookie = cookies.find(c => c[0] === COOKIE_NAME);
      if (adminCookie) token = adminCookie[1];
    }

    if (!token) return res.status(401).json({ user: null });

    const user = await verifyToken(token);
    if (!user) return res.status(401).json({ user: null });

    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ user: null });
  }
}
