import { Op } from 'sequelize';
import { Listing, User } from '../models/index.js';
import { deleteFile } from '../middleware/uploadMiddleware.js';

const parseBadges = (badges) => {
    if (!badges) return [];
    return typeof badges === 'string' ? badges.split(',').filter(Boolean) : badges;
};

const normalizeListingTypeValue = (rawType) => {
    const type = String(rawType || '').trim().toLowerCase();
    if (type === 'sell') return 'sell';
    if (['meeting', 'mating'].includes(type)) return 'mating';
    if (['day care', 'day_care', 'daycare', 'buy'].includes(type)) return 'buy';
    return type;
};

const normalizeListing = (listing) => {
    const data = listing.toJSON ? listing.toJSON() : listing;
    return {
        ...data,
        images: data.images ? [data.images] : [],
        badges: parseBadges(data.badges)
    };
};

export const createListing = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            title,
            petType,
            breed,
            age,
            gender,
            description,
            listingType,
            price,
            matingFee,
            bloodline,
            healthInfo,
            city,
            state,
            badges
        } = req.body;
        const normalizedListingType = normalizeListingTypeValue(listingType);

        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        if (!title || !petType || !breed || !age || !gender || !city || !state) {
            if (req.file) deleteFile(req.file.filename);
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, petType, breed, age, gender, city, state'
            });
        }

        if (normalizedListingType === 'sell' && !price) {
            if (req.file) deleteFile(req.file.filename);
            return res.status(400).json({
                success: false,
                message: 'Price is required for sell listings'
            });
        }

        if (normalizedListingType === 'mating' && (!matingFee || !bloodline)) {
            if (req.file) deleteFile(req.file.filename);
            return res.status(400).json({
                success: false,
                message: 'Mating fee and bloodline are required for mating listings'
            });
        }

        let badgesStr = null;
        if (badges) {
            if (typeof badges === 'string') {
                try {
                    const parsed = JSON.parse(badges);
                    badgesStr = Array.isArray(parsed) ? parsed.join(',') : badges;
                } catch {
                    badgesStr = badges;
                }
            } else if (Array.isArray(badges)) {
                badgesStr = badges.join(',');
            }
        }

        const listing = await Listing.create({
            user_id: userId,
            title,
            pet_type: petType,
            breed,
            age,
            gender: gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase(), // Normalize to 'Male' or 'Female'
            description: description || null,
            listing_type: normalizedListingType,
            price: normalizedListingType === 'sell' ? price || null : null,
            mating_fee: normalizedListingType === 'mating' ? matingFee || null : null,
            bloodline: normalizedListingType === 'mating' ? bloodline || null : null,
            health_info: normalizedListingType === 'mating' ? healthInfo || null : null,
            city,
            state,
            badges: badgesStr,
            images: imageUrl
        });

        res.status(201).json({
            success: true,
            message: 'Listing created successfully',
            listingId: listing.id,
            image: imageUrl
        });
    } catch (error) {
        console.error('Create listing error:', error);
        if (req.file) deleteFile(req.file.filename);
        res.status(500).json({
            success: false,
            message: 'Failed to create listing'
        });
    }
};

export const getMyListings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { listingType } = req.query;
        const where = { user_id: userId };
        const normalizedListingType = normalizeListingTypeValue(listingType);

        if (listingType && ['sell', 'mating', 'buy'].includes(normalizedListingType)) {
            where.listing_type = normalizedListingType;
        }

        const listings = await Listing.findAll({
            where,
            order: [['created_at', 'DESC']]
        });

        const processedListings = listings.map(normalizeListing);

        res.json({
            success: true,
            count: processedListings.length,
            listings: processedListings
        });
    } catch (error) {
        console.error('Get my listings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch listings'
        });
    }
};

