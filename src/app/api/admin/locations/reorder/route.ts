import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";
import { ObjectId } from "mongodb";

/**
 * PUT /api/admin/locations/reorder — bulk update order of locations
 * Body: { orderedIds: string[] }
 */
export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { error: "orderedIds array is required" },
        { status: 400 },
      );
    }

    // Validate every ID before processing
    for (const id of orderedIds) {
      if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "Invalid location ID in orderedIds" },
          { status: 400 },
        );
      }
    }

    const db = getDb();
    const locationsCollection = db.collection("locations");

    // Update each location's order based on array position
    const bulkOps = orderedIds.map((id: string, index: number) => ({
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: { $set: { order: index, updatedAt: new Date() } },
      },
    }));

    await locationsCollection.bulkWrite(bulkOps);

    return NextResponse.json({ success: true, message: "Order updated" });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error reordering locations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
