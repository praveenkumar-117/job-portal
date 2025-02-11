import express from 'express'
import { changeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()

// Register a company 
router.post('/register', upload.single('image'), registerCompany)
//company login
router.post('/login', loginCompany)
//get companydata
router.get('/company', getCompanyData)
// Post a job 
router.post('/post-job', postJob)
//get applicant data of company
router.get('/applicants', getCompanyJobApplicants)
//get company job list
router.get('/list-jobs', getCompanyPostedJobs)
//chnage application status
router.post('/change-status', changeJobApplicationStatus)
//change application visiblity
router.post('/change-visiblity', changeVisiblity)


export default router;