/**
 * Optional env validation. Not required by the app; use validateEnv() or getEnv()
 * at startup or in API routes if you want strict checks (e.g. in production).
 */
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url("Must be a valid URL").optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (!result.success) {
    const msg = result.error.flatten().fieldErrors;
    const message = Object.entries(msg)
      .map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`)
      .join("; ");
    console.warn("[env] Missing or invalid:", message);
  }

  return result.success ? result.data : ({} as Env);
}

export function getEnv(): Env {
  return validateEnv();
}
