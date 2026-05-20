import express from 'express';
import { addSetting, updateSetting } from '../controllers/settingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadAnyImage, handleUploadError } from '../middleware/uploadMiddleware.js';
const router = express.Router();

// Protected routes (require authentication)
// router.use(protect);
 
 
router.post('/', protect, uploadAnyImage, handleUploadError, addSetting);
router.patch('/:id',protect, uploadAnyImage, handleUploadError, updateSetting);

export default router;