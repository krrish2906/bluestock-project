import bcrypt from "bcrypt";
import pool from "../config/database.js";
import { firebaseAuth } from "../services/firebase.service.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    try {
        const { email, password, full_name, gender, mobile_no } = req.body;
        const gender_ = gender?.trim().toUpperCase()[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!["M", "F"].includes(gender_)) {
            return res.status(400).json({
                data: null,
                success: false,
                message: "Gender must be one of: [M, F]",
                error: "Gender must be one of: [M, F]"
            });
        }

        const firebaseUser = await firebaseAuth.createUser({
            email,
            password,
            phoneNumber: mobile_no,
        });

        const result = await pool.query(
            `INSERT INTO users (email, password, full_name, gender, mobile_no)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [email, hashedPassword, full_name, gender_, mobile_no]
        );

        return res.status(201).json({
            data: { user_id: result.rows[0].id },
            success: true,
            message: "User registered successfully. Please verify email and mobile.",
            error: null
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: null,
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            `SELECT id, email, full_name, gender, mobile_no, created_at, updated_at 
             FROM users 
             WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                data: null,
                success: false,
                message: "User not found",
                error: "User not found"
            });
        }

        const user = result.rows[0];
        return res.status(200).json({
            data: user,
            success: true,
            message: "Profile retrieved successfully",
            error: null
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: null,
            success: false,
            message: "Failed to fetch profile",
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const firebaseUser = await firebaseAuth.getUserByEmail(email);

        const result = await pool.query(
            `SELECT id, email, password FROM users WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                data: null,
                success: false,
                message: "Invalid email or password",
                error: "Invalid email or password"
            });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                data: null,
                success: false,
                message: "Invalid email or password",
                error: "Invalid email or password"
            });
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            is_email_verified: firebaseUser.emailVerified
        });
        return res.status(200).json({
            data: { token },
            success: true,
            message: "Login successful",
            error: null
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: null,
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

export const getVerificationStatus = async (req, res) => {
    try {
        const { email } = req.user;
        const firebaseUser = await firebaseAuth.getUserByEmail(email);

        if (firebaseUser.emailVerified) {
            const result = await pool.query(
                `UPDATE users SET is_email_verified = true, 
                updated_at = CURRENT_TIMESTAMP 
                WHERE email = $1 RETURNING id, email, is_email_verified`,
                [email]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                    error: "USER_NOT_FOUND"
                });
            }
        }

        req.user.is_email_verified = firebaseUser.emailVerified;
        return res.status(200).json({
            success: true,
            message: "Email verification status retrieved successfully",
            data: req.user,
            error: null
        });

    } catch (error) {
        console.error("Email verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to verify email",
            error: error.message
        });
    }
};