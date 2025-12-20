import bcrypt from "bcrypt";
import pool from "../config/database.js";
import { firebaseAuth } from "../services/firebase.service.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    try {
        const { email, password, full_name, gender, mobile_no } = req.body;
        const gender_ = gender?.trim().toUpperCase();
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
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
