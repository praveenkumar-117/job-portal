import mongoose from "mongoose";



const URI = process.env.MONGODB_URI


const connectDB = async () => {
  try {
    await mongoose.connect(URI);
     console.log("Database connected")
   
  } catch (error) {
    console.log("Database connection Failed", error)
    process.exit(1)

  }

}

export default  connectDB