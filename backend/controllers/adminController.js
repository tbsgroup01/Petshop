// controllers/adminController.js
import { Op } from 'sequelize';
import { Listing, User, AdminLog, Favorite, sequelize } from '../models/index.js';

const normalizeListing = (listing) => {
    const data = listing.toJSON ? listing.toJSON() : listing;
    return {
        ...data,
        images: data.images ? [data.images] : [],
        badges: data.badges ? data.badges.split(',') : []
    };
};

const parseBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }
    return Boolean(value);
};

const createAdminLogSafe = async (payload) => {
    try {
        await AdminLog.create(payload);
    } catch (error) {
        console.error('Admin log create failed:', error?.message || error);
    }
};

// // admin updatepassword
// // admin updatepassword
// export const updateAdminPassword = async (req, res) => {
//     try {

//         const adminId = req.user.id;

//         const {email, currentPassword, newPassword} = req.body;

//         const admin = await Admin.findByPk(adminId);

//         if (!admin) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Admin not found'
//             });
//         }

//         // compare current password
//         const isMatch = await admin.comparePassword(currentPassword);

//         if (!isMatch) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Current password is incorrect'
//             });
//         }

//         // update password
//         admin.password = newPassword;

//         await admin.save();

//         return res.status(200).json({
//             success: true,
//             message: 'Password updated successfully'
//         });

//     } catch (error) {

//         console.error('Error in updateAdminPassword:', error);

//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error while updating password',
//             error: process.env.NODE_ENV === 'development'
//                 ? error.message
//                 : undefined
//         });
//     }
// };


export const getPendingListings = async (req, res) => {
    try {
        const listings = await Listing.findAll({
            where: {
                is_approved: false
            },
            include: [{
                model: User,
                as: 'owner',
                attributes: ['name', 'email', 'phone']
            }],
            order: [['created_at', 'DESC']]
        });

        const processedListings = listings.map((listing) => ({
            ...normalizeListing(listing),
            owner_name: listing.owner?.name || null,
            owner_email: listing.owner?.email || null,
            owner_phone: listing.owner?.phone || null
        }));

        res.json({
            success: true,
            count: processedListings.length,
            listings: processedListings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const approveListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const adminId = req.user.id;

        const listing = await Listing.findByPk(listingId);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: `Listing with ID ${listingId} not found`
            });
        }

        if (listing.is_approved) {
            return res.status(400).json({
                success: false,
                message: 'Listing is already approved'
            });
        }

        // Allow re-approving any not-yet-approved listing (e.g. previously rejected/inactive)
        // and normalize it to active when approved by admin.

        await listing.update({
            is_approved: true,
            status: 'active',
            is_visible_on_home: true,
            updated_at: new Date(),
            approved_by: adminId,
            approved_at: new Date()
        });

        await createAdminLogSafe({
            admin_id: adminId,
            action: 'approve_listing',
            target_type: 'listing',
            target_id: listingId,
            notes: `Listing approved - Type: ${listing.listing_type}`
        });

        res.json({
            success: true,
            message: 'Listing approved successfully',
            data: {
                listing_id: listingId,
                status: 'active',
                is_approved: true,
                is_visible_on_home: true,
                approved_by: adminId,
                approved_at: listing.approved_at
            }
        });
    } catch (error) {
        console.error('Error in approveListing:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while approving listing',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const rejectListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const adminId = req.user.id;
        const { reason } = req.body;

        const listing = await Listing.findByPk(listingId);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        await listing.update({ status: 'inactive', updated_at: new Date() });

        await createAdminLogSafe({
            admin_id: adminId,
            action: 'reject_listing',
            target_type: 'listing',
            target_id: listingId,
            notes: reason || 'Listing rejected'
        });

        res.json({
            success: true,
            message: 'Listing rejected successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const changeListingStatus = async (req, res) => {
    try {
        const listingId = req.params.id;
        const adminId = req.user.id;
        const { status } = req.body;
        const validStatuses = ['pending', 'active', 'sold', 'inactive'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        const listing = await Listing.findByPk(listingId);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        const oldStatus = listing.status;
        const updates = {
            status,
            updated_at: new Date()
        };

        if (status === 'active') {
            updates.is_approved = true;
        }
        if (status === 'sold') {
            updates.is_visible_on_home = false;
        }

        await listing.update(updates);

        await createAdminLogSafe({
            admin_id: adminId,
            action: 'change_status',
            target_type: 'listing',
            target_id: listingId,
            notes: `Status changed from ${oldStatus} to ${status}`
        });

        res.json({
            success: true,
            message: `Listing status changed to ${status} successfully`,
            listingId,
            oldStatus,
            newStatus: status
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

export const toggleHomeVisibility = async (req, res) => {
    try {
        const listingId = req.params.id;
        const adminId = req.user.id;
        const rawVisibility = req.body.isVisible ?? req.body.show_on_home;
        const isVisible = parseBoolean(rawVisibility);

        const listing = await Listing.findByPk(listingId);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        await listing.update({ is_visible_on_home: isVisible, updated_at: new Date() });

        await createAdminLogSafe({
            admin_id: adminId,
            action: isVisible ? 'show_listing' : 'hide_listing',
            target_type: 'listing',
            target_id: listingId,
            notes: `Visibility set to ${isVisible}`
        });

        res.json({
            success: true,
            message: `Listing ${isVisible ? 'visible on' : 'hidden from'} home screen`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const deleteAnyListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const adminId = req.user.id;

        const listing = await Listing.findByPk(listingId);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        const title = listing.title;
        await listing.destroy();

        await createAdminLogSafe({
            admin_id: adminId,
            action: 'delete_listing',
            target_type: 'listing',
            target_id: listingId,
            notes: `Deleted listing: ${title || 'Unknown'}`
        });

        res.json({
            success: true,
            message: 'Listing deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'role', 'is_active', 'city', 'state', 'created_at', 'profile_picture'],
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const editUserByAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, phone, city, state, role, is_active } = req.body;
        const adminId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const updates = {};
        if (name !== undefined && name !== null) updates.name = name;

        if (email !== undefined && email !== null) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }

            const existingEmail = await User.findOne({
                where: { email, id: { [Op.ne]: userId } }
            });
            if (existingEmail) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already in use by another user'
                });
            }
            updates.email = email;
        }

        if (phone !== undefined && phone !== null) {
            if (String(phone).length < 10) {
                return res.status(400).json({
                    success: false,
                    message: 'Phone number must be at least 10 digits'
                });
            }
            updates.phone = phone;
        }

        if (city !== undefined && city !== null) updates.city = city;
        if (state !== undefined && state !== null) updates.state = state;

        if (role !== undefined && role !== null) {
            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: 'Role must be either "user" or "admin"'
                });
            }
            updates.role = role;
        }

        if (is_active !== undefined && is_active !== null) {
            updates.is_active = parseBoolean(is_active);
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields provided for update'
            });
        }

        await user.update(updates);

        const changedFields = Object.keys(updates).join(', ');
        await createAdminLogSafe({
            admin_id: adminId,
            action: 'edit_user',
            target_type: 'user',
            target_id: userId,
            notes: `User profile edited by admin. Updated fields: ${changedFields}`
        });

        const updatedUser = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'phone', 'city', 'state', 'role', 'is_active', 'created_at']
        });

        res.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error in editUserByAdmin:', error);
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
};

