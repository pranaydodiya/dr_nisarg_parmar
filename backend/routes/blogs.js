import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../controllers/testimonials.js'; // Reuse the memory storage upload
import {
  getPublicBlogs,
  getPublicBlogBySlug,
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogs.js';

const router = express.Router();

router.get('/blogs', getPublicBlogs);
router.get('/blogs/:slug', getPublicBlogBySlug);

router.get('/admin/blogs', requireAuth, getBlogs);
router.post('/admin/blogs', requireAuth, upload.single('image'), createBlog);
router.get('/admin/blogs/:id', requireAuth, getBlog);
router.put('/admin/blogs/:id', requireAuth, upload.single('image'), updateBlog);
router.delete('/admin/blogs/:id', requireAuth, deleteBlog);

export default router;
