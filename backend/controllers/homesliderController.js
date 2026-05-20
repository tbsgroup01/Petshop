import db from "../models/index.js";
import { deleteFile } from "../middleware/uploadMiddleware.js";

const { HomeSlider } = db;

/** Add Home Slider
 */
export const addHomeSlider = async (req, res) => {
    try {
        const { title, order, link, image_url } = req.body;

        // Validation
        if (!title || order === undefined || order === null || order === '' || !link) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let imageUrl = image_url || null;

        // Uploaded image
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // Check duplicate image
        const existingSlider = await HomeSlider.findOne({
            where: {
                image_url: imageUrl
            }
        });

        if (existingSlider) {

            // delete uploaded duplicate image
            if (req.file) {
                deleteFile(imageUrl);
            }

            return res.status(400).json({
                success: false,
                message: "Image already exists"
            });
        }

        // Create slider
        const newSlider = await HomeSlider.create({
            title,
            order,
            link,
            image_url: imageUrl
        });

        return res.status(201).json({
            success: true,
            message: "Home slider added successfully",
            data: newSlider
        });

    } catch (error) {

        // delete uploaded image if error occurs
        if (req.file) {
            deleteFile(`/uploads/${req.file.filename}`);
        }

        console.error("Add home slider error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add home slider"
        });
    }
};


/**
 * Get All Home Sliders
 */
export const getHomeSliders = async (req, res) => {
    try {

        const sliders = await HomeSlider.findAll({
            order: [["order", "ASC"]]
        });

        return res.status(200).json({
            success: true,
            sliders
        });

    } catch (error) {

        console.error("Get home sliders error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch home sliders"
        });
    }
};


/**
 * Get Single Home Slider
 */
export const getHomeSliderById = async (req, res) => {
    try {

        const sliderId = req.params.id;

        const slider = await HomeSlider.findByPk(sliderId);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Home slider not found"
            });
        }

        return res.status(200).json({
            success: true,
            slider
        });

    } catch (error) {

        console.error("Get home slider error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch home slider"
        });
    }
};


/**
 * Update Home Slider
 */
export const updateHomeSlider = async (req, res) => {
    try {

        const sliderId = req.params.id;

        const { title, order, link, image_url } = req.body;

        const slider = await HomeSlider.findByPk(sliderId);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Home slider not found"
            });
        }

        let imageUrl = image_url || slider.image_url;

        // New image uploaded
        if (req.file) {

            imageUrl = `/uploads/${req.file.filename}`;

            // delete old image
            if (slider.image_url) {
                deleteFile(slider.image_url);
            }
        }

        // Duplicate image check
        const existingSlider = await HomeSlider.findOne({
            where: {
                image_url: imageUrl
            }
        });

        if (
            existingSlider &&
            existingSlider.id !== slider.id
        ) {

            // delete newly uploaded duplicate image
            if (req.file) {
                deleteFile(imageUrl);
            }

            return res.status(400).json({
                success: false,
                message: "Image already exists"
            });
        }

        // Update slider
        await slider.update({
            title: title ?? slider.title,
            order: order !== undefined && order !== null && order !== '' ? order : slider.order,
            link: link ?? slider.link,
            image_url: imageUrl
        });

        return res.status(200).json({
            success: true,
            message: "Home slider updated successfully",
            slider
        });

    } catch (error) {

        // delete uploaded image if error occurs
        if (req.file) {
            deleteFile(`/uploads/${req.file.filename}`);
        }

        console.error("Update home slider error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update home slider"
        });
    }
};


/**
 * Delete Home Slider
 */
export const deleteHomeSlider = async (req, res) => {
    try {

        const sliderId = req.params.id;

        const slider = await HomeSlider.findByPk(sliderId);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Home slider not found"
            });
        }

        // delete image from storage
        if (slider.image_url) {
            deleteFile(slider.image_url);
        }

        // delete record
        await slider.destroy();

        return res.status(200).json({
            success: true,
            message: "Home slider deleted successfully"
        });

    } catch (error) {

        console.error("Delete home slider error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete home slider"
        });
    }
};
