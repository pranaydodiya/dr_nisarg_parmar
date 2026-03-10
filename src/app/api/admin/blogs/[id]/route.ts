import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { requireAdmin } from "@/lib/auth-server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = getDb();
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error fetching blog:", error);
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
    
    const title = formData.get("title")?.toString() || "";
    const excerpt = formData.get("excerpt")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const category = formData.get("category")?.toString() || "Uncategorized";
    const tagsStr = formData.get("tags")?.toString() || "";
    const isPublished = formData.get("isPublished") === "true";
    
    const file = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true"; // Added clear trigger

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

    const db = getDb();
    const blogsCollection = db.collection("blogs");

    // Fetch existing logic
    const existingBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Slug Management - only regenerate if title changed
    let slug = existingBlog.slug;
    if (existingBlog.title !== title) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      let existingSlug = await blogsCollection.findOne({ slug, _id: { $ne: new ObjectId(id) } });
      let slugCounter = 1;
      while (existingSlug) {
        slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}-${slugCounter}`;
        existingSlug = await blogsCollection.findOne({ slug, _id: { $ne: new ObjectId(id) } });
        slugCounter++;
      }
    }

    let featuredImage = existingBlog.featuredImage;
    let imageId = existingBlog.imageId;

    // Handle Image removal / replacement
    if (file || removeImage) {
      // Delete old image from Cloudinary
      if (existingBlog.imageId) {
         await deleteImage(existingBlog.imageId);
         featuredImage = "";
         imageId = "";
      }
      
      // Upload new image
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadImage(buffer, "drnisargparmar/blogs");
        featuredImage = uploadResult.url;
        imageId = uploadResult.publicId;
      }
    }

    const updateDoc = {
      $set: {
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        isPublished,
        featuredImage,
        imageId,
        updatedAt: new Date(),
      },
    };

    await blogsCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
    const updatedBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error updating blog:", error);
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
    const blogsCollection = db.collection("blogs");

    const existingBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Attempt to delete from cloudinary if it has an imageId
    if (existingBlog.imageId) {
      await deleteImage(existingBlog.imageId);
    }

    await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
