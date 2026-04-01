/**
 * Requires MONGODB_URI and JWT_SECRET (≥32 chars) so db and auth routes load.
 * Skipped when either is missing (e.g. CI without secrets).
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import request from "supertest";

const canRunIntegration = Boolean(
  process.env.MONGODB_URI && process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32,
);

const suite = canRunIntegration ? describe : describe.skip;

suite("API integration", () => {
  let app;
  let createApp;
  let connectToDatabase;
  let closeDatabase;

  before(async () => {
    ({ createApp } = await import("../app.js"));
    ({ connectToDatabase, closeDatabase } = await import("../db.js"));
    await connectToDatabase();
    app = createApp();
  });

  after(async () => {
    if (closeDatabase) await closeDatabase();
  });

  it("GET /api/health returns ok when DB is up", async () => {
    const res = await request(app).get("/api/health").expect(200);
    assert.strictEqual(res.body.status, "ok");
    assert.ok(typeof res.body.dbResponseMs === "number");
  });

  it("GET /api/locations returns JSON array", async () => {
    const res = await request(app).get("/api/locations").expect(200);
    assert.ok(Array.isArray(res.body));
  });

  it("GET /api/contact-settings returns object", async () => {
    const res = await request(app).get("/api/contact-settings").expect(200);
    assert.ok(res.body && typeof res.body === "object");
  });

  it("POST /api/admin/blogs is forbidden without CSRF header", async () => {
    const res = await request(app)
      .post("/api/admin/blogs")
      .set("Content-Type", "application/json")
      .send({ title: "x", content: "y" })
      .expect(403);
    assert.match(String(res.body.error || ""), /CSRF|Forbidden/i);
  });

  it("POST /api/auth/login rejects invalid body", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({ email: "bad", password: "" })
      .expect(400);
    assert.strictEqual(res.body.error, "Validation failed");
  });
});
