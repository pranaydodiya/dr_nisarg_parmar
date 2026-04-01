import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import { connectToDatabase, getDb } from './db.js';
import { logger } from './utils/logger.js';
import { multerErrorHandler } from './middleware/multer-error.js';

import authRoutes from './routes/auth.js';
import locationsRoutes from './routes/locations.js';
import testimonialsRoutes from './routes/testimonials.js';
import blogsRoutes from './routes/blogs.js';
import settingsRoutes from './routes/settings.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// Security: Helmet with hardened CSP
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// CORS — only allow known frontend origins
// ---------------------------------------------------------------------------
const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.NODE_ENV !== "production"
    ? ['http://localhost:3000', 'http://localhost:3001']
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
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400,
}));

// ---------------------------------------------------------------------------
// Body parsing, cookies, NoSQL injection protection
// ---------------------------------------------------------------------------
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(mongoSanitize());

// ---------------------------------------------------------------------------
// Rate limiters
// ---------------------------------------------------------------------------
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

app.use('/api', globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/admin', adminLimiter);

// ---------------------------------------------------------------------------
// CSRF protection for mutation endpoints (cross-domain cookie model)
// Vercel frontend must send X-Requested-With header on all non-GET requests.
// Browsers won't attach this header cross-origin without CORS preflight.
// ---------------------------------------------------------------------------
app.use('/api/admin', (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const xrw = req.headers['x-requested-with'];
  if (xrw === 'XMLHttpRequest') return next();
  return res.status(403).json({ error: "Forbidden: missing CSRF header" });
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api', locationsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', blogsRoutes);
app.use('/api', settingsRoutes);

// ---------------------------------------------------------------------------
// Health check — verifies MongoDB connectivity
// ---------------------------------------------------------------------------
app.get('/api/health', async (req, res) => {
  const start = Date.now();
  try {
    const db = getDb();
    await db.command({ ping: 1 });
    return res.json({
      status: 'ok',
      uptime: process.uptime(),
      dbResponseMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(503).json({
      status: 'error',
      message: 'Database unreachable',
      timestamp: new Date().toISOString(),
    });
  }
});

// ---------------------------------------------------------------------------
// Error handlers (multer first, then generic)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------
function handleShutdown(signal) {
  logger.info({ signal }, "shutdown signal received");
  process.exit(0);
}
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "unhandledRejection");
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      logger.info({ port, nodeEnv: process.env.NODE_ENV || "development" }, "server listening");
    });
  } catch (err) {
    logger.fatal({ err }, "failed to start server");
    process.exit(1);
  }
}

startServer();
