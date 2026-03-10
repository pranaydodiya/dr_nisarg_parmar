import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";

const SETTINGS_KEY = "contact_settings";

/**
 * GET /api/admin/contact-settings — get contact settings (singleton doc)
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const db = getDb();
    const settings = await db
      .collection("settings")
      .findOne({ key: SETTINGS_KEY });

    // Return defaults if none exist yet
    const defaults = {
      key: SETTINGS_KEY,
      emergencyPhone: "+91 99741 11089",
      emergencyPhoneTel: "+919974111089",
      primaryPhone: "+91 99741 11089",
      primaryPhoneTel: "+919974111089",
      email: "contact@drnisargparmar.com",
      emergencyMessage:
        "Head injuries, spinal trauma, stroke — immediate care available.",
      emergencyTitle: "24/7 Emergency Neurosurgery",
      showEmergencyStrip: true,
      whatsappNumber: "",
      whatsappMessage: "Hello Dr. Nisarg, I would like to book an appointment.",
      showWhatsapp: false,
    };

    return NextResponse.json(settings || defaults);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error fetching contact settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/contact-settings — upsert contact settings
 */
export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();

    const {
      emergencyPhone,
      emergencyPhoneTel,
      primaryPhone,
      primaryPhoneTel,
      email,
      emergencyMessage,
      emergencyTitle,
      showEmergencyStrip,
      whatsappNumber,
      whatsappMessage,
      showWhatsapp,
    } = body;

    const db = getDb();

    const updateDoc = {
      key: SETTINGS_KEY,
      emergencyPhone: emergencyPhone || "",
      emergencyPhoneTel: emergencyPhoneTel || "",
      primaryPhone: primaryPhone || "",
      primaryPhoneTel: primaryPhoneTel || "",
      email: email || "",
      emergencyMessage: emergencyMessage || "",
      emergencyTitle: emergencyTitle || "24/7 Emergency Neurosurgery",
      showEmergencyStrip: showEmergencyStrip !== false,
      whatsappNumber: whatsappNumber || "",
      whatsappMessage: whatsappMessage || "",
      showWhatsapp: showWhatsapp === true,
      updatedAt: new Date(),
    };

    await db
      .collection("settings")
      .updateOne(
        { key: SETTINGS_KEY },
        { $set: updateDoc },
        { upsert: true },
      );

    return NextResponse.json(updateDoc);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error updating contact settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
