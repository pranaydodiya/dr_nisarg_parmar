import { ObjectId } from "mongodb";
import { getDb } from "../db.js";
import { sanitizeGmapEmbed, stripHtml } from "../utils/sanitize.js";
import { logger } from "../utils/logger.js";

const PUBLIC_LOCATION_FIELDS = {
  name: 1,
  address: 1,
  city: 1,
  phone: 1,
  email: 1,
  gmapEmbedCode: 1,
  gmapLink: 1,
  latitude: 1,
  longitude: 1,
  isPrimary: 1,
  isAvailableAt: 1,
  operatingHours: 1,
  order: 1,
  isActive: 1,
};

// GET /api/locations
export async function getLocations(req, res) {
  try {
    res.set(
      "Cache-Control",
      "public, s-maxage=120, stale-while-revalidate=600",
    );
    const db = getDb();
    const locations = await db
      .collection("locations")
      .find({ isActive: true }, { projection: PUBLIC_LOCATION_FIELDS })
      .sort({ order: 1 })
      .toArray();

    const sanitized = locations.map((loc) => ({
      ...loc,
      gmapEmbedCode: loc.gmapEmbedCode ? sanitizeGmapEmbed(loc.gmapEmbedCode) : "",
    }));

    return res.json(sanitized);
  } catch (error) {
    logger.error({ err: error }, "error fetching public locations");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/admin/locations
export async function getAdminLocations(req, res) {
  try {
    const db = getDb();
    const locations = await db
      .collection("locations")
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return res.json(locations);
  } catch (error) {
    logger.error({ err: error }, "error fetching admin locations");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST /api/admin/locations
export async function createLocation(req, res) {
  try {
    const {
      name, address, city, phone, email, gmapEmbedCode, gmapLink,
      latitude, longitude, isPrimary, isAvailableAt, operatingHours, isActive,
    } = req.body;

    const db = getDb();
    const locationsCollection = db.collection("locations");

    const maxOrderDoc = await locationsCollection.find({}).sort({ order: -1 }).limit(1).toArray();
    const nextOrder = maxOrderDoc.length > 0 ? (maxOrderDoc[0].order || 0) + 1 : 0;

    const newLocation = {
      name: stripHtml(name || ""),
      address: stripHtml(address || ""),
      city: stripHtml(city || ""),
      phone: stripHtml(phone || ""),
      email: stripHtml(email || ""),
      gmapEmbedCode: sanitizeGmapEmbed(gmapEmbedCode || ""),
      gmapLink: stripHtml(gmapLink || ""),
      latitude: latitude ?? null,
      longitude: longitude ?? null,
      isPrimary,
      isAvailableAt,
      operatingHours: stripHtml(operatingHours || ""),
      isActive,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await locationsCollection.insertOne(newLocation);
    return res.status(201).json({ ...newLocation, _id: result.insertedId });
  } catch (error) {
    logger.error({ err: error }, "error creating location");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/admin/locations/:id
export async function getLocation(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const db = getDb();
    const location = await db.collection("locations").findOne({ _id: new ObjectId(id) });

    if (!location) return res.status(404).json({ error: "Location not found" });
    return res.json(location);
  } catch (error) {
    logger.error({ err: error }, "error fetching location");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// PUT /api/admin/locations/reorder
export async function reorderLocations(req, res) {
  try {
    const { orderedIds } = req.body;

    const db = getDb();
    const locationsCollection = db.collection("locations");

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: { $set: { order: index, updatedAt: new Date() } },
      },
    }));

    await locationsCollection.bulkWrite(bulkOps);
    return res.json({ success: true, message: "Order updated" });
  } catch (error) {
    logger.error({ err: error }, "error reordering locations");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// PUT /api/admin/locations/:id
export async function updateLocation(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const {
      name, address, city, phone, email, gmapEmbedCode, gmapLink,
      latitude, longitude, isPrimary, isAvailableAt, operatingHours, isActive,
    } = req.body;

    const db = getDb();
    const locationsCollection = db.collection("locations");

    const existing = await locationsCollection.findOne({ _id: new ObjectId(id) });
    if (!existing) return res.status(404).json({ error: "Location not found" });

    if (isPrimary && !existing.isPrimary) {
      await locationsCollection.updateMany(
        { isPrimary: true, _id: { $ne: new ObjectId(id) } },
        { $set: { isPrimary: false } },
      );
    }

    const updateDoc = {
      $set: {
        name: stripHtml(name || ""),
        address: stripHtml(address || ""),
        city: stripHtml(city || ""),
        phone: stripHtml(phone || ""),
        email: stripHtml(email || ""),
        gmapEmbedCode: sanitizeGmapEmbed(gmapEmbedCode || ""),
        gmapLink: stripHtml(gmapLink || ""),
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        isPrimary,
        isAvailableAt,
        operatingHours: stripHtml(operatingHours || ""),
        isActive,
        updatedAt: new Date(),
      },
    };

    await locationsCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
    const updated = await locationsCollection.findOne({ _id: new ObjectId(id) });

    return res.json(updated);
  } catch (error) {
    logger.error({ err: error }, "error updating location");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// DELETE /api/admin/locations/:id
export async function deleteLocation(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const db = getDb();
    const locationsCollection = db.collection("locations");

    const existing = await locationsCollection.findOne({ _id: new ObjectId(id) });
    if (!existing) return res.status(404).json({ error: "Location not found" });

    await locationsCollection.deleteOne({ _id: new ObjectId(id) });
    return res.json({ success: true, message: "Location deleted successfully" });
  } catch (error) {
    logger.error({ err: error }, "error deleting location");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
