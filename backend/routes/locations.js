import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { locationBodySchema, reorderLocationsSchema } from '../validation/schemas.js';
import {
  getLocations,
  getAdminLocations,
  createLocation,
  getLocation,
  updateLocation,
  deleteLocation,
  reorderLocations
} from '../controllers/locations.js';

const router = express.Router();

// Public route
router.get('/locations', getLocations);

// Admin routes (Protected)
router.get('/admin/locations', requireAuth, getAdminLocations);
router.post('/admin/locations', requireAuth, validateBody(locationBodySchema), createLocation);
router.put('/admin/locations/reorder', requireAuth, validateBody(reorderLocationsSchema), reorderLocations);
router.get('/admin/locations/:id', requireAuth, getLocation);
router.put('/admin/locations/:id', requireAuth, validateBody(locationBodySchema), updateLocation);
router.delete('/admin/locations/:id', requireAuth, deleteLocation);

export default router;
