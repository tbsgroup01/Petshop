import { verifyToken } from '../config/jwt.js';
import { User } from '../models/index.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }

    try {
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, invalid token'
            });
        }

        const user = await User.findByPk(decoded.userId, {
            attributes: ['id', 'name', 'email', 'role', 'is_active']
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.is_active) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Contact admin.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
    }
};

