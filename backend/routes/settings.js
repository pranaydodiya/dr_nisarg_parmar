import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { contactSettingsSchema } from '../validation/schemas.js';
import {
  getContactSettings,
  getAdminContactSettings,
  updateContactSettings
} from '../controllers/settings.js';

const router = express.Router();

router.get('/contact-settings', getContactSettings);
router.get('/admin/contact-settings', requireAuth, getAdminContactSettings);
router.put('/admin/contact-settings', requireAuth, validateBody(contactSettingsSchema), updateContactSettings);

export default router;
