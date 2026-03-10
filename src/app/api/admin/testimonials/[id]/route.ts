import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

function extractYouTubeId(url: string): string | null {
  // Handles all formats:
  // - youtube.com/watch?v=ID
  // - youtube.com/shorts/ID
  // - youtu.be/ID
  // - youtube.com/embed/ID
  // - youtube.com/v/ID
  const regExp = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = getDb();
    const testimonial = await db.collection("testimonials").findOne({ _id: new ObjectId(id) });

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json(testimonial);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error fetching testimonial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const formData = await req.formData();
    
    const patientName = formData.get("patientName")?.toString() || "";
    const condition = formData.get("condition")?.toString() || "";
    const summary = formData.get("summary")?.toString() || "";
    const videoUrl = formData.get("videoUrl")?.toString() || "";
    const platform = formData.get("platform")?.toString() || "youtube";
    const isPublished = formData.get("isPublished") === "true";
    
    const file = formData.get("thumbnail") as File | null;
    const removeImage = formData.get("removeImage") === "true";

    if (!patientName || !videoUrl) {
      return NextResponse.json({ error: "Patient Name and Video URL are required" }, { status: 400 });
    }

    const db = getDb();
    const collection = db.collection("testimonials");

    const existingDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingDoc) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    let thumbnailUrl = existingDoc.thumbnailUrl;
    let thumbnailId = existingDoc.thumbnailId;

    // Has platform or URL changed? Handle YouTube auto-thumb regeneration if so
    const isUrlChanged = existingDoc.videoUrl !== videoUrl;
    const isPlatformChanged = existingDoc.platform !== platform;

    // Handle Cloudinary removal
    if (file || removeImage || (isPlatformChanged && existingDoc.platform === "instagram")) {
      if (thumbnailId) {
        await deleteImage(thumbnailId);
        thumbnailUrl = "";
        thumbnailId = "";
      }
    }

    // Process new thumbnails
    if (platform === "youtube" && (isUrlChanged || isPlatformChanged || !thumbnailUrl)) {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      } else {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
      }
    } else if (platform === "instagram" && file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await uploadImage(buffer, "drnisargparmar/testimonials");
      thumbnailUrl = uploadResult.url;
      thumbnailId = uploadResult.publicId;
    }

    const updateDoc = {
      $set: {
        patientName,
        condition,
        summary,
        videoUrl,
        platform,
        thumbnailUrl,
        thumbnailId,
        isPublished,
        updatedAt: new Date(),
      },
    };

    await collection.updateOne({ _id: new ObjectId(id) }, updateDoc);
    const updatedTestimonial = await collection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = getDb();
    const collection = db.collection("testimonials");

    const existingDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingDoc) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Cleanup from Cloudinary if it's an uploaded instagram thumb
    if (existingDoc.thumbnailId) {
      await deleteImage(existingDoc.thumbnailId);
    }

    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
