// Package imports:-
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";

// Local imports:-
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://bluestock-project-frontend.onrender.com"
        ],
        credentials: true,
    })
);
app.use(compression());
app.use(express.json());

// Route configurations:-
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}\n`);
});
