import { logger } from "../utils/logger.js";

/**
 * Parse and replace req.body with Zod output (coerced / trimmed values).
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      logger.debug({ err: parsed.error.flatten() }, "request validation failed");
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }
    req.body = parsed.data;
    next();
  };
}
