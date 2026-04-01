import dotenv from 'dotenv';
import { connectToDatabase } from './db.js';
import { logger } from './utils/logger.js';
import { createApp } from './app.js';

dotenv.config();

const app = createApp();
const port = process.env.PORT || 5000;

function handleShutdown(signal) {
  logger.info({ signal }, "shutdown signal received");
  process.exit(0);
}
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "unhandledRejection");
});

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
