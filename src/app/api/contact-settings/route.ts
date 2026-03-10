import { NextResponse } from "next/server";
import { getDbAsync } from "@/lib/db/mongodb";

const SETTINGS_KEY = "contact_settings";

/**
 * GET /api/contact-settings — public endpoint: get contact settings
 */
export async function GET() {
  try {
    const db = await getDbAsync();

    const settings = await db
      .collection("settings")
      .findOne({ key: SETTINGS_KEY });

    // Defaults if admin hasn't configured yet
    const defaults = {
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
      whatsappMessage: "",
      showWhatsapp: false,
    };

    if (!settings) {
      return NextResponse.json(defaults);
    }

    // Strip internal fields
    const { _id, key, updatedAt, ...publicSettings } = settings as any;

    return NextResponse.json(publicSettings);
  } catch (error) {
    console.error("Error fetching public contact settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
