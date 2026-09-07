import jwt from 'jsonwebtoken'
import Company from '../models/company.js'

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.json({
      success: false,
      message: "You Are Not Authorized"
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.company = await Company.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }


}