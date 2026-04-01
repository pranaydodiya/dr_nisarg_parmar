import { z } from "zod";

const objectIdString = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");

function looseString(max) {
  return z.preprocess(
    (v) => (v == null || v === "" ? "" : String(v)),
    z.string().max(max),
  );
}

function boolish() {
  return z
    .union([z.boolean(), z.literal("true"), z.literal("false")])
    .optional()
    .transform((v) => v === true || v === "true");
}

export const loginBodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  password: z.string().min(1).max(500),
});

export const reorderLocationsSchema = z.object({
  orderedIds: z.array(objectIdString).min(1),
});

export const locationBodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  address: z.string().trim().min(1).max(500),
  city: looseString(120),
  phone: looseString(80),
  email: looseString(120),
  gmapEmbedCode: looseString(50_000),
  gmapLink: looseString(2000),
  latitude: z
    .union([z.number(), z.string(), z.null(), z.undefined(), z.literal("")])
    .optional()
    .transform((v) => {
      if (v === null || v === undefined || v === "") return null;
      const n = typeof v === "number" ? v : parseFloat(String(v));
      return Number.isFinite(n) ? n : null;
    }),
  longitude: z
    .union([z.number(), z.string(), z.null(), z.undefined(), z.literal("")])
    .optional()
    .transform((v) => {
      if (v === null || v === undefined || v === "") return null;
      const n = typeof v === "number" ? v : parseFloat(String(v));
      return Number.isFinite(n) ? n : null;
    }),
  isPrimary: z.boolean().optional().default(false),
  isAvailableAt: z.boolean().optional().default(false),
  operatingHours: looseString(500),
  isActive: z.boolean().optional().default(true),
});

export const contactSettingsSchema = z.object({
  emergencyPhone: looseString(120),
  emergencyPhoneTel: looseString(120),
  primaryPhone: looseString(120),
  primaryPhoneTel: looseString(120),
  email: looseString(120),
  emergencyMessage: looseString(2000),
  emergencyTitle: looseString(200),
  showEmergencyStrip: z.boolean().optional().default(true),
  whatsappNumber: looseString(40),
  whatsappMessage: looseString(2000),
  showWhatsapp: z.boolean().optional().default(false),
});

export const blogMultipartSchema = z.object({
  title: z.string().min(1).max(400),
  excerpt: z.string().max(8000).optional().default(""),
  content: z.string().min(1).max(1_000_000),
  category: z.string().max(120).optional().default("Uncategorized"),
  tags: z.string().max(8000).optional().default(""),
  isPublished: boolish().optional().default(false),
  removeImage: boolish().optional().default(false),
});

export const testimonialMultipartSchema = z.object({
  patientName: z.string().trim().min(1).max(200),
  condition: z.string().max(500).optional().default(""),
  summary: z.string().max(2000).optional().default(""),
  videoUrl: z.string().trim().min(1).max(2000),
  platform: z.enum(["youtube", "instagram"]).optional().default("youtube"),
  isPublished: boolish().optional().default(false),
  removeImage: boolish().optional().default(false),
});
