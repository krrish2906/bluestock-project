import fs from "fs";
import pool from "../config/database.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

export const registerCompany = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            company_name,
            address, city, state, country,
            website, industry, founded_date,
            postal_code, description, social_links
        } = req.body;

        // Check if company already exists for this user
        const existingCompany = await pool.query(
            `SELECT id FROM company_profile WHERE owner_id = $1`,
            [userId]
        );

        if (existingCompany.rows.length > 0) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Company profile already exists for this user",
                error: null
            });
        }

        // Insert company profile
        const result = await pool.query(
            `INSERT INTO company_profile (owner_id, company_name, address,
            city, state, country, postal_code, website, industry, founded_date,
            description, social_links)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [userId, company_name, address, city, state, country, postal_code,
                website, industry, founded_date, description, social_links]
        );

        return res.status(201).json({
            data: result.rows[0],
            success: true,
            message: "Company registered successfully",
            error: null
        });

    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                data: {},
                success: false,
                message: "Invalid token: userId missing",
                error: null
            });
        }

        const result = await pool.query(
            `SELECT * FROM company_profile WHERE owner_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Company profile not found",
                error: null
            });
        }

        return res.status(200).json({
            data: result.rows[0],
            success: true,
            message: "Company profile fetched successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const updateCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                data: {},
                success: false,
                message: "Invalid token: userId missing",
                error: null
            });
        }

        const {
            company_name,
            address, city, state, country,
            website, industry, founded_date,
            postal_code, description, social_links
        } = req.body;

        // Check if company exists
        const existingCompany = await pool.query(
            `SELECT id FROM company_profile WHERE owner_id = $1`,
            [userId]
        );

        if (existingCompany.rows.length === 0) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Company profile not found",
                error: null
            });
        }

        // Update company profile
        const result = await pool.query(
            `UPDATE company_profile SET
                company_name = $1,
                address = $2, city = $3, state = $4,
                country = $5, postal_code = $6,
                website = $7, industry = $8,
                founded_date = $9, description = $10,
                social_links = $11, updated_at = CURRENT_TIMESTAMP
            WHERE owner_id = $12
            RETURNING *`,
            [company_name, address, city, state, country, postal_code, website,
                industry, founded_date, description, social_links, userId]
        );

        return res.status(200).json({
            data: result.rows[0],
            success: true,
            message: "Company profile updated successfully",
            error: null
        });

    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const uploadCompanyLogo = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "No file uploaded",
                error: null
            });
        }

        const imageUrl = await uploadToCloudinary(req.file.path, "company/logos");
        fs.unlinkSync(req.file.path);

        const result = await pool.query(`
            UPDATE company_profile
            SET logo_url = $1, updated_at = CURRENT_TIMESTAMP
            WHERE owner_id = $2 RETURNING logo_url`,
            [imageUrl, userId]
        );

        return res.status(200).json({
            data: result.rows[0],
            success: true,
            message: "Company logo uploaded successfully",
            error: null
        });

    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const uploadCompanyBanner = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "No file uploaded",
                error: null
            });
        }

        const imageUrl = await uploadToCloudinary(req.file.path, "company/banners");
        fs.unlinkSync(req.file.path);

        const result = await pool.query(`
            UPDATE company_profile
            SET banner_url = $1, updated_at = CURRENT_TIMESTAMP
            WHERE owner_id = $2 RETURNING banner_url`,
            [imageUrl, userId]
        );

        return res.status(200).json({
            data: result.rows[0],
            success: true,
            message: "Company banner uploaded successfully",
            error: null
        });
        
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
