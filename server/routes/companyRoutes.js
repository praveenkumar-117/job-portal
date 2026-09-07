import express from 'express'
import { changeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany, deleteJob,
  updateJob } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Register a company 
router.post('/register', upload.single('image'), registerCompany)
//company login
router.post('/login', loginCompany)
//get companydata
router.get('/company', protectCompany, getCompanyData)
// Post a job 
router.post('/post-job', protectCompany, postJob)
//get applicant data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants)
//get company job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)
//chnage application status
router.post('/change-status', protectCompany, changeJobApplicationStatus)
//change application visiblity
router.post('/change-visiblity', protectCompany, changeVisiblity)
// Company ki job delete karne ka protected route
router.post('/delete-job', protectCompany, deleteJob)

// Company ki existing job ko update karne ka protected route
router.post('/update-job', protectCompany, updateJob)


export default router;