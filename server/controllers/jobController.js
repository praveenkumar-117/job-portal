import job from "../models/job.js"




//get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await job.find({ visible: true })
      .populate({ path: 'companyId', select: '-password' })

    res.json({ success: true, jobs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}

// Get a single job by id
export const getJobByid = async (req, res) => {
  try {
    const { id } = req.params
    const jobData = await job.findById(id).populate({
      path: 'companyId',
      select: '-password'
    })
    if (!jobData) {
      return res.json({ success: false, message: "Job Not Found" })
    }
    res.json({ success: true, job:jobData })
  } catch (error) {
    res.json({ success: false,message: error.message })
  }

}