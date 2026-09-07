import express from "express";
import {
  applyJob,
  getUserApplications,
} from "../controllers/applicationController.js";
import { protectUser } from "../middlewares/userAuth.js";

const router = express.Router();

// Job seeker ki application submit karne wale route ko sirf logged-in user ke liye protect karna
router.post("/apply", protectUser, applyJob);

// Logged-in job seeker ki applied jobs list sirf usi user ko dikhane ke liye route protect karna
router.post("/user-applications", protectUser, getUserApplications);

export default router;
