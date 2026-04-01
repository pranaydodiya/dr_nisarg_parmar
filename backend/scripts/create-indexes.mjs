#!/usr/bin/env node
/**
 * One-time (idempotent) MongoDB index setup.
 * Run:  node scripts/create-indexes.mjs
 *
 * Safe to re-run — createIndex is a no-op if the index already exists.
 */
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is required");
  process.exit(1);
}

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    console.log("Connected — creating indexes…\n");

    // ---- users ----
    await db.collection("users").createIndex(
      { email: 1 },
      { unique: true, name: "users_email_unique" },
    );
    console.log("  ✓ users.email (unique)");

    // ---- blogs ----
    await db.collection("blogs").createIndex(
      { slug: 1 },
      { unique: true, name: "blogs_slug_unique" },
    );
    console.log("  ✓ blogs.slug (unique)");

    await db.collection("blogs").createIndex(
      { isPublished: 1, createdAt: -1 },
      { name: "blogs_published_date" },
    );
    console.log("  ✓ blogs.isPublished + createdAt");

    // ---- locations ----
    await db.collection("locations").createIndex(
      { isActive: 1, order: 1 },
      { name: "locations_active_order" },
    );
    console.log("  ✓ locations.isActive + order");

    // ---- testimonials ----
    await db.collection("testimonials").createIndex(
      { isPublished: 1, createdAt: -1 },
      { name: "testimonials_published_date" },
    );
    console.log("  ✓ testimonials.isPublished + createdAt");

    // ---- settings ----
    await db.collection("settings").createIndex(
      { key: 1 },
      { unique: true, name: "settings_key_unique" },
    );
    console.log("  ✓ settings.key (unique)");

    console.log("\nAll indexes created successfully.");
  } catch (err) {
    console.error("Index creation failed:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
