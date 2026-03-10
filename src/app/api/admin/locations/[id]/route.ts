import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";
import { ObjectId } from "mongodb";

/**
 * GET /api/admin/locations/[id] — get single location
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = getDb();
    const location = await db.collection("locations").findOne({ _id: new ObjectId(id) });

    if (!location) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }
    return NextResponse.json(location);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error fetching location:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/locations/[id] — update a location
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

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

    const existing = await locationsCollection.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    // If setting as primary, unset other primaries
    if (isPrimary === true && !existing.isPrimary) {
      await locationsCollection.updateMany(
        { isPrimary: true, _id: { $ne: new ObjectId(id) } },
        { $set: { isPrimary: false } },
      );
    }

    const updateDoc = {
      $set: {
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
        isActive: isActive !== false,
        updatedAt: new Date(),
      },
    };

    await locationsCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
    const updated = await locationsCollection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error updating location:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/locations/[id] — delete a location
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = getDb();
    const locationsCollection = db.collection("locations");

    const existing = await locationsCollection.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    await locationsCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Location deleted successfully" });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error deleting location:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
