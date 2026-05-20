// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { testConnection } from './config/db.js';
import './models/index.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import homesliderRoutes from './routes/homesliderRoute.js'; 
import settingRoutes from './routes/settingRoute.js';
// import messageRoutes from './routes/messageRoutes.js';



// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '192.168.29.185';

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the same upload directory used by multer
app.use('/uploads', express.static(path.join(__dirname, 'middleware', 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/home-slider', homesliderRoutes ); // Use dedicated home slider routes
app.use('/api/settings', settingRoutes);
// app.use('/api/messages', messageRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'PAT Marketplace API is running',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            listings: '/api/listings',
            admin: '/api/admin',
            favorites: '/api/favorites',
            homeslider: '/api/home-slider',
            settings: '/api/settings',
            messages: '/api/messages'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const startServer = async () => {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
        console.error('Failed to connect to database. Server not started.');
        process.exit(1);
    }
    
    app.listen(PORT, HOST, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`API URL: http://${HOST}:${PORT}`);
    });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Start the server
startServer();

export default app;
