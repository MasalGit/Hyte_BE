import express from 'express';
import { login, getMe } from '../controllers/auth-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

// Router for authentication endpoints
// - POST /api/auth/login => authenticate and receive token
// - GET  /api/auth/me    => validate token and return user info
const router = express.Router();

router.post('/login', login);
router.get('/me', authenticateToken, getMe);

export default router;
