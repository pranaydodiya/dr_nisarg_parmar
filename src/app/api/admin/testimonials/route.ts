import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";
import { uploadImage } from "@/lib/cloudinary";

function extractYouTubeId(url: string) {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const db = getDb();
    const testimonialsCollection = db.collection("testimonials");
    
    // Fetch newest first
    const testimonials = await testimonialsCollection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(testimonials);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    
    const patientName = formData.get("patientName")?.toString() || "";
    const condition = formData.get("condition")?.toString() || "";
    const summary = formData.get("summary")?.toString() || "";
    const videoUrl = formData.get("videoUrl")?.toString() || "";
    const platform = formData.get("platform")?.toString() || "youtube";
    const isPublished = formData.get("isPublished") === "true";
    
    if (!patientName || !videoUrl) {
      return NextResponse.json({ error: "Patient Name and Video URL are required" }, { status: 400 });
    }

    let thumbnailUrl = "";
    let thumbnailId = "";

    if (platform === "youtube") {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        // Automatically fetch max resolution thumbnail from YouTube
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      } else {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
      }
    } else if (platform === "instagram") {
      const file = formData.get("thumbnail") as File | null;
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Upload Instagram manual thumbnail to Cloudinary
        const uploadResult = await uploadImage(buffer, "drnisargparmar/testimonials");
        thumbnailUrl = uploadResult.url;
        thumbnailId = uploadResult.publicId;
      }
    }

    const newTestimonial = {
      patientName,
      condition,
      summary,
      videoUrl,
      platform,
      thumbnailUrl,
      thumbnailId,
      isPublished,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = getDb();
    const result = await db.collection("testimonials").insertOne(newTestimonial);

    return NextResponse.json({ ...newTestimonial, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
