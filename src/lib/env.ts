/**
 * Optional env validation. Not required by the app; use validateEnv() or getEnv()
 * at startup or in API routes if you want strict checks (e.g. in production).
 */
import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters").optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validate required env vars. Call in API routes or at app startup.
 */
export function validateEnv(): Env {
  const result = envSchema.safeParse({
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  });

  if (!result.success) {
    const msg = result.error.flatten().fieldErrors;
    const message = Object.entries(msg)
      .map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`)
      .join("; ");
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Invalid environment: ${message}`);
    }
    console.warn("[env] Missing or invalid:", message);
  }

  return result.success ? result.data : ({} as Env);
}

/** Use in server code when you need to assert env is set. */
export function getEnv(): Env {
  const env = validateEnv();
  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Check .env and .env.example.");
  }
  return env;
}
