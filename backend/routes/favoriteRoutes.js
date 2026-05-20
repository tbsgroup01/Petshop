// routes/favoriteRoutes.js
import express from 'express';
import {
    getFavorites,
    addFavorite,
    removeFavorite,
    checkFavorite,
    getFavoriteCount,
    clearAllFavorites
} from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route (no authentication required)
router.get('/count/:id', getFavoriteCount);

// Protected routes (authentication required)
router.use(protect);

// Get all favorites for logged-in user
router.get('/', getFavorites); //Done

// Add to favorite
router.post('/:id', addFavorite); //Done

// Remove from favorite
router.delete('/:id', removeFavorite); //Done

// Check if listing is favorited
router.get('/check/:id', checkFavorite); //Done

// Clear all favorites
router.delete('/clear/all', clearAllFavorites); //Done

export default router;