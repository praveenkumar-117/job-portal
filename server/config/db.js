import mongoose from "mongoose";

// const connectDB = async () => {
//   mongoose.connection.on('connected', () => console.log('database connected'))
//   await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
// }

const URI = process.env.MONGODB_URI


const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected Successfully")
  } catch (error) {
    console.log("Database connection Failed", error)
    process.exit(1)

  }

}

export default  connectDB