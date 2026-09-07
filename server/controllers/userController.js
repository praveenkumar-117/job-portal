import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

// Job seeker ka naya account create karke MongoDB me save karne ke liye
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: "",
    });

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Job seeker ke email aur password se login karne ke liye
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Job seeker ki profile information ko sirf authenticated user ke account me update karne ke liye
export const updateUserProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name) {
      return res.json({
        success: false,
        message: "Missing profile details",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        resume: user.resume,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Job seeker ki profile photo ko sirf authenticated user ke account me update karne ke liye
export const updateUserImage = async (req, res) => {
  try {
    const imageFile = req.file;
    const userId = req.user._id;

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Missing image",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    user.image = imageUpload.secure_url;

    await user.save();

    res.json({
      success: true,
      message: "Profile photo updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        resume: user.resume,
      },
    });
  } catch (error) {
    console.log("Profile image update error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Job seeker ke resume ko sirf authenticated user ke account me upload aur update karne ke liye
export const updateUserResume = async (req, res) => {
  try {
    const resumeFile = req.file;
    const userId = req.user._id;

    if (!resumeFile) {
      return res.json({
        success: false,
        message: "Missing resume",
      });
    }

    // Resume ko Cloudinary par upload karne se pehle sirf PDF file allow karne ke liye
    if (resumeFile.mimetype !== "application/pdf") {
      return res.json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Resume ko original file extension ke saath Cloudinary me store karne ke liye
    const fileExtension = resumeFile.originalname.split(".").pop();

    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      public_id: `resumes/${userId}_${Date.now()}.${fileExtension}`,
    });

    user.resume = resumeUpload.secure_url;

    await user.save();

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        resume: user.resume,
      },
    });
  } catch (error) {
    console.log("Resume upload error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
