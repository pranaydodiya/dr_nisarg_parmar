import { NextResponse } from "next/server";
import { getDbAsync } from "@/lib/db/mongodb";
import { sanitizeGmapEmbed } from "@/lib/sanitize";

/**
 * GET /api/locations — public endpoint: get all active locations
 */
export async function GET() {
  try {
    const db = await getDbAsync();

    const locations = await db
      .collection("locations")
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray();

    // Sanitize gmapEmbedCode before sending to clients
    const sanitized = locations.map((loc) => ({
      ...loc,
      gmapEmbedCode: loc.gmapEmbedCode
        ? sanitizeGmapEmbed(loc.gmapEmbedCode)
        : "",
    }));

    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Error fetching public locations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
