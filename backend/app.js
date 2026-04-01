import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { getDb } from "./db.js";
import { logger } from "./utils/logger.js";
import { multerErrorHandler } from "./middleware/multer-error.js";

import authRoutes from "./routes/auth.js";
import locationsRoutes from "./routes/locations.js";
import testimonialsRoutes from "./routes/testimonials.js";
import blogsRoutes from "./routes/blogs.js";
import settingsRoutes from "./routes/settings.js";

/**
 * Build the Express application (no listen). Used by server.js and tests.
 */
export function createApp() {
  const app = express();

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://img.youtube.com", "https://i.ytimg.com"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }));

  const allowedOrigins = [
    process.env.FRONTEND_URL,
    ...(process.env.NODE_ENV !== "production"
      ? ["http://localhost:3000", "http://localhost:3001"]
      : []),
  ].filter(Boolean);

  app.use(cors({
    origin(origin, callback) {
      if (!origin && process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      if (!origin) return callback(null, false);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400,
  }));

  app.use(cookieParser());
  app.use(express.json({ limit: "2mb" }));
  app.use(mongoSanitize());

  const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many login attempts. Please try again after 15 minutes." },
    skipSuccessfulRequests: true,
  });

  const adminLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  });

  app.use("/api", globalLimiter);
  app.use("/api/auth/login", authLimiter);
  app.use("/api/admin", adminLimiter);

  app.use("/api/admin", (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
    const xrw = req.headers["x-requested-with"];
    if (xrw === "XMLHttpRequest") return next();
    return res.status(403).json({ error: "Forbidden: missing CSRF header" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api", locationsRoutes);
  app.use("/api", testimonialsRoutes);
  app.use("/api", blogsRoutes);
  app.use("/api", settingsRoutes);

  app.get("/api/health", async (req, res) => {
    const start = Date.now();
    try {
      const db = getDb();
      await db.command({ ping: 1 });
      return res.json({
        status: "ok",
        uptime: process.uptime(),
        dbResponseMs: Date.now() - start,
        timestamp: new Date().toISOString(),
      });
    } catch {
      return res.status(503).json({
        status: "error",
        message: "Database unreachable",
        timestamp: new Date().toISOString(),
      });
    }
  });

  app.use(multerErrorHandler);
  app.use((err, _req, res, _next) => {
    logger.error({ err }, "unhandled error");
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
      error: process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    });
  });

  return app;
}
