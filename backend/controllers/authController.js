import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { generateToken } from '../config/jwt.js';

// FR1.1: User Registration
export const register = async (req, res) => {
    try {
        const { name, email, password, phone, city, state, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }
        // role validation
        const allowedRoles = ['user', 'admin', 'vendor'];
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role specified'
            });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            city: city || null,
            state: state || null,
            role: role || 'user'
        });

        const token = generateToken(user.id, user.email, user.role);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,

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

// FR1.2: User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        if (!user.is_active) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Contact admin.'
            });
        }

        const token = generateToken(user.id, user.email, user.role);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
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

// Get current user profile (read-only)
export const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'phone', 'role', 'city', 'state', 'profile_picture', 'created_at']
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const forgetadmin = async (req, res) => {
    try {

        const { email, newPassword } = req.body;

        // Validation
        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email and new password are required'
            });
        }

        // Find admin
        const adminUser = await User.findOne({
            where: {
                email,
                role: 'admin'
            }
        });

        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Prevent same password
        const isSamePassword = await bcrypt.compare(
            String(newPassword),
            String(adminUser.password)
        );

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: 'New password cannot be same as old password'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            String(newPassword),
            10
        );

        // Update password
        await adminUser.update({
            password: hashedPassword
        });

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// update admin password
export const updateAdminPassword = async (req, res) => {
    try {

        const {
            email,
            currentPassword,
            newPassword
        } = req.body;

        // Validation
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find admin
        const admin = await User.findOne({
            where: {
                email,
                role: "admin"
            }
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }
        console.log(currentPassword);
        console.log(admin.password);
        // Compare current password
        const isPasswordValid = await bcrypt.compare(
            String(currentPassword),
            String(admin.password)
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Check same password
        if (currentPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            String(newPassword),
            10
        );

        // Update password
        admin.password = hashedPassword;

        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {

        console.error(
            "Error in updateAdminPassword:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
