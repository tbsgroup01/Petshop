import db from "../models/index.js";
import { deleteFile } from "../middleware/uploadMiddleware.js";

const { Setting } = db;

/**
 * Add Setting
 */
export const addSetting = async (req, res) => {
    try {

        const {
            site_title,
            brand_name,
            site_email,
            support_email,
        } = req.body;

        // Validation
        if (
            !site_title ||
            !brand_name ||
            !site_email ||
            !support_email
        ) {

            // delete uploaded image
            if (req.file && req.file.filename) {
                deleteFile(`/uploads/${req.file.filename}`);
            }

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing setting
        const existingSetting = await Setting.findOne({
            where: {
                site_title,
                brand_name,
                site_email,
                support_email
            }
        });

        if (existingSetting) {

            // delete uploaded image
            if (req.file && req.file.filename) {
                deleteFile(`/uploads/${req.file.filename}`);
            }

            return res.status(400).json({
                success: false,
                message: "This data is already filled"
            });
        }

        // Image upload
        let imageUrl = null;

        if (req.file && req.file.filename) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        // Image required
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // Create setting
        const setting = await Setting.create({
            site_title,
            brand_name,
            site_email,
            support_email,
            image_url: imageUrl
        });

        return res.status(201).json({
            success: true,
            message: "Setting added successfully",
            data: setting
        });

    } catch (error) {

        console.log(error);

        // delete uploaded image on error
        if (req.file && req.file.filename) {
            deleteFile(`/uploads/${req.file.filename}`);
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



/**
 * Update Setting
 */
export const updateSetting = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            site_title,
            brand_name,
            site_email,
            support_email
        } = req.body;

        // Find setting
        const setting = await Setting.findByPk(id);

        if (!setting) {

            // delete uploaded image
            if (req.file && req.file.filename) {
                deleteFile(`/uploads/${req.file.filename}`);
            }

            return res.status(404).json({
                success: false,
                message: "Setting not found"
            });
        }

        // Keep old image by default
        let imageUrl = setting.image_url;

        // New image uploaded
        if (req.file && req.file.filename) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        // Check text changes
        const noTextChanges =
            setting.site_title === site_title &&
            setting.brand_name === brand_name &&
            setting.site_email === site_email &&
            setting.support_email === support_email;

        // Same data + image uploaded
        if (noTextChanges && req.file) {

            // delete newly uploaded image
            deleteFile(`/uploads/${req.file.filename}`);

            return res.status(400).json({
                success: false,
                message: "Data is already filled"
            });
        }

        // Same data + no image uploaded
        if (noTextChanges && !req.file) {
            return res.status(400).json({
                success: false,
                message: "No changes found"
            });
        }

        // Delete old image if new image uploaded
        if (
            req.file &&
            req.file.filename &&
            setting.image_url
        ) {
            deleteFile(setting.image_url);
        }

        // Update setting
        await setting.update({
            site_title,
            brand_name,
            site_email,
            support_email,
            image_url: imageUrl
        });

        return res.status(200).json({
            success: true,
            message: "Setting updated successfully",
            data: setting
        });

    } catch (error) {

        console.log(error);

        // delete uploaded image on error
        if (req.file && req.file.filename) {
            deleteFile(`/uploads/${req.file.filename}`);
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};