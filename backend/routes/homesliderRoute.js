import express from "express";

import {
    addHomeSlider,
    getHomeSliders,
    getHomeSliderById,
    updateHomeSlider,
    deleteHomeSlider
} from "../controllers/homesliderController.js";

import { uploadAnyImage, handleUploadError } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();
// Public routes
router.get('/', getHomeSliders);
router.get('/:id', getHomeSliderById);

// Protected admin routes
router.post('/', protect, adminOnly, uploadAnyImage, handleUploadError, addHomeSlider);
router.put('/:id', protect, adminOnly, uploadAnyImage, handleUploadError, updateHomeSlider);
router.delete('/:id', protect, adminOnly, deleteHomeSlider);
export default router;
