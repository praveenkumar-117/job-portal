import express from "express";

import {
  registerUser,
  loginUser,
  updateUserProfile,
  updateUserImage,
  updateUserResume,
} from "../controllers/userController.js";

import { protectUser } from "../middlewares/userAuth.js";
import upload from "../config/multer.js";

const router = express.Router();

// Job seeker ke registration ke liye route
router.post("/register", registerUser);

// Job seeker ke login ke liye route
router.post("/login", loginUser);

// Job seeker ki profile information update karne ke liye
router.post("/update-profile", protectUser, updateUserProfile);

// Job seeker ki profile photo upload aur update ke liye
router.post("/update-image", protectUser, upload.single("image"), updateUserImage);

// Job seeker ke resume ko upload aur update ke liye
router.post("/update-resume", protectUser, upload.single("resume"), updateUserResume);

export default router;