export const toggleUserStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const adminId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const newStatus = !user.is_active;
        await user.update({ is_active: newStatus });

        const action = newStatus ? 'unblock_user' : 'block_user';
        await createAdminLogSafe({
            admin_id: adminId,
            action,
            target_type: 'user',
            target_id: userId,
            notes: `User ${newStatus ? 'activated' : 'deactivated'}`
        });

        res.json({
            success: true,
            message: `User ${newStatus ? 'activated' : 'deactivated'} successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const getAdminLogs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit || '50', 10);

        const logs = await AdminLog.findAll({
            include: [{
                model: User,
                as: 'admin',
                attributes: ['name']
            }],
            order: [['created_at', 'DESC']],
            limit
        });

        const listingIds = logs.filter((log) => log.target_type === 'listing').map((log) => log.target_id);
        const userIds = logs.filter((log) => log.target_type === 'user').map((log) => log.target_id);

        const targetListings = await Listing.findAll({
            where: { id: listingIds }
        });
        const targetUsers = await User.findAll({
            where: { id: userIds }
        });

        const listingMap = new Map(targetListings.map((item) => [item.id, item.title]));
        const userMap = new Map(targetUsers.map((item) => [item.id, item.name]));

        const processedLogs = logs.map((log) => ({
            ...log.toJSON(),
            admin_name: log.admin?.name || null,
            target_name: log.target_type === 'listing'
                ? listingMap.get(log.target_id) || null
                : userMap.get(log.target_id) || null
        }));

        res.json({
            success: true,
            count: processedLogs.length,
            logs: processedLogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const getVendorDetailsWithListings = async (req, res) => {
    try {
        const vendorId = req.params.id;

        const vendor = await User.findByPk(vendorId, {
            attributes: ['id', 'name', 'email', 'phone', 'role', 'city', 'state', 'created_at', 'is_active', 'profile_picture']
        });

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        const listings = await Listing.findAll({
            where: { user_id: vendorId },
            order: [['created_at', 'DESC']]
        });

        const processedListings = listings.map(normalizeListing);

        res.json({
            success: true,
            vendor,
            listings: processedListings,
            count: processedListings.length
        });
    } catch (error) {
        console.error('Error in getVendorDetailsWithListings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch vendor details'
        });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.count({ where: { role: 'user' } });
        const totalListings = await Listing.count();
        const pendingListings = await Listing.count({ where: { is_approved: false } });
        const totalFavorites = await Favorite.count();

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalListings,
                pendingListings,
                totalFavorites
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.findAll({
            include: [{
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email', 'phone', 'city', 'state']
            }],
            order: [['created_at', 'DESC']]
        });

        const processedListings = listings.map((listing) => ({
            ...normalizeListing(listing),
            owner_id: listing.owner?.id || listing.user_id || null,
            owner_name: listing.owner?.name || null,
            owner_email: listing.owner?.email || null,
            owner_phone: listing.owner?.phone || null
        }));

        res.json({
            success: true,
            count: processedListings.length,
            listings: processedListings
        });
    } catch (error) {
        console.error('Error in getAllListings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch all listings'
        });
    }
};

