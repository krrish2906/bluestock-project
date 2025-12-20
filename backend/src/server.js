// Package imports:-
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";

// Local imports:-
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Route configurations:-
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}\n`);
});
