import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
connectDB();
connectCloudinary();

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://job-portal-prvn.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "token"],
  }),
);
// app.use(cors())
app.use(express.json());

// Route
app.get("/", (req, res) => res.send("API Working"));

app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {});
