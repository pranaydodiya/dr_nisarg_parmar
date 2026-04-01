import express from 'express';
import { login, logout, getSession } from '../controllers/auth.js';
import { validateBody } from '../middleware/validate.js';
import { loginBodySchema } from '../validation/schemas.js';

const router = express.Router();

router.post('/login', validateBody(loginBodySchema), login);
router.post('/logout', logout);
router.get('/session', getSession);

export default router;
