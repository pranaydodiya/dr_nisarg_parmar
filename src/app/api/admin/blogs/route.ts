import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";
import { uploadImage } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const db = getDb();
    const blogsCollection = db.collection("blogs");
    
    // Fetch newest first
    const blogs = await blogsCollection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(blogs);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    
    const title = formData.get("title")?.toString() || "";
    const excerpt = formData.get("excerpt")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const category = formData.get("category")?.toString() || "Uncategorized";
    const tagsStr = formData.get("tags")?.toString() || "";
    const isPublished = formData.get("isPublished") === "true";
    
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Process Tags
    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

    // Generate a secure, URL-friendly slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const db = getDb();
    const blogsCollection = db.collection("blogs");

    // Ensure slug uniqueness
    let existingSlug = await blogsCollection.findOne({ slug });
    let slugCounter = 1;
    while (existingSlug) {
      slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}-${slugCounter}`;
      existingSlug = await blogsCollection.findOne({ slug });
      slugCounter++;
    }

    // Upload Image to Cloudinary if provided
    let featuredImage = "";
    let imageId = "";
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await uploadImage(buffer, "drnisargparmar/blogs");
      featuredImage = uploadResult.url;
      imageId = uploadResult.publicId;
    }

    const newBlog = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      isPublished,
      featuredImage,
      imageId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogsCollection.insertOne(newBlog);

    return NextResponse.json({ ...newBlog, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
