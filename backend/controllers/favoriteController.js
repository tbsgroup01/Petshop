// controllers/favoriteController.js
import { Favorite, Listing, User } from '../models/index.js';

const parseBadges = (badges) => {
    if (!badges) return [];
    return typeof badges === 'string' ? badges.split(',').filter(Boolean) : badges;
};

export const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        const favorites = await Favorite.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Listing,
                    as: 'listing',
                    where: { is_approved: true, status: 'active' },
                    include: [
                        {
                            model: User,
                            as: 'owner',
                            attributes: ['id', 'name', 'email', 'phone']
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        const processedFavorites = favorites.map((favorite) => {
            const listing = favorite.listing?.toJSON ? favorite.listing.toJSON() : favorite.listing;
            return {
                favorite_id: favorite.id,
                favorited_at: favorite.created_at,
                ...listing,
                owner_name: favorite.listing?.owner?.name || null,
                owner_email: favorite.listing?.owner?.email || null,
                owner_phone: favorite.listing?.owner?.phone || null,
                images: listing?.images ? [listing.images] : [],
                badges: parseBadges(listing?.badges)
            };
        });

        res.json({
            success: true,
            count: processedFavorites.length,
            favorites: processedFavorites
        });
    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch favorites',
            error: error.message
        });
    }
};

export const addFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const listingId = req.params.id;

        const listing = await Listing.findOne({
            where: { id: listingId, is_approved: true, status: 'active' }
        });

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found or not available'
            });
        }

        const existing = await Favorite.findOne({
            where: { user_id: userId, listing_id: listingId }
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Listing already in favorites'
            });
        }

        const favorite = await Favorite.create({
            user_id: userId,
            listing_id: listingId
        });

        await listing.increment('favorite_count');

        res.status(201).json({
            success: true,
            message: 'Added to favorites successfully',
            favoriteId: favorite.id,
            listingId
        });
    } catch (error) {
        console.error('Add favorite error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add favorite',
            error: error.message
        });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const listingId = req.params.id;

        const favorite = await Favorite.findOne({
            where: { user_id: userId, listing_id: listingId }
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: 'Favorite not found'
            });
        }

        await favorite.destroy();

        const listing = await Listing.findByPk(listingId);
        if (listing) {
            await listing.decrement('favorite_count');
        }

        res.json({
            success: true,
            message: 'Removed from favorites successfully',
            listingId
        });
    } catch (error) {
        console.error('Remove favorite error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove favorite',
            error: error.message
        });
    }
};

export const checkFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const listingId = req.params.id;

        const favorite = await Favorite.findOne({
            where: { user_id: userId, listing_id: listingId }
        });

        res.json({
            success: true,
            isFavorited: Boolean(favorite),
            favoriteId: favorite ? favorite.id : null
        });
    } catch (error) {
        console.error('Check favorite error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check favorite status',
            error: error.message
        });
    }
};

export const getFavoriteCount = async (req, res) => {
    try {
        const listingId = req.params.id;

        const favoriteCount = await Favorite.count({
            where: { listing_id: listingId }
        });

        res.json({
            success: true,
            listingId,
            favoriteCount
        });
    } catch (error) {
        console.error('Get favorite count error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get favorite count',
            error: error.message
        });
    }
};

export const clearAllFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        const favorites = await Favorite.findAll({
            where: { user_id: userId }
        });

        const listingIds = [...new Set(favorites.map((fav) => fav.listing_id))];

        await Favorite.destroy({
            where: { user_id: userId }
        });

        await Promise.all(
            listingIds.map(async (listingId) => {
                const listing = await Listing.findByPk(listingId);
                if (listing) {
                    await listing.decrement('favorite_count', { by: 1 });
                }
            })
        );

        res.json({
            success: true,
            message: 'All favorites cleared successfully',
            count: favorites.length
        });
    } catch (error) {
        console.error('Clear all favorites error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to clear favorites',
            error: error.message
        });
    }
};