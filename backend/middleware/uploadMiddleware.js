import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// const uploadDir = path.join(process.cwd(), "./uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

// Export both single and multiple upload middleware
export const uploadSingleImage = upload.single('image');
export const uploadMultipleImages = upload.array('images', 5);
export const uploadAnyImage = upload.single('image'); // Alias for single

// export const deleteFile = (filename) => {
//     try {
//         if (!filename) return false;
//         const filePath = path.join(uploadDir, filename);
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//             console.log('File deleted:', filename);
//             return true;
//         }
//         return false;
//     } catch (error) {
//         console.error('Error deleting file:', error);
//         return false;
//     }
// };

export const deleteFile = (filename) => {
    try {

        if (!filename) return false;

        // remove /uploads/ from path
        const cleanFileName = filename.replace("/uploads/", "");

        const filePath = path.join(uploadDir, cleanFileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);

            console.log("File deleted:", cleanFileName);

            return true;
        }

        return false;

    } catch (error) {

        console.error("Error deleting file:", error);

        return false;
    }
};

export const handleUploadError = (err, req, res, next) => {
    if (err) {
        console.error('Upload error:', err);
        console.error('Error code:', err.code);
        console.error('Error field:', err.field);
        return res.status(400).json({
            success: false,
            message: err.message || 'File upload error'
        });
    }
    next();
};