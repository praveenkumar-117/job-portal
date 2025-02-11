import jwt from 'jsonwebtoken'

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: '30d'
  })
}

export default genrateToken