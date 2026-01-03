import express from "express";

// Middlewares:-
import { authMiddleware, requireEmailVerified } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

// Controllers:-
import { registerCompany, getCompanyProfile, updateCompanyProfile } from "../controllers/company.controller.js";
import { uploadCompanyLogo, uploadCompanyBanner } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/register", authMiddleware, requireEmailVerified, registerCompany);
router.get("/profile", authMiddleware, requireEmailVerified, getCompanyProfile);
router.put("/profile", authMiddleware, requireEmailVerified, updateCompanyProfile);
router.post("/upload-logo", authMiddleware, requireEmailVerified, upload.single("logo"), uploadCompanyLogo);
router.post("/upload-banner", authMiddleware, requireEmailVerified, upload.single("banner"), uploadCompanyBanner);

export default router;