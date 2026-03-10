import { NextResponse } from "next/server";
import { getDbAsync } from "@/lib/db/mongodb";

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

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching public locations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
