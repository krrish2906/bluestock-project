import express from "express";

// Middlewares:-
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

// Controllers:-
import { registerCompany, getCompanyProfile, updateCompanyProfile } from "../controllers/company.controller.js";
import { uploadCompanyLogo, uploadCompanyBanner } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/register", authMiddleware, registerCompany);
router.get("/profile", authMiddleware, getCompanyProfile);
router.put("/profile", authMiddleware, updateCompanyProfile);
router.post("/upload-logo", authMiddleware, upload.single("logo"), uploadCompanyLogo);
router.post("/upload-banner", authMiddleware, upload.single("banner"), uploadCompanyBanner);

export default router;