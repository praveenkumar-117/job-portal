import Company from "../models/company.js";
import Application from "../models/application.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";

import job from "../models/job.js";

//register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({ success: false, message: "Email Already Registred" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });
    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message1: error.message,
    });
  }
};

//Company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get company data

export const getCompanyData = async (req, res) => {
  const company = req.company;
  try {
    res.json({ success: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;
  try {
    const newJob = new job({
      title,
      description,
      location,
      category,
      salary,
      level,
      companyId,
      date: Date.now(),
    });
    await newJob.save();

    res.json({
      success: true,
      newJob,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Recruiter ki company ke liye aayi applications database se fetch karne ke liye
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    // Company ki jobs ki applications fetch karne ke liye
    const applications = await Application.find({ companyId })
      .populate("jobId")
      .populate("userId", "-password");

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log("Get company applicants error:", error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await job.find({ companyId });

    // Adding No. of applicatns info in data
    res.json({
      success: true,
      jobsData: jobs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Recruiter ke Accept/Reject action ke according application status update karne ke liye
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.json({
        success: false,
        message: "Missing application details",
      });
    }

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.json({
        success: false,
        message: "Application not found",
      });
    }

    // Recruiter ko sirf apni company ki application ka status change karne dene ke liye
    if (application.companyId.toString() !== req.company._id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    application.status = status;

    await application.save();

    // Updated application ke saath applicant aur job ki complete details return karne ke liye
    const updatedApplication = await Application.findById(application._id)
      .populate("userId")
      .populate("jobId");

    res.json({
      success: true,
      message: `Application ${status.toLowerCase()} successfully`,
      application,
    });
  } catch (error) {
    console.log("Change application status error:", error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//const job visiblity

export const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job1 = await job.findById(id);

    if (!job1) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (companyId.toString() !== job1.companyId.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    job1.visible = !job1.visible;

    await job1.save();

    res.json({
      success: true,
      job1,
    });
  } catch (error) {
    console.log("Visibility error:", error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Company ki job ko database se delete karne ke liye
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job1 = await job.findById(id);

    if (!job1) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (companyId.toString() !== job1.companyId.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    await job.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log("Delete job error:", error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Company ki existing job ki details update karne ke liye
export const updateJob = async (req, res) => {
  try {
    const { id, title, description, location, salary, level, category } =
      req.body;
    const companyId = req.company._id;

    const job1 = await job.findById(id);

    if (!job1) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (companyId.toString() !== job1.companyId.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    job1.title = title;
    job1.description = description;
    job1.location = location;
    job1.salary = salary;
    job1.level = level;
    job1.category = category;

    await job1.save();

    res.json({
      success: true,
      message: "Job updated successfully",
      job: job1,
    });
  } catch (error) {
    console.log("Update job error:", error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
