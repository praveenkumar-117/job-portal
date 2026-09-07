import mongoose from "mongoose";

// Job seeker ki application ko database me store karne ke liye
const applicationSchema = new mongoose.Schema({
  // Kis job ke liye application hai
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  // user ki ID
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Kis company ki job hai
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  // Recruiter application ka status change karega
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },

  // Application kab submit hui
  date: {
    type: Number,
    default: Date.now,
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
