/**
 * One-time seed: create admin user in MongoDB.
 * Run from repo root: npm run seed:admin --prefix backend
 * Requires: MONGODB_URI and SEED_ADMIN_PASSWORD in backend/.env; optional SEED_ADMIN_EMAIL, SEED_ADMIN_NAME
 */
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { hashSync } = bcrypt;

const MONGODB_URI = process.env.MONGODB_URI;
const EMAIL = (process.env.SEED_ADMIN_EMAIL || "admin@example.com").toLowerCase();
const PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const NAME = process.env.SEED_ADMIN_NAME || "Admin";

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in backend/.env");
  process.exit(1);
}

if (!PASSWORD) {
  console.error("Missing SEED_ADMIN_PASSWORD in backend/.env");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("users");
    const existing = await users.findOne({ email: EMAIL.toLowerCase() });
    if (existing) {
      console.log("Admin user already exists:", EMAIL);
      return;
    }
    const passwordHash = hashSync(PASSWORD, 10);
    await users.insertOne({
      email: EMAIL.toLowerCase(),
      passwordHash,
      name: NAME,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Admin user created:", EMAIL);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
