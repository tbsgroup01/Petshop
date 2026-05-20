import express from 'express';
import {
    getPendingListings,
    getAllListings,
    approveListing,
    rejectListing,
    toggleHomeVisibility,
    deleteAnyListing,
    getAllUsers,
    getVendorDetailsWithListings,
    editUserByAdmin,
    toggleUserStatus,
    getAdminLogs,
    getDashboardStats,
    changeListingStatus,
    // updateAdminPassword
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import {adminOnly} from '../middleware/adminMiddleware.js';
import { forgetadmin } from '../controllers/authController.js';


const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

//add new one
router.post('/forgot-password', forgetadmin);
// router.post('/update-password', updateAdminPassword)

// Dashboard
router.get('/dashboard/stats', getDashboardStats); //Done

// Listing management
router.get('/listings/pending', getPendingListings); //DONE
router.get('/listings', getAllListings);
router.put('/listings/:id/approve', approveListing); //Done
router.put('/listings/:id/reject', rejectListing); //Done
router.put('/listings/:id/status', changeListingStatus); //Done
router.put('/listings/:id/visibility', toggleHomeVisibility); //Done
router.delete('/listings/:id', deleteAnyListing);  //Done

// User management
router.get('/users', getAllUsers); //Done
router.get('/vendors/:id', getVendorDetailsWithListings);
router.put('/users/:id/edit', editUserByAdmin); //Done
router.put('/users/:id/toggle-status', toggleUserStatus); //Done

// Logs
router.get('/logs', getAdminLogs); //Done

export default router;
