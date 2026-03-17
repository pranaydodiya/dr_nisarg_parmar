import { verifyToken, COOKIE_NAME } from '../utils/auth-jwt.js';

export async function requireAuth(req, res, next) {
  try {
    // Parse cookies from req.headers.cookie since we might not have cookie-parser
    // A better approach is to use cookie-parser middleware but let's parse it manually or install it.
    const cookieHeader = req.headers.cookie;
    let token = null;
    
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map(c => c.trim().split('='));
      const adminCookie = cookies.find(c => c[0] === COOKIE_NAME);
      if (adminCookie) token = adminCookie[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await verifyToken(token);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
