import { describe, it } from "node:test";
import assert from "node:assert";
import {
  loginBodySchema,
  reorderLocationsSchema,
  locationBodySchema,
  blogMultipartSchema,
  testimonialMultipartSchema,
} from "../validation/schemas.js";

describe("loginBodySchema", () => {
  it("accepts valid email and password", () => {
    const r = loginBodySchema.safeParse({ email: "A@Example.COM ", password: "secret" });
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.email, "a@example.com");
  });

  it("rejects invalid email", () => {
    const r = loginBodySchema.safeParse({ email: "nope", password: "x" });
    assert.strictEqual(r.success, false);
  });
});

describe("reorderLocationsSchema", () => {
  it("accepts valid object ids", () => {
    const id = "507f1f77bcf86cd799439011";
    const r = reorderLocationsSchema.safeParse({ orderedIds: [id] });
    assert.strictEqual(r.success, true);
  });

  it("rejects empty array", () => {
    const r = reorderLocationsSchema.safeParse({ orderedIds: [] });
    assert.strictEqual(r.success, false);
  });
});

describe("locationBodySchema", () => {
  it("requires name and address", () => {
    const r = locationBodySchema.safeParse({
      name: "Clinic",
      address: "123 St",
    });
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.isActive, true);
  });

  it("rejects empty name", () => {
    const r = locationBodySchema.safeParse({ name: "", address: "x" });
    assert.strictEqual(r.success, false);
  });
});

describe("blogMultipartSchema", () => {
  it("parses boolish isPublished", () => {
    const r = blogMultipartSchema.safeParse({
      title: "T",
      content: "C",
      isPublished: "true",
    });
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.isPublished, true);
  });
});

describe("testimonialMultipartSchema", () => {
  it("requires patientName and videoUrl", () => {
    const r = testimonialMultipartSchema.safeParse({
      patientName: "Jane",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.platform, "youtube");
  });
});
