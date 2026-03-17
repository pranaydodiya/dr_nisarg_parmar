import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getPublicTestimonials,
  getTestimonials,
  createTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
  upload
} from '../controllers/testimonials.js';

const router = express.Router();

// Public Routes
router.get('/testimonials', getPublicTestimonials);

// Adding Admin Routes
router.get('/admin/testimonials', requireAuth, getTestimonials);
router.post('/admin/testimonials', requireAuth, upload.single('thumbnail'), createTestimonial);
router.get('/admin/testimonials/:id', requireAuth, getTestimonial);
router.put('/admin/testimonials/:id', requireAuth, upload.single('thumbnail'), updateTestimonial);
router.delete('/admin/testimonials/:id', requireAuth, deleteTestimonial);

export default router;
