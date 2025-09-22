import { Router } from 'express';
import { AuthController } from '@/controllers/AuthController';
import { authenticateToken } from '@/middleware/auth';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

// Protected routes
router.use(authenticateToken);
router.post('/logout', authController.logout);
router.post('/change-password', authController.changePassword);
router.get('/me', authController.getCurrentUser);

export default router;