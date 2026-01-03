import express from "express";
import { register, login, getProfile, getVerificationStatus } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.get("/verify-email", authMiddleware, getVerificationStatus);

export default router;
