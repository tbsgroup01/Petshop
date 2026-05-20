// utils/helper.js

// ============================================
// 1. VALIDATION FUNCTIONS
// ============================================

// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number (10 digits)
export const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

// Validate price (positive number)
export const isValidPrice = (price) => {
    return !isNaN(price) && price >= 0;
};

// Validate age (positive number, max 500 months ~ 41 years)
export const isValidAge = (age) => {
    return !isNaN(age) && age >= 0 && age <= 500;
};

// Validate string length
export const isValidLength = (str, min, max) => {
    if (!str) return false;
    return str.length >= min && str.length <= max;
};

// ============================================
// 2. DATA FORMATTING FUNCTIONS
// ============================================

// Format price to INR or USD
export const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(price);
};

// Format date to readable string
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Format relative time (e.g., "2 days ago")
export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
        }
    }
    return 'just now';
};

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// ============================================
// 3. RESPONSE FORMATTING FUNCTIONS
// ============================================

// Format success response
export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

// Format error response
export const errorResponse = (res, message = 'Server error', statusCode = 500, error = null) => {
    const response = {
        success: false,
        message,
        timestamp: new Date().toISOString()
    };
    
    if (error && process.env.NODE_ENV === 'development') {
        response.error = error.message;
    }
    
    return res.status(statusCode).json(response);
};

// Format paginated response
export const paginatedResponse = (res, data, total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    
    return res.json({
        success: true,
        data,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        },
        timestamp: new Date().toISOString()
    });
};

// ============================================
// 4. PAGINATION HELPER
// ============================================

// Calculate pagination offset
export const getPagination = (page = 1, limit = 10) => {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;
    
    return {
        offset,
        limit: limitNumber,
        page: pageNumber
    };
};

// ============================================
// 5. FILE UPLOAD HELPERS
// ============================================

// Generate unique filename
export const generateUniqueFilename = (originalname) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalname.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
};

// Validate file type
export const isValidFileType = (mimetype, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']) => {
    return allowedTypes.includes(mimetype);
};

// Get file size in readable format
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ============================================
// 6. STRING MANIPULATION
// ============================================

// Generate slug from string
export const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
};

// Extract keywords from text for search
export const extractKeywords = (text) => {
    if (!text) return [];
    return text
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2)
        .slice(0, 10);
};

// ============================================
// 7. ARRAY HELPERS
// ============================================

// Remove duplicates from array
export const removeDuplicates = (arr) => {
    return [...new Set(arr)];
};

// Chunk array into smaller arrays
export const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

// ============================================
// 8. OBJECT HELPERS
// ============================================

// Remove null/undefined values from object
export const cleanObject = (obj) => {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && value !== '') {
            newObj[key] = value;
        }
    }
    return newObj;
};

// Pick specific fields from object
export const pickFields = (obj, fields) => {
    const newObj = {};
    fields.forEach(field => {
        if (obj[field] !== undefined) {
            newObj[field] = obj[field];
        }
    });
    return newObj;
};

// ============================================
// 9. API HELPER FUNCTIONS
// ============================================

// Extract token from request headers
export const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
};

// Build search query for listings
export const buildSearchQuery = (searchParams) => {
    const { q, breed, city, state, minPrice, maxPrice, petType } = searchParams;
    let conditions = [];
    let params = [];
    
    if (q) {
        conditions.push('(title LIKE ? OR description LIKE ?)');
        params.push(`%${q}%`, `%${q}%`);
    }
    
    if (breed) {
        conditions.push('breed LIKE ?');
        params.push(`%${breed}%`);
    }
    
    if (city) {
        conditions.push('city LIKE ?');
        params.push(`%${city}%`);
    }
    
    if (state) {
        conditions.push('state LIKE ?');
        params.push(`%${state}%`);
    }
    
    if (petType) {
        conditions.push('pet_type = ?');
        params.push(petType);
    }
    
    if (minPrice) {
        conditions.push('price >= ?');
        params.push(minPrice);
    }
    
    if (maxPrice) {
        conditions.push('price <= ?');
        params.push(maxPrice);
    }
    
    return {
        whereClause: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
        params
    };
};

// ============================================
// 10. VALIDATION FOR LISTING INPUTS
// ============================================

// Validate listing input
export const validateListingInput = (data, listingType) => {
    const errors = [];
    
    // Required common fields
    const requiredFields = ['title', 'petType', 'breed', 'age', 'gender', 'city', 'state'];
    for (const field of requiredFields) {
        if (!data[field]) {
            errors.push(`${field} is required`);
        }
    }
    
    // Type-specific validation
    if (listingType === 'sell') {
        if (!data.price || data.price <= 0) {
            errors.push('Valid price is required for sell listings');
        }
        if (data.price && data.price > 1000000) {
            errors.push('Price cannot exceed 1,000,000');
        }
    } else if (listingType === 'mating') {
        if (!data.matingFee || data.matingFee <= 0) {
            errors.push('Valid mating fee is required');
        }
        if (!data.bloodline) {
            errors.push('Bloodline information is required');
        }
        if (!data.healthInfo) {
            errors.push('Health information is required');
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

// ============================================
// 11. FILTER SANITIZATION
// ============================================

// Sanitize filter parameters
export const sanitizeFilters = (filters) => {
    const allowedFilters = ['popular', 'new', 'nearby', 'price_low', 'price_high'];
    const allowedTypes = ['sell', 'mating'];
    
    return {
        filter: allowedFilters.includes(filters.filter) ? filters.filter : 'popular',
        type: allowedTypes.includes(filters.type) ? filters.type : null,
        limit: Math.min(Math.max(parseInt(filters.limit) || 10, 1), 100),
        page: Math.max(parseInt(filters.page) || 1, 1)
    };
};

// ============================================
// 12. GEOLOCATION HELPERS (for nearby feature)
// ============================================

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

// ============================================
// 13. RANDOM GENERATORS
// ============================================

// Generate random OTP
export const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
};

// Generate random ID
export const generateRandomId = (prefix = '') => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
};

// ============================================
// 14. LOGGING HELPERS
// ============================================

// Log API request
export const logRequest = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });
    next();
};

// ============================================
// 15. CACHE HELPERS (if using Redis)
// ============================================

// Generate cache key
export const generateCacheKey = (prefix, params) => {
    return `${prefix}:${JSON.stringify(params)}`;
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

// export default {
//     // Validation
//     isValidEmail,
//     isValidPhone,
//     isValidPrice,
//     isValidAge,
//     isValidLength,
    
//     // Formatting
//     formatPrice,
//     formatDate,
//     timeAgo,
//     capitalizeWords,
//     truncateText,
    
//     // Response
//     successResponse,
//     errorResponse,
//     paginatedResponse,
    
//     // Pagination
//     getPagination,
    
//     // File upload
//     generateUniqueFilename,
//     isValidFileType,
//     formatFileSize,
    
//     // String manipulation
//     generateSlug,
//     extractKeywords,
    
//     // Array/Object helpers
//     removeDuplicates,
//     chunkArray,
//     cleanObject,
//     pickFields,
    
//     // API helpers
//     extractToken,
//     buildSearchQuery,
//     validateListingInput,
//     sanitizeFilters,
    
//     // Geolocation
//     calculateDistance,
    
//     // Generators
//     generateOTP,
//     generateRandomId,
    
//     // Logging
//     logRequest,
    
//     // Cache
//     generateCacheKey
// };