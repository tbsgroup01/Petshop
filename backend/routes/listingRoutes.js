import express from 'express';
import {
    createListing,
    getMyListings,
    updateListing,
    deleteListing,
    getHomeListings,
    searchListings,
    getListingById
} from '../controllers/listingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadAnyImage, handleUploadError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/home', getHomeListings);
router.get('/search', searchListings);
router.get('/:id', getListingById);

// Protected routes (require authentication)
router.get('/my/listings', protect, getMyListings);
router.post('/', protect, uploadAnyImage, handleUploadError, createListing);
router.put('/:id', protect, uploadAnyImage, handleUploadError, updateListing);
router.delete('/:id', protect, deleteListing);

export default router;