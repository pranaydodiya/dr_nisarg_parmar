import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { testimonialMultipartSchema } from '../validation/schemas.js';
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
router.post('/admin/testimonials', requireAuth, upload.single('thumbnail'), validateBody(testimonialMultipartSchema), createTestimonial);
router.get('/admin/testimonials/:id', requireAuth, getTestimonial);
router.put('/admin/testimonials/:id', requireAuth, upload.single('thumbnail'), validateBody(testimonialMultipartSchema), updateTestimonial);
router.delete('/admin/testimonials/:id', requireAuth, deleteTestimonial);

export default router;
