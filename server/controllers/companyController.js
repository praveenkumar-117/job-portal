import Company from "../models/company.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary'
import generateToken from '../utils/generateToken.js'

//register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body
  const imageFile = req.imageFile;
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing details" })
  }
  try {
    const companyExists = await Company.findOne({ email })
    if (companyExists) {
      return res.jason({ success: false, message: 'Email Already Registred' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url
    })
    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image
      },
      token: generateToken(company._id)
    })


  } catch (error) {
    res.json({
      success: true,
      message: error.message,
    })
  }

}

//Company login
export const loginCompany = async (req, res) => {

}

//get company data

export const getCompanyData = async (req, res) => {

}


//Post a new job
export const postJob = async (req, res) => {

}

//get company Job application
export const getCompanyJobApplicants = async (req, res) => {

}

//get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {

}

//Change Job Applicant Status
export const changeJobApplicationStatus = async (req, res) => {

}

//const job visiblity 
export const changeVisiblity = async (req, res) => {

}