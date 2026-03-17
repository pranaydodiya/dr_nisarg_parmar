import multer from 'multer';
import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';

// Setup basic memory storage for multer
const storage = multer.memoryStorage();
export const upload = multer({ storage });

function extractYouTubeId(url) {
  const regExp = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// GET /api/testimonials (Public)
export async function getPublicTestimonials(req, res) {
  try {
    const db = getDb();
    const testimonialsCollection = db.collection("testimonials");
    const testimonials = await testimonialsCollection.find({ isPublished: true }).sort({ createdAt: -1 }).toArray();
    return res.json(testimonials);
  } catch (error) {
    console.error("Error fetching public testimonials:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/admin/testimonials
export async function getTestimonials(req, res) {
  try {
    const db = getDb();
    const testimonialsCollection = db.collection("testimonials");
    const testimonials = await testimonialsCollection.find({}).sort({ createdAt: -1 }).toArray();
    return res.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST /api/admin/testimonials
export async function createTestimonial(req, res) {
  try {
    const { patientName, condition, summary, videoUrl, platform = 'youtube', isPublished } = req.body;
    
    // multer provides req.file if 'thumbnail' was uploaded
    const file = req.file; 

    if (!patientName || !videoUrl) {
      return res.status(400).json({ error: "Patient Name and Video URL are required" });
    }

    let thumbnailUrl = "";
    let thumbnailId = "";

    if (platform === "youtube") {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      } else {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }
    } else if (platform === "instagram" && file) {
      const buffer = file.buffer;
      const uploadResult = await uploadImage(buffer, "drnisargparmar/testimonials");
      thumbnailUrl = uploadResult.url;
      thumbnailId = uploadResult.publicId;
    }

    const newTestimonial = {
      patientName,
      condition: condition || "",
      summary: summary || "",
      videoUrl,
      platform,
      thumbnailUrl,
      thumbnailId,
      isPublished: isPublished === "true" || isPublished === true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = getDb();
    const result = await db.collection("testimonials").insertOne(newTestimonial);

    return res.status(201).json({ ...newTestimonial, _id: result.insertedId });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/admin/testimonials/:id
export async function getTestimonial(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const db = getDb();
    const testimonial = await db.collection("testimonials").findOne({ _id: new ObjectId(id) });

    if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });
    return res.json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// PUT /api/admin/testimonials/:id
export async function updateTestimonial(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const { patientName, condition, summary, videoUrl, platform = 'youtube', isPublished, removeImage } = req.body;
    const file = req.file;

    if (!patientName || !videoUrl) {
      return res.status(400).json({ error: "Patient Name and Video URL are required" });
    }

    const db = getDb();
    const collection = db.collection("testimonials");

    const existingDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingDoc) return res.status(404).json({ error: "Testimonial not found" });

    let thumbnailUrl = existingDoc.thumbnailUrl;
    let thumbnailId = existingDoc.thumbnailId;

    const isUrlChanged = existingDoc.videoUrl !== videoUrl;
    const isPlatformChanged = existingDoc.platform !== platform;

    // Remove old image if requested, overwritten, or platform changed away from instagram
    if (file || removeImage === "true" || removeImage === true || (isPlatformChanged && existingDoc.platform === "instagram")) {
      if (thumbnailId) {
        await deleteImage(thumbnailId);
        thumbnailUrl = "";
        thumbnailId = "";
      }
    }

    if (platform === "youtube" && (isUrlChanged || isPlatformChanged || !thumbnailUrl)) {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      } else {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }
    } else if (platform === "instagram" && file) {
      const buffer = file.buffer;
      const uploadResult = await uploadImage(buffer, "drnisargparmar/testimonials");
      thumbnailUrl = uploadResult.url;
      thumbnailId = uploadResult.publicId;
    }

    const updateDoc = {
      $set: {
        patientName,
        condition: condition || "",
        summary: summary || "",
        videoUrl,
        platform,
        thumbnailUrl,
        thumbnailId,
        isPublished: isPublished === "true" || isPublished === true,
        updatedAt: new Date(),
      },
    };

    await collection.updateOne({ _id: new ObjectId(id) }, updateDoc);
    const updatedTestimonial = await collection.findOne({ _id: new ObjectId(id) });

    return res.json(updatedTestimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// DELETE /api/admin/testimonials/:id
export async function deleteTestimonial(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const db = getDb();
    const collection = db.collection("testimonials");

    const existingDoc = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingDoc) return res.status(404).json({ error: "Testimonial not found" });

    if (existingDoc.thumbnailId) {
      await deleteImage(existingDoc.thumbnailId);
    }

    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
