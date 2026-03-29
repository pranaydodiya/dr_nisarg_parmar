import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';

// GET /api/blogs (Public)
export async function getPublicBlogs(req, res) {
  try {
    const db = getDb();
    const blogsCollection = db.collection("blogs");
    const blogs = await blogsCollection.find({ isPublished: true }).sort({ createdAt: -1 }).toArray();
    return res.json(blogs);
  } catch (error) {
    console.error("Error fetching public blogs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/blogs/:slug (Public)
export async function getPublicBlogBySlug(req, res) {
  try {
    const slugParam = req.params?.slug;
    if (typeof slugParam !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const slug = slugParam.trim().toLowerCase();
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const db = getDb();
    const blog = await db.collection("blogs").findOne({ slug, isPublished: true });

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    return res.json(blog);
  } catch (error) {
    console.error("Error fetching public blog by slug:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/admin/blogs
export async function getBlogs(req, res) {
  try {
    const db = getDb();
    const blogsCollection = db.collection("blogs");
    const blogs = await blogsCollection.find({}).sort({ createdAt: -1 }).toArray();
    return res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST /api/admin/blogs
export async function createBlog(req, res) {
  try {
    const { title, excerpt, content, category = "Uncategorized", tags: tagsStr, isPublished } = req.body;
    const file = req.file;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];

    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const db = getDb();
    const blogsCollection = db.collection("blogs");

    let existingSlug = await blogsCollection.findOne({ slug });
    let slugCounter = 1;
    while (existingSlug) {
      slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}-${slugCounter}`;
      existingSlug = await blogsCollection.findOne({ slug });
      slugCounter++;
    }

    let featuredImage = "";
    let imageId = "";
    if (file) {
      const uploadResult = await uploadImage(file.buffer, "drnisargparmar/blogs");
      featuredImage = uploadResult.url;
      imageId = uploadResult.publicId;
    }

    const newBlog = {
      title,
      slug,
      excerpt: excerpt || "",
      content,
      category,
      tags,
      isPublished: isPublished === "true" || isPublished === true,
      featuredImage,
      imageId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogsCollection.insertOne(newBlog);
    return res.status(201).json({ ...newBlog, _id: result.insertedId });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/admin/blogs/:id
export async function getBlog(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const db = getDb();
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    return res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// PUT /api/admin/blogs/:id
export async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const { title, excerpt, content, category = "Uncategorized", tags: tagsStr, isPublished, removeImage } = req.body;
    const file = req.file;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];

    const db = getDb();
    const blogsCollection = db.collection("blogs");

    const existingBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!existingBlog) return res.status(404).json({ error: "Blog not found" });

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

    if (file || removeImage === "true" || removeImage === true) {
      if (existingBlog.imageId) {
         await deleteImage(existingBlog.imageId);
         featuredImage = "";
         imageId = "";
      }
      
      if (file) {
        const uploadResult = await uploadImage(file.buffer, "drnisargparmar/blogs");
        featuredImage = uploadResult.url;
        imageId = uploadResult.publicId;
      }
    }

    const updateDoc = {
      $set: {
        title,
        slug,
        excerpt: excerpt || "",
        content,
        category,
        tags,
        isPublished: isPublished === "true" || isPublished === true,
        featuredImage,
        imageId,
        updatedAt: new Date(),
      },
    };

    await blogsCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
    const updatedBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    return res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// DELETE /api/admin/blogs/:id
export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const db = getDb();
    const blogsCollection = db.collection("blogs");

    const existingBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!existingBlog) return res.status(404).json({ error: "Blog not found" });

    if (existingBlog.imageId) {
      await deleteImage(existingBlog.imageId);
    }

    await blogsCollection.deleteOne({ _id: new ObjectId(id) });
    return res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
