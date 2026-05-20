import express from 'express';
import { register, login, getMe, forgetadmin, updateAdminPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register); //Done
router.post('/login', login);       //Done
router.get('/me', protect, getMe);  //Done
router.post('/forgetadmin',forgetadmin);
router.post('/update-password',updateAdminPassword)

export default router;