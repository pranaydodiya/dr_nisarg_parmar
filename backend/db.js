import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { logger } from "./utils/logger.js";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env");
}

let client;
let db;

export async function connectToDatabase() {
  if (db) return db;

  if (!client) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30_000,
      connectTimeoutMS: 10_000,
      serverSelectionTimeoutMS: 10_000,
    });

    client.on("connectionPoolCleared", () => {
      logger.warn("mongo connection pool cleared");
    });

    await client.connect();
    logger.info("connected to MongoDB");
  }

  db = client.db();
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Call connectToDatabase first");
  }
  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
    logger.info("MongoDB connection closed");
  }
}
