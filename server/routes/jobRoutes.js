import express from 'express'
import { getJobByid, getJobs } from '../controllers/jobController.js';

const router = express.Router()

//Route to get all jobs data
router.get('/', getJobs)



// Routes to get a single job by id
router.get('/:id', getJobByid)


export default router;