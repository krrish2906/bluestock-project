import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            data: null,
            success: false,
            message: "No token provided",
            error: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({
            data: null,
            success: false,
            message: "Invalid or expired token",
            error: "Invalid or expired token"
        });
    }
};

export const requireEmailVerified = (req, res, next) => {
    try {
        if (!req.user?.is_email_verified) {
            return res.status(403).json({
                data: {},
                success: false,
                message: "Please verify your email to continue",
                error: "Email not verified"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Verification check failed",
            error: error.message
        });
    }
};
