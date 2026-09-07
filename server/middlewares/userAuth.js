import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Job seeker ki protected APIs ko valid JWT token ke bina access hone se rokne ke liye
export const protectUser = async (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.json({
      success: false,
      message: "You Are Not Authorized"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.json({
        success: false,
        message: "User not found"
      })
    }

    next()
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}