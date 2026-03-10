import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";

/**
 * GET /api/admin/locations — list all locations, sorted by order
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const db = getDb();
    const locations = await db
      .collection("locations")
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(locations);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/locations — create a new location
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();

    const {
      name,
      address,
      city,
      phone,
      email,
      gmapEmbedCode,
      gmapLink,
      latitude,
      longitude,
      isPrimary,
      isAvailableAt,
      operatingHours,
      isActive,
    } = body;

    if (!name || !address) {
      return NextResponse.json(
        { error: "Name and address are required" },
        { status: 400 },
      );
    }

    const db = getDb();
    const locationsCollection = db.collection("locations");

    // Auto-set order to max + 1
    const maxOrderDoc = await locationsCollection
      .find({})
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    const nextOrder = maxOrderDoc.length > 0 ? (maxOrderDoc[0].order || 0) + 1 : 0;

    const newLocation = {
      name: name || "",
      address: address || "",
      city: city || "",
      phone: phone || "",
      email: email || "",
      gmapEmbedCode: gmapEmbedCode || "",
      gmapLink: gmapLink || "",
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      isPrimary: isPrimary === true,
      isAvailableAt: isAvailableAt === true,
      operatingHours: operatingHours || "",
      isActive: isActive !== false, // default true
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await locationsCollection.insertOne(newLocation);

    return NextResponse.json(
      { ...newLocation, _id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error creating location:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