export const updateListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const userId = req.user.id;

        const listing = await Listing.findOne({
            where: { id: listingId, user_id: userId }
        });

        if (!listing) {
            if (req.file) deleteFile(req.file.filename);
            return res.status(404).json({
                success: false,
                message: 'Listing not found or access denied'
            });
        }

        let imageUrl = listing.images;
        if (req.file) {
            if (listing.images) {
                const oldFilename = listing.images.split('/').pop();
                deleteFile(oldFilename);
            }
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const {
            title,
            petType,
            breed,
            age,
            gender,
            description,
            price,
            matingFee,
            bloodline,
            healthInfo,
            city,
            state,
            badges
        } = req.body;

        let badgesStr = null;
        if (badges) {
            if (typeof badges === 'string') {
                try {
                    const parsed = JSON.parse(badges);
                    badgesStr = Array.isArray(parsed) ? parsed.join(',') : badges;
                } catch {
                    badgesStr = badges;
                }
            } else if (Array.isArray(badges)) {
                badgesStr = badges.join(',');
            }
        }

        const updatePayload = {
            title: title ?? listing.title,
            pet_type: petType ?? listing.pet_type,
            breed: breed ?? listing.breed,
            age: age ?? listing.age,
            gender: gender ? (gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()) : listing.gender,
            description: description ?? listing.description,
            city: city ?? listing.city,
            state: state ?? listing.state,
            badges: badgesStr ?? listing.badges,
            images: imageUrl,
            updated_at: new Date()
        };

        if (listing.listing_type === 'sell') {
            updatePayload.price = price ?? listing.price;
        } else {
            updatePayload.mating_fee = matingFee ?? listing.mating_fee;
            updatePayload.bloodline = bloodline ?? listing.bloodline;
            updatePayload.health_info = healthInfo ?? listing.health_info;
        }

        await listing.update(updatePayload);

        res.json({
            success: true,
            message: 'Listing updated successfully',
            image: imageUrl
        });
    } catch (error) {
        console.error('Update listing error:', error);
        if (req.file) deleteFile(req.file.filename);
        res.status(500).json({
            success: false,
            message: 'Failed to update listing'
        });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const userId = req.user.id;

        const listing = await Listing.findOne({
            where: { id: listingId, user_id: userId }
        });

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found or access denied'
            });
        }

        if (listing.images) {
            const filename = listing.images.split('/').pop();
            deleteFile(filename);
        }

        await listing.destroy();

        res.json({
            success: true,
            message: 'Listing deleted successfully'
        });
    } catch (error) {
        console.error('Delete listing error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete listing'
        });
    }
};

export const getHomeListings = async (req, res) => {
    try {
        const { type = 'sell', filter = 'new', limit = 8 } = req.query;
        const normalizedType = normalizeListingTypeValue(type);
        const order = filter === 'popular' ? [['favorite_count', 'DESC']] : [['created_at', 'DESC']];
        const where = {
            is_approved: true,
            status: 'active'
        };

        if (type && ['sell', 'mating', 'buy'].includes(normalizedType)) {
            where.listing_type = normalizedType;
        }

        const listings = await Listing.findAll({
            where,
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email', 'phone', 'is_active'],
                where: { is_active: true }
            }],
            order,
            limit: parseInt(limit, 10)
        });

        const processedListings = listings.map(normalizeListing);

        res.json({
            success: true,
            count: processedListings.length,
            listings: processedListings
        });
    } catch (error) {
        console.error('Get home listings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch listings'
        });
    }
};

export const searchListings = async (req, res) => {
    try {
        const { q, type, location, limit = 20 } = req.query;
        const normalizedType = normalizeListingTypeValue(type);
        const where = {
            is_approved: true,
            status: 'active'
        };

        if (type && ['sell', 'mating', 'buy'].includes(normalizedType)) {
            where.listing_type = normalizedType;
        }

        const searchConditions = [];
        if (q) {
            const searchTerm = { [Op.like]: `%${q}%` };
            searchConditions.push({ title: searchTerm });
            searchConditions.push({ breed: searchTerm });
            searchConditions.push({ pet_type: searchTerm });
            searchConditions.push({ description: searchTerm });
        }

        if (location) {
            const locationTerm = { [Op.like]: `%${location}%` };
            searchConditions.push({ city: locationTerm });
            searchConditions.push({ state: locationTerm });
        }

        if (searchConditions.length > 0) {
            where[Op.or] = searchConditions;
        }

        const listings = await Listing.findAll({
            where,
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name'],
                where: { is_active: true }
            }],
            order: [['created_at', 'DESC']],
            limit: parseInt(limit, 10)
        });

        const processedListings = listings.map(normalizeListing);

        res.json({
            success: true,
            count: processedListings.length,
            listings: processedListings
        });
    } catch (error) {
        console.error('Search listings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search listings'
        });
    }
};

export const getListingById = async (req, res) => {
    try {
        const listingId = req.params.id;
        const listing = await Listing.findOne({
            where: {
                id: listingId,
                status: 'active'
            },
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email', 'phone', 'city', 'state']
            }]
        });

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        await listing.increment('view_count');

        res.json({
            success: true,
            listing: normalizeListing(listing)
        });
    } catch (error) {
        console.error('Get listing by id error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch listing'
        });
    }
};
