import multer from "multer";
import { logger } from "../utils/logger.js";

export function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large (max 5 MB)." });
    }
    logger.warn({ code: err.code }, "multer error");
    return res.status(400).json({ error: err.message || "Upload error" });
  }
  if (err && err.message && typeof err.message === "string" && err.message.includes("Only JPEG")) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
}
