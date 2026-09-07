import Application from '../models/application.js'

// Job seeker ki application ko database me save karne ke liye
export const applyJob = async (req, res) => {
  try {
    const { jobId, companyId } = req.body
    const userId = req.user._id

    const existingApplication = await Application.findOne({ jobId, userId })

    if (existingApplication) {
      return res.json({
        success: false,
        message: "You have already applied for this job"
      })
    }

    const newApplication = new Application({
      jobId,
      companyId,
      userId,
      status: "Pending"
    })

    await newApplication.save()

    res.json({
      success: true,
      message: "Job applied successfully",
      application: newApplication
    })
  } catch (error) {
    console.log("Apply job error:", error.message)

    res.json({
      success: false,
      message: error.message
    })
  }
}

// Logged-in job seeker ki sirf apni applications database se fetch karne ke liye
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.user._id

    const applications = await Application.find({ userId })
      .populate("jobId")
      .populate("companyId")

    res.json({
      success: true,
      applications
    })
  } catch (error) {
    console.log("User applications fetch error:", error)

    res.json({
      success: false,
      message: error.message
    })
  }
}